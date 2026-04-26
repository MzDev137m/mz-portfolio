'use client'
import { useEffect } from 'react'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let lenis, gsapInstance

    async function init() {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(ScrollTrigger)
      gsapInstance = gsap
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      window.__lenis = lenis
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }

    init()
    return () => {
      if (lenis) lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
