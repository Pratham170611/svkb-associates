'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'We offer comprehensive chartered accountancy services including tax planning & compliance, audit & assurance, financial advisory, business consulting, GST & indirect tax management, and company formation services.',
  },
  {
    question: 'How much do your services cost?',
    answer: 'Our pricing varies based on the scope and complexity of your requirements. We offer customized packages tailored to your business needs. Contact us for a free consultation and detailed quote.',
  },
  {
    question: 'How long does it take to complete an audit?',
    answer: 'The duration of an audit depends on the size and complexity of your business. Typically, small businesses can expect 2-4 weeks, while larger enterprises may take 6-12 weeks. We provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'Do you handle GST compliance?',
    answer: 'Yes, we provide complete GST compliance services including registration, monthly/quarterly filing, return preparation, and handling any GST-related queries or notices from tax authorities.',
  },
  {
    question: 'Can you help with tax planning?',
    answer: 'Absolutely! Tax planning is one of our core services. We help businesses and individuals optimize their tax liabilities through strategic planning while ensuring full compliance with all regulations.',
  },
  {
    question: 'What makes you different from other CA firms?',
    answer: 'We combine deep expertise with a client-first approach. Our team stays updated with the latest regulations, uses modern technology for efficiency, and provides personalized service. We focus on building long-term relationships and delivering measurable results.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

