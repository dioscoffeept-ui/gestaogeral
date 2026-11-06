// Acompanhar o pedido no telemóvel do cliente: estado ao vivo, som quando fica pronto e aviso (Web Push) mesmo com o ecrã bloqueado.
(function () {
  const FN = 'https://brisrzuvvxkkzhmhsgro.supabase.co/functions/v1/pedido-publico';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  async function post(body) {
    const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.erro || 'Erro ' + r.status);
    return j;
  }
  // som: o iPhone só deixa tocar depois de um toque no ecrã, por isso "acordamos" o áudio no primeiro toque
  let ctx = null;
  const acordar = () => { try { if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; ctx = new C(); } if (ctx.state === 'suspended') ctx.resume(); } catch (_) {} };
  ['touchstart', 'pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, acordar, { passive: true }));
  function tocar() {
    acordar();
    try { const c = ctx; [0, .22, .44, 1.1, 1.32, 1.54].forEach((t, i) => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = [880, 1175, 1480][i % 3]; o.connect(g); g.connect(c.destination); g.gain.setValueAtTime(.0001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(.35, c.currentTime + t + .02); g.gain.exponentialRampToValueAtTime(.0001, c.currentTime + t + .2); o.start(c.currentTime + t); o.stop(c.currentTime + t + .21); }); } catch (_) {}
    if (navigator.vibrate) try { navigator.vibrate([300, 120, 300, 120, 600]); } catch (_) {}
  }
  const b64 = s => { const p = '='.repeat((4 - s.length % 4) % 4); const r = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from([...r].map(c => c.charCodeAt(0))); };
  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const instalado = window.matchMedia && matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const podePush = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

  // modo quiosque (tablet da loja): só mostra um QR para o cliente seguir o pedido no próprio telemóvel
  window.acompanharQR = function (el, a) {
    if (!el || !a || typeof qrcode !== 'function') return;
    try {
      const u = new URL('estado.html?a=' + a, location.href).href;
      const q = qrcode(0, 'M'); q.addData(u); q.make();
      el.innerHTML = `<div style="margin:16px auto 0;max-width:260px;text-align:center"><div style="background:#fff;border-radius:16px;padding:10px;width:170px;margin:0 auto;border:1px solid #e2e8f0">${q.createSvgTag({ cellSize: 5, margin: 1, scalable: true })}</div><p style="font-size:13px;font-weight:700;color:#334155;margin:8px 0 0">${T('scanTrack')}</p></div>`;
    } catch (_) {}
  };

  window.acompanhar = function (el, a, opts) {
    if (!el || !a) return;
    opts = opts || {};
    let ultimo = '', timer = null, vapid = '', avisos = false;
    async function ligarAvisos(btn) {
      acordar();
      try {
        btn.disabled = true;
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') { btn.outerHTML = `<p class="acp-hint">${T('notifyNo')}</p>`; return; }
        const reg = await navigator.serviceWorker.register('sw.js');
        await navigator.serviceWorker.ready;
        let sub = await reg.pushManager.getSubscription();
        if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(vapid) });
        await post({ acao: 'push', a, sub: sub.toJSON(), lang: window.LANG || 'pt' });
        avisos = true; desenhar(window._acpUlt);
      } catch (e) { btn.disabled = false; btn.insertAdjacentHTML('afterend', `<p class="acp-hint">${esc(e.message || e)}</p>`); }
    }
    function desenhar(r) {
      if (!r) return;
      window._acpUlt = r;
      const e = r.estado;
      const passo = e === 'pronto' || e === 'entregue' ? 3 : e === 'aceite' ? 2 : 1;
      const ativo = !['pronto', 'entregue', 'recusado'].includes(e);
      let corpo;
      if (e === 'recusado') corpo = `<div class="acp-st no"><b>✕ ${T('stRefused')}</b><p>${T('sorry')} ${esc(r.motivo)}</p>${r.reembolsado ? `<p>${T('refunded')}</p>` : ''}</div>`;
      else if (passo === 3) corpo = `<div class="acp-st ok"><b>🔔 ${T('stReady')}</b><p>${T('stReadyTx')}</p></div>`;
      else corpo = `<div class="acp-steps">${[T('stQueue'), T('stPrep'), T('stReady')].map((t, i) => `<div class="${i + 1 < passo ? 'feito' : i + 1 === passo ? 'agora' : ''}"><i></i><span>${t}</span></div>`).join('')}</div>${e === 'pagar_balcao' ? `<p class="acp-hint" style="color:#b45309;font-weight:800">${T('stPay')}</p>` : ''}`;
      let aviso = '';
      if (ativo) {
        if (avisos || (podePush && Notification.permission === 'granted' && r.avisos)) aviso = `<p class="acp-hint">${T('notifyOn')}</p>`;
        else if (podePush && r.vapid && Notification.permission !== 'denied') aviso = `<button type="button" class="acp-btn" id="acp-push">${T('notifyMe')}</button><p class="acp-hint">${T('keepOpen')}</p>`;
        else aviso = `<p class="acp-hint">${T('keepOpen')}</p>${ios && !instalado ? `<p class="acp-hint">${T('iosTip')}</p>` : ''}`;
      }
      el.innerHTML = `<div class="acp">${opts.titulo ? `<p class="acp-num">#${esc(r.numero)}${r.nome ? ' · ' + esc(r.nome) : ''}</p>` : ''}${corpo}${aviso}</div>`;
      const b = document.getElementById('acp-push'); if (b) b.onclick = () => ligarAvisos(b);
    }
    async function tick() {
      clearTimeout(timer);
      try {
        const r = await post({ acao: 'estado', a });
        vapid = r.vapid || vapid; if (r.avisos) avisos = avisos || (podePush && Notification.permission === 'granted');
        if (r.estado !== ultimo) {
          const antes = ultimo; ultimo = r.estado;
          if (antes && (r.estado === 'pronto' || r.estado === 'recusado')) {
            tocar();
            if (r.estado === 'pronto') { document.title = '🔔 #' + r.numero + ' — ' + T('stReady'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
            // se a página está aberta mas noutra aba, mostra também uma notificação
            try { if (document.hidden && 'Notification' in window && Notification.permission === 'granted') { const reg = await navigator.serviceWorker.getRegistration(); if (reg) reg.showNotification('#' + r.numero + ' — ' + (r.estado === 'pronto' ? T('stReady') : T('stRefused')), { body: r.estado === 'pronto' ? T('stReadyTx') : r.motivo, tag: 'pedido-' + a, vibrate: [300, 120, 300] }); } } catch (_) {}
          }
          desenhar(r);
          if (opts.onEstado) try { opts.onEstado(r); } catch (_) {}
        }
        if (['pronto', 'entregue', 'recusado'].includes(r.estado) && antesFim()) return;
      } catch (_) {}
      timer = setTimeout(tick, document.hidden ? 15000 : 4000);
    }
    let fimVisto = 0;
    const antesFim = () => ++fimVisto > 3; // continua a ver mais um bocadinho (caso mude de "pronto" para "entregue")
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
    if (!document.getElementById('acp-css')) document.head.insertAdjacentHTML('beforeend', `<style id="acp-css">
      .acp { margin: 16px auto 0; max-width: 420px; text-align: left; }
      .acp-num { text-align: center; font-weight: 900; font-size: 15px; margin: 0 0 8px; }
      .acp-steps { display: flex; justify-content: space-between; gap: 6px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 12px; }
      .acp-steps div { flex: 1; text-align: center; font-size: 12px; font-weight: 700; color: #94a3b8; position: relative; }
      .acp-steps i { display: block; width: 14px; height: 14px; border-radius: 99px; background: #e2e8f0; margin: 0 auto 6px; }
      .acp-steps .feito { color: #334155; } .acp-steps .feito i { background: var(--brand); }
      .acp-steps .agora { color: var(--brand); font-weight: 900; } .acp-steps .agora i { background: var(--brand); box-shadow: 0 0 0 5px color-mix(in srgb, var(--brand) 22%, transparent); animation: acpP 1.4s infinite; }
      @keyframes acpP { 50% { box-shadow: 0 0 0 9px transparent; } }
      .acp-st { border-radius: 18px; padding: 16px; text-align: center; }
      .acp-st b { display: block; font-size: 22px; font-weight: 900; } .acp-st p { margin: 6px 0 0; font-size: 14px; }
      .acp-st.ok { background: var(--brand); color: #fff; animation: acpF 1s ease-in-out 3; }
      @keyframes acpF { 50% { transform: scale(1.04); } }
      .acp-st.no { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
      .acp-btn { display: block; width: 100%; margin-top: 12px; padding: 14px; border-radius: 14px; background: #fff; border: 2px solid var(--brand) !important; color: var(--brand); font-size: 15px; font-weight: 900; font-family: inherit; cursor: pointer; }
      .acp-btn:disabled { opacity: .5; }
      .acp-hint { font-size: 12px; color: #64748b; text-align: center; margin: 8px 0 0; }
    </style>`);
    tick();
  };
})();
