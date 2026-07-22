# CTG Fit — CLAUDE.md

## Proyecto
Web app fitness en React + Vercel. URL: ctgfit-app.vercel.app → futuro: ctgfit.es

## Stack
React, Tailwind, Vercel, MailerLite (API pendiente), Gumroad (31 agosto)

## Paleta
- Negro: #000000 / #0a0a0a (fondo)
- Lima: #CDFF00 (único valor — no usar variantes)
- Blanco: #ffffff

## Tipografía
Montserrat ExtraBold para títulos. Nunca sans-serif genéricas.

## Reglas absolutas
1. Sin contenido generado por IA visible al usuario
2. Sin promesas de resultados garantizados
3. /legal tiene su propio <title> y meta description
4. Variables de entorno en .env.local, nunca hardcodeadas

## Pendientes activos
- [ ] Hero: foto real + mockup calculadora
- [x] MailerLite: API key en .env + group ID 193426212975019303 ("Lista CTG") conectado
- [ ] MailerLite: completar automation a 5 emails (ahora tiene 3, desactivada) — hacer en dashboard
- [ ] MailerLite: activar automation desde dashboard una vez completa
- [ ] /legal: title y meta independientes
- [x] ctgfit.es: dominio configurado y en producción
- [ ] /gracias: limpiada (sin CTA de compra hasta 31 agosto) ✓

## Lanzamiento
- Fecha: 31 agosto 2026
- Precio: 9,99€ (precio lanzamiento)
- Gumroad: https://ctgfit6.gumroad.com/l/kugjcq
- MailerLite grupo: 193426212975019303
- MailerLite automation ID: 193537902611793053 (desactivada — activar antes del 31)

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- IMPORTANT: Run `graphify update` on `C:\Users\Usuario\ctg-fit-macros`, never on `~/.claude`.
