import { useEffect, useState } from 'react'
import Landing from './Landing.jsx'
import Calculadora from './Calculadora.jsx'
import Legal from './Legal.jsx'
import Guia from './Guia.jsx'
import Gracias from './Gracias.jsx'

export default function App() {
  const [ruta, setRuta] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setRuta(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const meta = {
      '/calculadora': {
        titulo: 'Calculadora de Macros Gratis | CTG Fit',
        desc: 'Calcula tus calorías y macros gratis en menos de 1 minuto según tu objetivo: definición, mantenimiento o volumen.',
      },
      '/legal': {
        titulo: 'Aviso legal y privacidad | CTG Fit',
        desc: 'Aviso legal, política de privacidad y protección de datos (RGPD) de CTG Fit.',
      },
      '/guia': {
        titulo: 'Guía de Definición CTG Fit — 8 capítulos sin rodeos',
        desc: 'La guía completa para definir sin perder músculo: macros, entrenamiento, ajustes y plantillas. PDF descargable.',
      },
      '/gracias': {
        titulo: 'Apuntado — CTG FIT',
        desc: 'Estás en la lista. Te avisamos cuando la Guía de Definición CTG esté disponible.',
      },
    }[ruta] || {
      titulo: 'CTG FIT — Transforma tu físico sin vueltas',
      desc: 'Entrenamiento y nutrición sin humo, documentado con datos reales. Guías, plan y calculadora de macros gratis.',
    }
    document.title = meta.titulo
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.desc)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.titulo)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.desc)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://ctgfit.es${ruta}`)
  }, [ruta])

  if (ruta === '/calculadora') return <Calculadora />
  if (ruta === '/legal') return <Legal />
  if (ruta === '/guia') return <Guia />
  if (ruta === '/gracias') return <Gracias />
  return <Landing />
}
