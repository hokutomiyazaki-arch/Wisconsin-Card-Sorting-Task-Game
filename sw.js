// Simple Service Worker
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching', e.request.url);
  e.respondWith(fetch(e.request));
});
