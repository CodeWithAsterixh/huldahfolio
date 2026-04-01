import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' })
  }

  try {
    const { subject, html, mailTo } = req.body

    if (!subject || !html || !mailTo) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })

    await transporter.sendMail({
      from: (() => {
        const fromEnv = process.env.VITE_FROM_EMAIL || process.env.SMTP_USER;
        if (!fromEnv) {
          throw new Error('Mail configuration error: sender email is not set');
        }
        return fromEnv;
      })(),
      to: mailTo,
      subject,
      html, // Pass HTML string here
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error sending mail:', err)
    return res.status(500).json({ ok: false, error: String(err) })
  }
}
