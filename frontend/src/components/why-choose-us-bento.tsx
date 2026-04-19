"use client"

import { Fragment } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Check, Minus, CheckCircle2 } from "lucide-react"

import { SectionHeader } from "@/components/ui/section-header"
import { Container }     from "@/components/ui/container"
import { cn }            from "@/lib/utils"
import { easing, duration } from "@/lib/design-tokens"

const ROWS = [
  "Ship to market in days, not months",
  "Production-grade code quality",
  "Full source code ownership",
  "Auth, payments & dashboard included",
  "Dedicated support & guided handoff",
  "Transparent pricing, no lock-in",
]

const TRUST_ITEMS = [
  "180+ Projects Completed",
  "Industry Experts",
  "Trusted by Founders",
  "Proven Results",
]

export function WhyChooseUsBento() {
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
    <section className="relative overflow-hidden bg-ar-background dark:bg-neutral-950 pt-10 pb-20">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col gap-12">

          {/* ── Header ── */}
          <motion.div {...fadeUp(0)}>
            <SectionHeader
              eyebrow="Why us"
              heading="Why build alone when you can ship in days?"
              body="From modern web apps to production SaaS — we bring years of hands-on expertise, battle-tested codebases, and a relentless focus on shipping."
              align="center"
            />
          </motion.div>

          {/* ── Comparison table ── */}
          <motion.div {...fadeUp(0.08)}>
            <div className="rounded-ar-md border border-ar-border overflow-hidden">

              {/* Header row */}
              <div className="grid grid-cols-[1fr_100px_120px] sm:grid-cols-[1fr_160px_180px]">
                <div className="px-5 py-4 text-body-sm font-semibold text-ar-fg-muted bg-ar-surface-muted border-b border-ar-border">
                  Benefits
                </div>
                <div className="px-4 py-4 text-body-sm font-semibold text-ar-fg-muted text-center bg-ar-surface-muted border-b border-l border-ar-border">
                  Doing It Alone
                </div>
                <div className="px-4 py-4 text-body-sm font-semibold text-white text-center bg-ar-inverse border-b border-l border-ar-inverse-fg/10">
                  With Jobflix
                </div>
              </div>

              {/* Data rows */}
              {ROWS.map((label, i) => (
                <div
                  key={label}
                  className={cn(
                    "grid grid-cols-[1fr_100px_120px] sm:grid-cols-[1fr_160px_180px]",
                    i < ROWS.length - 1 && "border-b border-ar-border"
                  )}
                >
                  <div className="px-5 py-4 text-body-sm text-ar-foreground">
                    {label}
                  </div>
                  <div className="px-4 py-4 flex items-center justify-center border-l border-ar-border bg-ar-surface">
                    <Minus className="w-4 h-4 text-ar-fg-subtle" />
                  </div>
                  <div className="px-4 py-4 flex items-center justify-center border-l border-ar-inverse-fg/10 bg-ar-inverse">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              ))}

            </div>
          </motion.div>

          {/* ── Trust bar ── */}
          <motion.div
            {...fadeUp(0.14)}
            className="flex flex-wrap items-center justify-center gap-y-3 gap-x-4"
          >
            {TRUST_ITEMS.map((item, i) => (
              <Fragment key={item}>
                <span className="flex items-center gap-2 text-body-sm text-ar-fg-muted">
                  <CheckCircle2 className="w-4 h-4 text-ar-accent shrink-0" />
                  {item}
                </span>
                {i < TRUST_ITEMS.length - 1 && (
                  <span className="hidden sm:block w-px h-4 bg-ar-border" />
                )}
              </Fragment>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
