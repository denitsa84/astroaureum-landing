# ROADMAP FUNCIONAL — astroaureum.com

Auditoria tecnica del 10 de abril 2026. Foco en conversion real, no en features cosmeticas.

---

## ERRORES CRITICOS (rompen conversion)

### 1. Los 38 botones "Comprar" de lecturas.html estan ROTOS
**Problema:** Cada card de producto tiene un link `href="https://astroaureum.com/#occ-natal"` (y 37 variantes). Esos anchors NO existen en `index.html`. Los unicos IDs de seccion en la home son: `como-funciona`, `plus`, `precios`, `sincronia`, `testimonios`.

**Impacto:** Cliente clica "Comprar" → llega a la home → no ve el producto → se va. **Perdida 100% conversion desde lecturas.html.**

**Fix (eleccion entre 3 opciones):**
- **A (rapido, 1h):** Crear 37 Payment Links en Stripe, reemplazar cada `href` por el link directo. No requiere tocar index.html.
- **B (medio, 3h):** Agregar 37 `id=` en index.html en la seccion `#precios` con anchor targets visibles.
- **C (correcto, 1 dia):** Crear pagina dedicada por producto (`/lecturas/carta-natal.html`, etc.) con CTA Stripe embebido.

**Recomendacion:** Empezar con **A** (payment links). Es el cambio que mas rapido da dinero.

---

### 2. Los "cross-sells" entre cards tambien estan rotos
Las cards tienen links internos como `<a href="#occ-sinastria">Sinastria</a>` pero esos IDs **no existen en la misma pagina lecturas.html**. Solo existen los `data-id="..."`.

**Fix:** Agregar `id="occ-sinastria"` (y resto) al `<article class="card">` correspondiente, O convertir los cross-sells en botones que hagan scroll por JS.

---

### 3. Aureum Books — hero con imagen de fondo pero el resto del catalogo se ve vacio en mobile
La ultima version (commit 77084ed) tiene el hero con libro cosmico pero el catalogo SVG procedural puede no cargar bien. Verificar en Chrome DevTools movil.

**Fix:** Abrir DevTools → Console en /aureum-books y revisar errores JS.

---

## ERRORES MEDIOS (perjudican UX pero no matan venta)

### 4. Falta `BRAND_DNA.md`
El prompt original pedia usar `BRAND_DNA.md` como guia de tono, pero ese archivo no existe. Recomiendo crearlo con:
- Voz de marca (oraculo ancestral, premium, sofisticado)
- Palabras prohibidas (ej: "garantia 100%", "mejor precio")
- Mensajes de error tipo ("Las estrellas no alinean este pago. Intenta de nuevo.")

### 5. No hay analytics de clics sobre cards en lecturas.html
No sabes cuales son los 5 productos mas clickados. Sin este dato, optimizar precios o copy es adivinar.

**Fix:** Agregar `gtag('event', 'click_buy', {product_id: 'occ-natal'})` en cada boton.

---

## NO APLICA (ignorar del prompt original)

- **`src/features/` — NO aplica.** Tu proyecto es HTML estatico, no React. No hay arquitectura "feature-first" que migrar.
- **Formularios de contacto rotos** — Tu unico CTA real es Stripe Checkout. No tienes formularios de contacto que auditar.
- **"Sistema de reservas"** — Tu producto es digital (PDF generado por AI), no hay reservas que hacer.

---

## PRIORIDAD DE EJECUCION (en orden)

1. **HOY:** Fix #1 con opcion A (crear 37 payment links Stripe y reemplazar hrefs). Esto desbloquea conversion inmediata.
2. **Esta semana:** Fix #2 (cross-sells rotos) + Fix #5 (analytics).
3. **Proxima semana:** Fix #3 (aureum-books mobile).
4. **Cuando haya tiempo:** Fix #4 (BRAND_DNA.md).

---

## METRICAS A MONITOREAR DESPUES DEL FIX

- Click-through rate de `lecturas.html` → Stripe Checkout
- Abandono en Stripe Checkout
- Producto mas vendido desde lecturas.html
- Tiempo en pagina lecturas.html (si sube, el fix funciona)

---

Generado por auditoria tecnica. Siguiente accion concreta: crear los 37 payment links en Stripe o pedirme que genere el script para modificar los hrefs cuando los tengas.
