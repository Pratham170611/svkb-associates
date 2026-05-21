'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Expert Chartered Accountants
              <span className="block text-blue-400 mt-2">You Can Trust</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Strategic financial solutions that drive growth. Tax planning, audit services, and business consulting tailored to your success.
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
              <Link href="#booking">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10">
              <Link href="#services">
                Our Services
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Calculator className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tax Expertise</h3>
              <p className="text-slate-400 text-sm">Strategic tax planning & compliance</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <TrendingUp className="h-12 w-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Growth</h3>
              <p className="text-slate-400 text-sm">Financial advisory & consulting</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Shield className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compliance</h3>
              <p className="text-slate-400 text-sm">100% regulatory compliance</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

