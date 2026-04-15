"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

import {
  ChevronDown,
  ChevronUp,
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

/* ─────────────────────────────── Data ─────────────────────────────── */

const stats = [
  { icon: Users,  value: "500+",   label: "Vetted Developers" },
  { icon: Clock,  value: "<48hr",  label: "Avg. Match Time" },
  { icon: Star,   value: "4.9/5",  label: "Developer Rating" },
  { icon: Award,  value: "Top 3%", label: "Acceptance Rate" },
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
    gradient: "from-blue-500 to-blue-700",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "backend",
    icon: Database,
    title: "Backend Engineers",
    tagline: "Scalable APIs. Reliable infrastructure.",
    description: "Architects who design data pipelines, microservices, and high-throughput systems.",
    skills: ["Node.js", "Python", "Go", "Django", "PostgreSQL", "Redis"],
    count: "8+",
    gradient: "from-emerald-500 to-emerald-700",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Developers",
    tagline: "iOS & Android. Native quality.",
    description: "Ship cross-platform or native apps that feel premium on every device.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
    count: "6+",
    gradient: "from-rose-500 to-rose-700",
    lightBg: "bg-rose-50 dark:bg-rose-950/30",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "ai-ml",
    icon: Cpu,
    title: "AI / ML Engineers",
    tagline: "Intelligence, built in.",
    description: "Integrate LLMs, build recommendation engines, or automate complex workflows.",
    skills: ["Python", "TensorFlow", "OpenAI", "LangChain", "PyTorch", "HuggingFace"],
    count: "5+",
    gradient: "from-amber-500 to-amber-700",
    lightBg: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    tagline: "Zero-downtime. Always available.",
    description: "From CI/CD pipelines to multi-region deployments — engineers who keep your stack bulletproof.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "GCP", "Azure"],
    count: "4+",
    gradient: "from-violet-500 to-violet-700",
    lightBg: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Designers",
    tagline: "Design that converts.",
    description: "End-to-end product designers who speak both design systems and developer handoff.",
    skills: ["Figma", "Framer", "Webflow", "Prototyping", "Design Systems"],
    count: "5+",
    gradient: "from-cyan-500 to-cyan-700",
    lightBg: "bg-cyan-50 dark:bg-cyan-950/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "fullstack",
    icon: Layers,
    title: "Full-Stack Engineers",
    tagline: "End-to-end ownership.",
    description: "Generalists who own the whole product — from database schema to landing page.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js", "Prisma"],
    count: "10+",
    gradient: "from-neutral-600 to-neutral-900",
    lightBg: "bg-neutral-100 dark:bg-neutral-800/40",
    iconColor: "text-neutral-600 dark:text-neutral-400",
  },
  {
    id: "ecommerce",
    icon: Globe,
    title: "E-commerce Specialists",
    tagline: "Built to sell.",
    description: "Shopify, custom storefronts, payments — engineers who know how to build for revenue.",
    skills: ["Shopify", "Next.js", "Stripe", "Sanity", "Medusa", "WooCommerce"],
    count: "4+",
    gradient: "from-orange-500 to-orange-700",
    lightBg: "bg-orange-50 dark:bg-orange-950/30",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
]

const steps = [
  {
    num: "01",
    icon: Clock,
    title: "Tell us what you need",
    desc: "Share your project requirements, tech stack preferences, and timeline. Our team reviews your needs within 24 hours.",
  },
  {
    num: "02",
    icon: Shield,
    title: "Get matched with experts",
    desc: "We hand-pick developers from our vetted talent pool who are the best fit for your project — no scrolling through hundreds of profiles.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Start building immediately",
    desc: "Begin working with your developer right away. Not satisfied in the first week? We'll find you a replacement at no cost.",
  },
]

const faqs = [
  {
    q: "How quickly can I hire a developer?",
    a: "Most clients are matched with a developer within 24–48 hours. Once you approve the match, your developer can start the same day.",
  },
  {
    q: "What if I'm not happy with the developer?",
    a: "We offer a 7-day trial period. If you're not satisfied for any reason, we'll rematch you with another developer at no additional cost.",
  },
  {
    q: "How are developers vetted?",
    a: "Every developer passes a rigorous screening: technical assessments, live coding challenges, communication evaluations, and background checks. Less than 5% of applicants make it through.",
  },
  {
    q: "What engagement models are available?",
    a: "We support full-time (160 hrs/month), part-time (80 hrs/month), and hourly engagements. You choose what fits your project.",
  },
  {
    q: "How much does it cost?",
    a: "Rates start from ₹2,000/hr depending on expertise and engagement type. You only pay for time worked — no hidden fees, no recruitment charges.",
  },
  {
    q: "Can I hire a full team instead of one developer?",
    a: "Yes! We can assemble full teams including developers, designers, QA engineers, and project managers — all sourced from our vetted network.",
  },
]

const trustedBrands = [
  "Razorpay", "Flipkart", "Swiggy", "Zomato", "Paytm", "CRED", "OYO",
  "Razorpay", "Flipkart", "Swiggy", "Zomato", "Paytm", "CRED", "OYO",
]

/* ─────────────────────────────── Sub-components ─────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors overflow-hidden cursor-pointer",
        open
          ? "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
          : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:border-neutral-300 dark:hover:border-neutral-700"
      )}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="font-medium text-neutral-900 dark:text-white text-sm sm:text-base">{q}</span>
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
          open ? "bg-neutral-900 dark:bg-white" : "bg-neutral-200 dark:bg-neutral-700"
        )}>
          {open
            ? <ChevronUp className="h-3.5 w-3.5 text-white dark:text-neutral-900" />
            : <ChevronDown className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
          }
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CategoryCard({ cat, index }: { cat: (typeof categories)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-neutral-100/60 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-200 group"
    >
      {/* Gradient top bar */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", cat.gradient)} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Icon + title */}
        <div className="flex items-start justify-between gap-3">
          <div className={cn("p-2.5 rounded-xl border", cat.lightBg, "border-neutral-200 dark:border-neutral-800")}>
            <cat.icon className={cn("h-5 w-5", cat.iconColor)} />
          </div>
          <span className="text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-emerald-500" />
            {cat.count} available
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-base leading-tight">{cat.title}</h3>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mt-0.5 italic">{cat.tagline}</p>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{cat.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {cat.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded-md"
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <Link
            href="/hire/new"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 dark:text-white group-hover:gap-2.5 transition-all"
          >
            Hire from this pool <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* Hero mini-cards — abstract category pills for the right panel */
function HeroMiniCard({ cat, index }: { cat: (typeof categories)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex items-center gap-3 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all cursor-default"
    >
      <div className={cn("p-2 rounded-lg shrink-0", cat.lightBg)}>
        <cat.icon className={cn("h-4 w-4", cat.iconColor)} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{cat.title}</p>
        <p className="text-xs text-neutral-400">{cat.count} vetted devs</p>
      </div>
      <div className="ml-auto shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 block" />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export default function HireTalentPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <main>

        {/* ── Hero ── */}
        <section className="bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900">
          <div className="container mx-auto px-6 py-20 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">

              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 rounded-full px-3.5 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400">Top 3% Vetted Talent — Hiring Now</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white leading-[1.06] tracking-tight">
                  A developer
                  <br />for every layer
                  <br />of your{" "}
                  <span className="text-green-600">product.</span>
                </h1>

                <p className="mt-5 text-neutral-500 dark:text-neutral-400 leading-relaxed text-base max-w-lg">
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
                      className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3.5 py-3 flex flex-col gap-1"
                    >
                      <s.icon className="h-4 w-4 text-neutral-400" />
                      <span className="text-lg font-bold text-neutral-900 dark:text-white leading-none">{s.value}</span>
                      <span className="text-[11px] text-neutral-400 leading-tight">{s.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link
                    href="/hire/new"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-7 py-3 font-semibold text-sm transition-colors"
                  >
                    Hire a Top Developer <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="text-sm text-neutral-400">
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
                  className="text-center text-xs text-neutral-400 mt-1"
                >
                  + more categories below
                </motion.p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Trusted brands (marquee) ── */}
        <section className="border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
          <div className="container mx-auto px-6 pt-8 pb-4 max-w-7xl">
            <p className="text-center text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-5">
              Trusted by leading brands & startups
            </p>
          </div>
          <div className="relative overflow-hidden pb-8">
            <div className="marquee-track">
              {trustedBrands.map((brand, i) => (
                <span
                  key={i}
                  className="mx-10 text-xl font-black tracking-tight text-neutral-300 dark:text-neutral-700 whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
          <div className="container mx-auto px-6 py-20 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                From brief to first commit in 48h
              </h2>
              <p className="mt-3 text-neutral-400 dark:text-neutral-500 text-sm max-w-md mx-auto">
                A simple, three-step process that gets you to work fast.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 overflow-hidden group hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <span className="text-8xl font-black text-neutral-100 dark:text-neutral-800 select-none absolute -bottom-4 right-4 leading-none group-hover:text-neutral-200 dark:group-hover:text-neutral-700 transition-colors">
                    {step.num}
                  </span>
                  <div className="relative z-10">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 w-fit mb-5 shadow-sm">
                      <step.icon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white text-base mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Categories grid ── */}
        <section className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-900">
          <div className="container mx-auto px-6 py-20 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                We have developers for every need
              </h2>
              <p className="mt-3 text-neutral-400 dark:text-neutral-500 text-sm max-w-lg mx-auto">
                From solo MVPs to enterprise platforms — browse our talent pools by specialty and get matched in under 48 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="relative overflow-hidden bg-neutral-900 dark:bg-neutral-950">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-600/10 rounded-full blur-3xl" />
          </div>
          <div className="relative container mx-auto px-6 py-20 text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-green-500 text-sm font-semibold tracking-wide uppercase mb-3">Ready to hire?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Your next hire is 48 hours away.
              </h2>
              <p className="mt-4 text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
                Tell us what you&apos;re building and we&apos;ll match you with the right expert — backed by a no-risk trial.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/hire/new"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-8 py-3 font-semibold text-sm transition-colors"
                >
                  Get matched now <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-neutral-500 text-sm">No setup fees · Cancel anytime</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white dark:bg-neutral-950">
          <div className="container mx-auto px-6 py-20 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-3 text-center">
              Frequently asked questions
            </h2>
            <p className="text-neutral-400 text-sm text-center mb-10">Everything you need to know before hiring.</p>
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
