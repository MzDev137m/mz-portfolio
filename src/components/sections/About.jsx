'use client'
import { motion } from 'framer-motion'

const facts = [
  { icon: '⚙️', label: 'Specialization',  value: 'ERP & Web Development' },
  { icon: '🏢', label: 'Domain',           value: 'Enterprise & Web Software' },
  { icon: '📍', label: 'Location',         value: 'Lahore, Pakistan' },
  { icon: '🎓', label: 'Education',        value: 'BS Computer Science' },
  { icon: '💼', label: 'Experience',       value: '5+ Years Professional' },
  { icon: '🚀', label: 'Focus',            value: 'Full-Stack & Performance' },
]

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080818 50%, #050510 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(6,182,212,.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <motion.p {...v(0)} className="font-mono text-[11px] tracking-[.5em] uppercase text-cyan/60 mb-4">
              &lt;about /&gt;
            </motion.p>
            <motion.h2 {...v(0.1)} className="font-serif font-bold text-cream mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              Engineering the{' '}
              <span className="text-grad">Enterprise & Web</span>
            </motion.h2>

            <motion.div {...v(0.2)} className="divider-grad mb-6" style={{ height: '1px', width: '80px' }} />

            <motion.p {...v(0.25)} className="font-sans text-slate leading-relaxed text-base mb-5">
              I am a passionate Full-Stack Developer and ERP Software Engineer with deep expertise in
              designing, building, and deploying enterprise resource planning systems and modern web
              applications. From HR and Finance ERP modules to business websites, admin dashboards,
              and responsive web platforms — I build systems that last.
            </motion.p>

            <motion.p {...v(0.3)} className="font-sans text-slate/70 leading-relaxed text-sm mb-8">
              My stack spans both worlds: SQL Server performance engineering on the backend, and
              React, Next.js, and Tailwind CSS on the frontend — delivering full-stack enterprise
              solutions, interactive web experiences, and pixel-perfect UI implementations.
            </motion.p>

            {/* Tags */}
            <motion.div {...v(0.35)} className="flex flex-wrap gap-2">
              {['C# .NET', 'SQL Server', 'ASP.NET', 'ADO.NET', 'WinForms', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'Crystal Reports', 'ERP Automation'].map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Right — glass card + facts */}
          <div className="flex flex-col gap-5">
            {/* Profile card */}
            <motion.div {...v(0.15)} className="glass-indigo rounded-3xl p-8 relative overflow-hidden">
              <div className="scan-line opacity-30" />
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />

              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center glow-indigo">
                  <span className="font-orb text-xl font-bold text-grad">MT</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-cream text-xl">Muzammal Tariq</div>
                  <div className="font-mono text-[10px] tracking-[.2em] uppercase text-indigo/60 mt-1">ERP Engineer & Web Developer</div>
                </div>
              </div>

              <div className="divider-grad mb-5" style={{ height: '1px' }} />

              <div className="grid grid-cols-2 gap-3">
                {facts.map(f => (
                  <div key={f.label} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{f.icon}</span>
                    <div>
                      <div className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/50">{f.label}</div>
                      <div className="font-sans text-[12px] text-cream/80 mt-0.5">{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What I build */}
            <motion.div {...v(0.25)} className="glass rounded-2xl p-5 flex flex-col gap-3">
              <div className="font-mono text-[9px] tracking-[.3em] uppercase text-slate/40 mb-1">What I Build</div>
              <div className="flex flex-wrap gap-2">
                {['ERP Systems', 'Business Websites', 'Admin Dashboards', 'Web Applications', 'API Backends', 'BI Reports', 'Automation Engines', 'Responsive UI'].map(item => (
                  <span key={item} className="font-mono text-[9px] px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(6,182,212,.08)', color: 'rgba(6,182,212,.8)', border: '1px solid rgba(6,182,212,.18)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div {...v(0.3)} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
              <div>
                <div className="font-sans text-sm text-cream/80 font-medium">Open to New Opportunities</div>
                <div className="font-mono text-[10px] tracking-[.2em] uppercase text-slate/50 mt-0.5">Enterprise · Web · Remote · Contract</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
