import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jobflix — Ship Apps in Days',
  description: 'Turn your idea into a live, production-ready product in days.',
}

import { SiteNavbar } from "@/components/sections/SiteNavbar"
import SiteFooter from "@/components/site-footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans`}>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
