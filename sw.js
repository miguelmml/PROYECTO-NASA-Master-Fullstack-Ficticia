



var CACHE_NAME = 'nasa-app-cache';
var urlsToCache = [
  '/index.html',
  '/css/styles.css',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  CacheStorage.Keys()
  event.respondWith(
    caches.match(event.request)
    // .then(console.log(event.request))
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('encontrado: ',response)
          return response;
        }
        console.log('no encontrado')
        return fetch(event.request);
      }
    )
  );
});