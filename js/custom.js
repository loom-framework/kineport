// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------



import { testAPI, apiGet } from "../api.js";

async function updateApiStatus() {
  const el = document.getElementById("api-result");
  if (!el) return;

  el.innerHTML = "Connecting...";

  try {
    const status = await testAPI();

    let html = `
      <div><strong>Front:</strong> ${status.front}</div>
      <div><strong>Database:</strong> ${status.db}</div>
      <hr>
      <div><strong>API Endpoints:</strong></div>
      <ul>
    `;

    for (const ep of status.endpoints) {
      let epStatus = "UNKNOWN";

      try {
        const res = await apiGet(ep.path);
        epStatus = res ? "OK" : "FAIL";
      } catch (err) {
        epStatus = "ERROR";
      }

      html += `
        <li>
          ${epStatus === "OK" ? "✓" : "✗"} 
          <strong>${ep.name}</strong> — <code>${ep.path}</code>
        </li>
      `;
    }

    html += "</ul>";
    el.innerHTML = html;

  } catch (err) {
    el.innerHTML = `
      <div><strong>Front:</strong> ERROR</div>
      <div><strong>Database:</strong> UNKNOWN</div>
      <div><strong>Error:</strong> ${err.message}</div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", updateApiStatus);

