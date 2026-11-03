// Stand-in for the production host (ASP.NET, nginx, etc.): one origin, split by path.
const http = require('http')
const fs = require('fs')
const path = require('path')

// Mirrors ASP.NET serving wwwroot: Vue 2 at the root, Nuxt under /next/.
const VUE2_DIR = path.join(__dirname, 'wwwroot')
const NUXT_DIR = path.join(__dirname, 'wwwroot/next')
const PORT = process.env.PORT || 4000

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject',
}

function send(res, file) {
  // no-store so a refresh always picks up the latest watch build
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
  fs.createReadStream(file).pipe(res)
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0])
    const isNext = url === '/next' || url.startsWith('/next/')
    const root = isNext ? NUXT_DIR : VUE2_DIR
    const rel = isNext ? url.slice('/next'.length) : url
    const file = path.join(root, path.normalize(rel))

    if (file.startsWith(root) && fs.existsSync(file) && fs.statSync(file).isFile()) return send(res, file)
    // History-mode fallback: unknown paths go to that app's index.html.
    send(res, path.join(root, 'index.html'))
  })
  .listen(PORT, () => console.log(`http://localhost:${PORT}  (/ -> Vue 2, /next/ -> Nuxt)`))
