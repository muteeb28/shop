import { CheckCircle, Zap, Shield, Globe, Smartphone, Database } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Project } from "./ProjectCard"

interface ProjectFeaturesProps {
  project: Project
}

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for performance with blazing fast load times"
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Built with security best practices and modern standards"
    },
    {
      icon: Globe,
      title: "SEO Optimized",
      description: "Search engine friendly with proper meta tags and structure"
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Perfect experience on all devices and screen sizes"
    },
    {
      icon: Database,
      title: "Scalable",
      description: "Built to scale with your business growth"
    },
    {
      icon: CheckCircle,
      title: "Well Documented",
      description: "Comprehensive documentation and setup guides"
    }
  ]

  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-heading-lg font-semibold text-ar-foreground mb-3">Features &amp; Benefits</h2>
        <p className="text-body-md text-ar-fg-muted">Everything you need for a professional application</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="rounded-ar-md border border-ar-border bg-ar-surface p-6 text-center hover:shadow-ar-md transition-shadow">
            <div className="mx-auto p-3 bg-ar-accent-soft rounded-ar-md w-fit mb-4">
              <feature.icon className="h-6 w-6 text-ar-accent" />
            </div>
            <h3 className="font-semibold text-ar-foreground mb-2">{feature.title}</h3>
            <p className="text-body-sm text-ar-fg-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
