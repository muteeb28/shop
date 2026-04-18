"use client"

import React from "react"
import { Mail, MessageCircle, Linkedin, Twitter, Youtube, Flame } from "lucide-react"
import { Container } from "@/components/ui/container"

const footerLinks = {
  products: [
    { label: "ResumeAssist",  href: "https://resumeassist.jobflix.in" },
    { label: "Shop",          href: "https://shop-career-sprint.vercel.app/" },
    { label: "Courses",       href: "/courses" },
    { label: "Jobs",          href: "/jobs" },
    { label: "Connect",       href: "/connect" },
  ],
  company: [
    { label: "Pricing",    href: "/pricing" },
    { label: "Team",       href: "/team" },
    { label: "Roadmap",    href: "/roadmap" },
    { label: "About",      href: "/about" },
    { label: "Contact us", href: "/contact" },
    { label: "Blog",       href: "/blog" },
  ],
  practice: [
    { label: "Get started",            href: "/prepare" },
    { label: "JavaScript functions",   href: "/prepare" },
    { label: "User interface coding",  href: "/prepare" },
    { label: "System design",          href: "/prepare" },
    { label: "Quiz",                   href: "/prepare" },
  ],
}

const socialLinks = [
  { icon: Mail,        label: "Email us",               href: "mailto:hello@jobflix.in" },
  { icon: MessageCircle, label: "Join Discord (private)", href: "#" },
  { icon: Linkedin,    label: "Follow our LinkedIn page", href: "#" },
  { icon: Twitter,     label: "Follow us on X",          href: "#" },
  { icon: Youtube,     label: "Follow us on YouTube",     href: "#" },
]

const quickLinks = [
  { label: "jobflix.in",              href: "https://jobflix.in" },
  { label: "resumeassist.jobflix.in", href: "https://resumeassist.jobflix.in" },
  { label: "ResumeAssistAI",          href: "https://resumeassist-ai.vercel.app/" },
  { label: "Career Shop",             href: "https://shop-career-sprint.vercel.app/" },
  { label: "Job Board",               href: "https://jobflix.in/jobs" },
  { label: "Courses",                 href: "https://jobflix.in/courses" },
  { label: "Interview Prep",          href: "https://jobflix.in/prepare" },
  { label: "Connect",                 href: "https://jobflix.in/connect" },
]

export default function SiteFooter() {
  return (
    <footer className="bg-ar-inverse text-ar-inverse-fg/60 transition-colors duration-300">
      <Container className="py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-ar-sm bg-ar-accent">
                <Flame className="h-5 w-5 text-ar-accent-fg fill-ar-accent-fg" />
              </div>
              <span className="text-heading-md font-bold text-ar-inverse-fg">JobFlix</span>
            </a>

            <div className="space-y-4">
              <p className="text-body-sm font-medium text-ar-inverse-fg/90">Your dream job is absolutely worth it.</p>
              <div className="space-y-2 text-body-sm leading-relaxed">
                <p>Don&apos;t hesitate to reach out. We&apos;re always here to help.</p>
                <p>Have questions, feedback, or anything to say? Tell us. We usually get back within 1–2 days.</p>
              </div>
            </div>

            <div className="mt-2 space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-body-sm text-ar-inverse-fg/60 transition-colors duration-ar-fast hover:text-ar-inverse-fg"
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="mb-6 text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-inverse-fg/40">Products</h3>
            <ul className="space-y-4 text-body-sm">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-ar-fast hover:text-ar-inverse-fg">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="mb-6 text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-inverse-fg/40">Company</h3>
            <ul className="space-y-4 text-body-sm">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-ar-fast hover:text-ar-inverse-fg">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Practice */}
          <div>
            <h3 className="mb-6 text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-inverse-fg/40">Practice</h3>
            <ul className="space-y-4 text-body-sm">
              {footerLinks.practice.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-ar-fast hover:text-ar-inverse-fg">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-ar-inverse-fg/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
            <p className="text-caption text-ar-inverse-fg/30">© 2025 Jobflix by careersprint. All rights reserved.</p>
            <div className="flex gap-6 text-caption text-ar-inverse-fg/30">
              <a href="/privacy" className="hover:text-ar-inverse-fg/60 transition-colors duration-ar-fast">Privacy Policy</a>
              <a href="/terms"   className="hover:text-ar-inverse-fg/60 transition-colors duration-ar-fast">Terms of Service</a>
            </div>
          </div>
        </Container>

        {/* Product quick-links strip */}
        <div className="border-t border-ar-inverse-fg/10 py-6">
          <Container>
            <p className="mb-4 text-center text-caption text-ar-inverse-fg/30">Our Products</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-ar-pill border border-ar-inverse-fg/10 px-4 py-1.5 text-caption text-ar-inverse-fg/40 transition-all duration-ar-fast hover:border-ar-inverse-fg/30 hover:text-ar-inverse-fg/70"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}
