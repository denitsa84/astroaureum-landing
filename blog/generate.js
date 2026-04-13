const fs = require('fs');
const path = require('path');

const articles = [
  { slug:"que-es-carta-natal", title:"Que es la Carta Natal: Tu Mapa Cosmico Personal", category:"Guia", prompt:"Escribe un articulo de blog de 600 palabras sobre que es la carta natal en astrologia. Explica de forma elegante y premium: que es, para que sirve, que revela (planetas, casas, aspectos), y por que todos deberian tener una. Tono: sofisticado, mistico pero accesible. NO uses emojis. Incluye subtitulos con ##." },
  { slug:"luna-llena-escorpio-abril-2026", title:"Luna Llena en Escorpio Abril 2026: Transformacion Profunda", category:"Transitos", prompt:"Escribe un articulo de blog de 500 palabras sobre la Luna Llena en Escorpio de abril 2026. Explica: que energia trae, como afecta a cada elemento (fuego, tierra, aire, agua), rituales recomendados, y que areas de vida se transforman. Tono: elegante, mistico, premium. NO uses emojis. Incluye subtitulos con ##." },
  { slug:"sinastria-compatibilidad", title:"Sinastria: El Secreto de la Compatibilidad Cosmica", category:"Amor", prompt:"Escribe un articulo de blog de 600 palabras sobre sinastria y compatibilidad astrologica. Explica: que es la sinastria, como se comparan dos cartas natales, aspectos clave (Sol-Luna, Venus-Marte), que revela sobre una relacion. Tono: sofisticado, romantico, premium. NO uses emojis. Incluye subtitulos con ##." },
  { slug:"mercurio-retrogrado", title:"Mercurio Retrogrado: Guia Completa para Sobrevivir y Prosperar", category:"Transitos", prompt:"Escribe un articulo de blog de 500 palabras sobre Mercurio retrogrado. Explica: que es realmente (no mitos), como afecta la comunicacion, tecnologia y viajes, consejos practicos, y como aprovechar su energia. Tono: sabio, practico, premium. NO uses emojis. Incluye subtitulos con ##." },
  { slug:"nodos-lunares-destino", title:"Nodos Lunares: Tu Destino Karmico Revelado", category:"Karma", prompt:"Escribe un articulo de blog de 600 palabras sobre los nodos lunares en astrologia. Explica: que son el Nodo Norte y Nodo Sur, que representan (destino vs pasado), como encontrarlos en tu carta, y que significan. Tono: profundo, espiritual, premium. NO uses emojis. Incluye subtitulos con ##." },
  { slug:"12-casas-astrologicas", title:"Las 12 Casas Astrologicas: Mapa de tu Vida", category:"Guia", prompt:"Escribe un articulo de blog de 600 palabras sobre las 12 casas astrologicas. Explica brevemente que area de vida representa cada casa (1-12), por que importan, y como interpretarlas. Tono: educativo, elegante, premium. NO uses emojis. Incluye subtitulos con ##." }
];

const OPENROUTER_KEY = "YOUR_OPENROUTER_KEY";

async function gen(prompt) {
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + OPENROUTER_KEY },
    body: JSON.stringify({ model: "google/gemini-2.0-flash-001", messages: [{ role: "user", content: prompt }], max_tokens: 2000 })
  });
  const d = await r.json();
  return d.choices[0].message.content;
}

function md2html(md) {
  return md.replace(/^## (.+)$/gm, '<h3>$1</h3>').replace(/^### (.+)$/gm, '<h4>$1</h4>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').split(/\n\n+/).map(p => p.startsWith('<h') ? p : '<p>' + p.replace(/\n/g,' ') + '</p>').join('\n            ');
}

async function main() {
  const imgs = ['home-assets/portal-sincronia.png','home-assets/abrazo-celestial.png','home-assets/codice-estelar.png','sinastria/sinastria3.png','sinastria/sinastria1.png','assets/bg-lecturas.png'];
  const catC = { Guia:'#A0F0FF', Transitos:'#FFB3D1', Amor:'#FFD6F5', Karma:'#FFED8A' };
  const dates = ['13 Abril 2026','10 Abril 2026','7 Abril 2026','4 Abril 2026','1 Abril 2026','28 Marzo 2026'];

  let cards = '';
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    console.error('Generating: ' + a.slug + '...');
    const content = await gen(a.prompt);
    cards += `
    <article class="blog-card fade-up" id="${a.slug}">
        <div class="blog-img">
            <img src="${imgs[i]}" alt="${a.title}" loading="lazy">
            <span class="blog-cat" style="background:${catC[a.category]||'#A0F0FF'}">${a.category}</span>
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

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog de Astrologia | Astro Aureum</title>
<meta name="description" content="Blog de astrologia premium. Transitos planetarios, guias de carta natal, sinastria, nodos lunares y mas. Sabiduria cosmica por Astro Aureum.">
<meta property="og:title" content="Blog de Astrologia | Astro Aureum">
<meta property="og:description" content="Sabiduria cosmica: transitos, carta natal, sinastria y mas.">
<meta property="og:image" content="https://astroaureum.com/logo.png">
<meta property="og:locale" content="es_ES">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0PZTB2PF7T"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-0PZTB2PF7T');</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg-space:#08011B;--electric-blue:#A0F0FF;--golden-yellow:#FFED8A;--love-rose:#FFB3D1;--aura-pink:#FFD6F5;--cosmic-cream:#FFF9EA;--pure-white:#FFFFFF;--glow-blue:0 0 20px rgba(160,240,255,0.6);--glow-gold:0 0 20px rgba(255,237,138,0.5);--glow-love:0 0 20px rgba(255,179,209,0.6);--glow-cream:0 0 15px rgba(255,249,234,0.4);--gradient-gold-pink:linear-gradient(135deg,#FFED8A 0%,#FFB3D1 100%);--gradient-blue-aura:linear-gradient(135deg,#A0F0FF 0%,#FFD6F5 100%);--font-display:'Playfair Display',serif;--font-body:'Inter',sans-serif}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
body{background-color:var(--bg-space);background-image:radial-gradient(ellipse at 15% 85%,rgba(160,240,255,0.05) 0%,transparent 50%),radial-gradient(ellipse at 85% 15%,rgba(255,237,138,0.04) 0%,transparent 50%),radial-gradient(ellipse at 50% 50%,rgba(255,179,209,0.03) 0%,transparent 60%);color:var(--pure-white);font-family:var(--font-body);overflow-x:hidden;scroll-behavior:smooth}
h1{font-family:var(--font-display);font-weight:800;font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.1;color:var(--pure-white);text-shadow:0 0 15px rgba(160,240,255,0.8)}
h2{font-family:var(--font-display);font-weight:700;font-size:clamp(1.5rem,3.5vw,2.2rem);line-height:1.2}
h3{font-family:var(--font-display);font-weight:700;font-size:1.3rem;color:var(--golden-yellow);margin:24px 0 10px}
p{font-size:1.05rem;line-height:1.8;color:var(--cosmic-cream);font-weight:300;margin-bottom:16px}
a{color:var(--aura-pink);text-decoration:none;transition:all 0.3s}a:hover{color:var(--electric-blue)}
nav{position:fixed;top:0;left:0;width:100%;z-index:1000;padding:20px 40px;display:flex;justify-content:space-between;align-items:center;background:rgba(8,1,27,0.8);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border-bottom:1px solid rgba(255,237,138,0.1)}
.nav-logo{font-family:var(--font-display);font-size:1.5rem;font-weight:800;color:var(--golden-yellow);text-shadow:0 0 10px rgba(255,237,138,0.4);text-decoration:none}
.nav-links{display:flex;gap:30px;align-items:center}.nav-links a{color:var(--cosmic-cream);font-size:0.9rem;font-weight:500;letter-spacing:0.5px}.nav-links a:hover{color:var(--electric-blue)}.nav-links a.nav-active{color:var(--golden-yellow);text-shadow:0 0 8px rgba(255,237,138,0.3)}
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:5px;z-index:1001}.hamburger span{display:block;width:24px;height:2px;background:var(--golden-yellow);transition:all 0.3s}.hamburger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.hamburger.open span:nth-child(2){opacity:0}.hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
.mobile-overlay{display:none;position:fixed;inset:0;background:rgba(8,1,27,0.95);backdrop-filter:blur(25px);z-index:999;flex-direction:column;align-items:center;justify-content:center;gap:28px}.mobile-overlay.open{display:flex}.mobile-overlay a{color:var(--cosmic-cream);font-family:var(--font-display);font-size:1.3rem;font-weight:700}.mobile-overlay a:hover{color:var(--golden-yellow)}
.hero{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:140px 20px 60px;position:relative;overflow:hidden}
.hero-bg{position:absolute;top:0;left:0;width:100%;height:100%;background:url('home-assets/codice-estelar.png') center/cover no-repeat;opacity:0.5;z-index:0}
.hero-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(8,1,27,0.2) 0%,rgba(8,1,27,0.85) 100%);z-index:1}
.hero-content{position:relative;z-index:3;max-width:700px}
.hero-badge{display:inline-block;background:rgba(160,240,255,0.1);border:1px solid rgba(160,240,255,0.3);border-radius:50px;padding:8px 24px;font-size:0.85rem;color:var(--golden-yellow);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;font-weight:600}
.hero h1{margin-bottom:15px;color:var(--golden-yellow)}
.hero p{font-size:1.2rem;color:rgba(255,179,209,0.9)}
.blog-grid{max-width:900px;margin:0 auto;padding:2rem 1.5rem 4rem}
.blog-card{background:rgba(255,249,234,0.03);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(160,240,255,0.1);border-radius:24px;overflow:hidden;margin-bottom:3rem;transition:all 0.4s ease}
.blog-card:hover{border-color:var(--golden-yellow);box-shadow:0 0 40px rgba(255,237,138,0.15)}
.blog-img{position:relative;height:350px;overflow:hidden}.blog-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}.blog-card:hover .blog-img img{transform:scale(1.05)}
.blog-cat{position:absolute;top:16px;left:16px;padding:6px 18px;border-radius:50px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#000;backdrop-filter:blur(8px)}
.blog-body{padding:2rem 2.5rem 2.5rem}
.blog-date{font-size:0.8rem;color:var(--aura-pink);margin-bottom:8px;font-weight:500;letter-spacing:1px}
.blog-title{color:var(--pure-white);margin-bottom:1.5rem;text-shadow:none}
.blog-content h3{font-size:1.2rem}.blog-content h4{font-family:var(--font-display);font-size:1.1rem;color:var(--electric-blue);margin:20px 0 8px}.blog-content p{font-size:1rem;line-height:1.8;margin-bottom:14px}.blog-content strong{color:var(--golden-yellow)}
.blog-cta{text-align:center;margin:2rem 0 1.5rem}
.btn-cta{display:inline-block;background:var(--gradient-gold-pink);border:none;color:#000;font-family:var(--font-body);font-weight:700;font-size:1rem;border-radius:50px;padding:16px 36px;box-shadow:var(--glow-gold);transition:all 0.3s ease;cursor:pointer;text-transform:uppercase;letter-spacing:1px;text-decoration:none}.btn-cta:hover{transform:scale(1.05) translateY(-2px);box-shadow:var(--glow-love);color:#000}
.blog-author{display:flex;align-items:center;gap:14px;padding-top:1.5rem;border-top:1px solid rgba(255,237,138,0.1)}
.author-img{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,237,138,0.3)}
.author-name{font-family:var(--font-display);font-size:0.95rem;color:var(--golden-yellow)}
.author-role{font-size:0.8rem;color:var(--aura-pink)}
footer{padding:50px 40px;text-align:center;border-top:1px solid rgba(255,237,138,0.1);background:rgba(8,1,27,0.8);position:relative;z-index:1}
.footer-logo{font-family:var(--font-display);font-size:1.8rem;font-weight:800;color:var(--golden-yellow);text-shadow:0 0 10px rgba(255,237,138,0.3);margin-bottom:15px}
.footer-links{display:flex;gap:30px;justify-content:center;margin-bottom:20px;flex-wrap:wrap}.footer-links a{color:var(--aura-pink);font-size:0.9rem}.footer-links a:hover{color:var(--electric-blue)}
.footer-copy{color:rgba(255,249,234,0.4);font-size:0.8rem}
.fade-up{opacity:0;transform:translateY(40px);transition:opacity 0.8s ease,transform 0.8s ease}.fade-up.visible{opacity:1;transform:translateY(0)}
@media(max-width:768px){nav{padding:15px 20px}.nav-links{display:none}.hamburger{display:flex}.hero{padding:110px 20px 40px;min-height:50vh}.blog-img{height:220px}.blog-body{padding:1.5rem}.blog-grid{padding:1rem}}
</style>
</head>
<body>
<canvas id="stars" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;"></canvas>
<nav>
    <a href="https://astroaureum.com" class="nav-logo">&#10022; Astro Aureum</a>
    <div class="nav-links">
        <a href="https://astroaureum.com">Inicio</a>
        <a href="https://astroaureum.com/lecturas.html">9 Tradiciones</a>
        <a href="https://astroaureum.com/aureum-books.html">Aureum Books</a>
        <a href="/" class="nav-active">Blog</a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mobile-overlay" id="mobileMenu">
    <a href="https://astroaureum.com">Inicio</a>
    <a href="https://astroaureum.com/lecturas.html">9 Tradiciones</a>
    <a href="https://astroaureum.com/aureum-books.html">Aureum Books</a>
    <a href="/" class="nav-active">Blog</a>
</div>
<section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content fade-up">
        <div class="hero-badge">&#10022; Sabiduria Cosmica</div>
        <h1>Blog de Astrologia</h1>
        <p>Transitos planetarios, guias cosmicas y sabiduria ancestral para iluminar tu camino.</p>
    </div>
</section>
<div class="blog-grid">
${cards}
</div>
<footer>
    <div class="footer-logo">&#10022; Astro Aureum</div>
    <div class="footer-links">
        <a href="https://astroaureum.com">AstroAureum.com</a>
        <a href="https://astroaureum.com/lecturas.html">9 Tradiciones</a>
        <a href="https://astroaureum.com/aureum-books.html">Aureum Books</a>
        <a href="/">Blog</a>
    </div>
    <p class="footer-copy">&copy; 2026 Astro Aureum &mdash; Tu Guia Cosmica. Todos los derechos reservados.</p>
</footer>
<script>
var c=document.getElementById('stars'),x=c.getContext('2d'),s=[];
function I(){c.width=innerWidth;c.height=innerHeight;s=[];for(var i=0;i<150;i++)s.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.5+.5,a:Math.random()*.8+.2,sp:Math.random()*.3+.1,cl:['#A0F0FF','#FFED8A','#FFD6F5','#FFB3D1'][Math.floor(Math.random()*4)]})}
function D(){x.clearRect(0,0,c.width,c.height);s.forEach(function(p){x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fillStyle=p.cl;x.globalAlpha=p.a+Math.sin(Date.now()*.001*p.sp)*.3;x.fill()});requestAnimationFrame(D)}
I();D();addEventListener('resize',I);
var ob=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting)en.target.classList.add('visible')})},{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(function(el){ob.observe(el)});
var hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
hb.addEventListener('click',function(){hb.classList.toggle('open');mm.classList.toggle('open');document.body.style.overflow=mm.classList.contains('open')?'hidden':''});
mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){hb.classList.remove('open');mm.classList.remove('open');document.body.style.overflow=''}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){hb.classList.remove('open');mm.classList.remove('open');document.body.style.overflow=''}});
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'index.html'), html);
  fs.writeFileSync('c:/Users/alzarena/Desktop/Antigravity/astro-connect/public/blog/index.html', html);
  console.log('Blog created with ' + articles.length + ' articles');
}

main().catch(e => { console.error(e); process.exit(1); });
