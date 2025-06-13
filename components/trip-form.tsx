"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2, Plane, ArrowRight } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateItinerary } from "@/app/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export function TripForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [tripStyle, setTripStyle] = useState("")
  const [preferences, setPreferences] = useState("")
  const [activeTab, setActiveTab] = useState("custom")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!destination || !startDate || !endDate || !tripStyle) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to generate your itinerary.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const tripDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

      if (tripDuration < 1) {
        toast({
          title: "Invalid dates",
          description: "Your end date must be after your start date.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      if (tripDuration > 14) {
        toast({
          title: "Trip too long",
          description: "Currently, we support trips up to 14 days. Please adjust your dates.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const itineraryId = await generateItinerary({
        destination,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        tripDuration,
        tripStyle,
        preferences,
      })

      router.push(`/itinerary/${itineraryId}`)
    } catch (error) {
      console.error("Failed to generate itinerary:", error)
      toast({
        title: "Error",
        description: "Failed to generate your itinerary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const popularDestinations = [
    { name: "Paris", style: "cultural", image: "/placeholder.svg?height=100&width=200" },
    { name: "Tokyo", style: "adventure", image: "/placeholder.svg?height=100&width=200" },
    { name: "New York", style: "urban", image: "/placeholder.svg?height=100&width=200" },
  ]

  const handlePopularDestination = (destination: string, style: string) => {
    setDestination(destination)
    setTripStyle(style)
    setActiveTab("custom")
  }

  return (
    <div id="plan-trip">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Plan Your Dream Trip</h2>
        <p className="text-muted-foreground max-w-2xl">
          Tell us about your travel preferences and let our AI create a personalized itinerary just for you.
        </p>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="custom">Custom Trip</TabsTrigger>
            <TabsTrigger value="popular">Popular Destinations</TabsTrigger>
          </TabsList>
          <CardContent className="p-6">
            <TabsContent value="custom" className="mt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Where do you want to go?</Label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="destination"
                      placeholder="Paris, Tokyo, New York..."
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="start-date"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="end-date"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => date < (startDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trip-style">Trip Style</Label>
                  <Select value={tripStyle} onValueChange={setTripStyle} required>
                    <SelectTrigger id="trip-style">
                      <SelectValue placeholder="Select trip style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relaxing">Relaxing</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="foodie">Foodie</SelectItem>
                      <SelectItem value="family">Family-friendly</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferences">Additional Preferences (Optional)</Label>
                  <Textarea
                    id="preferences"
                    placeholder="Tell us more about what you like or any special requirements..."
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Itinerary...
                    </>
                  ) : (
                    <>
                      Generate Itinerary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularDestinations.map((dest, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handlePopularDestination(dest.name, dest.style)}
                  >
                    <div className="aspect-[4/3] bg-muted">
                      <img
                        src={dest.image || "/placeholder.svg"}
                        alt={dest.name}
                        className="object-cover w-full h-full"
                        width={200}
                        height={150}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-bold">{dest.name}</h3>
                        <p className="text-sm capitalize">{dest.style}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Click on a destination to select it, then customize your trip details.
              </p>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
