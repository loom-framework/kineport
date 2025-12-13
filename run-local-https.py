#!/usr/bin/env python3
#
# =====================================================================
#  run-local-https.py (mkcert trusted version)
# ---------------------------------------------------------------------
#  This version uses mkcert-generated certificates that are
#  fully trusted by browsers (NO warnings).
#
#  REQUIREMENTS:
#      mkcert installed + mkcert -install
#      mkcert localhost   --> generates cert.pem + key.pem
#
#  USAGE:
#      python3 run-local-https.py
# =====================================================================

import http.server
import ssl
import socketserver

PORT = 8443

CERT_FILE = "cert.pem"
KEY_FILE = "key.pem"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)

def start_server():
    print(f"🔐 Using trusted mkcert certificate.")
    print(f"🚀 Serving HTTPS on https://localhost:{PORT}")

    httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)

    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)

    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down server…")
        httpd.server_close()

if __name__ == "__main__":
    start_server()
