// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------



import { testAPI, apiGet } from "./api.js";

// Wait until #api-result actually appears in the DOM
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

    el.innerHTML = "Connecting...";

    try {
        const status = await testAPI();

        let html = `
            <div style="font-size:14px; line-height:1.2;">
                <div><strong>Front:</strong> ${status.front}</div>
                <div><strong>Database:</strong> ${status.db}</div>
                <hr style="margin:6px 0;">
                <div><strong>API Endpoints:</strong></div>
                <ul style="padding-left:14px; margin:6px 0;">
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
                <li style="margin:2px 0; display:flex; gap:6px; align-items:center;">
                    <span style="width:16px;">${epStatus === "OK" ? "✓" : "✗"}</span>
                    <span>${ep.name}</span>
                    <code style="opacity:0.6; margin-left:auto;">${ep.path}</code>
                </li>
            `;
        }

        html += `
                </ul>
            </div>
        `;

        el.innerHTML = html;

    } catch (err) {
        el.innerHTML = `
            <div style="font-size:14px; line-height:1.2;">
                <div><strong>Front:</strong> ERROR</div>
                <div><strong>Database:</strong> UNKNOWN</div>
                <div><strong>Error:</strong> ${err.message}</div>
            </div>
        `;
    }
}




