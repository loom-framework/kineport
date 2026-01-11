
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

// ------------------------------
// NOTIFICATION PERMISSION LOGIC
// ------------------------------

// Event delegation: works even if header loads later
document.addEventListener("click", async (e) => {
    if (e.target.id !== "enable-notifications") return;

    if (!("Notification" in window)) {
        console.warn("Notifications are not supported in this browser.");
        return;
    }

    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);

    if (permission === "granted") {
        e.target.style.display = "none";

        // Optional: test notification
        new Notification("Notifications enabled", {
            body: "You will now receive updates."
        });
    }
});

// Hide button automatically if permission already granted
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission === "granted") {
        const btn = document.getElementById("enable-notifications");
        if (btn) btn.style.display = "none";
    }
});

// ------------------------------
// THEMES
// ------------------------------


// Restore theme on load
(function restoreTheme() {
    let saved = null;

    try {
        saved = localStorage.getItem('theme');
    } catch (e) {}

    const theme = saved || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.checked = theme === 'dark';
        toggle.setAttribute('aria-pressed', theme === 'dark');
    }
})();


// Global click handler (safe even if toggle doesn't exist yet)
document.addEventListener('click', function (e) {
    if (e.target?.id === 'theme-toggle') {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        e.target.checked = next === 'dark';
        e.target.setAttribute('aria-pressed', next === 'dark');

        try { localStorage.setItem('theme', next); } catch (e) {}
    }
});

// ------------------------------
// PRINTING
// ------------------------------



// Universal print button
document.addEventListener('click', function (e) {
    if (e.target?.id === 'print-page') {

        // Close drawer before print
        const drawer = document.querySelector('.mobile-drawer');
        if (drawer) drawer.classList.remove('open');

        // Allow layout to update before printing
        setTimeout(() => window.print(), 50);
    }
});

// Ensure drawer is closed before print
window.addEventListener('beforeprint', () => {
    const drawer = document.querySelector('.mobile-drawer');
    if (drawer) drawer.classList.remove('open');
});

// ------------------------------
// SERVICE WORKER UPDATE LOGIC
// ------------------------------

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");

    navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
    });
}

