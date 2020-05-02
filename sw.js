
/********SERVICE WORKER********/
if('serviceWorker' in navigator){
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
    .then(() => console.log('Service Worker registrado'))
    .catch((err) => console.error('Error en registro de SW: ', err))
  })
}else {
  console.warn('Service Worker no soportado por el navegador.')
}

var CACHE_NAME = 'nasa-app-cache';
var urlsToCache = [
  '/index.html',
  '/css/styles.css',
  '/js/main.js'
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

// self.addEventListener('fetch', function(event) {
//   console.log('fetch a : ', event)
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           console.log('encontrado: ',response)
//           return response;
//         }
//         console.log('no encontrado')
//         return fetch(event.request);
//       }
//     )
//   );
// });