import { useEffect, useRef, useState } from 'react'
import { track } from '@vercel/analytics'

const ACTIVIDADES = [
  { valor: 1.2, titulo: 'Sedentario', desc: 'Trabajo de oficina, poco o ningún ejercicio' },
  { valor: 1.375, titulo: 'Ligero', desc: 'Ejercicio suave 1-3 días por semana' },
  { valor: 1.55, titulo: 'Moderado', desc: 'Entrenas 3-5 días por semana' },
  { valor: 1.725, titulo: 'Alto', desc: 'Entrenas intenso 6-7 días por semana' },
  { valor: 1.9, titulo: 'Muy alto', desc: 'Entrenamiento diario intenso + trabajo físico' },
]

const OBJETIVOS = [
  { valor: 'definicion', ajuste: -0.15, titulo: 'Definición', desc: 'Perder grasa manteniendo músculo (−15% kcal)' },
  { valor: 'mantenimiento', ajuste: 0, titulo: 'Mantenimiento', desc: 'Mantener tu peso y composición actual' },
  { valor: 'volumen', ajuste: 0.10, titulo: 'Volumen', desc: 'Ganar masa muscular (+10% kcal)' },
]

const CONSEJOS = {
  definicion: [
    { t: 'Prioriza la proteína en cada comida', d: 'Te mantiene saciado y protege tu músculo mientras bajas grasa. Empieza el día fuerte: desayuno con 30-40 g de proteína.' },
    { t: 'No recortes más calorías por tu cuenta', d: 'El −15% ya es suficiente déficit. Si bajas más, perderás músculo y rendimiento. La paciencia gana.' },
    { t: 'Camina más, no solo entrenes', d: '8.000-10.000 pasos al día marcan más diferencia de la que crees. Es el cardio más fácil de mantener.' },
  ],
  mantenimiento: [
    { t: 'Usa esta fase para rendir más', d: 'Con energía de sobra, es el momento de subir pesos en el gym. Apunta tus marcas y supéralas.' },
    { t: 'Pésate 2-3 veces por semana', d: 'Si tu peso se mueve más de ±1 kg en dos semanas, ajusta ±100-150 kcal. Pequeños ajustes, no volantazos.' },
    { t: 'Construye hábitos, no dietas', d: 'Mantenimiento es donde aprendes a comer bien para siempre. Cocina simple, repite lo que funciona.' },
  ],
  volumen: [
    { t: 'Los carbos son tu gasolina', d: 'Concéntralos antes y después de entrenar. Arroz, patata, avena y fruta: simple y efectivo.' },
    { t: 'Gana peso despacio', d: '0,2-0,4% de tu peso por semana. Si subes más rápido, estás ganando grasa, no músculo.' },
    { t: 'El músculo se construye durmiendo', d: '7-9 horas por noche. Sin descanso, el superávit se convierte en grasa en vez de músculo.' },
  ],
}

const LIMITES = {
  edad: { min: 14, max: 99, unidad: 'años' },
  peso: { min: 30, max: 250, unidad: 'kg' },
  altura: { min: 120, max: 230, unidad: 'cm' },
}

const PASOS = ['edad', 'sexo', 'peso', 'altura', 'actividad', 'objetivo']

const TITULOS = {
  edad: '¿Cuántos años tienes?',
  sexo: '¿Cuál es tu sexo?',
  peso: '¿Cuánto pesas?',
  altura: '¿Cuánto mides?',
  actividad: '¿Cuál es tu nivel de actividad?',
  objetivo: '¿Cuál es tu objetivo?',
}

const estadoInicial = { edad: '', sexo: null, peso: '', altura: '', actividad: null, objetivo: null }

function calcular({ edad, sexo, peso, altura, actividad, objetivo }) {
  const p = parseFloat(peso)
  const bmr = 10 * p + 6.25 * parseFloat(altura) - 5 * parseFloat(edad) + (sexo === 'hombre' ? 5 : -161)
  const obj = OBJETIVOS.find((o) => o.valor === objetivo)
  const kcal = Math.round(bmr * actividad * (1 + obj.ajuste))
  const proteina = Math.round(p * 2)
  const grasa = Math.round((kcal * 0.25) / 9)
  const carbos = Math.max(0, Math.round((kcal - proteina * 4 - grasa * 9) / 4))
  return { kcal, proteina, grasa, carbos, obj }
}

/* Contador animado: de 0 al valor final en ~1 s con easing */
function useContador(final, duracion = 1000) {
  const [valor, setValor] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValor(final)
      return
    }
    let raf
    const inicio = performance.now()
    const tick = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValor(Math.round(final * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [final, duracion])
  return valor
}

export default function App() {
  const [paso, setPaso] = useState(0)
  const [direccion, setDireccion] = useState('adelante')
  const [datos, setDatos] = useState(estadoInicial)
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(null)

  const campo = PASOS[paso]

  const set = (clave, valor) => {
    setDatos((d) => ({ ...d, [clave]: valor }))
    setError('')
  }

  const siguiente = () => {
    if (campo in LIMITES) {
      const { min, max, unidad } = LIMITES[campo]
      const v = parseFloat(datos[campo])
      if (isNaN(v) || v < min || v > max) {
        setError(`Introduce un valor entre ${min} y ${max} ${unidad}.`)
        return
      }
    } else if (!datos[campo]) {
      setError('Selecciona una opción para continuar.')
      return
    }
    if (paso === PASOS.length - 1) {
      setResultado(calcular(datos))
      track('calculo_completado', { objetivo: datos.objetivo })
    } else {
      setDireccion('adelante')
      setPaso(paso + 1)
    }
  }

  const atras = () => {
    setDireccion('atras')
    setPaso(paso - 1)
    setError('')
  }

  const recalcular = () => {
    setDatos(estadoInicial)
    setPaso(0)
    setDireccion('adelante')
    setError('')
    setResultado(null)
  }

  return (
    <div className="app">
      <header className="header">
        <span className="brand">CTG Fit</span>
        <h1>Calculadora de Macros</h1>
        {!resultado && <p>Tus calorías y macros en menos de 1 minuto</p>}
      </header>

      {resultado ? (
        <Resultado r={resultado} onReset={recalcular} />
      ) : (
        <>
          <div className="progress" aria-hidden="true">
            {PASOS.map((_, i) => (
              <span key={i} className={i <= paso ? 'done' : ''} />
            ))}
          </div>

          <div className="step-viewport">
            <section className={`step slide-${direccion}`} key={paso}>
              <p className="step-label">Paso {paso + 1} de {PASOS.length}</p>
              <h2>{TITULOS[campo]}</h2>

              {campo in LIMITES && (
                <>
                  <input
                    className="num-input"
                    type="number"
                    inputMode="decimal"
                    autoFocus
                    value={datos[campo]}
                    onChange={(e) => set(campo, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && siguiente()}
                    aria-label={TITULOS[campo]}
                  />
                  <p className="unit">{LIMITES[campo].unidad}</p>
                </>
              )}

              {campo === 'sexo' && (
                <div className="options">
                  {['hombre', 'mujer'].map((s) => (
                    <button
                      key={s}
                      className={`option ${datos.sexo === s ? 'selected' : ''}`}
                      onClick={() => set('sexo', s)}
                    >
                      <span className="opt-title">{s === 'hombre' ? 'Hombre' : 'Mujer'}</span>
                    </button>
                  ))}
                </div>
              )}

              {campo === 'actividad' && (
                <div className="options">
                  {ACTIVIDADES.map((a) => (
                    <button
                      key={a.valor}
                      className={`option ${datos.actividad === a.valor ? 'selected' : ''}`}
                      onClick={() => set('actividad', a.valor)}
                    >
                      <span className="opt-title">{a.titulo}</span>
                      <div className="opt-desc">{a.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {campo === 'objetivo' && (
                <div className="options">
                  {OBJETIVOS.map((o) => (
                    <button
                      key={o.valor}
                      className={`option ${datos.objetivo === o.valor ? 'selected' : ''}`}
                      onClick={() => set('objetivo', o.valor)}
                    >
                      <span className="opt-title">{o.titulo}</span>
                      <div className="opt-desc">{o.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {error && <p className="field-error" role="alert">{error}</p>}
            </section>
          </div>

          <div className="nav">
            {paso > 0 && (
              <button className="btn btn-ghost" onClick={atras}>
                Atrás
              </button>
            )}
            <button className="btn btn-primary" onClick={siguiente}>
              {paso === PASOS.length - 1 ? 'Ver mis macros' : 'Siguiente'}
            </button>
          </div>
        </>
      )}

      <p className="disclaimer">
        Herramienta educativa. No sustituye el consejo de un profesional sanitario o
        dietista-nutricionista.
      </p>
    </div>
  )
}

function Resultado({ r, onReset }) {
  const cardRef = useRef(null)
  const [descargando, setDescargando] = useState(false)

  const kcal = useContador(r.kcal)
  const prot = useContador(r.proteina)
  const gras = useContador(r.grasa)
  const carb = useContador(r.carbos)

  // proporción de calorías de cada macro para las barras
  const pProt = (r.proteina * 4 * 100) / r.kcal
  const pGras = (r.grasa * 9 * 100) / r.kcal
  const pCarb = Math.max(0, 100 - pProt - pGras)

  // equivalencias de proteína: pechuga de pollo (150 g ≈ 35 g) y huevo M (≈ 6 g)
  const pechugas = Math.round((r.proteina / 35) * 2) / 2
  const huevos = Math.round(r.proteina / 6)

  const descargar = async () => {
    if (!cardRef.current || descargando) return
    setDescargando(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 3,
        useCORS: true,
      })
      const enlace = document.createElement('a')
      enlace.download = 'mis-macros-ctgfit.png'
      enlace.href = canvas.toDataURL('image/png')
      enlace.click()
      track('resultado_descargado')
    } catch {
      alert('No se pudo generar la imagen. Haz una captura de pantalla de la tarjeta.')
    } finally {
      setDescargando(false)
    }
  }

  const macros = [
    { nombre: 'Proteína', valor: prot, pct: pProt, why: '2 g por kg de peso: clave para construir y conservar músculo.' },
    { nombre: 'Grasas', valor: gras, pct: pGras, why: 'El 25% de tus calorías: esencial para hormonas y salud general.' },
    { nombre: 'Carbohidratos', valor: carb, pct: pCarb, why: 'El resto de tus calorías: tu combustible para entrenar y rendir.' },
  ]

  return (
    <div className="result-wrap">
      <div className="result-card" ref={cardRef}>
        <div className="card-brand">
          <span className="logo-badge">CTG</span>
          <span className="card-brand-text">Mis macros diarios</span>
        </div>
        <span className="result-goal">Objetivo: {r.obj.titulo}</span>
        <div className="result-kcal">{kcal.toLocaleString('es-ES')}</div>
        <p className="result-kcal-label">kcal al día</p>

        <div className="macros">
          {macros.map((m) => (
            <div className="macro" key={m.nombre}>
              <div className="macro-top">
                <span className="macro-name">{m.nombre}</span>
                <span className="macro-grams">{m.valor}<small>g</small></span>
              </div>
              <div className="macro-bar">
                <span style={{ width: `${m.pct}%` }} />
              </div>
              <p className="macro-why">{m.why}</p>
            </div>
          ))}
        </div>

        {r.kcal < 1200 && (
          <p className="low-kcal-note">
            Tu resultado es muy bajo. Con estos datos, lo más recomendable es que un
            dietista-nutricionista valore tu caso antes de seguir ningún plan.
          </p>
        )}

        <div className="result-handle">
          <span className="logo-badge small">CTG</span>
          @ctg.fit
        </div>
      </div>

      <div className="result-actions">
        <button className="btn btn-primary" onClick={descargar} disabled={descargando}>
          {descargando ? 'Generando…' : 'Descargar mi resultado'}
        </button>
        <a
          className="btn-tiktok"
          href="https://www.tiktok.com/@ctg.fit"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('tiktok_click')}
        >
          Sígueme en TikTok
        </a>
        <button className="btn btn-ghost" onClick={onReset}>
          Recalcular
        </button>
      </div>

      <section className="extra">
        <h2>¿Y ahora qué?</h2>
        <p className="extra-sub">3 claves para tu fase de {r.obj.titulo.toLowerCase()}:</p>
        <ol className="tips">
          {CONSEJOS[r.obj.valor].map((c, i) => (
            <li className="tip" key={i}>
              <span className="tip-num">{i + 1}</span>
              <div>
                <strong>{c.t}</strong>
                <p>{c.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="equiv">
          <p className="equiv-title">Tu proteína diaria ({r.proteina} g) equivale a:</p>
          <div className="equiv-items">
            <div className="equiv-item">
              <span className="equiv-num">{pechugas.toLocaleString('es-ES')}</span>
              <span className="equiv-label">pechugas de pollo (150 g)</span>
            </div>
            <span className="equiv-or">o</span>
            <div className="equiv-item">
              <span className="equiv-num">{huevos}</span>
              <span className="equiv-label">huevos M</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
