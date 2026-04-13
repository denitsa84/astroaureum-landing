const CACHE_VERSION = 'astro-aureum-v1';
const PAGES_TO_CACHE = [
  '/',
  '/index.html',
  '/horoscopo-diario.html',
  '/carta-natal-gratis.html',
  '/lecturas.html',
  '/precios-premium.html',
  '/faq.html',
  '/blog/index.html',
  '/compartir.html',
  '/programa-referidos.html'
];

const ASSET_EXTENSIONS = /\.(css|js|woff2?|ttf|otf|png|jpg|jpeg|webp|avif|svg|ico|gif)$/i;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(PAGES_TO_CACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (ASSET_EXTENSIONS.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(request, clone));
        }
        return res;
      }))
    );
    return;
  }

  event.respondWith(
    fetch(request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(request, clone));
      }
      return res;
    }).catch(() =>
      caches.match(request).then(cached => cached || caches.match('/').then(home => home || offlineFallback()))
    )
  );
});

function offlineFallback() {
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sin Conexion - Astro Aureum</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#08011B;color:#FFF9EA;font-family:Inter,system-ui,sans-serif;text-align:center;padding:2rem}
.card{background:rgba(212,168,67,.08);border:1px solid rgba(212,168,67,.25);border-radius:1.5rem;padding:3rem 2rem;max-width:420px;backdrop-filter:blur(12px)}
h1{font-family:'Playfair Display',Georgia,serif;font-size:1.8rem;color:#D4A843;margin-bottom:1rem}
p{color:#A0F0FF;line-height:1.6;margin-bottom:1.5rem}
.icon{font-size:3rem;margin-bottom:1rem}
button{background:linear-gradient(135deg,#D4A843,#FFED8A);color:#08011B;border:none;padding:.8rem 2rem;border-radius:2rem;font-weight:600;cursor:pointer;font-size:1rem}
button:hover{opacity:.9}
</style></head><body>
<div class="card">
<div class="icon">&#9734;</div>
<h1>Sin Conexion</h1>
<p>Las estrellas siguen brillando, pero necesitas conexion a internet para continuar tu viaje astral.</p>
<button onclick="location.reload()">Reintentar</button>
</div></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
