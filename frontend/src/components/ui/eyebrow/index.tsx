import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const eyebrowVariants = cva(
  "text-eyebrow uppercase font-semibold tracking-[0.12em] leading-none",
  {
    variants: {
      color: {
        default: "text-ar-fg-muted",
        accent:  "text-ar-accent",
        inverse: "text-ar-inverse-fg/70",
      },
      marker: {
        none: "",
        dot:  "before:content-['·'] before:mr-2 before:opacity-60",
      },
    },
    defaultVariants: {
      color:  "default",
      marker: "none",
    },
  }
)

export type EyebrowProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof eyebrowVariants>

export function Eyebrow({ className, color, marker, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(eyebrowVariants({ color, marker }), className)}
      {...props}
    />
  )
}
