'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, CheckCircle2 } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  description: string
  results: string
  clientName?: string | null
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[]
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
    <section id="case-studies" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Case Studies & Results
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real results from real clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                  </div>
                  {study.clientName && (
                    <p className="text-sm text-slate-500 font-medium">{study.clientName}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600 mb-4">
                    {study.description}
                  </CardDescription>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-semibold text-green-900">{study.results}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

