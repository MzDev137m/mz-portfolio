'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate as fAnimate } from 'framer-motion'
import { Mail, ArrowRight, MapPin } from 'lucide-react'
import ProfileModal from '@/components/ui/ProfileModal'

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c.957.005 1.922.128 2.923.374 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedinIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function WhatsappIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  )
}

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
  { value: 5,   suffix: '+', label: 'Years Exp',  color: '#6366f1' },
  { value: 20,  suffix: '+', label: 'Projects',   color: '#06b6d4' },
  { value: 150, suffix: '+', label: 'SQL Procs',  color: '#f59e0b' },
  { value: 8,   suffix: '+', label: 'Web Builds', color: '#8b5cf6' },
]
const SOCIALS = [
  { Icon: GithubIcon,    href: 'https://github.com/MzDev137m',                        label: 'GitHub'    },
  { Icon: LinkedinIcon,  href: 'https://linkedin.com/in/muzammal-tariq',              label: 'LinkedIn'  },
  { Icon: Mail,          href: 'mailto:m.muzammal.dev@gmail.com',                     label: 'Email'     },
  { Icon: WhatsappIcon,  href: 'https://wa.me/923004783996',                          label: 'WhatsApp'  },
]
const BOKEH = [
  { w:260, h:260, top:'8%',    left:'5%',   bg:'rgba(99,102,241,.08)',  dur:'9s',  delay:'0s'   },
  { w:180, h:180, top:'55%',   right:'4%',  bg:'rgba(6,182,212,.07)',   dur:'11s', delay:'2.5s' },
  { w:120, h:120, top:'35%',   left:'1%',   bg:'rgba(245,158,11,.06)',  dur:'7s',  delay:'1s'   },
  { w:150, h:150, bottom:'18%',right:'8%',  bg:'rgba(139,92,246,.06)',  dur:'10s', delay:'3s'   },
]
const LASERS = [
  { top:'28%', color:'rgba(99,102,241,.55),rgba(6,182,212,.4)',   dur:'10s', delay:'0.5s' },
  { top:'67%', color:'rgba(6,182,212,.4),rgba(139,92,246,.35)',   dur:'13s', delay:'4s'   },
  { top:'47%', color:'rgba(245,158,11,.3),rgba(99,102,241,.3)',   dur:'16s', delay:'8s'   },
]
const ORBITS = [
  {
    radius: 100, duration: 16, dir:  1,
    ring: 'rgba(99,102,241,.15)',
    items: [
      { icon: '⚛', color: '#61dafb', label: 'React'   },
      { icon: '▲', color: '#e2e8f0', label: 'Next.js' },
    ],
  },
  {
    radius: 150, duration: 26, dir: -1,
    ring: 'rgba(6,182,212,.12)',
    items: [
      { icon: '🗄', color: '#06b6d4', label: 'SQL'      },
      { icon: '⚡', color: '#6366f1', label: 'C# .NET'  },
      { icon: '🌊', color: '#38bdf8', label: 'Tailwind' },
    ],
  },
  {
    radius: 198, duration: 38, dir:  1,
    ring: 'rgba(245,158,11,.09)',
    items: [
      { icon: '🤖', color: '#ec4899', label: 'ERP'        },
      { icon: '🟨', color: '#f59e0b', label: 'TypeScript' },
      { icon: '🌐', color: '#8b5cf6', label: 'ASP.NET'    },
    ],
  },
]
const FIRST = 'Muzammal'
const LAST  = 'Tariq'

// ─── Sub-components ───────────────────────────────────────────────

function ScrambleRole({ text }) {
  const [display, setDisplay] = useState(text)
  const prev = useRef(text)
  useEffect(() => {
    if (prev.current === text) return
    prev.current = text
    let frame = 0
    const id = setInterval(() => {
      frame++
      const reveal = Math.floor((frame / 24) * text.length)
      setDisplay(text.split('').map((ch, i) => {
        if ([' ', '/', '&', '.', '+'].includes(ch)) return ch
        return i < reveal ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (frame >= 24) { setDisplay(text); clearInterval(id) }
    }, 36)
    return () => clearInterval(id)
  }, [text])
  return <>{display}</>
}

function Counter({ to, suffix, startDelay, color }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      fAnimate(0, to, {
        duration: 2.2, ease: [0.16, 1, 0.3, 1],
        onUpdate: v => setVal(Math.round(v)),
      })
    }, startDelay)
    return () => clearTimeout(t)
  }, [to, startDelay])
  return (
    <span className="font-orb text-2xl sm:text-3xl font-bold"
      style={{ color, filter: `drop-shadow(0 0 18px ${color}55)` }}>
      {val}{suffix}
    </span>
  )
}

function MagBtn({ children, primary, onClick, icon: Icon }) {
  const ref  = useRef(null)
  const x    = useMotionValue(0)
  const y    = useMotionValue(0)
  const sx   = useSpring(x, { stiffness: 200, damping: 14 })
  const sy   = useSpring(y, { stiffness: 200, damping: 14 })
  const move = useCallback(e => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width  / 2) * 0.4)
    y.set((e.clientY - r.top  - r.height / 2) * 0.4)
  }, [x, y])
  const leave = useCallback(() => { x.set(0); y.set(0) }, [x, y])
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={move} onMouseLeave={leave} onClick={onClick}
      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
      className={`relative font-sans text-[12px] tracking-[.22em] uppercase px-9 py-3.5 rounded-full font-semibold flex items-center gap-2.5 overflow-hidden ${
        primary
          ? 'text-white'
          : 'border border-indigo/30 text-cream/80 hover:border-indigo/60 hover:bg-indigo/10 transition-all duration-300'
      }`}>
      {primary && (
        <>
          <span className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6 50%, #06b6d4)' }} />
          <span className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 8px 30px rgba(99,102,241,.5), 0 0 60px rgba(6,182,212,.2)' }} />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {Icon && <Icon size={13} />}
      </span>
    </motion.button>
  )
}

function OrbRing({ o, delay }) {
  return (
    <motion.div className="absolute rounded-full"
      style={{
        width: o.radius * 2, height: o.radius * 2,
        top: '50%', left: '50%',
        translateX: '-50%', translateY: '-50%',
        border: `1px solid ${o.ring}`,
      }}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1, rotate: o.dir * 360 }}
      transition={{
        opacity: { duration: 0.9, delay },
        scale:   { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
        rotate:  { duration: o.duration, repeat: Infinity, ease: 'linear' },
      }}>
      {o.items.map((item, i) => {
        const angle = (i / o.items.length) * 360
        const rad   = (angle * Math.PI) / 180
        const px    = Math.sin(rad) * o.radius + o.radius
        const py    = -Math.cos(rad) * o.radius + o.radius
        return (
          <motion.div key={i} className="absolute"
            style={{ left: px, top: py, translateX: '-50%', translateY: '-50%' }}
            animate={{ rotate: -o.dir * 360 }}
            transition={{ duration: o.duration, repeat: Infinity, ease: 'linear' }}>
            <div title={item.label}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] select-none"
              style={{
                background: `${item.color}14`,
                border: `1px solid ${item.color}35`,
                boxShadow: `0 0 18px ${item.color}22`,
              }}>
              {item.icon}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function ProfileVisual({ onAvatarClick }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <motion.div className="relative flex items-center justify-center"
      style={{ width: 460, height: 460 }}>
      {/* Ambient glow behind rings */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,.07) 0%, transparent 65%)' }} />

      {ORBITS.map((o, i) => <OrbRing key={i} o={o} delay={4.4 + i * 0.15} />)}

      {/* Center avatar — clickable */}
      <motion.div className="relative z-10 cursor-pointer group"
        style={{ width: 140, height: 140 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.6, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        onClick={onAvatarClick}
        title="View Profile">
        {/* Animated gradient ring */}
        <div className="absolute inset-0 rounded-full border-spin" />
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full transition-all duration-300"
          style={{ boxShadow: '0 0 40px rgba(99,102,241,.6), 0 0 80px rgba(6,182,212,.25)' }} />
        {/* Photo or initials */}
        <div className="absolute inset-[3px] rounded-full overflow-hidden"
          style={{ background: '#060618' }}>
          {imgOk ? (
            <img src="https://github.com/MzDev137m.png" alt="Muzammal Tariq"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgOk(false)} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1">
              <span className="font-orb text-2xl font-bold text-grad">MT</span>
              <span className="font-mono text-[7px] tracking-[.18em] text-indigo/50">ERP · WEB</span>
            </div>
          )}
        </div>
        {/* Click hint */}
        <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(99,102,241,.18)' }}>
          <span className="font-mono text-[8px] tracking-[.15em] text-cream/90">VIEW</span>
        </div>
      </motion.div>

      {/* Floating: Open to Work */}
      <motion.div className="absolute glass-indigo rounded-xl px-3 py-2 flex items-center gap-2"
        style={{ bottom: '13%', right: '0%', border: '1px solid rgba(99,102,241,.22)', zIndex: 20 }}
        initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 5.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        <span className="font-mono text-[9px] tracking-[.15em] text-cream/70 whitespace-nowrap">Open to Work</span>
      </motion.div>

      {/* Floating: MZ Corp */}
      <motion.div className="absolute glass rounded-xl px-3 py-2 text-center"
        style={{ top: '12%', left: '5%', border: '1px solid rgba(245,158,11,.22)', zIndex: 20 }}
        initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 5.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <div className="font-mono text-[9px] tracking-[.2em] uppercase"
          style={{ color: 'rgba(245,158,11,.75)' }}>MZ Corp</div>
        <div className="font-mono text-[7px] tracking-[.12em] text-slate/45 mt-0.5">Lahore, PK</div>
      </motion.div>
    </motion.div>
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
  visible: { opacity: 1, y: 0,  rotateX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Main Component ───────────────────────────────────────────────

export default function Hero() {
  const canvasRef = useRef(null)
  const glowRef   = useRef(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [profileOpen, setProfileOpen] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smX    = useSpring(mouseX, { stiffness: 25, damping: 20 })
  const smY    = useSpring(mouseY, { stiffness: 25, damping: 20 })
  const rotY   = useTransform(smX, [0, 1], [-4, 4])
  const rotX   = useTransform(smY, [0, 1], [3, -3])

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onMove = e => {
      if (glowRef.current)
        glowRef.current.style.background =
          `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,.07) 0%, transparent 70%)`
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const cols = ['99,102,241','6,182,212','245,158,11','139,92,246','16,185,129']
    const pts = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.5 + 0.2,
      color: cols[Math.floor(Math.random() * cols.length)],
      op: Math.random() * 0.4 + 0.05,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.op})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - d / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden noise">

      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(99,102,241,.28) 0%, transparent 65%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 40% at 90% 90%, rgba(6,182,212,.1) 0%, transparent 60%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 40% 35% at 5% 60%, rgba(245,158,11,.06) 0%, transparent 60%)' }} />
      </div>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.016]"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      {/* Bokeh */}
      {BOKEH.map((b, i) => (
        <div key={i} className="bokeh-orb" style={{
          width: b.w, height: b.h, top: b.top, left: b.left, right: b.right, bottom: b.bottom,
          background: b.bg, '--bdur': b.dur, '--bdelay': b.delay, '--bop': 0.7, zIndex: 0,
        }} />
      ))}
      {/* Laser lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {LASERS.map((l, i) => (
          <div key={i} className="laser-h" style={{
            top: l.top,
            background: `linear-gradient(90deg, transparent, ${l.color}, transparent)`,
            boxShadow: '0 0 12px rgba(99,102,241,.25)',
            '--ldur': l.dur, '--ldelay': l.delay,
          }} />
        ))}
      </div>
      {/* Cursor glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* ── Main grid ── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 xl:gap-16 items-center max-w-7xl mx-auto w-full px-6 lg:px-12 py-28">

        {/* LEFT — content */}
        <div className="flex flex-col items-start">

          {/* Available badge */}
          <motion.div className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="tech-tag text-[10px] inline-flex items-center gap-2">
              <span className="relative w-2 h-2 flex items-center justify-center">
                <span className="ping-ring" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 relative z-10" />
              </span>
              Available for Enterprise &amp; Web Projects
            </span>
          </motion.div>

          {/* Hello label */}
          <motion.p className="font-mono text-[11px] tracking-[.5em] uppercase text-indigo/50 mb-3"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 4.1, duration: 0.6 }}>
            Hello, I&apos;m
          </motion.p>

          {/* Name with 3D tilt */}
          <div className="mb-5 lg:mb-7" style={{ perspective: '900px' }}>
            <motion.div style={{ rotateX: rotX, rotateY: rotY }}>
              <motion.div
                className="flex font-serif font-bold text-cream overflow-hidden leading-[.88]"
                style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)', letterSpacing: '-.04em', perspective: '600px' }}
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 4.2 } } }}>
                {FIRST.split('').map((ch, i) => (
                  <motion.span key={i} variants={letterV}
                    style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>{ch}</motion.span>
                ))}
              </motion.div>
              <motion.div
                className="flex font-serif font-bold overflow-hidden leading-[.88]"
                style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)', letterSpacing: '-.04em', perspective: '600px' }}
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 4.2 + FIRST.length * 0.05 } } }}>
                {LAST.split('').map((ch, i) => (
                  <motion.span key={i} variants={letterV} className="text-shimmer"
                    style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>{ch}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Role scrambler */}
          <motion.div className="mb-5 h-8 flex items-center gap-2"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.9, duration: 0.7 }}>
            <span className="font-mono text-[11px] tracking-[.3em] text-indigo/50">&gt;_</span>
            <span className="font-mono text-[11px] sm:text-[13px] tracking-[.2em] uppercase text-cyan"
              style={{ minWidth: '260px' }}>
              <ScrambleRole text={ROLES[roleIdx]} />
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div className="divider-grad mb-6 w-56" style={{ height: '1px', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 5.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />

          {/* Bio */}
          <motion.p className="font-sans text-slate/70 text-[15px] leading-relaxed max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.1, duration: 0.8 }}>
            Senior ERP Engineer &amp; Full-Stack Developer with 5+ years delivering enterprise-grade systems —
            from high-performance SQL Server databases to modern Next.js web applications and complete ERP platforms.
          </motion.p>

          {/* Stats */}
          <motion.div className="flex items-center gap-7 sm:gap-12 mb-10 flex-wrap"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.25, duration: 0.8 }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <Counter to={s.value} suffix={s.suffix} startDelay={5600 + i * 130} color={s.color} />
                <span className="font-sans text-[10px] tracking-[.18em] uppercase text-slate/50">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className="flex flex-col sm:flex-row gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.45, duration: 0.8 }}>
            <MagBtn primary onClick={() => scrollTo('projects')} icon={ArrowRight}>View Projects</MagBtn>
            <MagBtn onClick={() => scrollTo('contact')}>Hire Me</MagBtn>
          </motion.div>

          {/* Social + location */}
          <motion.div className="flex items-center gap-4"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.65, duration: 0.7 }}>
            {SOCIALS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                className="group w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ border: '1px solid rgba(99,102,241,.2)' }}>
                <Icon size={15} className="text-slate/60 group-hover:text-cyan transition-colors duration-200" />
              </a>
            ))}
            <div className="w-[1px] h-5 bg-indigo/20 mx-1" />
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-amber/60" />
              <span className="font-mono text-[10px] tracking-[.15em] text-slate/50">Lahore, PK</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — orbit visualization */}
        <div className="hidden lg:flex items-center justify-center">
          <ProfileVisual onAvatarClick={() => setProfileOpen(true)} />
        </div>
      </div>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* Scroll cue */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7.2, duration: 1 }}>
        <span className="font-mono text-[9px] tracking-[.4em] uppercase text-indigo/30">Scroll</span>
        <motion.div className="w-[1px] h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,.7), transparent)' }}
          animate={{ scaleY: [1, 0.25, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }} />
      </motion.div>
    </section>
  )
}
