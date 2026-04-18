import { cn } from "@/lib/utils"

export interface StepperProps {
  steps: string[]
  current: number   /** 1-based index of the active step */
  className?: string
}

/**
 * Horizontal step indicator for multi-step forms/wizards.
 * - Current step: filled accent pill with white number
 * - Completed steps: accent border + accent number
 * - Upcoming steps: muted border + muted number
 * - Connector lines between steps
 *
 * Usage:
 *   <Stepper steps={["Details", "Product", "Budget"]} current={2} />
 */
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <nav aria-label="Form progress" className={cn("flex items-center gap-0", className)}>
      {steps.map((label, i) => {
        const step   = i + 1
        const done   = step < current
        const active = step === current

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Step pill */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-ar-pill text-body-sm font-semibold transition-colors duration-ar-base",
                  active && "bg-ar-accent text-ar-accent-fg",
                  done   && "bg-ar-accent-soft text-ar-accent-soft-fg",
                  !active && !done && "bg-ar-surface-muted text-ar-fg-subtle border border-ar-border"
                )}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>

              <span
                className={cn(
                  "text-caption font-medium whitespace-nowrap",
                  active && "text-ar-foreground",
                  done   && "text-ar-accent",
                  !active && !done && "text-ar-fg-subtle"
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector — hidden after last step */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 mx-2 mb-5 transition-colors duration-ar-base",
                  done ? "bg-ar-accent/40" : "bg-ar-border"
                )}
                aria-hidden
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
