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

// service worker logic 

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then((reg) => {

        // If a new SW is already waiting
        if (reg.waiting) {
            showUpdateBanner();
        }

        // Detect new SW installation
        reg.addEventListener("updatefound", () => {
            const newSW = reg.installing;
            newSW.addEventListener("statechange", () => {
                if (newSW.state === "installed" && navigator.serviceWorker.controller) {
                    showUpdateBanner();
                }
            });
        });
    });
}

// Show in-page update banner
function showUpdateBanner() {
    const banner = document.getElementById("update-banner");
    banner.hidden = false;
    banner.classList.add("update-banner--visible");
}

// When user clicks "Update", activate new SW
document.getElementById("update-refresh-btn").addEventListener("click", async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg.waiting) {
        reg.waiting.postMessage({ action: "skipWaiting" });
    }
});

// Reload when new SW takes control
navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
});


// Notifications question 

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
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission === "granted") {
        const btn = document.getElementById("enable-notifications");
        if (btn) btn.style.display = "none";
    }
});



