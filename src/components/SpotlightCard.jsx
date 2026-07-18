import { useRef } from 'react'

/*
 * Tarjeta con brillo que sigue el cursor (adaptado del patrón SpotlightCard de
 * reactbits.dev, variante JS+CSS). En táctil no hay hover: el efecto
 * simplemente no se activa y no cuesta nada.
 */
export default function SpotlightCard({ className = '', children }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} className={`spotlight ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  )
}
