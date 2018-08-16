window.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open("neighborhood-cache").then(function (cache) {
          console.log(cache);
          console.log('Opened cache');
          return cache.addAll([
            '/',
            './public/index.html',
            './src/App.css',
            './src/App.js',
            './src/back.svg',
            './src/index.css',
            './src/index.js',
            './src/Map.js',
            './src/MapContainer.js',
            './src/registerServiceWorker.js',
            './src/Selected.js'
          ]);
        })
    );
  });

  window.addEventListener('activate', function(event) {
    event.waitUntil(window.clients.claim());
  });

  window.addEventListener('fetch', function(event){
    event.respondWith(
      caches.match(event.request).then(function(response){
        if(response) return response;
        return fetch(event.request);
      })
      .catch(console.log("OOps!"))
    );
});