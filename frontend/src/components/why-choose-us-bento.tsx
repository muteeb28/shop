"use client"

import { motion, useReducedMotion } from "framer-motion"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { SectionHeader }             from "@/components/ui/section-header"
import { Container }                 from "@/components/ui/container"
import { easing, duration }          from "@/lib/design-tokens"
import {
  IconRocket,
  IconCode,
  IconBrandGithub,
  IconPackage,
  IconHeadset,
  IconCurrencyRupee,
  IconBolt,
} from "@tabler/icons-react"

/* ─────────────────────────────────────────────────────────────────────────────
   Animated visualisation headers
   Each panel uses bg-ar-inverse as the dark surface so the warm-toned dark
   green (#0D1A12) replaces the cold neutral-900 from before.
   Semantic colours (emerald = live/success, sky = progress/chat, rose/amber/
   violet = code syntax / macOS traffic lights) are intentionally kept.
───────────────────────────────────────────────────────────────────────────── */

const LaunchHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-ar-md bg-ar-inverse overflow-hidden relative p-4">
    {/* Timeline track */}
    <div className="absolute bottom-6 left-6 right-6 h-0.5 bg-ar-inverse-fg/10 rounded-full" />

    {["Idea", "Build", "Deploy", "Live 🚀"].map((label, i) => (
      <motion.div
        key={label}
        className="absolute bottom-3 flex flex-col items-center gap-1"
        style={{ left: `${14 + i * 24}%` }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.4, duration: 0.4 }}
      >
        <span className="text-caption text-ar-inverse-fg/60">{label}</span>
        <div className={`h-2.5 w-2.5 rounded-full ${i === 3 ? "bg-emerald-400" : "bg-ar-inverse-fg/30"}`} />
      </motion.div>
    ))}

    {/* Animated progress line */}
    <motion.div
      className="absolute bottom-4 left-[14%]"
      animate={{ x: ["0%", "186%"] }}
      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
    >
      <div className="h-0.5 w-16 bg-gradient-to-r from-sky-400 to-transparent rounded-full" />
    </motion.div>

    {/* "Live in days" badge */}
    <motion.div
      className="absolute top-4 right-4 rounded-ar-pill bg-sky-500/20 border border-sky-400/30 px-3 py-1 text-caption text-sky-300"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Live in days ✓
    </motion.div>
  </div>
)

const CodeHeader = () => {
  const lines = [
    { w: "w-24", color: "bg-sky-400/70"    },
    { w: "w-32", color: "bg-violet-400/70" },
    { w: "w-20", color: "bg-emerald-400/70"},
    { w: "w-28", color: "bg-amber-400/70"  },
    { w: "w-16", color: "bg-sky-400/70"    },
  ]
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-ar-md bg-ar-inverse overflow-hidden p-4 font-mono">
      {/* macOS traffic lights */}
      <div className="flex items-center gap-1.5 mb-3 absolute top-4 left-4">
        <span className="h-2 w-2 rounded-full bg-rose-400/80"   />
        <span className="h-2 w-2 rounded-full bg-amber-400/80"  />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80"/>
      </div>
      {/* Code lines */}
      <div className="mt-6 space-y-2 w-full">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1,  x: 0   }}
            transition={{ delay: i * 0.2, duration: 0.3, repeat: Infinity, repeatDelay: lines.length * 0.2 + 1 }}
          >
            <span className="text-ar-inverse-fg/20 text-caption w-3">{i + 1}</span>
            <div className={`h-1.5 ${line.w} rounded-full ${line.color}`} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const OwnershipHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-ar-md bg-ar-inverse overflow-hidden p-4 relative">
    <div className="flex gap-3 w-full items-center justify-center">
      {["src/", "docs/", "LICENSE"].map((file, i) => (
        <motion.div
          key={file}
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ delay: i * 0.3 + 0.2, duration: 0.4 }}
        >
          <div className="h-10 w-10 rounded-ar-sm bg-ar-inverse-fg/10 border border-ar-inverse-fg/10 flex items-center justify-center text-lg">
            {i === 0 ? "📁" : i === 1 ? "📄" : "✅"}
          </div>
          <span className="text-caption text-ar-inverse-fg/50">{file}</span>
        </motion.div>
      ))}
    </div>
    <motion.div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 text-caption text-emerald-400 border border-emerald-400/30 rounded-ar-pill px-3 py-0.5 bg-emerald-400/10"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      100% yours
    </motion.div>
  </div>
)

const IncludedHeader = () => {
  const features = ["Auth", "Payments", "Dashboard", "Admin Panel", "API"]
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-ar-md bg-ar-inverse overflow-hidden p-4">
      <div className="grid grid-cols-2 gap-2 w-full content-start">
        {features.map((f, i) => (
          <motion.div
            key={f}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1,  x: 0  }}
            transition={{ delay: i * 0.25, duration: 0.3, repeat: Infinity, repeatDelay: features.length * 0.25 + 1.5 }}
          >
            <span className="text-emerald-400 text-caption">✓</span>
            <span className="text-caption text-ar-inverse-fg/70">{f}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const SupportHeader = () => {
  const messages = [
    { text: "When can you deliver?",    self: false },
    { text: "Ready in 3 days 🚀",       self: true  },
    { text: "Can you add a dashboard?", self: false },
    { text: "Already included ✓",       self: true  },
  ]
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-ar-md bg-ar-inverse overflow-hidden p-3 flex-col gap-1.5">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-caption leading-snug ${
            msg.self
              ? "self-end   rounded-tr-sm bg-sky-500/80 text-white"
              : "self-start rounded-tl-sm bg-ar-inverse-fg/10 text-ar-inverse-fg/80"
          }`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.6, duration: 0.3, repeat: Infinity, repeatDelay: messages.length * 0.6 + 1 }}
        >
          {msg.text}
        </motion.div>
      ))}
    </div>
  )
}

const PricingHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-ar-md bg-ar-inverse overflow-hidden p-4 flex-col items-center justify-center gap-2">
    <motion.div
      className="text-3xl font-bold text-ar-inverse-fg"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      ₹<motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        25,000
      </motion.span>
    </motion.div>
    <div className="flex items-center gap-2">
      <span className="text-ar-inverse-fg/40 line-through text-body-sm">₹50,000</span>
      <motion.span
        className="bg-emerald-400/20 text-emerald-400 text-caption rounded-ar-pill px-2 py-0.5 border border-emerald-400/30"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Save 50%
      </motion.span>
    </div>
    <span className="text-ar-inverse-fg/30 text-caption">one-time · no subscription</span>
  </div>
)

const CustomHeader = () => {
  const steps = [
    { label: "Requirement" },
    { label: "Design"      },
    { label: "Dev"         },
    { label: "Deploy"      },
  ]
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-ar-md bg-ar-inverse overflow-hidden p-4">
      <div className="space-y-3 w-full">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <span className="text-caption text-ar-inverse-fg/40 w-20 shrink-0">{step.label}</span>
            <div className="flex-1 h-1.5 bg-ar-inverse-fg/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: i * 0.3 + 0.3, duration: 0.6, repeat: Infinity, repeatDelay: steps.length * 0.3 + 1.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Items ────────────────────────────────────────────────────────────────── */

const items = [
  {
    title:       "Ship in Days, Not Months",
    description: "Skip months of development. Get a production-ready app instantly and go from idea to live product in days.",
    header:      <LaunchHeader />,
    icon:        <IconRocket className="h-4 w-4 text-ar-accent" />,
  },
  {
    title:       "Battle-Tested Codebases",
    description: "Every project is built with modern technologies — Next.js, TypeScript, Tailwind — clean, scalable, and ready to extend.",
    header:      <CodeHeader />,
    icon:        <IconCode className="h-4 w-4 text-ar-accent" />,
  },
  {
    title:       "Full Source Code Ownership",
    description: "You own everything — the code, the docs, the deployment. No lock-in, no subscriptions.",
    header:      <OwnershipHeader />,
    icon:        <IconBrandGithub className="h-4 w-4 text-ar-accent" />,
  },
  {
    title:       "Everything Included Out of the Box",
    description: "Auth, payments, dashboards, admin panels — all wired up and ready. No extra setup, no missing pieces.",
    header:      <IncludedHeader />,
    icon:        <IconPackage className="h-4 w-4 text-ar-accent" />,
  },
  {
    title:       "Dedicated Support & Handoff",
    description: "We don't just hand over a zip file. We walk you through the code, help with deployment, and stay available for questions.",
    header:      <SupportHeader />,
    icon:        <IconHeadset className="h-4 w-4 text-ar-accent" />,
  },
  {
    title:       "Founder-Friendly Pricing",
    description: "Transparent, one-time pricing in INR. No hidden costs, no ongoing fees — just the product you need at a price that makes sense.",
    header:      <PricingHeader />,
    icon:        <IconCurrencyRupee className="h-4 w-4 text-ar-accent" />,
  },
  {
    title:       "Fast Customisations on Demand",
    description: "Need tweaks? We offer quick customisation sprints to tailor any project to your exact business needs.",
    header:      <CustomHeader />,
    icon:        <IconBolt className="h-4 w-4 text-ar-accent" />,
  },
]

/* ── Section ──────────────────────────────────────────────────────────────── */

export function WhyChooseUsBento() {
  const shouldReduce = useReducedMotion()

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial:    { opacity: 0, y: 16 },
          whileInView:{ opacity: 1, y: 0  },
          viewport:   { once: true, amount: 0.25 },
          transition: { duration: duration.base, delay, ease: easing.outSoft },
        }

  return (
    <section className="relative overflow-hidden bg-ar-background dark:bg-neutral-950 py-24">
      <Container>

        {/* Section header — reveals first */}
        <motion.div className="mb-14" {...fadeUp(0)}>
          <SectionHeader
            eyebrow="Why us"
            heading="Why choose us over others?"
            body="Production-ready builds plus hands-on delivery — buy a proven codebase or get it customized."
            align="center"
          />
        </motion.div>

        {/* Cards grid — reveals slightly after header */}
        <motion.div {...fadeUp(0.08)}>
          <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </motion.div>

      </Container>
    </section>
  )
}
