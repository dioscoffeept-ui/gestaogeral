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

// ---------- mensagens aos clientes (eventos, promoções): uma página por mensagem, com a imagem para a pré-visualização do WhatsApp
let camps = [];
if (process.env.CAMP_JSON) camps = JSON.parse(fs.readFileSync(process.env.CAMP_JSON, 'utf8'));
else {
  const rc = await fetch(URL_SB + '/rest/v1/rpc/fid_campanhas_paginas', { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: '{}' });
  if (rc.ok) camps = await rc.json(); else console.error('Erro ao ler as mensagens', rc.status, await rc.text());
}
const pm = path.resolve('m'); fs.mkdirSync(pm, { recursive: true });
const feitasM = new Set();
const cor = c => /^#[0-9a-fA-F]{6}$/.test(c || '') ? c : '#983808';
const https = u => /^https:\/\//.test(u || '') ? u : '';
const linkar = t => esc(t).replace(/(https:\/\/[^\s<]+)/g, '<a href="$1" rel="noopener">$1</a>').replace(/\n/g, '<br>');
for (const c of camps.filter(c => /^[A-Za-z0-9]{6}$/.test(c.curto || ''))) {
  const dir = path.join(pm, c.curto); fs.mkdirSync(dir, { recursive: true });
  const br = cor(c.cor), img = https(c.imagem) || BASE + 'cartao-og.png', url = BASE + 'm/' + c.curto + '/';
  const desc = String(c.texto || '').replace(/\{nome\}/g, '').replace(/\s+/g, ' ').trim().slice(0, 180);
  const mapa = https(c.local_url) || (c.local ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.local) : '');
  const cartao = /^[A-Za-z0-9]{6}$/.test(c.prog_curto || '') ? '../../cartao.html?n=' + c.prog_curto : '';
  const titulo = c.titulo + (c.loja ? ' · ' + c.loja : '');
  const html = `<!doctype html>
<html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="robots" content="noindex">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(c.loja || "Dio'Stock")}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:secure_url" content="${esc(img)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="pt_PT">
<meta name="description" content="${esc(desc)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${br}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Schibsted+Grotesk:wght@400;600;800&display=swap" rel="stylesheet">
<style>
:root{--b:${br}}*{box-sizing:border-box}body{margin:0;background:#F6F3F0;color:#231F20;font:16px/1.55 'Schibsted Grotesk',system-ui,sans-serif}
main{max-width:520px;margin:0 auto;padding:16px 16px 40px}
header{display:flex;align-items:center;gap:12px;padding:6px 0 14px}header img{width:48px;height:48px;border-radius:14px;object-fit:cover;background:#fff}header b{font:800 20px 'Bricolage Grotesque',sans-serif}
.pst{width:100%;border-radius:20px;display:block;box-shadow:0 10px 30px rgba(36,21,14,.18)}
h1{font:800 30px/1.1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;margin:20px 0 8px}
.tx{background:#fff;border:1px solid #E4DCCF;border-radius:16px;padding:16px;margin-top:12px;overflow-wrap:anywhere}.tx a{color:var(--b);font-weight:700}
.bt{display:block;text-align:center;text-decoration:none;font-weight:800;padding:14px;border-radius:14px;margin-top:10px}
.p{background:var(--b);color:#fff}.s{background:#fff;color:#231F20;border:1.5px solid #E4DCCF}
footer{text-align:center;color:#7A6A60;font-size:13px;margin-top:26px}
</style></head><body><main>
<header>${https(c.logo) ? `<img src="${esc(c.logo)}" alt="">` : ''}<b>${esc(c.loja || '')}</b></header>
<img class="pst" src="${esc(img)}" alt="${esc(c.titulo)}">
<h1>${esc(c.titulo)}</h1>
<div class="tx">${linkar(String(c.texto || '').replace(/\{nome\}/g, '').replace(/^\s*Olá[^\n]{0,20}\n+/i, '').trim())}</div>
${mapa ? `<a class="bt p" href="${esc(mapa)}" rel="noopener">📍 ${esc(c.local || 'Ver no mapa')}</a>` : ''}
${cartao ? `<a class="bt ${mapa ? 's' : 'p'}" href="${cartao}">☕ Abrir o meu cartão de fidelidade</a>` : ''}
<footer>Feito com Dio'Stock</footer>
</main></body></html>
`;
  const f = path.join(dir, 'index.html');
  if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== html) { fs.writeFileSync(f, html); console.log('mensagem', c.curto); }
  feitasM.add(c.curto);
}
for (const d of fs.readdirSync(pm, { withFileTypes: true })) {
  if (d.isDirectory() && /^[A-Za-z0-9]{6}$/.test(d.name) && !feitasM.has(d.name)) { fs.rmSync(path.join(pm, d.name), { recursive: true }); console.log('mensagem removida', d.name); }
}
if (!fs.readdirSync(pm).length) fs.writeFileSync(path.join(pm, '.gitkeep'), '');
