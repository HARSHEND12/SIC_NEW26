import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#tracks', label: 'Tracks' },
  { href: '/#timeline', label: 'Timeline' },
  { href: '/status', label: 'Check status' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt="Byte Club logo"
            className="w-9 h-9 rounded-full shadow-glow-soft group-hover:shadow-glow-violet transition-shadow object-cover"
          />
          <span className="font-mono text-sm tracking-tight text-ink">sic-2026</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-8 text-sm text-muted">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative py-1 hover:text-ink transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-aurora after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-lg text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all"
          >
            Register
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-ink hover:bg-surface transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-5 text-sm text-muted border-t border-rule pt-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="mt-2 text-center text-sm font-medium px-4 py-2.5 rounded-lg text-white bg-aurora bg-[length:200%_200%] transition-all"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  )
}