let cacheName = "my-jogo-da-velha-pwa";
let filesToCache = ["/", "/index.html", "/css/style.css", "/js/main.js"];

self.addEventListener("install", (e) => {
    e.waitUntill(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});