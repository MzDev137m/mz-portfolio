'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { ExternalLink, X, CheckCircle2 } from 'lucide-react'

const projects = [
  {
    id: 1, name: 'HR Management ERP', label: 'Enterprise Module', icon: '👥', color: '#6366f1', year: '2024', status: 'Production',
    desc: 'Complete HR module handling employee lifecycle — recruitment, attendance, payroll, leaves, appraisals, and departmental workflows with automated email notifications.',
    tech: ['C#', 'WinForms', 'SQL Server', 'Crystal Reports', 'ADO.NET'],
    features: ['Multi-level Approval Workflows', 'Automated Payroll Engine', 'Leave Management System', 'Crystal Reports Dashboard', 'Email Alert Integration'],
    metrics: [{ label: 'Employees', value: '500+' }, { label: 'Reports', value: '50+' }, { label: 'Modules', value: '12' }],
  },
  {
    id: 2, name: 'Finance & Accounts ERP', label: 'Enterprise Module', icon: '💰', color: '#10b981', year: '2024', status: 'Production',
    desc: 'Full-scale finance module with General Ledger, Accounts Payable/Receivable, bank reconciliation, budget management, and multi-currency support.',
    tech: ['C#', 'ASP.NET', 'SQL Server', 'ADO.NET', 'JavaScript'],
    features: ['General Ledger Engine', 'Bank Reconciliation', 'Multi-currency Support', 'Budget vs Actual Reports', 'Tax Calculations'],
    metrics: [{ label: 'Txn/Day', value: '10K+' }, { label: 'Procedures', value: '80+' }, { label: 'Report Types', value: '25' }],
  },
  {
    id: 3, name: 'Wedding Invitation Platform', label: 'Web Application', icon: '💍', color: '#ec4899', year: '2025', status: 'Production',
    desc: 'Cinematic wedding invitation web app with animated hero, RSVP system, countdown timer, gallery, venue maps, love story timeline, and a full admin dashboard.',
    tech: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    features: ['Animated Section Reveals', 'Admin CRUD Dashboard', 'Dynamic Countdown Timer', 'RSVP Form System', 'Live Gallery Management'],
    metrics: [{ label: 'Sections', value: '8' }, { label: 'Admin Mods', value: '5' }, { label: 'Uptime', value: '100%' }],
  },
  {
    id: 4, name: 'Cloth House E-Commerce', label: 'Web Platform', icon: '🛍️', color: '#f59e0b', year: '2025', status: 'Production',
    desc: 'Full-featured retail web application with product catalog, shopping cart, PIN-secured admin panel, inventory management, and order tracking.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Admin Panel'],
    features: ['Product Catalog & Cart', 'PIN-Secured Admin Panel', 'Inventory Management', 'Order Tracking System', 'Responsive Mobile UI'],
    metrics: [{ label: 'Products', value: '100+' }, { label: 'Admin Feats', value: '15+' }, { label: 'Mobile', value: '100%' }],
  },
  {
    id: 5, name: 'Mess ERP System', label: 'Full System', icon: '🍽️', color: '#06b6d4', year: '2023', status: 'Production',
    desc: 'Complete mess management system for institutional dining — menu planning, daily consumption tracking, inventory management, billing, and nutritional reporting.',
    tech: ['C#', 'WinForms', 'SQL Server', 'Crystal Reports'],
    features: ['Menu Planning Engine', 'Stock Consumption Tracking', 'Automated Billing', 'Inventory Alerts', 'Nutritional Analysis Reports'],
    metrics: [{ label: 'Daily Users', value: '200+' }, { label: 'Items', value: '500+' }, { label: 'Uptime', value: '99.9%' }],
  },
  {
    id: 6, name: 'SQL Performance Engine', label: 'Infrastructure', icon: '⚡', color: '#8b5cf6', year: '2023', status: 'Ongoing',
    desc: 'Database optimization framework — query performance analysis, index strategy implementation, execution plan tuning, and automated performance monitoring.',
    tech: ['T-SQL', 'SQL Server', 'DMVs', 'Query Analyzer', 'SSMS'],
    features: ['Execution Plan Optimization', 'Index Strategy Design', 'Query Caching Patterns', 'DMV Monitoring Dashboards', 'Auto Maintenance Jobs'],
    metrics: [{ label: 'Speed Gain', value: '80%' }, { label: 'DB Handled', value: '50GB+' }, { label: 'Procedures', value: '150+' }],
  },
  {
    id: 7, name: 'Approval Workflow Engine', label: 'Automation', icon: '✅', color: '#0ea5e9', year: '2024', status: 'Production',
    desc: 'Dynamic multi-level approval system used across HR, Finance, and Procurement — configurable workflows with escalation rules, deadline tracking, and audit trails.',
    tech: ['C#', 'SQL Server', 'ASP.NET', 'Email API', 'ADO.NET'],
    features: ['Dynamic Workflow Builder', 'Multi-level Escalation', 'Email Notification Engine', 'Audit Trail & Logging', 'Mobile-friendly Approval UI'],
    metrics: [{ label: 'Workflows', value: '20+' }, { label: 'Approvals/Mo', value: '2K+' }, { label: 'Integrations', value: '8' }],
  },
  {
    id: 8, name: 'Enterprise Dashboard Suite', label: 'BI & Analytics', icon: '📊', color: '#a78bfa', year: '2024', status: 'Production',
    desc: 'Real-time executive dashboards with KPI tracking, drill-down reports, trend analysis, and automated daily/weekly/monthly report distribution via email.',
    tech: ['Crystal Reports', 'ASP.NET', 'JavaScript', 'SQL Server', 'Chart.js'],
    features: ['Real-time KPI Widgets', 'Drill-down Report Engine', 'Auto-scheduled Reports', 'Export PDF/Excel', 'Role-based Dashboard Access'],
    metrics: [{ label: 'Widgets', value: '40+' }, { label: 'Templates', value: '60+' }, { label: 'Daily Reports', value: '15' }],
  },
  {
    id: 9, name: 'Real Estate Management System', label: 'Web Application', icon: '🏢', color: '#0ea5e9', year: '2023', status: 'Production',
    desc: 'Scalable multi-module property and services management system with RBAC-based access control — covering property listings, tenant management, service requests, and secure document workflows with role-based admin portals.',
    tech: ['ASP.NET', 'SQL Server', 'RBAC', 'HTML', 'CSS', 'Bootstrap'],
    features: ['RBAC-based Access Control', 'Multi-module Property Management', 'Tenant & Service Request Tracking', 'Secure Document Workflows', 'Role-based Admin Panel'],
    metrics: [{ label: 'Modules', value: '5+' }, { label: 'User Roles', value: '4' }, { label: 'Security', value: 'RBAC' }],
  },
  {
    id: 10, name: 'Cinematic Portfolio Platform', label: 'Web Application', icon: '🌐', color: '#34d399', year: '2025', status: 'Production',
    liveUrl: 'https://mz-portfolio-liard.vercel.app',
    desc: 'This portfolio — built with Next.js 16, Framer Motion, GSAP, canvas particle animations, magnetic buttons, 3D tilt cards, laser beams, and bokeh depth effects.',
    tech: ['Next.js 16', 'React 18', 'Framer Motion', 'GSAP', 'Tailwind CSS', 'Canvas API'],
    features: ['Canvas Particle Network', 'Text Scramble Animation', 'Magnetic CTA Buttons', '3D Card Tilt Effects', 'GSAP ScrollTrigger Timeline'],
    metrics: [{ label: 'Sections', value: '7' }, { label: 'Animations', value: '35+' }, { label: 'Perf Score', value: '98+' }],
  },
]

const statusColor = { Production: '#10b981', Ongoing: '#f59e0b', Development: '#6366f1' }

// ─── Project Detail Dialog ─────────────────────────────────────────

function ProjectDialog({ p, open, onClose }) {
  return (
    <Dialog.Root open={open} onOpenChange={v => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="radix-dialog-overlay" />
        <Dialog.Content className="radix-dialog-content">

          {/* Close button */}
          <Dialog.Close asChild>
            <button className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/10 z-10"
              style={{ border: '1px solid rgba(255,255,255,.12)' }}>
              <X size={15} className="text-slate/70" />
            </button>
          </Dialog.Close>

          {/* Glowing top bar */}
          <div className="h-[2px] w-full rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${p.color}55, ${p.color}, ${p.color}55)` }} />

          <div className="p-7 sm:p-9 overflow-y-auto max-h-[80vh]">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${p.color}14`, border: `1px solid ${p.color}30` }}>
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-mono text-[9px] tracking-[.25em] uppercase" style={{ color: `${p.color}99` }}>
                    {p.label} · {p.year}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1.5"
                    style={{ background: `${statusColor[p.status]}12`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}25` }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusColor[p.status] }} />
                    {p.status}
                  </span>
                </div>
                <Dialog.Title className="font-serif font-bold text-cream text-xl leading-tight">{p.name}</Dialog.Title>
              </div>
            </div>

            {/* Description */}
            <Dialog.Description className="font-sans text-slate/70 text-[14px] leading-relaxed mb-6">
              {p.desc}
            </Dialog.Description>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {p.metrics.map(m => (
                <div key={m.label} className="text-center py-3 rounded-xl"
                  style={{ background: `${p.color}09`, border: `1px solid ${p.color}18` }}>
                  <div className="font-orb text-lg font-bold" style={{ color: p.color }}>{m.value}</div>
                  <div className="font-mono text-[9px] text-slate/45 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-6">
              <div className="font-mono text-[10px] tracking-[.3em] uppercase mb-3" style={{ color: p.color }}>
                Key Features
              </div>
              <ul className="flex flex-col gap-2.5">
                {p.features.map((f, i) => (
                  <motion.li key={f} className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}>
                    <CheckCircle2 size={14} style={{ color: p.color, flexShrink: 0 }} />
                    <span className="font-sans text-[13px] text-slate/75">{f}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mb-6">
              <div className="font-mono text-[10px] tracking-[.3em] uppercase mb-3 text-slate/50">
                Technology Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="font-mono text-[10px] px-3 py-1 rounded-full"
                    style={{ background: `${p.color}12`, color: `${p.color}cc`, border: `1px solid ${p.color}25` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Live link */}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-sans text-[12px] tracking-[.2em] uppercase px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${p.color}20, ${p.color}10)`, color: p.color, border: `1px solid ${p.color}35`, boxShadow: `0 4px 20px ${p.color}20` }}>
                <ExternalLink size={13} />
                View Live Project
              </a>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// ─── Project Card ──────────────────────────────────────────────────

function ProjectCard({ p, i, onOpenDialog }) {
  const wrapRef = useRef(null)
  const rx  = useMotionValue(0)
  const ry  = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 20 })
  const sry = useSpring(ry, { stiffness: 180, damping: 20 })
  const [expanded, setExpanded] = useState(false)

  const onMove = useCallback((e) => {
    if (!wrapRef.current) return
    const r  = wrapRef.current.getBoundingClientRect()
    const cx = (e.clientX - r.left) / r.width
    const cy = (e.clientY - r.top)  / r.height
    rx.set((cy - 0.5) * -10)
    ry.set((cx - 0.5) *  10)
  }, [rx, ry])

  const onLeave = useCallback(() => { rx.set(0); ry.set(0) }, [rx, ry])

  return (
    <motion.div
      ref={wrapRef}
      style={{ perspective: '1000px' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0.78, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.11, ease: [0.16, 1, 0.3, 1] }}>
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="product-card glass rounded-2xl overflow-hidden group relative"
        whileHover={{ scale: 1.015 }}>

        {/* Top color bar */}
        <div className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, ${p.color}44, ${p.color}, ${p.color}44)` }} />

        <div className="card-glint" />
        <span className="card-num">{String(i + 1).padStart(2, '0')}</span>

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${p.color}12 0%, transparent 65%)` }} />

        <div className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${p.color}12`, border: `1px solid ${p.color}28` }}
                whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.4 }}>
                {p.icon}
              </motion.div>
              <div>
                <span className="font-mono text-[9px] tracking-[.25em] uppercase" style={{ color: `${p.color}99` }}>
                  {p.label} · {p.year}
                </span>
                <h3 className="font-serif font-semibold text-cream text-base leading-tight mt-0.5">{p.name}</h3>
              </div>
            </div>
            <span className="font-mono text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1.5 flex-shrink-0"
              style={{ background: `${statusColor[p.status]}12`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}25` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusColor[p.status] }} />
              {p.status}
            </span>
          </div>

          <p className="font-sans text-[13px] text-slate/65 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-white/5">
            {p.metrics.map(m => (
              <div key={m.label} className="text-center py-2 rounded-lg"
                style={{ background: `${p.color}08`, border: `1px solid ${p.color}15` }}>
                <div className="font-orb text-sm font-bold" style={{ color: p.color }}>{m.value}</div>
                <div className="font-mono text-[8px] text-slate/40 mt-0.5 leading-tight">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.tech.map(t => (
              <span key={t} className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                style={{ background: `${p.color}10`, color: `${p.color}bb`, border: `1px solid ${p.color}20` }}>
                {t}
              </span>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDialog(p)}
              className="font-mono text-[9px] tracking-[.2em] uppercase px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
              style={{ background: `${p.color}14`, color: p.color, border: `1px solid ${p.color}28` }}>
              View Details
            </button>
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[.2em] uppercase px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(52,211,153,.1)', color: '#34d399', border: '1px solid rgba(52,211,153,.25)' }}>
                <ExternalLink size={9} />
                Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ───────────────────────────────────────────────────────

export default function Projects() {
  const [dialogProject, setDialogProject] = useState(null)

  return (
    <section id="projects" className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080820 50%, #050510 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,.04) 0%, transparent 70%)' }} />

      {/* Pulsing dot matrix — unique to Projects section */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle 1.5px at 1px 1px, rgba(99,102,241,0.9) 0%, transparent 0%)',
          backgroundSize: '48px 48px',
        }}
        animate={{ opacity: [0.04, 0.10, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary offset dots */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle 1px at 1px 1px, rgba(6,182,212,0.9) 0%, transparent 0%)',
          backgroundSize: '48px 48px',
          backgroundPosition: '24px 24px',
        }}
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p className="font-mono text-[11px] tracking-[.5em] uppercase text-cyan/60 mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            &lt;projects /&gt;
          </motion.p>
          <motion.h2 className="font-serif font-bold text-cream mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            Shipped <span className="text-grad">Production Systems</span>
          </motion.h2>
          <motion.div className="divider-grad w-40 mx-auto mb-4"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          <motion.p className="font-sans text-slate/60 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.25 }}>
            Enterprise ERP systems, web platforms, and automation engines — click a card for full details
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onOpenDialog={setDialogProject} />
          ))}
        </div>
      </div>

      {/* Dialog */}
      {dialogProject && (
        <ProjectDialog
          p={dialogProject}
          open={!!dialogProject}
          onClose={() => setDialogProject(null)}
        />
      )}
    </section>
  )
}
