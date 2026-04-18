'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, DollarSign, Calendar, TrendingUp, Eye } from 'lucide-react'
import Link from 'next/link'

const mockOpportunities = [
  {
    id: 1,
    name: 'Enterprise Software License',
    client: 'Acme Corporation',
    stage: 'Proposal',
    value: 150000,
    probability: 75,
    expectedCloseDate: '2025-07-15',
    owner: 'John Smith',
    createdDate: '2025-05-10'
  },
  {
    id: 2,
    name: 'Cloud Migration Project',
    client: 'TechVision Ltd',
    stage: 'Negotiation',
    value: 250000,
    probability: 85,
    expectedCloseDate: '2025-06-30',
    owner: 'Sarah Johnson',
    createdDate: '2025-04-15'
  },
  {
    id: 3,
    name: 'Consulting Services',
    client: 'Global Solutions',
    stage: 'Discovery',
    value: 80000,
    probability: 50,
    expectedCloseDate: '2025-08-20',
    owner: 'Michael Chen',
    createdDate: '2025-06-01'
  },
  {
    id: 4,
    name: 'Annual Support Contract',
    client: 'Innovation Labs',
    stage: 'Closed Won',
    value: 120000,
    probability: 100,
    expectedCloseDate: '2025-06-15',
    owner: 'Emily Davis',
    createdDate: '2025-03-20'
  }
]

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [opportunities] = useState(mockOpportunities)

  const filteredOpportunities = opportunities.filter(opp =>
    opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Discovery': return 'bg-blue-500 text-white'
      case 'Proposal': return 'bg-purple-500 text-white'
      case 'Negotiation': return 'bg-yellow-500 text-white'
      case 'Closed Won': return 'bg-green-500 text-white'
      case 'Closed Lost': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getProbabilityColor = (prob: number) => {
    if (prob >= 75) return 'text-green-600'
    if (prob >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const weightedValue = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Opportunities</h1>
          <p className="text-muted-foreground mt-2">Track your sales pipeline</p>
        </div>
        <Link href="/crm/opportunities/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Opportunity
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities by name or client..."
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
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="text-sm text-muted-foreground">Total Opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${(totalValue / 1000).toFixed(0)}k</div>
            <p className="text-sm text-muted-foreground">Pipeline Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${(weightedValue / 1000).toFixed(0)}k</div>
            <p className="text-sm text-muted-foreground">Weighted Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{opportunities.filter(o => o.stage === 'Closed Won').length}</div>
            <p className="text-sm text-muted-foreground">Closed Won</p>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOpportunities.map((opp) => (
          <Card key={opp.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{opp.name}</h3>
                      <p className="text-sm text-muted-foreground">{opp.client}</p>
                    </div>
                    <Badge className={getStageColor(opp.stage)}>
                      {opp.stage}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span>Value</span>
                      </div>
                      <span className="font-semibold text-green-600">${opp.value.toLocaleString()}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Probability</span>
                      </div>
                      <span className={`font-semibold ${getProbabilityColor(opp.probability)}`}>{opp.probability}%</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>Expected Close</span>
                      </div>
                      <span className="font-medium">{opp.expectedCloseDate}</span>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Owner</div>
                      <span className="font-medium">{opp.owner}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Weighted Value: </span>
                      <span className="font-semibold">${((opp.value * opp.probability / 100).toLocaleString())}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created: </span>
                      <span className="font-medium">{opp.createdDate}</span>
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

      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground">No opportunities found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}