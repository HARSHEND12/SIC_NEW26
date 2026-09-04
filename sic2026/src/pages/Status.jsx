import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
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
      setError("No registration found with that email. Double check it, or register if you haven't yet.")
      return
    }
    navigate(`/ticket/${id}`)
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-24 relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-signal/15 blur-[90px] -z-10" />

      <div className="glass rounded-2xl p-7">
        <h1 className="font-display text-2xl mb-2">
          Check your <span className="gradient-text">status</span>
        </h1>
        <p className="text-sm text-muted mb-6">
          Enter the email you registered with to find your ticket.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            className="input"
            placeholder="name@hcst.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-xs text-warn">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
          >
            {loading ? 'Searching…' : 'Find my ticket'}
            {!loading && <Search size={15} />}
          </button>
        </form>
      </div>

      <p className="text-xs text-muted mt-4 text-center flex items-center justify-center gap-1">
        Haven't registered yet?
        <a href="/register" className="text-signal-dark hover:underline inline-flex items-center gap-0.5">
          Register now <ArrowRight size={12} />
        </a>
      </p>
    </div>
  )
}