# CTG Fit — Contexto del proyecto
## Stack
React + Vite + Tailwind · desplegado en Vercel · dominio ctgfit-app.vercel.app
## Paleta
Negro carbón: `#111111` · Lima: `#C8F542` · Blanco: `#FFFFFF`
## Tipografía
Montserrat ExtraBold titulares · Montserrat Medium texto
## Reglas

* Siempre en español
* Rendimiento móvil primero (lazy loading, webp, sin animaciones que bloqueen)
* Sin imágenes generadas por IA como protagonistas
* Mantener coherencia visual con la paleta en todo cambio
* El build de Vercel debe pasar antes de cada commit
## Estructura actual
/ → landing principal · /calculadora → calculadora de macros · /legal → aviso legal y privacidad
## Objetivo del proyecto
Web app de marca personal fitness CTG Fit: landing + calculadora de macros gratuita + lista de email + recursos/productos futuros. AdSense y producto digital cuando el titular cumpla 18.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
