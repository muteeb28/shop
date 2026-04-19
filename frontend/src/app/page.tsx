"use client"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"

import { WhyChooseUsBento } from "@/components/why-choose-us-bento"
import Globe3DDemo from "@/components/3d-globe-demo"
import { BuildCustomProjectModal } from "@/components/BuildCustomProjectModal"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { FaqSection }          from "@/components/sections/FaqSection"

import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <div className="min-h-screen bg-ar-background dark:bg-neutral-950" />
  }
  return (
    <div className="min-h-screen bg-ar-background dark:bg-neutral-950">

      <BuildCustomProjectModal open={modalOpen} onOpenChange={setModalOpen} />

      <main>
        <HeroSection
          title={
            <>
              Build full apps in days,{" "}
              <span>not months</span>
            </>
          }
          subtitle="Turn your idea into a live product fast. No hiring, no delays — just a production-ready app so you can start shipping sooner."
          primaryButtonText="Build Custom Project"
          secondaryButtonText="Hire Talent"
          onPrimaryClick={() => setModalOpen(true)}
          onSecondaryClick={() => router.push("/hire-talent")}
        />

        <div id="projects">
          <ProjectsGrid />
        </div>

        <div id="testimonials">
          <TestimonialsSection onGetStarted={() => setModalOpen(true)} />
        </div>

        <div id="about">
          <WhyChooseUsBento />
        </div>
        <div id="faq">
          <FaqSection onGetStarted={() => setModalOpen(true)} />
        </div>

        <Globe3DDemo />

      </main>
    </div>
  )
}
