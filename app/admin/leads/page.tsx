'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Briefcase } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  service?: string
  message?: string
  status: string
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Leads</h1>

      <div className="space-y-4">
        {leads.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              No leads yet
            </CardContent>
          </Card>
        ) : (
          leads.map((lead) => (
            <Card key={lead.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{lead.name}</CardTitle>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4" />
                    {lead.email}
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="h-4 w-4" />
                      {lead.phone}
                    </div>
                  )}
                  {lead.service && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Briefcase className="h-4 w-4" />
                      {lead.service}
                    </div>
                  )}
                </div>
                {lead.message && (
                  <p className="text-slate-600">
                    <strong>Message:</strong> {lead.message}
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-4">
                  Received: {new Date(lead.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

