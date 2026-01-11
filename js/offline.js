// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------

window.addEventListener("offline", () => {
  try {
    if ("serviceWorker" in navigator) console.log("offline - service worker active");
  } catch (e) {}
});
window.addEventListener("online", () => {
  console.log("You are online");
});
