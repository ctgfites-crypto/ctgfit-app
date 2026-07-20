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

  console.log('subscribe: attempt', { email, groupId, groupIdLen: groupId.length })

  try {
    // Paso 1: crear/actualizar subscriber
    // El group ID de MailerLite v2 es un entero de 64-bit (> MAX_SAFE_INTEGER).
    // Usamos string concat para evitar pérdida de precisión en JSON.stringify.
    const emailSafe = JSON.stringify(email)
    const rawBody = `{"email":${emailSafe},"groups":[${groupId}]}`

    console.log('subscribe: rawBody', rawBody)

    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: rawBody,
    })

    const mlText = await mlRes.text()
    let mlBody = {}
    try { mlBody = JSON.parse(mlText) } catch (_) { mlBody = { raw: mlText } }

    console.log('subscribe: mailerlite response', { status: mlRes.status, body: mlText })

    if (!mlRes.ok) {
      const detail = mlBody?.message || mlBody?.error || mlText
      return res.status(mlRes.status).json({ error: 'Error al suscribir', detail })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('subscribe: network error', { message: err.message })
    return res.status(500).json({ error: 'Error de red', detail: err.message })
  }
}
