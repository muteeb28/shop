"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"


import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Code2,
  Briefcase,
  Star,
} from "lucide-react"
import Link from "next/link"

/* ─────────────────────────────── Data ─────────────────────────────── */

const featuredDevs = [
  {
    id: "f1",
    name: "Iqram",
    title: "Full-Stack Engineer",
    photo: "/developers/arjun-sharma.png",
    objectPosition: "center top",
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8",
    previousCompany: "Google",
  },
  {
    id: "f2",
    name: "Arslan",
    title: "Backend Engineer",
    photo: "/developers/rohit-verma.jpg",
    objectPosition: "center 18%",
    gradientFrom: "#34d399",
    gradientTo: "#059669",
    previousCompany: "Amazon",
  },
  {
    id: "f3",
    name: "Karan Bhatia",
    title: "AI / ML Engineer",
    photo: "/developers/arjun-sharma.png",
    objectPosition: "center top",
    gradientFrom: "#fbbf24",
    gradientTo: "#d97706",
    previousCompany: "Microsoft",
  },
  {
    id: "f4",
    name: "Divya Nair",
    title: "UI/UX Developer",
    photo: "/developers/rohit-verma.jpg",
    objectPosition: "center 18%",
    gradientFrom: "#22d3ee",
    gradientTo: "#0891b2",
    previousCompany: "Zomato",
  },
]

const developers = [
  {
    id: "dev-1",
    name: "Iqram",
    title: "Full-Stack Engineer",
    photo: "/developers/arjun-sharma.png",
    objectPosition: "center top",
    initials: "IQ",
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8",
    experience: 7,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    previousCompany: "Google",
    hourlyRate: "₹3,500/hr",
    available: true,
  },
  {
    id: "dev-2",
    name: "Priya Mehta",
    title: "React / Next.js Specialist",
    photo: "/developers/rohit-verma.jpg",
    objectPosition: "center 18%",
    initials: "PM",
    gradientFrom: "#a78bfa",
    gradientTo: "#7c3aed",
    experience: 5,
    skills: ["React", "Next.js", "Tailwind CSS", "GraphQL"],
    previousCompany: "Flipkart",
    hourlyRate: "₹2,800/hr",
    available: true,
  },
  {
    id: "dev-3",
    name: "Arslan",
    title: "Backend / DevOps Engineer",
    photo: "/developers/rohit-verma.jpg",
    objectPosition: "center 18%",
    initials: "AR",
    gradientFrom: "#34d399",
    gradientTo: "#059669",
    experience: 9,
    skills: ["Python", "Django", "AWS", "Docker"],
    previousCompany: "Amazon",
    hourlyRate: "₹4,200/hr",
    available: false,
  },
  {
    id: "dev-4",
    name: "Sneha Kapoor",
    title: "Mobile App Developer",
    photo: "/developers/arjun-sharma.png",
    objectPosition: "center top",
    initials: "SK",
    gradientFrom: "#fb7185",
    gradientTo: "#e11d48",
    experience: 4,
    skills: ["React Native", "Flutter", "iOS", "Android"],
    previousCompany: "Swiggy",
    hourlyRate: "₹2,500/hr",
    available: true,
  },
  {
    id: "dev-5",
    name: "Karan Bhatia",
    title: "AI / ML Engineer",
    photo: "/developers/rohit-verma.jpg",
    objectPosition: "center 18%",
    initials: "KB",
    gradientFrom: "#fbbf24",
    gradientTo: "#d97706",
    experience: 6,
    skills: ["Python", "TensorFlow", "AI / ML", "OpenAI"],
    previousCompany: "Microsoft",
    hourlyRate: "₹5,000/hr",
    available: true,
  },
  {
    id: "dev-6",
    name: "Divya Nair",
    title: "UI/UX & Frontend Developer",
    photo: "/developers/arjun-sharma.png",
    objectPosition: "center top",
    initials: "DN",
    gradientFrom: "#22d3ee",
    gradientTo: "#0891b2",
    experience: 3,
    skills: ["Figma", "React", "Framer", "Tailwind CSS"],
    previousCompany: "Zomato",
    hourlyRate: "₹2,200/hr",
    available: true,
  },
  {
    id: "dev-7",
    name: "Vikram Joshi",
    title: "Cloud & Infrastructure Engineer",
    photo: "/developers/rohit-verma.jpg",
    objectPosition: "center 18%",
    initials: "VJ",
    gradientFrom: "#818cf8",
    gradientTo: "#4f46e5",
    experience: 8,
    skills: ["AWS", "Docker", "Kubernetes", "Node.js"],
    previousCompany: "Infosys",
    hourlyRate: "₹3,800/hr",
    available: true,
  },
  {
    id: "dev-8",
    name: "Ananya Reddy",
    title: "Angular & Enterprise Developer",
    photo: "/developers/arjun-sharma.png",
    objectPosition: "center top",
    initials: "AR",
    gradientFrom: "#fb923c",
    gradientTo: "#ea580c",
    experience: 6,
    skills: ["Angular", "TypeScript", "PostgreSQL", "Node.js"],
    previousCompany: "TCS",
    hourlyRate: "₹2,900/hr",
    available: false,
  },
  {
    id: "dev-9",
    name: "Mehul Shah",
    title: "Flutter / Mobile Specialist",
    photo: "/developers/rohit-verma.jpg",
    objectPosition: "center 18%",
    initials: "MS",
    gradientFrom: "#2dd4bf",
    gradientTo: "#0d9488",
    experience: 4,
    skills: ["Flutter", "Firebase", "iOS", "Android"],
    previousCompany: "Paytm",
    hourlyRate: "₹2,600/hr",
    available: true,
  },
]

const skills = [
  "React", "Next.js", "Node.js", "Python", "TypeScript", "Flutter",
  "React Native", "Angular", "Django", "PostgreSQL", "AWS", "Docker",
  "Kubernetes", "GraphQL", "Tailwind CSS", "AI / ML", "Figma", "iOS",
  "Android", "Firebase",
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

const trustedBrands = ["Razorpay", "Flipkart", "Swiggy", "Zomato", "Paytm", "CRED", "OYO"]

/* ─────────────────────────────── Sub-components ─────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b border-neutral-200 dark:border-neutral-800 py-5 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium text-neutral-900 dark:text-white text-sm sm:text-base">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-neutral-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-neutral-400" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function DevPhoto({
  photo,
  name,
  gradientFrom,
  gradientTo,
  initials,
  objectPosition = "center top",
  className,
}: {
  photo: string
  name: string
  gradientFrom: string
  gradientTo: string
  initials: string
  objectPosition?: string
  className?: string
}) {
  const [err, setErr] = useState(false)

  if (err) {
    return (
      <div
        className={`flex items-center justify-center text-white font-bold ${className}`}
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      >
        {initials}
      </div>
    )
  }

  return (
    <Image
      src={photo}
      alt={name}
      fill
      className="object-cover"
      style={{ objectPosition }}
      onError={() => setErr(true)}
      unoptimized={photo.startsWith("http")}
    />
  )
}

function HeroDevCard({ dev }: { dev: (typeof featuredDevs)[0] }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Portrait photo area */}
      <div className="h-44 relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, ${dev.gradientTo}88 1px, transparent 1px)`,
            backgroundSize: "14px 14px",
          }}
        />
        <DevPhoto
          photo={dev.photo}
          name={dev.name}
          gradientFrom={dev.gradientFrom}
          gradientTo={dev.gradientTo}
          initials={dev.name.split(" ").map((n) => n[0]).join("")}
          objectPosition={dev.objectPosition}
          className="text-2xl"
        />
      </div>

      {/* Info section */}
      <div className="p-3.5">
        <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer leading-tight">
          {dev.name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <CheckCircle className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500 shrink-0" />
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Verified Expert</span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1">
          <Code2 className="h-3 w-3 shrink-0" />
          {dev.title}
        </p>
        <div className="mt-2.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800">
          <p className="text-[10px] text-neutral-400 uppercase tracking-wide font-semibold">Previously at</p>
          <p className="text-base font-black tracking-tight text-neutral-800 dark:text-neutral-200 mt-0.5">
            {dev.previousCompany}
          </p>
        </div>
      </div>
    </div>
  )
}

function DeveloperCard({ dev }: { dev: (typeof developers)[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-neutral-100 dark:hover:shadow-neutral-900/50 transition-shadow"
    >
      {/* Portrait photo area */}
      <div className="h-36 relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <div
          className="absolute inset-0 opacity-20 z-10"
          style={{
            backgroundImage: `radial-gradient(circle, ${dev.gradientTo}88 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
          }}
        />
        <DevPhoto
          photo={dev.photo}
          name={dev.name}
          gradientFrom={dev.gradientFrom}
          gradientTo={dev.gradientTo}
          initials={dev.initials}
          objectPosition={dev.objectPosition}
          className="text-lg w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Name & badge */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer">
                {dev.name}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500 shrink-0" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Verified Expert</span>
              </div>
            </div>
            {dev.available ? (
              <span className="text-[10px] font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full shrink-0">
                Available
              </span>
            ) : (
              <span className="text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-full shrink-0">
                Engaged
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{dev.title}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" />
            {dev.experience} yrs exp
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            4.9
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {dev.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded-md"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="font-bold text-neutral-900 dark:text-white text-sm">{dev.hourlyRate}</span>
            <p className="text-[10px] text-neutral-400 mt-0.5">prev. {dev.previousCompany}</p>
          </div>
          <Link
            href="/hire/new"
            className="rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 transition-colors"
          >
            Hire
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export default function HireTalentPage() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const filtered = activeSkill
    ? developers.filter((d) => d.skills.includes(activeSkill))
    : developers

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">


      <main>
        {/* ── Hero ── */}
        <section className="bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900">
          <div className="container mx-auto px-6 py-20 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white leading-[1.06] tracking-tight">
                  Hire the{" "}
                  <span className="relative inline-block">
                    Top 3%
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-neutral-900 dark:bg-white rounded-full" />
                  </span>
                  {" "}of
                  <br />Developers
                </h1>

                <p className="mt-6 text-neutral-600 dark:text-neutral-400 leading-relaxed text-base max-w-lg">
                  CareerSprint is a marketplace for top developers, engineers, programmers, coders, architects, and
                  consultants.{" "}
                  <strong className="text-neutral-800 dark:text-neutral-200 font-semibold">
                    Top companies
                  </strong>{" "}
                  and startups hire elite developers from CareerSprint for their most mission-critical projects.
                </p>

                <div className="mt-8">
                  <Link
                    href="/hire/new"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 font-semibold text-sm transition-colors"
                  >
                    Hire a Top Developer
                  </Link>
                </div>
                <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                  No-Risk Trial. Pay Only If Satisfied.
                </p>
              </motion.div>

              {/* Right: 2×2 featured developer cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="grid grid-cols-2 gap-4"
              >
                {featuredDevs.map((dev, i) => (
                  <motion.div
                    key={dev.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                  >
                    <HeroDevCard dev={dev} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trusted brands ── */}
        <section className="border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-6 py-10 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="shrink-0">
                <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest leading-snug text-center sm:text-left">
                  Trusted by leading<br />brands and startups
                </p>
              </div>
              <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800 hidden sm:block shrink-0" />
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {trustedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="text-lg font-black tracking-tight text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors cursor-default"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
          <div className="container mx-auto px-6 py-20 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                How it works
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-sm max-w-md mx-auto">
                From requirement to first commit in 48 hours.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7"
                >
                  <span className="text-5xl font-bold text-neutral-100 dark:text-neutral-800 select-none absolute top-5 right-6">
                    {step.num}
                  </span>
                  <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-4">
                    <step.icon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Browse by skill ── */}
        <section className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-900">
          <div className="container mx-auto px-6 py-20 max-w-7xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Browse by expertise
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-sm">
                Filter developers by the skills that matter most to your project.
              </p>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <button
                onClick={() => setActiveSkill(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeSkill === null
                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white dark:bg-neutral-950"
                }`}
              >
                All
              </button>
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setActiveSkill(activeSkill === skill ? null : skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    activeSkill === skill
                      ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white"
                      : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white dark:bg-neutral-950"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* Developer grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filtered.length > 0 ? (
                  filtered.map((dev) => <DeveloperCard key={dev.id} dev={dev} />)
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-3 text-center py-16 text-neutral-400 text-sm"
                  >
                    No developers found for this skill right now. Check back soon!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-neutral-900 dark:bg-neutral-950 border-y border-neutral-800">
          <div className="container mx-auto px-6 py-16 text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Ready to hire your developer?
              </h2>
              <p className="mt-4 text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
                Tell us what you&apos;re building and we&apos;ll match you with the right expert — usually within 24 hours.
              </p>
              <Link
                href="/hire/new"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold text-sm transition-colors"
              >
                Get matched now <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white dark:bg-neutral-950">
          <div className="container mx-auto px-6 py-20 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-10 text-center">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
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
