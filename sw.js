const CACHE_NAME = 'wcst-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './FNT512.png',
  './FNT512-transparent.png'
];

// インストール時にリソースをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        self.skipWaiting();
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
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// フェッチ時にキャッシュから返す（オフライン対応）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればそれを返す
        if (response) {
          return response;
        }
        
        // なければネットワークから取得
        return fetch(event.request).then(response => {
          // 有効なレスポンスでない場合はそのまま返す
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // レスポンスをクローンしてキャッシュに保存
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // オフライン時のフォールバック
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

// バックグラウンド同期でキャッシュを更新
self.addEventListener('sync', event => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

// キャッシュ更新関数
async function updateCache() {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    // ネットワークから最新のリソースを取得
    const requests = urlsToCache.map(url => 
      fetch(url).then(response => 
        cache.put(url, response)
      ).catch(err => 
        console.log('Failed to update cache for:', url, err)
      )
    );
    
    await Promise.all(requests);
    console.log('Cache updated successfully');
  } catch (error) {
    console.error('Cache update failed:', error);
  }
}

// メッセージリスナー（手動キャッシュ更新用）
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'updateCache') {
    event.waitUntil(updateCache());
  }
});
