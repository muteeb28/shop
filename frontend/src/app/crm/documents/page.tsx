'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, X, CheckCircle } from 'lucide-react'

const mockClients = [
  { id: 1, name: 'John Smith', company: 'Acme Corporation' },
  { id: 2, name: 'Emma Wilson', company: 'TechVision Ltd' },
  { id: 3, name: 'Carlos Rodriguez', company: 'Global Solutions' },
  { id: 4, name: 'Anna Mueller', company: 'Innovation Labs' },
  { id: 5, name: 'David Lee', company: 'Digital Dynamics' }
]

interface UploadedFile {
  id: number
  name: string
  size: string
  type: string
  file: File
}

export default function DocumentsPage() {
  const [selectedClient, setSelectedClient] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent | React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      file: file
    }))
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const removeFile = (id: number) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadedFiles.length === 0 || !selectedClient) {
      alert('Please select a client and upload at least one file')
      return
    }
    // In a real app, this would upload files to backend
    console.log('Uploading files for client:', selectedClient)
    console.log('Files:', uploadedFiles)
    alert('Documents uploaded successfully!')
    setUploadedFiles([])
    setSelectedClient('')
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Upload Documents</h1>
        <p className="text-muted-foreground mt-2">Upload and manage client documents</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Client</CardTitle>
            <CardDescription>Choose the client these documents belong to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <select
                id="client"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              >
                <option value="">Select a client...</option>
                {mockClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.company}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>Supported formats: PDF, ZIP, DOCX, Images (JPG, PNG, etc.)</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.zip,.docx,.doc,.jpg,.jpeg,.png,.gif"
              />
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">Drag and drop files here</p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                </div>
                <Button type="button" variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold">Uploaded Files ({uploadedFiles.length})</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-card"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{file.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{file.type}</Badge>
                            <span className="text-xs text-muted-foreground">{file.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setUploadedFiles([])
              setSelectedClient('')
            }}
          >
            Clear All
          </Button>
          <Button type="submit" disabled={uploadedFiles.length === 0 || !selectedClient}>
            Upload Documents
          </Button>
        </div>
      </form>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>Maximum file size: 10 MB per file</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>Supported formats: PDF, ZIP, DOCX, DOC, JPG, JPEG, PNG, GIF</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>You can upload multiple files at once</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>All documents are securely stored and encrypted</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}