'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate as fAnimate } from 'framer-motion'

const ROLES = [
  'ERP Software Engineer',
  'Full-Stack Web Developer',
  'SQL Server Specialist',
  'Next.js & React Expert',
  'Enterprise Systems Builder',
  'UI/UX Web Developer',
]
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!*'
const STATS = [
  { value: 5,   suffix: '+', label: 'Years Experience' },
  { value: 20,  suffix: '+', label: 'Projects Delivered' },
  { value: 150, suffix: '+', label: 'SQL Procedures' },
  { value: 8,   suffix: '+', label: 'Web Platforms Built' },
]
const FIRST = 'Muzammal'
const LAST  = 'Tariq'
const TECH_FLOAT = [
  { text: '⚛ React',      color: '#61dafb', cls: 'left-[1%] top-[20%]', dur: 3.8, delay: 4.9 },
  { text: '▲ Next.js',    color: '#e2e8f0', cls: 'right-[1%] top-[17%]', dur: 4.2, delay: 5.1 },
  { text: '🗄 SQL Server', color: '#06b6d4', cls: 'left-[0%] top-[57%]', dur: 4.0, delay: 5.3 },
  { text: '⚡ C# .NET',   color: '#6366f1', cls: 'right-[0%] top-[54%]', dur: 4.4, delay: 5.5 },
  { text: '🌊 Tailwind',  color: '#38bdf8', cls: 'left-[3%] top-[79%]', dur: 3.6, delay: 5.7 },
  { text: '🟨 TypeScript', color: '#f59e0b', cls: 'right-[3%] top-[77%]', dur: 4.0, delay: 5.9 },
]

/* ── Scramble text effect ── */
function ScrambleRole({ text }) {
  const [display, setDisplay] = useState(text)
  const prev = useRef(text)
  useEffect(() => {
    if (prev.current === text) return
    prev.current = text
    let frame = 0
    const id = setInterval(() => {
      frame++
      const reveal = Math.floor((frame / 26) * text.length)
      setDisplay(text.split('').map((ch, i) => {
        if ([' ', '/', '&', '.', '+'].includes(ch)) return ch
        return i < reveal ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (frame >= 26) { setDisplay(text); clearInterval(id) }
    }, 36)
    return () => clearInterval(id)
  }, [text])
  return <>{display}</>
}

/* ── Counter animation ── */
function Counter({ to, suffix, startDelay }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      fAnimate(0, to, {
        duration: 2.4, ease: [0.16, 1, 0.3, 1],
        onUpdate: v => setVal(Math.round(v)),
      })
    }, startDelay)
    return () => clearTimeout(t)
  }, [to, startDelay])
  return <span>{val}{suffix}</span>
}

/* ── Magnetic CTA button ── */
function MagBtn({ children, primary, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 14 })
  const sy = useSpring(y, { stiffness: 200, damping: 14 })
  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.38)
    y.set((e.clientY - r.top - r.height / 2) * 0.38)
  }, [x, y])
  const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])
  return (
    <motion.button ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
      className={primary
        ? 'relative font-sans text-[12px] tracking-[.25em] uppercase px-11 py-4 rounded-full font-medium text-white overflow-hidden shadow-lg shadow-indigo/40 hover:shadow-indigo/70 transition-shadow duration-300'
        : 'font-sans text-[12px] tracking-[.25em] uppercase px-11 py-4 rounded-full border border-indigo/30 text-indigo hover:border-indigo/70 hover:bg-indigo/10 transition-all duration-300'
      }>
      {primary && (
        <span className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)' }} />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

function scrollTo(id) {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2, offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

const letterV = {
  hidden:  { opacity: 0, y: 80, rotateX: -80 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const canvasRef     = useRef(null)
  const cursorGlowRef = useRef(null)
  const [roleIdx, setRoleIdx] = useState(0)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smX = useSpring(mouseX, { stiffness: 25, damping: 20 })
  const smY = useSpring(mouseY, { stiffness: 25, damping: 20 })

  /* Parallax blob transforms */
  const b1x = useTransform(smX, [0, 1], ['-80px', '80px'])
  const b1y = useTransform(smY, [0, 1], ['-50px', '50px'])
  const b2x = useTransform(smX, [0, 1], ['90px', '-90px'])
  const b2y = useTransform(smY, [0, 1], ['-65px', '65px'])
  const b3x = useTransform(smX, [0, 1], ['-50px', '50px'])
  const b3y = useTransform(smY, [0, 1], ['45px', '-45px'])

  /* 3D title tilt */
  const rotY = useTransform(smX, [0, 1], [-6, 6])
  const rotX = useTransform(smY, [0, 1], [4, -4])

  /* Mouse tracking */
  useEffect(() => {
    const onMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.background =
          `radial-gradient(400px circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,.07) 0%, transparent 70%)`
      }
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  /* Role cycling */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3200)
    return () => clearInterval(id)
  }, [])

  /* Canvas particles */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const cols = ['99,102,241', '6,182,212', '245,158,11', '139,92,246', '16,185,129']
    const pts = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.38,    vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.6 + 0.25,
      color: cols[Math.floor(Math.random() * cols.length)],
      op: Math.random() * 0.45 + 0.05,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.op})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - d / 120)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise">

      {/* Gradient base layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(99,102,241,.3) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 40% at 88% 88%, rgba(6,182,212,.1) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 35% at 6% 60%, rgba(245,158,11,.07) 0%, transparent 60%)' }} />
      </div>

      {/* Cursor glow — DOM-manipulated directly to avoid re-renders */}
      <div ref={cursorGlowRef} className="absolute inset-0 pointer-events-none" style={{ transition: 'none' }} />

      {/* Canvas particle field */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Mouse-parallax blobs */}
      <motion.div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none blob"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%)', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', x: b1x, y: b1y, opacity: 0.7 }} />
      <motion.div className="absolute w-[520px] h-[520px] rounded-full pointer-events-none hidden md:block"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,.07) 0%, transparent 70%)', top: '22%', right: '4%', x: b2x, y: b2y }}
        animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-[360px] h-[360px] rounded-full pointer-events-none hidden md:block"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,.06) 0%, transparent 70%)', bottom: '12%', left: '4%', x: b3x, y: b3y }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Rotating orbital rings */}
      <motion.div className="absolute w-[820px] h-[820px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(99,102,241,.07)', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: 360 }} transition={{ duration: 55, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute w-[580px] h-[580px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(6,182,212,.05)', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: -360 }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(245,158,11,.04)', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />

      {/* Floating tech badges — desktop only */}
      {TECH_FLOAT.map((b) => (
        <motion.div key={b.text}
          className={`absolute hidden xl:flex items-center font-mono text-[10px] tracking-[.15em] px-3 py-1.5 rounded-full pointer-events-none ${b.cls}`}
          style={{ background: `${b.color}12`, border: `1px solid ${b.color}28`, color: b.color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { delay: b.delay, duration: 0.6 },
            scale: { delay: b.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            y: { delay: b.delay + 0.7, duration: b.dur, repeat: Infinity, ease: 'easeInOut' },
          }}>
          {b.text}
        </motion.div>
      ))}

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 4.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8">
          <span className="tech-tag text-[10px] inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for Web &amp; Enterprise Projects
          </span>
        </motion.div>

        {/* 3D-tilting name */}
        <div style={{ perspective: '900px' }} className="mb-5">
          <motion.div style={{ rotateX: rotX, rotateY: rotY }}>

            {/* Muzammal — staggered letters */}
            <motion.div
              className="flex justify-center font-serif font-bold text-cream overflow-hidden"
              style={{ fontSize: 'clamp(3.8rem, 11vw, 8rem)', letterSpacing: '-.04em', perspective: '600px' }}
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 4.3 } } }}>
              {FIRST.split('').map((ch, i) => (
                <motion.span key={i} variants={letterV}
                  style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>
                  {ch}
                </motion.span>
              ))}
            </motion.div>

            {/* Tariq — gradient, continued stagger */}
            <motion.div
              className="flex justify-center font-serif font-bold overflow-hidden"
              style={{ fontSize: 'clamp(3.8rem, 11vw, 8rem)', letterSpacing: '-.04em', perspective: '600px' }}
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 4.3 + FIRST.length * 0.055 } } }}>
              {LAST.split('').map((ch, i) => (
                <motion.span key={i} variants={letterV}
                  className="text-shimmer" style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>
                  {ch}
                </motion.span>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* Animated role — scramble effect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 h-9 flex items-center justify-center gap-2">
          <span className="font-mono text-[11px] sm:text-[13px] tracking-[.3em] uppercase text-indigo/50">&gt;_</span>
          <span className="font-mono text-[11px] sm:text-[13px] tracking-[.18em] uppercase text-cyan"
            style={{ minWidth: '280px', display: 'inline-block', textAlign: 'left' }}>
            <ScrambleRole text={ROLES[roleIdx]} />
          </span>
        </motion.div>

        {/* Gradient divider — scales in from center */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 5.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="divider-grad w-52 mb-8" style={{ height: '1px', transformOrigin: 'center' }} />

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-slate text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
          Building enterprise-grade ERP systems, modern web applications, and SQL Server powerhouses —
          from business websites &amp; admin dashboards to full-stack platforms, delivering
          precision, performance, and scale.
        </motion.p>

        {/* Stats with counter animation */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-8 sm:gap-14 mb-12 flex-wrap justify-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-orb text-2xl sm:text-3xl font-bold text-grad">
                <Counter to={s.value} suffix={s.suffix} startDelay={(5500 + i * 150)} />
              </span>
              <span className="font-sans text-[10px] tracking-[.2em] uppercase text-slate/55">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA — magnetic buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4">
          <MagBtn primary onClick={() => scrollTo('projects')}>View Projects</MagBtn>
          <MagBtn onClick={() => scrollTo('contact')}>Get In Touch</MagBtn>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.8, duration: 1 }}>
        <span className="font-mono text-[9px] tracking-[.4em] uppercase text-indigo/30">Scroll</span>
        <motion.div className="w-[1px] h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,.7), transparent)' }}
          animate={{ scaleY: [1, 0.25, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }} />
      </motion.div>
    </section>
  )
}
