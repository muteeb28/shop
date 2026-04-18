import { type ReactNode, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Eyebrow, type EyebrowProps } from "@/components/ui/eyebrow"

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  eyebrowProps?: Omit<EyebrowProps, "children">
  heading: ReactNode
  /** Optional lede paragraph beneath the heading */
  body?: ReactNode
  /** Optional CTA cluster rendered beside or below the heading */
  cta?: ReactNode
  align?: "left" | "center"
  /** Set true when rendered inside a SectionWrap with surface="inverse" */
  inverse?: boolean
}

export function SectionHeader({
  eyebrow,
  eyebrowProps,
  heading,
  body,
  cta,
  align = "left",
  inverse = false,
  className,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <Eyebrow color={inverse ? "inverse" : "default"} {...eyebrowProps}>
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        className={cn(
          "font-display text-display-lg font-medium leading-[1.1] tracking-[-0.025em]",
          inverse ? "text-ar-inverse-fg" : "text-ar-foreground",
          isCenter ? "max-w-[22ch]" : "max-w-[18ch]"
        )}
      >
        {heading}
      </h2>

      {body && (
        <p
          className={cn(
            "text-body-lg mt-1",
            inverse ? "text-ar-inverse-fg/70" : "text-ar-fg-muted",
            isCenter ? "max-w-[52ch]" : "max-w-[46ch]"
          )}
        >
          {body}
        </p>
      )}

      {cta && <div className={cn("mt-2", isCenter && "flex justify-center")}>{cta}</div>}
    </div>
  )
}
