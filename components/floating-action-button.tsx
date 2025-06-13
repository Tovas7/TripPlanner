"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

export function FloatingActionButton() {
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  const isHome = pathname === "/"
  const isItineraryPage = pathname.startsWith("/itinerary/")

  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleClick = () => {
    if (isHome) {
      // If on home page, scroll to the trip planning form
      const tripFormElement = document.getElementById("plan-trip")
      if (tripFormElement) {
        tripFormElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    } else {
      // If on another page, navigate to home page
      router.push("/#plan-trip")
    }
  }

  // Don't show on itinerary pages or when not visible
  if (isItineraryPage || !isVisible) {
    return null
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg md:hidden h-14 w-14 p-0"
      aria-label={isHome ? "Plan Your Trip" : "Plan New Trip"}
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}
