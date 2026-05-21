import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const clientId = formData.get('clientId') as string
        const serviceId = formData.get('serviceId') as string | null
        const description = formData.get('description') as string | null

        if (!file || !clientId) {
            return NextResponse.json(
                { error: 'File and client ID are required' },
                { status: 400 }
            )
        }

        // Verify client exists
        const client = await prisma.client.findUnique({
            where: { id: clientId }
        })

        if (!client) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            )
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), 'public', 'uploads', 'documents')
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true })
        }

        // Generate unique filename
        const timestamp = Date.now()
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `admin_${clientId}_${timestamp}_${sanitizedName}`
        const filePath = join(uploadsDir, fileName)

        // Save file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filePath, buffer)

        // Save document record with uploadedBy set to "admin"
        const document = await prisma.document.create({
            data: {
                clientId,
                serviceId: serviceId || null,
                fileName,
                originalName: file.name,
                filePath: `/uploads/documents/${fileName}`,
                fileSize: file.size,
                fileType: file.type,
                description: description || null,
                uploadedBy: 'admin',
            },
            include: {
                client: {
                    select: {
                        name: true,
                        email: true,
                    }
                },
                service: {
                    select: {
                        title: true
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            document,
        }, { status: 201 })
    } catch (error) {
        console.error('Admin document upload error:', error)
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        )
    }
}
