'use client'
import { useEffect, useRef } from 'react'

// Tube color stops — tail (cyan) → mid (violet) → head (hot pink)
const C0 = [0,   210, 200]
const C1 = [140, 0,   255]
const C2 = [255, 20,  160]

function lerp(a, b, t) { return a + (b - a) * t }
function lerpRgb(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

export default function TubesCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let trail = []   // { x, y, ts }
    let rafId
    const TRAIL_LEN  = 90
    const TRAIL_LIFE = 680  // ms

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = e => {
      trail.push({ x: e.clientX, y: e.clientY, ts: performance.now() })
      if (trail.length > TRAIL_LEN) trail.shift()
    }
    window.addEventListener('mousemove', onMove)

    // Smooth bezier path through trail points
    const buildPath = pts => {
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2
        const my = (pts[i].y + pts[i + 1].y) / 2
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
      }
      const last = pts[pts.length - 1]
      ctx.lineTo(last.x, last.y)
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = performance.now()
      trail = trail.filter(p => now - p.ts < TRAIL_LIFE)

      if (trail.length >= 3) {
        const f = trail[0], l = trail[trail.length - 1]

        const makeGrad = (stops) => {
          const g = ctx.createLinearGradient(f.x, f.y, l.x, l.y)
          stops.forEach(([pos, r, g2, b, a]) => g.addColorStop(pos, `rgba(${r},${g2},${b},${a})`))
          return g
        }

        ctx.lineCap  = 'round'
        ctx.lineJoin = 'round'

        // ── Outer halo ──────────────────────────────────────────
        ctx.save()
        ctx.strokeStyle = makeGrad([
          [0,    ...C0, 0],
          [0.2,  ...C0, 0.10],
          [0.55, ...C1, 0.13],
          [1,    ...C2, 0.16],
        ])
        ctx.lineWidth   = 34
        ctx.shadowBlur  = 55
        ctx.shadowColor = `rgba(${C2.join(',')},0.4)`
        buildPath(trail); ctx.stroke()
        ctx.restore()

        // ── Mid glow ───────────────────────────────────────────
        ctx.save()
        ctx.strokeStyle = makeGrad([
          [0,    ...C0, 0],
          [0.15, ...C0, 0.38],
          [0.5,  ...C1, 0.55],
          [1,    ...C2, 0.70],
        ])
        ctx.lineWidth   = 13
        ctx.shadowBlur  = 24
        ctx.shadowColor = `rgba(${C1.join(',')},0.8)`
        buildPath(trail); ctx.stroke()
        ctx.restore()

        // ── Bright core ─────────────────────────────────────────
        ctx.save()
        ctx.strokeStyle = makeGrad([
          [0,    ...C0, 0],
          [0.08, ...C0, 0.75],
          [0.5,  ...C1, 0.92],
          [1,    ...C2, 1],
        ])
        ctx.lineWidth   = 3
        ctx.shadowBlur  = 12
        ctx.shadowColor = `rgba(${C2.join(',')},1)`
        buildPath(trail); ctx.stroke()
        ctx.restore()

        // ── Tip dot ─────────────────────────────────────────────
        ctx.save()
        ctx.shadowBlur  = 22
        ctx.shadowColor = `rgba(${C2.join(',')},1)`
        ctx.fillStyle   = 'rgba(255,210,245,0.95)'
        ctx.beginPath()
        ctx.arc(l.x, l.y, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, mixBlendMode: 'screen' }}
    />
  )
}
