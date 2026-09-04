import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  FileText,
  MonitorPlay,
  Users,
  ArrowRight,
  Calendar,
  Layers,
} from 'lucide-react'

const tracks = [
  { name: 'Paper presentation', desc: 'Submit and present original research across engineering disciplines.', icon: FileText, glow: 'shadow-glow-violet', border: 'hover:border-signal', chip: 'bg-signal-tint text-signal-dark' },
  { name: 'Project demo', desc: 'Show working builds, prototypes, and student-led products.', icon: MonitorPlay, glow: 'shadow-glow-cyan', border: 'hover:border-byte', chip: 'bg-byte-tint text-byte' },
  { name: 'Poster', desc: 'Visual summaries of ongoing or completed student work.', icon: Layers, glow: 'shadow-glow-violet', border: 'hover:border-signal', chip: 'bg-signal-tint text-signal-dark' },
  { name: 'Attendee', desc: 'Sit in on sessions, ask questions, meet people building things.', icon: Users, glow: 'shadow-glow-cyan', border: 'hover:border-byte', chip: 'bg-byte-tint text-byte' },
]

const timeline = [
  { label: 'Registration opens', date: 'Sept 2026', done: true },
  { label: 'Abstract deadline', date: '30 Sept 2026', done: false },
  { label: 'Shortlist announced', date: '7 Oct 2026', done: false },
  { label: 'Conference day', date: 'Eve of Innovation Day', done: false },
]

const heroLine = 'Student innovation conference 2026'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Landing() {
  const words = heroLine.split(' ')
  return (
    <div className="overflow-hidden">
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-28">
        <div className="absolute -top-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-signal/25 blur-[100px] animate-pulse-glow -z-10" />
        <div className="absolute top-32 -left-32 w-96 h-96 rounded-full bg-byte/20 blur-[100px] animate-drift -z-10" />
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

        <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] max-w-4xl mb-6" aria-label={heroLine}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block mr-[0.28em] ${i >= words.length - 2 ? 'gradient-text' : 'text-ink'}`}
              aria-hidden="true"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="text-muted max-w-content text-lg leading-relaxed mb-10"
        >
          Planned, run, and owned entirely by students — from call for papers to
          stage coordination — with faculty serving only as mentors. Registration
          and abstract submission are free; a ₹100 fee applies only if you're
          shortlisted for the final round.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-medium text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all"
          >
            Register now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#tracks"
            className="glass px-7 py-3.5 rounded-lg text-sm font-medium text-ink hover:border-signal hover:shadow-glow-soft transition-all"
          >
            View tracks
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="flex flex-wrap gap-8"
        >
          <Stat value="8" label="tracks open" accent="signal" />
          <Stat value="1" label="day event" accent="byte" />
          <Stat value="Free" label="to register" accent="byte" />
          <Stat value="₹100" label="if shortlisted" accent="signal" />
        </motion.div>
      </section>

      <section id="tracks" className="border-t border-rule relative">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="font-display text-4xl mb-12"
          >
            Conference <span className="gradient-text">tracks</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5">
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
                  whileHover={{ y: -6 }}
                  className={`glass rounded-2xl p-7 transition-all ${t.border} hover:${t.glow}`}
                >
                  <div className={`w-11 h-11 rounded-xl ${t.chip} flex items-center justify-center mb-5`}>
                    <Icon size={19} />
                  </div>
                  <p className="font-medium text-lg mb-1.5 text-ink">{t.name}</p>
                  <p className="text-sm text-muted leading-relaxed">{t.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="timeline" className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="font-display text-4xl mb-16"
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
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative rounded-3xl px-8 py-16 text-center overflow-hidden bg-aurora shadow-glow-violet"
          >
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-black/20 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-black/20 blur-3xl" />
            <h2 className="font-display text-3xl sm:text-4xl mb-3 relative text-white">
              Ready to present your idea?
            </h2>
            <p className="text-white/80 mb-8 relative">Seats and speaker slots are limited.</p>
            <Link
              to="/register"
              className="relative inline-flex items-center gap-2 bg-paper text-ink px-7 py-3.5 rounded-lg text-sm font-medium hover:bg-white hover:text-signal transition-colors"
            >
              Register for SIC 2026
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function Stat({ value, label, accent }) {
  const cls = accent === 'byte' ? 'text-byte' : 'text-signal-dark'
  return (
    <div className="font-mono text-sm">
      <p className={`text-2xl font-medium ${cls}`}>{value}</p>
      <p className="text-muted">{label}</p>
    </div>
  )
}
