// Verifica a REGRA FIXA da pré-visualização (WhatsApp, iMessage, Facebook…): banner grande, nunca miniatura.
// Cada página pública partilhável tem de ter og:image de 1200×630 (JPEG/PNG < 300 KB, alojada em diostock.pt),
// og:image:width=1200, og:image:height=630 e twitter:card=summary_large_image.
// Falha (código 1) se alguma página quebrar a regra: assim nada de errado é publicado.
// Não remover nem afrouxar sem autorização do dono do Dio'Stock.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const BASE = 'https://diostock.pt/';
const fixas = ['index.html', 'cartao.html', 'c/index.html', 'conhecer/index.html', 'pedir.html', 'pagar.html', 'estado.html', 'ajuda.html', 'termos.html'];
const geradas = ['n', 'k', 'm'].flatMap(d => fs.existsSync(d) ? fs.readdirSync(d).map(x => path.join(d, x, 'index.html')).filter(f => fs.existsSync(f)) : []);
const meta = (h, p) => { const m = h.match(new RegExp(`<meta[^>]+(?:property|name)="${p.replace(/[:]/g, '\\:')}"[^>]+content="([^"]*)"`, 'i')); return m ? m[1].replace(/&amp;/g, '&') : null; };
const erros = [];
const vistas = new Map();
for (const f of [...fixas, ...geradas]) {
  if (!fs.existsSync(f)) { erros.push(`${f}: página em falta`); continue; }
  const h = fs.readFileSync(f, 'utf8');
  const img = meta(h, 'og:image'), w = meta(h, 'og:image:width'), hh = meta(h, 'og:image:height'), tc = meta(h, 'twitter:card');
  if (!img) { erros.push(`${f}: sem og:image`); continue; }
  if (w !== '1200' || hh !== '630') erros.push(`${f}: og:image:width/height têm de ser 1200/630 (está ${w}/${hh})`);
  if (tc !== 'summary_large_image') erros.push(`${f}: twitter:card tem de ser summary_large_image (está ${tc})`);
  if (!img.startsWith(BASE)) { erros.push(`${f}: og:image fora de diostock.pt (${img})`); continue; }
  const local = decodeURIComponent(img.slice(BASE.length).split('?')[0]);
  if (!fs.existsSync(local)) { erros.push(`${f}: a imagem ${local} não existe`); continue; }
  if (!vistas.has(local)) {
    const m = await sharp(local).metadata(); vistas.set(local, { w: m.width, h: m.height, kb: Math.round(fs.statSync(local).size / 1024) });
  }
  const v = vistas.get(local);
  if (v.w !== 1200 || v.h !== 630) erros.push(`${f}: ${local} tem ${v.w}×${v.h} (tem de ser 1200×630)`);
  if (v.kb > 300) erros.push(`${f}: ${local} tem ${v.kb} KB (máximo 300 KB, senão o WhatsApp mostra miniatura)`);
}
if (erros.length) { console.error('Pré-visualização: REGRA QUEBRADA\n' + erros.join('\n')); process.exit(1); }
console.log(`Pré-visualização OK: ${fixas.length + geradas.length} páginas, todas com banner 1200×630 e summary_large_image.`);
