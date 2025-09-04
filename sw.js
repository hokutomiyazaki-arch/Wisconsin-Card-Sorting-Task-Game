const CACHE_NAME = 'fnt-card-sort-v1';
const urlsToCache = [
  './',
  './index.html',
  './FNT512.png',
  './FNT512-transparent.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
