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
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }

  // Paso 1 — crear o actualizar subscriber (sin grupo, para aislar)
  let subscriberId = null
  try {
    const body1 = JSON.stringify({ email })
    const r1 = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST', headers, body: body1,
    })
    const t1 = await r1.text()
    console.log('subscribe step1', { status: r1.status, body: t1 })

    if (!r1.ok) {
      let d = {}
      try { d = JSON.parse(t1) } catch (_) {}
      return res.status(r1.status).json({
        error: 'Error al suscribir',
        detail: d?.message || t1,
        debug_sent: body1,
      })
    }

    const d1 = JSON.parse(t1)
    subscriberId = d1?.data?.id
  } catch (err) {
    return res.status(500).json({ error: 'Error de red', detail: err.message })
  }

  // Paso 2 — añadir al grupo usando ID de subscriber
  if (subscriberId && groupId) {
    try {
      const r2 = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups`,
        { method: 'POST', headers, body: JSON.stringify({ groups: [groupId] }) }
      )
      const t2 = await r2.text()
      console.log('subscribe step2', { status: r2.status, body: t2 })
    } catch (_) {}
  }

  return res.status(200).json({ ok: true })
}
