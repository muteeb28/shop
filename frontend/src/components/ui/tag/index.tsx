import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-ar-pill font-semibold text-body-sm whitespace-nowrap transition-colors duration-ar-fast",
  {
    variants: {
      variant: {
        default: "bg-ar-accent-soft text-ar-accent-soft-fg",
        outline: "border border-ar-border text-ar-fg-muted bg-transparent",
        subtle:  "bg-ar-surface-muted text-ar-fg-muted",
        dark:    "bg-ar-accent text-ar-accent-fg",
      },
      size: {
        sm: "px-2.5 py-0.5 text-eyebrow",
        md: "px-3.5 py-1 text-body-sm",
      },
      /** uppercase forces all-caps label; default is sentence case */
      textCase: {
        upper:  "uppercase tracking-[0.08em]",
        normal: "",
      },
    },
    defaultVariants: {
      variant:  "default",
      size:     "md",
      textCase: "normal",
    },
  }
)

export type TagProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tagVariants>

export function Tag({ className, variant, size, textCase, ...props }: TagProps) {
  return (
    <span
      className={cn(tagVariants({ variant, size, textCase }), className)}
      {...props}
    />
  )
}
