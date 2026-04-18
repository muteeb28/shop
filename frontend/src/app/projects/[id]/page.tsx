"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { Lens } from "@/components/ui/lens"
import { Container } from "@/components/ui/container"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { projects } from "@/data/projects"
import { ProjectFeatures } from "@/components/projects/ProjectFeatures"
import { ProjectPricing } from "@/components/projects/ProjectPricing"
import { ProjectTechStack } from "@/components/projects/ProjectTechStack"
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
      <div className="min-h-screen bg-ar-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-heading-xl font-semibold text-ar-foreground mb-4">Project not found</h1>
          <Button variant="ar-primary" size="ar-md" asChild>
            <Link href="/">Back to Projects</Link>
          </Button>
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
    <div className="min-h-screen bg-ar-background">

      {/* Hero */}
      <section className="bg-ar-background border-b border-ar-border">
        <Container className="py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="max-w-2xl">
              <h1 className="font-display text-heading-xl font-semibold text-ar-foreground sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-body-lg text-ar-fg-muted">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {techTags.map((tag) => (
                  <Tag key={tag} variant="subtle" size="sm">{tag}</Tag>
                ))}
              </div>
            </div>

            {/* Purchase card */}
            <div className="rounded-ar-md border border-ar-border bg-ar-surface p-5 shadow-ar-sm">
              <div className="flex flex-col gap-3">
                <Button
                  variant="ar-ghost"
                  size="ar-sm"
                  className="w-full"
                  onClick={handleLivePreview}
                  type="button"
                >
                  Live Preview
                </Button>
                <Button variant="ar-primary" size="ar-sm" className="w-full" type="button">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart {project.price}
                </Button>
                <p className="text-caption text-ar-fg-subtle text-center">or get this with the bundle</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Preview Gallery */}
      <section id="preview">
        <Container className="pb-16 pt-12">
          <h2 className="mb-6 font-display text-heading-lg font-semibold text-ar-foreground">Live Preview</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {(gallery[projectId] ?? previewImages).map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-ar-md border border-ar-border bg-ar-inverse shadow-ar-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-ar-inverse">
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
                <figcaption className="px-4 py-3 text-body-sm font-semibold text-ar-inverse-fg/80">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <ProjectFeatures project={project} />

      {/* Tech Stack */}
      <ProjectTechStack project={project} />

      {/* Pricing Section */}
      <ProjectPricing project={project} onLivePreview={handleLivePreview} />
    </div>
  )
}
