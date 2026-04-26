'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Splash() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase]     = useState(0)
  const canvasRef             = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1000)
    const t3 = setTimeout(() => setPhase(3), 3200)
    const t4 = setTimeout(() => setVisible(false), 4000)
    return () => [t1,t2,t3,t4].forEach(clearTimeout)
  }, [])

  // Canvas particle grid
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * Math.PI * 2,
      s: 0.2 + Math.random() * 0.5,
      op: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += Math.cos(d.a) * d.s * 0.3
        d.y += Math.sin(d.a) * d.s * 0.3
        if (d.x < 0) d.x = canvas.width
        if (d.x > canvas.width) d.x = 0
        if (d.y < 0) d.y = canvas.height
        if (d.y > canvas.height) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${d.op})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #030308 0%, #050510 40%, #0a0a2e 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76,0,0.24,1] }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Corner brackets */}
          {['tl','tr','bl','br'].map(pos => (
            <motion.div key={pos} className="absolute w-12 h-12 pointer-events-none"
              style={{
                top:    pos.startsWith('t') ? 28 : 'auto', bottom: pos.startsWith('b') ? 28 : 'auto',
                left:   pos.endsWith('l') ? 28 : 'auto',   right:  pos.endsWith('r') ? 28 : 'auto',
                borderTop:    pos.startsWith('t') ? '1px solid rgba(99,102,241,.5)' : 'none',
                borderBottom: pos.startsWith('b') ? '1px solid rgba(99,102,241,.5)' : 'none',
                borderLeft:   pos.endsWith('l')   ? '1px solid rgba(99,102,241,.5)' : 'none',
                borderRight:  pos.endsWith('r')   ? '1px solid rgba(99,102,241,.5)' : 'none',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          ))}

          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(99,102,241,.12) 0%, transparent 70%)' }} />

          <div className="relative z-10 flex flex-col items-center text-center px-6 gap-0">
            {/* Icon */}
            <motion.div
              className="mb-8 relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.34,1.56,.64,1] }}
            >
              <div className="w-20 h-20 rounded-2xl glass-indigo flex items-center justify-center glow-indigo relative overflow-hidden">
                <div className="scan-line opacity-60" />
                <span className="font-orb text-3xl font-bold text-grad">MZ</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-serif text-cream font-bold mb-2 text-glow"
              style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', letterSpacing: '-.02em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Muzammal Tariq
            </motion.h1>

            {/* Role */}
            <motion.p
              className="font-mono text-[11px] tracking-[.4em] uppercase text-indigo/70 mb-8"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              ERP Engineer · SQL Specialist · Automation
            </motion.p>

            {/* Progress */}
            <div className="w-[min(320px,80vw)]">
              <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4, #f59e0b)' }}
                  initial={{ width: '0%' }}
                  animate={phase >= 2 ? { width: '100%' } : {}}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>
              <p className="text-center font-mono text-[9px] tracking-[.35em] uppercase text-indigo/30 mt-2">
                Loading Portfolio
              </p>
            </div>
          </div>

          {/* MZ Corporations credit */}
          <motion.p
            className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[.25em] uppercase whitespace-nowrap"
            style={{ color: 'rgba(99,102,241,.22)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Developed by MZ Corporations
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
