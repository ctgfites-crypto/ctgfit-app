import { useEffect } from 'react'
import { navegar } from './router.js'
import './guia.css'

function setMeta(property, content) {
  const sel = property.startsWith('og:')
    ? `meta[property="${property}"]`
    : `meta[name="${property}"]`
  let el = document.querySelector(sel)
  if (!el) {
    el = document.createElement('meta')
    property.startsWith('og:')
      ? el.setAttribute('property', property)
      : el.setAttribute('name', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

const OG_TAGS = [
  ['og:title',       'Guía de Definición CTG Fit'],
  ['og:description', '8 capítulos. Calorías, macros, entrenamiento y los errores que arruinan el 90% de las definiciones.'],
  ['og:image',       'https://ctgfit.es/assets/cover-guia.png'],
  ['og:url',         'https://ctgfit.es/guia'],
  ['description',    'La guía de definición CTG Fit: 8 capítulos con el sistema completo de calorías, macros y entrenamiento.'],
]

const GUMROAD_URL = 'https://ctgfit6.gumroad.com/l/kugjcq'

const CAPITULOS = [
  'Calcula tus números',
  'Diseña tu déficit sin pasar hambre',
  'El entrenamiento que protege el músculo',
  'Cardio y pasos — cuánto de verdad necesitas',
  'Ajustes semana a semana',
  'Suplementos — lo que dice la evidencia',
  'Los errores que arruinan definiciones',
  'Plantillas para empezar desde hoy',
]

function Badge() {
  const lanzada = new Date() > new Date('2026-08-31')
  if (lanzada) return null
  return <span className="guia-badge">Disponible 31 de agosto</span>
}

export default function Guia() {
  useEffect(() => {
    const prev = {}
    OG_TAGS.forEach(([key]) => {
      const sel = key.startsWith('og:') ? `meta[property="${key}"]` : `meta[name="${key}"]`
      prev[key] = document.querySelector(sel)?.getAttribute('content') ?? null
    })
    OG_TAGS.forEach(([key, val]) => setMeta(key, val))
    return () => {
      OG_TAGS.forEach(([key]) => {
        if (prev[key] !== null) setMeta(key, prev[key])
      })
    }
  }, [])

  return (
    <div className="guia-page">
      <nav className="guia-nav">
        <a href="/" onClick={(e) => { e.preventDefault(); navegar('/') }} className="guia-nav-logo">
          CTG<span>FIT</span>
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="guia-hero">
        <div className="guia-wrap">
          <Badge />
          <h1>La guía de definición<br /><span>que no te da rodeos</span></h1>
          <p className="guia-sub">
            8 capítulos. Calorías, macros, entrenamiento, ajustes semana a semana,
            suplementos y los errores que arruinan el 90&nbsp;% de las definiciones.
          </p>
          <div className="guia-precio">
            <span className="guia-precio-old">14,99&nbsp;€</span>
            <span className="guia-precio-new">9,99&nbsp;€</span>
          </div>
          <a className="guia-cta" href={GUMROAD_URL} target="_blank" rel="noopener noreferrer">
            Consíguela en Gumroad →
          </a>
          <p className="guia-nota">Entrega inmediata · PDF descargable · Pago seguro</p>
        </div>
      </section>

      {/* ── Capítulos ── */}
      <section className="guia-caps">
        <div className="guia-wrap">
          <h2>Qué incluye</h2>
          <ul className="guia-lista">
            {CAPITULOS.map((cap, i) => (
              <li key={i}>
                <span className="guia-check">✓</span>
                <span><strong>Capítulo {i + 1}:</strong> {cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Para quién ── */}
      <section className="guia-para">
        <div className="guia-wrap">
          <h2>¿Para quién es?</h2>
          <p>Para quien lleva meses entrenando sin ver resultados claros.</p>
          <p>Para quien come "bien" pero no sabe exactamente qué come.</p>
          <p>Para quien quiere definir sin perder el músculo que ha construido.</p>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="guia-cta-final">
        <div className="guia-wrap">
          <h2>Empieza hoy</h2>
          <p className="guia-sub">
            12 semanas aplicando esto valen más que 12 meses buscando el plan perfecto.
          </p>
          <a className="guia-cta" href={GUMROAD_URL} target="_blank" rel="noopener noreferrer">
            Consíguela en Gumroad →
          </a>
          <p className="guia-nota">Entrega inmediata · PDF descargable · Pago seguro</p>
          <p className="guia-garantia">Si no aporta lo que promete, escríbeme y te devuelvo el dinero.</p>
        </div>
      </section>

      <footer className="guia-footer">
        <div className="guia-wrap">
          <span>© 2026 CTG FIT</span>
          <span>
            <a href="https://www.tiktok.com/@ctg.fit" target="_blank" rel="noopener noreferrer">TikTok</a>
            {' · '}
            <a href="mailto:ctgfit.contacto@gmail.com">Contacto</a>
            {' · '}
            <a href="/legal" onClick={(e) => { e.preventDefault(); navegar('/legal') }}>Aviso legal</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
