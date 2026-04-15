import dynamic from "next/dynamic"
import { GlobeMarker } from "@/components/ui/3d-globe";

const Globe3D = dynamic(() => import("@/components/ui/3d-globe").then(mod => mod.Globe3D), {
  ssr: false,
})

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

export default function Globe3DDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 w-full bg-white dark:bg-neutral-950 relative overflow-hidden">
      
      {/* Content above the globe */}
      <div className="text-center z-10 relative mb-4">
        <p className="text-blue-600 text-sm uppercase tracking-widest font-medium mb-3">
          Global Reach
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Our clients are from everywhere
        </h2>

        <p className="text-gray-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto mb-4">
          From the UAE to India, UK to Canada — we build products for founders and businesses across the globe.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-8 mt-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">13+</p>
            <p className="text-sm text-gray-500">Projects Delivered</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">8+</p>
            <p className="text-sm text-gray-500">Countries Reached</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">500+</p>
            <p className="text-sm text-gray-500">Users Served</p>
          </div>
        </div>
      </div>

      {/* The Globe Wrapper - WebGL component ONLY */}
      <div className="relative w-full max-w-3xl mx-auto h-[500px]">
        <Globe3D
          markers={sampleMarkers}
          config={{
            atmosphereColor: "#4da6ff",
            atmosphereIntensity: 20,
            bumpScale: 5,
            autoRotateSpeed: 0.3,
          }}
          onMarkerClick={(marker) => {
            console.log("Clicked marker:", marker.label);
          }}
          onMarkerHover={(marker) => {
            if (marker) {
              console.log("Hovering:", marker.label);
            }
          }}
        />
      </div>

      {/* Logos strip below the globe */}
      <div className="mt-8 md:mt-12 text-center relative z-10">
        <p className="text-gray-400 dark:text-neutral-500 text-sm mb-6">Trusted by founders and teams across</p>
        <div className="flex justify-center items-center gap-3 md:gap-8 flex-wrap">
          {['\uD83C\uDDE6\uD83C\uDDEA UAE', '\uD83C\uDDEE\uD83C\uDDF3 India', '\uD83C\uDDEC\uD83C\uDDE7 UK', '\uD83C\uDDE8\uD83C\uDDE6 Canada', '\uD83C\uDDFA\uD83C\uDDF8 USA', '\uD83C\uDDF8\uD83C\uDDE6 Saudi Arabia', '\uD83C\uDDF5\uD83C\uDDF0 Pakistan'].map(country => (
            <span key={country} className="text-gray-500 dark:text-neutral-300 text-sm font-medium px-3 py-1 bg-gray-50 dark:bg-neutral-900 rounded-full border border-gray-200 dark:border-neutral-800">
              {country}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
}
