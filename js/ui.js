/* ui.js — global UI interactions (component-safe) */

// Restore theme on load
(function restoreTheme() {
    try {
        const theme = localStorage.getItem('theme');
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    } catch (e) {}
})();

document.addEventListener('click', function (e) {

    /* ======================
       THEME TOGGLE
    ====================== */
    if (e.target?.id === 'theme-toggle') {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        e.target.setAttribute('aria-pressed', next === 'dark');

        try { localStorage.setItem('theme', next); } catch (e) {}
    }

});



/* ======================
       NAVBAR
    ====================== */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const drawer = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

let lastFocus = null;
const focusable =
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

function openMenu() {
  lastFocus = document.activeElement;
  drawer.hidden = false;
  overlay.hidden = false;

  requestAnimationFrame(() => drawer.classList.add("open"));

  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";

  drawer.querySelector(focusable).focus();
  document.addEventListener("keydown", trapFocus);
}

function closeMenu() {
  drawer.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";

  document.removeEventListener("keydown", trapFocus);

  setTimeout(() => {
    drawer.hidden = true;
    overlay.hidden = true;
    lastFocus.focus();
  }, 300);
}

function trapFocus(e) {
  if (e.key === "Escape") {
    closeMenu();
    return;
  }

  if (e.key !== "Tab") return;

  const items = drawer.querySelectorAll(focusable);
  const first = items[0];
  const last = items[items.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);