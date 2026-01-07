'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Manage SEO settings for your website pages.</p>
            <Button className="mt-4" variant="outline">Configure SEO</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Customize colors, fonts, and branding elements.</p>
            <Button className="mt-4" variant="outline">Customize Branding</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Edit page content and meta information.</p>
            <Button className="mt-4" variant="outline">Edit Content</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

