import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Check, LogIn, ScanLine, Search, AlertTriangle } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

export default function Checkin() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [scanning, setScanning] = useState(false)
  const [manualId, setManualId] = useState('')
  const [reg, setReg] = useState(null)
  const [lookupError, setLookupError] = useState('')
  const [marking, setMarking] = useState(false)
  const html5QrRef = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    return () => { if (html5QrRef.current) html5QrRef.current.stop().catch(() => {}) }
  }, [])

  async function handleLogin(e) {
    e.preventDefault()
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  function extractId(text) {
    return text.replace(/^SIC26-/, '').trim()
  }

  async function lookup(id) {
    setLookupError('')
    setReg(null)
    const { data, error } = await supabase.rpc('get_registration', { p_id: id })
    const row = data?.[0]
    if (error || !row) {
      setLookupError('No registration found for that ID.')
      return
    }
    setReg(row)
  }

  async function startScanner() {
    setScanning(true)
    setReg(null)
    setLookupError('')
    await new Promise((r) => setTimeout(r, 50)) // let the div mount before attaching the camera
    const qr = new Html5Qrcode('qr-reader')
    html5QrRef.current = qr
    try {
      await qr.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 240 },
        async (decodedText) => {
          await stopScanner()
          lookup(extractId(decodedText))
        },
        () => {} // ignore per-frame "no QR found" noise
      )
    } catch {
      setLookupError('Could not access camera. Use manual entry below instead.')
      setScanning(false)
    }
  }

  async function stopScanner() {
    if (html5QrRef.current) {
      try {
        await html5QrRef.current.stop()
        html5QrRef.current.clear()
      } catch {}
    }
    setScanning(false)
  }

  async function markAttended() {
    setMarking(true)
    const now = new Date().toISOString()
    const { error } = await supabase.from('registrations').update({ checked_in_at: now }).eq('id', reg.id)
    if (!error) setReg({ ...reg, checked_in_at: now })
    setMarking(false)
  }

  function reset() {
    setReg(null)
    setLookupError('')
    setManualId('')
  }

  if (!session) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24">
        <div className="glass rounded-2xl p-7">
          <h1 className="font-display text-2xl mb-6">
            Volunteer <span className="gradient-text">check-in</span>
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {authError && <p className="text-xs text-warn">{authError}</p>}
            <button className="w-full inline-flex items-center justify-center gap-2 text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet py-2.5 rounded-lg text-sm font-medium transition-all">
              <LogIn size={15} />
              Sign in
            </button>
          </form>
        </div>
        <p className="text-xs text-muted mt-4 text-center">Uses the same organizer account as /admin.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="font-display text-2xl mb-1">
        Event <span className="gradient-text">check-in</span>
      </h1>
      <p className="text-sm text-muted mb-6">Scan a confirmed ticket's QR code, or enter a registration ID manually.</p>

      {!reg && (
        <div className="glass rounded-2xl p-6">
          {!scanning ? (
            <button
              onClick={startScanner}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all"
            >
              <ScanLine size={16} />
              Start camera scan
            </button>
          ) : (
            <>
              <div id="qr-reader" className="rounded-xl overflow-hidden mb-3" />
              <button onClick={stopScanner} className="w-full text-xs text-muted py-2 hover:text-ink transition-colors">
                Stop scanning
              </button>
            </>
          )}

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-rule" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-rule" />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); if (manualId.trim()) lookup(manualId.trim()) }}
            className="flex gap-2"
          >
            <input
              className="input flex-1"
              placeholder="Registration ID"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
            />
            <button type="submit" className="px-4 rounded-lg border border-rule hover:border-signal hover:text-signal-dark transition-colors">
              <Search size={16} />
            </button>
          </form>

          {lookupError && (
            <p className="text-xs text-warn mt-4 flex items-center gap-1.5">
              <AlertTriangle size={13} />
              {lookupError}
            </p>
          )}
        </div>
      )}

      {reg && (
        <div className="glass rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-medium text-ink text-lg">{reg.full_name}</p>
              <p className="text-xs text-muted">{reg.department}, {reg.year}</p>
              <p className="text-xs text-muted">{reg.college_name}</p>
            </div>
            <span className="text-xs font-mono bg-signal-tint text-signal-dark px-3 py-1 rounded-full">
              {reg.track}
            </span>
          </div>

          {reg.status !== 'confirmed' && (
            <p className="text-xs text-warn mb-4 flex items-center gap-1.5">
              <AlertTriangle size={13} />
              Status is "{reg.status}", not confirmed — payment may not be verified yet.
            </p>
          )}

          {reg.checked_in_at ? (
            <div className="bg-byte-tint text-byte text-sm rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
              <Check size={15} />
              Already checked in at {new Date(reg.checked_in_at).toLocaleTimeString()}
            </div>
          ) : (
            <button
              onClick={markAttended}
              disabled={marking}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all disabled:opacity-60 mb-3"
            >
              <Check size={15} />
              {marking ? 'Marking…' : 'Mark attended'}
            </button>
          )}

          <button onClick={reset} className="w-full text-xs text-muted py-2 hover:text-ink transition-colors">
            Scan next
          </button>
        </div>
      )}
    </div>
  )
}