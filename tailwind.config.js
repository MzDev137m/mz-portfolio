/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:   ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif:  ['var(--font-syne)', 'Georgia', 'serif'],
        mono:   ['var(--font-space-mono)', 'monospace'],
        orb:    ['var(--font-orbitron)', 'sans-serif'],
      },
      colors: {
        dark:   '#050510',
        darker: '#030308',
        navy:   '#0a0a2e',
        indigo: { DEFAULT: '#6366f1', lt: '#818cf8', dk: '#4f46e5' },
        cyan:   { DEFAULT: '#06b6d4', lt: '#22d3ee', dk: '#0891b2' },
        amber:  { DEFAULT: '#f59e0b', lt: '#fbbf24' },
        slate:  { DEFAULT: '#94a3b8', lt: '#cbd5e1', dk: '#64748b' },
        cream:  '#f1f5f9',
      },
      backgroundImage: {
        'grad-hero':  'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,.25) 0%, transparent 60%)',
        'grad-card':  'linear-gradient(135deg, rgba(99,102,241,.08) 0%, rgba(6,182,212,.05) 100%)',
        'grad-indigo':'linear-gradient(135deg, #6366f1, #06b6d4)',
        'grad-text':  'linear-gradient(90deg, #6366f1, #06b6d4, #f59e0b)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'glow':       'glow 3s ease-in-out infinite',
        'beam':       'beam 8s linear infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        glow:  { '0%,100%': { opacity: '.4' }, '50%': { opacity: '1' } },
        beam:  { '0%': { transform: 'translateX(-100%) rotate(30deg)' }, '100%': { transform: 'translateX(400%) rotate(30deg)' } },
      },
    },
  },
  plugins: [],
}
