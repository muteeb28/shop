'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, DollarSign, TrendingUp, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const mockStats = {
  totalClients: 1247,
  activeDeals: 89,
  monthlyRevenue: 245780,
  openTickets: 23
}

const topCustomers = [
  { id: 1, name: 'Acme Corporation', country: 'United States', revenue: 125000, growth: 15 },
  { id: 2, name: 'TechVision Ltd', country: 'United Kingdom', revenue: 98000, growth: 22 },
  { id: 3, name: 'Global Solutions', country: 'Canada', revenue: 87000, growth: -5 },
  { id: 4, name: 'Innovation Labs', country: 'Germany', revenue: 76000, growth: 18 },
  { id: 5, name: 'Digital Dynamics', country: 'Australia', revenue: 65000, growth: 12 }
]

const revenueMatrix = [
  { month: 'Jan', revenue: 185000, target: 200000 },
  { month: 'Feb', revenue: 205000, target: 200000 },
  { month: 'Mar', revenue: 195000, target: 210000 },
  { month: 'Apr', revenue: 225000, target: 220000 },
  { month: 'May', revenue: 235000, target: 230000 },
  { month: 'Jun', revenue: 245780, target: 240000 }
]

const quarterComparison = [
  { quarter: 'Q1 2024', revenue: 585000, deals: 45 },
  { quarter: 'Q2 2024', revenue: 706780, deals: 52 },
  { quarter: 'Q1 2025', revenue: 650000, deals: 48 },
  { quarter: 'Q2 2025 (Current)', revenue: 245780, deals: 18 }
]

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your CRM overview.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalClients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3" /> 12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeDeals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3" /> 8% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3" /> 23% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.openTickets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownRight className="h-3 w-3" /> 4 resolved today
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Your highest revenue generating clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${customer.revenue.toLocaleString()}</p>
                    <div className="flex items-center justify-end">
                      {customer.growth > 0 ? (
                        <span className="text-xs text-green-500 inline-flex items-center">
                          <ArrowUpRight className="h-3 w-3" /> {customer.growth}%
                        </span>
                      ) : (
                        <span className="text-xs text-red-500 inline-flex items-center">
                          <ArrowDownRight className="h-3 w-3" /> {Math.abs(customer.growth)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Matrix</CardTitle>
            <CardDescription>Monthly revenue vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueMatrix.map((item) => {
                const percentage = (item.revenue / item.target) * 100
                const achieved = item.revenue >= item.target
                return (
                  <div key={item.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.month}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">${item.revenue.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">/ ${item.target.toLocaleString()}</span>
                        {achieved && <Badge variant="default" className="bg-green-500 text-white">✓</Badge>}
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarter Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Quarter Comparison</CardTitle>
          <CardDescription>Revenue and deals comparison across quarters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quarterComparison.map((quarter, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                <p className="text-sm font-medium text-muted-foreground mb-2">{quarter.quarter}</p>
                <p className="text-2xl font-bold text-foreground">${(quarter.revenue / 1000).toFixed(0)}k</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{quarter.deals} deals</p>
                  {index > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {quarter.revenue > quarterComparison[index - 1].revenue ? (
                        <span className="text-green-500 inline-flex items-center">
                          <ArrowUpRight className="h-3 w-3" /> 
                          {(((quarter.revenue - quarterComparison[index - 1].revenue) / quarterComparison[index - 1].revenue) * 100).toFixed(0)}%
                        </span>
                      ) : (
                        <span className="text-red-500 inline-flex items-center">
                          <ArrowDownRight className="h-3 w-3" />
                          {(((quarterComparison[index - 1].revenue - quarter.revenue) / quarterComparison[index - 1].revenue) * 100).toFixed(0)}%
                        </span>
                      )}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}