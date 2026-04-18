import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tag } from "@/components/ui/tag"

export interface SplitImageCardProps {
  /** Primary image src (required) */
  imagePrimary: string
  imagePrimaryAlt: string
  /** Optional secondary image — displayed offset behind primary */
  imageSecondary?: string
  imageSecondaryAlt?: string
  title: string
  description: string
  tags?: string[]
  href?: string
  /** Flip layout so text is left and images are right */
  flip?: boolean
  className?: string
}

export function SplitImageCard({
  imagePrimary,
  imagePrimaryAlt,
  imageSecondary,
  imageSecondaryAlt = "",
  title,
  description,
  tags = [],
  href,
  flip = false,
  className,
}: SplitImageCardProps) {
  const Wrapper = href ? Link : "div"
  const wrapperProps = href ? { href } : {}

  return (
    <div
      className={cn(
        "group relative grid gap-8 lg:gap-12 items-center",
        flip ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-[auto_1fr]",
        className
      )}
    >
      {/* ── Image panel ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "relative w-full max-w-sm lg:max-w-none lg:w-[440px] shrink-0",
          flip ? "lg:order-2" : "lg:order-1"
        )}
      >
        {/* Primary image */}
        <div className="relative aspect-[4/3] rounded-ar-xl overflow-hidden bg-ar-surface-muted shadow-ar-md">
          <Image
            src={imagePrimary}
            alt={imagePrimaryAlt}
            fill
            className="object-cover transition-transform duration-ar-slow ease-ar-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 440px"
          />
        </div>

        {/* Secondary image — offset chip overlapping primary */}
        {imageSecondary && (
          <div className="absolute -bottom-6 -right-6 w-40 h-36 rounded-ar-lg overflow-hidden bg-ar-surface shadow-ar-lg border-2 border-ar-surface">
            <Image
              src={imageSecondary}
              alt={imageSecondaryAlt}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        )}
      </div>

      {/* ── Text panel ──────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex flex-col gap-4",
          flip ? "lg:order-1" : "lg:order-2"
        )}
      >
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} variant="default" size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <h3 className="font-display text-display-md font-medium text-ar-foreground leading-[1.15] tracking-[-0.02em]">
          {title}
        </h3>

        <p className="text-body-lg text-ar-fg-muted leading-relaxed">
          {description}
        </p>

        {href && (
          /* @ts-expect-error — Wrapper is conditional Link|div */
          <Wrapper
            {...wrapperProps}
            className="mt-2 inline-flex items-center gap-2 text-body-sm font-semibold text-ar-foreground group/link"
          >
            <span className="underline-offset-4 group-hover/link:underline">
              Learn more
            </span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-ar-fast ease-ar-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Wrapper>
        )}
      </div>
    </div>
  )
}
