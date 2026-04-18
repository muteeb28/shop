'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Calendar, FileText, Download, Eye } from 'lucide-react'
import Link from 'next/link'

const mockQuotations = [
  {
    id: 1,
    quotationNumber: 'QT-2025-001',
    client: 'Acme Corporation',
    title: 'Enterprise Software Package',
    amount: 150000,
    validUntil: '2025-07-15',
    status: 'Sent',
    createdDate: '2025-06-10'
  },
  {
    id: 2,
    quotationNumber: 'QT-2025-002',
    client: 'TechVision Ltd',
    title: 'Cloud Migration Services',
    amount: 250000,
    validUntil: '2025-07-20',
    status: 'Accepted',
    createdDate: '2025-06-08'
  },
  {
    id: 3,
    quotationNumber: 'QT-2025-003',
    client: 'Global Solutions',
    title: 'Consulting Package',
    amount: 80000,
    validUntil: '2025-07-05',
    status: 'Draft',
    createdDate: '2025-06-12'
  },
  {
    id: 4,
    quotationNumber: 'QT-2025-004',
    client: 'Innovation Labs',
    title: 'Annual Support Contract',
    amount: 120000,
    validUntil: '2025-06-30',
    status: 'Rejected',
    createdDate: '2025-06-01'
  }
]

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [quotations] = useState(mockQuotations)

  const filteredQuotations = quotations.filter(quot =>
    quot.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quot.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quot.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-500 text-white'
      case 'Sent': return 'bg-blue-500 text-white'
      case 'Accepted': return 'bg-green-500 text-white'
      case 'Rejected': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const totalValue = quotations.reduce((sum, quot) => sum + quot.amount, 0)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Quotations</h1>
          <p className="text-muted-foreground mt-2">Manage your price quotes</p>
        </div>
        <Link href="/crm/quotations/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Quotation
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quotations by number, client, or title..."
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
            <div className="text-2xl font-bold">{quotations.length}</div>
            <p className="text-sm text-muted-foreground">Total Quotations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${(totalValue / 1000).toFixed(0)}k</div>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{quotations.filter(q => q.status === 'Accepted').length}</div>
            <p className="text-sm text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{quotations.filter(q => q.status === 'Sent').length}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quotations List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredQuotations.map((quot) => (
          <Card key={quot.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{quot.quotationNumber}</h3>
                        <Badge className={getStatusColor(quot.status)}>
                          {quot.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{quot.title}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client: </span>
                      <span className="font-medium">{quot.client}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Amount: </span>
                      <span className="font-semibold text-green-600">${quot.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <span className="text-muted-foreground">Valid Until: </span>
                        <span className="font-medium">{quot.validUntil}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created: </span>
                      <span className="font-medium">{quot.createdDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuotations.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground">No quotations found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}