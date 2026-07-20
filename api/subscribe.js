export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body ?? {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  const apiKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_GROUP_ID

  if (!apiKey) {
    console.error('email_submit_error: MAILERLITE_API_KEY no configurado')
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  console.log('email_submit_attempt', { email })

  try {
    const body = { email }
    if (groupId) body.groups = [groupId]

    const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    if (!r.ok) {
      const text = await r.text()
      console.error('email_submit_error', { status: r.status, body: text })
      return res.status(r.status).json({ error: 'Error al suscribir' })
    }

    console.log('email_submit_success', { email })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('email_submit_error', { message: err.message })
    return res.status(500).json({ error: 'Error de red' })
  }
}
