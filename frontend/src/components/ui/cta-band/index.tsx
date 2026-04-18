import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SectionWrap, type SectionWrapProps } from "@/components/ui/section-wrap"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"

export interface CtaBandProps {
  eyebrow?: string
  heading: ReactNode
  body?: string
  /** Primary CTA — pass a <Button> or any ReactNode */
  primaryCta?: ReactNode
  /** Secondary CTA */
  secondaryCta?: ReactNode
  surface?: SectionWrapProps["surface"]
  align?: "left" | "center"
  className?: string
}

export function CtaBand({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  surface = "inverse",
  align = "center",
  className,
}: CtaBandProps) {
  const hasCtas = primaryCta || secondaryCta

  return (
    <SectionWrap surface={surface} size="md" className={cn("relative", className)}>
      <Container>
        <div className={cn("flex flex-col gap-8", align === "center" && "items-center")}>
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            body={body}
            align={align}
            inverse={surface === "inverse"}
          />

          {hasCtas && (
            <div className="flex flex-wrap items-center gap-3">
              {primaryCta}
              {secondaryCta}
            </div>
          )}
        </div>
      </Container>
    </SectionWrap>
  )
}
