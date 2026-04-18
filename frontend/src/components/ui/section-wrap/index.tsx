import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionWrapVariants = cva("overflow-hidden", {
  variants: {
    surface: {
      default: "bg-ar-background",
      muted:   "bg-ar-surface-muted",
      inverse: "bg-ar-inverse text-ar-inverse-fg",
    },
    size: {
      sm: "py-section-sm",   /*  64px — compact sections, marquee strips */
      md: "py-section-md",   /*  96px — standard landing sections        */
      lg: "py-section-lg",   /* 128px — hero-adjacent statement sections */
    },
  },
  defaultVariants: {
    surface: "default",
    size: "md",
  },
})

export type SectionWrapProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionWrapVariants>

export function SectionWrap({ className, surface, size, ...props }: SectionWrapProps) {
  return (
    <section
      className={cn(sectionWrapVariants({ surface, size }), className)}
      {...props}
    />
  )
}
