import Image from "next/image"
import { Star, MapPin, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tag } from "@/components/ui/tag"

/* ── Star rating ── */
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of ${max} stars`}
      role="img"
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5 shrink-0",
            i < rating
              ? "fill-[#D4AF37] text-[#D4AF37]"
              : "fill-ar-border text-ar-border"
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

/* ── Props ── */
export interface TestimonialCardProps {
  quote:        string
  name:         string
  role:         string
  rating?:      number          /* 1–5, default 5 */
  location?:    string
  serviceType?: string          /* primary prop name */
  serviceTag?:  string          /* backward-compat alias */
  portrait?:    string
  className?:   string
}

/* ── Component ── */
export function TestimonialCard({
  quote,
  name,
  role,
  rating = 5,
  location,
  serviceType,
  serviceTag,
  portrait,
  className,
}: TestimonialCardProps) {
  const service = serviceType ?? serviceTag

  return (
    <figure
      className={cn(
        /* structure */
        "flex flex-col gap-4 p-6",
        /* shape */
        "rounded-ar-lg border border-ar-border bg-ar-surface",
        /* shadow */
        "shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        /* hover lift */
        "hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
        "transition-all duration-ar-base",
        className
      )}
    >
      {/* ── Avatar + name row ── */}
      <div className="flex items-center gap-3">
        {portrait ? (
          <div className="relative w-12 h-12 rounded-ar-pill overflow-hidden shrink-0 bg-ar-surface-muted">
            <Image
              src={portrait}
              alt={name}
              fill
              className="object-cover object-top"
              sizes="48px"
            />
          </div>
        ) : (
          /* Fallback initial avatar */
          <div className="w-12 h-12 rounded-ar-pill bg-ar-accent-soft flex items-center justify-center shrink-0">
            <span className="font-display text-heading-md font-semibold text-ar-accent select-none">
              {name.charAt(0)}
            </span>
          </div>
        )}

        <figcaption>
          <div className="text-body-sm font-semibold text-ar-foreground leading-snug">
            {name}
          </div>
          <div className="text-caption text-ar-fg-muted">{role}</div>
        </figcaption>
      </div>

      {/* ── Quote ── */}
      <blockquote className="flex-1 text-body-md text-ar-foreground leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* ── Footer: tags + stars ── */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-ar-border">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          {location && (
            <Tag variant="subtle" size="sm">
              <MapPin className="w-3 h-3 shrink-0" aria-hidden />
              {location}
            </Tag>
          )}
          {service && (
            <Tag variant="subtle" size="sm">
              <Briefcase className="w-3 h-3 shrink-0" aria-hidden />
              {service}
            </Tag>
          )}
        </div>

        <StarRating rating={rating} />
      </div>
    </figure>
  )
}
