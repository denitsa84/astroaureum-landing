const CACHE_NAME = 'astro-aureum-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/horoscopo-diario.html',
  '/carta-natal-gratis.html',
  '/lecturas.html',
  '/precios-premium.html',
  '/faq.html',
  '/blog/index.html',
  '/compartir.html',
  '/programa-referidos.html',
  '/aureum-books.html',
  '/logo.png',
  '/favicon-192.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME; })
             .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;

  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request).then(function(r) {
          return r || caches.match('/').then(function(r2) {
            return r2 || new Response(
              '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Astro Aureum — Sin Conexion</title><style>body{background:#08011B;color:#FFF9EA;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;margin:0}h1{font-family:"Playfair Display",serif;color:#FFED8A;font-size:2rem}p{color:#FFD6F5;font-size:1.1rem}</style></head><body><div><h1>&#10022; Astro Aureum</h1><p>Sin conexion a internet.<br>Vuelve a intentarlo cuando tengas conexion.</p></div></body></html>',
              { headers: { 'Content-Type': 'text/html' } }
            );
          });
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function(r) {
        return r || fetch(event.request).then(function(resp) {
          if (resp.status === 200) {
            var clone = resp.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
          }
          return resp;
        });
      })
    );
  }
});
