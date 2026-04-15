"use client"

import React from "react"
import { Mail, MessageCircle, Linkedin, Twitter, Youtube, Flame } from "lucide-react"

const footerLinks = {
  products: [
    { label: "ResumeAssist", href: "https://resumeassist.jobflix.in" },
    { label: "Shop", href: "https://shop-career-sprint.vercel.app/" },
    { label: "Courses", href: "/courses" },
    { label: "Jobs", href: "/jobs" },
    { label: "Connect", href: "/connect" },
  ],
  company: [
    { label: "Pricing", href: "/pricing" },
    { label: "Team", href: "/team" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "About", href: "/about" },
    { label: "Contact us", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  practice: [
    { label: "Get started", href: "/prepare" },
    { label: "JavaScript functions", href: "/prepare" },
    { label: "User interface coding", href: "/prepare" },
    { label: "System design", href: "/prepare" },
    { label: "Quiz", href: "/prepare" },
  ],
}

const socialLinks = [
  { icon: Mail, label: "Email us", href: "mailto:hello@jobflix.in" },
  { icon: MessageCircle, label: "Join Discord (private)", href: "#" },
  { icon: Linkedin, label: "Follow our LinkedIn page", href: "#" },
  { icon: Twitter, label: "Follow us on X", href: "#" },
  { icon: Youtube, label: "Follow us on YouTube", href: "#" },
]

const quickLinks = [
  { label: "jobflix.in", href: "https://jobflix.in" },
  { label: "resumeassist.jobflix.in", href: "https://resumeassist.jobflix.in" },
  { label: "ResumeAssistAI", href: "https://resumeassist-ai.vercel.app/" },
  { label: "Career Shop", href: "https://shop-career-sprint.vercel.app/" },
  { label: "Job Board", href: "https://jobflix.in/jobs" },
  { label: "Courses", href: "https://jobflix.in/courses" },
  { label: "Interview Prep", href: "https://jobflix.in/prepare" },
  { label: "Connect", href: "https://jobflix.in/connect" },
]

export default function SiteFooter() {
  return (
    <footer className="bg-[#0A0A0A] text-[#9CA3AF] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Flame className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">JobFlix</span>
            </a>
            
            <div className="space-y-4">
              <p className="font-medium text-white/90">Your dream job is absolutely worth it.</p>
              <div className="space-y-2 text-sm leading-relaxed">
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
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-500">Products</h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-500">Company</h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Practice */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-500">Practice</h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.practice.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Products */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row md:px-12 lg:px-16">
          <p className="text-xs text-gray-600">© 2025 Jobflix by careersprint. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>

        {/* Product Quick Links Strip */}
        <div className="border-t border-white/10 px-6 py-6">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-center text-xs text-gray-600">Our Products</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-gray-500 transition-all hover:border-white/30 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
