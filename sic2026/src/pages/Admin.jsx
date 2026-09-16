import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, Check, X, Link as LinkIcon, LogIn, ScanLine } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

const statusStyles = {
  submitted: 'bg-surface text-muted border-rule',
  shortlisted: 'bg-signal-tint text-signal-dark border-signal/40',
  confirmed: 'bg-byte-tint text-byte border-byte/40',
  rejected: 'bg-surface text-muted border-rule',
  failed: 'bg-warn-tint text-warn border-warn/40',
}

const filters = ['all', 'submitted', 'shortlisted', 'confirmed', 'rejected', 'failed']

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

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_e, s) => setSession(s)
    )

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setAuthError(error.message)
  }

  async function setStatus(id, status) {
    setUpdatingId(id)

    await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id)

    const reg = regs.find((r) => r.id === id)

    if (reg) {
      try {
        const {
          data: result,
          error: fnError,
        } = await supabase.functions.invoke('send-status-email', {
          body: {
            email: reg.email,
            fullName: reg.full_name,
            status,
            registrationId: id,
          },
        })

        setNotice(
          fnError || !result?.sent
            ? {
                type: 'warn',
                text: `Status updated, but the email to ${reg.email} did not send. Use “Copy link” to share it manually.`,
              }
            : {
                type: 'ok',
                text: `Status updated and ${reg.email} was notified.`,
              }
        )
      } catch {
        setNotice({
          type: 'warn',
          text: `Status updated, but the email to ${reg.email} did not send.`,
        })
      }
    }

    await loadRegs()
    setUpdatingId(null)
  }

  function copyLink(id) {
    navigator.clipboard.writeText(
      `${window.location.origin}/ticket/${id}`
    )

    setNotice({
      type: 'info',
      text: 'Ticket link copied to clipboard.',
    })
  }

  function exportCsv() {
    const header =
      'Name,College,Department,Track,Status,Email,Phone\n'

    const rows = regs
      .map((r) =>
        [
          r.full_name,
          r.college_name,
          r.department,
          r.track,
          r.status,
          r.email,
          r.phone,
        ].join(',')
      )
      .join('\n')

    const url = URL.createObjectURL(
      new Blob([header + rows], {
        type: 'text/csv',
      })
    )

    const a = document.createElement('a')
    a.href = url
    a.download = 'nexora2026-registrations.csv'
    a.click()
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs text-signal-dark mb-4">
            ORGANISING COMMITTEE
          </p>

          <h1 className="font-display text-4xl tracking-tight mb-8">
            Committee sign in
          </h1>

          <form
            onSubmit={handleLogin}
            className="rounded-3xl border border-rule bg-surface p-8 space-y-5"
          >
            <label className="block">
              <span className="text-sm text-muted block mb-2">
                Email
              </span>

              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm text-muted block mb-2">
                Password
              </span>

              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {authError && (
              <p className="text-xs text-warn">
                {authError}
              </p>
            )}

            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ink text-paper text-sm font-medium hover:bg-signal hover:text-white transition-colors">
              <LogIn size={15} />
              Sign in
            </button>
          </form>

          <p className="text-xs text-muted mt-5 text-center">
            Access is restricted to committee accounts created in Supabase Auth.
          </p>
        </motion.div>
      </div>
    )
  }

  const counts = regs.reduce(
    (acc, r) => ({
      ...acc,
      [r.status]: (acc[r.status] || 0) + 1,
    }),
    {}
  )

  const visible =
    filter === 'all'
      ? regs
      : regs.filter((r) => r.status === filter)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-mono text-xs text-signal-dark mb-3">
            ORGANISING COMMITTEE
          </p>

          <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
            Submissions
          </h1>

          <p className="text-sm text-muted mt-2">
            NEXORA 2026 · Byte and Qbit clubs
          </p>
        </div>

        {/* CHECK-IN + EXPORT */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/checkin"
            className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border border-rule hover:border-byte hover:text-byte transition-colors"
          >
            <ScanLine size={14} />
            Check-in mode
          </Link>

          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border border-rule hover:border-signal transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {notice && (
        <div
          className={`mb-8 text-sm px-5 py-4 rounded-xl flex items-start justify-between gap-4 ${
            notice.type === 'warn'
              ? 'bg-warn-tint text-warn'
              : notice.type === 'ok'
                ? 'bg-byte-tint text-byte'
                : 'bg-signal-tint text-signal-dark'
          }`}
        >
          <span>{notice.text}</span>

          <button
            onClick={() => setNotice(null)}
            className="shrink-0 opacity-70 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
        <Stat label="Total" value={regs.length} />
        <Stat label="Under review" value={counts.submitted || 0} />
        <Stat label="Shortlisted" value={counts.shortlisted || 0} />
        <Stat label="Confirmed" value={counts.confirmed || 0} />
        <Stat label="Not selected" value={counts.rejected || 0} />
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-mono px-4 py-2 rounded-full border transition-colors ${
              filter === s
                ? 'bg-signal-tint border-signal text-signal-dark'
                : 'border-rule text-muted hover:border-signal/60 hover:text-ink'
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-rule bg-surface overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="border-b border-rule">
            <tr>
              <Th>Participant</Th>
              <Th>College</Th>
              <Th>Track</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-muted"
                >
                  Loading…
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-muted"
                >
                  No submissions in this view.
                </td>
              </tr>
            ) : (
              visible.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-rule last:border-b-0 align-top hover:bg-signal-tint/10 transition-colors"
                >
                  <td className="px-6 py-5">
                    <p className="text-ink">
                      {r.full_name}
                    </p>

                    <p className="text-xs text-muted mt-0.5">
                      {r.email}
                    </p>

                    {r.abstract_title && (
                      <p className="text-xs text-signal-dark mt-1.5 italic">
                        {r.abstract_title}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-5 text-muted">
                    {r.college_name}
                  </td>

                  <td className="px-6 py-5 text-muted">
                    {r.track}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`text-[11px] font-mono px-3 py-1.5 rounded-full border ${
                        statusStyles[r.status] ||
                        statusStyles.submitted
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2 flex-wrap">
                      {r.status === 'submitted' && (
                        <>
                          <button
                            disabled={updatingId === r.id}
                            onClick={() =>
                              setStatus(r.id, 'shortlisted')
                            }
                            className="inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full border border-rule hover:border-signal hover:text-signal-dark transition-colors disabled:opacity-50"
                          >
                            <Check size={12} />
                            Shortlist
                          </button>

                          <button
                            disabled={updatingId === r.id}
                            onClick={() =>
                              setStatus(r.id, 'rejected')
                            }
                            className="inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full border border-rule hover:border-warn hover:text-warn transition-colors disabled:opacity-50"
                          >
                            <X size={12} />
                            Decline
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => copyLink(r.id)}
                        className="inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full border border-rule hover:border-byte hover:text-byte transition-colors"
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

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-rule bg-surface p-5">
      <p className="text-xs text-muted mb-2">
        {label}
      </p>

      <p className="font-display text-3xl text-ink">
        {value}
      </p>
    </div>
  )
}

function Th({ children }) {
  return (
    <th className="text-left px-6 py-4 text-xs font-mono text-muted font-normal">
      {children}
    </th>
  )
}