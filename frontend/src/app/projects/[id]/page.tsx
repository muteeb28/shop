"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lens } from "@/components/ui/lens"

import { CheckCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { projects } from "@/data/projects"
import { ProjectFeatures } from "@/components/projects/ProjectFeatures"
import { ProjectPricing } from "@/components/projects/ProjectPricing"
import { ProjectTechStack } from "@/components/projects/ProjectTechStack"
import { useRouter } from "next/navigation"

type galleryTypes = {
  [key: string]: {
    label: string,
    alt: string,
    src: string
  }[]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string

  const router = useRouter();
  
  const project = projects.find(p => p.id === projectId)
  const techTags = ["Next.js", "React", "TypeScript", "Tailwind", "Node", "Stripe"]
  const previewImages = [
    {
      label: "Cart & Checkout",
      src: "/previews/ecommerce/cart.png",
      alt: "Sharwings cart checkout modal",
    },
    {
      label: "Admin Dashboard",
      src: "/previews/ecommerce/dashboard-analytics.png",
      alt: "Sharwings admin dashboard analytics view",
    },
    {
      label: "Admin Products",
      src: "/previews/ecommerce/dashboard-products.png",
      alt: "Sharwings admin products table",
    },
    {
      label: "Category Listing",
      src: "/previews/ecommerce/category-ledlights.png",
      alt: "Sharwings ledlights category listing",
    },
  ]

  const gallery : galleryTypes = {
    "crm":  [
    {
      label: "CRM Dashboard",
      src: "/previews/crm/crm_admin_db.png",
      alt: "crm main admin dashboard view",
    },
    {
      label: "Clients Management",
      src: "/previews/crm/crm_clients_list.png",
      alt: "crm clients management list view",
    },
    {
      label: "Clients Form",
      src: "/previews/crm/crm_create_client_form.png",
      alt: "crm clients create form",
    },
    {
      label: "Clients Details View",
      src: "/previews/crm/crm_client_single_preview.png",
      alt: "crm clients detailed single view page",
    },
    {
      label: "Leads Listing",
      src: "/previews/crm/crm_leads_list.png",
      alt: "crm leads overview page",
    },
    {
      label: "Leads Form",
      src: "/previews/crm/crm_create_lead_form.png",
      alt: "crm create lead form view",
    },
    {
      label: "Opportunities Listing",
      src: "/previews/crm/crm_opportunity_list.png",
      alt: "crm opportunities listing page view",
    },
    {
      label: "Opportunities Form",
      src: "/previews/crm/crm_create_opportunity_form.png",
      alt: "crm opportunities listing page view",
    },
    {
      label: "Quotation List",
      src: "/previews/crm/crm_quotation_list.png",
      alt: "crm quotation listing page view",
    },
    {
      label: "Quotation Form",
      src: "/previews/crm/crm_quotation_form.png",
      alt: "crm opportunities listing page view",
    },
    {
      label: "Invoice Management",
      src: "/previews/crm/crm_invoice_list.png",
      alt: "crm invoice management page view",
    },
    {
      label: "Invoice Management Form",
      src: "/previews/crm/crm_create_invoice_form.png",
      alt: "crm invoice management page view",
    },
        {
      label: "Invoice Preview",
      src: "/previews/crm/crm_invoice_preview.png",
      alt: "crm invoice preview page view",
    },
    {
      label: "Kanban Board (ticket listing & management)",
      src: "/previews/crm/crm_kanban_board.png",
      alt: "crm kanban board for ticket management view",
    },
    {
      label: "Documents storage and management",
      src: "/previews/crm/crm_documents_upload_section.png",
      alt: "crm document storage and mangaement view"
    }
  ]
  }
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link href="/">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleLivePreview = () => {
    const url = project.previewUrl || "https://www.sharwings.in/"
    const newTab = window.open(url, "_blank", "noopener,noreferrer")
    if (!newTab) {
      window.location.href = url
    }
  }

  return (
    <div className="min-h-screen bg-background">


      <section className="relative overflow-hidden bg-white dark:bg-neutral-900">
        <div className="absolute inset-0 bg-grid-slate opacity-60" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="rounded-full border-neutral-200 bg-white text-sm text-neutral-900 shadow-sm hover:bg-neutral-50"
                  onClick={handleLivePreview}
                  type="button"
                >
                  Live Preview
                </Button>
                <Button className="rounded-full text-sm" type="button">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart {project.price}
                </Button>
                <p className="text-xs text-muted-foreground">or get this with the bundle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="preview" className="container mx-auto px-4 pb-16">
        <h2 className="mb-6 text-2xl font-semibold text-neutral-900">Live Preview</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {(gallery[projectId] ?? previewImages).map((image) => (
            <figure
              key={image.src}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-white shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <div className="h-full w-full [&>div]:h-full [&>div]:w-full">
                  <Lens lensSize={180} zoomFactor={1.4}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </Lens>
                </div>
              </div>
              <figcaption className="px-4 py-3 text-sm font-semibold text-neutral-200">
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <ProjectFeatures project={project} />

      {/* Tech Stack */}
      <ProjectTechStack project={project} />

      {/* Pricing Section */}
      <ProjectPricing project={project} onLivePreview={handleLivePreview} />

      {/* Additional Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Complete source code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Deployment guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>6 months updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Node.js 18+</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>npm or yarn</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Git</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Modern browser</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Code editor (VS Code recommended)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
