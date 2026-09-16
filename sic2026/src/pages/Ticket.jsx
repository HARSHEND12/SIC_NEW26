import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Check, Minus, Loader2, ArrowRight } from 'lucide-react'
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
    label: 'UNDER REVIEW',
    title: 'Registration received',
    body: 'The organising committee is reviewing submissions. If you are shortlisted for the final round, you will receive an email with a link to confirm your place.',
  },
  shortlisted: {
    label: 'ACTION REQUIRED',
    title: 'You have been shortlisted',
    body: 'Congratulations — your submission has been selected for the final round. Pay the ₹100 confirmation fee below to secure your place.',
  },
  confirmed: {
    label: 'CONFIRMED',
    title: 'Your place is confirmed',
    body: 'A copy of this ticket has been sent to your email. Present this QR code at the registration desk to check in.',
  },
  rejected: {
    label: 'NOT SELECTED',
    title: 'Not shortlisted this year',
    body: 'Thank you for submitting to NEXORA 2026. Your work was not selected for the final round this time — we would still be glad to see you at the exhibition.',
  },
  failed: {
    label: 'PAYMENT FAILED',
    title: 'Payment did not go through',
    body: 'Your place is still held. You can retry the payment below.',
  },
}

export default function Ticket() {
  const { ticketId } = useParams()
  const location = useLocation()
  const [reg, setReg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')
  const [showEmailWarning, setShowEmailWarning] = useState(location.state?.emailSent === false)

  async function loadReg() {
    const { data, error } = await supabase.rpc('get_registration', { p_id: ticketId })
    const row = data?.[0]
    if (error || !row) setError('Could not find that registration.')
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
      const ok = await loadRazorpayScript()
      if (!ok) throw new Error('Could not load the payment gateway. Check your connection.')

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'NEXORA 2026 — HCST',
        description: 'Final round confirmation fee',
        order_id: order.orderId,
        prefill: { name: reg.full_name, email: reg.email, contact: reg.phone },
        theme: { color: '#6366F1' },
        handler: async function (response) {
          const { data: verified, error: verifyError } = await supabase.functions.invoke('verify-payment', {
            body: {
              registrationId: reg.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
          })
          if (verifyError || !verified?.confirmed) {
            setPayError('Payment could not be verified. Contact the organisers with your registration ID.')
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
      <div className="max-w-xl mx-auto px-6 py-32 flex flex-col items-center gap-3 text-muted">
        <Loader2 size={20} className="animate-spin text-signal" />
        <span className="text-sm">Loading…</span>
      </div>
    )

  if (error || !reg)
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <p className="font-display text-3xl mb-3">Registration not found</p>
        <p className="text-muted text-sm mb-8">{error}</p>
        <Link to="/status" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rule text-sm hover:border-signal transition-colors">
          Look up by email <ArrowRight size={14} />
        </Link>
      </div>
    )

  const copy = statusCopy[reg.status] || statusCopy.submitted
  const isConfirmed = reg.status === 'confirmed'
  const canPay = reg.status === 'shortlisted' || reg.status === 'failed'

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs text-signal-dark mb-4">{copy.label}</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-4">{copy.title}</h1>
        <p className="text-muted leading-relaxed mb-10">{copy.body}</p>
      </motion.div>

      {showEmailWarning && (
        <div className="text-sm text-warn bg-warn-tint px-5 py-4 rounded-xl mb-8 flex items-start justify-between gap-4">
          <span>
            We could not email you a confirmation. <strong>Bookmark this page</strong> — it is
            how you check your status later.
          </span>
          <button onClick={() => setShowEmailWarning(false)} className="shrink-0 opacity-70 hover:opacity-100">✕</button>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-rule bg-surface overflow-hidden"
      >
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="min-w-0">
              <p className="font-display text-2xl text-ink truncate">{reg.full_name}</p>
              <p className="text-sm text-muted mt-1">{reg.department} · {reg.year}</p>
              <p className="text-sm text-muted">{reg.college_name}</p>
            </div>
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
              isConfirmed ? 'bg-byte-tint text-byte' : reg.status === 'rejected' ? 'bg-surface text-muted border border-rule' : 'bg-signal-tint text-signal-dark'
            }`}>
              {isConfirmed ? <Check size={18} /> : reg.status === 'rejected' ? <Minus size={18} /> : <span className="text-base">·</span>}
            </div>
          </div>

          {isConfirmed && (
            <div className="flex justify-center py-8 bg-white rounded-2xl mb-8">
              <QRCodeSVG value={`NEXORA26-${reg.id}`} size={150} fgColor="#0B0D14" bgColor="transparent" />
            </div>
          )}

          <dl className="space-y-3 text-sm font-mono">
            <Row label="Registration ID" value={`NX26-${String(reg.id).slice(0, 8).toUpperCase()}`} />
            <Row label="Track" value={reg.track} />
            <Row label="Status" value={reg.status} />
            {isConfirmed && (
              <>
                <Row label="Venue" value="HCST Auditorium" />
                <Row label="Date" value="Eve of Innovation Day" />
              </>
            )}
          </dl>
        </div>

        {canPay && (
          <div className="border-t border-rule p-8 sm:p-10 bg-signal-tint/20">
            {payError && <p className="text-sm text-warn bg-warn-tint px-5 py-4 rounded-xl mb-5">{payError}</p>}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl text-ink">₹100</p>
                <p className="text-xs text-muted mt-0.5">Final round confirmation fee</p>
              </div>
              <button
                onClick={payNow}
                disabled={paying}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-signal hover:text-white transition-colors disabled:opacity-60"
              >
                {paying ? 'Processing…' : 'Pay and confirm'}
                {!paying && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-rule pb-3 last:border-b-0">
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink text-right truncate">{value}</dd>
    </div>
  )
}