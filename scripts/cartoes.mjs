// Cria uma página por cartão de fidelidade (n/<código>/), com a imagem do cartão para a pré-visualização do WhatsApp.
// Corre no GitHub Actions; só lê dados públicos (os mesmos que aparecem no link do cartão).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const URL_SB = 'https://brisrzuvvxkkzhmhsgro.supabase.co';
const KEY = 'sb_publishable_Xq7qC8tz_NJcP6-SGViiLA_yNhVHaSs';
const BASE = 'https://diostock.pt/';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let dados;
if (process.env.FID_JSON) dados = JSON.parse(fs.readFileSync(process.env.FID_JSON, 'utf8'));   // teste local
else {
  const r = await fetch(URL_SB + '/rest/v1/rpc/fid_paginas', { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: '{}' });
  if (!r.ok) { console.error('Erro ao ler os cartões', r.status, await r.text()); process.exit(1); }
  dados = await r.json();
}
const lista = dados.filter(p => /^[A-Za-z0-9]{6}$/.test(p.curto || ''));

// ============================================================================================
// REGRA FIXA (não remover nem alterar sem autorização do dono do Dio'Stock):
// a pré-visualização no WhatsApp é SEMPRE o banner grande (imagem horizontal em cima, texto em baixo).
// Por isso TODA a og:image publicada aqui é um JPEG de exatamente 1200×630 (1.91:1), com menos de 300 KB,
// com margem à volta do conteúdo, e as páginas declaram og:image:width=1200, og:image:height=630
// e twitter:card=summary_large_image. Imagens quadradas, verticais ou pequenas NUNCA vão diretas para og:image:
// são postas dentro de um banner 1200×630 (fundo desfocado da própria imagem + imagem inteira ao centro).
// O passo scripts/verificar-og.mjs falha a publicação se alguma página quebrar esta regra.
// ============================================================================================
const OG_W = 1200, OG_H = 630, OG_MAX = 280 * 1024, MARGEM = 40;
async function bannerOG(buf) {
  const img = sharp(buf, { failOn: 'none' }).rotate();
  const m = await img.metadata();
  let base;
  if (m.width === OG_W && m.height === OG_H) base = sharp(buf).rotate();   // já é 1200×630 (gerada pela app, já com margem)
  else {
    // fundo: a própria imagem a cobrir tudo, desfocada e um pouco escurecida; à frente: a imagem INTEIRA, com margem
    const fundo = await sharp(buf).rotate().resize(OG_W, OG_H, { fit: 'cover' }).blur(28).modulate({ brightness: 0.82 }).toBuffer();
    const frente = await sharp(buf).rotate().resize(OG_W - 2 * MARGEM, OG_H - 2 * MARGEM, { fit: 'inside', withoutEnlargement: false }).toBuffer();
    const fm = await sharp(frente).metadata();
    base = sharp(fundo).composite([{ input: frente, left: Math.round((OG_W - fm.width) / 2), top: Math.round((OG_H - fm.height) / 2) }]);
  }
  const plano = await base.flatten({ background: '#F6F3F0' }).resize(OG_W, OG_H, { fit: 'fill' }).toBuffer();
  for (const q of [86, 80, 74, 68, 60, 52]) {
    const out = await sharp(plano).jpeg({ quality: q, mozjpeg: true, chromaSubsampling: '4:2:0' }).toBuffer();
    if (out.length <= OG_MAX || q === 52) return out;
  }
}
// a imagem da pré-visualização fica guardada no próprio site, ao lado da página: og.jpg (sempre 1200×630).
// Para as mensagens (m/), a imagem original também fica como poster.jpg, para a página a mostrar sem cortes.
async function copiarImagem(src, dir, original) {
  if (!/^https:\/\//.test(src || '')) return '';
  const v = (src.match(/[?&]v=([\w-]+)/) || [])[1] || '';
  const f = path.join(dir, 'og.jpg');
  try {
    const r = await fetch(src); if (!r.ok) return '';
    const buf = Buffer.from(await r.arrayBuffer()); if (buf.length < 1000 || buf.length > 15e6) return '';
    if (original) { const fp = path.join(dir, 'poster.jpg'); const pj = await sharp(buf).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toBuffer(); if (!fs.existsSync(fp) || !fs.readFileSync(fp).equals(pj)) fs.writeFileSync(fp, pj); }
    const og = await bannerOG(buf);
    if (!fs.existsSync(f) || !fs.readFileSync(f).equals(og)) { fs.writeFileSync(f, og); console.log('imagem', dir); }
    return 'og.jpg' + (v ? '?v=' + v : '?v=' + crypto.createHash('sha1').update(og).digest('hex').slice(0, 8));
  } catch (e) { console.error('imagem', src, e.message); return fs.existsSync(f) ? 'og.jpg' : ''; }
}

const pasta = path.resolve('n');
const feitos = new Set();
for (const p of lista) {
  const dir = path.join(pasta, p.curto); fs.mkdirSync(dir, { recursive: true });
  // imagem da pré-visualização: o cartão real da loja (1200×630), guardada aqui ao lado da página.
  // Se ainda não existir, fica a cartao-og.png. As meta og:* e twitter:card são obrigatórias: não apagar.
  const local = await copiarImagem(p.imagem, dir);
  const titulo = `${p.nome}${p.loja ? ' · ' + p.loja : ''}`, img = local ? BASE + 'n/' + p.curto + '/' + local : BASE + 'cartao-og.png', url = BASE + 'n/' + p.curto + '/';
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
<meta property="og:image:type" content="${local ? 'image/jpeg' : 'image/png'}">
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

// ---------- cartão de cada cliente: k/<token>/ com a imagem REAL do cartão dele (1200×630), para a pré-visualização grande do WhatsApp
// O token não é o código do cartão: o link enviado leva ?c=<código>, que nunca fica escrito na página.
{
  let ks = [];
  if (process.env.K_JSON) ks = JSON.parse(fs.readFileSync(process.env.K_JSON, 'utf8'));
  else {
    const r = await fetch(URL_SB + '/rest/v1/rpc/fid_cartoes_og', { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: '{}' });
    if (r.ok) ks = await r.json(); else console.error('Erro ao ler os cartões dos clientes', r.status, await r.text());
  }
  const pk = path.resolve('k'); fs.mkdirSync(pk, { recursive: true });
  const vivos = new Set();
  for (const c of ks) {
    if (!/^[A-Za-z0-9]{12}$/.test(c.tok || '') || !/^[a-z0-9]{1,16}$/.test(c.v || '')) continue;
    const dir = path.join(pk, c.tok); fs.mkdirSync(dir, { recursive: true }); vivos.add(c.tok);
    const f = path.join(dir, 'index.html');
    // só volta a copiar a imagem quando o cartão mudou (a versão vem na página)
    let local = fs.existsSync(f) && fs.readFileSync(f, 'utf8').includes('og.jpg?v=' + c.v + '"') ? 'og.jpg?v=' + c.v : '';
    if (!local) { const l = await copiarImagem(c.imagem + '?v=' + c.v, dir); local = l ? 'og.jpg?v=' + c.v : ''; }
    if (!local) continue;   // sem imagem não se publica (o WhatsApp mostraria a miniatura)
    const titulo = `O seu cartão de fidelidade${c.loja ? ' · ' + c.loja : ''}`, desc = 'Toque para ver os seus carimbos e quanto falta para o prémio.';
    const img = BASE + 'k/' + c.tok + '/' + local, url = BASE + 'k/' + c.tok + '/';
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
<meta property="og:image:alt" content="${esc(titulo)}">
<meta property="og:locale" content="pt_PT">
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(img)}">
<script>var c=(new URLSearchParams(location.search).get('c')||'').replace(/[^A-Za-z0-9]/g,'');location.replace('../../cartao.html'+(c?'?k='+c:''));</script>
<style>body{font-family:system-ui,sans-serif;background:#F6F3F0;color:#231F20;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center}</style>
</head><body><p>A abrir o seu cartão…</p></body></html>
`;
    if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== html) { fs.writeFileSync(f, html); console.log('cliente', c.tok); }
  }
  for (const d of fs.readdirSync(pk, { withFileTypes: true })) {
    if (d.isDirectory() && /^[A-Za-z0-9]{12}$/.test(d.name) && !vivos.has(d.name)) { fs.rmSync(path.join(pk, d.name), { recursive: true }); console.log('removido k', d.name); }
  }
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
  const localC = await copiarImagem(c.imagem, dir, true);
  const br = cor(c.cor), img = localC ? BASE + 'm/' + c.curto + '/' + localC : BASE + 'cartao-og.png', url = BASE + 'm/' + c.curto + '/';
  const poster = localC && fs.existsSync(path.join(dir, 'poster.jpg')) ? 'poster.jpg?' + localC.split('?')[1] : (https(c.imagem) || '');
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
<meta property="og:image:type" content="${localC ? 'image/jpeg' : 'image/png'}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(titulo)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="pt_PT">
<meta name="description" content="${esc(desc)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${br}">
<link rel="stylesheet" href="${BASE}fontes/fontes.css">
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
${poster ? `<img class="pst" src="${esc(poster)}" alt="${esc(c.titulo)}">` : ''}
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
