import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

import {
  Download,
  Check,
  X,
  LogIn,
  ScanLine,
  CreditCard,
  FileText,
  ExternalLink,
  RefreshCw,
  Eye,
  ChevronRight,
} from 'lucide-react'

import { supabase } from '../lib/supabaseClient.js'


const statusStyles = {
  submitted:
    'bg-surface text-muted border-rule',

  shortlisted:
    'bg-signal-tint text-signal-dark border-signal/40',

  confirmed:
    'bg-byte-tint text-byte border-byte/40',

  rejected:
    'bg-surface text-muted border-rule',

  failed:
    'bg-warn-tint text-warn border-warn/40',
}


const filters = [
  'all',
  'submitted',
  'shortlisted',
  'confirmed',
  'rejected',
  'failed',
]


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

  const [selectedPayment, setSelectedPayment] = useState(null)
  const [selectedAbstract, setSelectedAbstract] = useState(null)


  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: sub,
    } = supabase.auth.onAuthStateChange(
      (_event, s) => setSession(s)
    )

    return () => sub.subscription.unsubscribe()

  }, [])


  async function loadRegs() {

    setLoading(true)

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', {
        ascending: false,
      })
      .limit(200)

    if (error) {

      setNotice({
        type: 'warn',
        text: error.message,
      })

      setRegs([])

    } else {

      setRegs(data || [])

    }

    setLoading(false)
  }


  useEffect(() => {

    if (session) {
      loadRegs()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [session])


  async function handleLogin(e) {

    e.preventDefault()

    setAuthError('')

    const {
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
    }

  }


  async function setStatus(id, status) {

    setUpdatingId(id)

    const {
      error,
    } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id)

    if (error) {

      setNotice({
        type: 'warn',
        text: `Could not update status: ${error.message}`,
      })

      setUpdatingId(null)
      return
    }


    const reg = regs.find(
      (r) => r.id === id
    )


    if (reg) {

      try {

        const {
          data: result,
          error: fnError,
        } = await supabase.functions.invoke(
          'send-status-email',
          {
            body: {
              email: reg.email,
              fullName: reg.full_name,
              status,
              registrationId: id,
            },
          }
        )


        setNotice(

          fnError || !result?.sent

            ? {
                type: 'warn',
                text: `Status updated, but the email to ${reg.email} did not send.`,
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


  /*
   * ABSTRACT DOWNLOAD
   *
   * Expected field:
   * r.abstract_url
   *
   * If your database uses another name,
   * change it here only.
   */

  function downloadAbstract(reg) {

    const url =
      reg.abstract_url ||
      reg.abstract_file_url ||
      reg.abstract_link


    if (!url) {

      setNotice({
        type: 'warn',
        text: 'No abstract file has been attached to this registration.',
      })

      return
    }


    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    )
  }


  /*
   * PAYMENT DETAILS
   *
   * The modal displays whichever payment
   * fields are available in the registration.
   */

  function openPaymentDetails(reg) {
    setSelectedPayment(reg)
  }


  function openAbstract(reg) {
    setSelectedAbstract(reg)
  }


  function exportCsv() {

    const header =
      'Name,College,Department,Track,Status,Email,Phone\n'


    const rows = regs
      .map((r) => {

        return [

          r.full_name,
          r.college_name,
          r.department,
          r.track,
          r.status,
          r.email,
          r.phone,

        ]
          .map((value) =>
            `"${String(value || '').replaceAll('"', '""')}"`
          )
          .join(',')

      })
      .join('\n')


    const url = URL.createObjectURL(

      new Blob(
        [header + rows],
        {
          type: 'text/csv',
        }
      )

    )


    const a =
      document.createElement('a')

    a.href = url
    a.download =
      'nexora2026-registrations.csv'

    a.click()

    URL.revokeObjectURL(url)
  }


  if (!session) {

    return (

      <div className="max-w-md mx-auto px-6 py-28">

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >

          <p className="font-mono text-xs text-signal mb-4 tracking-widest">
            NEXORA 2026 / ADMIN
          </p>


          <div className="flex items-end justify-between gap-4 mb-8">

            <div>

              <h1 className="font-display uppercase text-4xl tracking-tight">
                Committee
                <br />
                sign in
              </h1>

              <p className="text-sm text-muted mt-3">
                Restricted organising committee access.
              </p>

            </div>

            <LogIn
              size={28}
              className="text-signal mb-1"
            />

          </div>


          <form
            onSubmit={handleLogin}
            className="border-2 border-ink bg-surface p-7 shadow-brutal space-y-5"
          >

            <label className="block">

              <span className="font-mono text-[10px] text-muted uppercase tracking-widest block mb-2">
                Email
              </span>

              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </label>


            <label className="block">

              <span className="font-mono text-[10px] text-muted uppercase tracking-widest block mb-2">
                Password
              </span>

              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </label>


            {authError && (

              <div className="border border-warn/30 bg-warn-tint px-4 py-3">

                <p className="text-xs text-warn">
                  {authError}
                </p>

              </div>

            )}


            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-ink bg-ink text-paper text-sm font-display uppercase hover:bg-signal hover:text-black transition-colors"
            >

              <LogIn size={15} />

              Sign in

            </button>

          </form>


          <p className="font-mono text-[10px] text-muted mt-5 text-center leading-relaxed">
            Access is restricted to committee accounts
            created in Supabase Auth.
          </p>

        </motion.div>

      </div>

    )
  }


  const counts = regs.reduce(

    (acc, r) => ({

      ...acc,

      [r.status]:
        (acc[r.status] || 0) + 1,

    }),

    {}

  )


  const visible =
    filter === 'all'
      ? regs
      : regs.filter(
          (r) => r.status === filter
        )


  return (

    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* HEADER */}

      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">

        <div>

          <p className="font-mono text-xs text-signal mb-3 tracking-widest">
            NEXORA 2026 / CONTROL PANEL
          </p>

          <h1 className="font-display uppercase text-4xl sm:text-5xl tracking-tight">
            Submissions
          </h1>

          <p className="text-sm text-muted mt-2">
            Byte + Qbit · Organising Committee
          </p>

        </div>


        <div className="flex flex-wrap items-center gap-2">

          <button
            onClick={loadRegs}
            disabled={loading}
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 border-2 border-rule hover:border-signal hover:text-signal transition-colors disabled:opacity-50"
          >

            <RefreshCw
              size={13}
              className={
                loading
                  ? 'animate-spin'
                  : ''
              }
            />

            Refresh

          </button>


          <Link
            to="/checkin"
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 border-2 border-rule hover:border-byte hover:text-byte transition-colors"
          >

            <ScanLine size={14} />

            Check-in

          </Link>


          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 border-2 border-ink bg-ink text-paper hover:bg-signal hover:text-black transition-colors"
          >

            <Download size={14} />

            Export CSV

          </button>

        </div>

      </div>


      {/* NOTICE */}

      <AnimatePresence>

        {notice && (

          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            className={`mb-8 px-5 py-4 border-2 flex items-start justify-between gap-4 ${
              notice.type === 'warn'
                ? 'border-warn/30 bg-warn-tint text-warn'
                : notice.type === 'ok'
                  ? 'border-byte/30 bg-byte-tint text-byte'
                  : 'border-signal/30 bg-signal-tint text-signal-dark'
            }`}
          >

            <span className="text-sm">
              {notice.text}
            </span>

            <button
              onClick={() =>
                setNotice(null)
              }
              className="shrink-0 opacity-70 hover:opacity-100"
            >
              <X size={14} />
            </button>

          </motion.div>

        )}

      </AnimatePresence>


      {/* STATS */}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">

        <Stat
          label="Total"
          value={regs.length}
        />

        <Stat
          label="Under review"
          value={counts.submitted || 0}
        />

        <Stat
          label="Shortlisted"
          value={counts.shortlisted || 0}
        />

        <Stat
          label="Confirmed"
          value={counts.confirmed || 0}
        />

        <Stat
          label="Not selected"
          value={counts.rejected || 0}
        />

      </div>


      {/* FILTERS */}

      <div className="flex items-center justify-between gap-4 mb-5">

        <div>

          <p className="font-mono text-[10px] text-muted tracking-widest">
            FILTER SUBMISSIONS
          </p>

        </div>

        <p className="font-mono text-[10px] text-muted">
          {visible.length} RECORD
          {visible.length !== 1 ? 'S' : ''}
        </p>

      </div>


      <div className="flex gap-2 mb-6 flex-wrap">

        {filters.map((s) => (

          <button
            key={s}
            onClick={() =>
              setFilter(s)
            }
            className={`text-[10px] font-mono px-4 py-2 border-2 transition-colors ${
              filter === s
                ? 'bg-signal border-ink text-black'
                : 'border-rule text-muted hover:border-signal hover:text-ink'
            }`}
          >

            {s.toUpperCase()}

          </button>

        ))}

      </div>


      {/* TABLE */}

      <div className="border-2 border-ink bg-surface overflow-x-auto shadow-brutal">

        <table className="w-full text-sm min-w-[1050px]">

          <thead className="border-b-2 border-ink bg-paper">

            <tr>

              <Th>
                Participant
              </Th>

              <Th>
                College
              </Th>

              <Th>
                Track
              </Th>

              <Th>
                Status
              </Th>

              <Th>
                Actions
              </Th>

            </tr>

          </thead>


          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={5}
                  className="px-6 py-12 text-muted font-mono text-xs"
                >

                  <div className="flex items-center gap-3">

                    <RefreshCw
                      size={14}
                      className="animate-spin"
                    />

                    Loading submissions…

                  </div>

                </td>

              </tr>

            ) : visible.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="px-6 py-12 text-muted font-mono text-xs"
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

                  {/* PARTICIPANT */}

                  <td className="px-6 py-5">

                    <p className="font-medium text-ink">
                      {r.full_name}
                    </p>

                    <p className="text-xs text-muted mt-1">
                      {r.email}
                    </p>

                    {r.abstract_title && (

                      <p className="text-xs text-signal-dark mt-2 italic max-w-[240px]">
                        {r.abstract_title}
                      </p>

                    )}

                  </td>


                  {/* COLLEGE */}

                  <td className="px-6 py-5">

                    <p className="text-muted max-w-[180px]">
                      {r.college_name}
                    </p>

                    {r.department && (

                      <p className="font-mono text-[10px] text-muted mt-1">
                        {r.department}
                      </p>

                    )}

                  </td>


                  {/* TRACK */}

                  <td className="px-6 py-5">

                    <span className="text-xs text-muted">
                      {r.track}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex text-[10px] font-mono px-3 py-1.5 border ${
                        statusStyles[r.status] ||
                        statusStyles.submitted
                      }`}
                    >

                      {r.status}

                    </span>

                  </td>


                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <div className="flex gap-2 flex-wrap">

                      {/* ABSTRACT */}

                      <button
                        onClick={() =>
                          openAbstract(r)
                        }
                        className="inline-flex items-center gap-1.5 text-[11px] px-3 py-2 border-2 border-rule hover:border-byte hover:text-byte transition-colors"
                      >

                        <FileText size={12} />

                        Abstract

                      </button>


                      {/* PAYMENT */}

                      <button
                        onClick={() =>
                          openPaymentDetails(r)
                        }
                        className="inline-flex items-center gap-1.5 text-[11px] px-3 py-2 border-2 border-rule hover:border-signal hover:text-signal-dark transition-colors"
                      >

                        <CreditCard size={12} />

                        Payment

                      </button>


                      {/* STATUS ACTIONS */}

                      {r.status === 'submitted' && (

                        <>

                          <button
                            disabled={
                              updatingId === r.id
                            }
                            onClick={() =>
                              setStatus(
                                r.id,
                                'shortlisted'
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-[11px] px-3 py-2 border-2 border-rule hover:border-signal hover:text-signal-dark transition-colors disabled:opacity-50"
                          >

                            <Check size={12} />

                            Shortlist

                          </button>


                          <button
                            disabled={
                              updatingId === r.id
                            }
                            onClick={() =>
                              setStatus(
                                r.id,
                                'rejected'
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-[11px] px-3 py-2 border-2 border-rule hover:border-warn hover:text-warn transition-colors disabled:opacity-50"
                          >

                            <X size={12} />

                            Decline

                          </button>

                        </>

                      )}

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* ABSTRACT MODAL */}

      <AnimatePresence>

        {selectedAbstract && (

          <Modal
            onClose={() =>
              setSelectedAbstract(null)
            }
          >

            <div className="flex items-start justify-between gap-5 mb-8">

              <div>

                <p className="font-mono text-[10px] text-signal tracking-widest mb-2">
                  SUBMISSION / ABSTRACT
                </p>

                <h2 className="font-display uppercase text-3xl">
                  {selectedAbstract.abstract_title ||
                    'Untitled abstract'}
                </h2>

              </div>

              <FileText
                size={25}
                className="text-signal"
              />

            </div>


            <div className="border-2 border-ink bg-paper p-5 mb-6">

              <p className="font-mono text-[10px] text-muted mb-2">
                PARTICIPANT
              </p>

              <p className="text-sm">
                {selectedAbstract.full_name}
              </p>

            </div>


            {selectedAbstract.abstract_text && (

              <div className="mb-6">

                <p className="font-mono text-[10px] text-muted mb-3">
                  ABSTRACT CONTENT
                </p>

                <div className="border-2 border-rule p-5 max-h-[360px] overflow-y-auto">

                  <p className="text-sm text-muted leading-7 whitespace-pre-wrap">
                    {selectedAbstract.abstract_text}
                  </p>

                </div>

              </div>

            )}


            <div className="flex flex-wrap gap-3">

              {(
                selectedAbstract.abstract_url ||
                selectedAbstract.abstract_file_url ||
                selectedAbstract.abstract_link
              ) && (

                <button
                  onClick={() =>
                    downloadAbstract(
                      selectedAbstract
                    )
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 border-2 border-ink bg-ink text-paper text-sm font-display uppercase hover:bg-byte hover:text-black transition-colors"
                >

                  <Download size={15} />

                  Download abstract

                </button>

              )}

            </div>

          </Modal>

        )}

      </AnimatePresence>


      {/* PAYMENT MODAL */}

      <AnimatePresence>

        {selectedPayment && (

          <Modal
            onClose={() =>
              setSelectedPayment(null)
            }
          >

            <div className="flex items-start justify-between gap-5 mb-8">

              <div>

                <p className="font-mono text-[10px] text-signal tracking-widest mb-2">
                  REGISTRATION / PAYMENT
                </p>

                <h2 className="font-display uppercase text-3xl">
                  Payment details
                </h2>

              </div>

              <CreditCard
                size={25}
                className="text-signal"
              />

            </div>


            <div className="border-2 border-ink">

              <InfoRow
                label="Participant"
                value={
                  selectedPayment.full_name
                }
              />

              <InfoRow
                label="Email"
                value={
                  selectedPayment.email
                }
              />

              <InfoRow
                label="Registration ID"
                value={
                  selectedPayment.id
                }
              />

              <InfoRow
                label="Status"
                value={
                  selectedPayment.status
                }
              />

              <InfoRow
                label="Payment ID"
                value={
                  selectedPayment.payment_id ||
                  selectedPayment.razorpay_payment_id ||
                  'Not available'
                }
              />

              <InfoRow
                label="Order ID"
                value={
                  selectedPayment.order_id ||
                  selectedPayment.razorpay_order_id ||
                  'Not available'
                }
              />

              <InfoRow
                label="Payment status"
                value={
                  selectedPayment.payment_status ||
                  selectedPayment.payment_state ||
                  'Not available'
                }
              />

              <InfoRow
                label="Amount"
                value={
                  selectedPayment.amount
                    ? `₹${selectedPayment.amount}`
                    : selectedPayment.payment_amount
                      ? `₹${selectedPayment.payment_amount}`
                      : 'Not available'
                }
              />

            </div>


            <div className="mt-6 p-4 border border-rule bg-surface">

              <p className="font-mono text-[10px] text-muted mb-1">
                NOTE
              </p>

              <p className="text-xs text-muted leading-relaxed">
                Payment fields shown above are read directly from
                the registration record. If your Supabase columns
                use different names, update the corresponding
                fields in this component.
              </p>

            </div>

          </Modal>

        )}

      </AnimatePresence>

    </div>

  )
}


/* -------------------------------- */
/* STAT CARD */
/* -------------------------------- */

function Stat({ label, value }) {

  return (

    <div className="border-2 border-rule bg-surface p-5 hover:border-ink transition-colors">

      <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
        {label}
      </p>

      <p className="font-display text-3xl text-ink">
        {value}
      </p>

    </div>

  )
}


/* -------------------------------- */
/* TABLE HEADER */
/* -------------------------------- */

function Th({ children }) {

  return (

    <th className="text-left px-6 py-4 text-[10px] font-mono text-muted font-normal uppercase tracking-widest">

      {children}

    </th>

  )

}


/* -------------------------------- */
/* MODAL */
/* -------------------------------- */

function Modal({
  children,
  onClose,
}) {

  return (

    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-5"
      onMouseDown={(e) => {

        if (e.target === e.currentTarget) {
          onClose()
        }

      }}
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 10,
          scale: 0.98,
        }}
        transition={{
          duration: 0.2,
        }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-ink bg-paper shadow-brutal"
      >

        <div className="p-7 sm:p-9">

          {children}

          <button
            onClick={onClose}
            className="mt-8 inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-ink transition-colors"
          >

            <X size={13} />

            CLOSE

          </button>

        </div>

      </motion.div>

    </motion.div>

  )

}


/* -------------------------------- */
/* INFO ROW */
/* -------------------------------- */

function InfoRow({
  label,
  value,
}) {

  return (

    <div className="grid grid-cols-[130px_1fr] gap-4 p-4 border-b border-rule last:border-b-0">

      <p className="font-mono text-[10px] text-muted uppercase">
        {label}
      </p>

      <p className="text-sm text-ink break-all">
        {value || '—'}
      </p>

    </div>

  )

}