"use client"

import { projects } from "@/data/projects"
import { Tag } from "@/components/ui/tag"
import { Container } from "@/components/ui/container"
import { Star } from "lucide-react"
import Link from "next/link"

const DEFAULT_URL = "https://www.sharwings.in/"

function hasLiveUrl(p: typeof projects[0]) {
  return p.previewUrl !== DEFAULT_URL || p.id === "ecommerce-platform"
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-ar-background">
      <Container className="py-16">
        <div className="mb-10">
          <h1 className="font-display text-heading-xl font-semibold text-ar-foreground">All Projects</h1>
          <p className="mt-2 text-body-md text-ar-fg-muted">
            {projects.length} production-ready applications — pick one and ship faster.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const live = hasLiveUrl(project)
            return (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-ar-md border border-ar-border bg-ar-surface shadow-ar-sm hover:shadow-ar-md transition-all duration-300"
              >
                {/* Preview area */}
                <div className="relative h-44 overflow-hidden bg-ar-surface-muted">
                  {live ? (
                    <iframe
                      src={project.previewUrl}
                      style={{
                        width: "1440px",
                        height: "900px",
                        transform: "scale(0.30)",
                        transformOrigin: "top left",
                        pointerEvents: "none",
                        border: "none",
                      }}
                      loading="lazy"
                      tabIndex={-1}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="p-4 rounded-ar-md bg-ar-surface border border-ar-border shadow-ar-sm">
                        <project.icon className="h-10 w-10 text-ar-fg-subtle" />
                      </div>
                    </div>
                  )}

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-ar-surface to-transparent pointer-events-none" />

                  {/* Hover overlay buttons */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <Link
                      href={`/projects/${project.id}`}
                      className="rounded-ar-md bg-ar-surface px-4 py-2 text-body-sm font-semibold text-ar-foreground shadow hover:bg-ar-surface-muted transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      disabled={!live}
                      onClick={() => live && window.open(project.previewUrl, "_blank", "noopener,noreferrer")}
                      className="rounded-ar-md border border-white/60 bg-white/10 px-4 py-2 text-body-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {live ? "Live Demo" : "Coming Soon"}
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-ar-foreground">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Tag variant="subtle" size="sm">{project.badge}</Tag>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-caption text-ar-fg-muted">{project.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-ar-foreground text-body-sm">{project.price}</div>
                      <div className="text-caption text-ar-fg-subtle">one-time</div>
                    </div>
                  </div>
                  <p className="mt-2 text-caption text-ar-fg-muted line-clamp-2">{project.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
