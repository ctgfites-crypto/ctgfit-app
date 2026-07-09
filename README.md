# CTG Fit — Calculadora de Macros

Web app de una sola página para calcular calorías (TDEE con Mifflin-St Jeor) y reparto de macros según objetivo. Construida con React + Vite. Todo se calcula en el cliente: sin backend, sin base de datos, sin cuentas ni localStorage.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build de producción

```bash
npm run build
```

El resultado queda en `dist/`. Puedes previsualizarlo con `npm run preview`.

## Despliegue en Vercel

### Opción A — Desde GitHub (recomendada)

1. Sube el proyecto a un repositorio de GitHub.
2. Entra en [vercel.com](https://vercel.com), inicia sesión y pulsa **Add New → Project**.
3. Importa el repositorio. Vercel detecta Vite automáticamente:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Pulsa **Deploy**. Cada push a `main` desplegará automáticamente.

### Opción B — Con la CLI de Vercel

```bash
npm install -g vercel
vercel        # despliegue de preview
vercel --prod # despliegue a producción
```

### Después del primer despliegue

1. Activa **Analytics** en el panel del proyecto en Vercel (pestaña Analytics → Enable).
2. En `index.html`, cambia las metas `og:image` y `twitter:image` a la URL absoluta de tu dominio (p. ej. `https://tu-app.vercel.app/og-image.png`) — WhatsApp y otros scrapers no resuelven rutas relativas.

## Cálculo

- **TDEE**: Mifflin-St Jeor × multiplicador de actividad (1.2–1.9), ajustado por objetivo (definición −15%, mantenimiento 0%, volumen +10%).
- **Proteína**: 2 g/kg de peso corporal.
- **Grasa**: 25% de las calorías totales.
- **Carbohidratos**: calorías restantes.

## PWA y analítica

- La app es una **PWA**: funciona offline tras la primera visita (service worker con precaché) y se puede instalar desde el navegador ("Añadir a pantalla de inicio").
- Analítica con **Vercel Analytics** (sin cookies, sin banner): se activa sola al desplegar en Vercel habilitando *Analytics* en el panel del proyecto. Eventos personalizados: `calculo_completado`, `resultado_descargado`, `tiktok_click`.
- Para probar el service worker en local usa `npm run build && npm run preview` (no funciona con `npm run dev`).

> Herramienta educativa. No sustituye el consejo de un profesional sanitario o dietista-nutricionista.
