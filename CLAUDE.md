# CTG Fit — CLAUDE.md

## Proyecto
Web app fitness React + Vercel. URL actual: ctgfit-app.vercel.app → ctgfit.es (dominio nuevo)

## Stack
React 18 + Vite 6 (sin Tailwind — CSS puro scoped bajo `.landing`, `.calculadora`, etc.). Vercel serverless functions en `/api/`. MailerLite embed (cuenta 2518890, form DXZXBO). Gumroad (producto en ctgfit6.gumroad.com/l/kugjcq → también ctgfit.gumroad.com/l/guia-definicion).

## Paleta
- Negro fondo: `#0a0a0a`
- Lima acento: `#0BC244`
- Blanco texto: `#FFFFFF`
- Gris texto secundario: `#e0e0e0`
- Negro carbón (secciones): `#111111`

## Tipografía
Montserrat importada en `index.html` vía Google Fonts. Pesos: 400, 600, 800, 900. Usar `font-weight: 900` en todos los h1/h2/h3 del proyecto.

## Router
Custom History API (pushState + popstate). Rutas actuales:
- `/` → Landing.jsx
- `/calculadora` → Calculadora.jsx
- `/legal` → Legal.jsx
- `/guia` → Guia.jsx

Para añadir ruta: añadir case en `src/App.jsx` + meta en el useEffect de SEO.

## Reglas
1. Sin contenido generado por IA visible al usuario
2. Sin promesas de resultados garantizados en la guía
3. `/legal` tiene su propio title y meta description únicos
4. Variables sensibles en `.env.local` (nunca en el código). Las vars activas: `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID`
5. Mobile-first siempre
6. Imágenes en `public/assets/`, referenciadas como `/assets/nombre.ext`
7. El build de Vercel debe pasar antes de cada commit (`npm run build`)
8. CSS scoped por página — prefijo de clase de la página (`.landing .hero`, no `.hero`)

## Pendientes activos
- [x] Hero: implementar con mockup de la calculadora (imagen en `/assets/mockup-app.png`)
- [x] MailerLite: formulario embed activo (DXZXBO), serverless fn en `api/subscribe.js`
- [x] `/legal`: title y meta propios
- [x] `/guia`: página de venta de la guía
- [x] PDF: `npm run generate:pdf` → `public/guia-ctg-fit.pdf`
- [ ] ctgfit.es: dominio configurado en Vercel (apuntar DNS)
- [ ] Gumroad: URL de venta real confirmada
- [ ] christian-1.jpg: recortar (fondo baño visible actualmente)

## URLs
- Web: ctgfit-app.vercel.app (→ ctgfit.es cuando esté el DNS)
- Calculadora: /calculadora
- Guía: /guia
- Gumroad: ctgfit6.gumroad.com/l/kugjcq

## Archivos clave
- `src/Landing.jsx` + `src/landing.css` — página principal
- `src/Calculadora.jsx` + `src/index.css` — calculadora 6 pasos
- `src/Guia.jsx` + `src/guia.css` — página de venta guía
- `src/Legal.jsx` + `src/legal.css` — aviso legal
- `src/App.jsx` — router + meta SEO
- `api/subscribe.js` — serverless fn MailerLite
- `scripts/generate-pdf.js` — genera PDF guía
- `content/guia/capitulo-*.md` — fuente de los 8 capítulos
- `index.html` — MailerLite universal script + MutationObserver Higgsfield

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- IMPORTANT: Run `graphify update` on `C:\Users\Usuario\ctg-fit-macros`, never on `~/.claude` (contiene .credentials.json).
