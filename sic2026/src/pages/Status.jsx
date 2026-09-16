import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

export default function Status() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { data: id, error: err } = await supabase.rpc('get_registration_id_by_email', {
      p_email: email.trim(),
    })
    setLoading(false)
    if (err || !id) {
      setError('No registration found with that email address.')
      return
    }
    navigate(`/ticket/${id}`)
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs text-signal-dark mb-4">CHECK YOUR STATUS</p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight mb-5">
          Find your <span className="italic">registration</span>
        </h1>
        <p className="text-muted leading-relaxed mb-10">
          Enter the email address you registered with and we will take you straight
          to your registration status and ticket.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSubmit}
        className="rounded-3xl border border-rule bg-surface p-8 sm:p-10"
      >
        <label className="block mb-6">
          <span className="text-sm text-muted block mb-2">Email address</span>
          <input
            type="email"
            required
            className="input"
            placeholder="name@hcst.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="text-xs text-warn mt-2 block">{error}</span>}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-signal hover:text-white transition-colors disabled:opacity-60"
        >
          {loading ? 'Searching…' : 'Find my registration'}
          {!loading && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
        </button>
      </motion.form>

      <p className="text-sm text-muted mt-8 text-center">
        Not registered yet?{' '}
        <Link to="/register" className="text-signal-dark hover:underline underline-offset-4">
          Register for NEXORA 2026
        </Link>
      </p>
    </div>
  )
}