// Imagem da pré-visualização do cartão (WhatsApp, Instagram…), no estilo da cartao-og.png:
// fundo claro, título grande à esquerda e o cartão da loja à direita. Desenhada em SVG e convertida para PNG nítido.
import { Resvg } from '@resvg/resvg-js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const FONTES = ['Bricolage-800.ttf', 'Schibsted-600.ttf', 'Schibsted-800.ttf'].map(f => path.join(DIR, 'fonts', f));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cor = c => /^#[0-9a-fA-F]{6}$/.test(c || '') ? c : '#983808';
// quebra de linhas aproximada pelo número de letras
function linhas(t, max, n) {
  const ws = String(t || '').trim().split(/\s+/), L = []; let l = '';
  ws.forEach(w => { const x = l ? l + ' ' + w : w; if (x.length > max && l) { L.push(l); l = w; } else l = x; });
  if (l) L.push(l);
  if (L.length > n) { L.length = n; L[n - 1] = L[n - 1].replace(/\s*\S*$/, '') + '…'; }
  return L;
}
const cap = s => { s = String(s || '').trim(); return s.charAt(0).toUpperCase() + s.slice(1); };
const chavena = (cx, cy, s, c) => `<g transform="translate(${cx - 20 * s} ${cy - 18 * s}) scale(${s})" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 16h24v8a10 10 0 0 1-10 10h-4A10 10 0 0 1 6 24z" fill="${c}"/><path d="M30 19h3a4.5 4.5 0 0 1 0 9h-3"/>
  <path d="M12 4c-2 2 2 4 0 7M18 3c-2 2 2 4 0 7M24 4c-2 2 2 4 0 7"/></g>`;
const presente = (cx, cy, c) => `<g transform="translate(${cx - 17} ${cy - 17})" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="12" width="30" height="20" rx="2"/><path d="M0 12h34v-0M17 12v20M17 12c-3-8-12-8-10-2 1 3 10 2 10 2zM17 12c3-8 12-8 10-2-1 3-10 2-10 2z"/><rect x="0" y="8" width="34" height="6" rx="2"/></g>`;

export function svgCartao(p) {
  const B = cor(p.cor), loja = String(p.loja || '').trim();
  const tituloL = linhas(p.tipo === 'carimbos' ? 'Cartão de fidelidade' : (p.nome || 'Cartão de fidelidade'), 14, 2);
  let sub;
  if (p.tipo === 'carimbos') sub = `Junte ${p.alvo} carimbos e ganhe ${String(p.premio || 'um prémio').toLowerCase()}. Crie o seu em 30 segundos.`;
  else if (p.tipo === 'desconto') sub = `${valorDesc(p)} de desconto nas suas compras. Crie o seu cartão em 30 segundos.`;
  else sub = `${cap(p.beneficio || p.nome)}. Crie o seu cartão em 30 segundos.`;
  const subL = linhas(sub, 30, 3);
  // texto à esquerda, centrado na vertical
  const hT = tituloL.length * 78, hS = subL.length * 42, topo = Math.round((630 - (44 + hT + 26 + hS)) / 2) + 34;
  let esq = `<text x="70" y="${topo}" font-family="DS Forte" font-size="30" fill="${B}">${esc(loja.slice(0, 30))}</text>`;
  tituloL.forEach((l, i) => { esq += `<text x="66" y="${topo + 44 + 66 + i * 78}" font-family="DS Titulo" font-size="78" letter-spacing="-1" fill="#231F20">${esc(l)}</text>`; });
  subL.forEach((l, i) => { esq += `<text x="70" y="${topo + 44 + hT + 40 + i * 42}" font-family="DS Texto" font-size="30" fill="#5B4A40">${esc(l)}</text>`; });

  // o cartão à direita
  const X = 610, Y = 116, W = 520, H = 398;
  let dentro = `<text x="${X + 36}" y="${Y + 52}" font-family="DS Texto" font-size="22" fill="#fff" fill-opacity=".85">${esc(loja.slice(0, 32))}</text>`;
  if (p.tipo === 'carimbos') {
    const alvo = Math.max(3, Math.min(14, Number(p.alvo) || 9));
    dentro += `<text x="${X + 36}" y="${Y + 104}" font-family="DS Forte" font-size="40" fill="#fff">${esc(cap(p.premio || 'Prémio').slice(0, 24))}</text>`;
    const slots = alvo + 1, cols = 5, rows = Math.ceil(slots / cols), r = rows > 2 ? 28 : 39, gx = (W - 72 - 2 * r) / (cols - 1), gy = rows > 2 ? 70 : 92;
    const y0 = Y + (rows > 2 ? 160 : 178), cheios = Math.min(3, alvo - 1);
    for (let i = 0; i < slots; i++) {
      const cx = X + 36 + r + (i % cols) * gx, cy = y0 + Math.floor(i / cols) * gy;
      if (i === slots - 1) dentro += `<circle cx="${cx}" cy="${cy}" r="${r - 1.5}" fill="none" stroke="#fff" stroke-width="3"/>` + presente(cx, cy, '#fff');
      else if (i < cheios) dentro += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff"/>` + chavena(cx, cy, r / 39, B);
      else dentro += `<circle cx="${cx}" cy="${cy}" r="${r - 1.5}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2.6" stroke-dasharray="7 6"/>`;
    }
    dentro += `<text x="${X + 36}" y="${Y + H - 38}" font-family="DS Forte" font-size="30" fill="#fff">Toque e crie o seu cartão</text>`;
  } else {
    const v = p.tipo === 'desconto' ? valorDesc(p) : cap(p.beneficio || p.nome);
    const fs = v.length <= 5 ? 150 : v.length <= 10 ? 96 : 54;
    linhas(v, fs > 90 ? 12 : 20, 2).forEach((l, i) => { dentro += `<text x="${X + 36}" y="${Y + 120 + fs * 0.8 + i * fs * 1.02}" font-family="DS Titulo" font-size="${fs}" letter-spacing="-2" fill="#fff">${esc(l)}</text>`; });
    if (p.tipo === 'desconto') dentro += `<text x="${X + 36}" y="${Y + 120 + fs * 0.8 + 50}" font-family="DS Forte" font-size="36" fill="#fff">de desconto</text>`;
    dentro += `<text x="${X + 36}" y="${Y + H - 38}" font-family="DS Forte" font-size="30" fill="#fff">Toque e crie o seu cartão</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#24150E" flood-opacity=".22"/></filter>
  <clipPath id="cl"><rect x="${X}" y="${Y}" width="${W}" height="${H}" rx="38"/></clipPath></defs>
  <rect width="1200" height="630" fill="#F6F3F0"/>
  ${esq}
  <rect x="${X}" y="${Y}" width="${W}" height="${H}" rx="38" fill="${B}" filter="url(#sh)"/>
  <g clip-path="url(#cl)"><circle cx="${X + W - 10}" cy="${Y + 10}" r="170" fill="#fff" fill-opacity=".13"/></g>
  ${dentro}
</svg>`;
}
function valorDesc(p) {
  const v = Number(p.desconto_valor) || 0, n = String(Math.round(v * 100) / 100).replace('.', ',');
  return p.desconto_tipo === 'eur' ? n + ' €' : n + '%';
}
export function pngCartao(p) {
  const r = new Resvg(svgCartao(p), { font: { fontFiles: FONTES, loadSystemFonts: false, defaultFontFamily: 'DS Texto' }, fitTo: { mode: 'width', value: 1200 } });
  return r.render().asPng();
}
