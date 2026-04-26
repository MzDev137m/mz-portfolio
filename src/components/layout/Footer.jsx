'use client'
import { motion } from 'framer-motion'

function scrollTo(id) {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2, offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

const nav = [
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
]

const stack = ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'TypeScript']

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#030308', borderTop: '1px solid rgba(99,102,241,.08)' }}>

      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,.5), rgba(6,182,212,.4), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center glow-indigo">
                <span className="font-orb text-sm font-bold text-grad">MZ</span>
              </div>
              <div>
                <div className="font-serif font-bold text-cream text-base">Muzammal Tariq</div>
                <div className="font-mono text-[9px] tracking-[.2em] uppercase text-indigo/50 mt-0.5">Senior ERP Engineer</div>
              </div>
            </div>
            <p className="font-sans text-[12px] text-slate/50 leading-relaxed">
              Building enterprise-grade ERP systems, SQL Server powerhouses,
              and automation engines that transform business operations.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="font-mono text-[9px] tracking-[.4em] uppercase text-slate/40 mb-5">Navigation</div>
            <ul className="flex flex-col gap-3">
              {nav.map(n => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)}
                    className="font-sans text-[13px] text-slate/60 hover:text-cream transition-colors duration-200 text-left">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="font-mono text-[9px] tracking-[.4em] uppercase text-slate/40 mb-5">Built With</div>
            <div className="flex flex-wrap gap-2">
              {stack.map(s => (
                <span key={s} className="font-mono text-[9px] px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(99,102,241,.08)', color: 'rgba(99,102,241,.7)', border: '1px solid rgba(99,102,241,.15)' }}>
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-slate/50">Open to Opportunities</span>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider-grad mb-6" style={{ height: '1px' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-slate/30">
            © {new Date().getFullYear()} Muzammal Tariq — All rights reserved
          </span>
          <span className="font-mono text-[10px] text-slate/20 tracking-[.2em]">
            Lahore, Pakistan · UTC+5
          </span>
        </div>
      </div>
    </footer>
  )
}
