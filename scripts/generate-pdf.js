import puppeteer from 'puppeteer'
import { marked } from 'marked'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// â”€â”€ Configurar marked â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
marked.setOptions({ breaks: true, gfm: true })

// â”€â”€ CSS global â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Montserrat', sans-serif;
  background: #0a0a0a;
  color: #e0e0e0;
  font-size: 15px;
  line-height: 1.8;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* â”€â”€ PORTADA â”€â”€ */
.cover {
  page-break-after: always;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  gap: 0;
  position: relative;
}
.cover-ctg {
  font-size: 150px;
  font-weight: 900;
  color: #CDFF00;
  letter-spacing: -4px;
  line-height: 1;
}
.cover-line {
  width: 160px;
  height: 2px;
  background: #CDFF00;
  margin: 24px auto 28px;
}
.cover-title {
  font-size: 42px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 4px;
  text-transform: uppercase;
}
.cover-sub {
  font-size: 17px;
  color: #888888;
  margin-top: 14px;
  font-weight: 400;
}
.cover-footer {
  position: absolute;
  bottom: 48px;
  text-align: center;
}
.cover-url {
  font-size: 13px;
  font-weight: 800;
  color: #CDFF00;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.cover-year {
  font-size: 11px;
  color: #444;
  margin-top: 6px;
  letter-spacing: 1px;
}

/* â”€â”€ PÃGINA INTRO â”€â”€ */
.intro-page {
  page-break-after: always;
  min-height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 72px;
}
.intro-title {
  font-size: 28px;
  font-weight: 900;
  color: #C8FF00;
  letter-spacing: 0.5px;
  margin-bottom: 48px;
  padding-bottom: 20px;
  border-bottom: 1px solid #1a1a1a;
}
.intro-body p {
  font-size: 16px;
  color: #e0e0e0;
  line-height: 1.85;
  margin-bottom: 22px;
}
.intro-firma {
  margin-top: 40px !important;
  font-size: 15px !important;
  font-weight: 800;
  color: #ffffff !important;
}

/* â”€â”€ ÃNDICE â”€â”€ */
.toc {
  page-break-after: always;
  padding: 64px 60px;
  min-height: 100vh;
}
.toc-title {
  font-size: 32px;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 40px;
  padding-bottom: 14px;
  border-bottom: 1px solid #1a1a1a;
}
.toc-item {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #111;
}
.toc-num {
  font-size: 12px;
  font-weight: 800;
  color: #CDFF00;
  letter-spacing: 2px;
  min-width: 32px;
}
.toc-name {
  font-size: 16px;
  color: #e0e0e0;
  font-weight: 600;
}

/* â”€â”€ CAPÃTULOS â”€â”€ */
.chapter {
  page-break-before: always;
  padding: 60px 60px 80px;
  position: relative;
}
.ch-label {
  font-size: 11px;
  font-weight: 800;
  color: #CDFF00;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.chapter h1 {
  font-size: 34px;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #1a1a1a;
}
.chapter h2 {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin: 32px 0 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #CDFF00;
}
.chapter h3 {
  font-size: 15px;
  font-weight: 800;
  color: #CDFF00;
  margin: 24px 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.chapter p {
  margin-bottom: 14px;
  color: #e0e0e0;
}
.chapter strong { color: #ffffff; font-weight: 800; }
.chapter em { color: #aaaaaa; font-style: italic; }
.chapter code {
  background: #111;
  color: #CDFF00;
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}
.chapter blockquote {
  border-left: 3px solid #CDFF00;
  background: #111111;
  padding: 14px 20px;
  margin: 20px 0;
  border-radius: 0 6px 6px 0;
  color: #888888;
  font-size: 14px;
}
.chapter blockquote p { color: #888888; margin: 0; }
.chapter ul, .chapter ol {
  margin: 12px 0 16px 0;
  padding-left: 0;
  list-style: none;
}
.chapter ul li, .chapter ol li {
  position: relative;
  padding-left: 22px;
  margin-bottom: 8px;
  color: #e0e0e0;
}
.chapter ul li::before {
  content: 'â– ';
  position: absolute;
  left: 0;
  color: #CDFF00;
  font-size: 8px;
  top: 4px;
}
.chapter ol { counter-reset: item; }
.chapter ol li { counter-increment: item; }
.chapter ol li::before {
  content: counter(item) '.';
  position: absolute;
  left: 0;
  color: #CDFF00;
  font-weight: 800;
  font-size: 13px;
}
.chapter hr {
  border: none;
  border-top: 1px solid #1a1a1a;
  margin: 28px 0;
}
.chapter table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 14px;
}
.chapter table th {
  background: #111111;
  color: #CDFF00;
  font-weight: 800;
  padding: 10px 14px;
  text-align: left;
  border: 1px solid #CDFF00;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.chapter table td {
  padding: 9px 14px;
  border: 1px solid #222;
  color: #e0e0e0;
}
.chapter table tr:nth-child(even) td { background: #0d0d0d; }
.chapter table tr:nth-child(odd) td { background: #0a0a0a; }

/* â”€â”€ FOOTER (via CSS @page + pseudo) â”€â”€ */
@page {
  size: A4;
  margin: 20mm;
  @bottom-left {
    content: 'ctgfit.es';
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    color: #444;
  }
  @bottom-right {
    content: counter(page);
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    color: #444;
  }
}
`

// â”€â”€ Leer capÃ­tulos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const capTitulos = [
  'Calcula tus nÃºmeros',
  'DiseÃ±a tu dÃ©ficit sin pasar hambre',
  'El entrenamiento que protege el mÃºsculo',
  'Cardio y pasos â€” cuÃ¡nto de verdad necesitas',
  'Ajustes semana a semana',
  'Suplementos â€” lo que dice la evidencia',
  'Los errores que arruinan definiciones',
  'Plantillas para empezar desde hoy',
]

const capitulos = []
for (let i = 1; i <= 8; i++) {
  const path = join(root, 'content', 'guia', `capitulo-${i}.md`)
  const md = readFileSync(path, 'utf-8')
  // Quitar el h1 del markdown (lo ponemos nosotros con estilo propio)
  const sinH1 = md.replace(/^# .+\n?/m, '').trim()
  capitulos.push({ num: i, titulo: capTitulos[i - 1], html: marked(sinH1) })
}

// â”€â”€ Construir HTML â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const portada = `
<div class="cover">
  <div class="cover-ctg">CTG</div>
  <div class="cover-line"></div>
  <div class="cover-title">GuÃ­a de DefiniciÃ³n</div>
  <div class="cover-sub">El sistema completo en 8 capÃ­tulos</div>
  <div class="cover-footer">
    <div class="cover-url">ctgfit.es</div>
    <div class="cover-year">2026</div>
  </div>
</div>
`

const intro = `
<div class="intro-page">
  <div class="intro-title">Por quÃ© existe esta guÃ­a</div>
  <div class="intro-body">
    <p>Llevo aÃ±os entrenando. Durante los primeros, hacÃ­a lo que hacÃ­a todo el mundo: cardio en ayunas, dÃ©ficit agresivo, cambiar el plan cada dos semanas cuando no veÃ­a resultados.</p>
    <p>No funcionÃ³. PerdÃ­ mÃºsculo, me estanquÃ© y perdÃ­ tiempo que no vuelve.</p>
    <p>Lo que sÃ­ funcionÃ³ fue simple: calcular bien, ajustar con datos reales y ser constante durante suficiente tiempo. Sin secretos, sin suplementos milagrosos, sin rutinas de influencer.</p>
    <p>Esta guÃ­a es exactamente eso. El sistema que uso yo, explicado sin rodeos, para que no pierdas el tiempo que perdÃ­ yo.</p>
    <p>Para quien entrena con cabeza y quiere resultados que duran.</p>
    <p class="intro-firma">Christian â€” CTG Fit</p>
  </div>
</div>
`

const indice = `
<div class="toc">
  <div class="toc-title">Contenido</div>
  ${capitulos.map(c => `
    <div class="toc-item">
      <span class="toc-num">0${c.num}</span>
      <span class="toc-name">${c.titulo}</span>
    </div>
  `).join('')}
</div>
`

const pags = capitulos.map(c => `
<div class="chapter">
  <div class="ch-label">CapÃ­tulo ${String(c.num).padStart(2, '0')}</div>
  <h1>${c.titulo}</h1>
  ${c.html}
</div>
`).join('')

const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>${CSS}</style>
</head>
<body>
  ${portada}
  ${intro}
  ${indice}
  ${pags}
</body>
</html>`

// â”€â”€ Guardar HTML de debug â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const htmlOut = join(root, 'public', 'guia-ctg-fit-v2.html')
writeFileSync(htmlOut, fullHtml)
console.log('HTML generado')

// â”€â”€ Puppeteer â†’ PDF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setContent(fullHtml, { waitUntil: 'networkidle0', timeout: 60000 })

const pdfOut = join(root, 'public', 'guia-ctg-fit-v2.pdf')
await page.pdf({
  path: pdfOut,
  format: 'A4',
  printBackground: true,
  margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: `
    <div style="
      width:100%; font-family:sans-serif; font-size:10px;
      color:#444; display:flex; justify-content:space-between;
      padding:0 20mm; border-top:1px solid #1a1a1a; padding-top:4px;
    ">
      <span>ctgfit.es</span>
      <span class="pageNumber"></span>
    </div>
  `,
})

await browser.close()

const { statSync } = await import('fs')
const size = (statSync(pdfOut).size / 1024).toFixed(0)
console.log(`PDF generado â†’ ${pdfOut}`)
console.log(`TamaÃ±o: ${size} KB`)

