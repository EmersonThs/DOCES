const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.json':'application/json' };
const server = http.createServer((req, res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/html/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end('Acesso negado'); return; }
    fs.readFile(file, (error, data) => {
      if (error) { res.writeHead(404).end('Arquivo não encontrado'); return; }
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : data);
    });
  } catch { res.writeHead(400).end('Solicitação inválida'); }
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? 'A porta 8765 já está em uso.' : 'Não foi possível iniciar o servidor.'); process.exitCode = 1; });
server.listen(8765, '127.0.0.1', () => console.log('Doce Ação: http://127.0.0.1:8765/html/index.html'));
