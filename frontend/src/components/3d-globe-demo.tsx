import dynamic from "next/dynamic"
import { Component, ReactNode } from "react"
import { GlobeMarker } from "@/components/ui/3d-globe"
import { SectionHeader } from "@/components/ui/section-header"
import { StatBlock } from "@/components/ui/stat-block"
import { Container } from "@/components/ui/container"

const Globe3D = dynamic(() => import("@/components/ui/3d-globe").then(mod => mod.Globe3D), {
  ssr: false,
})

class GlobeErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) {
      return (
        <div className="flex items-center justify-center h-[500px] text-ar-fg-subtle text-body-sm">
          3D globe requires WebGL — not supported in this environment.
        </div>
      )
    }
    return this.props.children
  }
}

const sampleMarkers: GlobeMarker[] = [
  { lat: 40.7128,  lng: -74.006,   src: "https://assets.aceternity.com/avatars/1.webp",  label: "New York"      },
  { lat: 51.5074,  lng: -0.1278,   src: "https://assets.aceternity.com/avatars/2.webp",  label: "London"        },
  { lat: 35.6762,  lng: 139.6503,  src: "https://assets.aceternity.com/avatars/3.webp",  label: "Tokyo"         },
  { lat: -33.8688, lng: 151.2093,  src: "https://assets.aceternity.com/avatars/4.webp",  label: "Sydney"        },
  { lat: 48.8566,  lng: 2.3522,    src: "https://assets.aceternity.com/avatars/5.webp",  label: "Paris"         },
  { lat: 28.6139,  lng: 77.209,    src: "https://assets.aceternity.com/avatars/6.webp",  label: "New Delhi"     },
  { lat: 55.7558,  lng: 37.6173,   src: "https://assets.aceternity.com/avatars/7.webp",  label: "Moscow"        },
  { lat: -22.9068, lng: -43.1729,  src: "https://assets.aceternity.com/avatars/8.webp",  label: "Rio de Janeiro"},
  { lat: 31.2304,  lng: 121.4737,  src: "https://assets.aceternity.com/avatars/9.webp",  label: "Shanghai"      },
  { lat: 25.2048,  lng: 55.2708,   src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai"         },
  { lat: -34.6037, lng: -58.3816,  src: "https://assets.aceternity.com/avatars/11.webp", label: "Buenos Aires"  },
  { lat: 1.3521,   lng: 103.8198,  src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore"     },
  { lat: 37.5665,  lng: 126.978,   src: "https://assets.aceternity.com/avatars/13.webp", label: "Seoul"         },
]

export default function Globe3DDemo() {
  return (
    <div className="bg-ar-surface dark:bg-neutral-950 py-24 relative overflow-hidden">
      <Container>
        {/* Section header */}
        <div className="text-center mb-10">
          <SectionHeader
            eyebrow="Global Reach"
            heading="Our clients are from everywhere"
            body="From the UAE to India, UK to Canada — we build products for founders and businesses across the globe."
            align="center"
          />
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 mb-8">
          <StatBlock value="13+" label="Projects delivered" />
          <div className="hidden md:block w-px h-14 bg-ar-border" />
          <StatBlock value="8+" label="Countries reached" />
          <div className="hidden md:block w-px h-14 bg-ar-border" />
          <StatBlock value="500+" label="Users served" />
        </div>
      </Container>

      {/* Globe */}
      <div className="relative w-full max-w-3xl mx-auto h-[500px]">
        <GlobeErrorBoundary>
          <Globe3D
            markers={sampleMarkers}
            config={{
              atmosphereColor: "#4da6ff",
              atmosphereIntensity: 20,
              bumpScale: 5,
              autoRotateSpeed: 0.3,
            }}
            onMarkerClick={(marker) => { console.log("Clicked marker:", marker.label) }}
            onMarkerHover={(marker) => { if (marker) console.log("Hovering:", marker.label) }}
          />
        </GlobeErrorBoundary>
      </div>

      {/* Country tags */}
      <Container className="mt-10 text-center">
        <p className="text-caption text-ar-fg-subtle mb-5">Trusted by founders and teams across</p>
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {['\uD83C\uDDE6\uD83C\uDDEA UAE', '\uD83C\uDDEE\uD83C\uDDF3 India', '\uD83C\uDDEC\uD83C\uDDE7 UK', '\uD83C\uDDE8\uD83C\uDDE6 Canada', '\uD83C\uDDFA\uD83C\uDDF8 USA', '\uD83C\uDDF8\uD83C\uDDE6 Saudi Arabia', '\uD83C\uDDF5\uD83C\uDDF0 Pakistan'].map(country => (
            <span
              key={country}
              className="text-ar-fg-muted text-body-sm font-medium px-3 py-1 bg-ar-surface-muted rounded-ar-pill border border-ar-border"
            >
              {country}
            </span>
          ))}
        </div>
      </Container>
    </div>
  )
}
