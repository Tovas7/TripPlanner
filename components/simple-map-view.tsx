"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { geocodeLocation } from "@/lib/geocode"

// Define the types for our location data
type ActivityLocation = {
  id: string
  name: string
  location: string
  time: string
  type: "morning" | "afternoon" | "evening" | "lunch" | "dinner"
  lat?: number
  lng?: number
}

type MapViewProps = {
  destination: string
  dayActivities: ActivityLocation[]
}

// Map marker colors by activity type
const markerColors = {
  morning: "#3b82f6", // blue
  lunch: "#10b981", // green
  afternoon: "#f59e0b", // amber
  dinner: "#ef4444", // red
  evening: "#8b5cf6", // purple
}

export function SimpleMapView({ destination, dayActivities }: MapViewProps) {
  const [locations, setLocations] = useState<ActivityLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMarker, setSelectedMarker] = useState<ActivityLocation | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Geocode locations and set up the map
  useEffect(() => {
    async function geocodeLocations() {
      setLoading(true)

      // Geocode each location
      const locationsWithCoords = await Promise.all(
        dayActivities.map(async (activity) => {
          if (!activity.location) return activity

          const coords = await geocodeLocation(activity.location)
          return {
            ...activity,
            lat: coords?.lat,
            lng: coords?.lng,
          }
        }),
      )

      // Filter out locations without coordinates
      const validLocations = locationsWithCoords.filter(
        (loc): loc is ActivityLocation & { lat: number; lng: number } =>
          typeof loc.lat === "number" && typeof loc.lng === "number",
      )

      setLocations(validLocations)
      setLoading(false)
    }

    if (dayActivities.length > 0) {
      geocodeLocations()
    }
  }, [dayActivities])

  // Draw the map on canvas
  useEffect(() => {
    if (loading || !canvasRef.current || locations.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get map bounds
    const lats = locations.map((loc) => loc.lat!)
    const lngs = locations.map((loc) => loc.lng!)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    // Add padding
    const latPadding = (maxLat - minLat) * 0.2 || 0.01
    const lngPadding = (maxLng - minLng) * 0.2 || 0.01
    const mapMinLat = minLat - latPadding
    const mapMaxLat = maxLat + latPadding
    const mapMinLng = minLng - lngPadding
    const mapMaxLng = maxLng + lngPadding

    // Draw background
    ctx.fillStyle = "#f8fafc" // Light background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * canvas.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * canvas.width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Function to convert lat/lng to canvas coordinates
    const latLngToCanvas = (lat: number, lng: number) => {
      const x = ((lng - mapMinLng) / (mapMaxLng - mapMinLng)) * canvas.width
      const y = canvas.height - ((lat - mapMinLat) / (mapMaxLat - mapMinLat)) * canvas.height
      return { x, y }
    }

    // Draw markers
    locations.forEach((location) => {
      const { x, y } = latLngToCanvas(location.lat!, location.lng!)
      const color = markerColors[location.type]

      // Draw marker circle
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw white border
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.stroke()
    })

    // Draw selected marker info if any
    if (selectedMarker) {
      const { x, y } = latLngToCanvas(selectedMarker.lat!, selectedMarker.lng!)

      // Draw highlight circle
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.stroke()

      // Draw info box
      const boxWidth = 150
      const boxHeight = 80
      let boxX = x + 15
      let boxY = y - 40

      // Adjust box position if it would go off canvas
      if (boxX + boxWidth > canvas.width) boxX = x - boxWidth - 15
      if (boxY + boxHeight > canvas.height) boxY = y - boxHeight - 15
      if (boxY < 0) boxY = 10

      // Draw box background
      ctx.fillStyle = "white"
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 5)
      ctx.fill()
      ctx.stroke()

      // Draw text
      ctx.fillStyle = "#000000"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(selectedMarker.name.substring(0, 20), boxX + 10, boxY + 20)
      ctx.font = "10px sans-serif"
      ctx.fillText(selectedMarker.location.substring(0, 25), boxX + 10, boxY + 40)
      ctx.fillText(selectedMarker.time.substring(0, 25), boxX + 10, boxY + 60)
    }
  }, [loading, locations, selectedMarker])

  // Handle canvas click to select markers
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || locations.length === 0) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Get map bounds
    const lats = locations.map((loc) => loc.lat!)
    const lngs = locations.map((loc) => loc.lng!)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    // Add padding
    const latPadding = (maxLat - minLat) * 0.2 || 0.01
    const lngPadding = (maxLng - minLng) * 0.2 || 0.01
    const mapMinLat = minLat - latPadding
    const mapMaxLat = maxLat + latPadding
    const mapMinLng = minLng - lngPadding
    const mapMaxLng = maxLng + lngPadding

    // Function to convert canvas coordinates to lat/lng
    const canvasToLatLng = (x: number, y: number) => {
      const lng = mapMinLng + (x / canvas.width) * (mapMaxLng - mapMinLng)
      const lat = mapMinLat + ((canvas.height - y) / canvas.height) * (mapMaxLat - mapMinLat)
      return { lat, lng }
    }

    const clickPos = canvasToLatLng(x, y)

    // Find closest marker within threshold
    const threshold = 0.01 // Adjust based on map scale
    let closestMarker = null
    let minDistance = threshold

    for (const location of locations) {
      const distance = Math.sqrt(Math.pow(location.lat! - clickPos.lat, 2) + Math.pow(location.lng! - clickPos.lng, 2))
      if (distance < minDistance) {
        minDistance = distance
        closestMarker = location
      }
    }

    setSelectedMarker(closestMarker)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px] rounded-lg overflow-hidden border relative">
        <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" onClick={handleCanvasClick} />
        <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow-sm text-xs">
          <div className="font-medium mb-1">Map Legend:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(markerColors).map(([type, color]) => (
              <div key={type} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }}></div>
                <span className="capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedMarker?.id === location.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedMarker(location)}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: markerColors[location.type] }}></div>
              <Badge className="capitalize">{location.type}</Badge>
            </div>
            <h4 className="font-medium text-sm">{location.name}</h4>
            <p className="text-xs text-muted-foreground">{location.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
