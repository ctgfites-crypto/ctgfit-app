import { useState } from 'react'
import { navegar } from './router.js'
import './landing.css'

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

  return (
    <div className="landing">
      <nav>
        <div className="nav-in">
          <a href="/" aria-label="CTG Fit — inicio">
            <img className="nav-logo" src="/assets/logo-horizontal.png" alt="CTG FIT" />
          </a>
          <div className="nav-links">
            <a href="#plan">El plan</a>
            <a href="#recursos">Recursos</a>
            <LinkCalc>Calculadora</LinkCalc>
            <a href="#sobre">Sobre mí</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">Fitness sin humo · Documentado con datos reales</p>
          <h1>Transforma tu físico<br /><em>sin vueltas.</em></h1>
          <p className="sub">
            Entrenamiento y nutrición explicados como me hubiese gustado que me los explicaran a mí.
            Sin milagros, sin dietas imposibles: método, datos y mi propio proceso como prueba.
          </p>
          <a className="cta" href="#recursos">Empieza gratis</a>
          <a className="cta-ghost" href="https://www.tiktok.com/@ctg.fit" target="_blank" rel="noopener noreferrer">
            Ver mi contenido →
          </a>
        </div>
      </header>

      <section id="plan">
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
            <div className="prod">
              <span className="badge">Gratis</span>
              <h3>Calculadora de macros</h3>
              <p>Tus calorías y macros en 30 segundos, según tu objetivo: definición, volumen o mantenimiento.</p>
              <LinkCalc className="mini">Ir a la calculadora →</LinkCalc>
            </div>
            <div className="prod destacado">
              <span className="badge">Próximamente</span>
              <h3>Guía de definición CTG</h3>
              <p>El sistema completo que uso yo: cómo calcular, qué comer, cómo entrenar y cómo ajustar semana a semana. Paso a paso.</p>
              <a className="mini" href="#lista">Apúntate a la lista →</a>
            </div>
            <div className="prod">
              <span className="badge gris">En desarrollo</span>
              <h3>Plantillas de entreno</h3>
              <p>Rutinas estructuradas con progresión incluida, para gym completo o material básico.</p>
              <a className="mini" href="#lista">Avísame cuando salga →</a>
            </div>
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
            <h2>Únete a la lista <span>CTG</span></h2>
            <p className="lead lead-centrado">
              Un email a la semana con lo mejor: un consejo aplicable, mi progreso real y acceso
              anticipado a las guías cuando salgan.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('¡Gracias! Te avisaré pronto 💪') }}>
              <input type="email" placeholder="tu@email.com" required aria-label="Tu email" />
              <button type="submit">Apuntarme</button>
              <label className="rgpd">
                <input type="checkbox" required />
                <span>
                  Acepto la{' '}
                  <a href="/legal" onClick={(e) => { e.preventDefault(); navegar('/legal') }}>
                    política de privacidad
                  </a>
                </span>
              </label>
            </form>
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
