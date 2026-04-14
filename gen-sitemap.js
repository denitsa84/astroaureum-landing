const fs = require('fs');
const path = require('path');

const LANGS = ['es', 'bg', 'en', 'pt', 'fr', 'de', 'it', 'ru', 'tr', 'ar', 'ja', 'zh'];
const BASE_URL = 'https://astroaureum.com';
const today = new Date().toISOString().split('T')[0];

// Spanish pages (main)
const ES_PAGES = [
  { path: '/', pri: '1.0', freq: 'daily' },
  { path: '/sinastria-oferta.html', pri: '0.9', freq: 'weekly' },
  { path: '/carta-natal-gratis.html', pri: '0.9', freq: 'weekly' },
  { path: '/horoscopo-diario.html', pri: '0.9', freq: 'daily' },
  { path: '/lecturas.html', pri: '0.9', freq: 'weekly' },
  { path: '/precios-premium.html', pri: '0.85', freq: 'weekly' },
  { path: '/aureum-books.html', pri: '0.8', freq: 'weekly' },
  { path: '/blog/', pri: '0.8', freq: 'daily' },
  { path: '/compartir.html', pri: '0.7', freq: 'monthly' },
  { path: '/programa-referidos.html', pri: '0.8', freq: 'weekly' },
  { path: '/faq.html', pri: '0.7', freq: 'monthly' }
];

// Translated page equivalents (lang/page.html)
const TRANS_PAGES = [
  { path: '', pri: '0.95', freq: 'daily' },          // /lang/
  { path: 'carta-natal.html', pri: '0.9', freq: 'weekly' },
  { path: 'horoscopo.html', pri: '0.9', freq: 'daily' },
  { path: 'lecturas.html', pri: '0.9', freq: 'weekly' }
];

function hreflangAlts(pageTypeES) {
  // Map Spanish page type to translated equivalent
  const map = {
    '/': '',
    '/sinastria-oferta.html': '',  // translates to index
    '/carta-natal-gratis.html': 'carta-natal.html',
    '/horoscopo-diario.html': 'horoscopo.html',
    '/lecturas.html': 'lecturas.html'
  };

  const equivalent = map[pageTypeES];
  if (equivalent === undefined) return ''; // no translations for this page

  const alts = [`<xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${pageTypeES}" />`];
  alts.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${pageTypeES}" />`);

  for (const lang of LANGS.filter(l => l !== 'es')) {
    alts.push(`<xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}/${equivalent}" />`);
  }
  return alts.map(a => '    ' + a).join('\n');
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

// Spanish (main) pages
for (const p of ES_PAGES) {
  xml += '  <url>\n';
  xml += `    <loc>${BASE_URL}${p.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${p.freq}</changefreq>\n`;
  xml += `    <priority>${p.pri}</priority>\n`;
  const alts = hreflangAlts(p.path);
  if (alts) xml += alts + '\n';
  xml += '  </url>\n';
}

// Translated pages for each lang
for (const lang of LANGS.filter(l => l !== 'es')) {
  for (const p of TRANS_PAGES) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/${lang}/${p.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${p.freq}</changefreq>\n`;
    xml += `    <priority>${p.pri}</priority>\n`;
    xml += '  </url>\n';
  }
}

xml += '</urlset>\n';

const out1 = path.join(__dirname, 'sitemap.xml');
const out2 = 'c:/Users/alzarena/Desktop/Antigravity/astro-connect/public/sitemap.xml';
fs.writeFileSync(out1, xml);
fs.writeFileSync(out2, xml);

const urls = (xml.match(/<loc>/g) || []).length;
console.log('Sitemap generated with ' + urls + ' URLs');
