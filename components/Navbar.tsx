'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            SVKB Associates
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-slate-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-slate-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="#case-studies" className="text-slate-700 hover:text-blue-600 transition-colors">
              Case Studies
            </Link>
            <Link href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Button asChild>
              <Link href="#booking">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="#services" className="block text-slate-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="#about" className="block text-slate-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="#case-studies" className="block text-slate-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Case Studies
            </Link>
            <Link href="#testimonials" className="block text-slate-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Testimonials
            </Link>
            <Button asChild className="w-full">
              <Link href="#booking" onClick={() => setIsOpen(false)}>Book Consultation</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

