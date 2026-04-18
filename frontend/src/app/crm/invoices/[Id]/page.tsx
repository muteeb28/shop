'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Mail, Download, Printer, Check } from 'lucide-react'
import Link from 'next/link'
import SendEmailModal from '@/components/SendEmailModal'
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const mockInvoiceData = {
  1: {
    id: 1,
    invoiceNumber: 'INV-2025-001',
    client: 'Acme Corporation',
    clientEmail: 'billing@acme.com',
    amount: 150000,
    dueDate: '2025-07-15',
    issueDate: '2025-06-15',
    status: 'Paid',
    items: [
      { id: 1, description: 'Enterprise Software License', quantity: 1, unitPrice: 125000, amount: 125000 },
      { id: 2, description: 'Implementation Services', quantity: 40, unitPrice: 500, amount: 20000 },
      { id: 3, description: 'Training Package', quantity: 1, unitPrice: 5000, amount: 5000 }
    ],
    subtotal: 150000,
    tax: 0,
    total: 150000,
    terms: 'Payment due within 30 days. Late payments may incur additional charges.',
    notes: 'Thank you for your business!'
  },
  2: {
    id: 2,
    invoiceNumber: 'INV-2025-002',
    client: 'TechVision Ltd',
    clientEmail: 'accounts@techvision.com',
    amount: 250000,
    dueDate: '2025-06-20',
    issueDate: '2025-05-20',
    status: 'Overdue',
    items: [
      { id: 1, description: 'Cloud Migration Project', quantity: 1, unitPrice: 200000, amount: 200000 },
      { id: 2, description: 'Consulting Services', quantity: 100, unitPrice: 500, amount: 50000 }
    ],
    subtotal: 250000,
    tax: 0,
    total: 250000,
    terms: 'Payment due within 30 days.',
    notes: 'Please contact us if you have any questions.'
  }
}

const handleDownloadPDF = (invoice: any) => {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(18)
  doc.text("Invoice", 14, 20)

  // Invoice info
  doc.setFontSize(11)
  doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, 30)
  doc.text(`Client: ${invoice.client}`, 14, 36)
  doc.text(`Issue Date: ${invoice.issueDate}`, 14, 42)
  doc.text(`Due Date: ${invoice.dueDate}`, 14, 48)
  doc.text(`Status: ${invoice.status}`, 14, 54)

  // Table
  autoTable(doc, {
    startY: 65,
    head: [["Description", "Qty", "Unit Price", "Amount"]],
    body: invoice.items.map((item: any) => [
      item.description,
      item.quantity,
      `$${item.unitPrice.toLocaleString()}`,
      `$${item.amount.toLocaleString()}`,
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 163, 74] }, // green-ish
  })

  const finalY = (doc as any).lastAutoTable.finalY || 100

  // Totals
  doc.text(`Subtotal: $${invoice.subtotal.toLocaleString()}`, 140, finalY + 10)
  if (invoice.tax > 0) {
    doc.text(`Tax: $${invoice.tax.toLocaleString()}`, 140, finalY + 16)
  }
  doc.setFontSize(12)
  doc.text(`Total: $${invoice.total.toLocaleString()}`, 140, finalY + 24)

  // Terms & notes
  doc.setFontSize(10)
  doc.text("Terms:", 14, finalY + 40)
  doc.text(invoice.terms, 14, finalY + 46, { maxWidth: 180 })

  // Save
  doc.save(`${invoice.invoiceNumber}.pdf`)
}


export default function InvoiceDetailPage({ params }: { params: { Id: string } }) {
  const invoiceId = parseInt(params.Id)
  const invoice = (mockInvoiceData as any)[invoiceId] || mockInvoiceData[1]
  const [showEmailModal, setShowEmailModal] = useState(false)

  // invoice printing tag
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (!printRef.current) return;
    
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-500 text-white'
      case 'Pending': return 'bg-yellow-500 text-white'
      case 'Overdue': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const handleSendEmail = (emailData: any) => {
    console.log('Sending invoice email:', emailData)
    alert('Invoice email sent successfully!')
    setShowEmailModal(false)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/crm/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">{invoice.invoiceNumber}</h1>
            <p className="text-muted-foreground mt-2">{invoice.client}</p>
          </div>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={()=> handleDownloadPDF(invoice)}>
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => setShowEmailModal(true)}
          >
            <Mail className="h-4 w-4" />
            Send Invoice
          </Button>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" ref={printRef}>
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Info */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Invoice Number</p>
                  <p className="font-semibold">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-semibold">{invoice.client}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Issue Date</p>
                  <p className="font-semibold">{invoice.issueDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-semibold">{invoice.dueDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground border-b pb-2">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>

                {invoice.items.map((item: any) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 text-sm py-2 border-b last:border-0">
                    <div className="col-span-6">{item.description}</div>
                    <div className="col-span-2 text-center">{item.quantity}</div>
                    <div className="col-span-2 text-right">${item.unitPrice.toLocaleString()}</div>
                    <div className="col-span-2 text-right font-semibold">${item.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="space-y-2 max-w-md ml-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${invoice.subtotal.toLocaleString()}</span>
                  </div>
                  {invoice.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax:</span>
                      <span className="font-medium">${invoice.tax.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">${invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Notes */}
          {(invoice.terms || invoice.notes) && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoice.terms && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Payment Terms</p>
                    <p className="text-sm">{invoice.terms}</p>
                  </div>
                )}
                {invoice.notes && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Notes</p>
                    <p className="text-sm">{invoice.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                  invoice.status === 'Paid' ? 'bg-green-100' : invoice.status === 'Overdue' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  {invoice.status === 'Paid' ? (
                    <Check className="h-8 w-8 text-green-600" />
                  ) : (
                    <Mail className="h-8 w-8 text-yellow-600" />
                  )}
                </div>
                <p className="text-2xl font-bold mb-1">${invoice.total.toLocaleString()}</p>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>
              </div>

              {invoice.status !== 'Paid' && (
                <div className="pt-4 border-t">
                  <Button className="w-full" onClick={() => setShowEmailModal(true)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" onClick={()=> handleDownloadPDF(invoice)}>
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                Print Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Mail className="h-4 w-4" />
                Email to Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Send Email Modal */}
      <SendEmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={handleSendEmail}
        defaultTo={invoice.clientEmail}
        subject={`Invoice ${invoice.invoiceNumber} from CRM System`}
        defaultBody={`Dear ${invoice.client},\n\nPlease find attached invoice ${invoice.invoiceNumber} for $${invoice.total.toLocaleString()}.\n\nDue date: ${invoice.dueDate}\n\nThank you for your business!\n\nBest regards,\nCRM System`}
      />
    </div>
  )
}