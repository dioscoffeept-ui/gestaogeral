// Cartão de fidelidade: abre do ecrã principal mesmo com internet fraca. Os carimbos vêm sempre da rede.
const CACHE = 'cartao-14';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./cartao.html', './carimbos.js', './selo-latte.svg', './cartao-icon-192.png'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('cartao-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; })
    .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./cartao.html'))));
});
