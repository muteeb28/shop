'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Mail, Phone, MapPin, DollarSign, ShoppingBag, FileText, CheckSquare, AlertCircle, Clock, Download } from 'lucide-react'
import Link from 'next/link'

// Mock client data
const clientData = {
  1: {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1 234 567 8900',
    company: 'Acme Corporation',
    address: '123 Business St, New York, NY 10001',
    country: 'United States',
    referral: 'LinkedIn',
    contactPerson: 'Sarah Johnson',
    status: 'Active',
    totalRevenue: 125000,
    lifetimeValue: 450000,
    tickets: [
      { id: 1, title: 'Product integration issue', status: 'Open', priority: 'High', date: '2025-06-10' },
      { id: 2, title: 'Billing inquiry', status: 'In Progress', priority: 'Medium', date: '2025-06-08' },
      { id: 3, title: 'Feature request', status: 'Resolved', priority: 'Low', date: '2025-06-05' }
    ],
    queries: [
      { id: 1, subject: 'Pricing for Enterprise plan', date: '2025-06-12', status: 'Answered' },
      { id: 2, subject: 'API documentation request', date: '2025-06-09', status: 'Pending' },
      { id: 3, subject: 'Contract renewal details', date: '2025-06-07', status: 'Answered' }
    ],
    recentPurchases: [
      { id: 1, product: 'Enterprise License', amount: 25000, date: '2025-06-01', status: 'Completed' },
      { id: 2, product: 'Professional Services', amount: 15000, date: '2025-05-15', status: 'Completed' },
      { id: 3, product: 'Training Package', amount: 8000, date: '2025-05-01', status: 'Completed' },
      { id: 4, product: 'Support Extension', amount: 5000, date: '2025-04-20', status: 'Completed' },
      { id: 5, product: 'Custom Integration', amount: 12000, date: '2025-04-10', status: 'Completed' }
    ],
    tasks: [
      { id: 1, title: 'Follow up on contract renewal', dueDate: '2025-06-15', status: 'Pending', assignedTo: 'Sales Team' },
      { id: 2, title: 'Schedule quarterly review meeting', dueDate: '2025-06-20', status: 'Pending', assignedTo: 'Account Manager' },
      { id: 3, title: 'Send product update newsletter', dueDate: '2025-06-18', status: 'Completed', assignedTo: 'Marketing' },
      { id: 4, title: 'Resolve billing inquiry', dueDate: '2025-06-14', status: 'In Progress', assignedTo: 'Finance Team' }
    ],
    documents: [
      { id: 1, name: 'Contract_Agreement_2025.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '2025-01-15' },
      { id: 2, name: 'Project_Proposal.docx', type: 'DOCX', size: '1.8 MB', uploadDate: '2025-02-20' },
      { id: 3, name: 'Product_Specifications.zip', type: 'ZIP', size: '5.2 MB', uploadDate: '2025-03-10' },
      { id: 4, name: 'Invoice_March_2025.pdf', type: 'PDF', size: '850 KB', uploadDate: '2025-03-31' },
      { id: 5, name: 'Meeting_Notes.docx', type: 'DOCX', size: '640 KB', uploadDate: '2025-04-15' }
    ]
  }
}

export default function ClientDetailPage({ params }: { params: { Id: string } }) {
  const clientId = parseInt(params.Id)
  const client = (clientData as any)[clientId] || clientData[1] // Fallback to client 1 if ID not found

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'pending':
        return 'bg-yellow-500'
      case 'in progress':
        return 'bg-blue-500'
      case 'resolved':
      case 'completed':
      case 'answered':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500 text-white'
      case 'medium':
        return 'bg-orange-500 text-white'
      case 'low':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/crm/clients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-foreground">{client.name}</h1>
            <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
              {client.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">{client.company}</p>
        </div>
      </div>

      {/* Client Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${client.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Purchases</p>
                <p className="text-2xl font-bold">{client.recentPurchases.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold">{client.tickets.filter((t: any) => t.status !== 'Resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CheckSquare className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Tasks</p>
                <p className="text-2xl font-bold">{client.tasks.filter((t: any) => t.status !== 'Completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{client.country}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Contact Person: </span>
                <span className="font-medium">{client.contactPerson}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Referral Source: </span>
                <Badge variant="outline">{client.referral}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Track and manage client support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client.tickets.map((ticket: any) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(ticket.status)}`} />
                      <div className="flex-1">
                        <p className="font-medium">{ticket.title}</p>
                        <p className="text-sm text-muted-foreground">{ticket.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      <Badge variant="outline">{ticket.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Queries Tab */}
        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <CardTitle>Client Queries</CardTitle>
              <CardDescription>View and respond to client questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client.queries.map((query: any) => (
                  <div key={query.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{query.subject}</p>
                        <p className="text-sm text-muted-foreground">{query.date}</p>
                      </div>
                    </div>
                    <Badge variant={query.status === 'Answered' ? 'default' : 'secondary'}>
                      {query.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purchases Tab */}
        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Recent Purchases</CardTitle>
              <CardDescription>Last 5 purchases from this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client.recentPurchases.map((purchase: any) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{purchase.product}</p>
                        <p className="text-sm text-muted-foreground">{purchase.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-green-600">${purchase.amount.toLocaleString()}</p>
                      <Badge variant="outline">{purchase.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Manage tasks related to this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client.tasks.map((task: any) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                      <div className="flex-1">
                        <p className="font-medium">{task.title}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due: {task.dueDate}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Assigned to: {task.assignedTo}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>Files and documents related to this client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client.documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-muted-foreground">{doc.size}</p>
                          <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{doc.type}</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}