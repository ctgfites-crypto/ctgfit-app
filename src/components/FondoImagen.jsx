import { useEffect, useState } from 'react'

/*
 * Fondo de sección con imagen lazy + overlay oscuro.
 * Comprueba primero que el archivo existe (los .webp los sube el usuario a
 * /assets); si no está, no se renderiza nada y queda el fondo sólido actual
 * como placeholder. La comprobación usa un Image() sin insertar en el DOM.
 */
export default function FondoImagen({ src, overlay = 0.6 }) {
  const [existe, setExiste] = useState(false)

  useEffect(() => {
    let vivo = true
    const img = new Image()
    img.onload = () => vivo && setExiste(true)
    img.onerror = () => vivo && setExiste(false)
    img.src = src
    return () => { vivo = false }
  }, [src])

  if (!existe) return null
  return (
    <div className="fondo-imagen" aria-hidden="true">
      <img src={src} alt="" loading="lazy" decoding="async" />
      <span style={{ background: `rgba(0, 0, 0, ${overlay})` }} />
    </div>
  )
}
