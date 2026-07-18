import { useEffect, useRef, useState } from 'react'

/*
 * Contador animado (patrón CountUp de reactbits.dev, variante JS sin
 * dependencias). Arranca cuando el elemento entra en el viewport.
 * Listo para cuando se añadan métricas (seguidores, cálculos hechos, etc.):
 *   <CountUp final={12500} sufijo="+" />
 */
export default function CountUp({ final, duracion = 1200, sufijo = '', prefijo = '' }) {
  const ref = useRef(null)
  const [valor, setValor] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValor(final)
      return
    }
    let raf
    const obs = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      obs.disconnect()
      const inicio = performance.now()
      const tick = (ahora) => {
        const t = Math.min((ahora - inicio) / duracion, 1)
        setValor(Math.round(final * (1 - Math.pow(1 - t, 3))))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
  }, [final, duracion])

  return (
    <span ref={ref} className="countup">
      {prefijo}{valor.toLocaleString('es-ES')}{sufijo}
    </span>
  )
}
