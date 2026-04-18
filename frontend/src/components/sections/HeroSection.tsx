"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

interface HeroSectionProps {
  badge?: string
  title: ReactNode
  subtitle: string
  primaryButtonText: string
  secondaryButtonText: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
})

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  // Spacing Scale Constants
  const SPACING = {
    XS: "gap-2",    // 8px
    SM: "gap-4",    // 16px
    MD: "gap-6",    // 24px
    LG: "gap-8",    // 32px
    XL: "gap-12",   // 48px
    XXL: "gap-16",  // 64px
  }

  return (
    <section className="bg-[#FDFBF7] dark:bg-neutral-950 overflow-hidden relative pt-6 lg:pt-0">
      <div className="grid lg:grid-cols-[55%_45%] lg:min-h-[calc(100vh-90px)]">

        {/* ── Left — Copy ─────────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:pl-28 lg:pr-10 py-12 lg:py-14">
          <div className="max-w-[700px]">
            {/* Badge */}
            <motion.div className="inline-flex mb-10" {...fadeUp(0)}>
              <div className="inline-flex items-center gap-3 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm px-5 py-2.5 shadow-sm">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-neutral-200 text-neutral-500">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-[0.12em] text-neutral-700 dark:text-neutral-400 uppercase">
                  {badge ?? "Award-Winning Firm"}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-[clamp(40px,5.8vw,80px)] font-medium text-neutral-900 dark:text-white leading-[1.15] tracking-[-0.03em] max-w-[14ch]"
              {...fadeUp(0.08)}
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-[18px] font-sans text-neutral-500 dark:text-neutral-400 leading-[1.7] max-w-[42ch]"
              {...fadeUp(0.15)}
            >
              {subtitle}
            </motion.p>

            {/* CTA buttons */}
            <motion.div className="mt-12 flex flex-col xs:flex-row sm:flex-row gap-4" {...fadeUp(0.22)}>
              <button
                onClick={onPrimaryClick}
                className="group h-[56px] inline-flex items-center gap-2.5 rounded-2xl bg-[#122b1e] text-white text-[15px] font-semibold px-7 hover:bg-[#0c1d14] transition-colors duration-300 active:scale-[0.98]"
              >
                {primaryButtonText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M3 13L13 3M13 3H7M13 3V9"/>
                </svg>
              </button>

              <button
                onClick={onSecondaryClick}
                className="group h-[56px] inline-flex items-center gap-2.5 rounded-2xl bg-[#EDE7D3] text-[#122b1e] text-[15px] font-semibold px-7 hover:bg-[#e3dcc8] transition-colors duration-300 active:scale-[0.98]"
              >
                {secondaryButtonText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12"/>
                </svg>
              </button>
            </motion.div>

            {/* Rating */}
            <div className="mt-14 pt-10 border-t border-neutral-200/40 dark:border-neutral-800 flex flex-col">
              <motion.div className="flex items-center gap-2" {...fadeUp(0.3)}>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[14px] w-[14px] fill-[#122b1e] text-[#122b1e]" />
                  ))}
                </div>
                <div className="w-px h-5 bg-neutral-200 mx-2" />
                <span className="text-[14px] font-sans font-medium text-neutral-500 tracking-tight">
                  Rated by loving Clients
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Right — Image Panel ─────────────────────────────────── */}
        <motion.div
          className="hidden lg:flex flex-col pt-14 pb-10 pr-28 pl-8 h-full"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          {/* Image card */}
          <motion.div
            className="relative flex-1 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.08)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            <Image
              src="/previews/hero-revenue.png"
              alt="Revenue Growth"
              fill
              priority
              className="object-cover"
              sizes="45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />
          </motion.div>

          {/* Social proof — sits below image, never overlaps */}
          <div className="pt-6 border-t border-neutral-200/40 dark:border-neutral-800 mt-6 flex justify-end items-center gap-3">
            <div className="flex -space-x-3">
              <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm">
                <Image src="/developers/arjun-sharma.png" alt="Client" fill sizes="32px" className="object-cover" />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm">
                <Image src="/developers/23.jpg" alt="Client" fill sizes="32px" className="object-cover" />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm">
                <Image src="/developers/24.jpg" alt="Client" fill sizes="32px" className="object-cover" />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm">
                <Image src="/developers/25.jpg" alt="Client" fill sizes="32px" className="object-cover" />
              </div>
            </div>
            <p className="text-[14px] font-sans font-medium text-neutral-500">
              Join <span className="font-bold text-neutral-900 dark:text-white">1,000+</span> other awesome clients
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
