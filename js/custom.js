// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------



import { testAPI, apiGet } from "./api.js";

// Wait until #api-result appears
const observer = new MutationObserver(() => {
    const el = document.getElementById("api-result");
    if (!el) return;

    observer.disconnect();
    updateApiStatus();
});

observer.observe(document.body, { childList: true, subtree: true });

async function updateApiStatus() {
    const el = document.getElementById("api-result");
    if (!el) return;

    el.textContent = "Connecting...";

    try {
        const status = await testAPI();

        let html = `
            <div class="section-title">System Status</div>
            <div>Front: <strong>${status.front}</strong></div>
            <div>Database: <strong>${status.db}</strong></div>

            <div class="section-title" style="margin-top:6px;">API Endpoints</div>
            <ul>
        `;

        for (const ep of status.endpoints) {
            let epStatus = "UNKNOWN";

            try {
                const res = await apiGet(ep.path);
                epStatus = res ? "OK" : "FAIL";
            } catch {
                epStatus = "ERROR";
            }

            html += `
                <li>
                    <span class="status-icon">${epStatus === "OK" ? "✓" : "✗"}</span>
                    <span>${ep.name}</span>
                    <code>${ep.path}</code>
                </li>
            `;
        }

        html += `</ul>`;
        el.innerHTML = html;

    } catch (err) {
        el.innerHTML = `
            <div class="section-title">System Status</div>
            <div>Front: <strong>ERROR</strong></div>
            <div>Database: <strong>UNKNOWN</strong></div>
            <div style="margin-top:6px; color:#b00;">${err.message}</div>
        `;
    }
}


// -----------------------------------------------------------------------------


async function registerPushSubscription() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("Push not supported in this browser.");
        return;
    }

    const registration = await navigator.serviceWorker.register("/service-worker.js");

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BGqm1N4BWw7Npp1xWPEGBegl2ABSh1101CFwOqPecYCMmo2OAlJiecR74tfajuL0DcIdVAy113AQD_OP6qeBZos"
    });

    await fetch("/api/user/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription)
    });
}

// Auto-run if permission already granted
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission === "granted") {
        registerPushSubscription().catch(console.error);
    }
});

// Also run after your existing script requests permission
document.addEventListener("click", () => {
    setTimeout(() => {
        if (Notification.permission === "granted") {
            registerPushSubscription().catch(console.error);
        }
    }, 300);
});






