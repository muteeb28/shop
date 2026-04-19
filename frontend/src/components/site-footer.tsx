"use client"

import { Button } from "@/components/ui/button"

const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "Projects",    href: "#projects" },
  { label: "Hire Talent", href: "/hire-talent" },
  { label: "Contact",     href: "#contact" },
]

export default function SiteFooter() {
  return (
    <footer className="bg-ar-background dark:bg-neutral-950 border-t border-ar-border/40 dark:border-neutral-800 overflow-hidden">

      {/* ── Main area ── */}
      <div className="flex flex-col items-center gap-6 px-6 pt-16 pb-12 text-center">

        {/* Email */}
        <a
          href="mailto:hello@jobflix.in"
          className="text-body-sm text-ar-fg-muted hover:text-ar-foreground transition-colors duration-ar-fast underline-offset-4 hover:underline"
        >
          hello@jobflix.in
        </a>

        {/* Giant brand name */}
        <h2 className="font-display font-semibold text-ar-foreground dark:text-white leading-none select-none"
          style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}
        >
          Jobflix
        </h2>

        {/* Tagline */}
        <p className="text-body-md text-ar-fg-muted max-w-sm -mt-2">
          Ship full apps in days, not months.
        </p>

        {/* Product links */}
        <div className="flex flex-wrap items-center justify-center gap-3 -mt-1">
          {[
            { label: "jobflix.in",              href: "https://jobflix.in" },
            { label: "resumeassist.jobflix.in", href: "https://resumeassist.jobflix.in" },
            { label: "shop.jobflix.in",         href: "https://shop.jobflix.in" },
          ].map((product, i, arr) => (
            <span key={product.label} className="flex items-center gap-3">
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-ar-fg-muted hover:text-ar-foreground dark:text-neutral-400 dark:hover:text-white transition-colors duration-ar-fast"
              >
                {product.label}
              </a>
              {i < arr.length - 1 && (
                <span className="w-px h-3 bg-ar-border dark:bg-neutral-700 shrink-0" />
              )}
            </span>
          ))}
        </div>

        {/* Pill nav */}
        <nav className="flex items-center gap-1 rounded-ar-pill bg-ar-surface dark:bg-neutral-900 border border-ar-border/50 dark:border-neutral-800 px-3 py-2 shadow-ar-sm mt-2">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-1.5 text-body-sm font-medium text-ar-fg-muted dark:text-neutral-400 hover:text-ar-foreground dark:hover:text-white rounded-ar-pill transition-colors duration-ar-fast whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <Button variant="ar-primary" size="sm" className="ml-1 whitespace-nowrap font-semibold" asChild>
            <a href="#contact">Get Started</a>
          </Button>
        </nav>

      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-ar-border/40 dark:border-neutral-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-caption text-ar-fg-subtle dark:text-neutral-500">
          © 2025 Jobflix
        </p>
        <p className="text-caption text-ar-fg-subtle dark:text-neutral-500">
          All Rights Reserved
        </p>
      </div>

    </footer>
  )
}
