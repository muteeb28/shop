import { type TestimonialItem } from "@/components/ui/testimonial-carousel"
import { type StatItem } from "@/components/ui/stats-grid"

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name:        "Nicolo Taime",
    role:        "Founder, Creative Edge Studio",
    portrait:    "/testimonials/nicolo.png",
    quote:       "A true professional approach! Their vision was translated into clear strategies with unique and compelling insights. The process was smooth, and the outcome was exceptionally well-executed.",
    rating:      5,
    location:    "Los Angeles, CA",
    serviceType: "Custom Build",
  },
  {
    name:        "John Hanbert",
    role:        "Software Developer",
    portrait:    "/testimonials/john.png",
    quote:       "They made my complex project a reality with remarkable speed and precision. The team took time to understand my requirements and delivered a confident, polished product that feels uniquely mine.",
    rating:      4,
    location:    "Brooklyn, NY",
    serviceType: "Talent Hire",
  },
  {
    name:        "Priya Sharma",
    role:        "Product Manager, ScaleUp",
    portrait:    "/testimonials/priya.png",
    quote:       "We went from idea to live product in under three weeks. The talent we hired through the platform was exceptional — sharp, communicative, and focused on delivering results, not just code.",
    rating:      5,
    location:    "Austin, TX",
    serviceType: "Full Team",
  },
  {
    name:        "Marcus Johnson",
    role:        "CTO, FinEdge",
    portrait:    "/testimonials/marcus.png",
    quote:       "The quality of engineers matched to our team surpassed every expectation. Onboarding was seamless and within the first sprint we knew we'd found a long-term hiring partner.",
    rating:      5,
    location:    "New York, NY",
    serviceType: "Talent Hire",
  },
  {
    name:        "Aiko Tanaka",
    role:        "Engineering Lead, Velocity",
    portrait:    "/testimonials/aiko.png",
    quote:       "Shipped our e-commerce platform two months ahead of schedule. The custom build service handled everything from architecture to deployment — I barely had to chase a single deliverable.",
    rating:      5,
    location:    "Seattle, WA",
    serviceType: "Custom Build",
  },
]

export const STATS: StatItem[] = [
  { stat: "180+", label: "Projects completed."      },
  { stat: "96%",  label: "Client satisfaction rate." },
  { stat: "15+",  label: "Years of experience."      },
]
