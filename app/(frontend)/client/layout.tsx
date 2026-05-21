import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Client Portal - SVKB Associates',
    description: 'Client portal for SVKB Associates',
}

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
