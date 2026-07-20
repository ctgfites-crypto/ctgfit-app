import { useState, useEffect } from 'react'
import { navegar } from './router.js'
import SpotlightCard from './components/SpotlightCard.jsx'
import FondoImagen from './components/FondoImagen.jsx'
import './landing.css'

function MailerLiteForm() {
  useEffect(() => {
    // Eliminar script anterior si existe
    const old = document.querySelector('script[src*="mailerlite"]')
    if (old) old.remove()
    // Resetear el objeto ml
    delete window.ml
    // Reinyectar el script universal
    const s = document.createElement('script')
    s.src = 'https://assets.mailerlite.com/js/universal.js'
    s.async = true
    s.onload = () => {
      if (window.ml) window.ml('account', '2518890')
    }
    document.head.appendChild(s)
  }, [])
  return <div className="ml-embedded" data-form="DXZXBO"></div>
}

function LinkCalc({ className, children }) {
  return (
    <a
      className={className}
      href="/calculadora"
      onClick={(e) => { e.preventDefault(); navegar('/calculadora') }}
    >
      {children}
    </a>
  )
}

export default function Landing() {
  const [fotoOk, setFotoOk] = useState(true)
  const [logoOk, setLogoOk] = useState(true)

  return (
    <div className="landing">
      <nav>
        <div className="nav-in">
          <a href="/" aria-label="CTG Fit — inicio">
            {logoOk ? (
              <img
                className="nav-logo"
                src="/assets/logo-horizontal.png"
                alt="CTG FIT"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <div className="logo">CTG<span>FIT</span></div>
            )}
          </a>
          <div className="nav-links">
            <a href="#plan">El plan</a>
            <a href="#recursos">Recursos</a>
            <LinkCalc>Calculadora</LinkCalc>
            <a href="#sobre">Sobre mí</a>
            <a href="/guia" onClick={(e) => { e.preventDefault(); navegar('/guia') }} className="nav-guia">Guía</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-text">
            <p className="hero-eyebrow hero-anim-up">
              Calcula tus macros
            </p>
            <h1 className="hero-anim-up">
              El sistema que te dice exactamente qué comer
            </h1>
            <p className="hero-sub hero-anim-up">
              Sin adivinar. Sin restricciones extremas. Solo tus números.
            </p>
            <div className="hero-cta-group hero-anim-btn">
              <LinkCalc className="cta">Calcular gratis →</LinkCalc>
              <span className="hero-nota">Gratis · Sin registro · En 30 segundos</span>
            </div>
          </div>
          <div className="hero-mockup hero-anim-right">
            <div className="iphone-frame">
              <img
                src="/assets/mockup-app.png"
                alt="Captura de la calculadora CTG Fit"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </header>

      <section id="plan">
        <FondoImagen src="/assets/bg-seccion.webp" overlay={0.55} />
        <div className="wrap">
          <h2>El <span>plan</span></h2>
          <p className="lead">Tres pasos. Es lo que sigo yo y lo que documento cada semana en redes.</p>
          <div className="pasos">
            <div className="paso">
              <div className="num">1</div>
              <h3>Calcula tus números</h3>
              <p>Calorías y macros según tu objetivo real. Sin esto, todo lo demás es adivinar. Usa la calculadora gratuita de abajo.</p>
            </div>
            <div className="paso">
              <div className="num">2</div>
              <h3>Entrena con estructura</h3>
              <p>Menos ejercicios aleatorios, más progresión medible. En mis vídeos te enseño los errores que te frenan.</p>
            </div>
            <div className="paso">
              <div className="num">3</div>
              <h3>Sé constante y mide</h3>
              <p>Peso semanal, fotos mensuales, ajustes pequeños. La transformación es aburrida hasta que deja de serlo.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos">
        <div className="wrap">
          <h2>Recursos <span>CTG FIT</span></h2>
          <p className="lead">Lo que hay ahora y lo que viene. Apúntate abajo para enterarte el primero.</p>
          <div className="prods">
            <SpotlightCard className="prod">
              <span className="badge">Gratis</span>
              <h3>Calculadora de macros</h3>
              <p>Tus calorías y macros en 30 segundos, según tu objetivo: definición, volumen o mantenimiento.</p>
              <LinkCalc className="mini">Ir a la calculadora →</LinkCalc>
            </SpotlightCard>
            <SpotlightCard className="prod destacado">
              <span className="badge">Disponible</span>
              <h3>Guía de definición CTG</h3>
              <p>El sistema completo que uso yo: cómo calcular, qué comer, cómo entrenar y cómo ajustar semana a semana. Paso a paso.</p>
              <a className="mini" href="/guia" onClick={(e) => { e.preventDefault(); navegar('/guia') }}>Ver la guía →</a>
            </SpotlightCard>
            <SpotlightCard className="prod">
              <span className="badge gris">En desarrollo</span>
              <h3>Plantillas de entreno</h3>
              <p>Rutinas estructuradas con progresión incluida, para gym completo o material básico.</p>
              <a className="mini" href="#lista">Avísame cuando salga →</a>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section id="calculadora">
        <div className="wrap">
          <div className="calc">
            <div>
              <h2>Calculadora de macros</h2>
              <p>Introduce tus datos y obtén tus calorías y macros exactos para tu objetivo. Gratis, sin registro.</p>
            </div>
            <LinkCalc className="cta">Calcular ahora</LinkCalc>
          </div>
        </div>
      </section>

      <section id="lista">
        <div className="wrap">
          <div className="email-box">
            <FondoImagen src="/assets/bg-email.webp" overlay={0.55} />
            <h2>Únete a la lista <span>CTG</span></h2>
            <p className="lead lead-centrado">
              La Guía de Definición CTG sale el 31 de agosto. Apúntate ahora y sé el primero en acceder.
            </p>
            <MailerLiteForm />
          </div>
        </div>
      </section>

      <section id="sobre">
        <div className="wrap sobre">
          {fotoOk ? (
            <img
              className="foto-img"
              src="/assets/christian-1.jpg"
              alt="Christian, creador de CTG Fit"
              onError={() => setFotoOk(false)}
            />
          ) : (
            <div className="foto" aria-hidden="true">CTG FIT</div>
          )}
          <div>
            <h2>Sobre <span>mí</span></h2>
            <p className="lead sobre-lead">
              Soy Christian. Llevo años obsesionado con el entrenamiento y la nutrición,
              y decidí documentar todo mi proceso en redes: lo que funciona, lo que no, y los números
              reales detrás.
            </p>
            <p className="sobre-txt">
              CTG Fit nace de una idea simple: en fitness sobra ruido y falta claridad. Aquí
              encontrarás lo segundo.
            </p>
            <p className="sobre-cta">
              <a className="cta" href="https://www.tiktok.com/@ctg.fit" target="_blank" rel="noopener noreferrer">
                Sígueme en TikTok
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="foot-disclaimer">
            La información de CTG Fit tiene fines educativos e informativos y no sustituye el
            consejo de un médico o nutricionista titulado. Consulta con un profesional antes de
            empezar cualquier plan de dieta o entrenamiento. Los resultados de la calculadora son
            estimaciones.
          </p>
        </div>
        <div className="foot-in">
          <span>© 2026 CTG FIT</span>
          <span>
            <a href="https://www.tiktok.com/@ctg.fit" target="_blank" rel="noopener noreferrer">TikTok</a>
            {' · '}
            <a href="mailto:ctgfit.contacto@gmail.com">Contacto</a>
            {' · '}
            <a href="/legal" onClick={(e) => { e.preventDefault(); navegar('/legal') }}>
              Aviso legal y privacidad
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
