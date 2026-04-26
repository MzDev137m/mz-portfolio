'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const contacts = [
  { icon: '📧', label: 'Email', value: 'muzammal.tariq@email.com', href: 'mailto:muzammal.tariq@email.com', color: '#6366f1' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/muzammal-tariq', href: 'https://linkedin.com/in/muzammal-tariq', color: '#0ea5e9' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/MzDev137m', href: 'https://github.com/MzDev137m', color: '#06b6d4' },
  { icon: '📍', label: 'Location', value: 'Lahore, Pakistan', href: null, color: '#f59e0b' },
]

const projectTypes = [
  'ERP System Development',
  'SQL Server Optimization',
  'ASP.NET Web Application',
  'Database Design & Architecture',
  'Automation & Workflows',
  'Enterprise Dashboard / BI',
  'Other',
]

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      await addDoc(collection(db, 'portfolio_contacts'), {
        ...form,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      console.error('Contact form error:', err)
    }
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080820 50%, #050510 100%)' }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p className="font-mono text-[11px] tracking-[.5em] uppercase text-cyan/60 mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            &lt;contact /&gt;
          </motion.p>
          <motion.h2 className="font-serif font-bold text-cream mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            Let&apos;s <span className="text-grad">Build Together</span>
          </motion.h2>
          <motion.p className="font-sans text-slate/60 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}>
            Ready to engineer your next enterprise system? Let&apos;s talk.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — contact info */}
          <div className="flex flex-col gap-6">
            <motion.div {...v(0.1)}>
              <p className="font-sans text-slate/70 leading-relaxed text-[14px] mb-8">
                Whether you need a full ERP system from scratch, SQL Server performance engineering,
                or an enterprise automation layer — I deliver production-grade solutions on time.
                Based in Lahore, open to remote and contract work worldwide.
              </p>
            </motion.div>

            {contacts.map((c, i) => (
              <motion.div key={c.label} {...v(0.15 + i * 0.08)}>
                {c.href && c.href !== '#' ? (
                  <a href={c.href}
                    className="glass rounded-2xl p-5 flex items-center gap-4 group transition-all duration-300 hover:scale-[1.01]"
                    style={{ border: `1px solid ${c.color}18`, textDecoration: 'none' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${c.color}12`, border: `1px solid ${c.color}25` }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[.3em] uppercase mb-0.5" style={{ color: `${c.color}99` }}>{c.label}</div>
                      <div className="font-sans text-[13px] text-cream/80 group-hover:text-cream transition-colors">{c.value}</div>
                    </div>
                    <div className="ml-auto font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.color }}>→</div>
                  </a>
                ) : (
                  <div className="glass rounded-2xl p-5 flex items-center gap-4"
                    style={{ border: `1px solid ${c.color}18` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${c.color}12`, border: `1px solid ${c.color}25` }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[.3em] uppercase mb-0.5" style={{ color: `${c.color}99` }}>{c.label}</div>
                      <div className="font-sans text-[13px] text-cream/80">{c.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Availability */}
            <motion.div {...v(0.5)} className="glass-indigo rounded-2xl p-5 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50 flex-shrink-0" />
              <div>
                <div className="font-sans text-sm text-cream/80 font-medium">Currently Available</div>
                <div className="font-mono text-[10px] tracking-[.2em] uppercase text-slate/50 mt-0.5">
                  Enterprise · Remote · Contract · Full-time
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div {...v(0.2)}>
            {sent ? (
              <motion.div
                className="glass-indigo rounded-3xl p-10 flex flex-col items-center text-center gap-5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}>
                <div className="text-5xl">✅</div>
                <h3 className="font-serif font-bold text-cream text-xl">Message Sent!</h3>
                <p className="font-sans text-slate/60 text-sm">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', type: '', message: '' }) }}
                  className="font-mono text-[10px] tracking-[.2em] uppercase px-6 py-2 rounded-full"
                  style={{ background: 'rgba(99,102,241,.15)', color: '#6366f1', border: '1px solid rgba(99,102,241,.3)' }}>
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}
                className="glass rounded-3xl p-8 flex flex-col gap-5 relative overflow-hidden"
                style={{ border: '1px solid rgba(99,102,241,.15)' }}>

                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4, transparent)' }} />

                <div className="font-mono text-[10px] tracking-[.3em] uppercase text-indigo/60 mb-1">
                  New Project Inquiry
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/50">Full Name</label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      className="font-sans text-[13px] text-cream rounded-xl px-4 py-3 outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(99,102,241,.2)', color: 'var(--cream)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,.2)'}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/50">Email Address</label>
                    <input
                      type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className="font-sans text-[13px] rounded-xl px-4 py-3 outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(99,102,241,.2)', color: 'var(--cream)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,.2)'}
                    />
                  </div>
                </div>

                {/* Project type */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/50">Project Type</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="font-sans text-[13px] rounded-xl px-4 py-3 outline-none transition-all duration-200 cursor-pointer"
                    style={{ background: 'rgba(10,10,30,.95)', border: '1px solid rgba(99,102,241,.2)', color: form.type ? 'var(--cream)' : 'rgba(148,163,184,.5)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,.2)'}>
                    <option value="" disabled>Select project type...</option>
                    {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/50">Message</label>
                  <textarea name="message" required value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell me about your project — scope, timeline, requirements..."
                    className="font-sans text-[13px] rounded-xl px-4 py-3 outline-none resize-none transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(99,102,241,.2)', color: 'var(--cream)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,.2)'}
                  />
                </div>

                <button type="submit" disabled={sending}
                  className="font-sans text-[12px] tracking-[.25em] uppercase px-8 py-3.5 rounded-full font-medium
                    transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', boxShadow: '0 8px 24px rgba(99,102,241,.35)' }}>
                  {sending ? '⏳ Sending...' : '🚀 Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
