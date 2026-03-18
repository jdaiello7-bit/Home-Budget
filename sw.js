// v6 - clears all previous caches on install
const CACHE = 'hb-v6';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// No caching — always fetch fresh
self.addEventListener('fetch', e => {
  if (e.request.url.includes('supabase') ||
      e.request.url.includes('unpkg') ||
      e.request.url.includes('jsdelivr') ||
      e.request.url.includes('fonts')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
