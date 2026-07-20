import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ── Simple markdown → HTML converter ─────────────────────────────────────────
function mdToHtml(md) {
  return md
    // Blockquotes (disclaimers)
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // H1
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // H2
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code inline
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // HR
    .replace(/^---$/gm, '<hr />')
    // Tables (simple)
    .replace(/^\|(.+)\|$/gm, (_, row) => {
      const cells = row.split('|').map(c => c.trim())
      const isHeader = cells.some(c => /^-+$/.test(c))
      if (isHeader) return ''
      return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>'
    })
    // Wrap consecutive <tr> in <table>
    .replace(/(<tr>[\s\S]+?<\/tr>)(\n<tr>[\s\S]+?<\/tr>)*/g, match => {
      const rows = match.trim().split('\n')
      const [header, ...body] = rows
      return `<table><thead>${header}</thead><tbody>${body.join('')}</tbody></table>`
    })
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)(\n<li>[\s\S]+?<\/li>)*/g, match => `<ul>${match}</ul>`)
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Italics at end (links in *italics*)
    .replace(/<em>(.+?)<\/em>/g, '<em>$1</em>')
    // Paragraphs — wrap non-tagged lines
    .split('\n\n')
    .map(block => {
      block = block.trim()
      if (!block) return ''
      if (/^<(h[1-6]|ul|ol|li|table|blockquote|hr|tr)/.test(block)) return block
      return `<p>${block.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')
}

// ── Load chapters ─────────────────────────────────────────────────────────────
const chapters = []
for (let i = 1; i <= 8; i++) {
  const md = readFileSync(join(root, `content/guia/capitulo-${i}.md`), 'utf-8')
  chapters.push(md)
}

// ── Build HTML ────────────────────────────────────────────────────────────────
const coverHtml = `
<div class="page cover-page">
  <div class="cover-inner">
    <div class="cover-eyebrow">GUÍA DE DEFINICIÓN</div>
    <div class="cover-title">CTG<span>FIT</span></div>
    <div class="cover-sub">El sistema completo en 8 capítulos</div>
    <div class="cover-author">por Christian · @ctg.fit</div>
  </div>
</div>
`

const chapterPages = chapters.map((md, idx) => {
  const num = idx + 1
  const body = mdToHtml(md)
  return `
<div class="page chapter-page">
  <div class="chapter-num">CAPÍTULO ${num}</div>
  <div class="chapter-body">${body}</div>
  <div class="footer">
    <span>ctgfit.es</span>
    <span>Guía de Definición CTG Fit</span>
    <span class="page-num">Capítulo ${num}</span>
  </div>
</div>
`
}).join('\n')

const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Guía de Definición CTG Fit</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0a0a0a;
    color: #e0e0e0;
    font-family: 'Montserrat', system-ui, sans-serif;
    font-size: 11pt;
    line-height: 1.7;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 20mm 18mm 18mm;
    page-break-after: always;
    position: relative;
    background: #0a0a0a;
  }

  /* ── Cover ── */
  .cover-page {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #000;
  }
  .cover-inner { max-width: 420px; }
  .cover-eyebrow {
    color: #aaa;
    font-size: 10pt;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .cover-title {
    font-size: 64pt;
    font-weight: 900;
    color: #fff;
    line-height: 1;
    letter-spacing: -2px;
  }
  .cover-title span { color: #0BC244; }
  .cover-sub {
    font-size: 13pt;
    font-weight: 600;
    color: #ccc;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .cover-author {
    font-size: 9pt;
    color: #666;
    letter-spacing: 0.1em;
  }

  /* ── Chapter ── */
  .chapter-page { padding-bottom: 40mm; }

  .chapter-num {
    font-size: 9pt;
    font-weight: 800;
    color: #0BC244;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #0BC244;
  }

  .chapter-body { color: #e0e0e0; }

  h1 {
    font-size: 20pt;
    font-weight: 900;
    color: #fff;
    margin: 0 0 20px;
    line-height: 1.2;
  }

  h2 {
    font-size: 14pt;
    font-weight: 800;
    color: #fff;
    margin: 28px 0 10px;
    padding-top: 16px;
  }

  h3 {
    font-size: 11pt;
    font-weight: 700;
    color: #0BC244;
    margin: 20px 0 6px;
  }

  p { margin-bottom: 10px; color: #e0e0e0; }

  strong { color: #fff; font-weight: 700; }

  em { color: #aaa; font-style: normal; font-size: 9.5pt; }

  hr {
    border: none;
    border-top: 1px solid #222;
    margin: 20px 0;
  }

  blockquote {
    background: #111;
    border-left: 3px solid #0BC244;
    padding: 10px 16px;
    margin: 12px 0;
    font-size: 9pt;
    color: #999;
    font-style: italic;
  }

  ul, ol { padding-left: 20px; margin-bottom: 12px; }
  li { margin-bottom: 4px; color: #e0e0e0; }

  code {
    background: #1a1a1a;
    color: #0BC244;
    padding: 1px 5px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 9.5pt;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 9.5pt;
  }
  td, th {
    border: 1px solid #0BC244;
    padding: 7px 10px;
    background: #1a1a1a;
    text-align: left;
  }
  thead td { background: #0a2a14; color: #0BC244; font-weight: 700; }

  /* ── Footer ── */
  .footer {
    position: absolute;
    bottom: 12mm;
    left: 18mm;
    right: 18mm;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: #444;
    border-top: 1px solid #1a1a1a;
    padding-top: 8px;
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
${coverHtml}
${chapterPages}
</body>
</html>`

// ── Write temp HTML ───────────────────────────────────────────────────────────
const tmpHtml = join(root, 'scripts', '_guia-tmp.html')
writeFileSync(tmpHtml, fullHtml, 'utf-8')
console.log('HTML generado')

// ── Puppeteer → PDF ───────────────────────────────────────────────────────────
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle0', timeout: 60000 })

// Wait for Montserrat to load
await page.evaluateHandle('document.fonts.ready')

const pdfPath = join(root, 'public', 'guia-ctg-fit.pdf')
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
})

await browser.close()
console.log(`PDF generado → ${pdfPath}`)
