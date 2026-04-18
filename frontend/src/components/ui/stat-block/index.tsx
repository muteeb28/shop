import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statBlockVariants = cva("flex flex-col gap-1", {
  variants: {
    align: {
      left:   "items-start text-left",
      center: "items-center text-center",
    },
    inverse: {
      true:  "",
      false: "",
    },
  },
  defaultVariants: { align: "left", inverse: false },
})

export interface StatBlockProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statBlockVariants> {
  value?:       string   /* "180+" — primary prop */
  stat?:        string   /* alias for value (spec §19) */
  label:        string   /* "Projects completed." */
  description?: string
  background?:  boolean  /* wrap in a surface container */
}

export function StatBlock({
  value,
  stat,
  label,
  description,
  align,
  inverse,
  background,
  className,
  ...props
}: StatBlockProps) {
  const displayValue = stat ?? value ?? ""

  const inner = (
    <div className={cn(statBlockVariants({ align, inverse }), !background && className)} {...(!background ? props : {})}>
      <span
        className={cn(
          "font-display text-display-lg font-semibold leading-none tracking-[-0.03em]",
          inverse ? "text-ar-inverse-fg" : "text-ar-foreground"
        )}
      >
        {displayValue}
      </span>

      <span
        className={cn(
          "text-body-md font-medium",
          inverse ? "text-ar-inverse-fg/80" : "text-ar-fg-muted"
        )}
      >
        {label}
      </span>

      {description && (
        <span
          className={cn(
            "text-body-sm",
            inverse ? "text-ar-inverse-fg/60" : "text-ar-fg-subtle"
          )}
        >
          {description}
        </span>
      )}
    </div>
  )

  if (!background) return inner

  return (
    <div
      className={cn(
        "rounded-ar-md border border-ar-border bg-ar-surface p-6",
        className
      )}
      {...props}
    >
      {inner}
    </div>
  )
}
