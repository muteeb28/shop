import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"

export interface BlogCardProps {
  image: string
  imageAlt: string
  date: string
  heading: string
  body?: string
  href: string
  className?: string
}

export function BlogCard({ image, imageAlt, date, heading, body, href, className }: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-5 rounded-ar-lg overflow-hidden border border-ar-border bg-ar-surface",
        "hover:shadow-ar-md transition-shadow duration-ar-base ease-ar-out",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-ar-surface-muted">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-ar-slow ease-ar-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-6 pb-6">
        <Eyebrow>{date}</Eyebrow>

        <h3 className="font-display text-heading-lg font-medium text-ar-foreground leading-snug tracking-[-0.015em] group-hover:text-ar-accent transition-colors duration-ar-fast">
          {heading}
        </h3>

        {body && (
          <p className="text-body-sm text-ar-fg-muted line-clamp-2 leading-relaxed">
            {body}
          </p>
        )}

        <span className="mt-2 inline-flex items-center gap-1.5 text-body-sm font-semibold text-ar-foreground group/link">
          Learn More About This
          <ArrowUpRight
            size={14}
            className="transition-transform duration-ar-fast ease-ar-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  )
}
