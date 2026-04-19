"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ArrowRight } from "lucide-react"

import { Button }        from "@/components/ui/button"
import { Container }     from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { FaqItem }       from "@/components/ui/faq-item"
import { easing, duration } from "@/lib/design-tokens"

const FAQS = [
  {
    question: "What do you offer exactly?",
    answer:
      "We offer two things: ready-to-buy production apps (Next.js, TypeScript, full auth & payments) and on-demand talent hiring — vetted engineers you can bring onto your team immediately.",
    defaultOpen: true,
  },
  {
    question: "How long does delivery take?",
    answer:
      "Pre-built projects are available instantly after purchase. Custom builds typically ship in 2–4 weeks depending on scope. We set milestones upfront so you always know what's coming next.",
  },
  {
    question: "Do you work with startups or established companies?",
    answer:
      "Both. Startups love our speed-to-market approach — idea to live product in days. Established teams hire through us when they need to scale quickly without a long recruitment cycle.",
  },
  {
    question: "What's included when I buy a project?",
    answer:
      "Everything: full source code, documentation, deployment guide, and a handoff call. You own 100% of the codebase from day one — no lock-in, no subscriptions, no hidden fees.",
  },
  {
    question: "Do you offer support after purchase?",
    answer:
      "Yes. Every project comes with 30 days of async support. Need longer or a dedicated retainer? We offer ongoing support plans — just ask at checkout.",
  },
]

interface FaqSectionProps {
  onGetStarted?: () => void
}

export function FaqSection({ onGetStarted }: FaqSectionProps) {
  const shouldReduce = useReducedMotion()

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial:     { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0  },
          viewport:    { once: true, amount: 0.15 },
          transition:  { duration: duration.base, delay, ease: easing.outSoft },
        }

  return (
    <section className="bg-ar-surface-muted dark:bg-neutral-900 py-20 overflow-hidden">
      <Container>
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">

          {/* ── Header ── */}
          <motion.div {...fadeUp(0)}>
            <SectionHeader
              heading="Your Questions, Answered Clearly"
              body="Whether you're looking to buy a ready-made app or hire top talent, here are answers to the most common questions our clients ask."
              align="center"
            />
          </motion.div>

          {/* ── Two-col layout ── */}
          <motion.div
            {...fadeUp(0.07)}
            className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 items-start"
          >
            {/* Left — quote card */}
            <div className="rounded-ar-lg bg-ar-inverse overflow-hidden p-8 flex flex-col gap-6 h-full min-h-[320px]">
              {/* Quote mark */}
              <div className="w-10 h-10 rounded-ar-sm bg-ar-inverse-fg/10 flex items-center justify-center shrink-0">
                <span className="text-2xl font-serif text-ar-inverse-fg/60 leading-none select-none">"</span>
              </div>

              {/* Quote text */}
              <blockquote className="font-display italic text-[1.35rem] leading-snug text-ar-inverse-fg flex-1">
                "Our goal is to turn your idea into a live, production-ready product — fast, clean, and completely yours."
              </blockquote>

            </div>

            {/* Right — FAQ list + CTAs */}
            <div className="flex flex-col gap-6">
              <div className="rounded-ar-lg border border-ar-border bg-ar-surface overflow-hidden px-6">
                {FAQS.map((faq) => (
                  <FaqItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    defaultOpen={faq.defaultOpen}
                  />
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {onGetStarted ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onGetStarted}
                    rightIcon={<ArrowUpRight />}
                  >
                    Get Started
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" asChild>
                    <Link href="/hire/new">Get Started <ArrowUpRight className="w-4 h-4" /></Link>
                  </Button>
                )}
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/hire-talent">Our Services <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
