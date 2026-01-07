'use client'

import { motion } from 'framer-motion'
import { Award, Users, Calendar, Target } from 'lucide-react'

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Calendar, value: '15+', label: 'Years Experience' },
  { icon: Award, value: '100%', label: 'Compliance Rate' },
  { icon: Target, value: '95%', label: 'Client Retention' },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-900 text-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About SVKB Associates
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              With over 15 years of experience, SVKB Associates has been a trusted partner for businesses seeking expert financial guidance and compliance solutions.
            </p>
            <p className="text-lg text-slate-400 mb-6">
              We combine deep industry expertise with innovative approaches to deliver results that drive growth. Our team of qualified chartered accountants is committed to providing personalized service that exceeds expectations.
            </p>
            <p className="text-lg text-slate-400">
              From startups to established enterprises, we've helped hundreds of businesses navigate complex financial challenges, optimize their tax strategies, and achieve sustainable growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center"
                >
                  <Icon className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

