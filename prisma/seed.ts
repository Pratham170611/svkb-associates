import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@svkbassociates.com' },
    update: {},
    create: {
      email: 'admin@svkbassociates.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  // Create services
  const services = [
    {
      title: 'Tax Planning & Compliance',
      description: 'Strategic tax planning to minimize liabilities while ensuring full compliance with all regulations. We help you navigate complex tax laws and optimize your financial position.',
      icon: 'Calculator',
      order: 1,
    },
    {
      title: 'Audit & Assurance',
      description: 'Comprehensive audit services providing confidence in your financial statements. We deliver thorough, independent assessments that meet the highest professional standards.',
      icon: 'FileCheck',
      order: 2,
    },
    {
      title: 'Financial Advisory',
      description: 'Expert financial guidance to drive business growth. From budgeting to strategic planning, we help you make informed decisions that maximize profitability.',
      icon: 'TrendingUp',
      order: 3,
    },
    {
      title: 'Business Consulting',
      description: 'Strategic business consulting to optimize operations and drive growth. We analyze your business processes and provide actionable insights for improvement.',
      icon: 'Briefcase',
      order: 4,
    },
    {
      title: 'GST & Indirect Tax',
      description: 'Complete GST compliance and indirect tax management. We ensure accurate filing, timely submissions, and help you leverage tax benefits effectively.',
      icon: 'Receipt',
      order: 5,
    },
    {
      title: 'Company Formation',
      description: 'End-to-end support for company registration and incorporation. We handle all legal formalities, documentation, and compliance requirements seamlessly.',
      icon: 'Building2',
      order: 6,
    },
  ]

  // Clear existing data in the correct order (dependencies first)
  // Delete documents that reference services
  await prisma.document.deleteMany({
    where: {
      serviceId: { not: null }
    }
  })

  // Delete client services before deleting services
  await prisma.clientService.deleteMany({})

  // Now safe to delete services
  await prisma.service.deleteMany({})

  for (const service of services) {
    await prisma.service.create({
      data: service,
    })
  }

  // Create case studies
  const caseStudies = [
    {
      title: 'Tax Optimization for Manufacturing Firm',
      description: 'A mid-sized manufacturing company was facing high tax liabilities and compliance challenges. We conducted a comprehensive tax review and implemented strategic planning.',
      results: 'Reduced annual tax liability by 35%, improved cash flow by ₹45 lakhs, and achieved 100% compliance rate with zero penalties.',
      clientName: 'ABC Manufacturing Ltd.',
    },
    {
      title: 'Financial Restructuring Success',
      description: 'A technology startup needed financial restructuring to attract investors. We provided detailed financial analysis and restructuring recommendations.',
      results: 'Secured ₹2.5 crores in funding, improved financial ratios by 40%, and established robust financial reporting systems.',
      clientName: 'TechStart Innovations',
    },
    {
      title: 'GST Compliance Transformation',
      description: 'A retail chain with multiple locations was struggling with GST compliance and filing delays. We streamlined their entire indirect tax process.',
      results: 'Achieved 100% on-time GST filing, reduced compliance costs by 30%, and eliminated all penalties and interest charges.',
      clientName: 'Retail Chain Group',
    },
  ]

  // Clear existing case studies and create new ones
  await prisma.caseStudy.deleteMany({})

  for (const caseStudy of caseStudies) {
    await prisma.caseStudy.create({
      data: caseStudy,
    })
  }

  // Create testimonials
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Kumar Industries',
      content: 'SVKB Associates transformed our tax planning strategy. Their expertise helped us save significantly while ensuring full compliance. Highly professional and reliable.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      company: 'Sharma & Co.',
      content: 'The team at SVKB Associates provided exceptional audit services. Their attention to detail and thorough analysis gave us complete confidence in our financial statements.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      company: 'Patel Enterprises',
      content: 'Outstanding financial advisory services. They helped us restructure our business operations and achieve 40% growth in profitability. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      company: 'Reddy Solutions',
      content: 'Their GST compliance services are excellent. We went from struggling with filings to having a streamlined, automated process. Professional and efficient.',
      rating: 5,
    },
  ]

  // Clear existing testimonials and create new ones
  await prisma.testimonial.deleteMany({})

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }

  // Create page content
  await prisma.pageContent.upsert({
    where: { page: 'home' },
    update: {},
    create: {
      page: 'home',
      title: 'Expert Chartered Accountants | SVKB Associates',
      content: 'Your trusted partner for comprehensive financial solutions',
      metaTitle: 'SVKB Associates - Expert Chartered Accountants',
      metaDesc: 'Professional chartered accountancy services including tax planning, audit, financial advisory, and business consulting.',
    },
  })

  // Create SEO settings
  await prisma.sEO.upsert({
    where: { page: 'home' },
    update: {},
    create: {
      page: 'home',
      title: 'SVKB Associates - Expert Chartered Accountants',
      description: 'Professional chartered accountancy services including tax planning, audit, financial advisory, GST compliance, and business consulting.',
      keywords: 'chartered accountant, tax planning, audit services, financial advisory, GST compliance, business consulting',
    },
  })

  // Create branding (only if it doesn't exist)
  const existingBranding = await prisma.branding.findFirst()
  if (!existingBranding) {
    await prisma.branding.create({
      data: {
        primaryColor: '#1a1a1a',
        secondaryColor: '#0066cc',
        accentColor: '#ff6b35',
        fontHeading: 'Inter',
        fontBody: 'Inter',
      },
    })
  }

  // Create sample client (after services are created)
  const clientPassword = await bcrypt.hash('client123', 10)
  const taxService = await prisma.service.findFirst({ where: { title: 'Tax Planning & Compliance' } })

  if (taxService) {
    // First, upsert the client without nested services
    const client = await prisma.client.upsert({
      where: { email: 'client@example.com' },
      update: {
        password: clientPassword,
        name: 'Test Client',
        phone: '+91 9876543210',
        company: 'Test Company Ltd.',
        isActive: true,
      },
      create: {
        email: 'client@example.com',
        password: clientPassword,
        name: 'Test Client',
        phone: '+91 9876543210',
        company: 'Test Company Ltd.',
        isActive: true,
      },
    })

    // Then, handle client services separately to avoid foreign key issues
    // Delete existing services for this client and service
    await prisma.clientService.deleteMany({
      where: {
        clientId: client.id,
        serviceId: taxService.id,
      },
    })

    // Create the client service relationship
    await prisma.clientService.create({
      data: {
        clientId: client.id,
        serviceId: taxService.id,
        status: 'active',
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

