import { useEffect, useRef } from 'react'

/*
 * Fade-up al entrar en viewport (patrón AnimatedContent/FadeContent de
 * reactbits.dev, variante JS+CSS sin dependencias). IntersectionObserver +
 * clase CSS; anima transform/opacity, no bloquea el hilo principal.
 */
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('reveal-visible')
      return
    }
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.classList.add('reveal-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
