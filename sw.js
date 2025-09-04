// Service Worker for Wisconsin Card Sorting Task - FNT
const CACHE_NAME = 'wcst-fnt-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  // 画像ファイルは動的にキャッシュ
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  self.skipWaiting(); // 即座に有効化
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Cache error:', err);
      })
  );
});

// アクティベート時に古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// フェッチ時の処理
self.addEventListener('fetch', event => {
  // 画像ファイルの404を防ぐ
  if (event.request.url.includes('.png') || event.request.url.includes('.jpg')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          // 画像が見つからない場合は、ネットワークから取得を試みる
          return fetch(event.request)
            .then(response => {
              // 成功したらキャッシュに保存
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return response;
            })
            .catch(() => {
              // 画像が取得できない場合は空のレスポンスを返す（404を防ぐ）
              return new Response('', {
                status: 200,
                statusText: 'OK',
                headers: new Headers({
                  'Content-Type': 'image/png'
                })
              });
            });
        })
    );
    return;
  }

  // その他のリクエスト
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // オフライン時はindex.htmlを返す
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
