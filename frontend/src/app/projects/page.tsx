"use client"

import { projects } from "@/data/projects"

import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"

const DEFAULT_URL = "https://www.sharwings.in/"

function hasLiveUrl(p: typeof projects[0]) {
  return p.previewUrl !== DEFAULT_URL || p.id === "ecommerce-platform"
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">


      <div className="container mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900">All Projects</h1>
          <p className="mt-2 text-neutral-500">
            {projects.length} production-ready applications — pick one and ship faster.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const live = hasLiveUrl(project)
            return (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Preview area */}
                <div className="relative h-44 overflow-hidden bg-neutral-50">
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
                      <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                        <project.icon className="h-10 w-10 text-neutral-300" />
                      </div>
                    </div>
                  )}

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />

                  {/* Hover overlay buttons */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <Link
                      href={`/projects/${project.id}`}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      disabled={!live}
                      onClick={() => live && window.open(project.previewUrl, "_blank", "noopener,noreferrer")}
                      className="rounded-lg border border-white/60 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {live ? "Live Demo" : "Coming Soon"}
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{project.badge}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-neutral-500">{project.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-neutral-900 text-sm">{project.price}</div>
                      <div className="text-xs text-neutral-400">one-time</div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-neutral-500 line-clamp-2">{project.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
