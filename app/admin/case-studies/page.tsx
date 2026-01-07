'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  description: string
  results: string
  clientName?: string
  isActive: boolean
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<CaseStudy | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch('/api/case-studies')
      const data = await response.json()
      setCaseStudies(data)
    } catch (error) {
      console.error('Error fetching case studies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return
    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchCaseStudies()
      }
    } catch (error) {
      console.error('Error deleting case study:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Case Studies</h1>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Case Study
        </Button>
      </div>

      {showForm && (
        <CaseStudyForm
          caseStudy={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSuccess={() => { fetchCaseStudies(); setShowForm(false); setEditing(null) }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <Card key={study.id}>
            <CardHeader>
              <CardTitle>{study.title}</CardTitle>
              {study.clientName && (
                <p className="text-sm text-slate-500">{study.clientName}</p>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-2">{study.description}</p>
              <p className="text-sm font-semibold text-green-700 mb-4">{study.results}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setEditing(study); setShowForm(true) }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(study.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CaseStudyForm({ caseStudy, onClose, onSuccess }: { caseStudy: CaseStudy | null; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: caseStudy?.title || '',
    description: caseStudy?.description || '',
    results: caseStudy?.results || '',
    clientName: caseStudy?.clientName || '',
    isActive: caseStudy?.isActive ?? true,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = caseStudy ? `/api/case-studies/${caseStudy.id}` : '/api/case-studies'
      const method = caseStudy ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving case study:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{caseStudy ? 'Edit Case Study' : 'Add New Case Study'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Client Name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Results</label>
            <textarea
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              required
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

