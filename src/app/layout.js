import { DM_Sans, Syne, Space_Mono, Orbitron } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'

const dmSans    = DM_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-dm-sans', display: 'swap' })
const syne      = Syne({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--font-syne', display: 'swap' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400','700'], variable: '--font-space-mono', display: 'swap' })
const orbitron  = Orbitron({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--font-orbitron', display: 'swap' })

export const metadata = {
  title: 'Muzammal Tariq — Full-Stack Developer & ERP Engineer',
  description: 'Full-Stack Web Developer and Senior ERP Engineer specializing in React, Next.js, SQL Server, C#, ASP.NET — building modern web applications, business platforms, and enterprise-grade ERP systems.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} ${spaceMono.variable} ${orbitron.variable}`}>
      <body className="bg-dark text-cream antialiased overflow-x-hidden">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
