'use client'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function WhatsappIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  )
}

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

const PROFILE_LINKS = [
  { href: 'mailto:m.muzammal.dev@gmail.com', Icon: Mail,          label: 'Email',     value: 'm.muzammal.dev@gmail.com',        color: '#6366f1' },
  { href: 'https://wa.me/923004783996',      Icon: WhatsappIcon,  label: 'WhatsApp',  value: '+92 300 4783996',                  color: '#25D366' },
  { href: 'https://linkedin.com/in/muzammal-tariq', Icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/muzammal-tariq', color: '#0ea5e9' },
  { href: 'https://github.com/MzDev137m',    Icon: GithubIcon,    label: 'GitHub',    value: 'github.com/MzDev137m',             color: '#06b6d4' },
]

export default function ProfileModal({ open, onClose }) {
  const [imgOk, setImgOk] = useState(true)

  return (
    <Dialog.Root open={open} onOpenChange={v => { if (!v) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="radix-dialog-overlay" />
        <Dialog.Content
          className="radix-dialog-content"
          style={{ maxWidth: 440, width: '90vw', padding: 0, overflow: 'hidden', borderRadius: '1.5rem' }}>

          <Dialog.Title className="sr-only">Muzammal Tariq — Profile</Dialog.Title>
          <Dialog.Description className="sr-only">
            Profile card for Muzammal Tariq, ERP Engineer and Full-Stack Web Developer at MZ Corporations.
          </Dialog.Description>

          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
              style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)', color: 'rgba(255,255,255,.6)' }}>
              <X size={14} />
            </button>
          </Dialog.Close>

          {/* Header */}
          <div className="relative flex flex-col items-center pt-10 pb-7 px-8"
            style={{ background: 'linear-gradient(150deg, rgba(99,102,241,.18) 0%, rgba(6,182,212,.1) 100%)', borderBottom: '1px solid rgba(99,102,241,.12)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,.15) 0%, transparent 70%)' }} />
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #06b6d4, transparent)' }} />

            {/* Avatar */}
            <div className="relative z-10 mb-5" style={{ width: 128, height: 128 }}>
              <div className="absolute inset-0 rounded-full border-spin" />
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: '0 0 48px rgba(99,102,241,.7), 0 0 90px rgba(6,182,212,.3)' }} />
              <div className="absolute inset-[3px] rounded-full overflow-hidden" style={{ background: '#060618' }}>
                {imgOk ? (
                  <img
                    src="https://github.com/MzDev137m.png"
                    alt="Muzammal Tariq"
                    className="w-full h-full object-cover"
                    onError={() => setImgOk(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-orb text-3xl font-bold text-grad">MT</span>
                  </div>
                )}
              </div>
            </div>

            <h2 className="relative z-10 font-serif font-bold text-cream text-2xl tracking-tight">Muzammal Tariq</h2>
            <p className="relative z-10 font-mono text-[10px] tracking-[.25em] uppercase text-indigo/70 mt-1.5">
              ERP Engineer &amp; Web Developer
            </p>
            <p className="relative z-10 font-mono text-[9px] tracking-[.2em] uppercase mt-1" style={{ color: 'rgba(245,158,11,.75)' }}>
              MZ Corporations · Lahore, PK
            </p>

            {/* Availability */}
            <div className="relative z-10 mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(52,211,153,.08)', border: '1px solid rgba(52,211,153,.2)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="font-mono text-[9px] tracking-[.15em] text-emerald-400/80">Open to Work</span>
            </div>
          </div>

          {/* Contact links */}
          <div className="flex flex-col gap-2 p-6">
            {PROFILE_LINKS.map(({ href, Icon, label, value, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                style={{ background: `${color}09`, border: `1px solid ${color}20` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${color}16`; e.currentTarget.style.borderColor = `${color}45` }}
                onMouseLeave={e => { e.currentTarget.style.background = `${color}09`; e.currentTarget.style.borderColor = `${color}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
                  <Icon size={15} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[8px] tracking-[.3em] uppercase" style={{ color: `${color}80` }}>{label}</div>
                  <div className="font-sans text-[12px] text-cream/80 truncate">{value}</div>
                </div>
                <div className="ml-auto font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color }}>→</div>
              </a>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
