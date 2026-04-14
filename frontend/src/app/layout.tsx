import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shop App',
  description: 'A modern e-commerce application',
}

import { SiteNavbar } from "@/components/sections/SiteNavbar"
import SiteFooter from "@/components/site-footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
