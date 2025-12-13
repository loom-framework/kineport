// Simple client-side include loader + robust service worker registration
  (function () {
    async function loadComponent(id, path) {
      try {
        const el = document.getElementById(id);
        if (!el) return;
        const res = await fetch(path, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`${path} ${res.status} ${res.statusText}`);
        el.innerHTML = await res.text();
      } catch (err) {
        console.error('Failed to load component:', path, err);
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      loadComponent('component-header', '/components/header.html');
      loadComponent('component-nav', '/components/nav.html');
      loadComponent('component-footer', '/components/footer.html');
    });

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async function () {
        try {
          const reg = await navigator.serviceWorker.register('/service-worker.js');
          console.log('SW registered. scope:', reg.scope);

          if (reg.installing) console.log('SW installing');
          else if (reg.waiting) console.log('SW installed & waiting');
          else if (reg.active) console.log('SW active');

          reg.addEventListener('updatefound', function () {
            const newWorker = reg.installing;
            console.log('SW update found, state:', newWorker && newWorker.state);
            if (newWorker) {
              newWorker.addEventListener('statechange', function () {
                console.log('New SW state:', newWorker.state);
              });
            }
          });

          if (navigator.serviceWorker.controller) {
            console.log('This page is currently controlled by a service worker.');
          } else {
            console.log('This page is not yet controlled by a service worker. Reload after install to be controlled.');
          }
        } catch (err) {
          console.warn('SW registration failed:', err);
        }
      });
    }
  })();