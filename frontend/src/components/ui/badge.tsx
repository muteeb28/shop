import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        /* ── Legacy variants — unchanged ───────────────────────────────────── */
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",

        /* ── Archio variants — use in new section components ──────────────── */
        /** Solid accent pill — level / status indicators */
        "ar-default":
          "rounded-ar-pill border-transparent bg-ar-accent text-ar-accent-fg",
        /** Beige soft pill — service tags, feature chips */
        "ar-soft":
          "rounded-ar-pill border-transparent bg-ar-accent-soft text-ar-accent-soft-fg",
        /** Muted surface pill — secondary / informational labels */
        "ar-subtle":
          "rounded-ar-pill border-ar-border bg-ar-surface-muted text-ar-fg-muted",
        /** Outline pill — minimal, ghost-like */
        "ar-outline":
          "rounded-ar-pill border border-ar-border bg-transparent text-ar-fg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
