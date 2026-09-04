import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Check, Minus, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const statusCopy = {
  submitted: {
    title: 'Registration received',
    body: 'Our team is reviewing submissions. If you\u2019re shortlisted for the final round, we\u2019ll email you a payment link to confirm your spot.',
    tone: 'signal',
  },
  shortlisted: {
    title: "You're shortlisted",
    body: 'Congratulations — you\u2019ve been selected for the final round. Pay the ₹100 confirmation fee below to lock in your spot.',
    tone: 'signal',
  },
  confirmed: {
    title: "You're confirmed for the final round",
    body: 'A copy of this ticket has been sent to your email. Bring it (or this QR code) to check in.',
    tone: 'byte',
  },
  rejected: {
    title: 'Not shortlisted this time',
    body: 'Thanks for submitting — you weren\u2019t selected for the final round this year. We\u2019d love to see you next time!',
    tone: 'muted',
  },
  failed: {
    title: 'Payment did not go through',
    body: 'Your shortlist spot is still held. Try the payment again below.',
    tone: 'warn',
  },
}

const toneClasses = {
  signal: { bg: 'bg-signal-tint', text: 'text-signal-dark', glow: 'shadow-glow-soft' },
  byte: { bg: 'bg-byte-tint', text: 'text-byte', glow: 'shadow-glow-cyan' },
  warn: { bg: 'bg-warn-tint', text: 'text-warn', glow: '' },
  muted: { bg: 'bg-surface', text: 'text-muted', glow: '' },
}

export default function Ticket() {
  const { ticketId } = useParams()
  const [reg, setReg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')

  async function loadReg() {
    const { data, error } = await supabase.rpc('get_registration', { p_id: ticketId })
    const row = data?.[0]
    if (error || !row) setError('Could not find that ticket.')
    else setReg(row)
    setLoading(false)
  }

  useEffect(() => {
    loadReg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId])

  async function payNow() {
    setPaying(true)
    setPayError('')
    try {
      const { data: order, error: fnError } = await supabase.functions.invoke('create-order', {
        body: { registrationId: reg.id },
      })
      if (fnError) throw fnError

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) throw new Error('Could not load payment gateway. Check your connection.')

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'SIC 2026 — HCST',
        description: 'Final round confirmation fee',
        order_id: order.orderId,
        prefill: { name: reg.full_name, email: reg.email, contact: reg.phone },
        theme: { color: '#8B5CF6' },
        handler: async function (response) {
          const { data: verified, error: verifyError } = await supabase.functions.invoke(
            'verify-payment',
            {
              body: {
                registrationId: reg.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            }
          )
          if (verifyError || !verified?.confirmed) {
            setPayError('Payment could not be verified. Contact the organizers with your registration ID.')
            setPaying(false)
            return
          }
          await loadReg()
          setPaying(false)
        },
        modal: { ondismiss: () => setPaying(false) },
      })
      rzp.open()
    } catch (err) {
      setPayError(err.message || 'Something went wrong. Please try again.')
      setPaying(false)
    }
  }

  if (loading)
    return (
      <div className="max-w-md mx-auto px-6 py-24 flex flex-col items-center gap-3 text-muted">
        <Loader2 size={22} className="animate-spin text-signal" />
        Loading…
      </div>
    )
  if (error || !reg) return <div className="max-w-md mx-auto px-6 py-20 text-center text-warn">{error}</div>

  const copy = statusCopy[reg.status] || statusCopy.submitted
  const t = toneClasses[copy.tone]

  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-signal/10 blur-[100px] -z-10" />

      <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${t.bg} ${t.glow}`}>
        {reg.status === 'confirmed' ? (
          <Check size={20} className={t.text} />
        ) : reg.status === 'rejected' ? (
          <Minus size={20} className={t.text} />
        ) : (
          <span className={`text-lg ${t.text}`}>…</span>
        )}
      </div>
      <h1 className="font-display text-2xl mb-1">{copy.title}</h1>
      <p className="text-sm text-muted mb-8">{copy.body}</p>

      <div className="glass rounded-2xl p-6 text-left">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="font-medium text-ink">{reg.full_name}</p>
            <p className="text-xs text-muted">{reg.department}, {reg.year}</p>
            <p className="text-xs text-muted">{reg.college_name}</p>
          </div>
          <span className="text-xs font-mono bg-signal-tint text-signal-dark px-3 py-1 rounded-full">
            {reg.track}
          </span>
        </div>

        {reg.status === 'confirmed' && (
          <div className="flex justify-center py-4 bg-white rounded-xl">
            <QRCodeSVG value={`SIC26-${reg.id}`} size={140} fgColor="#0A0A18" bgColor="transparent" />
          </div>
        )}

        <div className="border-t border-rule pt-4 mt-2 text-sm font-mono space-y-1.5">
          <Row label="Registration ID" value={`SIC26-${String(reg.id).slice(0, 8)}`} />
          <Row label="Status" value={reg.status} />
          {reg.status === 'confirmed' && (
            <>
              <Row label="Venue" value="HCST Auditorium" />
              <Row label="Date" value="Eve of Innovation Day" />
            </>
          )}
        </div>
      </div>

      {(reg.status === 'shortlisted' || reg.status === 'failed') && (
        <div className="mt-6">
          {payError && (
            <p className="text-sm text-warn bg-warn-tint px-4 py-3 rounded-lg mb-4">{payError}</p>
          )}
          <button
            onClick={payNow}
            disabled={paying}
            className="w-full py-3.5 rounded-lg text-sm font-medium text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all disabled:opacity-60"
          >
            {paying ? 'Processing…' : 'Pay ₹100 to confirm your spot'}
          </button>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  )
}