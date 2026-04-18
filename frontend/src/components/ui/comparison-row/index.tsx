import { Check, X } from "lucide-react"
import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/* ── Single comparison row ────────────────────────────────────────────────── */
export interface ComparisonRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  /** Left column — the DIY / generic alternative */
  alt: string
  /** Right column — the advantage (our offering) */
  pro: string
  striped?: boolean
}

export function ComparisonRow({ label, alt, pro, striped, className, ...props }: ComparisonRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_1fr_1fr] items-start gap-4 px-6 py-5 rounded-ar-md",
        striped ? "bg-ar-surface-muted" : "bg-transparent",
        className
      )}
      {...props}
    >
      {/* Label */}
      <span className="text-body-sm font-semibold text-ar-foreground">{label}</span>

      {/* Alt (generic) */}
      <div className="flex items-start gap-2 text-body-sm text-ar-fg-muted">
        <X size={15} strokeWidth={2} className="shrink-0 mt-0.5 text-ar-fg-subtle" aria-hidden />
        <span>{alt}</span>
      </div>

      {/* Pro (us) */}
      <div className="flex items-start gap-2 text-body-sm text-ar-foreground font-medium">
        <Check size={15} strokeWidth={2.5} className="shrink-0 mt-0.5 text-ar-accent" aria-hidden />
        <span>{pro}</span>
      </div>
    </div>
  )
}

/* ── Comparison table wrapper ─────────────────────────────────────────────── */
export interface ComparisonTableProps extends HTMLAttributes<HTMLDivElement> {
  altHeader: string
  proHeader: string
  rows: Omit<ComparisonRowProps, "striped">[]
}

export function ComparisonTable({
  altHeader,
  proHeader,
  rows,
  className,
  ...props
}: ComparisonTableProps) {
  return (
    <div className={cn("rounded-ar-lg border border-ar-border overflow-hidden", className)} {...props}>
      {/* Header row */}
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-4 bg-ar-surface border-b border-ar-border">
        <span className="text-eyebrow uppercase text-ar-fg-subtle" />
        <span className="text-eyebrow uppercase text-ar-fg-muted font-semibold">{altHeader}</span>
        <span className="text-eyebrow uppercase text-ar-accent font-semibold">{proHeader}</span>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <ComparisonRow key={row.label} {...row} striped={i % 2 === 1} />
      ))}
    </div>
  )
}
