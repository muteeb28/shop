'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Calendar, AlertTriangle, Eye, Download } from 'lucide-react'
import Link from 'next/link'

const mockInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2025-001',
    client: 'Acme Corporation',
    amount: 150000,
    dueDate: '2025-07-15',
    issueDate: '2025-06-15',
    status: 'Paid',
    paymentDate: '2025-07-10'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2025-002',
    client: 'TechVision Ltd',
    amount: 250000,
    dueDate: '2025-06-20',
    issueDate: '2025-05-20',
    status: 'Overdue',
    paymentDate: null
  },
  {
    id: 3,
    invoiceNumber: 'INV-2025-003',
    client: 'Global Solutions',
    amount: 80000,
    dueDate: '2025-07-30',
    issueDate: '2025-06-30',
    status: 'Pending',
    paymentDate: null
  },
  {
    id: 4,
    invoiceNumber: 'INV-2025-004',
    client: 'Innovation Labs',
    amount: 120000,
    dueDate: '2025-06-25',
    issueDate: '2025-05-25',
    status: 'Overdue',
    paymentDate: null
  },
  {
    id: 5,
    invoiceNumber: 'INV-2025-005',
    client: 'Digital Dynamics',
    amount: 65000,
    dueDate: '2025-08-05',
    issueDate: '2025-07-05',
    status: 'Pending',
    paymentDate: null
  }
]

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [invoices] = useState(mockInvoices)

  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-500 text-white'
      case 'Pending': return 'bg-yellow-500 text-white'
      case 'Overdue': return 'bg-red-500 text-white'
      case 'Cancelled': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'Paid') return false
    const today = new Date()
    const due = new Date(dueDate)
    return due < today
  }

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0)
  const overdueCount = invoices.filter(inv => inv.status === 'Overdue').length

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-2">Manage your billing and payments</p>
        </div>
        <Link href="/crm/invoices/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Overdue Alert */}
      {overdueCount > 0 && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <p className="font-semibold text-red-900">
                  {overdueCount} Overdue Invoice{overdueCount > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-red-700">
                  Total overdue amount: ${overdueAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices by number or client..."
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
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-sm text-muted-foreground">Total Invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">${(paidAmount / 1000).toFixed(0)}k</div>
            <p className="text-sm text-muted-foreground">Paid Amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">${((totalAmount - paidAmount - overdueAmount) / 1000).toFixed(0)}k</div>
            <p className="text-sm text-muted-foreground">Pending Amount</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">${(overdueAmount / 1000).toFixed(0)}k</div>
            <p className="text-sm text-red-700">Overdue Amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} className={`hover:shadow-lg transition-shadow ${invoice.status === 'Overdue' ? 'border-red-300' : ''}`}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{invoice.invoiceNumber}</h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                        {invoice.status === 'Overdue' && (
                          <Badge className="bg-red-100 text-red-700 border-red-300">
                            {getDaysOverdue(invoice.dueDate)} days overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{invoice.client}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Amount: </span>
                      <span className="font-semibold text-green-600">${invoice.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <span className="text-muted-foreground">Issue Date: </span>
                        <span className="font-medium">{invoice.issueDate}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <span className="text-muted-foreground">Due Date: </span>
                        <span className={`font-medium ${isOverdue(invoice.dueDate, invoice.status) ? 'text-red-600' : ''}`}>
                          {invoice.dueDate}
                        </span>
                      </span>
                    </div>
                    <div>
                      {invoice.paymentDate && (
                        <>
                          <span className="text-muted-foreground">Paid On: </span>
                          <span className="font-medium text-green-600">{invoice.paymentDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Link href={`/crm/invoices/${invoice.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground">No invoices found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}