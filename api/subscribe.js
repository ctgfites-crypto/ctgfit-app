export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body ?? {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  const apiKey = process.env.MAILERLITE_API_KEY?.trim()
  const groupId = process.env.MAILERLITE_GROUP_ID?.trim() || '193426212975019303'

  if (!apiKey) {
    console.error('subscribe: MAILERLITE_API_KEY no configurado')
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  console.log('subscribe: attempt', { email, groupId })

  try {
    const payload = {
      email,
      groups: [groupId],
    }

    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    const mlBody = await mlRes.json().catch(() => ({}))

    if (!mlRes.ok) {
      console.error('subscribe: mailerlite error', {
        status: mlRes.status,
        body: JSON.stringify(mlBody),
        groupId,
      })
      // Devolver el mensaje real de MailerLite para facilitar debugging
      const detail = mlBody?.message || mlBody?.error || JSON.stringify(mlBody)
      return res.status(mlRes.status).json({ error: 'Error al suscribir', detail })
    }

    console.log('subscribe: ok', { email })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('subscribe: network error', { message: err.message })
    return res.status(500).json({ error: 'Error de red', detail: err.message })
  }
}
