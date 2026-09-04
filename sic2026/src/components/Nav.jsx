import { Link } from 'react-router-dom'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#tracks', label: 'Tracks' },
  { href: '/#timeline', label: 'Timeline' },
  { href: '/status', label: 'Check status' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
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
        <Link
          to="/register"
          className="text-sm font-medium px-4 py-2 rounded-lg text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all"
        >
          Register
        </Link>
      </div>
    </header>
  )
}