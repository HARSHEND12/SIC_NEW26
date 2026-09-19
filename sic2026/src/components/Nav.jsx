import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
const links = [
  { href: '/#about', label: 'About' },
  { href: '/#tracks', label: 'Tracks' },
  { href: '/#eligibility', label: 'Participation' },
  { href: '/#process', label: 'Journey' },
  { href: '/#details', label: 'Details' },
  { href: '/#leadership', label: 'Leadership' },
]
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-md border-b-2 border-ink shadow-brutal-sm'
          : 'bg-paper border-b-2 border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[76px] flex items-center justify-between gap-6">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3.5 shrink-0"
        >
          {/* Larger + highly visible college logo */}
          <div
            className="
              relative
              w-[54px] h-[54px]
              sm:w-[58px] sm:h-[58px]
              bg-white
              border-2 border-ink
              flex items-center justify-center
              overflow-hidden
              shrink-0
            "
          >
            <img
              src="/college-logo.png"
              alt="Hindustan College of Science and Technology"
              className="
                w-full
                h-full
                object-contain
                p-0.5
                sm:p-1
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </div>

          {/* NEXORA BRAND */}
          <div className="hidden sm:block leading-none">
            <p className="font-display uppercase text-xl tracking-tight text-ink">
              NEXORA
            </p>

            <p className="font-mono text-[9px] tracking-widest text-muted mt-1">
              HCST · 2026
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center border-2 border-ink bg-surface">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={`group relative px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper ${
                index !== links.length - 1
                  ? 'border-r-2 border-ink'
                  : ''
              }`}
            >
              {link.label}

              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-signal group-hover:w-4 transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 shrink-0">

          <Link
            to="/status"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 border-2 border-ink font-mono text-[10px] uppercase tracking-widest text-ink hover:bg-byte transition-colors"
          >
            Status
          </Link>

          <Link
            to="/register"
            className="hidden sm:inline-flex group items-center gap-2 px-5 py-2.5 bg-signal text-black border-2 border-ink shadow-brutal-sm font-display uppercase text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            Register

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="lg:hidden w-10 h-10 border-2 border-ink bg-surface flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:hidden overflow-hidden border-t-2 border-ink bg-paper"
          >
            <motion.nav
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              className="max-w-6xl mx-auto px-6 py-5"
            >
              <div className="border-2 border-ink bg-surface">
                {links.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-5 py-4 font-mono text-xs uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition-colors ${
                      index !== links.length - 1
                        ? 'border-b-2 border-ink'
                        : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} />
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Link
                  to="/status"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center px-4 py-3 border-2 border-ink font-mono text-[10px] uppercase tracking-widest hover:bg-byte transition-colors"
                >
                  Status
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-signal text-black border-2 border-ink shadow-brutal-sm font-display uppercase text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  Register
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
