/**
 * DEV-ONLY — Design primitives catalog.
 * Shows every variant of every Phase 2 primitive side by side.
 * Not linked from anywhere in the app. Remove in Phase 4.
 * Access at: /design-preview/primitives
 */
import { redirect } from "next/navigation"

import { Container }        from "@/components/ui/container"
import { SectionWrap }      from "@/components/ui/section-wrap"
import { Eyebrow }          from "@/components/ui/eyebrow"
import { SectionHeader }    from "@/components/ui/section-header"
import { Button }           from "@/components/ui/button"
import { Badge }            from "@/components/ui/badge"
import { Tag }              from "@/components/ui/tag"
import { MarqueeStrip }     from "@/components/ui/marquee-strip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NumberedStep }     from "@/components/ui/numbered-step"
import { StatBlock }        from "@/components/ui/stat-block"
import { TestimonialCard }  from "@/components/ui/testimonial-card"
import { TeamCard }         from "@/components/ui/team-card"
import { BlogCard }         from "@/components/ui/blog-card"
import { FaqItem }          from "@/components/ui/faq-item"
import { ComparisonRow, ComparisonTable } from "@/components/ui/comparison-row"
import { CtaBand }          from "@/components/ui/cta-band"

/* Prevent accidental production access */
export default function PrimitivesPreview() {
  if (process.env.NODE_ENV === "production") redirect("/")

  return (
    <main className="bg-ar-background min-h-screen pb-32">
      {/* Banner */}
      <div className="bg-ar-accent text-ar-accent-fg text-center text-body-sm font-semibold py-2 sticky top-0 z-50">
        DEV ONLY — Design Primitives Catalog — not visible in production
      </div>

      <Container className="py-16 space-y-24">

        {/* ── Color swatches ─────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-4">Color Tokens</Eyebrow>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["ar-background",   "bg-ar-background",    "background"],
              ["ar-surface",      "bg-ar-surface",       "surface"],
              ["ar-surface-muted","bg-ar-surface-muted", "surface-muted"],
              ["ar-foreground",   "bg-ar-foreground",    "foreground"],
              ["ar-fg-muted",     "bg-ar-fg-muted",      "fg-muted"],
              ["ar-fg-subtle",    "bg-ar-fg-subtle",     "fg-subtle"],
              ["ar-border",       "bg-ar-border",        "border"],
              ["ar-border-strong","bg-ar-border-strong", "border-strong"],
              ["ar-accent",       "bg-ar-accent",        "accent"],
              ["ar-accent-fg",    "bg-ar-accent-fg",     "accent-fg"],
              ["ar-accent-soft",  "bg-ar-accent-soft",   "accent-soft"],
              ["ar-inverse",      "bg-ar-inverse",       "inverse"],
            ].map(([, bg, label]) => (
              <div key={label} className="flex flex-col gap-1.5">
                <div className={`${bg} h-14 rounded-ar-md border border-ar-border`} />
                <span className="text-caption text-ar-fg-muted font-mono">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Type scale ─────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">Type Scale</Eyebrow>
          <div className="space-y-4 border-t border-ar-border pt-4">
            {[
              ["text-display-xl",  "font-display", "display-xl"],
              ["text-display-lg",  "font-display", "display-lg"],
              ["text-display-md",  "font-display", "display-md"],
              ["text-heading-xl",  "font-display", "heading-xl"],
              ["text-heading-lg",  "",             "heading-lg"],
              ["text-heading-md",  "",             "heading-md"],
              ["text-body-lg",     "",             "body-lg — The quick brown fox jumps over the lazy dog."],
              ["text-body-md",     "",             "body-md — The quick brown fox jumps over the lazy dog."],
              ["text-body-sm",     "",             "body-sm — The quick brown fox jumps over the lazy dog."],
              ["text-caption",     "",             "caption — 12px label"],
              ["text-eyebrow uppercase tracking-[0.12em]", "", "eyebrow"],
            ].map(([cls, font, label]) => (
              <div key={label} className="flex items-baseline gap-4 border-b border-ar-border/40 pb-3">
                <span className="w-32 shrink-0 text-caption text-ar-fg-subtle font-mono">
                  {cls.split(" ")[0]}
                </span>
                <span className={`${cls} ${font} text-ar-foreground`}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Eyebrow ────────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">Eyebrow</Eyebrow>
          <div className="flex flex-wrap gap-6">
            <Eyebrow color="default">Default</Eyebrow>
            <Eyebrow color="accent">Accent</Eyebrow>
            <Eyebrow marker="dot">With dot marker</Eyebrow>
          </div>
        </section>

        {/* ── SectionHeader ──────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">SectionHeader</Eyebrow>
          <div className="grid md:grid-cols-2 gap-12 border border-ar-border rounded-ar-lg p-8">
            <div>
              <p className="text-caption text-ar-fg-subtle mb-4 font-mono">align=left</p>
              <SectionHeader
                eyebrow="Our Services"
                heading="What We Even Do"
                body="We build production-ready apps so you can start shipping sooner."
                cta={<Button variant="ar-primary" size="ar-sm">Get Started</Button>}
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-caption text-ar-fg-subtle mb-4 font-mono self-start">align=center</p>
              <SectionHeader
                eyebrow="Our Services"
                heading="What We Even Do"
                body="We build production-ready apps so you can start shipping sooner."
                align="center"
              />
            </div>
          </div>
        </section>

        {/* ── Buttons ────────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">Button</Eyebrow>
          <div className="space-y-4">
            {(["ar-sm", "ar-md", "ar-lg"] as const).map((size) => (
              <div key={size} className="flex flex-wrap gap-3 items-center">
                <span className="w-16 text-caption text-ar-fg-subtle font-mono">{size}</span>
                {(["ar-primary", "ar-secondary", "ar-ghost", "ar-link"] as const).map((v) => (
                  <Button key={v} variant={v} size={size}>{v}</Button>
                ))}
              </div>
            ))}
            {/* Legacy variants — should still work */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-ar-border">
              <span className="w-full text-caption text-ar-fg-subtle font-mono mb-1">Legacy (unchanged)</span>
              {(["default", "secondary", "outline", "ghost", "destructive"] as const).map((v) => (
                <Button key={v} variant={v}>{v}</Button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Badge / Tag ────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">Badge &amp; Tag</Eyebrow>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="ar-default">ar-default</Badge>
            <Badge variant="ar-soft">ar-soft</Badge>
            <Badge variant="ar-subtle">ar-subtle</Badge>
            <Badge variant="ar-outline">ar-outline</Badge>
            <Badge variant="default">legacy default</Badge>
            <Badge variant="secondary">legacy secondary</Badge>
          </div>
          <div className="flex flex-wrap gap-3">
            <Tag variant="default">Digital Transformation</Tag>
            <Tag variant="outline">Org. Design</Tag>
            <Tag variant="subtle">Strategy</Tag>
            <Tag variant="dark">Featured</Tag>
            <Tag size="sm" textCase="upper">Small</Tag>
          </div>
        </section>

        {/* ── MarqueeStrip ───────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">MarqueeStrip</Eyebrow>
          <div className="space-y-4">
            <MarqueeStrip
              items={["Digital Transformation", "Org. Design", "Strategy", "Innovation", "Leadership"].map(
                (t) => <Tag key={t} variant="default">{t}</Tag>
              )}
              separator="·"
              speed="base"
            />
            <MarqueeStrip
              items={["Trusted Advisors", "Industry Experts", "Proven Results", "100+ Clients"].map(
                (t) => <span key={t} className="text-body-sm font-medium text-ar-fg-muted px-4">{t}</span>
              )}
              direction="rtl"
              separator="—"
              speed="slow"
            />
          </div>
        </section>

        {/* ── Card variants ──────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">Card</Eyebrow>
          <div className="grid sm:grid-cols-3 gap-4">
            {(["ar-default", "ar-muted", "ar-elevated"] as const).map((v) => (
              <Card key={v} variant={v}>
                <CardHeader><CardTitle className="text-ar-foreground text-heading-md">{v}</CardTitle></CardHeader>
                <CardContent><p className="text-ar-fg-muted text-body-sm">Card body text goes here, describing what this card contains.</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── NumberedStep ───────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">NumberedStep</Eyebrow>
          <div className="grid sm:grid-cols-3 gap-10">
            <NumberedStep number={1} heading="Discovery" body="We audit your current state, goals, and constraints in a focused workshop." />
            <NumberedStep number={2} heading="Strategy" body="We map a prioritised roadmap with clear milestones and decision criteria." />
            <NumberedStep number={3} heading="Execution" body="We embed alongside your team to drive delivery and handle blockers." />
          </div>
        </section>

        {/* ── StatBlock ──────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">StatBlock</Eyebrow>
          <div className="flex flex-wrap gap-16">
            <StatBlock value="180+" label="Projects completed." />
            <StatBlock value="96%" label="Client satisfaction." />
            <StatBlock value="15+" label="Years combined experience." />
          </div>
        </section>

        {/* ── TestimonialCard ────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">TestimonialCard</Eyebrow>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="They took our vague idea and shipped a working product in three weeks. That's unreal."
              name="Arjun Mehta"
              role="Founder"
              location="Dubai"
              serviceTag="Custom App"
            />
            <TestimonialCard
              quote="The quality of code is production-grade. We iterated fast without accumulating debt."
              name="Sarah Williams"
              role="CTO, Stagelink"
              serviceTag="MVP"
            />
          </div>
        </section>

        {/* ── BlogCard ───────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">BlogCard</Eyebrow>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <BlogCard
                key={n}
                image={`https://picsum.photos/seed/${n + 10}/800/500`}
                imageAlt="Blog post cover"
                date="April 2026"
                heading="How we shipped a full SaaS in 14 days without burning out"
                body="A behind-the-scenes look at our process, tooling, and decisions that made it possible."
                href="#"
              />
            ))}
          </div>
        </section>

        {/* ── FaqItem ────────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">FaqItem</Eyebrow>
          <div className="max-w-2xl border-t border-ar-border">
            <FaqItem
              question="How long does a custom project take?"
              answer="Most projects are delivered in 2–6 weeks depending on scope. We define milestones upfront so you always know what's coming next."
              defaultOpen
            />
            <FaqItem
              question="Do I get the source code?"
              answer="Yes, 100%. Full ownership of the codebase from day one. We don't hold code hostage."
            />
            <FaqItem
              question="What stack do you use?"
              answer="Next.js, TypeScript, Tailwind CSS, and whatever backend fits your use case — Node, Supabase, Firebase, or a custom API."
            />
          </div>
        </section>

        {/* ── ComparisonTable ────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">ComparisonTable</Eyebrow>
          <ComparisonTable
            altHeader="Figuring it out yourself"
            proHeader="With CareerSprint"
            rows={[
              { label: "Speed",    alt: "Months of learning curve",    pro: "Ship in days, not months" },
              { label: "Quality",  alt: "Trial and error codebase",    pro: "Production-grade from day one" },
              { label: "Support",  alt: "Stack Overflow on your own",  pro: "Dedicated async support included" },
              { label: "Ownership",alt: "Vendor lock-in risk",         pro: "Full source code, yours forever" },
            ]}
          />
        </section>

        {/* ── CtaBand ────────────────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">CtaBand (inverse surface)</Eyebrow>
          <CtaBand
            eyebrow="Let's talk"
            heading="Ready to ship something real?"
            body="Tell us what you're building and we'll get back within 24 hours."
            primaryCta={<Button variant="ar-inverse" size="ar-md">Build Custom Project</Button>}
            secondaryCta={<Button variant="ar-ghost" size="ar-md" className="text-ar-inverse-fg border-ar-inverse-fg/20 hover:bg-ar-inverse-fg/10">See our work</Button>}
          />
        </section>

        {/* ── Inverse SectionWrap ────────────────────────────────────────── */}
        <section>
          <Eyebrow className="mb-6">SectionWrap surfaces</Eyebrow>
          <div className="space-y-3">
            {(["default", "muted", "inverse"] as const).map((s) => (
              <SectionWrap key={s} surface={s} size="sm" className="rounded-ar-lg">
                <Container>
                  <span className="text-body-sm font-mono">surface=&quot;{s}&quot;</span>
                </Container>
              </SectionWrap>
            ))}
          </div>
        </section>

      </Container>
    </main>
  )
}
