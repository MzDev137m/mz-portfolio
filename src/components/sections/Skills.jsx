'use client'
import { motion } from 'framer-motion'

const skills = [
  {
    name: 'SQL Server',
    icon: '🗄️', level: 95, color: '#06b6d4',
    desc: 'Stored procedures, views, triggers, query optimization, indexing strategies, performance tuning on multi-million row tables.',
    tags: ['T-SQL', 'Query Optimization', 'Indexing', 'Triggers', 'Views'],
    badge: 'Expert',
  },
  {
    name: 'C# / .NET',
    icon: '⚡', level: 92, color: '#6366f1',
    desc: 'Enterprise application development with C#, .NET Framework/Core, clean architecture, design patterns, and SOLID principles.',
    tags: ['C# 10+', '.NET Framework', 'OOP', 'Design Patterns', 'LINQ'],
    badge: 'Expert',
  },
  {
    name: 'React & Next.js',
    icon: '⚛️', level: 85, color: '#61dafb',
    desc: 'Modern web applications with React 18 and Next.js — App Router, SSR, dynamic routing, API routes, and component-driven UI.',
    tags: ['React 18', 'Next.js 16', 'App Router', 'SSR', 'Hooks'],
    badge: 'Advanced',
  },
  {
    name: 'ASP.NET',
    icon: '🌐', level: 88, color: '#8b5cf6',
    desc: 'Full-stack web applications using ASP.NET MVC/Web API, building scalable REST APIs and enterprise web portals.',
    tags: ['MVC', 'Web API', 'REST', 'Razor Pages', 'Authentication'],
    badge: 'Advanced',
  },
  {
    name: 'Tailwind CSS',
    icon: '🌊', level: 88, color: '#38bdf8',
    desc: 'Utility-first CSS for pixel-perfect responsive interfaces — custom configs, animations, dark mode, and design systems.',
    tags: ['Utility CSS', 'Responsive', 'Custom Config', 'Animations', 'Dark Mode'],
    badge: 'Advanced',
  },
  {
    name: 'WinForms',
    icon: '🖥️', level: 93, color: '#10b981',
    desc: 'Rich desktop ERP interfaces with WinForms — custom controls, data grids, print previews, and complex business UI workflows.',
    tags: ['Custom Controls', 'DataGridView', 'MDI Apps', 'GDI+'],
    badge: 'Expert',
  },
  {
    name: 'ADO.NET',
    icon: '🔌', level: 90, color: '#0ea5e9',
    desc: 'High-performance data access layer using ADO.NET with DataAdapters, DataSets, SqlCommand optimizations and connection pooling.',
    tags: ['DataAdapter', 'DataSet', 'SqlCommand', 'Connection Pool'],
    badge: 'Expert',
  },
  {
    name: 'JavaScript / TS',
    icon: '🟨', level: 82, color: '#eab308',
    desc: 'Frontend interactivity, DOM manipulation, TypeScript type safety, AJAX calls, dynamic dashboard components, and animations.',
    tags: ['ES6+', 'TypeScript', 'AJAX', 'DOM', 'Chart.js'],
    badge: 'Advanced',
  },
  {
    name: 'Crystal Reports',
    icon: '📊', level: 87, color: '#f59e0b',
    desc: 'Business intelligence reporting — designing pixel-perfect reports, sub-reports, dynamic parameters, and scheduled exports.',
    tags: ['Report Design', 'Sub-Reports', 'Parameters', 'PDF Export'],
    badge: 'Advanced',
  },
  {
    name: 'ERP Automation',
    icon: '🤖', level: 94, color: '#ec4899',
    desc: 'End-to-end ERP automation — approval workflows, email alerts, scheduled jobs, auto-reports, and system integrations.',
    tags: ['Workflows', 'Email Alerts', 'Scheduled Jobs', 'Integration'],
    badge: 'Expert',
  },
  {
    name: 'Web UI & Design',
    icon: '🎨', level: 83, color: '#a78bfa',
    desc: 'Responsive web UI, admin panels, dashboards, and business websites — from concept to pixel-perfect deployment.',
    tags: ['Responsive', 'Admin Panels', 'Dashboards', 'Glassmorphism', 'Framer Motion'],
    badge: 'Advanced',
  },
  {
    name: 'Node / APIs',
    icon: '🔗', level: 76, color: '#34d399',
    desc: 'RESTful API design, Node.js backend services, HTTP clients, integration with third-party platforms and web services.',
    tags: ['REST API', 'Node.js', 'JSON', 'Axios', 'Webhooks'],
    badge: 'Proficient',
  },
]

const badgeColor = { Expert: '#6366f1', Advanced: '#06b6d4', Proficient: '#f59e0b' }

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative overflow-hidden"
      style={{ background: '#050510' }}>

      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <motion.p className="font-mono text-[11px] tracking-[.5em] uppercase text-cyan/60 mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            &lt;skills /&gt;
          </motion.p>
          <motion.h2 className="font-serif font-bold text-cream mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            Technical <span className="text-grad">Arsenal</span>
          </motion.h2>
          <motion.p className="font-sans text-slate/60 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Enterprise-grade tools for both backend systems and modern web applications
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((s, i) => (
            <motion.div key={s.name}
              className="product-card glass rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden cursor-default group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{ border: `1px solid ${s.color}18` }}>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${s.color}12 0%, transparent 70%)` }} />

              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-mono text-[9px] tracking-[.25em] uppercase px-2.5 py-1 rounded-full"
                  style={{ background: `${badgeColor[s.badge]}15`, color: badgeColor[s.badge], border: `1px solid ${badgeColor[s.badge]}30` }}>
                  {s.badge}
                </span>
              </div>

              {/* Name + bar */}
              <div>
                <h3 className="font-serif font-semibold text-cream text-lg leading-tight">{s.name}</h3>
                <div className="mt-2 h-[3px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="skill-bar-fill h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, delay: i * 0.06 + 0.3, ease: 'easeOut' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-mono text-[9px] text-slate/40">Proficiency</span>
                  <span className="font-mono text-[9px]" style={{ color: s.color }}>{s.level}%</span>
                </div>
              </div>

              <p className="font-sans text-[12px] text-slate/60 leading-relaxed flex-1">{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(t => (
                  <span key={t} className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}10`, color: `${s.color}cc`, border: `1px solid ${s.color}20` }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
