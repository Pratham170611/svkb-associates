import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(caseStudies)
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const caseStudy = await prisma.caseStudy.create({
      data: body,
    })
    return NextResponse.json(caseStudy, { status: 201 })
  } catch (error) {
    console.error('Error creating case study:', error)
    return NextResponse.json(
      { error: 'Failed to create case study' },
      { status: 500 }
    )
  }
}

