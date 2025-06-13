"use client"

import { Plane, MapPin, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const scrollToTripForm = () => {
    const tripFormElement = document.getElementById("plan-trip")
    if (tripFormElement) {
      tripFormElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="relative w-full bg-gradient-to-b from-primary/10 via-primary/5 to-background">
      <div className="container flex flex-col items-center justify-center py-16 md:py-24 text-center">
        <div className="animate-fade-in flex items-center justify-center mb-6 bg-primary/10 p-2 rounded-full">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          <span className="text-sm font-medium">AI-Powered Travel Planning</span>
        </div>
        <h1 className="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
          Your Perfect Trip, Planned in Seconds
        </h1>
        <p className="animate-fade-in text-xl text-muted-foreground max-w-2xl mb-8">
          TripPlanner uses AI to create personalized travel itineraries tailored to your preferences, complete with
          activities, restaurants, and local insights.
        </p>
        <div className="animate-fade-in flex flex-col sm:flex-row gap-4 mb-12">
          <Button size="lg" onClick={scrollToTripForm}>
            Plan Your Trip
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/explore">Explore Destinations</Link>
          </Button>
        </div>

        <div className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground text-center">
              Advanced AI creates personalized itineraries based on your preferences
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Local Insights</h3>
            <p className="text-sm text-muted-foreground text-center">
              Discover hidden gems and authentic experiences recommended by locals
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Day-by-Day</h3>
            <p className="text-sm text-muted-foreground text-center">
              Get detailed daily schedules with activities, restaurants, and tips
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950 [background:radial-gradient(#e5e7eb_1px,transparent_1px)] dark:[background:radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  )
}
