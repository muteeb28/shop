/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      /* ── Fonts ────────────────────────────────────────────────────────────
         Variables injected by next/font in layout.tsx.
         --font-sans  → DM Sans
         --font-display → Playfair Display (editorial serif for headings)
      ── */
      fontFamily: {
        sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },

      /* ── Legacy Colors (unchanged — CRM, modals, existing components) ──── */
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ── Archio Design System Colors ─────────────────────────────────────
           Usage pattern: bg-ar-background, text-ar-foreground, border-ar-border
           Alpha modifier supported: bg-ar-background/50, border-ar-border/40
           NEW section components MUST use these. No raw hex allowed.
        ── */
        ar: {
          /* Backgrounds & Surfaces */
          background:      "hsl(var(--ar-background)    / <alpha-value>)",
          surface:         "hsl(var(--ar-surface)        / <alpha-value>)",
          "surface-muted": "hsl(var(--ar-surface-muted)  / <alpha-value>)",

          /* Text */
          foreground:      "hsl(var(--ar-foreground)     / <alpha-value>)",
          "fg-muted":      "hsl(var(--ar-fg-muted)       / <alpha-value>)",
          "fg-subtle":     "hsl(var(--ar-fg-subtle)      / <alpha-value>)",

          /* Borders */
          border:          "hsl(var(--ar-border)         / <alpha-value>)",
          "border-strong": "hsl(var(--ar-border-strong)  / <alpha-value>)",

          /* Primary Accent */
          accent:          "hsl(var(--ar-accent)         / <alpha-value>)",
          "accent-fg":     "hsl(var(--ar-accent-fg)      / <alpha-value>)",

          /* Soft Accent (secondary buttons, pills) */
          "accent-soft":    "hsl(var(--ar-accent-soft)    / <alpha-value>)",
          "accent-soft-fg": "hsl(var(--ar-accent-soft-fg) / <alpha-value>)",

          /* Inverse (dark CTA / testimonial bands) */
          inverse:         "hsl(var(--ar-inverse)        / <alpha-value>)",
          "inverse-fg":    "hsl(var(--ar-inverse-fg)     / <alpha-value>)",

          /* Button Primary — separate from accent so button + icon colors can diverge */
          "btn-primary":       "hsl(var(--ar-btn-primary)       / <alpha-value>)",
          "btn-primary-hover": "hsl(var(--ar-btn-primary-hover)  / <alpha-value>)",
        },
      },

      /* ── Legacy Border Radius (unchanged) ──────────────────────────────── */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",

        /* ── Archio Radius Scale ───────────────────────────────────────────
           ar-sm   →  6px  tags, badges, inputs
           ar-md   → 12px  small cards, dropdowns
           ar-lg   → 20px  standard section cards
           ar-xl   → 28px  large panels, image containers
           ar-pill → 999px avatar stacks, floating nav pill
        ── */
        "ar-sm":   "var(--ar-radius-sm)",
        "ar-md":   "var(--ar-radius-md)",
        "ar-lg":   "var(--ar-radius-lg)",
        "ar-xl":   "var(--ar-radius-xl)",
        "ar-pill": "var(--ar-radius-pill)",
      },

      /* ── Archio Shadow Scale ──────────────────────────────────────────────
         Quiet shadows — borders carry most of the visual weight in Archio.
         shadow-ar-sm → subtle lift for cards
         shadow-ar-md → standard card hover state
         shadow-ar-lg → floating panels, modals
      ── */
      boxShadow: {
        "ar-sm": "var(--ar-shadow-sm)",
        "ar-md": "var(--ar-shadow-md)",
        "ar-lg": "var(--ar-shadow-lg)",
      },

      /* ── Archio Type Scale ────────────────────────────────────────────────
         Usage: text-display-xl, text-heading-lg, text-eyebrow, etc.
         Headings use tight tracking (-0.02em to -0.03em).
         Eyebrow is uppercased with wide tracking (+0.12em) — apply
         the `uppercase` utility alongside `text-eyebrow`.

         Display sizes use clamp() for fluid scaling.
      ── */
      fontSize: {
        "display-xl": ["clamp(3.5rem, 6vw, 6rem)",    { lineHeight: "1.08", letterSpacing: "-0.03em"  }],
        "display-lg": ["clamp(2.5rem, 4.5vw, 4.5rem)",{ lineHeight: "1.10", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3vw, 3rem)",   { lineHeight: "1.15", letterSpacing: "-0.02em"  }],
        "heading-xl": ["clamp(1.5rem, 2.5vw, 2.25rem)",{ lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "heading-lg": ["clamp(1.25rem, 2vw, 1.75rem)",{ lineHeight: "1.30", letterSpacing: "-0.015em" }],
        "heading-md": ["1.125rem",                    { lineHeight: "1.40", letterSpacing: "-0.01em"  }],
        "body-lg":    ["1.125rem",                    { lineHeight: "1.70", letterSpacing: "0"        }],
        "body-md":    ["1rem",                        { lineHeight: "1.60", letterSpacing: "0"        }],
        "body-sm":    ["0.875rem",                    { lineHeight: "1.50", letterSpacing: "0"        }],
        "caption":    ["0.75rem",                     { lineHeight: "1.40", letterSpacing: "0"        }],
        "eyebrow":    ["0.6875rem",                   { lineHeight: "1",    letterSpacing: "0.12em"   }],
      },

      /* ── Archio Transition Timing ─────────────────────────────────────────
         ease-ar-out      → entrances, reveals, page transitions
         ease-ar-in-out   → elements that go in AND out (modals, drawers)
         Usage: transition-all ease-ar-out duration-ar-base
      ── */
      transitionTimingFunction: {
        "ar-out":    "var(--ar-ease-out-soft)",
        "ar-in-out": "var(--ar-ease-in-out-soft)",
      },

      /* ── Archio Transition Durations ──────────────────────────────────────
         ar-fast → hover states, color changes
         ar-base → most enter/exit animations
         ar-slow → page-level reveals, complex sequences
      ── */
      transitionDuration: {
        "ar-fast": "150ms",
        "ar-base": "250ms",
        "ar-slow": "450ms",
      },

      /* ── Archio Max-Width ─────────────────────────────────────────────────
         max-w-content → standard page content container (1280px)
         Used inside every SectionWrap via the Container primitive.
      ── */
      maxWidth: {
        content: "var(--ar-max-w-content)",
      },

      /* ── Archio Section Spacing ───────────────────────────────────────────
         py-section-sm / md / lg — vertical rhythm for landing sections.
         Used by SectionWrap primitive.
      ── */
      spacing: {
        "section-sm": "var(--ar-section-py-sm)",
        "section-md": "var(--ar-section-py-md)",
        "section-lg": "var(--ar-section-py-lg)",
      },
    },
  },
  plugins: [],
}
