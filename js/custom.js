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


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then((reg) => {

        // If a new SW is already waiting
        if (reg.waiting) {
            notifyUpdate();
        }

        // Detect new SW installation
        reg.addEventListener("updatefound", () => {
            const newSW = reg.installing;
            newSW.addEventListener("statechange", () => {
                if (newSW.state === "installed" && navigator.serviceWorker.controller) {
                    notifyUpdate();
                }
            });
        });
    });
}

// Ask SW to show system notification
function notifyUpdate() {
    navigator.serviceWorker.ready.then((reg) => {
        reg.active.postMessage({ action: "notify-update" });
    });
}

// When user taps notification → activate new SW
navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
});

