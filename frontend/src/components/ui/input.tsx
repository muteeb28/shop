import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 outline-none transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        /* Legacy shadcn — unchanged, keeps CRM working */
        default: [
          "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
          "disabled:bg-input/50 dark:disabled:bg-input/80",
          "h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base md:text-sm",
          "focus-visible:ring-[3px] aria-invalid:ring-[3px]",
          "placeholder:text-muted-foreground",
          "file:h-6 file:text-sm file:font-medium file:text-foreground",
          "file:inline-flex file:border-0 file:bg-transparent",
        ],
        /* Archio — warm-toned, uses ar-* tokens */
        ar: [
          "bg-ar-surface border border-ar-border rounded-ar-md",
          "text-body-md text-ar-foreground placeholder:text-ar-fg-subtle",
          "h-11 px-4 py-2.5",
          "focus-visible:border-ar-accent focus-visible:ring-2 focus-visible:ring-ar-accent/15",
          "aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-400/20",
          "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500",
        ],
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
