# CTG Fit — CLAUDE.md

## Proyecto
Web app fitness en React + Vercel. URL: ctgfit-app.vercel.app → futuro: ctgfit.es

## Stack
React, Tailwind, Vercel, MailerLite (API pendiente), Gumroad (31 agosto)

## Paleta
- Negro: #0a0a0a
- Lima: #0BC244  
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
- [ ] MailerLite: conectar formulario
- [ ] /legal: title y meta independientes
- [ ] ctgfit.es: configurar cuando se compre el dominio

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- IMPORTANT: Run `graphify update` on `C:\Users\Usuario\ctg-fit-macros`, never on `~/.claude`.
