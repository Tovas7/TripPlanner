"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

interface Activity {
  time: string
  title: string
  location: string
  type: string
}

interface Day {
  day: number
  date: string
  title: string
  description: string
  activities: Activity[]
}

interface TripTimelineProps {
  days: Day[]
}

export function TripTimeline({ days }: TripTimelineProps) {
  // Activity type colors
  const typeColors = {
    travel: "bg-blue-500",
    accommodation: "bg-green-500",
    food: "bg-yellow-500",
    attraction: "bg-purple-500",
    activity: "bg-pink-500",
    sightseeing: "bg-indigo-500",
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trip Timeline</h2>

      <div className="relative border-l border-muted pl-6 ml-6">
        {days.map((day, dayIndex) => (
          <div key={day.day} className="mb-10">
            <div className="absolute -left-2 mt-1.5 h-4 w-4 rounded-full border border-white bg-primary"></div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Day {day.day}: {day.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="space-y-4">
              {day.activities.map((activity, actIndex) => (
                <Card key={`${day.day}-${actIndex}`} className="relative">
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-2 w-8 bg-border"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium">{activity.time}</span>
                      </div>
                      <Badge
                        className={`capitalize ${
                          typeColors[activity.type as keyof typeof typeColors] || "bg-muted-foreground"
                        }`}
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {activity.location}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
