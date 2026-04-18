/**
 * Archio Design Tokens — TypeScript constants
 *
 * Use these for any non-Tailwind consumers:
 *   - Framer Motion variants (easing arrays, duration numbers)
 *   - Inline canvas / chart / Three.js colour values
 *   - Dynamic style calculations in JS
 *
 * For everything else (components, layouts) use the Tailwind
 * utility classes that are bound to these same values in tailwind.config.js.
 *
 * RULE: No raw hex, rgb, or px value anywhere in component code.
 *       If it's not a token, add it here first.
 */

/* ── Colors ──────────────────────────────────────────────────────────────── */
export const colors = {
  /* Backgrounds */
  background:    "hsl(35, 33%, 94%)",   /* #F5F1EB — warm cream page bg       */
  surface:       "hsl(41, 56%, 98%)",   /* #FDFBF7 — card / panel surface     */
  surfaceMuted:  "hsl(40, 22%, 90%)",   /* #E9E4DB — inset rows, striped bg   */

  /* Text */
  foreground:    "hsl(0,  0%,  7%)",    /* #121212 — near-black               */
  fgMuted:       "hsl(60, 2%,  42%)",   /* #6B6B66 — secondary text           */
  fgSubtle:      "hsl(40, 5%,  63%)",   /* #A8A49A — placeholder, disabled    */

  /* Borders */
  border:        "hsl(38, 20%, 86%)",   /* #DDD8CE — hairline borders         */
  borderStrong:  "hsl(38, 14%, 76%)",   /* #C3BEB4 — stronger dividers        */

  /* Primary accent — dark forest green */
  accent:        "hsl(149, 41%, 12%)",  /* #122b1e — CTA buttons              */
  accentFg:      "hsl(35,  33%, 94%)",  /* = background — text on accent      */

  /* Soft accent — secondary buttons, tag pills */
  accentSoft:    "hsl(47,  42%, 88%)",  /* #EDE7D3 — secondary pill bg        */
  accentSoftFg:  "hsl(149, 41%, 12%)",  /* = accent — text on soft accent     */

  /* Inverse — dark CTA / testimonial bands */
  inverse:       "hsl(154, 30%, 8%)",   /* #0D1A12 — dark section bg          */
  inverseFg:     "hsl(35,  33%, 94%)",  /* = background — text on inverse     */
} as const

/* ── Radii ───────────────────────────────────────────────────────────────── */
export const radii = {
  sm:   "6px",    /* tags, badges, inputs          */
  md:   "12px",   /* small cards, dropdowns        */
  lg:   "20px",   /* standard section cards        */
  xl:   "28px",   /* large panels, image cards     */
  pill: "999px",  /* avatar stacks, nav pill       */
} as const

/* ── Shadows ─────────────────────────────────────────────────────────────── */
export const shadows = {
  sm: "0 1px 4px 0 hsl(38 10% 20% / 0.06)",
  md: "0 4px 16px 0 hsl(38 10% 20% / 0.08)",
  lg: "0 12px 40px 0 hsl(38 10% 20% / 0.10)",
} as const

/* ── Easing ──────────────────────────────────────────────────────────────── */
/**
 * Framer Motion uses cubic-bezier as a 4-number array.
 * CSS uses the string form; both are exported.
 */
export const easing = {
  outSoft:      [0.22, 1, 0.36, 1]     as const,  /* entrances, reveals        */
  inOutSoft:    [0.65, 0, 0.35, 1]     as const,  /* modals, drawers           */
  outSoftCss:   "cubic-bezier(0.22, 1, 0.36, 1)",
  inOutSoftCss: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const

/* ── Durations ───────────────────────────────────────────────────────────── */
/**
 * Framer Motion expects seconds; CSS expects ms.
 * Both scales are exported.
 */
export const duration = {
  fast:         0.15,   /* hover states, colour shifts      */
  base:         0.25,   /* most enter / exit transitions    */
  slow:         0.45,   /* page-level reveals, sequences    */
  marquee:      40,     /* marquee strip loop (seconds)     */

  /* CSS string equivalents */
  fastMs:    "150ms",
  baseMs:    "250ms",
  slowMs:    "450ms",
} as const

/* ── Layout ──────────────────────────────────────────────────────────────── */
export const layout = {
  maxWContent: "1280px",
  sectionPySm: "4rem",    /*  64px — compact sections         */
  sectionPyMd: "6rem",    /*  96px — standard sections        */
  sectionPyLg: "8rem",    /* 128px — hero-adjacent sections   */
} as const

/* ── Framer Motion Presets ───────────────────────────────────────────────── */
/**
 * Pre-built Framer Motion variant factories.
 * Import these instead of duplicating animation config in every component.
 *
 * Usage:
 *   import { motionPresets } from "@/lib/design-tokens"
 *   <motion.div {...motionPresets.fadeUp(0.1)} />
 */
export const motionPresets = {
  fadeUp: (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: duration.base, delay, ease: easing.outSoft },
  }),

  fadeIn: (delay = 0) => ({
    initial:    { opacity: 0 },
    animate:    { opacity: 1 },
    transition: { duration: duration.base, delay, ease: easing.outSoft },
  }),

  slideInRight: (delay = 0) => ({
    initial:    { opacity: 0, x: 40 },
    animate:    { opacity: 1, x: 0  },
    transition: { duration: duration.slow, delay, ease: easing.outSoft },
  }),

  slideInLeft: (delay = 0) => ({
    initial:    { opacity: 0, x: -40 },
    animate:    { opacity: 1, x: 0   },
    transition: { duration: duration.slow, delay, ease: easing.outSoft },
  }),

  scaleIn: (delay = 0) => ({
    initial:    { opacity: 0, scale: 0.95 },
    animate:    { opacity: 1, scale: 1    },
    transition: { duration: duration.base, delay, ease: easing.outSoft },
  }),

  staggerChildren: (staggerMs = 0.08) => ({
    animate: { transition: { staggerChildren: staggerMs } },
  }),
} as const

/* ── Re-export everything as a single object for convenience ─────────────── */
export const tokens = {
  colors,
  radii,
  shadows,
  easing,
  duration,
  layout,
} as const

export type Tokens = typeof tokens
