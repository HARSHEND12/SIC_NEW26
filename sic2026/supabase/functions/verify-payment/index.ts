// Supabase Edge Function: verify-payment
// Verifies Razorpay's HMAC signature server-side before marking a registration
// as confirmed. This is what prevents a spoofed "payment success" from the client.
// Deploy with: supabase functions deploy verify-payment

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function hmacSha256Hex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const {
      registrationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json()

    const expected = await hmacSha256Hex(
      RAZORPAY_KEY_SECRET,
      `${razorpay_order_id}|${razorpay_payment_id}`
    )

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    if (expected !== razorpay_signature) {
      await supabase.from('registrations').update({ status: 'failed' }).eq('id', registrationId)
      return new Response(JSON.stringify({ confirmed: false, error: 'Signature mismatch' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    await supabase
      .from('registrations')
      .update({
        status: 'confirmed',
        razorpay_payment_id,
      })
      .eq('id', registrationId)

    return new Response(JSON.stringify({ confirmed: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ confirmed: false, error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
