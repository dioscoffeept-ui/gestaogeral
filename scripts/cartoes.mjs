// Cria uma página por cartão de fidelidade (n/<código>/), com a imagem do cartão para a pré-visualização do WhatsApp.
// Corre no GitHub Actions; só lê dados públicos (os mesmos que aparecem no link do cartão).
import fs from 'node:fs';
import path from 'node:path';

const URL_SB = 'https://brisrzuvvxkkzhmhsgro.supabase.co';
const KEY = 'sb_publishable_Xq7qC8tz_NJcP6-SGViiLA_yNhVHaSs';
const BASE = 'https://dioscoffeept-ui.github.io/gestaogeral/';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let dados;
if (process.env.FID_JSON) dados = JSON.parse(fs.readFileSync(process.env.FID_JSON, 'utf8'));   // teste local
else {
  const r = await fetch(URL_SB + '/rest/v1/rpc/fid_paginas', { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: '{}' });
  if (!r.ok) { console.error('Erro ao ler os cartões', r.status, await r.text()); process.exit(1); }
  dados = await r.json();
}
const lista = dados.filter(p => /^[A-Za-z0-9]{6}$/.test(p.curto || ''));

const pasta = path.resolve('n');
const feitos = new Set();
for (const p of lista) {
  const dir = path.join(pasta, p.curto); fs.mkdirSync(dir, { recursive: true });
  const titulo = `${p.nome}${p.loja ? ' · ' + p.loja : ''}`, img = p.imagem || BASE + 'cartao-og.png', url = BASE + 'n/' + p.curto + '/';
  const html = `<!doctype html>
<html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="robots" content="noindex">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(p.loja || "Dio'Stock")}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(p.descricao)}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:secure_url" content="${esc(img)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(titulo)}">
<meta property="og:locale" content="pt_PT">
<meta name="description" content="${esc(p.descricao)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary_large_image">
<script>location.replace('../../cartao.html?n=${p.curto}' + location.hash);</script>
<style>body{font-family:system-ui,sans-serif;background:#F6F3F0;color:#231F20;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center}a{color:#231F20;font-weight:700}</style>
</head><body><p><a href="../../cartao.html?n=${p.curto}">Abrir o cartão</a></p></body></html>
`;
  const f = path.join(dir, 'index.html');
  if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== html) { fs.writeFileSync(f, html); console.log('atualizado', p.curto); }
  // manifesto da app do cartão (Android: "Instalar" num toque). Abre o cartão do cliente guardado neste telemóvel.
  const ic = p.icone || '';
  const icons = ic ? [{ src: ic.replace('fid-icone-512.png', 'fid-icone-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: ic, sizes: '512x512', type: 'image/png', purpose: 'any' }, { src: ic, sizes: '512x512', type: 'image/png', purpose: 'maskable' }]
    : [{ src: '../../cartao-icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '../../cartao-icon-512.png', sizes: '512x512', type: 'image/png' }];
  const man = JSON.stringify({ id: '../../cartao.html?n=' + p.curto, name: (p.loja ? p.loja + ' · ' : '') + p.nome, short_name: (p.loja || p.nome || 'Cartão').slice(0, 12).trim(),
    start_url: '../../cartao.html?n=' + p.curto + '&app=1', scope: '../../', display: 'standalone', background_color: '#F6F3F0', theme_color: '#983808', icons }, null, 1) + '\n';
  const fm = path.join(dir, 'manifest.webmanifest');
  if (!fs.existsSync(fm) || fs.readFileSync(fm, 'utf8') !== man) { fs.writeFileSync(fm, man); console.log('manifesto', p.curto); }
  feitos.add(p.curto);
}
// cartões apagados ou em pausa: a página deixa de existir (o link antigo com ?código continua a funcionar)
for (const d of fs.readdirSync(pasta, { withFileTypes: true })) {
  if (d.isDirectory() && /^[A-Za-z0-9]{6}$/.test(d.name) && !feitos.has(d.name)) { fs.rmSync(path.join(pasta, d.name), { recursive: true }); console.log('removido', d.name); }
}
