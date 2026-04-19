"use client"

import { useEffect, useState } from "react"
import { Instagram, MessageCircle, Facebook, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home",        link: "/" },
  { name: "Projects",    link: "#projects" },
  { name: "Hire Talent", link: "/hire-talent" },
  { name: "About",       link: "#about" },
  { name: "Contact",     link: "#contact" },
]

export function SiteNavbar() {
  const [isDark, setIsDark]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const root   = window.document.documentElement
    const stored = window.localStorage.getItem("site-theme")
    if (stored === "dark") {
      root.classList.add("dark")
      setIsDark(true)
    } else if (stored === "light") {
      root.classList.remove("dark")
      setIsDark(false)
    } else {
      setIsDark(root.classList.contains("dark"))
    }
  }, [])

  const toggleTheme = () => {
    if (typeof window === "undefined") return
    const root = window.document.documentElement
    setIsDark((prev) => {
      const next = !prev
      root.classList.toggle("dark", next)
      window.localStorage.setItem("site-theme", next ? "dark" : "light")
      return next
    })
  }

  return (
    <>
      {/* ── Top header ─────────────────────────────────────────────────── */}
      <header className="bg-ar-surface dark:bg-neutral-950 px-6 md:px-12 py-5 lg:py-6 flex items-center justify-between border-b border-ar-border/40 dark:border-neutral-800/40">

        {/* Logo */}
        <a
          href="/"
          className="font-display italic text-[1.7rem] font-semibold text-ar-foreground dark:text-white tracking-tight leading-none select-none"
        >
          Jobflix
        </a>

        {/* Desktop: availability + socials + theme toggle */}
        <div className="hidden md:flex items-center gap-8">

          {/* Availability pulse */}
          <div className="flex items-center gap-3 py-1">
            <span className="relative flex h-[9px] w-[9px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-[9px] w-[9px] bg-emerald-500" />
            </span>
            <span className="text-caption text-ar-fg-muted dark:text-neutral-400 font-medium tracking-tight">
              available for work
            </span>
          </div>

          <div className="h-6 w-px bg-ar-border dark:bg-neutral-800" />

          {/* Social icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-ar-fg-muted hover:text-ar-accent dark:text-neutral-400 dark:hover:text-white transition-colors duration-ar-fast"
            >
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <div className="h-4 w-px bg-ar-border dark:bg-neutral-800" />
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-ar-fg-muted hover:text-ar-accent dark:text-neutral-400 dark:hover:text-white transition-colors duration-ar-fast"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <div className="h-4 w-px bg-ar-border dark:bg-neutral-800" />
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-ar-fg-muted hover:text-ar-accent dark:text-neutral-400 dark:hover:text-white transition-colors duration-ar-fast"
            >
              <Facebook className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>

          <div className="h-6 w-px bg-ar-border dark:bg-neutral-800" />

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-ar-fg-subtle hover:text-ar-foreground dark:text-neutral-400 dark:hover:text-white transition-colors duration-ar-fast"
          >
            {isDark
              ? <Sun  className="h-5 w-5" strokeWidth={1.5} />
              : <Moon className="h-5 w-5" strokeWidth={1.5} />
            }
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          className="md:hidden text-ar-fg-muted dark:text-neutral-400"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* ── Mobile menu drawer ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden bg-ar-surface dark:bg-neutral-950 border-b border-ar-border dark:border-neutral-800 px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setMobileOpen(false)}
              className="text-body-md font-medium text-ar-foreground dark:text-neutral-200 hover:text-ar-accent dark:hover:text-white transition-colors duration-ar-fast"
            >
              {item.name}
            </a>
          ))}
          <Button variant="ar-primary" size="ar-sm" className="mt-2 w-full" asChild>
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              Get Started
            </a>
          </Button>
        </div>
      )}

      {/* ── Floating pill nav (desktop, fixed bottom) ──────────────────── */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex">
        <div className="flex items-center gap-1 rounded-ar-pill bg-ar-surface/90 backdrop-blur-md dark:bg-neutral-900/90 shadow-ar-md border border-ar-border/50 dark:border-neutral-800 px-3 py-2.5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="px-5 py-2 text-body-sm font-medium text-ar-fg-muted dark:text-neutral-400 hover:text-ar-foreground dark:hover:text-white rounded-ar-pill transition-colors duration-ar-fast whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
          <Button variant="ar-primary" size="sm" className="ml-2 whitespace-nowrap font-semibold" asChild>
            <a href="#contact">Get Started</a>
          </Button>
        </div>
      </nav>
    </>
  )
}
