const fs = require('fs');
const path = require('path');

const OPENROUTER_KEY = "YOUR_OPENROUTER_KEY";

const articles = [
  { slug: "carta-natal", prompt: "Generate a beautiful mystical image of a cosmic birth chart (natal chart) floating in deep space, with golden zodiac symbols glowing, planets aligned in a circle, stars and nebulas in dark blue and purple background, ethereal golden light rays, ultra detailed, fantasy art style, no text" },
  { slug: "luna-llena-escorpio", prompt: "Generate a stunning image of a full moon in Scorpio, giant luminous full moon with a scorpion constellation overlay, deep purple and dark blue night sky, mystical cosmic energy emanating from the moon, stars scattered across the sky, ethereal and magical atmosphere, no text" },
  { slug: "sinastria", prompt: "Generate a romantic cosmic image of two souls connected by golden astral threads in space, two ethereal human silhouettes facing each other with cosmic energy flowing between them, hearts made of stars, nebula background in pink and purple, love and cosmic connection theme, no text" },
  { slug: "mercurio-retrogrado", prompt: "Generate a mystical image of planet Mercury spinning backwards in retrograde motion with glowing trails, cosmic swirls around it, communication symbols breaking apart in the background, deep space setting with stars, golden and cyan color palette, ethereal style, no text" },
  { slug: "nodos-lunares", prompt: "Generate a mystical image of the lunar nodes (north node and south node) as two glowing cosmic orbs connected by a golden thread of destiny, one ascending and one descending, karmic symbols, deep space background with stars and galaxies, purple and gold palette, no text" },
  { slug: "casas-astrologicas", prompt: "Generate a stunning image of the 12 astrological houses arranged in a cosmic wheel floating in space, each house section glowing with different colors, zodiac symbols in each section, golden borders, deep space background with stars and nebulas, mystical premium style, no text" }
];

async function generateImage(article) {
  console.error(`Generating image: ${article.slug}...`);

  const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENROUTER_KEY
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: article.prompt }],
      provider: { order: ["Google"] }
    })
  });

  const data = await resp.json();

  // Check if response has image content
  if (data.choices && data.choices[0] && data.choices[0].message) {
    const msg = data.choices[0].message;

    // Check for multimodal content with image parts
    if (msg.content && Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (part.type === 'image_url' && part.image_url && part.image_url.url) {
          const base64 = part.image_url.url.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64, 'base64');
          const filePath = path.join(__dirname, 'images', `${article.slug}.png`);
          fs.writeFileSync(filePath, buffer);
          console.error(`  Saved: ${filePath}`);
          return true;
        }
      }
    }

    // Try inline_data format
    if (msg.content && typeof msg.content === 'string' && msg.content.includes('base64')) {
      const match = msg.content.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
      if (match) {
        const buffer = Buffer.from(match[1], 'base64');
        const filePath = path.join(__dirname, 'images', `${article.slug}.png`);
        fs.writeFileSync(filePath, buffer);
        console.error(`  Saved: ${filePath}`);
        return true;
      }
    }

    console.error(`  No image in response. Content type: ${typeof msg.content}`);
    if (typeof msg.content === 'string') {
      console.error(`  Content preview: ${msg.content.substring(0, 200)}`);
    } else {
      console.error(`  Content: ${JSON.stringify(msg.content).substring(0, 300)}`);
    }
  } else {
    console.error(`  Error: ${JSON.stringify(data).substring(0, 300)}`);
  }
  return false;
}

async function main() {
  let success = 0;
  for (const article of articles) {
    const ok = await generateImage(article);
    if (ok) success++;
  }
  console.log(`Generated ${success}/${articles.length} images`);
}

main().catch(e => { console.error(e); process.exit(1); });
