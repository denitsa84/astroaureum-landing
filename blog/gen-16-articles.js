const fs = require('fs');
const path = require('path');

const ANTHROPIC_KEY = "YOUR_ANTHROPIC_API_KEY";

const articles = [
  { slug: "como-leer-carta-natal", title: "Como Leer tu Carta Natal: Guia Completa para Principiantes", cat: "Guia", img: "home-assets/codice-estelar.png" },
  { slug: "12-signos-zodiaco-2026", title: "Los 12 Signos del Zodiaco: Caracteristicas y Compatibilidades 2026", cat: "Signos", img: "home-assets/portal-sincronia.png" },
  { slug: "que-es-ascendente", title: "Que es el Ascendente y Como Calcularlo", cat: "Guia", img: "sinastria/sinastria1.png" },
  { slug: "luna-nueva-vs-luna-llena", title: "Luna Nueva vs Luna Llena: Como Afectan tu Energia", cat: "Transitos", img: "home-assets/abrazo-celestial.png" },
  { slug: "que-es-sinastria", title: "Que es la Sinastria: Guia de Compatibilidad Astrologica", cat: "Amor", img: "sinastria/sinastria3.png" },
  { slug: "saturno-return", title: "Retorno de Saturno: La Crisis de los 29 que Transforma tu Vida", cat: "Transitos", img: "home-assets/codice-estelar.png" },
  { slug: "mercurio-retrogrado-2026", title: "Mercurio Retrogrado 2026: Fechas, Efectos y Como Sobrevivir", cat: "Transitos", img: "home-assets/portal-sincronia.png" },
  { slug: "astrologia-vedica-vs-occidental", title: "Astrologia Vedica vs Occidental: Diferencias Clave", cat: "Guia", img: "sinastria/sinastria1.png" },
  { slug: "nodos-lunares-proposito", title: "Nodos Lunares: Tu Proposito de Vida segun las Estrellas", cat: "Karma", img: "home-assets/abrazo-celestial.png" },
  { slug: "signo-lunar-importancia", title: "Como Calcular tu Signo Lunar y Por Que Importa", cat: "Guia", img: "sinastria/sinastria3.png" },
  { slug: "12-casas-astrologicas", title: "Las 12 Casas Astrologicas Explicadas", cat: "Guia", img: "home-assets/codice-estelar.png" },
  { slug: "venus-retrogrado-2026", title: "Venus Retrogrado 2026: Amor y Dinero Bajo Revision", cat: "Transitos", img: "home-assets/portal-sincronia.png" },
  { slug: "human-design-que-es", title: "Human Design: Que es y Como Descubrir tu Tipo", cat: "Guia", img: "sinastria/sinastria1.png" },
  { slug: "feng-shui-2026", title: "Feng Shui 2026: Como Activar la Prosperidad en tu Hogar", cat: "Bienestar", img: "home-assets/abrazo-celestial.png" },
  { slug: "ba-zi-4-pilares", title: "Ba Zi: Los 4 Pilares del Destino Chino", cat: "Tradiciones", img: "sinastria/sinastria3.png" },
  { slug: "transitos-planetarios", title: "Transitos Planetarios: Como Te Afectan Personalmente", cat: "Transitos", img: "home-assets/codice-estelar.png" }
];

const catColors = { Guia:'#A0F0FF', Transitos:'#FFB3D1', Amor:'#FFD6F5', Karma:'#FFED8A', Signos:'#A0F0FF', Bienestar:'#FFD6F5', Tradiciones:'#FFED8A' };

const basePrompt = `Escribe un articulo de blog SEO sobre "TITLE" para Astro Aureum.
- 800-1000 palabras en espanol
- Subtitulos con ## (3-4 subtitulos)
- Parrafos cortos (2-3 oraciones)
- Tono: mistico pero accesible, profesional pero calido
- No usar emojis, no usar "en conclusion"
- Incluir datos especificos cuando sea posible
- Terminar con un parrafo que invite a descubrir mas en astroaureum.com`;

async function generate(title) {
  const prompt = basePrompt.replace('TITLE', title);
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await resp.json();
  if (data.content && data.content[0]) return data.content[0].text;
  console.error('Error:', JSON.stringify(data).substring(0, 200));
  return null;
}

function md2html(md) {
  if (!md) return '<p>Articulo en preparacion.</p>';
  return md.replace(/^## (.+)$/gm, '<h3>$1</h3>').replace(/^### (.+)$/gm, '<h4>$1</h4>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').split(/\n\n+/).map(p => p.startsWith('<h') ? p : '<p>' + p.replace(/\n/g,' ') + '</p>').join('\n            ');
}

async function main() {
  const dates = [];
  for (let i = 0; i < 16; i++) {
    const d = new Date(2026, 3, 14 - i);
    dates.push(d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }));
  }

  let cards = '';
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    console.error(`[${i+1}/16] Generating: ${a.slug}...`);
    const content = await generate(a.title);
    cards += `
    <article class="blog-card fade-up" id="${a.slug}">
        <div class="blog-img">
            <img src="${a.img}" alt="${a.title}" loading="lazy">
            <span class="blog-cat" style="background:${catColors[a.cat]||'#A0F0FF'}">${a.cat}</span>
        </div>
        <div class="blog-body">
            <div class="blog-date">${dates[i]}</div>
            <h2 class="blog-title">${a.title}</h2>
            <div class="blog-content">
            ${md2html(content)}
            </div>
            <div class="blog-cta">
                <a href="https://astroaureum.com" class="btn-cta">DESCUBRE TU LECTURA</a>
            </div>
            <div class="blog-author">
                <img src="assets/shivani.jpg" alt="Shivani" class="author-img">
                <div>
                    <div class="author-name">Shivani Devi Bramayani</div>
                    <div class="author-role">Astrologa &middot; Astro Aureum</div>
                </div>
            </div>
        </div>
    </article>`;
  }

  // Read existing blog template and replace cards
  let template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  // Replace content between blog-grid div
  template = template.replace(/<div class="blog-grid">[\s\S]*?<\/div>\s*<footer>/,
    `<div class="blog-grid">\n${cards}\n</div>\n<footer>`);

  fs.writeFileSync(path.join(__dirname, 'index.html'), template);
  fs.writeFileSync('c:/Users/alzarena/Desktop/Antigravity/astro-connect/public/blog/index.html', template);
  console.log('Blog updated with ' + articles.length + ' articles');
}

main().catch(e => { console.error(e); process.exit(1); });
