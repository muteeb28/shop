import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const numberedStepVariants = cva("flex gap-6", {
  variants: {
    layout: {
      vertical:   "flex-col",
      horizontal: "flex-row items-start",
    },
  },
  defaultVariants: { layout: "vertical" },
})

export interface NumberedStepProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof numberedStepVariants> {
  number: number | string
  heading: string
  body?: string
}

export function NumberedStep({
  number,
  heading,
  body,
  layout,
  className,
  ...props
}: NumberedStepProps) {
  return (
    <div className={cn(numberedStepVariants({ layout }), className)} {...props}>
      {/* Large ordinal indicator */}
      <div className="shrink-0">
        <span className="font-display text-display-md font-medium text-ar-foreground/15 leading-none select-none">
          #{String(number).padStart(2, "0")}
        </span>
        <div className="mt-2 h-px w-12 bg-ar-border" />
      </div>

      {/* Text */}
      <div className="pt-1 flex flex-col gap-3">
        <h3 className="font-display text-heading-xl font-medium text-ar-foreground leading-snug tracking-[-0.02em]">
          {heading}
        </h3>
        {body && (
          <p className="text-body-md text-ar-fg-muted leading-relaxed">
            {body}
          </p>
        )}
      </div>
    </div>
  )
}
