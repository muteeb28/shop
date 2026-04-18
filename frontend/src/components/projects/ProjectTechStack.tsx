import { Tag } from "@/components/ui/tag"
import { Container } from "@/components/ui/container"
import { Project } from "./ProjectCard"

interface ProjectTechStackProps {
  project: Project
}

export function ProjectTechStack({ project }: ProjectTechStackProps) {
  const techStack = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js",
    "Express", "MongoDB", "PostgreSQL", "Stripe", "JWT", "Docker"
  ]

  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-heading-lg font-semibold text-ar-foreground mb-3">Technology Stack</h2>
        <p className="text-body-md text-ar-fg-muted">Built with modern and proven technologies</p>
      </div>

      <div className="rounded-ar-md border border-ar-border bg-ar-surface p-6">
        <h4 className="font-semibold text-ar-foreground mb-4">Technologies Used</h4>
        <div className="flex flex-wrap gap-2 mb-8">
          {techStack.map((tech, index) => (
            <Tag key={index} variant="subtle" size="sm">{tech}</Tag>
          ))}
        </div>

        <h4 className="font-semibold text-ar-foreground mb-3">Key Features:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 bg-ar-accent rounded-ar-pill shrink-0" />
              <span className="text-body-sm text-ar-fg-muted">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
