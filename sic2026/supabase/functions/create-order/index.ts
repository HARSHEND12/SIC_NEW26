// Supabase Edge Function: create-order
// Creates a Razorpay order server-side so the amount can never be tampered with
// from the browser. Deploy with: supabase functions deploy create-order

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID')!
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { registrationId } = await req.json()
    if (!registrationId) throw new Error('registrationId is required')

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const { data: reg, error } = await supabase
      .from('registrations')
      .select('id, amount, status')
      .eq('id', registrationId)
      .single()
    if (error || !reg) throw new Error('Registration not found')
    if (reg.status !== 'shortlisted' && reg.status !== 'failed')
      throw new Error('This registration is not eligible for payment yet')

    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: reg.amount, // paise, decided server-side from the DB row, not the client
        currency: 'INR',
        receipt: reg.id,
      }),
    })
    const order = await rzpRes.json()
    if (!rzpRes.ok) throw new Error(order.error?.description || 'Razorpay order creation failed')

    await supabase
      .from('registrations')
      .update({ razorpay_order_id: order.id })
      .eq('id', registrationId)

    return new Response(
      JSON.stringify({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: RAZORPAY_KEY_ID,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
