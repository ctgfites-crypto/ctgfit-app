import { useEffect, useState } from 'react'
import Landing from './Landing.jsx'
import Calculadora from './Calculadora.jsx'

export default function App() {
  const [ruta, setRuta] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setRuta(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.title = ruta === '/calculadora'
      ? 'Calculadora de Macros Gratis | CTG Fit'
      : 'CTG FIT — Transforma tu físico sin vueltas'
  }, [ruta])

  return ruta === '/calculadora' ? <Calculadora /> : <Landing />
}
