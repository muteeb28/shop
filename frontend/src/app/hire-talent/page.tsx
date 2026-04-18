"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  Award,
  Star,
  Layers,
  Cpu,
  Smartphone,
  Globe,
  Cloud,
  Palette,
  Database,
  CheckCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button }        from "@/components/ui/button"
import { Tag }           from "@/components/ui/tag"
import { SectionHeader } from "@/components/ui/section-header"
import { Container }     from "@/components/ui/container"
import { StatBlock }     from "@/components/ui/stat-block"
import { NumberedStep }  from "@/components/ui/numbered-step"
import { FaqItem }       from "@/components/ui/faq-item"
import { CtaBand }       from "@/components/ui/cta-band"
import { MarqueeStrip }  from "@/components/ui/marquee-strip"

/* ─────────────────────────────── Data ─────────────────────────────── */

const stats = [
  { icon: Users,  value: "500+",   label: "Vetted Developers" },
  { icon: Clock,  value: "<48hr",  label: "Avg. Match Time"   },
  { icon: Star,   value: "4.9/5",  label: "Developer Rating"  },
  { icon: Award,  value: "Top 3%", label: "Acceptance Rate"   },
]

const categories = [
  {
    id: "frontend",
    icon: Globe,
    title: "Frontend Engineers",
    tagline: "Pixel-perfect UIs, blazing fast.",
    description: "React, Next.js, and beyond — engineers who turn designs into polished, performant interfaces.",
    skills: ["React", "Next.js", "TypeScript", "Vue", "Angular", "Tailwind CSS"],
    count: "12+",
  },
  {
    id: "backend",
    icon: Database,
    title: "Backend Engineers",
    tagline: "Scalable APIs. Reliable infrastructure.",
    description: "Architects who design data pipelines, microservices, and high-throughput systems.",
    skills: ["Node.js", "Python", "Go", "Django", "PostgreSQL", "Redis"],
    count: "8+",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Developers",
    tagline: "iOS & Android. Native quality.",
    description: "Ship cross-platform or native apps that feel premium on every device.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
    count: "6+",
  },
  {
    id: "ai-ml",
    icon: Cpu,
    title: "AI / ML Engineers",
    tagline: "Intelligence, built in.",
    description: "Integrate LLMs, build recommendation engines, or automate complex workflows.",
    skills: ["Python", "TensorFlow", "OpenAI", "LangChain", "PyTorch", "HuggingFace"],
    count: "5+",
  },
  {
    id: "devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    tagline: "Zero-downtime. Always available.",
    description: "From CI/CD pipelines to multi-region deployments — engineers who keep your stack bulletproof.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "GCP", "Azure"],
    count: "4+",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Designers",
    tagline: "Design that converts.",
    description: "End-to-end product designers who speak both design systems and developer handoff.",
    skills: ["Figma", "Framer", "Webflow", "Prototyping", "Design Systems"],
    count: "5+",
  },
  {
    id: "fullstack",
    icon: Layers,
    title: "Full-Stack Engineers",
    tagline: "End-to-end ownership.",
    description: "Generalists who own the whole product — from database schema to landing page.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js", "Prisma"],
    count: "10+",
  },
  {
    id: "ecommerce",
    icon: Globe,
    title: "E-commerce Specialists",
    tagline: "Built to sell.",
    description: "Shopify, custom storefronts, payments — engineers who know how to build for revenue.",
    skills: ["Shopify", "Next.js", "Stripe", "Sanity", "Medusa", "WooCommerce"],
    count: "4+",
  },
]

const steps = [
  {
    num: 1,
    icon: Clock,
    heading: "Tell us what you need",
    body: "Share your project requirements, tech stack preferences, and timeline. Our team reviews your needs within 24 hours.",
  },
  {
    num: 2,
    icon: Shield,
    heading: "Get matched with experts",
    body: "We hand-pick developers from our vetted talent pool who are the best fit for your project — no scrolling through hundreds of profiles.",
  },
  {
    num: 3,
    icon: Zap,
    heading: "Start building immediately",
    body: "Begin working with your developer right away. Not satisfied in the first week? We'll find you a replacement at no cost.",
  },
]

const faqs = [
  { q: "How quickly can I hire a developer?",      a: "Most clients are matched with a developer within 24–48 hours. Once you approve the match, your developer can start the same day." },
  { q: "What if I'm not happy with the developer?",a: "We offer a 7-day trial period. If you're not satisfied for any reason, we'll rematch you with another developer at no additional cost." },
  { q: "How are developers vetted?",               a: "Every developer passes a rigorous screening: technical assessments, live coding challenges, communication evaluations, and background checks. Less than 5% of applicants make it through." },
  { q: "What engagement models are available?",    a: "We support full-time (160 hrs/month), part-time (80 hrs/month), and hourly engagements. You choose what fits your project." },
  { q: "How much does it cost?",                   a: "Rates start from ₹2,000/hr depending on expertise and engagement type. You only pay for time worked — no hidden fees, no recruitment charges." },
  { q: "Can I hire a full team instead of one developer?", a: "Yes! We can assemble full teams including developers, designers, QA engineers, and project managers — all sourced from our vetted network." },
]

const trustedBrands = ["Razorpay", "Flipkart", "Swiggy", "Zomato", "Paytm", "CRED", "OYO"]

/* ─────────────────────────── Sub-components ──────────────────────── */

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, delay: (index % 4) * 0.07 }}
      className={cn(
        "group flex flex-col gap-4 rounded-ar-lg border border-ar-border bg-ar-surface p-5",
        "hover:shadow-ar-md transition-shadow duration-ar-base"
      )}
    >
      {/* Icon + availability */}
      <div className="flex items-start justify-between gap-3">
        <div className="p-2.5 rounded-ar-md bg-ar-surface-muted border border-ar-border">
          <cat.icon className="h-5 w-5 text-ar-accent" />
        </div>
        <span className="flex items-center gap-1.5 text-caption font-semibold text-ar-fg-muted bg-ar-surface-muted px-2.5 py-1 rounded-ar-pill border border-ar-border">
          <CheckCircle className="h-3 w-3 text-emerald-500" />
          {cat.count} available
        </span>
      </div>

      <div>
        <h3 className="text-heading-md font-semibold text-ar-foreground leading-tight">{cat.title}</h3>
        <p className="text-body-sm italic text-ar-fg-subtle mt-0.5">{cat.tagline}</p>
      </div>

      <p className="text-body-sm text-ar-fg-muted leading-relaxed flex-grow">{cat.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map((s) => (
          <Tag key={s} variant="subtle" size="sm">{s}</Tag>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-3 border-t border-ar-border">
        <Link
          href="/hire/new"
          className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-ar-foreground group-hover:gap-2.5 transition-all duration-ar-fast"
        >
          Hire from this pool
          <ArrowRight className="h-4 w-4 text-ar-fg-subtle group-hover:text-ar-foreground transition-colors" />
        </Link>
      </div>
    </motion.div>
  )
}

function HeroMiniCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
      className={cn(
        "bg-ar-surface border border-ar-border rounded-ar-md p-3.5 flex items-center gap-3",
        "hover:border-ar-border-strong transition-colors duration-ar-fast cursor-default"
      )}
    >
      <div className="p-2 rounded-ar-sm bg-ar-surface-muted shrink-0">
        <cat.icon className="h-4 w-4 text-ar-accent" />
      </div>
      <div className="min-w-0">
        <p className="text-body-sm font-semibold text-ar-foreground truncate">{cat.title}</p>
        <p className="text-caption text-ar-fg-subtle">{cat.count} vetted devs</p>
      </div>
      <div className="ml-auto shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 block" aria-hidden />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export default function HireTalentPage() {
  return (
    <div className="min-h-screen bg-ar-background dark:bg-neutral-950">
      <main>

        {/* ── Hero ── */}
        <section className="bg-ar-surface dark:bg-neutral-950 border-b border-ar-border/60">
          <Container className="py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">

              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Tag variant="subtle" className="mb-6 inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                  Top 3% Vetted Talent — Hiring Now
                </Tag>

                <h1 className="font-display text-display-lg font-semibold text-ar-foreground dark:text-white leading-[1.06] tracking-tight">
                  A developer<br />
                  for every layer<br />
                  of your{" "}
                  <span className="text-ar-accent">product.</span>
                </h1>

                <p className="mt-5 text-body-lg text-ar-fg-muted dark:text-neutral-400 leading-relaxed max-w-lg">
                  Whatever you're building — we have world-class engineers who specialize in it.
                  Every developer in our network is hand-vetted. Less than 5% make it through.
                </p>

                {/* Stats row */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                      className="bg-ar-surface-muted border border-ar-border rounded-ar-md px-3.5 py-3 flex flex-col gap-1"
                    >
                      <s.icon className="h-4 w-4 text-ar-fg-subtle" />
                      <span className="text-heading-lg font-bold text-ar-foreground dark:text-white leading-none">{s.value}</span>
                      <span className="text-caption text-ar-fg-subtle leading-tight">{s.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Button variant="ar-primary" size="ar-md" asChild>
                    <Link href="/hire/new" className="inline-flex items-center gap-2">
                      Hire a Top Developer <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-body-sm text-ar-fg-subtle">
                    No-risk 7-day trial. Pay only if satisfied.
                  </p>
                </div>
              </motion.div>

              {/* Right — category list */}
              <div className="flex flex-col gap-2.5">
                {categories.slice(0, 6).map((cat, i) => (
                  <HeroMiniCard key={cat.id} cat={cat} index={i} />
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-caption text-ar-fg-subtle mt-1"
                >
                  + more categories below
                </motion.p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Trusted brands marquee ── */}
        <section className="border-b border-ar-border/60 bg-ar-surface-muted overflow-hidden py-8">
          <p className="text-center text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-fg-subtle mb-5">
            Trusted by leading brands &amp; startups
          </p>
          <MarqueeStrip
            items={[...trustedBrands, ...trustedBrands].map((brand) => (
              <span key={brand} className="text-heading-lg font-black tracking-tight text-ar-border px-8 whitespace-nowrap">
                {brand}
              </span>
            ))}
            speed="slow"
          />
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-ar-background dark:bg-neutral-950 border-b border-ar-border/40 py-20">
          <Container>
            <div className="mb-12">
              <SectionHeader
                eyebrow="Process"
                heading="From brief to first commit in 48h"
                body="A simple, three-step process that gets you to work fast."
                align="center"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {steps.map((step) => (
                <NumberedStep
                  key={step.num}
                  number={step.num}
                  heading={step.heading}
                  body={step.body}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ── Categories grid ── */}
        <section className="bg-ar-surface dark:bg-neutral-900 border-b border-ar-border/40 py-20">
          <Container>
            <div className="mb-12">
              <SectionHeader
                eyebrow="Talent pools"
                heading="We have developers for every need"
                body="From solo MVPs to enterprise platforms — browse our talent pools by specialty and get matched in under 48 hours."
                align="center"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── CTA Band ── */}
        <CtaBand
          eyebrow="Ready to hire?"
          heading="Your next hire is 48 hours away."
          body="Tell us what you're building and we'll match you with the right expert — backed by a no-risk trial."
          primaryCta={
            <Button variant="ar-inverse" size="ar-md" asChild>
              <Link href="/hire/new" className="inline-flex items-center gap-2">
                Get matched now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
          secondaryCta={
            <span className="text-ar-inverse-fg/60 text-body-sm">No setup fees · Cancel anytime</span>
          }
        />

        {/* ── FAQ ── */}
        <section className="bg-ar-background dark:bg-neutral-950 py-20">
          <Container size="narrow">
            <div className="mb-10">
              <SectionHeader
                eyebrow="FAQ"
                heading="Frequently asked questions"
                body="Everything you need to know before hiring."
                align="center"
              />
            </div>
            <div className="border-t border-ar-border">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </Container>
        </section>

      </main>
    </div>
  )
}
