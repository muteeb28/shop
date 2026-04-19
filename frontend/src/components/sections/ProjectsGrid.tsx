"use client"

import Image from "next/image"
import Link from "next/link"
import { SHARWINGS_PROJECTS } from "@/data/great-frontend-projects"
import { SectionHeader } from "@/components/ui/section-header"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"

const DOUBLED_CARDS = [...SHARWINGS_PROJECTS, ...SHARWINGS_PROJECTS]

type CardData = typeof SHARWINGS_PROJECTS[0]

function ProjectCard({ card, priority = false }: { card: CardData; priority?: boolean }) {
  return (
    <div className="flex flex-col bg-ar-surface dark:bg-neutral-900 border border-ar-border dark:border-neutral-800 rounded-ar-md overflow-hidden w-[280px] md:w-[360px] flex-shrink-0 mx-3 transition-shadow duration-ar-base hover:shadow-ar-md">
      {/* Preview image */}
      <div className="relative w-full h-[200px] overflow-hidden bg-ar-surface-muted">
        <Image
          src={`/previews/${card.name}.jpg`}
          alt={`Preview of ${card.title}`}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
        />
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-grow gap-3">

        {/* Meta row: level badge + pricing */}
        <div className="flex items-center justify-between">
          <Tag variant="dark" size="sm">⚡ {card.level}</Tag>
          <div className="flex items-center gap-2">
            <span className="line-through text-caption text-ar-fg-subtle">₹{card.originalPrice}</span>
            <span className="text-body-sm font-semibold text-emerald-600">₹{card.discountedPrice}</span>
            <span className="bg-emerald-50 text-emerald-700 text-caption font-semibold px-2 py-0.5 rounded-ar-sm">70% off</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-heading-md font-semibold text-ar-foreground dark:text-white line-clamp-1">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-ar-fg-muted dark:text-neutral-400 line-clamp-2 leading-relaxed flex-grow">
          {card.description}
        </p>

        {/* CTA */}
        <Button variant="ar-ghost" size="ar-sm" className="mt-auto w-full justify-center" asChild>
          <Link href={card.href} target="_blank" rel="noopener noreferrer">
            Go to project →
          </Link>
        </Button>
      </div>
    </div>
  )
}

export function ProjectsGrid() {
  return (
    <section className="bg-ar-background dark:bg-neutral-950 pt-20 pb-6 overflow-hidden">

      {/* Section header */}
      <Container className="mb-12">
        <SectionHeader
          eyebrow="Projects"
          heading="Everything we build"
          body="From ecommerce to AI tools — explore the full suite of products built by Sharwings."
        />
      </Container>

      {/* Infinite marquee track */}
      <div className="w-full overflow-hidden pb-10">
        <div className="marquee-track">
          {DOUBLED_CARDS.map((project, idx) => (
            <ProjectCard
              key={idx}
              card={project}
              // First ~4 cards are visible in the initial viewport on desktop.
              // Only mark the original set (idx < SHARWINGS_PROJECTS.length) —
              // the duplicate set never appears on first render.
              priority={idx < 4}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
