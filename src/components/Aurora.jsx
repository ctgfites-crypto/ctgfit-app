import { useEffect, useRef } from 'react'

/*
 * Aurora oscura con acentos lima (adaptado del patrón Aurora de reactbits.dev,
 * variante JS+CSS sin dependencias). Canvas a baja resolución + blur CSS:
 * coste mínimo. Se pausa con la pestaña oculta y respeta prefers-reduced-motion.
 */
export default function Aurora() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    const W = (canvas.width = 240)
    const H = (canvas.height = 140)

    const blobs = [
      { x: 0.2, y: 0.75, r: 90, vx: 0.0012, vy: 0.0008, a: 0.5, f: 0 },
      { x: 0.75, y: 0.35, r: 70, vx: -0.0009, vy: 0.0011, a: 0.35, f: 2 },
      { x: 0.55, y: 0.85, r: 60, vx: 0.0007, vy: -0.0009, a: 0.28, f: 4 },
    ]

    let raf
    let t = 0
    const dibujar = () => {
      t += 1
      ctx.clearRect(0, 0, W, H)
      for (const b of blobs) {
        const x = (b.x + Math.sin(t * b.vx * 10 + b.f) * 0.12) * W
        const y = (b.y + Math.cos(t * b.vy * 10 + b.f) * 0.1) * H
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r)
        g.addColorStop(0, `rgba(200, 245, 66, ${b.a * 0.16})`)
        g.addColorStop(1, 'rgba(200, 245, 66, 0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }
      raf = requestAnimationFrame(dibujar)
    }

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(dibujar)
    }
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(dibujar)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="aurora" aria-hidden="true" />
}
