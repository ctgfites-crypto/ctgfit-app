export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body ?? {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  const apiKey = process.env.MAILERLITE_API_KEY?.trim()
  const groupId = (process.env.MAILERLITE_GROUP_ID?.trim() || '193426212975019303').replace(/['"]/g, '')

  if (!apiKey) {
    console.error('subscribe: MAILERLITE_API_KEY no configurado')
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }

  try {
    // Paso 1: crear o actualizar subscriber
    const r1 = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email }),
    })

    if (!r1.ok) {
      const text = await r1.text()
      console.error('subscribe: error creando subscriber', { status: r1.status, body: text })
      return res.status(r1.status).json({ error: 'Error al suscribir' })
    }

    const data = await r1.json()
    const subscriberId = data?.data?.id
    console.log('subscribe: subscriber ok', { email, subscriberId })

    // Paso 2: asignar al grupo (best-effort, no bloquea el 200)
    if (subscriberId && groupId) {
      fetch(
        `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ groups: [groupId] }),
        }
      ).then(async (r2) => {
        if (!r2.ok) {
          const t2 = await r2.text()
          console.error('subscribe: error asignando grupo', { status: r2.status, body: t2 })
        }
      }).catch((err) => {
        console.error('subscribe: error red grupo', { message: err.message })
      })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('subscribe: network error', { message: err.message })
    return res.status(500).json({ error: 'Error de red' })
  }
}
