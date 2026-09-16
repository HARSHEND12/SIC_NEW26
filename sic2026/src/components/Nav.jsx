import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#timeline', label: 'Timeline' },
  { href: '/#team', label: 'Team' },
  { href: '/status', label: 'Status' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-paper/80 backdrop-blur-xl border-b border-rule' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* LEFT — college logo + event name */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/college-logo.png"
            alt="Hindustan College of Science and Technology"
            className="h-12 w-12 object-contain"
          />
          <span className="leading-tight hidden sm:block">
            <span className="block font-display text-lg tracking-tight text-ink">NEXORA</span>
            <span className="block text-[10px] font-mono text-muted -mt-0.5">HCST · 2026</span>
          </span>
        </Link>

        {/* CENTER — silver gradient links */}
        <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative px-5 py-2 text-[13px] font-medium tracking-wide rounded-full hover:bg-surface transition-colors"
            >
              <span className="silver-text group-hover:text-ink transition-colors">{l.label}</span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-px w-0 bg-silver group-hover:w-6 transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* RIGHT — register + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center text-[13px] font-medium px-5 py-2 rounded-full bg-ink text-paper hover:bg-signal hover:text-white transition-colors"
          >
            Register
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden w-9 h-9 rounded-full border border-rule flex items-center justify-center text-ink hover:border-signal transition-colors"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-rule bg-paper/95 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="silver-text hover:text-ink text-sm py-3 border-b border-rule transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-4 text-center text-sm font-medium px-4 py-3 rounded-full bg-ink text-paper"
              >
                Register
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}