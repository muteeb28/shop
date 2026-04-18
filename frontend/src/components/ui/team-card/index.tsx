import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TeamCardProps {
  name: string
  role: string
  portrait: string
  linkedinHref?: string
  className?: string
}

export function TeamCard({ name, role, portrait, linkedinHref, className }: TeamCardProps) {
  return (
    <div className={cn("group flex flex-col gap-4", className)}>
      {/* Portrait */}
      <div className="relative w-full aspect-[3/4] rounded-ar-xl overflow-hidden bg-ar-surface-muted">
        <Image
          src={portrait}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-ar-slow ease-ar-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
        />
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-body-md font-semibold text-ar-foreground truncate">
            {name}
          </span>
          <span className="text-body-sm text-ar-fg-muted truncate">{role}</span>
        </div>

        {linkedinHref && (
          <Link
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "shrink-0 inline-flex items-center gap-1 text-body-sm font-medium text-ar-fg-subtle",
              "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
              "transition-all duration-ar-base ease-ar-out",
              "hover:text-ar-foreground"
            )}
            aria-label={`${name} on LinkedIn`}
          >
            LinkedIn
            <ArrowUpRight size={13} />
          </Link>
        )}
      </div>
    </div>
  )
}
