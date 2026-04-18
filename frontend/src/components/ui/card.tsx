import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* ── Card variants ────────────────────────────────────────────────────────── */
const cardVariants = cva("", {
  variants: {
    variant: {
      /* Legacy — backward-compatible, unchanged */
      default: "rounded-lg border bg-card text-card-foreground shadow-sm",

      /* Archio variants — use in new section components */
      /** Standard card on warm-cream bg */
      "ar-default":  "bg-ar-surface border border-ar-border rounded-ar-lg text-ar-foreground",
      /** On-surface-muted card (slightly recessed) */
      "ar-muted":    "bg-ar-surface-muted border border-ar-border rounded-ar-lg text-ar-foreground",
      /** Elevated with soft shadow, no border */
      "ar-elevated": "bg-ar-surface shadow-ar-md rounded-ar-lg text-ar-foreground",
      /** On inverse (dark) background */
      "ar-inverse":  "bg-ar-surface/10 border border-ar-inverse-fg/10 rounded-ar-lg text-ar-inverse-fg",
    },
  },
  defaultVariants: { variant: "default" },
})

export type CardVariantProps = VariantProps<typeof cardVariants>

/* ── Card ─────────────────────────────────────────────────────────────────── */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardVariantProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant }), className)}
    {...props}
  />
))
Card.displayName = "Card"

/* ── CardHeader ───────────────────────────────────────────────────────────── */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/* ── CardTitle ────────────────────────────────────────────────────────────── */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/* ── CardDescription ──────────────────────────────────────────────────────── */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/* ── CardContent ──────────────────────────────────────────────────────────── */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/* ── CardFooter ───────────────────────────────────────────────────────────── */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
