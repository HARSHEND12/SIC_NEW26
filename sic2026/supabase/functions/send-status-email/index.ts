// Supabase Edge Function: send-status-email
// Sends a templated email via Resend whenever a registration is created or its
// status changes (shortlisted, confirmed, rejected). Called from the frontend
// right after the relevant Supabase write — it never blocks that write on success.
// Deploy with: supabase functions deploy send-status-email
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
// Use your own verified domain once you have one (e.g. no-reply@sic2026.in).
// onboarding@resend.dev works out of the box for testing, but only delivers to
// the email address you signed up to Resend with — swap it before going live.
const FROM_ADDRESS = Deno.env.get('RESEND_FROM_ADDRESS') || 'SIC 2026 <onboarding@resend.dev>'
const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:5173'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function templateFor(status: string, name: string, ticketUrl: string) {
  const templates: Record<string, { subject: string; html: string }> = {
    submitted: {
      subject: 'SIC 2026 — registration received',
      html: `<p>Hi ${name},</p>
        <p>Your registration for the Student Innovation Conference 2026 has been received. Our team will review submissions and let you know if you're shortlisted for the final round.</p>
        <p>Save this link to check your status any time:</p>
        <p><a href="${ticketUrl}">${ticketUrl}</a></p>
        <p>— Byte and Qbit clubs, HCST</p>`,
    },
    shortlisted: {
      subject: "You're shortlisted for SIC 2026",
      html: `<p>Hi ${name},</p>
        <p>Congratulations — you've been shortlisted for the final round of the Student Innovation Conference 2026, held in college.</p>
        <p>A ₹100 confirmation fee is required to lock in your spot. Pay here:</p>
        <p><a href="${ticketUrl}">${ticketUrl}</a></p>
        <p>— Byte and Qbit clubs, HCST</p>`,
    },
    confirmed: {
      subject: 'Your SIC 2026 ticket is confirmed',
      html: `<p>Hi ${name},</p>
        <p>Payment received — you're confirmed for the final round. Your ticket and QR code are here:</p>
        <p><a href="${ticketUrl}">${ticketUrl}</a></p>
        <p>See you there — Byte and Qbit clubs, HCST</p>`,
    },
    rejected: {
      subject: 'SIC 2026 — final round update',
      html: `<p>Hi ${name},</p>
        <p>Thanks for submitting to the Student Innovation Conference 2026. This year you weren't selected for the final round — we'd still love to see you at the exhibition.</p>
        <p>— Byte and Qbit clubs, HCST</p>`,
    },
  }
  return templates[status]
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, fullName, status, registrationId } = await req.json()
    if (!email || !status || !registrationId) throw new Error('email, status, and registrationId are required')

    const template = templateFor(status, fullName || 'there', `${SITE_URL}/ticket/${registrationId}`)
    if (!template) {
      // Statuses like "failed" don't get an email — not an error, just nothing to send.
      return new Response(JSON.stringify({ sent: false, reason: 'no template for status' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: email,
        subject: template.subject,
        html: template.html,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Resend error: ${body}`)
    }

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    // Email failures should never break registration or shortlisting — log and
    // return 200-ish info rather than surfacing a hard error to the caller.
    return new Response(JSON.stringify({ sent: false, error: err.message }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})