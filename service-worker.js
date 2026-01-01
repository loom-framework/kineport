// --- Versioning -------------------------------------------------------------
const SW_VERSION = "v6"; // bump this for every release
const CACHE_NAME = `my-w3c-app-cache-${SW_VERSION}`;

const PRECACHE_URLS = [
    "/",
    "/about",
    "/contact",
    "/offline",
    "/debug",
    "/css/variables.css",
    "/css/base.css",
    "/css/typography.css",
    "/css/layout.css",
    "/css/components.css",
    "/css/themes.css",
    "/js/loader.js",
    "/js/main.js",
    "/js/ui.js",
    "/js/storage.js",
    "/js/offline.js",
    "/js/install.js",
    "/components/header.html",
    "/components/nav.html",
    "/components/footer.html"
];

// --- Install ---------------------------------------------------------------
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
    );
});

// --- Activate: cleanup old caches -----------------------------------------
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// --- Fetch -----------------------------------------------------------------
self.addEventListener("fetch", (event) => {
    const req = event.request;

    // Navigation: network-first
    if (req.mode === "navigate") {
        event.respondWith(
            fetch(req).catch(() => caches.match("/offline"))
        );
        return;
    }

    // Other GET requests: cache-first
    if (req.method === "GET") {
        event.respondWith(
            caches.match(req).then(
                (cached) =>
                    cached ||
                    fetch(req).then((res) => {
                        const copy = res.clone();
                        caches.open(CACHE_NAME).then((c) => c.put(req, copy));
                        return res;
                    })
            )
        );
    }
});

// --- Messaging: only skipWaiting for in-page update banner -----------------
self.addEventListener("message", (event) => {
    if (event.data && event.data.action === "skipWaiting") {
        self.skipWaiting();
    }
});
