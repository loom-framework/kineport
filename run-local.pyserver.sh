#!/bin/bash
#
# =====================================================================
#  run-local.pyserver.sh
# ---------------------------------------------------------------------
#  Purpose:
#      Run a simple local static web server for your PWA using Python.
#      This behaves almost exactly like GitHub Pages / Cloudflare Pages.
#
#  Why Python?
#      - No dependencies (Python is installed on Linux by default)
#      - Supports service workers on localhost
#      - Correctly serves static files (HTML, CSS, JS, manifest)
#      - Fast and simple for development
#
#  Usage:
#      1. Make executable (run once):
#         chmod +x run-local.pyserver.sh
#
#      2. Start server:
#         ./run-local.pyserver.sh
#
#      3. Open in browser:
#         http://localhost:8080
#
#  How to stop:
#      - Press CTRL + C in the terminal
#      - OR close the terminal window
#
#  Notes:
#      - Your PWA service worker will register correctly.
#      - Offline caching can be tested in Chrome DevTools.
#      - This server only serves static files (same as Cloudflare Pages).
# =====================================================================

# Navigate to the directory where this script is located (project root)
cd "$(dirname "$0")"

# Start Python static HTTP server on port 8080
python3 -m http.server 8080
