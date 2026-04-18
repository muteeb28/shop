"use client"

import { useState } from "react"
import Link from "next/link"
import { Linkedin, Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, inputVariants } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const roles = [
  "Developer",
  "Designer",
  "Marketing Expert",
  "Management Consultant",
  "Project Manager",
  "Product Manager",
  "Finance Expert",
]

const trustedCompanies = [
  "Google",
  "Amazon",
  "Microsoft",
  "Bridgestone",
  "Shopify",
  "T-Systems",
]

export default function ApplyPage() {
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ar-background flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-ar-pill bg-ar-accent-soft flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-ar-accent" />
          </div>
          <h2 className="font-display text-heading-xl font-semibold text-ar-foreground mb-2">Application received!</h2>
          <p className="text-ar-fg-muted text-body-sm leading-relaxed">
            Thanks, {name.split(" ")[0] || "there"}! We&apos;ll review your application and get back to you within 48 hours.
          </p>
          <Button variant="ar-link" size="ar-sm" asChild className="mt-6">
            <Link href="/">← Back to home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ar-background flex flex-col">
      {/* Minimal logo header */}
      <header className="py-4 sm:py-5 px-4 sm:px-8 border-b border-ar-border flex justify-center">
        <Link href="/" className="text-xl font-bold tracking-tight text-ar-foreground">
          CareerSprint
        </Link>
      </header>

      <main className="flex-1 flex">
        {/* ── Form column ── */}
        <div className="flex-1 flex justify-center py-8 sm:py-12 px-4 sm:px-6">
          <div className="w-full max-w-[320px]">
            {/* Heading */}
            <div className="text-center mb-7">
              <h1 className="text-[22px] font-light text-ar-foreground leading-snug">
                Apply to Join<br />
                <span className="text-ar-fg-muted">the World&apos;s Top Talent Network</span>
              </h1>
              <p className="mt-3 text-caption text-ar-fg-subtle leading-relaxed">
                CareerSprint is an exclusive network of the world&apos;s top talent in
                business, design, and technology. We provide access to top companies,
                a community of experts, and resources that can help accelerate your career.
              </p>
            </div>

            {/* LinkedIn */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#006396] text-white py-2.5 px-4 text-body-sm font-medium transition-colors rounded-ar-md cursor-pointer"
            >
              <Linkedin className="h-4 w-4 fill-white" />
              Sign Up with LinkedIn
            </button>
            <p className="text-center text-caption text-ar-fg-subtle mt-1.5 leading-tight">
              By clicking Sign up with LinkedIn, you agree to let CareerSprint store your LinkedIn profile.
            </p>

            {/* OR divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-ar-border" />
              <span className="text-caption text-ar-fg-subtle border border-ar-border rounded-ar-pill w-6 h-6 flex items-center justify-center">or</span>
              <div className="flex-1 h-px bg-ar-border" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* Role dropdown */}
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className={cn(inputVariants({ variant: "ar" }), "appearance-none cursor-pointer")}
                >
                  <option value="" disabled>I&apos;m applying as...</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="h-4 w-4 text-ar-fg-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Full name */}
              <Input
                variant="ar"
                type="text"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Email */}
              <Input
                variant="ar"
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <div className="relative">
                <Input
                  variant="ar"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-3 flex items-center text-ar-fg-subtle hover:text-ar-fg-muted cursor-pointer"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Confirm password */}
              <div className="relative">
                <Input
                  variant="ar"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-3 flex items-center text-ar-fg-subtle hover:text-ar-fg-muted cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Terms */}
              <p className="text-caption text-ar-fg-subtle leading-relaxed pt-1">
                By submitting, you acknowledge and agree to CareerSprint&apos;s{" "}
                <Link href="#" className="text-ar-accent hover:underline">Terms and Conditions</Link>{" "}
                and{" "}
                <Link href="#" className="text-ar-accent hover:underline">Privacy Policy</Link>.
              </p>

              {/* Submit */}
              <Button type="submit" variant="ar-primary" size="ar-md" className="w-full mt-1">
                Apply to Join CareerSprint
              </Button>
            </form>

            {/* Switch to client */}
            <p className="text-center text-caption text-ar-fg-subtle mt-5">
              Looking to hire?{" "}
              <Link href="/hire/new" className="text-ar-accent hover:underline">
                Join as a client
              </Link>
            </p>
          </div>
        </div>

        {/* ── Right sidebar: company logos ── */}
        <aside className="hidden lg:flex w-72 border-l border-ar-border flex-col items-center pt-16 px-8 gap-10">
          <p className="text-body-sm text-ar-fg-muted font-light">Work with top companies</p>
          {trustedCompanies.map((company) => (
            <span key={company} className="font-bold text-xl tracking-tight text-ar-fg-muted hover:text-ar-foreground transition-colors">
              {company}
            </span>
          ))}
        </aside>
      </main>
    </div>
  )
}
