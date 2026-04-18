"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button }    from "@/components/ui/button"
import { Input }     from "@/components/ui/input"
import { Textarea }  from "@/components/ui/textarea"
import { FormGroup } from "@/components/ui/form-group"
import { Stepper }   from "@/components/ui/stepper"
import { Check, ChevronRight, ChevronLeft, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

interface BuildCustomProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STEPS = ["Founder Details", "Product Details", "Budget & Maintenance"]

const PRODUCT_TYPES = [
  "Web Application",
  "Mobile App (iOS / Android)",
  "E-commerce Platform",
  "SaaS Platform",
  "API / Backend Service",
  "Other",
]

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "$30,000 – $50,000",
  "$50,000+",
]

type FormData = {
  name: string; email: string; phone: string; company: string
  productType: string; description: string; features: string
  budget: string; maintenance: boolean
}

const initial: FormData = {
  name: "", email: "", phone: "", company: "",
  productType: "", description: "", features: "",
  budget: "", maintenance: false,
}

export function BuildCustomProjectModal({ open, onOpenChange }: BuildCustomProjectModalProps) {
  const [step, setStep]           = useState(0)
  const [form, setForm]           = useState<FormData>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({})

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const clearError = (field: keyof FormData) =>
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })

  const validateStep = () => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (step === 0) {
      if (!form.name.trim()) errs.name = "Name is required"
      if (!form.email.trim()) errs.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email"
    }
    if (step === 1) {
      if (!form.productType)     errs.productType  = "Select a product type"
      if (!form.description.trim()) errs.description = "Please describe your product"
    }
    if (step === 2) {
      if (!form.budget) errs.budget = "Select a budget range"
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next  = () => { if (!validateStep()) return; setStep((s) => s + 1) }
  const back  = () => setStep((s) => s - 1)
  const handleSubmit = () => { if (!validateStep()) return; console.log("Submission:", form); setSubmitted(true) }

  const handleClose = (val: boolean) => {
    onOpenChange(val)
    setTimeout(() => { setStep(0); setForm(initial); setErrors({}); setSubmitted(false) }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={!submitted}
        className="bg-ar-surface sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-ar-lg"
      >
        {submitted ? (
          <SuccessView onClose={() => handleClose(false)} />
        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-5 border-b border-ar-border">
              <DialogHeader className="mb-5">
                <DialogTitle className="font-display text-heading-xl font-semibold text-ar-foreground">
                  Build a Custom Project
                </DialogTitle>
                <DialogDescription className="text-body-sm text-ar-fg-muted">
                  Tell us about your idea — we'll get back within 24 hours.
                </DialogDescription>
              </DialogHeader>

              <Stepper steps={STEPS} current={step + 1} />
            </div>

            {/* Form body */}
            <div className="px-6 py-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.18 }}
                >
                  {step === 0 && <FounderStep form={form} set={set} errors={errors} clearError={clearError} />}
                  {step === 1 && <ProductStep form={form} set={set} errors={errors} clearError={clearError} />}
                  {step === 2 && <BudgetStep  form={form} set={set} errors={errors} clearError={clearError} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-ar-border bg-ar-surface-muted/50 rounded-b-ar-lg flex justify-between items-center">
              <Button
                variant="ar-ghost"
                size="ar-sm"
                onClick={back}
                disabled={step === 0}
                className={cn(step === 0 && "invisible")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>

              {step < STEPS.length - 1 ? (
                <Button variant="ar-primary" size="ar-sm" onClick={next}>
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button variant="ar-primary" size="ar-sm" className="px-6" onClick={handleSubmit}>
                  Submit Request
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* ── Step 1: Founder Details ── */

function FounderStep({ form, set, errors, clearError }: StepProps) {
  return (
    <div className="space-y-4">
      <p className="text-body-sm text-ar-fg-muted mb-4">Let's start with who you are.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormGroup label="Full Name" htmlFor="name" required error={errors.name}>
          <Input id="name" variant="ar" placeholder="Jane Doe"
            value={form.name} onChange={(e) => { set("name", e.target.value); clearError("name") }} />
        </FormGroup>

        <FormGroup label="Work Email" htmlFor="email" required error={errors.email}>
          <Input id="email" variant="ar" type="email" placeholder="jane@startup.com"
            value={form.email} onChange={(e) => { set("email", e.target.value); clearError("email") }} />
        </FormGroup>

        <FormGroup label="Phone" htmlFor="phone">
          <Input id="phone" variant="ar" type="tel" placeholder="+1 555 000 0000"
            value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </FormGroup>

        <FormGroup label="Company / Organisation" htmlFor="company">
          <Input id="company" variant="ar" placeholder="Acme Inc."
            value={form.company} onChange={(e) => set("company", e.target.value)} />
        </FormGroup>
      </div>
    </div>
  )
}

/* ── Step 2: Product Details ── */

function ProductStep({ form, set, errors, clearError }: StepProps) {
  return (
    <div className="space-y-4">
      <p className="text-body-sm text-ar-fg-muted mb-4">Tell us about what you want to build.</p>

      <FormGroup label="Product Type" required error={errors.productType}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { set("productType", type); clearError("productType") }}
              className={cn(
                "rounded-ar-md border px-3 py-2 text-body-sm font-medium text-left transition-colors cursor-pointer",
                form.productType === type
                  ? "border-ar-accent bg-ar-accent-soft text-ar-accent-soft-fg"
                  : "border-ar-border bg-ar-surface text-ar-fg-muted hover:border-ar-border-strong hover:text-ar-foreground"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </FormGroup>

      <FormGroup label="Product Description" required error={errors.description}>
        <Textarea variant="ar" placeholder="Describe your product idea in a few sentences…"
          value={form.description} className="min-h-[5rem]"
          onChange={(e) => { set("description", e.target.value); clearError("description") }} />
      </FormGroup>

      <FormGroup label="Key Features" hint="Optional — list the main features you have in mind, one per line.">
        <Textarea variant="ar" placeholder="e.g. User authentication, dashboard, payment checkout…"
          value={form.features} className="min-h-[4rem]"
          onChange={(e) => set("features", e.target.value)} />
      </FormGroup>
    </div>
  )
}

/* ── Step 3: Budget & Maintenance ── */

function BudgetStep({ form, set, errors, clearError }: StepProps) {
  return (
    <div className="space-y-5">
      <p className="text-body-sm text-ar-fg-muted mb-4">Almost done — help us understand scope.</p>

      <FormGroup label="Estimated Budget" required error={errors.budget}>
        <div className="flex flex-col gap-2">
          {BUDGET_RANGES.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => { set("budget", range); clearError("budget") }}
              className={cn(
                "rounded-ar-md border px-4 py-2.5 text-body-sm font-medium text-left flex items-center justify-between transition-colors cursor-pointer",
                form.budget === range
                  ? "border-ar-accent bg-ar-accent-soft text-ar-accent-soft-fg"
                  : "border-ar-border bg-ar-surface text-ar-fg-muted hover:border-ar-border-strong hover:text-ar-foreground"
              )}
            >
              {range}
              {form.budget === range && <Check className="w-4 h-4 text-ar-accent" />}
            </button>
          ))}
        </div>
      </FormGroup>

      {/* Maintenance opt-in */}
      <button
        type="button"
        onClick={() => set("maintenance", !form.maintenance)}
        className={cn(
          "w-full text-left rounded-ar-md border p-4 flex items-start gap-3 cursor-pointer transition-colors",
          form.maintenance
            ? "border-ar-accent bg-ar-accent-soft"
            : "border-ar-border bg-ar-surface hover:border-ar-border-strong"
        )}
      >
        <div className={cn(
          "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
          form.maintenance ? "border-ar-accent bg-ar-accent" : "border-ar-border"
        )}>
          {form.maintenance && <Check className="w-3 h-3 text-ar-accent-fg" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-ar-fg-subtle" />
            <span className="text-body-sm font-medium text-ar-foreground">Include Post-Delivery Maintenance</span>
          </div>
          <p className="text-body-sm text-ar-fg-muted mt-1 leading-relaxed">
            Opt in for ongoing bug fixes, updates, and performance monitoring after your product goes live. Billed monthly.
          </p>
        </div>
      </button>
    </div>
  )
}

/* ── Success View ── */

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center px-8 py-14 gap-4"
    >
      <div className="w-14 h-14 rounded-ar-pill bg-ar-accent-soft flex items-center justify-center mb-2">
        <Check className="w-7 h-7 text-ar-accent" />
      </div>
      <h3 className="font-display text-heading-xl font-semibold text-ar-foreground">Request Submitted!</h3>
      <p className="text-body-sm text-ar-fg-muted max-w-xs">
        Thanks for reaching out. Our team will review your project and get back to you within{" "}
        <span className="font-semibold text-ar-foreground">24 hours</span>.
      </p>
      <Button variant="ar-primary" size="ar-md" className="mt-4 px-8" onClick={onClose}>
        Done
      </Button>
    </motion.div>
  )
}

/* ── Shared step prop type ── */

type StepProps = {
  form: FormData
  set: (k: keyof FormData, v: string | boolean) => void
  errors: Partial<Record<keyof FormData, string>>
  clearError: (k: keyof FormData) => void
}
