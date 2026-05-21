import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowWeWork from '@/components/HowWeWork'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import BookingForm from '@/components/BookingForm'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  const caseStudies = await prisma.caseStudy.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main>
      <Hero />
      <Services services={services} />
      <HowWeWork />
      <CaseStudies caseStudies={caseStudies} />
      <Testimonials testimonials={testimonials} />
      <About />
      <BookingForm />
      <FAQ />
      <CTA />
    </main>
  )
}

