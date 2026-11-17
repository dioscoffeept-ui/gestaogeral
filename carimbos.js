// Carimbos do cartão de fidelidade, partilhados pela app e pela página do cliente.
(function () {
  var P = {
    latte: { nome: 'Latte art', ficheiro: 'selo-latte.svg' },
    chavena: { nome: 'Chávena', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="COR" d="M3 9h13v5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V9Zm13 1h1.5a3 3 0 0 1 0 6H16v-2h1.5a1 1 0 0 0 0-2H16v-2Z"/><path d="M6.5 2.8c.6.7.6 1.5 0 2.2s-.6 1.5 0 2.2M10 2.8c.6.7.6 1.5 0 2.2s-.6 1.5 0 2.2M13.5 2.8c.6.7.6 1.5 0 2.2s-.6 1.5 0 2.2" fill="none" stroke="COR" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    grao: { nome: 'Grão de café', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="rotate(-32 12 12)"><ellipse cx="12" cy="12" rx="7" ry="10" fill="COR"/><path d="M12 2.4c-2.6 3.2-2.6 6.3 0 9.6s2.6 6.4 0 9.6" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/></g></svg>' },
    estrela: { nome: 'Estrela', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="COR" d="M12 2.3l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.2l-6 3.4 1.4-6.7-5-4.6 6.7-.8z"/></svg>' },
    coracao: { nome: 'Coração', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="COR" d="M12 21s-7.6-4.6-9.7-9.3C.8 8.3 3 4.4 6.8 4.4c2.2 0 3.7 1.2 4.4 2.6h1.6c.7-1.4 2.2-2.6 4.4-2.6 3.8 0 6 3.9 4.5 7.3C19.6 16.4 12 21 12 21Z"/></svg>' }
  };
  var cache = {};
  // devolve o SVG (texto) de um carimbo pré-definido, já com a cor; para 'latte' vai buscar o ficheiro
  function svgTexto(id, cor) {
    var p = P[id] || P.latte;
    if (p.svg) return Promise.resolve(p.svg.replace(/COR/g, cor));
    var k = 'f:' + p.ficheiro;
    var f = cache[k] || (cache[k] = fetch(p.ficheiro, { cache: 'force-cache' }).then(function (r) { return r.text(); }));
    return f.then(function (t) { return t.replace(/currentColor/g, cor); });
  }
  // HTML para mostrar o carimbo dentro de um elemento
  function html(id, cor) {
    if (/^https:\/\//.test(id || '')) return Promise.resolve('<img src="' + String(id).replace(/"/g, '&quot;') + '" alt="" style="width:100%;height:100%;object-fit:contain">');
    return svgTexto(id, cor);
  }
  // imagem para desenhar num canvas
  function imagem(id, cor) {
    return new Promise(function (ok, ko) {
      var img = new Image();
      img.onload = function () { ok(img); }; img.onerror = ko;
      if (/^https:\/\//.test(id || '')) { img.crossOrigin = 'anonymous'; img.src = id; return; }
      svgTexto(id, cor).then(function (t) { img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t); }, ko);
    });
  }
  window.DS_CARIMBOS = { lista: P, html: html, imagem: imagem };
})();
