import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import re
import sys

PORT = 8000

class StudioHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # 1. API Endpoint to directly parse match details from any FotMob URL
        if self.path.startswith('/api/match?url='):
            try:
                raw_url = self.path.split('/api/match?url=', 1)[1]
                target_url = urllib.parse.unquote(raw_url).split('#')[0].strip()
                print(f"[MATCH API] Fetching & Parsing: {target_url}")

                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5'
                }
                req = urllib.request.Request(target_url, headers=headers)
                with urllib.request.urlopen(req, timeout=12) as response:
                    html = response.read().decode('utf-8', errors='ignore')

                m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html)
                if not m:
                    raise ValueError("Tag __NEXT_DATA__ tidak ditemukan di halaman FotMob.")

                next_data = json.loads(m.group(1))
                pp = next_data.get('props', {}).get('pageProps', {})

                result = {
                    'success': True,
                    'header': pp.get('header', {}),
                    'general': pp.get('general', {}),
                    'content': {
                        'lineup': pp.get('content', {}).get('lineup', {}),
                        'stats': pp.get('content', {}).get('stats', {}),
                        'table': pp.get('content', {}).get('table', {})
                    }
                }

                payload = json.dumps(result).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
                return
            except Exception as e:
                print(f"[MATCH API ERROR] {e}")
                err_payload = json.dumps({'success': False, 'error': str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(err_payload)))
                self.end_headers()
                self.wfile.write(err_payload)
                return

        # 2. General Proxy for FotMob Images and assets (eliminating CORS taint on canvas)
        if self.path.startswith('/api/proxy?url='):
            try:
                raw_url = self.path.split('/api/proxy?url=', 1)[1]
                target_url = urllib.parse.unquote(raw_url).split('#')[0].strip()

                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.5'
                }
                req = urllib.request.Request(target_url, headers=headers)
                with urllib.request.urlopen(req, timeout=12) as response:
                    content_type = response.headers.get('Content-Type', 'application/octet-stream')
                    content = response.read()

                self.send_response(200)
                self.send_header('Content-Type', content_type)
                self.send_header('Content-Length', str(len(content)))
                if 'image' in content_type:
                    self.send_header('Cache-Control', 'public, max-age=604800')
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception as e:
                print(f"[PROXY ERROR] {e}")
                err_payload = json.dumps({'error': str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(err_payload)))
                self.end_headers()
                self.wfile.write(err_payload)
                return

        # Default static file serving
        return super().do_GET()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), StudioHandler) as httpd:
        print(f"============================================================")
        print(f"  TACTIX STUDIO SERVER running at http://localhost:{PORT}")
        print(f"  Dynamic Match API: /api/match?url=...")
        print(f"  Zero-CORS Image & Asset Proxy: /api/proxy?url=...")
        print(f"============================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)
