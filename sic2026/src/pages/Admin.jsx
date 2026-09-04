import { useEffect, useState } from 'react'
import { Download, Check, X, LogIn, Link as LinkIcon } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

const statusStyles = {
  submitted: 'bg-surface text-muted',
  shortlisted: 'bg-signal-tint text-signal-dark',
  confirmed: 'bg-byte-tint text-byte',
  rejected: 'bg-surface text-muted',
  failed: 'bg-warn-tint text-warn',
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [regs, setRegs] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  async function loadRegs() {
    setLoading(true)
    const { data } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    setRegs(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (session) loadRegs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function handleLogin(e) {
    e.preventDefault()
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  async function setStatus(id, status) {
    setUpdatingId(id)
    await supabase.from('registrations').update({ status }).eq('id', id)

    const reg = regs.find((r) => r.id === id)
    if (reg) {
      try {
        const { data: result, error: fnError } = await supabase.functions.invoke('send-status-email', {
          body: { email: reg.email, fullName: reg.full_name, status, registrationId: id },
        })
        if (fnError || !result?.sent) {
          setNotice({
            type: 'warn',
            text: `Status updated, but the email to ${reg.email} did not send. Use "Copy link" below to share it manually.`,
          })
        } else {
          setNotice({ type: 'byte', text: `Status updated and ${reg.email} was notified.` })
        }
      } catch {
        setNotice({
          type: 'warn',
          text: `Status updated, but the email to ${reg.email} did not send. Use "Copy link" below to share it manually.`,
        })
      }
    }

    await loadRegs()
    setUpdatingId(null)
  }

  function copyLink(id) {
    const url = `${window.location.origin}/ticket/${id}`
    navigator.clipboard.writeText(url)
    setNotice({ type: 'signal', text: 'Ticket link copied — share it directly via WhatsApp, SMS, etc.' })
  }

  function exportCsv() {
    const header = 'Name,College,Department,Track,Status,Email\n'
    const rows = regs
      .map((r) => [r.full_name, r.college_name, r.department, r.track, r.status, r.email].join(','))
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sic2026-registrations.csv'
    a.click()
  }

  if (!session) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24 relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-signal/15 blur-[90px] -z-10" />
        <div className="glass rounded-2xl p-7">
          <h1 className="font-display text-2xl mb-6">
            Organizer <span className="gradient-text">login</span>
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
        <p className="text-xs text-muted mt-4 text-center">
          Admin access is restricted to organizer accounts set up in Supabase Auth.
        </p>
      </div>
    )
  }

  const counts = regs.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1
    return acc
  }, {})
  const visible = filter === 'all' ? regs : regs.filter((r) => r.status === filter)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-byte/10 blur-[100px] -z-10" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl">
            Organizer <span className="gradient-text">dashboard</span>
          </h1>
          <p className="text-sm text-muted">Byte and Qbit club admin view</p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 text-sm glass px-4 py-2 rounded-lg hover:border-signal hover:text-ink transition-colors"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {notice && (
        <div
          className={`mb-6 text-sm px-4 py-3 rounded-lg flex items-center justify-between gap-4 ${
            notice.type === 'warn' ? 'bg-warn-tint text-warn' : notice.type === 'byte' ? 'bg-byte-tint text-byte' : 'bg-signal-tint text-signal-dark'
          }`}
        >
          <span>{notice.text}</span>
          <button onClick={() => setNotice(null)} className="shrink-0 opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <Stat label="Total" value={regs.length} />
        <Stat label="Submitted" value={counts.submitted || 0} />
        <Stat label="Shortlisted" value={counts.shortlisted || 0} accent="signal" />
        <Stat label="Confirmed" value={counts.confirmed || 0} accent="byte" />
        <Stat label="Rejected" value={counts.rejected || 0} />
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'submitted', 'shortlisted', 'confirmed', 'rejected', 'failed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              filter === s
                ? 'bg-signal-tint border-signal text-signal-dark shadow-glow-soft'
                : 'border-rule text-muted hover:border-signal hover:text-ink'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface/60 border-b border-rule">
            <tr>
              <Th>Name</Th>
              <Th>College</Th>
              <Th>Track</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-6 text-muted" colSpan={5}>Loading…</td></tr>
            ) : visible.length === 0 ? (
              <tr><td className="px-4 py-6 text-muted" colSpan={5}>No registrations in this view.</td></tr>
            ) : (
              visible.map((r) => (
                <tr key={r.id} className="border-b border-rule last:border-b-0 hover:bg-surface/60 align-top transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-ink">{r.full_name}</p>
                    {r.abstract_title && (
                      <p className="text-xs text-muted mt-0.5">{r.abstract_title}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{r.college_name}</td>
                  <td className="px-4 py-3 text-muted">{r.track}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono px-2 py-1 rounded-full ${statusStyles[r.status] || 'bg-surface text-muted'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">
                      {r.status === 'submitted' && (
                        <>
                          <button
                            disabled={updatingId === r.id}
                            onClick={() => setStatus(r.id, 'shortlisted')}
                            className="inline-flex items-center gap-1 text-xs border border-rule px-3 py-1.5 rounded-lg hover:border-signal hover:text-signal-dark hover:shadow-glow-soft transition-all disabled:opacity-50"
                          >
                            <Check size={12} />
                            Shortlist
                          </button>
                          <button
                            disabled={updatingId === r.id}
                            onClick={() => setStatus(r.id, 'rejected')}
                            className="inline-flex items-center gap-1 text-xs border border-rule px-3 py-1.5 rounded-lg hover:border-warn hover:text-warn transition-all disabled:opacity-50"
                          >
                            <X size={12} />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => copyLink(r.id)}
                        className="inline-flex items-center gap-1 text-xs border border-rule px-3 py-1.5 rounded-lg hover:border-byte hover:text-byte transition-all"
                      >
                        <LinkIcon size={12} />
                        Copy link
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Stat({ label, value, accent }) {
  const cls = accent === 'byte' ? 'text-byte' : accent === 'signal' ? 'text-signal-dark' : 'text-ink'
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs text-muted mb-1">{label}</p>
      <p className={`text-2xl font-display ${cls}`}>{value}</p>
    </div>
  )
}

function Th({ children }) {
  return <th className="text-left px-4 py-2.5 text-xs text-muted font-medium">{children}</th>
}