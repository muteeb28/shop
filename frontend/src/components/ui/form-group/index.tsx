import { type ReactNode, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  /** htmlFor wired to the label — pass the input's id */
  htmlFor?: string
  hint?: string
  error?: string
  required?: boolean
  children: ReactNode
}

/**
 * Wraps a single form field: optional label → input slot → optional hint/error.
 * Usage:
 *   <FormGroup label="Full name" htmlFor="name" error={errors.name}>
 *     <Input id="name" variant="ar" ... />
 *   </FormGroup>
 */
export function FormGroup({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
  ...props
}: FormGroupProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-body-sm font-medium text-ar-foreground dark:text-neutral-200 select-none"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-400" aria-hidden>*</span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p className="text-caption text-red-500" role="alert">{error}</p>
      ) : hint ? (
        <p className="text-caption text-ar-fg-subtle">{hint}</p>
      ) : null}
    </div>
  )
}
