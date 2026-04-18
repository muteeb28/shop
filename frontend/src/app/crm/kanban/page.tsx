'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, GripVertical, User, Calendar, AlertCircle } from 'lucide-react'

interface Ticket {
  id: number
  title: string
  client: string
  priority: string
  assignee: string
  dueDate: string
}

type KanbanData = Record<string, Ticket[]>

const initialTickets: KanbanData = {
  new: [
    { id: 1, title: 'Setup cloud infrastructure', client: 'Acme Corp', priority: 'High', assignee: 'John Smith', dueDate: '2025-06-20' },
    { id: 2, title: 'Review security requirements', client: 'TechVision', priority: 'Medium', assignee: 'Sarah Johnson', dueDate: '2025-06-22' }
  ],
  'in-progress': [
    { id: 3, title: 'Implement API integration', client: 'Global Solutions', priority: 'High', assignee: 'Michael Chen', dueDate: '2025-06-18' },
    { id: 4, title: 'Database optimization', client: 'Innovation Labs', priority: 'Medium', assignee: 'Emily Davis', dueDate: '2025-06-25' }
  ],
  review: [
    { id: 5, title: 'Code review for payment module', client: 'Digital Dynamics', priority: 'High', assignee: 'Robert Taylor', dueDate: '2025-06-17' },
    { id: 6, title: 'Test deployment pipeline', client: 'Acme Corp', priority: 'Low', assignee: 'John Smith', dueDate: '2025-06-30' }
  ],
  done: [
    { id: 7, title: 'Initial project setup', client: 'TechVision', priority: 'Medium', assignee: 'Sarah Johnson', dueDate: '2025-06-10' },
    { id: 8, title: 'Documentation update', client: 'Global Solutions', priority: 'Low', assignee: 'Michael Chen', dueDate: '2025-06-12' }
  ]
}

const columns = [
  { id: 'new', title: 'New', color: 'bg-blue-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-500' },
  { id: 'review', title: 'Review', color: 'bg-purple-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' }
]

export default function KanbanPage() {
  const [tickets, setTickets] = useState<KanbanData>(initialTickets)
  const [draggedTicket, setDraggedTicket] = useState<Ticket | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white'
      case 'Medium': return 'bg-orange-500 text-white'
      case 'Low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const handleDragStart = (ticket: Ticket, columnId: string) => {
    setDraggedTicket(ticket)
    setDraggedFrom(columnId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (columnId: string) => {
    if (!draggedTicket || !draggedFrom) return

    if (draggedFrom === columnId) {
      setDraggedTicket(null)
      setDraggedFrom(null)
      return
    }

    // Remove ticket from source column
    const sourceTickets = tickets[draggedFrom].filter((t: Ticket) => t.id !== draggedTicket.id)
    
    // Add ticket to destination column
    const destTickets = [...tickets[columnId], draggedTicket]

    setTickets({
      ...tickets,
      [draggedFrom]: sourceTickets,
      [columnId]: destTickets
    })

    setDraggedTicket(null)
    setDraggedFrom(null)
  }

  const handleDragEnd = () => {
    setDraggedTicket(null)
    setDraggedFrom(null)
  }

  const getTotalTickets = () => {
    return Object.values(tickets).reduce((sum, column) => sum + column.length, 0)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Kanban Board</h1>
          <p className="text-muted-foreground mt-2">Drag and drop tickets to manage your workflow</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{getTotalTickets()}</div>
            <p className="text-sm text-muted-foreground">Total Tickets</p>
          </CardContent>
        </Card>
        {columns.map((column) => (
          <Card key={column.id}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{tickets[column.id].length}</div>
              <p className="text-sm text-muted-foreground">{column.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                    <CardTitle className="text-lg">{column.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{tickets[column.id].length}</Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Column Content */}
            <div
              className="flex-1 space-y-3 min-h-[500px] p-4 rounded-lg bg-muted/30 border-2 border-dashed border-muted"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {tickets[column.id].map((ticket) => (
                <Card
                  key={ticket.id}
                  draggable
                  onDragStart={() => handleDragStart(ticket, column.id)}
                  onDragEnd={handleDragEnd}
                  className={`cursor-move hover:shadow-lg transition-all ${
                    draggedTicket?.id === ticket.id ? 'opacity-50' : ''
                  }`}
                >
                  <CardContent className="pt-4 pb-3">
                    <div className="space-y-3">
                      {/* Title and Priority */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold text-sm">{ticket.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground">{ticket.client}</p>
                        </div>
                        <Badge className={`${getPriorityColor(ticket.priority)} text-xs`}>
                          {ticket.priority}
                        </Badge>
                      </div>

                      {/* Assignee and Due Date */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{ticket.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{ticket.dueDate}</span>
                        </div>
                      </div>

                      {/* Overdue indicator */}
                      {new Date(ticket.dueDate) < new Date() && column.id !== 'done' && (
                        <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                          <AlertCircle className="h-3 w-3" />
                          <span>Overdue</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {tickets[column.id].length === 0 && (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                  Drop tickets here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span><strong>Drag and drop</strong> tickets between columns to update their status</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span><strong>Priority badges</strong> help you identify urgent tasks (Red: High, Orange: Medium, Green: Low)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span><strong>Overdue indicators</strong> appear in red when a ticket's due date has passed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>Click <strong>Add Ticket</strong> to create a new task</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}