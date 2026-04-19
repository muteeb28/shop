"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"

import { Button }               from "@/components/ui/button"
import { Container }             from "@/components/ui/container"
import { SectionHeader }         from "@/components/ui/section-header"
import { TestimonialCarousel }   from "@/components/ui/testimonial-carousel"
import { StatsGrid }             from "@/components/ui/stats-grid"

import { TESTIMONIALS, STATS }   from "@/data/testimonials"
import { easing, duration }      from "@/lib/design-tokens"

interface TestimonialsSectionProps {
  /** Called when the primary "Get Started" CTA is clicked. If omitted,
   *  the button navigates to /hire/new instead. */
  onGetStarted?: () => void
}

export function TestimonialsSection({ onGetStarted }: TestimonialsSectionProps) {
  const shouldReduce = useReducedMotion()

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial:     { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0  },
          viewport:    { once: true, amount: 0.15 },
          transition:  { duration: duration.base, delay, ease: easing.outSoft },
        }

  return (
    <section className="bg-ar-background dark:bg-neutral-950 pt-6 pb-10 overflow-hidden">
      <Container>
        <div className="flex flex-col gap-10">

          {/* ── 1. Section header ── */}
          <motion.div {...fadeUp(0)}>
            <SectionHeader
              heading="What Our Loving Clients Say"
              body="We've helped businesses of all sizes unlock growth, refine their strategies, and achieve lasting results. Here's what our clients say."
              align="center"
            />
          </motion.div>

          {/* ── 2. Testimonial carousel ── */}
          <motion.div {...fadeUp(0.07)}>
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </motion.div>

          {/* ── 3. Stats band ── */}
          <motion.div {...fadeUp(0.12)}>
            <StatsGrid stats={STATS} />
          </motion.div>

          {/* ── 4. CTA pair ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            {...fadeUp(0.16)}
          >
            {onGetStarted ? (
              <Button
                variant="primary"
                size="md"
                onClick={onGetStarted}
                rightIcon={<ArrowUpRight />}
              >
                Get Started
              </Button>
            ) : (
              <Button variant="primary" size="md" asChild>
                <Link href="/hire/new">
                  Get Started <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            )}

            <Button variant="secondary" size="md" asChild>
              <Link href="/hire-talent">
                Our Services <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
