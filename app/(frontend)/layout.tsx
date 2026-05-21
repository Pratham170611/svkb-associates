'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show Navbar and Footer on admin or client pages
  const isAdminOrClient = pathname?.startsWith('/admin') || pathname?.startsWith('/client')

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminOrClient && <Navbar />}
        {children}
        {!isAdminOrClient && <Footer />}
      </body>
    </html>
  )
}

