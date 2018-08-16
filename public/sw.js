self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open("neighborhood-cache").then(function (cache) {
          console.log(cache);
          console.log('Opened cache');
          return cache.addAll([
            '/',
            './index.html',
            './src/App.css',
            './src/App.js',
            './src/back.svg',
            './src/index.css',
            './src/index.js',
            './src/Map.js',
            './src/MapContainer.js',
            './src/Selected.js',
          ]);
        })
    );
  });

  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', function(event){
    event.respondWith(
      caches.match(event.request).then(function(response){
        if(response) return response;
        return fetch(event.request);
      })
      .catch(console.log("OOps!"))
    );
});
///

/*const foursquare = require('react-foursquare')({
    clientID: 'P0PILRG0UQJV5ARRV3BGQDUEQJ1GORQE2EX0OQ54WH3KN2M2',
    clientSecret: '4LISVBZWWF4BFAC5FCI3GRQOM5L0JOHYQKU5PK0R0GSGQYLH'  
  });

const params = {
    "ll": "46.3696,25.7954",
    "query": 'csarda restaurant'}


    let items;
    items = fetch(foursquare.venues.getVenues(params))
    .then(res=> {
        return res.json()
  });


localStorage.setItem('itemsArray', JSON.stringify(items));*/