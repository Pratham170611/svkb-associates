import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const clientId = searchParams.get('clientId')

        const where = clientId ? { clientId } : {}

        const documents = await prisma.document.findMany({
            where,
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                service: {
                    select: {
                        title: true
                    }
                }
            },
            orderBy: {
                uploadedAt: 'desc'
            }
        })

        return NextResponse.json(documents)
    } catch (error) {
        console.error('Error fetching documents:', error)
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        )
    }
}
