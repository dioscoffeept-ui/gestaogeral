// REGRA FIXA E GLOBAL da pré-visualização de links (WhatsApp, iMessage, Telegram, Facebook, X, LinkedIn…).
// Ver PRE-VISUALIZACAO.md. TODAS as páginas .html de diostock.pt (incluindo as que recebem ?t=, ?n=, ?v=…,
// e as geradas em n/, k/ e m/) têm de mostrar o BANNER GRANDE (imagem em cima, texto em baixo), nunca a miniatura lateral.
// Cada página tem de ter:
//   og:title, og:description, og:url (em https://diostock.pt/, sem query string)
//   og:image e og:image:secure_url iguais, em https://diostock.pt/, com ?v= (força o WhatsApp a ir buscar de novo)
//   og:image:width=1200, og:image:height=630, og:image:type, og:image:alt
//   twitter:card=summary_large_image e twitter:image
//   imagem real 1200×630 (1.91:1), JPEG ou PNG, até 300 KB
// Falha (código 1) se alguma página quebrar a regra: assim nada de errado é publicado.
// Não remover nem afrouxar sem autorização do dono do Dio'Stock.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const BASE = 'https://diostock.pt/';
// páginas que NÃO são páginas (ficheiro de verificação do Google). Nada mais entra aqui sem autorização.
const ignorar = new Set(['googlef1d52643ef164d85.html']);
const PASTAS_FORA = new Set(['node_modules', '.git', '.github', 'scripts', 'fontes']);
function andar(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return PASTAS_FORA.has(e.name) ? [] : andar(p);
    return e.name.endsWith('.html') && !ignorar.has(p) ? [p] : [];
  });
}
const paginas = andar('.').map(p => p.replace(/^\.\//, '')).sort();
const meta = (h, p) => { const m = h.match(new RegExp(`<meta[^>]+(?:property|name)="${p.replace(/[:]/g, '\\:')}"[^>]+content="([^"]*)"`, 'i')); return m ? m[1].replace(/&amp;/g, '&') : null; };
const erros = [];
const vistas = new Map();
for (const f of paginas) {
  const h = fs.readFileSync(f, 'utf8');
  const img = meta(h, 'og:image'), sec = meta(h, 'og:image:secure_url'), w = meta(h, 'og:image:width'), hh = meta(h, 'og:image:height');
  const tc = meta(h, 'twitter:card'), ti = meta(h, 'twitter:image'), url = meta(h, 'og:url');
  for (const p of ['og:title', 'og:description', 'og:image:type', 'og:image:alt']) if (!meta(h, p)) erros.push(`${f}: falta ${p}`);
  if (!url || !url.startsWith(BASE) || url.includes('?')) erros.push(`${f}: og:url tem de ser o endereço da página em ${BASE}, sem query string (está ${url})`);
  if (!img) { erros.push(`${f}: sem og:image`); continue; }
  if (sec !== img) erros.push(`${f}: og:image:secure_url tem de ser igual a og:image`);
  if (ti !== img) erros.push(`${f}: twitter:image tem de ser igual a og:image`);
  if (!/\?v=[\w.-]+$/.test(img)) erros.push(`${f}: og:image tem de ter ?v= (senão o WhatsApp mostra a imagem antiga em cache)`);
  if (w !== '1200' || hh !== '630') erros.push(`${f}: og:image:width/height têm de ser 1200/630 (está ${w}/${hh})`);
  if (tc !== 'summary_large_image') erros.push(`${f}: twitter:card tem de ser summary_large_image (está ${tc})`);
  if (!img.startsWith(BASE)) { erros.push(`${f}: og:image fora de diostock.pt (${img})`); continue; }
  const local = decodeURIComponent(img.slice(BASE.length).split('?')[0]);
  if (!fs.existsSync(local)) { erros.push(`${f}: a imagem ${local} não existe`); continue; }
  if (!vistas.has(local)) {
    const m = await sharp(local).metadata(); vistas.set(local, { w: m.width, h: m.height, fmt: m.format, kb: Math.round(fs.statSync(local).size / 1024) });
  }
  const v = vistas.get(local);
  if (v.w !== 1200 || v.h !== 630) erros.push(`${f}: ${local} tem ${v.w}×${v.h} (tem de ser 1200×630, nunca quadrada nem vertical)`);
  if (!['jpeg', 'png'].includes(v.fmt)) erros.push(`${f}: ${local} é ${v.fmt} (tem de ser JPEG ou PNG)`);
  if (v.kb > 300) erros.push(`${f}: ${local} tem ${v.kb} KB (máximo 300 KB, senão o WhatsApp mostra miniatura)`);
}
if (erros.length) { console.error('Pré-visualização: REGRA QUEBRADA\n' + erros.join('\n')); process.exit(1); }
console.log(`Pré-visualização OK: ${paginas.length} páginas, todas com banner 1200×630 e summary_large_image.`);
