'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Building2, MapPin, GraduationCap, Briefcase, Zap } from 'lucide-react'
import ProfileModal from '@/components/ui/ProfileModal'

const facts = [
  { Icon: Layers,         label: 'Specialization', value: 'ERP & Web Development',    color: '#6366f1' },
  { Icon: Building2,      label: 'Domain',          value: 'Enterprise & Web Software', color: '#06b6d4' },
  { Icon: MapPin,         label: 'Location',         value: 'Lahore, Pakistan',          color: '#f59e0b' },
  { Icon: GraduationCap,  label: 'Education',        value: 'BS CS — GCUF Faisalabad',    color: '#8b5cf6' },
  { Icon: Briefcase,      label: 'Experience',       value: '5+ Years Professional',      color: '#10b981' },
  { Icon: Zap,            label: 'Focus',            value: 'Full-Stack & Performance',   color: '#ec4899' },
]

const TAGS = ['C# .NET','SQL Server','ASP.NET','ADO.NET','WinForms','React','Next.js','Tailwind CSS','TypeScript','JavaScript','Crystal Reports','ERP Automation']
const BUILD = ['ERP Systems','Business Websites','Admin Dashboards','Web Applications','API Backends','BI Reports','Automation Engines','Responsive UI']

// Slide from alternating sides — different feel from Hero
const slideLeft  = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }
const slideRight = { hidden: { opacity: 0, x:  60 }, visible: { opacity: 1, x: 0 } }
const tr = (delay = 0) => ({ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] })

function ProfileAvatar({ size = 72, onClick }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <div className="relative flex-shrink-0 cursor-pointer group" style={{ width: size, height: size }}
      onClick={onClick} title="View Profile">
      <div className="absolute inset-0 rounded-full border-spin" style={{ padding: 2 }} />
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: '0 0 24px rgba(99,102,241,.5), 0 0 48px rgba(6,182,212,.2)' }} />
      <div className="absolute inset-[3px] rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
        style={{ background: 'rgba(10,10,30,.95)' }}>
        {imgOk ? (
          <img src="https://github.com/MzDev137m.png" alt="Muzammal Tariq"
            className="w-full h-full object-cover"
            onError={() => setImgOk(false)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-orb text-xl font-bold text-grad">MT</span>
          </div>
        )}
      </div>
      <div className="absolute inset-[3px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(99,102,241,.2)' }}>
        <span className="font-mono text-[7px] tracking-[.1em] text-cream/90">VIEW</span>
      </div>
    </div>
  )
}

export default function About() {
  const [profileOpen, setProfileOpen] = useState(false)
  return (
    <section id="about" className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080818 50%, #050510 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(6,182,212,.04) 0%, transparent 70%)' }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.012]"
        style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text (slides in from left) */}
          <motion.div
            variants={slideLeft} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={tr(0)}>

            <motion.p className="font-mono text-[11px] tracking-[.5em] uppercase text-cyan/60 mb-4"
              variants={slideLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={tr(0.05)}>
              &lt;about /&gt;
            </motion.p>
            <motion.h2 className="font-serif font-bold text-cream mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              variants={slideLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={tr(0.1)}>
              Engineering the{' '}
              <span className="text-grad">Enterprise &amp; Web</span>
            </motion.h2>

            <motion.div className="divider-grad mb-6" style={{ height: '1px', width: '80px' }}
              initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }} transition={{ ...tr(0.15), transformOrigin: 'left' }} />

            <motion.p className="font-sans text-slate leading-relaxed text-base mb-5"
              variants={slideLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={tr(0.18)}>
              Full-Stack .NET Developer &amp; ERP Engineer with 4+ years building and optimizing enterprise
              resource planning systems using ASP.NET Core, C#, and SQL Server. Specialized in performance
              tuning, workflow automation, and scalable ERP architecture across <span className="text-cyan/80">Finance</span>,{' '}
              <span className="text-indigo/80">HR</span>, <span className="text-amber-400/80">Production</span>,
              and <span className="text-emerald-400/80">Inventory</span> domains.
            </motion.p>

            <motion.p className="font-sans text-slate/70 leading-relaxed text-sm mb-5"
              variants={slideLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={tr(0.22)}>
              Proven track record — 80% system performance improvements, query execution reduced from 45s to
              under 10s, 99%+ uptime in live production. Built 10+ ERP modules serving 200+ daily users,
              centralized reporting systems, RBAC document management, and event-driven approval workflows
              that cut decision time by 50%.
            </motion.p>

            <motion.p className="font-sans text-slate/60 leading-relaxed text-sm mb-8"
              variants={slideLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={tr(0.25)}>
              On the web side: React, Next.js, and Tailwind CSS — delivering full-stack enterprise portals,
              interactive dashboards, and pixel-perfect UI using Clean Architecture and Agile/Scrum practices.
            </motion.p>

            <motion.div className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={tr(0.28)}>
              {TAGS.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </motion.div>
          </motion.div>

          {/* RIGHT — cards (slides in from right) */}
          <motion.div className="flex flex-col gap-5"
            variants={slideRight} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={tr(0.08)}>

            {/* Profile card */}
            <motion.div className="glass-indigo rounded-3xl p-8 relative overflow-hidden"
              whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
              <div className="scan-line opacity-30" />
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />

              <div className="flex items-center gap-5 mb-6">
                <ProfileAvatar size={72} onClick={() => setProfileOpen(true)} />
                <div>
                  <div className="font-serif font-bold text-cream text-xl">Muzammal Tariq</div>
                  <div className="font-mono text-[10px] tracking-[.2em] uppercase text-indigo/60 mt-1">ERP Engineer &amp; Web Developer</div>
                  <div className="font-mono text-[9px] tracking-[.15em] uppercase mt-1"
                    style={{ color: 'rgba(245,158,11,.6)' }}>MZ Corporations</div>
                </div>
              </div>

              <div className="divider-grad mb-5" style={{ height: '1px' }} />

              <div className="grid grid-cols-2 gap-3">
                {facts.map((f, i) => (
                  <motion.div key={f.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${f.color}14`, border: `1px solid ${f.color}28` }}>
                      <f.Icon size={13} style={{ color: f.color }} />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/50">{f.label}</div>
                      <div className="font-sans text-[12px] text-cream/80 mt-0.5">{f.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What I build */}
            <motion.div className="glass rounded-2xl p-5 flex flex-col gap-3"
              variants={slideRight} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={tr(0.2)}>
              <div className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/40 mb-1">What I Build</div>
              <div className="flex flex-wrap gap-2">
                {BUILD.map(item => (
                  <span key={item} className="font-mono text-[9px] px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(6,182,212,.08)', color: 'rgba(6,182,212,.8)', border: '1px solid rgba(6,182,212,.18)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div className="glass rounded-2xl p-5 flex items-center gap-4"
              variants={slideRight} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={tr(0.28)}>
              <div className="relative flex-shrink-0">
                <div className="ping-ring" style={{ borderColor: '#34d399' }} />
                <div className="w-3 h-3 rounded-full bg-emerald-400 relative z-10" style={{ boxShadow: '0 0 8px rgba(52,211,153,.7)' }} />
              </div>
              <div>
                <div className="font-sans text-sm text-cream/80 font-medium">Open to New Opportunities</div>
                <div className="font-mono text-[10px] tracking-[.2em] uppercase text-slate/50 mt-0.5">Enterprise · Web · Remote · Contract</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </section>
  )
}
