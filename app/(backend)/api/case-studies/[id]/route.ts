import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const caseStudy = await prisma.caseStudy.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(caseStudy)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update case study' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.caseStudy.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete case study' },
      { status: 500 }
    )
  }
}

