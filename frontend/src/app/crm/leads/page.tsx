'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Mail, Phone, Building, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'

const mockLeads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@techstartup.com',
    phone: '+1 555 123 4567',
    company: 'Tech Startup Inc',
    status: 'New',
    source: 'Website',
    score: 85,
    createdDate: '2025-06-10',
    expectedValue: 50000
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@enterprise.com',
    phone: '+1 555 234 5678',
    company: 'Enterprise Solutions',
    status: 'Contacted',
    source: 'LinkedIn',
    score: 72,
    createdDate: '2025-06-08',
    expectedValue: 75000
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'e.davis@consulting.com',
    phone: '+1 555 345 6789',
    company: 'Consulting Group',
    status: 'Qualified',
    source: 'Referral',
    score: 90,
    createdDate: '2025-06-05',
    expectedValue: 120000
  },
  {
    id: 4,
    name: 'Robert Taylor',
    email: 'r.taylor@manufacturing.com',
    phone: '+1 555 456 7890',
    company: 'Manufacturing Co',
    status: 'New',
    source: 'Trade Show',
    score: 65,
    createdDate: '2025-06-12',
    expectedValue: 40000
  }
]

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [leads] = useState(mockLeads)

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500 text-white'
      case 'Contacted': return 'bg-yellow-500 text-white'
      case 'Qualified': return 'bg-green-500 text-white'
      case 'Lost': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-2">Manage your potential customers</p>
        </div>
        <Link href="/crm/leads/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Lead
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{leads.filter(l => l.status === 'New').length}</div>
            <p className="text-sm text-muted-foreground">New Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{leads.filter(l => l.status === 'Qualified').length}</div>
            <p className="text-sm text-muted-foreground">Qualified Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${(leads.reduce((sum, l) => sum + l.expectedValue, 0) / 1000).toFixed(0)}k</div>
            <p className="text-sm text-muted-foreground">Potential Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{lead.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {lead.company}
                      </p>
                    </div>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{lead.createdDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Source: </span>
                      <Badge variant="outline">{lead.source}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lead Score: </span>
                      <span className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}/100</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Value: </span>
                      <span className="font-semibold text-green-600">${lead.expectedValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground">No leads found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}