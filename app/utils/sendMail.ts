export async function sendMail({ subject, html, mailTo }: { subject: string; html: string; mailTo: string }) {
  try {
    const res = await fetch(import.meta.env.VITE_BASE_URL + '/api/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subject, html, mailTo })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { ok: false, error: data?.error || 'Failed to send email' };
    }

    return { ok: true };
  } catch (err) {
    console.error('Error sending mail via API:', err);
    return { ok: false, error: String(err) };
  }
}
