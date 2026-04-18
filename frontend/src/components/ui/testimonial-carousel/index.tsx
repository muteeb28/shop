"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  TestimonialCard,
  type TestimonialCardProps,
} from "@/components/ui/testimonial-card"

export type TestimonialItem = Omit<TestimonialCardProps, "className">

export interface TestimonialCarouselProps {
  testimonials:  TestimonialItem[]
  autoAdvance?:  boolean   /* default true */
  interval?:     number    /* ms between auto-advance, default 5000 */
  className?:    string
}

export function TestimonialCarousel({
  testimonials,
  autoAdvance = true,
  interval = 5000,
  className,
}: TestimonialCarouselProps) {
  const trackRef    = useRef<HTMLDivElement>(null)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [active, setActive]   = useState(0)
  const [paused, setPaused]   = useState(false)
  const shouldReduce = useReducedMotion()
  const count = testimonials.length

  /* ── Scroll to card by index ── */
  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const card = track.children[index] as HTMLElement | undefined
      if (!card) return
      card.scrollIntoView({
        behavior: shouldReduce ? "instant" : "smooth",
        block: "nearest",
        inline: "center",
      })
      setActive(index)
    },
    [shouldReduce]
  )

  const prev = () => scrollTo((active - 1 + count) % count)
  const next = () => scrollTo((active + 1) % count)

  /* ── Auto-advance ── */
  useEffect(() => {
    if (!autoAdvance || shouldReduce || paused || count <= 1) return
    timerRef.current = setTimeout(() => scrollTo((active + 1) % count), interval)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [autoAdvance, shouldReduce, paused, active, count, interval, scrollTo])

  /* ── IntersectionObserver: update active index on scroll ── */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(track.children).indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { root: track, threshold: 0.6 }
    )

    Array.from(track.children).forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [count])

  /* ── Keyboard navigation ── */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev() }
    if (e.key === "ArrowRight") { e.preventDefault(); next() }
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={()    => setPaused(true)}
      onBlur={()     => setPaused(false)}
    >
      {/* ── Scrollable track ── */}
      <div
        ref={trackRef}
        role="region"
        aria-label={`Testimonials, ${active + 1} of ${count}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          "flex gap-5 overflow-x-auto",
          "snap-x snap-mandatory",
          "scrollbar-none",
          "pb-1"   /* prevents card shadows from clipping */
        )}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={i}
            {...t}
            className={cn(
              "snap-center shrink-0",
              /* responsive widths: 1 card mobile, 2 tablet, 3 desktop */
              "w-[88%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            )}
          />
        ))}
      </div>

      {/* ── Controls: arrows + dot indicators ── */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          {/* Prev arrow */}
          <Button
            variant="ar-ghost"
            size="ar-sm"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" aria-hidden>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "rounded-ar-pill transition-all duration-ar-base cursor-pointer",
                  i === active
                    ? "w-5 h-1.5 bg-ar-accent"
                    : "w-1.5 h-1.5 bg-ar-border hover:bg-ar-fg-subtle"
                )}
              />
            ))}
          </div>

          {/* Next arrow */}
          <Button
            variant="ar-ghost"
            size="ar-sm"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
