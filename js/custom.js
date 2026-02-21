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





