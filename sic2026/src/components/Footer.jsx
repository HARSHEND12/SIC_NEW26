import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  ArrowUp,
  Instagram,
  Linkedin,
  Mail,
  Github,
  MapPin,
} from 'lucide-react'

const columns = [
  {
    heading: 'Conference',
    links: [
      { label: 'About NEXORA', href: '/#about' },
      { label: 'Timeline', href: '/#timeline' },
      { label: 'Organising Team', href: '/#team' },
      { label: 'Call for Papers', href: '/register' },
    ],
  },
  {
    heading: 'Participate',
    links: [
      { label: 'Register — Free', href: '/register' },
      { label: 'Submit an Abstract', href: '/register' },
      { label: 'Check Status', href: '/status' },
      { label: 'Conference Tracks', href: '/#about' },
    ],
  },
  {
    heading: 'Student Clubs',
    links: [
      {
        label: 'Byte Club',
        href: 'https://www.instagram.com/byte.hcst/?__pwa=1',
        external: true,
      },
      {
        label: 'Qbit Club',
        href: 'https://www.instagram.com/qubit.hcst.it/?__pwa=1',
        external: true,
      }
    ],
  },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/byte.hcst/?__pwa=1',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://l.instagram.com/?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbyte-club-b0a38b328%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app%26fbclid%3DPAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacVdVHhdHzN2L8ABywOkpAMSoEuRt6hUv0Zo5ZcnNz7ZBTumtVbFaiZT7-VkQ_aem_WKZuitKbKOOTZkVCsquNiQ&e=AUCrFfreRzESybv5EHuNV2fe_Ck_eGfbL3qnT5eiNAo0T4hUkZ6-gUMWAsGMWsne2GUuEUYK4iwE8eOm1bIXyctsNwXu7MbuzSpKNIkgxx5d_UcBwHGAK0PVQ-5e71q05KG28XLspMf1m2evvndcmTs',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: '#',
    icon: Mail,
  },
]

function FooterLink({ link }) {
  const content = (
    <>
      <span>{link.label}</span>

      {link.external && (
        <ArrowUpRight
          size={13}
          className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
        />
      )}
    </>
  )

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors duration-300"
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      to={link.href}
      className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors duration-300"
    >
      {content}
    </Link>
  )
}

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-rule bg-background">

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-signal/5 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-signal/5 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.025]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
              backgroundSize: '70px 70px',
            }}
          />
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="group relative z-10 w-full border-b border-rule px-6 py-4"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-[10px] font-mono tracking-[0.25em] text-muted transition-colors duration-300 group-hover:text-ink">
          <ArrowUp
            size={13}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
          BACK TO TOP
        </div>
      </button>

      {/* Main footer */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">

        {/* Brand statement */}
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">

          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_14px_rgba(0,0,0,0.18)]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                HCST · Farah · Mathura
              </span>
            </div>

            <h2 className="max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
              Ideas that
              <br />
              <span className="text-signal">move forward.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-muted sm:text-base">
              NEXORA 2026 brings students, researchers and emerging
              innovators together to exchange ideas, present research
              and build what comes next.
            </p>

            <div className="mt-9">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all duration-300 hover:border-signal hover:bg-signal hover:text-white"
              >
                Register for NEXORA

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-2">
            {columns.map((column) => (
              <div key={column.heading}>
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal-dark">
                  {column.heading}
                </p>

                <ul className="space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Information band */}
        <div className="mt-20 grid overflow-hidden rounded-2xl border border-rule bg-surface/50 md:grid-cols-3">

          <div className="border-b border-rule p-6 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
              Institution
            </p>

            <div className="flex items-center gap-4">
              <img
                src="/college-logo.png"
                alt="Hindustan College of Science and Technology"
                className="h-12 w-12 object-contain"
              />

              <div>
                <p className="font-display text-lg leading-tight text-ink">
                  HCST
                </p>

                <p className="mt-1 text-xs leading-5 text-muted">
                  Hindustan College of Science
                  <br />
                  and Technology
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-rule p-6 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
              Location
            </p>

            <div className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-signal" />

              <p className="text-sm leading-6 text-ink">
                Farah, Mathura
                <br />
                Uttar Pradesh, India
              </p>
            </div>
          </div>

          <div className="p-6">
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
              Connect
            </p>

            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-rule text-muted transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:bg-ink hover:text-background"
                  >
                    <Icon
                      size={15}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-24 overflow-hidden border-b border-rule pb-7">
          <p className="select-none text-center font-display text-[18vw] font-medium leading-[0.7] tracking-[-0.08em] text-ink/[0.055]">
            NEXORA
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-rule bg-surface/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-10">

          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            © 2026 NEXORA · HCST · All rights reserved
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />

            <p className="font-hand text-base text-signal-dark">
              built by students, for students
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}

