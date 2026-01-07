'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We start with a comprehensive consultation to understand your business needs, challenges, and goals.',
  },
  {
    number: '02',
    title: 'Strategic Planning',
    description: 'Our team develops a customized strategy tailored to your specific requirements and objectives.',
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'We execute the plan with precision, ensuring all processes are streamlined and efficient.',
  },
  {
    number: '04',
    title: 'Ongoing Support',
    description: 'Continuous monitoring and support to ensure optimal performance and compliance at all times.',
  },
]

export default function HowWeWork() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            How We Work
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A proven process that delivers results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-slate-50 p-8 rounded-lg h-full border-2 border-slate-200 hover:border-blue-500 transition-colors">
                <div className="text-6xl font-bold text-blue-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-blue-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

