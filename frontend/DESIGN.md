# Design System — Archio Revamp

Design language for the Jobflix / CareerSprint frontend, modelled on the
[Archio Framer template](https://archio-template.framer.website/).

---

## The One Rule

> **No raw hex, rgb, or hardcoded px value in any component.**

Every visual property that could vary between themes or contexts must resolve
to a token. If a value doesn't have a token yet, add it to `globals.css` and
`tailwind.config.js` first, then use it.

---

## Token Layers

| Layer | File | Who consumes it |
|---|---|---|
| CSS custom properties | `src/app/globals.css` `:root` | Everything via `var(--ar-*)` |
| Tailwind utility bindings | `tailwind.config.js` `theme.extend` | Component class names |
| TS constants | `src/lib/design-tokens.ts` | Framer Motion, charts, Three.js |

There are two sets of CSS variables in `:root`:

- **Legacy tokens** (`--background`, `--primary`, …) — for CRM, modals, existing
  components. Do not edit until Phase 4 cleanup.
- **Archio tokens** (`--ar-*`) — for all new section components built in Phase 3+.
  These are the canonical design system.

---

## Color Tokens

### Backgrounds & Surfaces

| Token | Tailwind class | Value | Use when… |
|---|---|---|---|
| `--ar-background` | `bg-ar-background` | `hsl(35 33% 94%)` `#F5F1EB` | Page body background |
| `--ar-surface` | `bg-ar-surface` | `hsl(41 56% 98%)` `#FDFBF7` | Cards, panels, modals |
| `--ar-surface-muted` | `bg-ar-surface-muted` | `hsl(40 22% 90%)` `#E9E4DB` | Striped rows, inset areas, tag bg |

### Text

| Token | Tailwind class | Value | Use when… |
|---|---|---|---|
| `--ar-foreground` | `text-ar-foreground` | `hsl(0 0% 7%)` `#121212` | All headings, primary body text |
| `--ar-fg-muted` | `text-ar-fg-muted` | `hsl(60 2% 42%)` `#6B6B66` | Secondary text, captions, dates |
| `--ar-fg-subtle` | `text-ar-fg-subtle` | `hsl(40 5% 63%)` `#A8A49A` | Placeholders, disabled, meta |

### Borders

| Token | Tailwind class | Value | Use when… |
|---|---|---|---|
| `--ar-border` | `border-ar-border` | `hsl(38 20% 86%)` `#DDD8CE` | All card edges, dividers |
| `--ar-border-strong` | `border-ar-border-strong` | `hsl(38 14% 76%)` `#C3BEB4` | Section-level dividers, stronger emphasis |

### Accent (Primary Action)

| Token | Tailwind class | Value | Use when… |
|---|---|---|---|
| `--ar-accent` | `bg-ar-accent` | `hsl(149 41% 12%)` `#122b1e` | Primary CTA buttons, active nav state |
| `--ar-accent-fg` | `text-ar-accent-fg` | = background | Text/icon on accent backgrounds |

### Soft Accent (Secondary)

| Token | Tailwind class | Value | Use when… |
|---|---|---|---|
| `--ar-accent-soft` | `bg-ar-accent-soft` | `hsl(47 42% 88%)` `#EDE7D3` | Secondary buttons, tag pills, subtle highlights |
| `--ar-accent-soft-fg` | `text-ar-accent-soft-fg` | = accent | Text on soft accent backgrounds |

### Inverse (Dark Sections)

| Token | Tailwind class | Value | Use when… |
|---|---|---|---|
| `--ar-inverse` | `bg-ar-inverse` | `hsl(154 30% 8%)` `#0D1A12` | CTA band, testimonial dark section, footer |
| `--ar-inverse-fg` | `text-ar-inverse-fg` | = background | Text/icons on inverse backgrounds |

> **Alpha modifiers work on all tokens:**
> `bg-ar-background/50`, `border-ar-border/40`, etc.

---

## Typography

### Fonts

| Variable | Loaded font | Use for |
|---|---|---|
| `var(--font-display)` | Playfair Display | All display and heading elements — `font-display` utility class |
| `var(--font-sans)` | DM Sans | All body copy — default body font |

Both are loaded via `next/font/google` in `app/layout.tsx`.

### Type Scale

| Class | Size | Line height | Tracking | Use for |
|---|---|---|---|---|
| `text-display-xl` | clamp(56–96px) | 1.08 | -0.03em | Hero section heading only |
| `text-display-lg` | clamp(40–72px) | 1.10 | -0.025em | Section hero headings |
| `text-display-md` | clamp(28–48px) | 1.15 | -0.02em | Large card headings |
| `text-heading-xl` | clamp(24–36px) | 1.25 | -0.02em | Section sub-headings |
| `text-heading-lg` | clamp(20–28px) | 1.30 | -0.015em | Card titles |
| `text-heading-md` | 18px | 1.40 | -0.01em | Small card titles |
| `text-body-lg` | 18px | 1.70 | 0 | Lead paragraphs, subtitles |
| `text-body-md` | 16px | 1.60 | 0 | Standard body copy |
| `text-body-sm` | 14px | 1.50 | 0 | Secondary text, labels |
| `text-caption` | 12px | 1.40 | 0 | Captions, timestamps |
| `text-eyebrow` | 11px | 1 | +0.12em | Section labels (always add `uppercase`) |

**Eyebrow pattern:**
```tsx
<span className="text-eyebrow uppercase text-ar-fg-muted font-semibold">
  Our Services
</span>
```

---

## Radii

| Class | Value | Use for |
|---|---|---|
| `rounded-ar-sm` | 6px | Tags, badge chips, form inputs |
| `rounded-ar-md` | 12px | Small cards, dropdown menus |
| `rounded-ar-lg` | 20px | Standard section cards (default choice) |
| `rounded-ar-xl` | 28px | Large panels, image containers |
| `rounded-ar-pill` | 999px | Avatar stacks, nav pill, number badges |

---

## Shadows

Archio uses **borders** as the primary depth cue. Shadows are subtle and short.

| Class | Use for |
|---|---|
| `shadow-ar-sm` | Subtle card lift at rest |
| `shadow-ar-md` | Card hover state, slightly elevated panels |
| `shadow-ar-lg` | Floating elements, sticky nav, modals |

---

## Motion

### Easing

| CSS variable | Tailwind class | Framer Motion array | Use for |
|---|---|---|---|
| `--ar-ease-out-soft` | `ease-ar-out` | `[0.22, 1, 0.36, 1]` | Entrances, page reveals |
| `--ar-ease-in-out-soft` | `ease-ar-in-out` | `[0.65, 0, 0.35, 1]` | Elements that enter and exit (modals, drawers) |

### Durations

| Tailwind class | Value | Use for |
|---|---|---|
| `duration-ar-fast` | 150ms | Hover colour/border changes |
| `duration-ar-base` | 250ms | Most enter/exit transitions |
| `duration-ar-slow` | 450ms | Page-level reveals, complex sequences |

### Framer Motion presets

```ts
import { motionPresets } from "@/lib/design-tokens"

// Simple fade-up
<motion.div {...motionPresets.fadeUp(0.1)} />

// Slide in from right
<motion.div {...motionPresets.slideInRight(0.2)} />
```

---

## Layout

| Token | Value | Use for |
|---|---|---|
| `max-w-content` | 1280px | All page content containers via `Container` primitive |
| `py-section-sm` | 64px | Compact sections (CTA bands, marquee strips) |
| `py-section-md` | 96px | Standard landing page sections |
| `py-section-lg` | 128px | Hero-adjacent or statement sections |

---

## Dos and Don'ts

**Do:**
```tsx
// Use token classes
<section className="bg-ar-background py-section-md">
  <h2 className="text-display-lg font-display text-ar-foreground">...</h2>
  <p className="text-body-lg text-ar-fg-muted">...</p>
  <button className="bg-ar-accent text-ar-accent-fg rounded-ar-lg">...</button>
</section>
```

**Don't:**
```tsx
// No raw hex
<section className="bg-[#F5F1EB]">
// No inline styles
<h2 style={{ fontSize: '48px', color: '#121212' }}>
// No arbitrary Tailwind for tokenisable values
<button className="bg-[#122b1e] text-[#F5F1EB] rounded-[20px]">
```

---

## File Map

```
src/
├── app/globals.css          ← :root CSS custom properties (source of truth)
├── lib/design-tokens.ts     ← TS constants for non-Tailwind consumers
└── tailwind.config.js       ← Tailwind utility bindings for all tokens
```

---

## Phase Status

| Phase | Status | Notes |
|---|---|---|
| Phase 0 — Plan | ✅ Done | See conversation history |
| Phase 1 — Tokens | ✅ Done | This document; globals.css + config updated |
| Phase 2 — Primitives | ⏳ Pending | Button, Card, Container, SectionHeader, etc. |
| Phase 3 — Sections | ⏳ Pending | One section per sub-phase; hero excluded |
| Phase 4 — Cleanup | ⏳ Pending | Remove legacy tokens, dark mode parity |

> **Hero section (`src/components/sections/HeroSection.tsx`) is read-only.**
> Do not modify it in any phase until explicitly instructed.
