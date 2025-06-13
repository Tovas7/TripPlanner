"use client"

import { useState } from "react"
import { format, parse } from "date-fns"
import {
  Calendar,
  MapPin,
  Clock,
  Coffee,
  Utensils,
  Music,
  Info,
  MapIcon,
  List,
  Sun,
  Cloud,
  Umbrella,
  DollarSign,
  Bookmark,
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SimpleMapView } from "@/components/simple-map-view"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ItineraryDay = {
  day: number
  date: string
  morning: { activity: string; location: string; time: string; notes: string }
  lunch: { venue: string; cuisine: string; priceRange: string; notes: string }
  afternoon: { activity: string; location: string; time: string; notes: string }
  dinner: { venue: string; cuisine: string; priceRange: string; notes: string }
  evening: { activity: string; location: string; time: string; notes: string }
}

type Itinerary = {
  id: string
  destination: string
  tripStyle: string
  startDate: string
  endDate: string
  days: ItineraryDay[]
  tips: string[]
  estimatedTotalCost: string
}

export function ItineraryView({ itinerary }: { itinerary: Itinerary }) {
  const [activeTab, setActiveTab] = useState(`day-1`)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [savedActivities, setSavedActivities] = useState<string[]>([])

  const formatDate = (dateString: string) => {
    try {
      const date = parse(dateString, "yyyy-MM-dd", new Date())
      return format(date, "EEE, MMM d")
    } catch (e) {
      return dateString
    }
  }

  // Get the current day data
  const currentDayNumber = Number.parseInt(activeTab.split("-")[1])
  const currentDay = itinerary.days.find((day) => day.day === currentDayNumber)

  // Prepare locations for the map
  const dayActivities = currentDay
    ? [
        {
          id: `morning-${currentDay.day}`,
          name: currentDay.morning.activity,
          location: currentDay.morning.location,
          time: currentDay.morning.time,
          type: "morning" as const,
        },
        {
          id: `lunch-${currentDay.day}`,
          name: currentDay.lunch.venue,
          location: currentDay.lunch.venue, // Using venue as location
          time: "Lunch",
          type: "lunch" as const,
        },
        {
          id: `afternoon-${currentDay.day}`,
          name: currentDay.afternoon.activity,
          location: currentDay.afternoon.location,
          time: currentDay.afternoon.time,
          type: "afternoon" as const,
        },
        {
          id: `dinner-${currentDay.day}`,
          name: currentDay.dinner.venue,
          location: currentDay.dinner.venue, // Using venue as location
          time: "Dinner",
          type: "dinner" as const,
        },
        {
          id: `evening-${currentDay.day}`,
          name: currentDay.evening.activity,
          location: currentDay.evening.location,
          time: currentDay.evening.time,
          type: "evening" as const,
        },
      ]
    : []

  const toggleSavedActivity = (id: string) => {
    if (savedActivities.includes(id)) {
      setSavedActivities(savedActivities.filter((activityId) => activityId !== id))
    } else {
      setSavedActivities([...savedActivities, id])
    }
  }

  // Mock weather data
  const getWeatherIcon = (day: number) => {
    const icons = [
      <Sun key="sun" className="h-5 w-5" />,
      <Cloud key="cloud" className="h-5 w-5" />,
      <Umbrella key="umbrella" className="h-5 w-5" />,
    ]
    return icons[day % 3]
  }

  const getWeatherText = (day: number) => {
    const weather = ["Sunny, 75°F", "Partly Cloudy, 68°F", "Light Rain, 62°F"]
    return weather[day % 3]
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Trip Overview</CardTitle>
            <CardDescription>
              Your {itinerary.days.length}-day adventure in {itinerary.destination}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {itinerary.tripStyle}
                  </Badge>
                  <Badge variant="secondary">
                    <Calendar className="h-3 w-3 mr-1" />
                    {itinerary.days.length} Days
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Estimated Cost: {itinerary.estimatedTotalCost}
                </div>
              </div>

              <div className="relative pt-4">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border ml-[7px]"></div>
                {itinerary.days.map((day, index) => (
                  <div key={day.day} className="relative pl-6 pb-6">
                    <div
                      className={`absolute left-0 top-0 h-4 w-4 rounded-full border-2 ${
                        activeTab === `day-${day.day}`
                          ? "bg-primary border-primary"
                          : "bg-background border-muted-foreground"
                      }`}
                    ></div>
                    <button
                      onClick={() => setActiveTab(`day-${day.day}`)}
                      className={`flex items-center justify-between w-full text-left rounded-md p-2 hover:bg-muted transition-colors ${
                        activeTab === `day-${day.day}` ? "bg-muted" : ""
                      }`}
                    >
                      <div>
                        <p className="font-medium">
                          Day {day.day} - {formatDate(day.date)}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {day.morning.activity}, {day.afternoon.activity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs bg-muted-foreground/20 p-1 rounded flex items-center">
                          {getWeatherIcon(day.day)}
                          <span className="ml-1 hidden sm:inline">{getWeatherText(day.day)}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Trip Stats</CardTitle>
            <CardDescription>Key information about your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Trip Progress</span>
                  <span>0/{itinerary.days.length} days</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Activities</p>
                  <p className="text-2xl font-bold">{itinerary.days.length * 3}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Restaurants</p>
                  <p className="text-2xl font-bold">{itinerary.days.length * 2}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Saved</p>
                  <p className="text-2xl font-bold">{savedActivities.length}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-sm">Top Tips</h4>
                <ul className="space-y-2 text-sm">
                  {itinerary.tips.slice(0, 3).map((tip, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <Info className="h-4 w-4 mr-2" />
                  View All Tips
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Travel Tips for {itinerary.destination}</DialogTitle>
                  <DialogDescription>Helpful advice to make your trip more enjoyable</DialogDescription>
                </DialogHeader>
                <ul className="space-y-2 mt-4">
                  {itinerary.tips.map((tip, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto">
            {itinerary.days.map((day) => (
              <TabsTrigger key={day.day} value={`day-${day.day}`} className="min-w-[100px]">
                <span className="font-medium">Day {day.day}</span>
                <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">{formatDate(day.date)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {itinerary.days.map((day) => (
          <TabsContent key={day.day} value={`day-${day.day}`} className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Day {day.day}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(day.date)}</span>
                  <span className="flex items-center gap-1">
                    {getWeatherIcon(day.day)}
                    <span>{getWeatherText(day.day)}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {itinerary.tripStyle}
                </Badge>
                <div className="border rounded-md p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("map")}
                  >
                    <MapIcon className="h-4 w-4" />
                    <span className="sr-only">Map view</span>
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === "map" ? (
              <SimpleMapView destination={itinerary.destination} dayActivities={dayActivities} />
            ) : (
              <div className="stagger-animation">
                <Card className="overflow-hidden mb-6">
                  <CardHeader className="bg-muted/50 pb-2 flex flex-row items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <Coffee className="h-5 w-5 mr-2 text-primary" />
                        <CardTitle className="text-lg">Morning</CardTitle>
                      </div>
                      <CardDescription className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {day.morning.time}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleSavedActivity(`morning-${day.day}`)}
                          >
                            {savedActivities.includes(`morning-${day.day}`) ? (
                              <Bookmark className="h-4 w-4 fill-primary text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {savedActivities.includes(`morning-${day.day}`) ? "Remove from saved" : "Save activity"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted/30 rounded-lg h-16 w-16 flex items-center justify-center shrink-0">
                        <Coffee className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{day.morning.activity}</h4>
                        <p className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {day.morning.location}
                        </p>
                        <p className="text-sm">{day.morning.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden mb-6">
                  <CardHeader className="bg-muted/50 pb-2 flex flex-row items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <Utensils className="h-5 w-5 mr-2 text-primary" />
                        <CardTitle className="text-lg">Lunch</CardTitle>
                      </div>
                      <CardDescription>
                        {day.lunch.cuisine} · {day.lunch.priceRange}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleSavedActivity(`lunch-${day.day}`)}
                          >
                            {savedActivities.includes(`lunch-${day.day}`) ? (
                              <Bookmark className="h-4 w-4 fill-primary text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {savedActivities.includes(`lunch-${day.day}`) ? "Remove from saved" : "Save restaurant"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted/30 rounded-lg h-16 w-16 flex items-center justify-center shrink-0">
                        <Utensils className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{day.lunch.venue}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {day.lunch.cuisine}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{day.lunch.priceRange}</span>
                        </div>
                        <p className="text-sm">{day.lunch.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden mb-6">
                  <CardHeader className="bg-muted/50 pb-2 flex flex-row items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        <CardTitle className="text-lg">Afternoon</CardTitle>
                      </div>
                      <CardDescription className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {day.afternoon.time}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleSavedActivity(`afternoon-${day.day}`)}
                          >
                            {savedActivities.includes(`afternoon-${day.day}`) ? (
                              <Bookmark className="h-4 w-4 fill-primary text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {savedActivities.includes(`afternoon-${day.day}`) ? "Remove from saved" : "Save activity"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted/30 rounded-lg h-16 w-16 flex items-center justify-center shrink-0">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{day.afternoon.activity}</h4>
                        <p className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {day.afternoon.location}
                        </p>
                        <p className="text-sm">{day.afternoon.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden mb-6">
                  <CardHeader className="bg-muted/50 pb-2 flex flex-row items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <Utensils className="h-5 w-5 mr-2 text-primary" />
                        <CardTitle className="text-lg">Dinner</CardTitle>
                      </div>
                      <CardDescription>
                        {day.dinner.cuisine} · {day.dinner.priceRange}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleSavedActivity(`dinner-${day.day}`)}
                          >
                            {savedActivities.includes(`dinner-${day.day}`) ? (
                              <Bookmark className="h-4 w-4 fill-primary text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {savedActivities.includes(`dinner-${day.day}`) ? "Remove from saved" : "Save restaurant"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted/30 rounded-lg h-16 w-16 flex items-center justify-center shrink-0">
                        <Utensils className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{day.dinner.venue}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {day.dinner.cuisine}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{day.dinner.priceRange}</span>
                        </div>
                        <p className="text-sm">{day.dinner.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="bg-muted/50 pb-2 flex flex-row items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <Music className="h-5 w-5 mr-2 text-primary" />
                        <CardTitle className="text-lg">Evening</CardTitle>
                      </div>
                      <CardDescription className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {day.evening.time}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleSavedActivity(`evening-${day.day}`)}
                          >
                            {savedActivities.includes(`evening-${day.day}`) ? (
                              <Bookmark className="h-4 w-4 fill-primary text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {savedActivities.includes(`evening-${day.day}`) ? "Remove from saved" : "Save activity"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted/30 rounded-lg h-16 w-16 flex items-center justify-center shrink-0">
                        <Music className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{day.evening.activity}</h4>
                        <p className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {day.evening.location}
                        </p>
                        <p className="text-sm">{day.evening.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
