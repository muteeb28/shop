import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  /* Base — shared by ALL variants */
  "inline-flex items-center justify-center gap-2 font-medium select-none whitespace-nowrap " +
  "transition-all duration-ar-fast " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ar-accent focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        /* ── Archio primary — deep forest-green pill with 3D lift ─────────── */
        primary: [
          "rounded-ar-pill",
          "bg-ar-btn-primary text-white",
          "button-primary-shadow",
          "hover:bg-ar-btn-primary-hover hover:button-primary-shadow-hover hover:-translate-y-px",
          "active:button-primary-shadow-active active:translate-y-0",
        ],

        /* ── Archio secondary — outlined pill ─────────────────────────────── */
        secondary: [
          "rounded-ar-pill",
          "bg-transparent text-ar-foreground",
          "border border-ar-border-strong",
          "hover:bg-ar-surface-muted hover:border-ar-foreground",
          "active:bg-ar-surface",
        ],

        /* ── Archio ghost — no bg, border appears on hover ────────────────── */
        ghost: [
          "rounded-ar-md",
          "bg-transparent text-ar-foreground",
          "border border-transparent",
          "hover:bg-ar-surface-muted hover:border-ar-border",
        ],

        /* ── Archio link — inline text link ───────────────────────────────── */
        link: [
          "rounded-none h-auto px-0",
          "bg-transparent text-ar-foreground",
          "underline-offset-4 hover:underline hover:text-ar-accent",
        ],

        /* ── Archio inverse — cream pill for dark (ar-inverse) sections ───── */
        inverse: [
          "rounded-ar-pill",
          "bg-ar-inverse-fg text-ar-inverse",
          "hover:bg-ar-inverse-fg/85 active:scale-[0.98]",
        ],

        /* ── ar-* aliases — backward compat for existing code ─────────────── */
        "ar-primary": [
          "rounded-ar-pill",
          "bg-ar-btn-primary text-white",
          "button-primary-shadow",
          "hover:bg-ar-btn-primary-hover hover:button-primary-shadow-hover hover:-translate-y-px",
          "active:button-primary-shadow-active active:translate-y-0",
        ],
        "ar-secondary": [
          "rounded-ar-pill",
          "bg-transparent text-ar-foreground",
          "border border-ar-border-strong",
          "hover:bg-ar-surface-muted hover:border-ar-foreground",
          "active:bg-ar-surface",
        ],
        "ar-ghost": [
          "rounded-ar-pill",
          "bg-transparent text-ar-foreground",
          "border border-transparent",
          "hover:bg-ar-surface-muted hover:border-ar-border",
        ],
        "ar-link": [
          "rounded-none h-auto px-0",
          "bg-transparent text-ar-foreground",
          "underline-offset-4 hover:underline hover:text-ar-accent",
        ],
        "ar-inverse": [
          "rounded-ar-pill",
          "bg-ar-inverse-fg text-ar-inverse",
          "hover:bg-ar-inverse-fg/85 active:scale-[0.98]",
        ],

        /* ── Legacy variants — CRM & existing shadcn components ───────────── */
        default:     "rounded-md bg-primary text-primary-foreground hover:bg-primary/90 ring-offset-background",
        destructive: "rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-offset-background",
        outline:     "rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ring-offset-background",
        "secondary-legacy": "rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "ghost-legacy":     "rounded-md hover:bg-accent hover:text-accent-foreground",
        "link-legacy":      "rounded-none h-auto px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        /* ── Archio sizes ── */
        sm: "px-4 py-2   text-body-sm gap-1.5",
        md: "px-6 py-3   text-body-md gap-2",
        lg: "px-8 py-4   text-body-lg gap-2.5",

        /* ── ar-* size aliases ── */
        "ar-sm": "h-9  px-5 text-body-sm gap-1.5",
        "ar-md": "h-12 px-7 text-body-md gap-2",
        "ar-lg": "h-14 px-8 text-body-lg gap-2.5",

        /* ── Legacy sizes ── */
        default:  "h-10 px-4 py-2 text-sm",
        "sm-legacy": "h-9 px-3 text-sm",
        "lg-legacy": "h-11 px-8 text-sm",
        icon:     "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
)

/* Icon size scaled to button size */
const ICON_SIZE: Record<string, string> = {
  sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6",
  "ar-sm": "w-4 h-4", "ar-md": "w-5 h-5", "ar-lg": "w-6 h-6",
  default: "w-4 h-4", icon: "w-5 h-5",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?:   boolean
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp     = asChild ? Slot : "button"
    const iconSize = cn("shrink-0", ICON_SIZE[size ?? "md"] ?? "w-5 h-5")

    /* When asChild, Slot expects a single element child — skip icon wrappers */
    const inner = asChild ? children : (
      <>
        {isLoading
          ? <Loader2 className={cn(iconSize, "animate-spin")} aria-hidden />
          : leftIcon && <span className={iconSize} aria-hidden>{leftIcon}</span>
        }
        {children}
        {!isLoading && rightIcon && <span className={iconSize} aria-hidden>{rightIcon}</span>}
      </>
    )

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {inner}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
