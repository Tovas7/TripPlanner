// This is a simplified geocoding service
// In a production app, you would use a real geocoding API like Google Maps, Mapbox, or OpenStreetMap

type Coordinates = {
  lat: number
  lng: number
}

// Cache for geocoded locations to avoid duplicate requests
const geocodeCache = new Map<string, Coordinates>()

// Simulate geocoding with some predefined locations
const knownLocations: Record<string, Coordinates> = {
  "eiffel tower": { lat: 48.8584, lng: 2.2945 },
  "louvre museum": { lat: 48.8606, lng: 2.3376 },
  "notre dame": { lat: 48.853, lng: 2.3499 },
  montmartre: { lat: 48.8867, lng: 2.3431 },
  "champs-élysées": { lat: 48.8698, lng: 2.3079 },
  "times square": { lat: 40.758, lng: -73.9855 },
  "central park": { lat: 40.7812, lng: -73.9665 },
  "empire state building": { lat: 40.7484, lng: -73.9857 },
  "tokyo tower": { lat: 35.6586, lng: 139.7454 },
  "shibuya crossing": { lat: 35.6595, lng: 139.7004 },
  "sensoji temple": { lat: 35.7147, lng: 139.7966 },
  colosseum: { lat: 41.8902, lng: 12.4922 },
  "trevi fountain": { lat: 41.9009, lng: 12.4833 },
  "sydney opera house": { lat: -33.8568, lng: 151.2153 },
  "bondi beach": { lat: -33.8915, lng: 151.2767 },
}

// Add some random variation to make points not overlap exactly
const addJitter = (coord: number): number => {
  return coord + (Math.random() - 0.5) * 0.005
}

export async function geocodeLocation(locationName: string): Promise<Coordinates | null> {
  // Check cache first
  if (geocodeCache.has(locationName)) {
    return geocodeCache.get(locationName)!
  }

  // Normalize the location name
  const normalizedName = locationName.toLowerCase()

  // Check for partial matches in known locations
  for (const [key, coords] of Object.entries(knownLocations)) {
    if (normalizedName.includes(key)) {
      // Add slight jitter to avoid exact overlaps
      const result = {
        lat: addJitter(coords.lat),
        lng: addJitter(coords.lng),
      }
      geocodeCache.set(locationName, result)
      return result
    }
  }

  // If no match, generate a random location based on the first character
  // This is just for demonstration - in a real app you'd use a proper geocoding service
  const firstChar = normalizedName.charCodeAt(0) || 97
  const randomLat = ((firstChar % 180) - 90) * 0.5
  const randomLng = (((firstChar * 2) % 360) - 180) * 0.5

  const result = { lat: randomLat, lng: randomLng }
  geocodeCache.set(locationName, result)
  return result
}

export function getDefaultMapCenter(destination: string): Coordinates {
  const normalizedDestination = destination.toLowerCase()

  // Check for known cities
  if (normalizedDestination.includes("paris")) return { lat: 48.8566, lng: 2.3522 }
  if (normalizedDestination.includes("new york")) return { lat: 40.7128, lng: -74.006 }
  if (normalizedDestination.includes("tokyo")) return { lat: 35.6762, lng: 139.6503 }
  if (normalizedDestination.includes("rome")) return { lat: 41.9028, lng: 12.4964 }
  if (normalizedDestination.includes("london")) return { lat: 51.5074, lng: -0.1278 }
  if (normalizedDestination.includes("sydney")) return { lat: -33.8688, lng: 151.2093 }

  // Default to a central point
  return { lat: 0, lng: 0 }
}
