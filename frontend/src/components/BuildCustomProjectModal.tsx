"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  // Step 1 – Founder
  name: string
  email: string
  phone: string
  company: string
  // Step 2 – Product
  productType: string
  description: string
  features: string
  // Step 3 – Budget & Maintenance
  budget: string
  maintenance: boolean
}

const initial: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  productType: "",
  description: "",
  features: "",
  budget: "",
  maintenance: false,
}

export function BuildCustomProjectModal({ open, onOpenChange }: BuildCustomProjectModalProps) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const clearError = (field: keyof FormData) =>
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })

  // ── Validation per step ──────────────────────────────────────────────────────
  const validateStep = () => {
    const errs: Partial<Record<keyof FormData, string>> = {}

    if (step === 0) {
      if (!form.name.trim()) errs.name = "Name is required"
      if (!form.email.trim()) errs.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email"
    }

    if (step === 1) {
      if (!form.productType) errs.productType = "Select a product type"
      if (!form.description.trim()) errs.description = "Please describe your product"
    }

    if (step === 2) {
      if (!form.budget) errs.budget = "Select a budget range"
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => {
    if (!validateStep()) return
    setStep((s) => s + 1)
  }

  const back = () => setStep((s) => s - 1)

  const handleSubmit = () => {
    if (!validateStep()) return
    // TODO: wire to API
    console.log("Custom project submission:", form)
    setSubmitted(true)
  }

  const handleClose = (val: boolean) => {
    onOpenChange(val)
    // reset after close animation finishes
    setTimeout(() => {
      setStep(0)
      setForm(initial)
      setErrors({})
      setSubmitted(false)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={!submitted}
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0"
      >
        {submitted ? (
          <SuccessView onClose={() => handleClose(false)} />
        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-border">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">Build a Custom Project</DialogTitle>
                <DialogDescription>
                  Tell us about your idea — we'll get back within 24 hours.
                </DialogDescription>
              </DialogHeader>

              {/* Step indicators */}
              <div className="flex items-center gap-0 mt-5">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                          i < step
                            ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                            : i === step
                            ? "bg-sky-600 text-white"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400"
                        )}
                      >
                        {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-medium hidden sm:block",
                          i === step ? "text-neutral-900 dark:text-white" : "text-neutral-400"
                        )}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-px mx-2 transition-colors",
                          i < step ? "bg-neutral-900 dark:bg-white" : "bg-neutral-200 dark:bg-neutral-700"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form body */}
            <div className="px-6 py-5 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18 }}
                >
                  {step === 0 && <FounderStep form={form} set={set} errors={errors} clearError={clearError} />}
                  {step === 1 && <ProductStep form={form} set={set} errors={errors} clearError={clearError} />}
                  {step === 2 && <BudgetStep form={form} set={set} errors={errors} clearError={clearError} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-muted/30 rounded-b-xl">
              <Button
                variant="ghost"
                size="sm"
                onClick={back}
                disabled={step === 0}
                className={cn(step === 0 && "invisible")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>

              {step < STEPS.length - 1 ? (
                <Button
                  size="sm"
                  className="bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 px-5"
                  onClick={next}
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700 text-white px-6"
                  onClick={handleSubmit}
                >
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

// ── Step 1: Founder Details ──────────────────────────────────────────────────

function FounderStep({
  form, set, errors, clearError,
}: {
  form: FormData
  set: (k: keyof FormData, v: string | boolean) => void
  errors: Partial<Record<keyof FormData, string>>
  clearError: (k: keyof FormData) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">Let's start with who you are.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name *" error={errors.name}>
          <Input
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => { set("name", e.target.value); clearError("name") }}
            className={errors.name ? "border-destructive" : ""}
          />
        </Field>

        <Field label="Work Email *" error={errors.email}>
          <Input
            type="email"
            placeholder="jane@startup.com"
            value={form.email}
            onChange={(e) => { set("email", e.target.value); clearError("email") }}
            className={errors.email ? "border-destructive" : ""}
          />
        </Field>

        <Field label="Phone">
          <Input
            type="tel"
            placeholder="+1 555 000 0000"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>

        <Field label="Company / Organisation">
          <Input
            placeholder="Acme Inc."
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </Field>
      </div>
    </div>
  )
}

// ── Step 2: Product Details ──────────────────────────────────────────────────

function ProductStep({
  form, set, errors, clearError,
}: {
  form: FormData
  set: (k: keyof FormData, v: string | boolean) => void
  errors: Partial<Record<keyof FormData, string>>
  clearError: (k: keyof FormData) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">Tell us about what you want to build.</p>

      <Field label="Product Type *" error={errors.productType}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { set("productType", type); clearError("productType") }}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer",
                form.productType === type
                  ? "border-sky-600 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300"
                  : "border-border hover:border-neutral-400 dark:hover:border-neutral-500 text-muted-foreground hover:text-foreground"
              )}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.productType && <p className="text-destructive text-xs mt-1">{errors.productType}</p>}
      </Field>

      <Field label="Product Description *" error={errors.description}>
        <Textarea
          placeholder="Describe your product idea in a few sentences…"
          value={form.description}
          onChange={(e) => { set("description", e.target.value); clearError("description") }}
          className={cn("min-h-20 resize-none", errors.description ? "border-destructive" : "")}
        />
      </Field>

      <Field label="Key Features (optional)">
        <Textarea
          placeholder="List the main features you have in mind, one per line…"
          value={form.features}
          onChange={(e) => set("features", e.target.value)}
          className="min-h-16 resize-none"
        />
      </Field>
    </div>
  )
}

// ── Step 3: Budget & Maintenance ─────────────────────────────────────────────

function BudgetStep({
  form, set, errors, clearError,
}: {
  form: FormData
  set: (k: keyof FormData, v: string | boolean) => void
  errors: Partial<Record<keyof FormData, string>>
  clearError: (k: keyof FormData) => void
}) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground mb-4">Almost done — help us understand scope.</p>

      <Field label="Estimated Budget *" error={errors.budget}>
        <div className="flex flex-col gap-2">
          {BUDGET_RANGES.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => { set("budget", range); clearError("budget") }}
              className={cn(
                "rounded-lg border px-4 py-2.5 text-sm font-medium text-left transition-colors flex items-center justify-between cursor-pointer",
                form.budget === range
                  ? "border-sky-600 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300"
                  : "border-border hover:border-neutral-400 dark:hover:border-neutral-500 text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
              {form.budget === range && <Check className="w-4 h-4 text-sky-600" />}
            </button>
          ))}
        </div>
        {errors.budget && <p className="text-destructive text-xs mt-1">{errors.budget}</p>}
      </Field>

      {/* Maintenance opt-in */}
      <div
        onClick={() => set("maintenance", !form.maintenance)}
        className={cn(
          "rounded-xl border p-4 flex items-start gap-3 cursor-pointer transition-colors",
          form.maintenance
            ? "border-sky-600 bg-sky-50 dark:bg-sky-950"
            : "border-border hover:border-neutral-400 dark:hover:border-neutral-500"
        )}
      >
        <div
          className={cn(
            "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            form.maintenance
              ? "border-sky-600 bg-sky-600"
              : "border-neutral-300 dark:border-neutral-600"
          )}
        >
          {form.maintenance && <Check className="w-3 h-3 text-white" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Include Post-Delivery Maintenance</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Opt in for ongoing bug fixes, updates, and performance monitoring after your product goes live. Billed monthly.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Success View ─────────────────────────────────────────────────────────────

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center px-8 py-14 gap-4"
    >
      <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center mb-2">
        <Check className="w-7 h-7 text-sky-600" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Request Submitted!</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Thanks for reaching out. Our team will review your project and get back to you within <span className="font-medium text-foreground">24 hours</span>.
      </p>
      <Button
        className="mt-4 bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 px-8"
        onClick={onClose}
      >
        Done
      </Button>
    </motion.div>
  )
}

// ── Shared Field wrapper ──────────────────────────────────────────────────────

function Field({
  label, error, children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  )
}
