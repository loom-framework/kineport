const CACHE_NAME = "my-w3c-app-cache-v1";
const PRECACHE_URLS = [
    "/",
    "/index.html",
    "/about",
    "/contact",
    "/offline",
    "/css/variables.css",
    "/css/base.css",
    "/css/typography.css",
    "/css/layout.css",
    "/css/components.css",
    "/css/themes.css",
    "/js/main.js",
    "/js/ui.js",
    "/js/storage.js",
    "/js/offline.js",
    "/js/install.js",
    "/components/header.html",
    "/components/nav.html",
    "/components/footer.html"
];

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
    const req = event.request;
    // network-first for navigation
    if (req.mode === "navigate") {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(req, copy));
                    return res;
                })
                .catch(() => caches.match("/offline.html"))
        );
        return;
    }
    // cache-first for other GET requests
    if (req.method === "GET") {
        event.respondWith(
            caches.match(req).then(
                (cached) =>
                    cached ||
                    fetch(req)
                        .then((res) => {
                            const copy = res.clone();
                            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
                            return res;
                        })
                        .catch(() => caches.match("/offline.html"))
            )
        );
    }
});
