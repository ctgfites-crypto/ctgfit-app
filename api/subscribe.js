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
    const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, groups: [groupId] }),
    })

    const data = await r.json()

    if (!r.ok) {
      console.error('subscribe: error', { status: r.status, body: JSON.stringify(data) })
      return res.status(r.status).json({ error: 'Error al suscribir' })
    }

    console.log('subscribe: ok', { email, id: data?.data?.id, groups: data?.data?.groups })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('subscribe: network error', { message: err.message })
    return res.status(500).json({ error: 'Error de red' })
  }
}
