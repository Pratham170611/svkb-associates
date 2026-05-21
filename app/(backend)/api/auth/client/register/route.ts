import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, company, serviceIds } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const existing = await prisma.client.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const client = await prisma.client.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone: phone || null,
        company: company || null,
        services: {
          create: serviceIds?.map((serviceId: string) => ({
            serviceId,
            status: 'active'
          })) || []
        }
      },
      include: {
        services: {
          include: {
            service: true
          }
        }
      }
    })

    const { password: _, ...clientWithoutPassword } = client

    return NextResponse.json({
      success: true,
      client: clientWithoutPassword,
    }, { status: 201 })
  } catch (error) {
    console.error('Client registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
