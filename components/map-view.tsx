"use client"

import { useEffect, useRef, useState } from "react"
import { Map, Marker, Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { geocodeLocation, getDefaultMapCenter } from "@/lib/geocode"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

// Use the environment variable for the Mapbox token
// This is safe to use in the browser as it's prefixed with NEXT_PUBLIC_
const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"

export function MapView({ destination, dayActivities }: MapViewProps) {
  const [locations, setLocations] = useState<ActivityLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
  })
  const [selectedMarker, setSelectedMarker] = useState<ActivityLocation | null>(null)
  const mapRef = useRef(null)

  // Geocode locations and set up the map
  useEffect(() => {
    async function geocodeLocations() {
      setLoading(true)

      // Get default center for the map based on destination
      const defaultCenter = getDefaultMapCenter(destination)
      setViewState({
        latitude: defaultCenter.lat,
        longitude: defaultCenter.lng,
        zoom: 12,
      })

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
  }, [dayActivities, destination])

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
    <div className="h-[400px] rounded-lg overflow-hidden border">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            latitude={location.lat!}
            longitude={location.lng!}
            color={markerColors[location.type]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelectedMarker(location)
            }}
          />
        ))}

        {selectedMarker && (
          <Popup
            latitude={selectedMarker.lat!}
            longitude={selectedMarker.lng!}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedMarker(null)}
            anchor="bottom"
            offset={20}
          >
            <div className="p-2 max-w-[200px]">
              <Badge className="mb-1 capitalize">{selectedMarker.type}</Badge>
              <h3 className="font-semibold text-sm">{selectedMarker.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedMarker.location}</p>
              <p className="text-xs mt-1">{selectedMarker.time}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}
