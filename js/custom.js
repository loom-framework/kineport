// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------


async function testAPI() {
    const res = await fetch("https://fancy-sound-b19d.loom-framework.workers.dev/");
    const data = await res.json();
    document.getElementById("api-result").textContent = data.message;
}

document.addEventListener("DOMContentLoaded", testAPI);







