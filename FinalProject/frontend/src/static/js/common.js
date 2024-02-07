import api from './APIClient.js';

api.getCurrentUser().then(user => {
  const logout = document.querySelector("#logout");
  if (logout) {
    logout.href="#";
    logout.addEventListener("click", e => {
    e.preventDefault();
    api.logOut().then(() => {
      document.location = "/login";
    });
  });
  }
})
.catch(error => {
  if(error.status === 401) {
    console.log("We are not logged in");
    console.log(document.location);
    if (document.location.pathname !== '/login' && document.location.pathname !== '/register') {
      document.location = '/login';
    }
  }
  else {
    console.log(`${error.status}`, error);
  }
});


/*********************\
* SERVICE WORKER CODE *
\*********************/

function registerServiceWorker() {
  if (!navigator.serviceWorker) { // Are SWs supported?
    console.log("Serviceworker not supported");
    return;
  }

  navigator.serviceWorker.register('/serviceWorker.js')
    .then(registration => {
      if (!navigator.serviceWorker.controller) {
        //Our page is not yet controlled by anything. It's a new SW
        return;
      }

      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed, but waiting');
      } else if (registration.active) {
        console.log('Service worker active');
      }

      registration.addEventListener('updatefound', () => {
        console.log("SW update found", registration, navigator.serviceWorker.controller);
      });
    })
    .catch(error => {
      console.error(`Registration failed with error: ${error}`);
    });

  navigator.serviceWorker.addEventListener('message', event => {
    console.log('SW message', event.data);
  })

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload" in dev tools.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if(refreshing) return;
    window.location.reload();
    refreshing = true;
  });

};

registerServiceWorker();


