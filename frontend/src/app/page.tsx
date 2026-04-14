"use client"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"

import { WhyChooseUsBento } from "@/components/why-choose-us-bento"
import GlobeDemo from "@/components/globe-demo"

import { useProjects } from "@/hooks/useProjects"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const { projects, handleProjectBuy, handleProjectDemo } = useProjects()

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">


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
          onPrimaryClick={() => router.push("/contact")}
          onSecondaryClick={() => router.push("/hire-talent")}
        />

        <div id="projects">
          <ProjectsGrid
            projects={projects}
            onProjectBuy={handleProjectBuy}
            onProjectDemo={handleProjectDemo}
          />
        </div>

        <div id="about">
          <WhyChooseUsBento />
        </div>
        <GlobeDemo />

      </main>
    </div>
  )
}
