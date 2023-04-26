var PRECACHE = 'precache-v-13.11.2021';
var RUNTIME = 'runtime-v-13.11.2021';

// list the files you want cached by the service worker
/*PRECACHE_URLS = [
  './',
  'css/main.css'
];*/
PRECACHE_URLS = [];

// the rest below handles the installing and caching
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // avoid precache home-page
  const homePages = ['https://titenko.github.io/staff', 'http://localhost'];
  if(homePages.includes(event.request.url) || homePages.map(uri => `${uri}/`).includes(event.request.url)){
    return null;
  }
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          console.log('cached response', cachedResponse.url)
          return cachedResponse;
        }
        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
