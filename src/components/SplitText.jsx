/*
 * Animación de titular por palabras (adaptado del patrón SplitText de
 * reactbits.dev, variante JS+CSS sin dependencias). Cada palabra entra con
 * un pequeño desplazamiento y stagger; solo CSS transforms, no bloquea.
 */
export default function SplitText({ texto, className = '', delayBase = 0, acento = false }) {
  const palabras = texto.split(' ')
  return (
    <span className={`split-text ${acento ? 'split-acento' : ''} ${className}`}>
      {palabras.map((p, i) => (
        <span className="split-clip" key={i}>
          <span className="split-palabra" style={{ animationDelay: `${delayBase + i * 70}ms` }}>
            {p}
            {i < palabras.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </span>
  )
}
