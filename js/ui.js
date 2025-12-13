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

const toggle = document.getElementById("menuToggle");
const button = document.querySelector(".menu-btn");

if (toggle && button) {
  toggle.addEventListener("change", () => {
    button.setAttribute(
      "aria-expanded",
      toggle.checked ? "true" : "false"
    );
  });
}
