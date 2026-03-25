// v8 - no caching at all, pass everything through
const CACHE = 'hb-v8';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});
// Let ALL requests go to network — no caching
self.addEventListener('fetch', () => {});
