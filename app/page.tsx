"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { TripForm } from "@/components/trip-form"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if we need to scroll to the trip form after navigation
    if (window.location.hash === "#plan-trip") {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        const tripFormElement = document.getElementById("plan-trip")
        if (tripFormElement) {
          tripFormElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }, 100)
    }
  }, [searchParams])

  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <div className="container py-12 md:py-16">
        <TripForm />
      </div>
      <Features />
      <Testimonials />
    </main>
  )
}
