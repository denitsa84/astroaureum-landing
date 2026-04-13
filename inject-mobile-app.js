const fs = require('fs');
const path = require('path');

const dir = __dirname;
const pages = [
  { file: 'index.html', active: 'inicio' },
  { file: 'carta-natal-gratis.html', active: 'carta' },
  { file: 'horoscopo-diario.html', active: 'horoscopo' },
  { file: 'lecturas.html', active: 'lecturas' },
  { file: 'precios-premium.html', active: 'premium' },
  { file: 'faq.html', active: '' },
  { file: 'programa-referidos.html', active: '' },
  { file: 'compartir.html', active: '' },
  { file: 'sinastria-oferta.html', active: '' },
  { file: 'aureum-books.html', active: '' }
];

const iosMetaTags = `<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Astro Aureum">
<meta name="mobile-web-app-capable" content="yes">
<link rel="stylesheet" href="/mobile-app.css">`;

const splashScreen = `<div class="splash-screen" id="splash"><div class="splash-logo">Astro Aureum</div><div class="splash-tagline">Tu Guia Cosmica</div></div>`;

function getBottomNav(active) {
  const isA = (k) => active === k ? ' class="active"' : '';
  return `<nav class="bottom-nav"><div class="bottom-nav-inner">
<a href="/"${isA('inicio')}><span class="bottom-nav-icon">&#9733;</span><span class="bottom-nav-label">Inicio</span></a>
<a href="/carta-natal-gratis.html"${isA('carta')}><span class="bottom-nav-icon">&#9737;</span><span class="bottom-nav-label">Carta</span></a>
<a href="/horoscopo-diario.html"${isA('horoscopo')}><span class="bottom-nav-icon">&#9789;</span><span class="bottom-nav-label">Hoy</span></a>
<a href="/lecturas.html"${isA('lecturas')}><span class="bottom-nav-icon">&#10022;</span><span class="bottom-nav-label">Lecturas</span></a>
<a href="/precios-premium.html"${isA('premium')}><span class="bottom-nav-icon">&#9830;</span><span class="bottom-nav-label">Premium</span></a>
</div></nav>`;
}

const splashScript = `<script>window.addEventListener('load',function(){setTimeout(function(){var s=document.getElementById('splash');if(s)s.classList.add('hidden')},600)});</script>`;

const viewportReplacement = '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">';

let updated = 0;
for (const p of pages) {
  const fp = path.join(dir, p.file);
  if (!fs.existsSync(fp)) { console.log('SKIP (no existe):', p.file); continue; }
  let html = fs.readFileSync(fp, 'utf8');

  // Skip if already injected
  if (html.includes('mobile-app.css')) { console.log('YA TIENE mobile-app.css:', p.file); continue; }

  // 1. Update viewport
  html = html.replace(/<meta name="viewport"[^>]*>/i, viewportReplacement);

  // 2. Inject iOS meta tags + CSS link before </head>
  html = html.replace(/<\/head>/i, iosMetaTags + '\n</head>');

  // 3. Inject splash screen right after <body>
  html = html.replace(/<body[^>]*>/i, function(match) {
    return match + '\n' + splashScreen;
  });

  // 4. Inject bottom nav + splash script before </body>
  html = html.replace(/<\/body>/i, getBottomNav(p.active) + '\n' + splashScript + '\n</body>');

  fs.writeFileSync(fp, html);
  console.log('OK:', p.file);
  updated++;
}
console.log('Updated ' + updated + ' files');
