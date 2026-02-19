// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------



async function updateApiStatus() {
  const el = document.getElementById("api-result");
  if (!el) return;

  el.textContent = "Connecting...";

  try {
    const status = await testAPI(); // GET /test

    let output = `Front: ${status.front} | DB: ${status.db}`;
    if (status.error) {
      output += ` | Error: ${status.error}`;
    }

    el.textContent = output;
  } catch (err) {
    el.textContent = `Front: ERROR | DB: UNKNOWN | Error: ${err.message}`;
  }
}

document.addEventListener("DOMContentLoaded", updateApiStatus);
