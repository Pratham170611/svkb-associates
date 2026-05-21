'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  company?: string
  content: string
  rating: number
  isActive: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      const data = await response.json()
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showForm && (
        <TestimonialForm
          testimonial={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSuccess={() => { fetchTestimonials(); setShowForm(false); setEditing(null) }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>{testimonial.name}</CardTitle>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              {testimonial.company && (
                <p className="text-sm text-slate-500">{testimonial.company}</p>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setEditing(testimonial); setShowForm(true) }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(testimonial.id)}
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

function TestimonialForm({ testimonial, onClose, onSuccess }: { testimonial: Testimonial | null; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    company: testimonial?.company || '',
    content: testimonial?.content || '',
    rating: testimonial?.rating || 5,
    isActive: testimonial?.isActive ?? true,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = testimonial ? `/api/testimonials/${testimonial.id}` : '/api/testimonials'
      const method = testimonial ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
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

