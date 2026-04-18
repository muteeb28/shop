"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormGroup } from "@/components/ui/form-group"

/* ── Step data ── */

const companySizes = [
  "Less than 10",
  "11 – 50",
  "51 – 200",
  "201 – 1,000",
  "1,001 – 5,000",
  "More than 5,000",
]

const talentTypes = [
  "Developers",
  "Designers",
  "Finance Experts",
  "Project Managers",
  "Product Managers",
  "Marketing Experts",
]

const engagementTypes = [
  { label: "Full-Time", desc: "160 hrs / month" },
  { label: "Part-Time", desc: "80 hrs / month" },
  { label: "Hourly", desc: "As needed" },
  { label: "Full Team", desc: "Dev + Design + QA" },
]

const trustedLogos = ["DoorDash", "Kohler", "Kraft Heinz", "Shiseido", "Bridgestone", "Priceline", "Okta", "Deckers"]

/* ── Page ── */

export default function HireNewPage() {
  const [step, setStep] = useState(1)
  const [companySize, setCompanySize] = useState("")
  const [talentType, setTalentType] = useState("")
  const [engagement, setEngagement] = useState("")
  const [form, setForm] = useState({ name: "", email: "", company: "" })
  const [submitted, setSubmitted] = useState(false)

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ar-background flex flex-col">
        <ClientHeader />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-ar-pill bg-ar-accent-soft flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-ar-accent" />
            </div>
            <h2 className="font-display text-heading-xl font-semibold text-ar-foreground mb-2">We&apos;ll be in touch!</h2>
            <p className="text-ar-fg-muted text-body-sm leading-relaxed">
              Thanks, {form.name.split(" ")[0] || "there"}! Our team will reach out within 24 hours to match you with the right talent.
            </p>
            <Button variant="ar-link" size="ar-sm" asChild className="mt-6">
              <Link href="/">← Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ar-background flex flex-col">
      <ClientHeader />

      <main className="flex-1 flex items-start justify-center py-10 sm:py-16 px-4 sm:px-6">
        <div className="w-full max-w-lg">

          {/* ── Step 1: Company size ── */}
          {step === 1 && (
            <div>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-fg-subtle mb-5">
                STEP 1
              </p>
              <h1 className="font-display text-heading-xl font-semibold text-ar-foreground mb-8 leading-snug">
                How many people are employed at your company?
              </h1>

              <div className="divide-y divide-ar-border">
                {companySizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setCompanySize(size); setStep(2) }}
                    className="w-full flex items-center justify-between px-1 py-4 text-left text-body-sm text-ar-fg-muted hover:text-ar-foreground hover:bg-ar-surface-muted transition-colors group cursor-pointer"
                  >
                    <span>{size}</span>
                    <ArrowRight className="h-4 w-4 text-ar-border group-hover:text-ar-fg-muted transition-colors" />
                  </button>
                ))}
              </div>

              <div className="mt-10 border-t border-ar-border pt-6">
                <Link href="/apply" className="text-body-sm text-ar-accent hover:underline">
                  Are you a freelancer?
                </Link>
              </div>
            </div>
          )}

          {/* ── Step 2: Talent type ── */}
          {step === 2 && (
            <div>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-fg-subtle mb-5">
                STEP 2
              </p>
              <h1 className="font-display text-heading-xl font-semibold text-ar-foreground mb-2 leading-snug">
                What kind of talent are you looking for?
              </h1>
              <p className="text-body-sm text-ar-fg-subtle mb-8">
                Company size: <span className="text-ar-fg-muted font-medium">{companySize}</span>
              </p>

              <div className="divide-y divide-ar-border">
                {talentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => { setTalentType(type); setStep(3) }}
                    className="w-full flex items-center justify-between px-1 py-4 text-left text-body-sm text-ar-fg-muted hover:text-ar-foreground hover:bg-ar-surface-muted transition-colors group cursor-pointer"
                  >
                    <span>{type}</span>
                    <ArrowRight className="h-4 w-4 text-ar-border group-hover:text-ar-fg-muted transition-colors" />
                  </button>
                ))}
              </div>

              <Button variant="ar-ghost" size="ar-sm" onClick={() => setStep(1)} className="mt-8 -ml-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          )}

          {/* ── Step 3: Engagement type ── */}
          {step === 3 && (
            <div>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-fg-subtle mb-5">
                STEP 3
              </p>
              <h1 className="font-display text-heading-xl font-semibold text-ar-foreground mb-2 leading-snug">
                How would you like to engage?
              </h1>
              <p className="text-body-sm text-ar-fg-subtle mb-8">
                {companySize} · {talentType}
              </p>

              <div className="divide-y divide-ar-border">
                {engagementTypes.map((eng) => (
                  <button
                    key={eng.label}
                    onClick={() => { setEngagement(eng.label); setStep(4) }}
                    className="w-full flex items-center justify-between px-1 py-4 text-left hover:bg-ar-surface-muted transition-colors group cursor-pointer"
                  >
                    <div>
                      <p className="text-body-sm text-ar-fg-muted group-hover:text-ar-foreground">{eng.label}</p>
                      <p className="text-caption text-ar-fg-subtle mt-0.5">{eng.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-ar-border group-hover:text-ar-fg-muted transition-colors" />
                  </button>
                ))}
              </div>

              <Button variant="ar-ghost" size="ar-sm" onClick={() => setStep(2)} className="mt-8 -ml-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          )}

          {/* ── Step 4: Contact details ── */}
          {step === 4 && (
            <div>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-ar-fg-subtle mb-5">
                STEP 4
              </p>
              <h1 className="font-display text-heading-xl font-semibold text-ar-foreground mb-2 leading-snug">
                Tell us about yourself
              </h1>
              <p className="text-body-sm text-ar-fg-subtle mb-8">
                {companySize} · {talentType} · {engagement}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormGroup label="Full Name" htmlFor="hire-name" required>
                  <Input id="hire-name" variant="ar" type="text" placeholder="Full name"
                    required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </FormGroup>

                <FormGroup label="Work Email" htmlFor="hire-email" required>
                  <Input id="hire-email" variant="ar" type="email" placeholder="Work e-mail"
                    required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </FormGroup>

                <FormGroup label="Company Name" htmlFor="hire-company" required>
                  <Input id="hire-company" variant="ar" type="text" placeholder="Company name"
                    required value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </FormGroup>

                <p className="text-caption text-ar-fg-subtle leading-relaxed pt-1">
                  By submitting, you acknowledge and agree to CareerSprint&apos;s{" "}
                  <Link href="#" className="text-ar-accent hover:underline">Terms and Conditions</Link>{" "}
                  and{" "}
                  <Link href="#" className="text-ar-accent hover:underline">Privacy Policy</Link>.
                </p>

                <Button type="submit" variant="ar-primary" size="ar-md" className="w-full">
                  Get matched with talent
                </Button>
              </form>

              <Button variant="ar-ghost" size="ar-sm" onClick={() => setStep(3)} className="mt-5 -ml-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-10">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-ar-pill transition-all ${
                  s <= step ? "w-6 bg-ar-accent" : "w-3 bg-ar-border"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

/* ── Shared header component ── */
function ClientHeader() {
  return (
    <header className="bg-ar-inverse flex items-center overflow-hidden shrink-0">
      {/* Logo block */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 shrink-0 border-r border-ar-inverse-fg/10">
        <Link href="/" className="text-ar-inverse-fg font-bold text-base sm:text-lg tracking-tight">
          CareerSprint
        </Link>
      </div>

      {/* Scrolling logo strip */}
      <div className="flex items-center overflow-hidden flex-1 min-w-0">
        <span className="hidden sm:block text-[11px] text-ar-inverse-fg/40 font-semibold uppercase tracking-wider px-4 shrink-0">
          Trusted by
        </span>
        <div className="flex items-center gap-6 sm:gap-10 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] py-3 sm:py-4">
          {trustedLogos.map((logo) => (
            <span
              key={logo}
              className="text-ar-inverse-fg/60 font-bold text-xs sm:text-sm tracking-wide shrink-0 hover:text-ar-inverse-fg/90 transition-colors cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
