// --- Versioning -------------------------------------------------------------
const SW_VERSION = "v36"; 
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

// --- Install: precache and activate immediately -----------------------------
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
    );

    // Activate new SW immediately
    self.skipWaiting();
});

// --- Activate: cleanup old caches and take control --------------------------
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

// --- Fetch ------------------------------------------------------------------
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


// RSS



// Place sw.js at the root: https://yourdomain.com/sw.js
// And register it from your main JS with: navigator.serviceWorker.register('/sw.js');


/*
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Serve virtual RSS at https://yourdomain.com/rss.xml
  if (url.pathname === '/rss.xml') {
    event.respondWith(
      (async () => {
        const rss = await generateRSS();
        return new Response(rss, {
          headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
        });
      })()
    );
    return;
  }
});

*/

