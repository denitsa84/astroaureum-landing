const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const PROD = 'c:/Users/alzarena/Desktop/Antigravity/astro-connect/public';

const LANGS_ALL = ['es', 'bg', 'en', 'pt', 'fr', 'de', 'it', 'ru', 'tr', 'ar', 'ja', 'zh'];

// Map Spanish page name → equivalent translated page name
const PAGE_MAP = {
  'sinastria-oferta.html': { es: 'sinastria-oferta.html', other: 'index.html' }, // sinastria-oferta in ES = index in other langs? No, keep separate.
  'carta-natal-gratis.html': { es: 'carta-natal-gratis.html', other: 'carta-natal.html' },
  'horoscopo-diario.html': { es: 'horoscopo-diario.html', other: 'horoscopo.html' },
  'lecturas.html': { es: 'lecturas.html', other: 'lecturas.html' },
  'index.html': { es: '', other: '' } // root
};

const PAGES_TO_UPDATE = [
  'index.html',
  'carta-natal-gratis.html',
  'horoscopo-diario.html',
  'lecturas.html'
];

function generateHreflang(sourceFile) {
  const map = PAGE_MAP[sourceFile];
  if (!map) return '';

  const tags = [];
  // Spanish
  const esUrl = map.es ? '/' + map.es : '';
  tags.push(`<link rel="alternate" hreflang="es" href="https://astroaureum.com${esUrl}" />`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="https://astroaureum.com${esUrl}" />`);

  // Other langs
  for (const lang of LANGS_ALL.filter(l => l !== 'es')) {
    const otherUrl = map.other ? '/' + map.other : '';
    tags.push(`<link rel="alternate" hreflang="${lang}" href="https://astroaureum.com/${lang}${otherUrl}" />`);
  }

  return tags.join('\n');
}

let count = 0;
for (const page of PAGES_TO_UPDATE) {
  for (const dir of [BASE, PROD]) {
    const fp = path.join(dir, page);
    if (!fs.existsSync(fp)) continue;
    let html = fs.readFileSync(fp, 'utf8');

    // Remove old hreflang tags if any
    html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\n?/g, '');

    // Add new hreflang before </head>
    const tags = generateHreflang(page);
    html = html.replace(/<\/head>/, tags + '\n</head>');

    fs.writeFileSync(fp, html);
    console.log('OK:', dir.split(/[\\/]/).pop() + '/' + page);
    count++;
  }
}

console.log('\nUpdated ' + count + ' files with hreflang tags');
