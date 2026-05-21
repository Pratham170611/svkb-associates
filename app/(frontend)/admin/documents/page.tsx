'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, File, Download, Filter, X } from 'lucide-react'

interface Client {
    id: string
    name: string
    email: string
}

interface Document {
    id: string
    originalName: string
    filePath: string
    fileSize: number
    uploadedAt: string
    uploadedBy: string
    description?: string
    client: Client
    service?: {
        title: string
    }
}

export default function AdminDocuments() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [clients, setClients] = useState<Client[]>([])
    const [selectedClient, setSelectedClient] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [uploadClientId, setUploadClientId] = useState('')
    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [uploadDescription, setUploadDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchDocuments()
        fetchClients()
    }, [selectedClient])

    const fetchDocuments = async () => {
        try {
            const url = selectedClient
                ? `/api/admin/documents?clientId=${selectedClient}`
                : '/api/admin/documents'
            const response = await fetch(url)
            const data = await response.json()
            setDocuments(data)
        } catch (error) {
            console.error('Error fetching documents:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchClients = async () => {
        try {
            const response = await fetch('/api/admin/clients')
            const data = await response.json()
            setClients(data)
        } catch (error) {
            console.error('Error fetching clients:', error)
        }
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!uploadFile || !uploadClientId) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', uploadFile)
        formData.append('clientId', uploadClientId)
        if (uploadDescription) {
            formData.append('description', uploadDescription)
        }

        try {
            const response = await fetch('/api/admin/documents/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                setShowUploadModal(false)
                setUploadFile(null)
                setUploadDescription('')
                setUploadClientId('')
                fetchDocuments()
            } else {
                const data = await response.json()
                alert(data.error || 'Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('An error occurred during upload')
        } finally {
            setUploading(false)
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Documents</h1>
                    <p className="text-slate-600 mt-1">Manage client documents</p>
                </div>
                <Button onClick={() => setShowUploadModal(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <Filter className="h-5 w-5 text-slate-400" />
                        <div className="flex-1">
                            <select
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                className="w-full max-w-xs px-3 py-2 border rounded-md bg-white"
                            >
                                <option value="">All Clients</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name} ({client.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedClient && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedClient('')}
                            >
                                <X className="h-4 w-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Documents ({documents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-center py-8 text-slate-500">Loading...</p>
                    ) : documents.length === 0 ? (
                        <p className="text-center py-8 text-slate-500">No documents found</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Client</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Document</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Service</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Size</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Uploaded By</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc) => (
                                        <tr key={doc.id} className="border-b hover:bg-slate-50">
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-medium text-sm">{doc.client.name}</p>
                                                    <p className="text-xs text-slate-500">{doc.client.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <File className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-sm truncate">{doc.originalName}</p>
                                                        {doc.description && (
                                                            <p className="text-xs text-slate-500 truncate">{doc.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                {doc.service?.title || '-'}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                {formatFileSize(doc.fileSize)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${doc.uploadedBy === 'admin'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {doc.uploadedBy === 'admin' ? 'Admin' : 'Client'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600">
                                                {formatDate(doc.uploadedAt)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <a
                                                    href={doc.filePath}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Upload Document</CardTitle>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Select Client</label>
                                    <select
                                        value={uploadClientId}
                                        onChange={(e) => setUploadClientId(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md bg-white"
                                        required
                                    >
                                        <option value="">Choose a client...</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name} ({client.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Document</label>
                                    <Input
                                        type="file"
                                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.csv"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                                    <Input
                                        type="text"
                                        value={uploadDescription}
                                        onChange={(e) => setUploadDescription(e.target.value)}
                                        placeholder="e.g., ITR Filing 2023-24"
                                    />
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowUploadModal(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={uploading || !uploadFile || !uploadClientId}
                                        className="flex-1"
                                    >
                                        {uploading ? 'Uploading...' : 'Upload'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
