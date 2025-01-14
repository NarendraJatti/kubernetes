# app.py

from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

# Set the port and host for the HTTP server
PORT = 5000
Handler = SimpleHTTPRequestHandler

# Start the HTTP server to serve the static HTML file
with TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
