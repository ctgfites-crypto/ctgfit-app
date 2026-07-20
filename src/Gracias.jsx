import { navegar } from './router.js'
import './guia.css'

const GUMROAD_URL = 'https://ctgfit6.gumroad.com/l/kugjcq'

export default function Gracias() {
  return (
    <div className="guia-page">
      <nav className="guia-nav">
        <a href="/" onClick={(e) => { e.preventDefault(); navegar('/') }} className="guia-nav-logo">
          CTG<span>FIT</span>
        </a>
      </nav>

      <section style={{ padding: '80px 0 40px', textAlign: 'center' }}>
        <div className="guia-wrap">
          <div style={{ fontSize: 64, marginBottom: 24 }}>✓</div>
          <h1 style={{ color: '#CDFF00', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 900, marginBottom: 16 }}>
            ¡Ya estás apuntado!
          </h1>
          <p style={{ fontSize: 18, color: '#e0e0e0', marginBottom: 8 }}>
            Te avisamos el 31 de agosto cuando la Guía de Definición CTG esté disponible.
          </p>
          <p style={{ color: '#666', fontSize: 15, marginBottom: 48 }}>
            Revisa tu bandeja de entrada — en unos minutos recibirás un email de confirmación.
          </p>

          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: 16,
            padding: '36px 28px',
            marginBottom: 40,
          }}>
            <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
              Mientras tanto, aprovecha la calculadora
            </h2>
            <p style={{ color: '#999', fontSize: 15, marginBottom: 24 }}>
              Calcula tus macros gratis ahora — es el primer paso del sistema.
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
                padding: '14px 28px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Calcular mis macros →
            </a>
          </div>

          <p style={{ color: '#555', fontSize: 14 }}>
            ¿Ya quieres la guía?{' '}
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#CDFF00', textDecoration: 'underline' }}
            >
              Cómprala ahora por 9,99&nbsp;€
            </a>
          </p>
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
