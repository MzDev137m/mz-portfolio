'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible,  setVisible]  = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const ringX = useSpring(mouseX, { stiffness: 160, damping: 20, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)
    const onOver = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select,label')) setHovering(true)
    }
    const onOut = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [mouseX, mouseY, visible])

  return (
    <>
      {/* Outer spring-lagged ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid rgba(99,102,241,.55)',
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:       clicking ? 22 : hovering ? 50 : 36,
          height:      clicking ? 22 : hovering ? 50 : 36,
          borderColor: hovering ? 'rgba(6,182,212,.8)' : 'rgba(99,102,241,.55)',
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:      clicking ? 4  : hovering ? 10 : 7,
          height:     clicking ? 4  : hovering ? 10 : 7,
          background: hovering ? '#06b6d4' : '#6366f1',
          boxShadow:  hovering ? '0 0 14px rgba(6,182,212,.9)' : '0 0 10px rgba(99,102,241,.8)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}
