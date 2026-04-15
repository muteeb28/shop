"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SHARWINGS_PROJECTS } from "@/data/great-frontend-projects"

// Duplicate the cards array to create seamless loop
const DOUBLED_CARDS = [...SHARWINGS_PROJECTS, ...SHARWINGS_PROJECTS]

type CardData = typeof SHARWINGS_PROJECTS[0] & { gradientFallback?: string };

function ProjectCard({ card }: { card: CardData }) {

  const linkProps = { target: "_blank", rel: "noopener noreferrer" }

  return (
    <div className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[12px] overflow-hidden w-[280px] md:w-[360px] flex-shrink-0 mx-3">
      {/* Screenshot/Preview Image */}
      <div className="relative w-full h-[200px] overflow-hidden rounded-t-xl bg-gray-100">
        <Image
          src={`/previews/${card.name}.jpg`}
          alt={`Preview of ${card.title}`}
          fill
          className="object-cover object-top"
          sizes="360px"
        />
      </div>

      {/* Bottom section */}
      <div className="p-[20px] flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-[#2A2A2A] text-gray-400 text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-current">⚡</span> {card.level}
          </div>
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400 text-xs">₹{card.originalPrice}</span>
            <span className="text-green-600 font-semibold text-sm">₹{card.discountedPrice}</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">70% off</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-neutral-400 line-clamp-2 mb-4 flex-grow">
          {card.description}
        </p>

        {/* CTA Button */}
        <Link 
          href={card.href}
          {...linkProps}
          className="w-full mt-auto border border-gray-200 dark:border-neutral-800 bg-transparent text-gray-900 dark:text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors text-center inline-block"
        >
          Go to project &rarr;
        </Link>
      </div>
    </div>
  )
}

export function ProjectsGrid() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-20 min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section header above cards */}
        <div className="mb-12">
          <p className="text-green-400 text-sm uppercase tracking-widest mb-3 font-semibold">
            Projects
          </p>
          <h2 className="text-[#111111] dark:text-white text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Everything we build
          </h2>
          <p className="text-[#6B7280] dark:text-neutral-400 text-base max-w-xl leading-relaxed">
            From ecommerce to AI tools — explore the full suite of products built by Sharwings.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Track Container */}
      <div className="w-full overflow-hidden pb-10">
        <div className="marquee-track">
          {DOUBLED_CARDS.map((project, idx) => (
            <ProjectCard key={idx} card={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
