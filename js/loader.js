// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------


// Simple client-side include loader + robust service worker registration
(function () {

  // ------------------------------------------------------------
  // Component Loader
  // ------------------------------------------------------------
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
  } // ✅ closes loadComponent()


  // ------------------------------------------------------------
  // MutationObserver to hide notification button
  // ------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const navRoot = document.getElementById("component-nav");

    if (navRoot) {
      const observer = new MutationObserver(() => {
        const btn = document.getElementById("enable-notifications");
        if (btn && Notification.permission === "granted") {
          btn.style.display = "none";
        }
      });

      observer.observe(navRoot, {
        childList: true,
        subtree: true
      });
    }
  });


  // ------------------------------------------------------------
  // Load components after DOM is ready
  // ------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    loadComponent('component-header', '/components/header.html');
    loadComponent('component-nav', '/components/nav.html');
    loadComponent('component-footer', '/components/footer.html');
  });


  // ------------------------------------------------------------
  // Service Worker Registration
  // ------------------------------------------------------------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async function () {
      try {
        const reg = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Kineport registered. scope:', reg.scope);

        if (reg.installing) console.log('Kineport installing');
        else if (reg.waiting) console.log('Kineport installed & waiting');
        else if (reg.active) console.log('Kineport active');

        reg.addEventListener('updatefound', function () {
          const newWorker = reg.installing;
          console.log('Kineport update found, state:', newWorker && newWorker.state);
          if (newWorker) {
            newWorker.addEventListener('statechange', function () {
              console.log('New Kineport state:', newWorker.state);
            });
          }
        });

        if (navigator.serviceWorker.controller) {
          console.log('This page is currently controlled by Kineport.');
        } else {
          console.log('This page is not yet controlled by a Kineport. Reload after install to be controlled.');
        }

      } catch (err) {
        console.warn('Kineport registration failed:', err);
      }
    });
  }

})(); 





