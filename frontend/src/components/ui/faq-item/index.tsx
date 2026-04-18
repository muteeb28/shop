"use client"

import { useState, type ReactNode, type HTMLAttributes } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FaqItemProps extends HTMLAttributes<HTMLDivElement> {
  question: string
  answer: ReactNode
  defaultOpen?: boolean
}

/**
 * Accessible FAQ accordion item.
 * "use client" — required for open/close state and animation.
 * Uses CSS max-height transition; no Framer Motion dep to keep bundle small.
 *
 * Accessibility: button[aria-expanded] + region[aria-labelledby] pattern.
 */
export function FaqItem({ question, answer, defaultOpen = false, className, ...props }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = question.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  return (
    <div
      className={cn("border-b border-ar-border last:border-b-0", className)}
      {...props}
    >
      {/* Trigger */}
      <button
        id={`faq-trigger-${id}`}
        aria-expanded={open}
        aria-controls={`faq-body-${id}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ar-accent focus-visible:ring-offset-2 rounded-sm"
      >
        <span className="text-heading-md font-semibold text-ar-foreground">
          {question}
        </span>

        <ChevronDown
          size={20}
          strokeWidth={1.75}
          className={cn(
            "shrink-0 mt-0.5 text-ar-fg-muted",
            "transition-transform duration-ar-base ease-ar-out",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {/* Body — CSS max-height accordion */}
      <div
        id={`faq-body-${id}`}
        role="region"
        aria-labelledby={`faq-trigger-${id}`}
        className={cn(
          "overflow-hidden transition-all ease-ar-out",
          "duration-ar-base",
          open ? "max-h-[600px] opacity-100 pb-6" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-body-md text-ar-fg-muted leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}
