"use client"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"

import { WhyChooseUsBento } from "@/components/why-choose-us-bento"
import Globe3DDemo from "@/components/3d-globe-demo"
import { BuildCustomProjectModal } from "@/components/BuildCustomProjectModal"

import { useProjects } from "@/hooks/useProjects"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const { projects, handleProjectBuy, handleProjectDemo } = useProjects()
  const [hasMounted, setHasMounted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <div className="min-h-screen bg-white dark:bg-neutral-950" />
  }
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">

      <BuildCustomProjectModal open={modalOpen} onOpenChange={setModalOpen} />

      <main>
        <HeroSection
          title={
            <>
              Build Full apps in days,
              <span className="text-sky-600"> not months</span>
            </>
          }
          subtitle="Turn your idea into a live product in days, not months. No hiring, no delays — just a production-ready app so you can start selling faster."
          primaryButtonText="Build Custom Project"
          secondaryButtonText="Hire Talent"
          onPrimaryClick={() => setModalOpen(true)}
          onSecondaryClick={() => router.push("/hire-talent")}
        />

        <div id="projects">
          <ProjectsGrid />
        </div>

        <div id="about">
          <WhyChooseUsBento />
        </div>
        <Globe3DDemo />

      </main>
    </div>
  )
}
