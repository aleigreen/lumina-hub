import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const config = { api: { bodyParser: false } }

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = 'aleishavg@gmail.com'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const artist    = formData.get('artist') as string || 'Sin preferencia'
  const name      = formData.get('name') as string
  const email     = formData.get('email') as string
  const phone     = formData.get('phone') as string || '—'
  const zone      = formData.get('zone') as string
  const size      = formData.get('size') as string
  const description = formData.get('description') as string
  const date      = formData.get('date') as string || 'Sin fecha indicada'

  // Collect image attachments
  const attachments: { filename: string; content: Buffer }[] = []

  const zonePhoto = formData.get('zonePhoto') as File | null
  if (zonePhoto && zonePhoto.size > 0) {
    const buf = Buffer.from(await zonePhoto.arrayBuffer())
    attachments.push({ filename: `zona-${zonePhoto.name}`, content: buf })
  }

  const refEntries = formData.getAll('refPhotos') as File[]
  for (let i = 0; i < refEntries.length; i++) {
    const f = refEntries[i]
    if (f && f.size > 0) {
      const buf = Buffer.from(await f.arrayBuffer())
      attachments.push({ filename: `referencia-${i + 1}-${f.name}`, content: buf })
    }
  }

  const subject = `[CITA-WEB] ${artist} / ${name}`

  const html = `
<div style="font-family:monospace;font-size:14px;color:#111;max-width:600px">
  <h2 style="font-size:18px;border-bottom:2px solid #111;padding-bottom:8px;margin-bottom:20px">
    Nueva solicitud de cita — Lumina Sanctum
  </h2>

  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;width:160px">Artista</td><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>${artist}</strong></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Nombre</td><td style="padding:8px 0;border-bottom:1px solid #eee">${name}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee">${email}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Teléfono</td><td style="padding:8px 0;border-bottom:1px solid #eee">${phone}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Zona</td><td style="padding:8px 0;border-bottom:1px solid #eee">${zone}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Tamaño</td><td style="padding:8px 0;border-bottom:1px solid #eee">${size}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Fecha preferida</td><td style="padding:8px 0;border-bottom:1px solid #eee">${date}</td></tr>
  </table>

  <div style="margin-top:24px">
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#666;margin-bottom:8px">Descripción / Idea</div>
    <div style="background:#f5f5f5;padding:16px;white-space:pre-wrap;line-height:1.7">${description}</div>
  </div>

  ${attachments.length > 0 ? `<p style="margin-top:20px;font-size:12px;color:#666">${attachments.length} archivo(s) adjunto(s).</p>` : ''}

  <p style="margin-top:32px;font-size:11px;color:#aaa">Enviado desde luminasanctum.mx</p>
</div>
`

  const { error } = await resend.emails.send({
    from: 'Lumina Sanctum <onboarding@resend.dev>',
    to: TO,
    replyTo: email,
    subject,
    html,
    attachments,
  })

  if (error) {
    console.error('Resend error full:', JSON.stringify(error))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
