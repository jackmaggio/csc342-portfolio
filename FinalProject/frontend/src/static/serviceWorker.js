function log(...data) {
  console.log("SWv1.0", ...data);
}

log("SW Script executing - adding event listeners");


const STATIC_CACHE_NAME = 'quizme-static-v0';

self.addEventListener('install', event => {
  log('install', event);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll([
        '/offline',
        //CSS
        '/css/course_selection_styles.css',
        '/css/course.css',
        '/css/create_studyset.css',
        '/css/discussion_replies_styles.css',
        '/css/discussion_styles.css',
        '/css/login_styles.css',
        '/css/menu_styles.css',
        '/css/offline.css',
        '/css/post_discussion_styles.css',
        '/css/register_styles.css',
        '/css/studyset.css',
        '/css/styles.css',
        //Images
        '/images/logo.png',
        '/images/books.jpg',
        //Scripts
        '/js/APIClient.js',
        '/js/common.js',
        '/js/course_scripts.js',
        '/js/course_selection_scripts.js',
        '/js/discussion_replies_scripts.js',
        '/js/HTTPClient.js',
        '/js/login_scripts.js',
        '/js/menu_scripts.js',
        '/js/post_discussion_scripts.js',
        '/js/register_scripts.js',
        '/js/studyset_creation_scripts.js',
        '/js/studyset_scripts.js',
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  log('activate', event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('quizme-') && cacheName != STATIC_CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  var requestUrl = new URL(event.request.url);
  //Treat API calls (to our API) differently
  if (requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/api')) {
    //If we are here, we are intercepting a call to our API
    if (event.request.method === "GET") {
      //Only intercept (and cache) GET API requests
      event.respondWith(
        cacheFirst(event.request)
      );
    }
  }
  else {
    //If we are here, this was not a call to our API
    event.respondWith(
      cacheFirst(event.request)
    );
  }

});


function cacheFirst(request) {
  return caches.match(request)
    .then(response => {
      //Return a response if we have one cached. Otherwise, get from the network
      return response || fetchAndCache(request);
    })
    .catch(error => {
      return caches.match('/offline');
    })
}

function fetchAndCache(request) {
  return fetch(request).then(response => {
    var requestUrl = new URL(request.url);
    // Cache everything except login
    if (response.ok && !requestUrl.pathname.startsWith('/login')) {
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        cache.put(request, response);
      });
    }
    return response.clone();
  });
}

self.addEventListener('message', event => {
  log('message', event.data);
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
