import { type ReactNode, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/* Duration map — overrides the CSS var inline */
const speedMap = {
  slow:    "60s",
  base:    "40s",  /* matches --ar-marquee-duration default */
  fast:    "22s",
} as const

export interface MarqueeStripProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[]
  direction?: "ltr" | "rtl"
  speed?: keyof typeof speedMap
  separator?: ReactNode
  /** When false the strip scrolls but hover-pause is disabled */
  pauseOnHover?: boolean
}

/**
 * Horizontally auto-scrolling row.
 * Server-safe: animation is pure CSS via .marquee-track / .marquee-track-reverse.
 * prefers-reduced-motion is handled globally in globals.css (kills animation).
 *
 * Infinite loop is achieved by rendering items twice so the second copy
 * appears seamlessly as the first copy scrolls out.
 */
export function MarqueeStrip({
  items,
  direction = "ltr",
  speed = "base",
  separator,
  pauseOnHover = true,
  className,
  ...props
}: MarqueeStripProps) {
  const doubled = [...items, ...items]
  const trackClass = direction === "rtl" ? "marquee-track-reverse" : "marquee-track"

  return (
    <div
      className={cn("overflow-hidden w-full", className)}
      {...props}
    >
      <div
        className={cn(trackClass, !pauseOnHover && "[animation-play-state:running!important]")}
        style={{ animationDuration: speedMap[speed] }}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            {item}
            {separator && i < doubled.length - 1 && (
              <span className="mx-4 select-none text-ar-border-strong" aria-hidden>
                {separator}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Screen-reader fallback — static list, visually hidden */}
      <ul className="sr-only">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
