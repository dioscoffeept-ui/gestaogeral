// Dio’Stock — service worker: abre o app mesmo com internet fraca.
// Os dados (Supabase) vão sempre à rede; só o próprio app fica guardado.
const CACHE = 'diostock-1793973003';
const APP = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './termos.html'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Supabase, Stripe, CDNs: direto à rede
  // rede primeiro (versão mais nova), cache se estiver sem internet
  // sem cache HTTP do navegador para o app: vê logo a versão nova
  const fresh = (req.mode === 'navigate' || /\.html?$|\/$/.test(url.pathname)) ? fetch(req, { cache: 'no-cache' }) : fetch(req);
  e.respondWith(fresh.then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
});

// avisos ao cliente: "o seu pedido está pronto"
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: e.data ? e.data.text() : 'Pedido' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Pedido pronto', {
    body: d.body || '', tag: d.tag || 'pedido', renotify: true, requireInteraction: true,
    icon: 'icon-192.png', badge: 'icon-192.png', vibrate: [300, 120, 300, 120, 600], data: { url: d.url || './' },
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    const w = ws.find(x => x.url.split('#')[0] === url);
    return w ? w.focus() : clients.openWindow(url);
  }));
});
