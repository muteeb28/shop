import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full px-5 sm:px-8 lg:px-12", {
  variants: {
    size: {
      narrow:  "max-w-3xl",          /* ~768px  — blog posts, FAQ, forms        */
      default: "max-w-content",      /* 1280px  — standard landing sections     */
      wide:    "max-w-screen-2xl",   /* 1536px  — edge-to-edge photo sections   */
    },
  },
  defaultVariants: { size: "default" },
})

export type ContainerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>

export function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props} />
  )
}
