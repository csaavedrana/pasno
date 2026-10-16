// Pasnó: guarda la app en el teléfono para que abra sin señal. Siempre intenta la versión nueva primero.
const CACHE = 'pasno-v6';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.hostname.endsWith('supabase.co')) return; // los datos van siempre directo a Supabase
  // los archivos de la app se revisan con GitHub cada vez (no-cache), así una versión nueva llega altiro
  const same = u.origin === self.location.origin;
  e.respondWith((same ? fetch(u.href, { cache: 'no-cache' }) : fetch(e.request)).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
