import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { CheckCircle, Star } from "lucide-react"
import { Project } from "./ProjectCard"

interface ProjectPricingProps {
  project: Project
  onLivePreview?: () => void
}

export function ProjectPricing({ project, onLivePreview }: ProjectPricingProps) {
  const originalPrice = parseInt(project.price.replace('$', ''))
  const discountedPrice = Math.floor(originalPrice * 0.9)

  const livePreviewButton = onLivePreview ? (
    <Button variant="ar-ghost" size="ar-md" onClick={onLivePreview} type="button">
      Live Preview
    </Button>
  ) : (
    <Button variant="ar-ghost" size="ar-md" asChild>
      <a href={project.previewUrl} target="_blank" rel="noreferrer">
        Live Preview
      </a>
    </Button>
  )

  return (
    <div className="bg-ar-surface-muted">
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-heading-lg font-semibold text-ar-foreground mb-3">Simple Pricing for Advanced People</h2>
          <p className="text-body-md text-ar-fg-muted">Get instant access to the full source code</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-ar-md border border-ar-border bg-ar-surface p-8 shadow-ar-md">
            {/* Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-ar-pill bg-red-500 px-3 py-1 text-caption font-semibold text-white">
                Limited Time Offer
              </span>
            </div>

            {/* Header */}
            <div className="text-center pb-8">
              <h3 className="font-display text-heading-md font-semibold text-ar-foreground mb-2">Full Source Code License</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-ar-foreground">4.9/5</span>
                <span className="text-ar-fg-muted text-body-sm">(128 reviews)</span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl font-bold text-ar-accent">${discountedPrice}</div>
                <div className="text-2xl text-ar-fg-subtle line-through">${originalPrice}</div>
                <span className="inline-flex items-center rounded-ar-pill bg-emerald-500 px-3 py-1 text-caption font-semibold text-white">
                  Save 10%
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-ar-foreground">What you get:</h4>
                  {[
                    "Complete source code",
                    "Lifetime updates",
                    "24/7 support",
                    "Documentation",
                    "Deployment guide",
                    "Commercial license"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-ar-accent shrink-0" />
                      <span className="text-body-sm text-ar-fg-muted">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-ar-foreground">Perfect for:</h4>
                  {[
                    "Startups",
                    "Freelancers",
                    "Agencies",
                    "Enterprise",
                    "Learning projects",
                    "Client work"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-ar-accent shrink-0" />
                      <span className="text-body-sm text-ar-fg-muted">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="ar-primary" size="ar-md" className="flex-1">
                  Buy Now — ${discountedPrice}
                </Button>
                {livePreviewButton}
              </div>

              <p className="text-center text-caption text-ar-fg-subtle">
                30-day money-back guarantee · Instant download · Secure payment
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
