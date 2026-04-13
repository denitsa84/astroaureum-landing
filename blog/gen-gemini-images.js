const fs = require('fs');
const path = require('path');

const GEMINI_KEY = "YOUR_GEMINI_API_KEY";

const articles = [
  { slug: "carta-natal", prompt: "A beautiful mystical cosmic birth chart (natal chart) floating in deep space, golden zodiac symbols glowing around a circular chart, planets aligned, stars and nebulas in dark blue and purple background, ethereal golden light rays, ultra detailed fantasy art, no text no letters no words" },
  { slug: "luna-llena-escorpio", prompt: "A stunning giant luminous full moon with scorpion constellation overlay glowing in cyan, deep purple and dark blue mystical night sky, cosmic energy emanating from the moon, scattered stars, ethereal magical atmosphere, fantasy art, no text no letters no words" },
  { slug: "sinastria", prompt: "Two ethereal cosmic human silhouettes facing each other connected by golden astral energy threads in space, hearts made of stars between them, pink and purple nebula background, romantic cosmic love connection theme, fantasy art, no text no letters no words" },
  { slug: "mercurio-retrogrado", prompt: "Planet Mercury with glowing retrograde spiral trails in space, cosmic swirls and energy around it, deep space setting with stars, golden and cyan color palette, mystical ethereal style, fantasy art, no text no letters no words" },
  { slug: "nodos-lunares", prompt: "Two glowing cosmic orbs representing lunar nodes connected by a golden thread of destiny in space, one ascending one descending, karmic energy, deep space background with galaxies, purple and gold palette, fantasy art, no text no letters no words" },
  { slug: "casas-astrologicas", prompt: "The 12 astrological houses arranged in a cosmic wheel floating in deep space, each section glowing with different colors, zodiac symbols, golden borders, stars and nebulas background, mystical premium style, fantasy art, no text no letters no words" }
];

async function generateImage(article) {
  console.error(`Generating: ${article.slug}...`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${GEMINI_KEY}`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: article.prompt }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
    })
  });

  const data = await resp.json();

  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    const parts = data.candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        const ext = part.inlineData.mimeType.includes('png') ? 'png' : 'jpg';
        const filePath = path.join(__dirname, 'images', `${article.slug}.${ext}`);
        fs.writeFileSync(filePath, buffer);
        console.error(`  Saved: ${article.slug}.${ext} (${Math.round(buffer.length/1024)}KB)`);
        return `${article.slug}.${ext}`;
      }
    }
  }

  console.error(`  Error: ${JSON.stringify(data).substring(0, 300)}`);
  return null;
}

async function main() {
  const results = [];
  for (const article of articles) {
    const file = await generateImage(article);
    results.push({ slug: article.slug, file });
  }
  console.log(JSON.stringify(results));
}

main().catch(e => { console.error(e); process.exit(1); });
