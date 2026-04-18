'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail } from 'lucide-react'

interface SendEmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: (data: any) => void
  defaultTo?: string
  subject?: string
  defaultBody?: string
}

export default function SendEmailModal({ 
  isOpen, 
  onClose, 
  onSend, 
  defaultTo = '', 
  subject = '', 
  defaultBody = '' 
}: SendEmailModalProps) {
  const [emailData, setEmailData] = useState({
    to: defaultTo,
    cc: '',
    bcc: '',
    subject: subject,
    body: defaultBody
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(emailData)
  }

  const handleClose = () => {
    setEmailData({
      to: defaultTo,
      cc: '',
      bcc: '',
      subject: subject,
      body: defaultBody
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Invoice Email
          </DialogTitle>
          <DialogDescription>
            Send the invoice to your client via email
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To *</Label>
            <Input
              id="to"
              name="to"
              type="email"
              placeholder="client@example.com"
              value={emailData.to}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cc">CC</Label>
              <Input
                id="cc"
                name="cc"
                type="email"
                placeholder="cc@example.com"
                value={emailData.cc}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcc">BCC</Label>
              <Input
                id="bcc"
                name="bcc"
                type="email"
                placeholder="bcc@example.com"
                value={emailData.bcc}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Invoice #INV-2025-001"
              value={emailData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Message *</Label>
            <Textarea
              id="body"
              name="body"
              placeholder="Enter your email message..."
              value={emailData.body}
              onChange={handleChange}
              rows={8}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}