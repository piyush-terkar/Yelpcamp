const CACHE = "SW-cache";

const toCache = [
  "/",
  "/campgrounds",
  "/login",
  "/register",
  "/images/icon.svg",
  "/images/icon512.png",
  "/images/icon192.png",
  "/javascripts/clusterMap.js",
  "/javascripts/showPageMap.js",
  "/javascripts/validateForms.js",
  "/javascripts/pwa.js",
  "/stylesheets/app.css",
  "/stylesheets/home.css",
  "/stylesheets/stars.css",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      const cache = caches.open(CACHE);
      return cache.match(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
