'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',    id: 'about' },
  { label: 'Skills',   id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',  id: 'contact' },
]

function scrollTo(id) {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2, offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-[200] transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 4.2, duration: 0.8, ease: [0.16,1,0.3,1] }}
    >
      <div className={`mx-3 sm:mx-6 rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'glass shadow-xl shadow-black/40 border border-white/5' : 'bg-transparent'
      }`}>
        {/* Logo */}
        <button onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl glass-indigo flex items-center justify-center border border-indigo/30 group-hover:glow-indigo transition-all duration-300">
            <span className="font-orb text-sm font-bold text-grad">MZ</span>
          </div>
          <span className="font-serif font-semibold text-cream/80 text-sm tracking-wide hidden sm:block">Muzammal Tariq</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="font-sans text-[12px] tracking-[.15em] uppercase text-slate hover:text-cream transition-colors duration-300">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')}
            className="font-sans text-[11px] tracking-[.2em] uppercase px-5 py-2 rounded-full
              bg-indigo hover:bg-indigo-lt text-white transition-all duration-300
              shadow-lg shadow-indigo/30 hover:shadow-indigo/50 hover:-translate-y-0.5">
            Hire Me
          </button>
        </nav>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setOpen(v => !v)}>
          <span className={`block w-6 h-[1.5px] bg-indigo transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`}/>
          <span className={`block w-6 h-[1.5px] bg-indigo transition-all duration-300 ${open ? 'opacity-0' : ''}`}/>
          <span className={`block w-6 h-[1.5px] bg-indigo transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`}/>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden mx-3 mt-1 rounded-2xl glass border border-white/5 px-6 py-5 flex flex-col gap-4"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            {links.map(l => (
              <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false) }}
                className="font-sans text-[12px] tracking-[.15em] uppercase text-slate hover:text-indigo text-left py-1 transition-colors">
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
