import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "w-full outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        /* Legacy shadcn — unchanged */
        default: [
          "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
          "disabled:bg-input/50 dark:disabled:bg-input/80",
          "rounded-lg border bg-transparent px-2.5 py-2 text-base md:text-sm",
          "focus-visible:ring-[3px] aria-invalid:ring-[3px]",
          "placeholder:text-muted-foreground flex field-sizing-content min-h-16",
        ],
        /* Archio */
        ar: [
          "bg-ar-surface border border-ar-border rounded-ar-md",
          "text-body-md text-ar-foreground placeholder:text-ar-fg-subtle",
          "px-4 py-3 min-h-[7rem] resize-y",
          "focus-visible:border-ar-accent focus-visible:ring-2 focus-visible:ring-ar-accent/15",
          "aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-400/20",
          "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500",
        ],
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

function Textarea({ className, variant, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
