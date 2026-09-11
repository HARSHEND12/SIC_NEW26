import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  FileText,
  MonitorPlay,
  Users,
  ArrowRight,
  Calendar,
  Layers,
  Cpu,
} from 'lucide-react'

const heroLine = 'Student innovation conference'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function MagneticButton({ children, className, as: Component = 'button', ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }
  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  )
}

function Counter({ to, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)

  function start() {
    if (started) return
    setStarted(true)
    const duration = 1200
    const t0 = performance.now()
    function tick(now) {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true }}>
      {prefix}{val}{suffix}
    </motion.span>
  )
}

const tracks = [
  { name: 'Paper presentation', desc: 'Original research across engineering disciplines, reviewed by peers and mentors.', icon: FileText, big: true },
  { name: 'Project demo', desc: 'Show working builds live.', icon: MonitorPlay },
  { name: 'Poster', desc: 'Visual research summaries.', icon: Layers },
  { name: 'Attendee', desc: 'Sit in, ask questions, connect.', icon: Users },
]

const timeline = [
  { label: 'Registration opens', date: 'Sept 2026', done: true },
  { label: 'Abstract deadline', date: 'Oct 2026', done: false },
  { label: 'Shortlist announced', date: 'Oct 2026', done: false },
  { label: 'Conference day', date: 'Eve of Innovation Day', done: false },
]

export default function Landing() {
  const words = heroLine.split(' ')
  const heroRef = useRef(null)
  const mvX = useMotionValue(0.5)
  const mvY = useMotionValue(0.5)
  const blobX = useTransform(mvX, [0, 1], [-40, 40])
  const blobY = useTransform(mvY, [0, 1], [-30, 30])
  const springX = useSpring(blobX, { stiffness: 60, damping: 20 })
  const springY = useSpring(blobY, { stiffness: 60, damping: 20 })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  function handlePointerMove(e) {
    const rect = heroRef.current.getBoundingClientRect()
    mvX.set((e.clientX - rect.left) / rect.width)
    mvY.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <div className="overflow-hidden">
      <motion.section
        ref={heroRef}
        onMouseMove={handlePointerMove}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative max-w-6xl mx-auto px-6 pt-24 pb-20"
      >
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute -top-32 -right-20 w-[30rem] h-[30rem] rounded-full bg-signal/25 blur-[110px] -z-10"
        />
        <motion.div
          style={{ x: useTransform(springX, (v) => -v), y: useTransform(springY, (v) => -v) }}
          className="absolute top-32 -left-32 w-96 h-96 rounded-full bg-byte/20 blur-[110px] -z-10"
        />
        <div className="absolute inset-0 bg-grid -z-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { duration: 0.4 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
          className="inline-flex items-center gap-2 glass text-signal-dark text-xs font-mono px-4 py-2 rounded-full mb-8 shadow-glow-soft"
        >
          <Sparkles size={14} />
          Hosted by Byte and Qbit clubs · HCST Farah
        </motion.div>

        <h1 className="font-display font-medium text-[13vw] sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl mb-2" aria-label={heroLine + ' 2026'}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em] text-ink"
              aria-hidden="true"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block gradient-text"
            aria-hidden="true"
          >
            2026.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="text-muted max-w-content text-lg leading-relaxed mb-10 mt-6"
        >
          Planned, run, and owned entirely by students — from call for papers to
          stage coordination — with faculty serving only as mentors. Registration
          and abstract submission are free; a ₹100 fee applies only if you're
          shortlisted for the final round.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <MagneticButton
            as={Link}
            to="/register"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all"
          >
            Register now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#tracks"
            className="glass px-8 py-4 rounded-full text-sm font-medium text-ink hover:border-signal hover:shadow-glow-soft transition-all"
          >
            View tracks
          </MagneticButton>
        </motion.div>
      </motion.section>

      <div className="border-y border-rule glass py-4 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-10 pr-10">
              {['BYTE CLUB', 'QBIT CLUB', 'HCST FARAH', 'INNOVATION DAY 2026', 'CALL FOR PAPERS OPEN'].map((t) => (
                <span key={t} className="flex items-center gap-3 text-sm font-mono text-muted">
                  <Cpu size={14} className="text-signal-dark" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="border-b border-rule">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="font-display text-4xl sm:text-5xl gradient-text"><Counter to={8} /></p>
            <p className="text-xs text-muted mt-2 font-mono">tracks open</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
            <p className="font-display text-4xl sm:text-5xl gradient-text"><Counter to={1} /></p>
            <p className="text-xs text-muted mt-2 font-mono">day event</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
            <p className="font-display text-4xl sm:text-5xl text-byte">Free</p>
            <p className="text-xs text-muted mt-2 font-mono">to register</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}>
            <p className="font-display text-4xl sm:text-5xl text-signal-dark"><Counter to={100} prefix="₹" /></p>
            <p className="text-xs text-muted mt-2 font-mono">if shortlisted</p>
          </motion.div>
        </div>
      </section>

      <section id="tracks" className="relative">
        <div className="max-w-6xl mx-auto px-6 py-28">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl mb-14 tracking-tight"
          >
            Four ways to <span className="gradient-text">take part</span>
          </motion.h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {tracks.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`glass rounded-3xl p-8 transition-all hover:border-signal hover:shadow-glow-violet ${
                    t.big ? 'sm:col-span-2 sm:row-span-2 flex flex-col justify-between' : ''
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-signal-tint text-signal-dark flex items-center justify-center mb-6">
                      <Icon size={20} />
                    </div>
                    <p className={`font-display text-ink mb-2 ${t.big ? 'text-3xl' : 'text-xl'}`}>{t.name}</p>
                    <p className="text-sm text-muted leading-relaxed max-w-sm">{t.desc}</p>
                  </div>
                  {t.big && (
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-1.5 text-sm text-signal-dark mt-8 hover:gap-2.5 transition-all w-fit"
                    >
                      Submit an abstract <ArrowRight size={14} />
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="timeline" className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-28">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl mb-16 tracking-tight"
          >
            <span className="gradient-text">Timeline</span>
          </motion.h2>

          <div className="relative">
            <div className="absolute top-3 left-0 right-0 h-px bg-rule hidden sm:block" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 0.18 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              className="absolute top-3 left-0 h-px bg-aurora hidden sm:block shadow-glow-violet"
            />
            <div className="grid sm:grid-cols-4 gap-10 sm:gap-4">
              {timeline.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`relative z-10 w-6 h-6 rounded-full border-2 mb-4 flex items-center justify-center ${
                      step.done ? 'bg-aurora border-transparent shadow-glow-violet' : 'bg-paper border-rule'
                    }`}
                  >
                    {step.done && <Calendar size={11} className="text-white" />}
                  </div>
                  <p className="font-mono text-xs text-signal-dark mb-1.5">{step.date}</p>
                  <p className="font-medium text-sm text-ink">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative rounded-[2.5rem] px-8 py-20 text-center overflow-hidden bg-aurora shadow-glow-violet"
          >
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-black/20 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-black/20 blur-3xl" />
            <h2 className="font-display text-4xl sm:text-6xl mb-4 relative text-white tracking-tight">
              Ready to present<br />your idea?
            </h2>
            <p className="text-white/80 mb-10 relative">Seats and speaker slots are limited.</p>
            <MagneticButton
              as={Link}
              to="/register"
              className="relative inline-flex items-center gap-2 bg-paper text-ink px-8 py-4 rounded-full text-sm font-medium hover:bg-white hover:text-signal transition-colors"
            >
              Register for SIC 2026
              <ArrowRight size={16} />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}