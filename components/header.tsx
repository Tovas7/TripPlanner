"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { MobileMenu } from "@/components/mobile-menu"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isHome = pathname === "/"

  const navigation = [
    { name: "Home", href: "/" },
    { name: "My Trips", href: "/trips" },
    { name: "Explore", href: "/explore" },
    { name: "Help", href: "/help" },
  ]

  const handlePlanNewTrip = () => {
    if (isHome) {
      // If already on home page, scroll to the trip planning form
      const tripFormElement = document.getElementById("plan-trip")
      if (tripFormElement) {
        tripFormElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    } else {
      // If on another page, navigate to home page and then scroll to form
      router.push("/#plan-trip")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">TripPlanner</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground font-semibold"
                  : pathname.startsWith(item.href) && item.href !== "/"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle button */}
          <ThemeToggle />

          {/* Plan New Trip button - always visible but changes behavior */}
          <Button onClick={handlePlanNewTrip} className="hidden sm:flex">
            {isHome ? "Plan Your Trip" : "Plan New Trip"}
          </Button>

          {/* Mobile menu */}
          <MobileMenu navigation={navigation} isHome={isHome} onPlanNewTrip={handlePlanNewTrip} />
        </div>
      </div>
    </header>
  )
}
