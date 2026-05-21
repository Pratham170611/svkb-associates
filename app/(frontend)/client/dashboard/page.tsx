'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, File, X, CheckCircle2, LogOut, User } from 'lucide-react'
import Link from 'next/link'

interface ClientService {
  id: string
  service: {
    id: string
    title: string
  }
  status: string
}

interface Document {
  id: string
  originalName: string
  filePath: string
  fileSize: number
  uploadedAt: string
  uploadedBy: string
  description?: string
  service?: {
    title: string
  }
}

export default function ClientDashboard() {
  const [client, setClient] = useState<any>(null)
  const [services, setServices] = useState<ClientService[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedService, setSelectedService] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('clientAuth')
    if (!auth) {
      router.push('/client/login')
      return
    }

    const clientData = JSON.parse(auth)
    setClient(clientData)
    setServices(clientData.services || [])
    fetchDocuments(clientData.id)
  }, [router])

  const fetchDocuments = async (clientId: string) => {
    try {
      const response = await fetch(`/api/client/documents?clientId=${clientId}`)
      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !client) return

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    setUploading(true)
    setUploadSuccess(false)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('clientId', client.id)
    if (selectedService) {
      formData.append('serviceId', selectedService)
    }

    try {
      const response = await fetch('/api/client/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setUploadSuccess(true)
        fetchDocuments(client.id)
        setTimeout(() => setUploadSuccess(false), 3000)
      } else {
        const data = await response.json()
        alert(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('An error occurred during upload')
    } finally {
      setUploading(false)
      e.target.value = '' // Reset input
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('clientAuth')
    router.push('/client/login')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Client Portal</h1>
            <p className="text-sm text-slate-600">SVKB Associates</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-700">
              <User className="h-5 w-5" />
              <span>{client.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Service (Optional)
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  >
                    <option value="">All Services</option>
                    {services.map((cs) => (
                      <option key={cs.id} value={cs.service.id}>
                        {cs.service.title}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-1">
                    Select a service to categorize your document
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Choose File
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.csv"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-600 font-medium">
                        {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        PDF, DOC, XLS, Images (Max 10MB)
                      </span>
                    </label>
                  </div>
                  {uploadSuccess && (
                    <div className="mt-2 flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm">File uploaded successfully!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {services.length === 0 ? (
                    <p className="text-sm text-slate-500">No services assigned</p>
                  ) : (
                    services.map((cs) => (
                      <div
                        key={cs.id}
                        className="p-3 bg-slate-50 rounded-lg border"
                      >
                        <p className="font-medium text-sm">{cs.service.title}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Status: <span className="capitalize">{cs.status}</span>
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Manage Documents Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Manage Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tabs */}
            <div className="border-b mb-4">
              <div className="flex gap-4">
                <button
                  className="pb-2 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm"
                >
                  My Uploads ({documents.filter(d => d.uploadedBy === 'client').length})
                </button>
                <button
                  className="pb-2 px-1 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium text-sm"
                >
                  From Admin ({documents.filter(d => d.uploadedBy === 'admin').length})
                </button>
              </div>
            </div>

            {/* My Uploads Tab */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Documents I Uploaded</h3>
              {documents.filter(d => d.uploadedBy === 'client').length === 0 ? (
                <p className="text-center text-slate-500 py-8 text-sm">
                  No documents uploaded yet. Upload your first document above.
                </p>
              ) : (
                <div className="space-y-2">
                  {documents.filter(d => d.uploadedBy === 'client').map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <File className="h-8 w-8 text-blue-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{doc.originalName}</p>
                          {doc.description && (
                            <p className="text-xs text-slate-500 truncate">{doc.description}</p>
                          )}
                          <p className="text-sm text-slate-500">
                            {doc.service?.title || 'General'} • {formatFileSize(doc.fileSize)} •{' '}
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <a
                        href={doc.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm ml-4"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* From Admin Tab */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Documents from Admin</h3>
              {documents.filter(d => d.uploadedBy === 'admin').length === 0 ? (
                <p className="text-center text-slate-500 py-8 text-sm">
                  No documents from admin yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {documents.filter(d => d.uploadedBy === 'admin').map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <File className="h-8 w-8 text-purple-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{doc.originalName}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-200 text-purple-800">
                              Admin
                            </span>
                          </div>
                          {doc.description && (
                            <p className="text-xs text-slate-600 truncate mt-1">{doc.description}</p>
                          )}
                          <p className="text-sm text-slate-600 mt-1">
                            {doc.service?.title || 'General'} • {formatFileSize(doc.fileSize)} •{' '}
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <a
                        href={doc.filePath}
                        download
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm ml-4"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
