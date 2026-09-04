import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Check, Minus, Loader2, Copy, Send } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

const UPI_ID = import.meta.env.VITE_UPI_ID
const UPI_PAYEE_NAME = import.meta.env.VITE_UPI_PAYEE_NAME || 'SIC 2026'

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
  payment_submitted: {
    title: 'Payment submitted — verifying',
    body: 'We\u2019ve received your transaction reference and are cross-checking it. This usually takes a few hours — check back or wait for a confirmation email.',
    tone: 'signal',
  },
  confirmed: {
    title: "You're confirmed for the final round",
    body: 'A copy of this ticket has been sent to your email. Bring it (or this QR code) to check in.',
    tone: 'byte',
  },
  rejected: {
    title: 'Not shortlisted this time',
    body: 'Thanks for submitting — you weren\u2019t selected for the final round this year. We\u2019d love to see you at the exhibition.',
    tone: 'muted',
  },
  failed: {
    title: 'Payment not verified',
    body: 'We couldn\u2019t confirm your last payment reference. Submit it again below, or contact the organizers if you\u2019ve already paid.',
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
  const [txnId, setTxnId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [copied, setCopied] = useState(false)

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

  async function submitProof(e) {
    e.preventDefault()
    if (!txnId.trim()) {
      setSubmitError('Enter the UPI transaction ID / UTR from your payment app.')
      return
    }
    setSubmitting(true)
    setSubmitError('')
    const { error } = await supabase.rpc('submit_payment_proof', {
      p_id: reg.id,
      p_txn_id: txnId.trim(),
    })
    if (error) {
      setSubmitError('Could not submit right now. Please try again.')
      setSubmitting(false)
      return
    }
    await loadReg()
    setSubmitting(false)
  }

  function copyUpiId() {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
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
  const shortId = String(reg.id).slice(0, 8)
  const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=100.00&cu=INR&tn=${encodeURIComponent('SIC26-' + shortId)}`
  const needsPayment = reg.status === 'shortlisted' || reg.status === 'failed'

  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-signal/10 blur-[100px] -z-10" />

      <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${t.bg} ${t.glow}`}>
        {reg.status === 'confirmed' ? (
          <Check size={20} className={t.text} />
        ) : reg.status === 'rejected' ? (
          <Minus size={20} className={t.text} />
        ) : reg.status === 'payment_submitted' ? (
          <Loader2 size={18} className={`${t.text} animate-spin`} />
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
          <Row label="Registration ID" value={`SIC26-${shortId}`} />
          <Row label="Status" value={reg.status} />
          {reg.status === 'confirmed' && (
            <>
              <Row label="Venue" value="HCST Auditorium" />
              <Row label="Date" value="Eve of Innovation Day" />
            </>
          )}
        </div>
      </div>

      {needsPayment && (
        <div className="mt-6 glass rounded-2xl p-6 text-left">
          <p className="text-sm font-medium text-ink mb-4">Scan to pay ₹100</p>

          <div className="flex justify-center py-4 bg-white rounded-xl mb-4">
            <QRCodeSVG value={upiLink} size={160} fgColor="#0A0A18" bgColor="transparent" />
          </div>

          <button
            type="button"
            onClick={copyUpiId}
            className="w-full flex items-center justify-between text-sm font-mono glass rounded-lg px-3 py-2.5 mb-5 hover:border-signal transition-colors"
          >
            <span className="text-muted">UPI ID</span>
            <span className="text-ink flex items-center gap-2">
              {UPI_ID}
              <Copy size={13} className={copied ? 'text-byte' : 'text-muted'} />
            </span>
          </button>

          <p className="text-xs text-muted mb-4">
            After paying, enter the transaction ID / UTR shown in your payment app (GPay, PhonePe, Paytm) so we can verify it.
          </p>

          <form onSubmit={submitProof} className="space-y-3">
            {submitError && <p className="text-xs text-warn">{submitError}</p>}
            <input
              className="input"
              type="text"
              placeholder="e.g. 234567890123"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all disabled:opacity-60"
            >
              <Send size={14} />
              {submitting ? 'Submitting…' : "I've paid — submit for verification"}
            </button>
          </form>
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