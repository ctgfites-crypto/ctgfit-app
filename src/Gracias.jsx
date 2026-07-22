import { navegar } from './router.js'
import './guia.css'

export default function Gracias() {
  return (
    <div className="guia-page">
      <nav className="guia-nav">
        <a href="/" onClick={(e) => { e.preventDefault(); navegar('/') }} className="guia-nav-logo">
          CTG<span>FIT</span>
        </a>
      </nav>

      <section style={{ padding: '80px 0 60px', textAlign: 'center' }}>
        <div className="guia-wrap">
          <div style={{ fontSize: 56, marginBottom: 20, color: '#CDFF00' }}>✓</div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, marginBottom: 16 }}>
            Estás dentro.
          </h1>
          <p style={{ fontSize: 17, color: '#aaa', lineHeight: 1.65, marginBottom: 8 }}>
            El 31 de agosto tienes acceso antes que nadie.
          </p>
          <p style={{ color: '#555', fontSize: 14, marginBottom: 56 }}>
            Revisa tu bandeja de entrada — en unos minutos recibirás un email de confirmación.
          </p>

          <div style={{
            background: '#111',
            border: '1px solid #1e1e1e',
            borderRadius: 12,
            padding: '36px 28px',
          }}>
            <p style={{ color: '#888', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 12 }}>
              Mientras tanto
            </p>
            <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 10 }}>
              Calcula tus macros gratis ahora
            </h2>
            <p style={{ color: '#777', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
              Es el primer paso del sistema. Te lleva 2 minutos y ya tienes el número real con el que empezar.
            </p>
            <a
              href="/calculadora"
              onClick={(e) => { e.preventDefault(); navegar('/calculadora') }}
              style={{
                display: 'inline-block',
                background: '#CDFF00',
                color: '#000',
                fontWeight: 800,
                fontSize: 15,
                padding: '14px 32px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Calcular mis macros →
            </a>
          </div>
        </div>
      </section>

      <footer className="guia-footer">
        <div className="guia-wrap">
          <span>© 2026 CTG FIT</span>
          <span>
            <a href="https://www.tiktok.com/@ctg.fit" target="_blank" rel="noopener noreferrer">TikTok</a>
            {' · '}
            <a href="/legal" onClick={(e) => { e.preventDefault(); navegar('/legal') }}>Aviso legal</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
