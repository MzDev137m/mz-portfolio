'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2024–Present',
    title: 'Senior ERP & Web Engineer',
    company: 'MZ Corporations',
    type: 'Full-time',
    color: '#6366f1',
    desc: 'Led end-to-end development of multi-module ERP suite and web-based admin portals covering HR, Finance, and Operations. Architected SQL Server database layer and React/Next.js frontend dashboards.',
    achievements: [
      'Reduced report generation time by 70% through query optimization',
      'Built dynamic approval workflow engine across 8 ERP modules',
      'Implemented automated payroll system for 500+ employees',
      'Designed real-time executive web dashboard suite with 40+ KPI widgets',
      'Developed responsive ASP.NET web portals for multi-department access',
    ],
  },
  {
    year: '2023',
    title: 'ERP Developer & Web Developer',
    company: 'Enterprise Systems Division',
    type: 'Full-time',
    color: '#06b6d4',
    desc: 'Core developer for Mess ERP system, SQL Server performance engineering, and web-based reporting interfaces. Wrote 150+ stored procedures and built web frontends with JavaScript and ASP.NET.',
    achievements: [
      'Built Mess ERP from scratch — deployed in production within 4 months',
      'Optimized 50+ slow queries — average 80% performance improvement',
      'Implemented full inventory management with low-stock alert system',
      'Created Crystal Reports library with 60+ designs + web export features',
      'Built web-based reporting dashboard consumed by 100+ daily users',
    ],
  },
  {
    year: '2022',
    title: 'Full-Stack .NET Developer',
    company: 'Software Development Team',
    type: 'Full-time',
    color: '#10b981',
    desc: 'Full-stack development using C#, ASP.NET MVC, WinForms, and JavaScript. Built desktop ERP modules, customer-facing web portals, REST APIs, and responsive admin dashboards.',
    achievements: [
      'Delivered 5 enterprise desktop applications using WinForms + SQL Server',
      'Built RESTful API layer consumed by mobile and web frontends',
      'Developed customer-facing web portal using ASP.NET MVC + Bootstrap',
      'Implemented ADO.NET data access layer with connection pooling',
      'Created responsive admin panel interfaces with JavaScript & jQuery',
    ],
  },
  {
    year: '2020',
    title: 'Junior Software Developer',
    company: 'IT Department',
    type: 'Full-time',
    color: '#f59e0b',
    desc: 'Started career building internal tools, database schemas, automation scripts, and simple web pages. Foundation in C#, SQL Server, WinForms, and HTML/CSS/JavaScript.',
    achievements: [
      'Designed and implemented first production SQL Server database schema',
      'Built internal HR attendance tracking system with WinForms UI',
      'Created automated email report system saving 3 hours daily',
      'Built first static business website using HTML, CSS & JavaScript',
    ],
  },
]

export default function Experience() {
  const lineRef = useRef(null)

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (!lineRef.current) return
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#experience', start: 'top 70%', end: 'bottom 30%', scrub: 1.5 } }
      )
    }
    init()
  }, [])

  return (
    <section id="experience" className="section-pad relative overflow-hidden"
      style={{ background: '#050510' }}>

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <motion.p className="font-mono text-[11px] tracking-[.5em] uppercase text-cyan/60 mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            &lt;experience /&gt;
          </motion.p>
          <motion.h2 className="font-serif font-bold text-cream"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            Career <span className="text-grad">Timeline</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-indigo/10 hidden md:block">
            <div ref={lineRef} className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,.6), rgba(6,182,212,.4))' }} />
          </div>

          <div className="flex flex-col gap-10">
            {timeline.map((t, i) => (
              <motion.div key={t.year}
                className={`flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>

                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-14' : 'md:pl-14'}`}>
                  <div className="glass rounded-2xl p-6 relative overflow-hidden"
                    style={{ maxWidth: '430px', marginLeft: i % 2 !== 0 ? '0' : 'auto', border: `1px solid ${t.color}18` }}>

                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }} />

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-orb text-[10px] tracking-[.3em]" style={{ color: t.color }}>{t.year}</span>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                        style={{ background: `${t.color}12`, color: `${t.color}aa`, border: `1px solid ${t.color}20` }}>
                        {t.type}
                      </span>
                    </div>

                    <h3 className="font-serif font-semibold text-cream text-lg mb-1">{t.title}</h3>
                    <p className="font-mono text-[10px] tracking-[.2em] uppercase text-slate/50 mb-3">{t.company}</p>
                    <p className="font-sans text-[13px] text-slate/65 leading-relaxed mb-4">{t.desc}</p>

                    <ul className="flex flex-col gap-1.5">
                      {t.achievements.map(a => (
                        <li key={a} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: t.color }} />
                          <span className="font-sans text-[11px] text-slate/60">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center relative z-10" style={{ minWidth: '16px' }}>
                  <div className="w-4 h-4 rounded-full border-2 border-dark"
                    style={{ background: t.color, boxShadow: `0 0 12px ${t.color}80` }} />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
