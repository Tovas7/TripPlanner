"use server"

import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"

// In a real app, this would be stored in a database
const itineraries = new Map()

export type TripDetails = {
  destination: string
  startDate: string
  endDate: string
  tripDuration: number
  tripStyle: string
  preferences: string
}

export async function generateItinerary(tripDetails: TripDetails) {
  const { destination, startDate, endDate, tripDuration, tripStyle, preferences } = tripDetails

  try {
    // For demo purposes, we'll use mock data instead of calling the OpenAI API
    // In a production app, you would use a proper API route with environment variables
    return generateMockItinerary(tripDetails)
  } catch (error) {
    console.error("Error generating itinerary:", error)
    throw new Error("Failed to generate itinerary")
  }
}

// Function to generate mock itinerary data for demo purposes
function generateMockItinerary(tripDetails: TripDetails) {
  const { destination, startDate, endDate, tripDuration, tripStyle } = tripDetails

  // Create a simple mock itinerary
  const mockDays = []

  // Parse the start date
  const start = new Date(startDate)

  for (let i = 0; i < tripDuration; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)
    const dayNumber = i + 1

    // Create different activities based on the day number and trip style
    let morningActivity, morningLocation, afternoonActivity, afternoonLocation, eveningActivity, eveningLocation
    let lunchVenue, lunchCuisine, dinnerVenue, dinnerCuisine

    // Customize activities based on destination and trip style
    if (destination.toLowerCase().includes("paris")) {
      if (dayNumber === 1) {
        morningActivity = "Visit the Eiffel Tower"
        morningLocation = "Eiffel Tower, Champ de Mars"
        lunchVenue = "Café Constant"
        lunchCuisine = "French"
        afternoonActivity = "Explore the Louvre Museum"
        afternoonLocation = "Louvre Museum, Rue de Rivoli"
        dinnerVenue = "Le Jules Verne"
        dinnerCuisine = "Fine Dining"
        eveningActivity = "Seine River Cruise"
        eveningLocation = "Bateaux Parisiens, Port de la Bourdonnais"
      } else if (dayNumber === 2) {
        morningActivity = "Visit Notre-Dame Cathedral"
        morningLocation = "Notre-Dame Cathedral, Île de la Cité"
        lunchVenue = "Les Deux Magots"
        lunchCuisine = "French Café"
        afternoonActivity = "Explore Montmartre and Sacré-Cœur"
        afternoonLocation = "Montmartre, 18th Arrondissement"
        dinnerVenue = "Le Petit Canard"
        dinnerCuisine = "Traditional French"
        eveningActivity = "Moulin Rouge Show"
        eveningLocation = "Moulin Rouge, 82 Boulevard de Clichy"
      } else {
        morningActivity = "Visit the Palace of Versailles"
        morningLocation = "Palace of Versailles, Place d'Armes"
        lunchVenue = "La Flottille"
        lunchCuisine = "French"
        afternoonActivity = "Stroll through the Champs-Élysées"
        afternoonLocation = "Champs-Élysées, 8th Arrondissement"
        dinnerVenue = "L'Astrance"
        dinnerCuisine = "Contemporary French"
        eveningActivity = "Opera at Palais Garnier"
        eveningLocation = "Palais Garnier, Place de l'Opéra"
      }
    } else if (destination.toLowerCase().includes("tokyo")) {
      if (dayNumber === 1) {
        morningActivity = "Visit Senso-ji Temple"
        morningLocation = "Senso-ji Temple, Asakusa"
        lunchVenue = "Sushi Dai"
        lunchCuisine = "Sushi"
        afternoonActivity = "Explore Tokyo Skytree"
        afternoonLocation = "Tokyo Skytree, Sumida"
        dinnerVenue = "Gonpachi Nishiazabu"
        dinnerCuisine = "Izakaya"
        eveningActivity = "Shibuya Crossing and Nightlife"
        eveningLocation = "Shibuya Crossing, Shibuya"
      } else if (dayNumber === 2) {
        morningActivity = "Visit Meiji Shrine"
        morningLocation = "Meiji Shrine, Shibuya"
        lunchVenue = "Ichiran Ramen"
        lunchCuisine = "Ramen"
        afternoonActivity = "Shop in Harajuku"
        afternoonLocation = "Takeshita Street, Harajuku"
        dinnerVenue = "Ukai-tei"
        dinnerCuisine = "Teppanyaki"
        eveningActivity = "Robot Restaurant Show"
        eveningLocation = "Robot Restaurant, Shinjuku"
      } else {
        morningActivity = "Visit Tokyo Imperial Palace"
        morningLocation = "Tokyo Imperial Palace, Chiyoda"
        lunchVenue = "Tsukiji Outer Market"
        lunchCuisine = "Seafood"
        afternoonActivity = "Explore Akihabara Electric Town"
        afternoonLocation = "Akihabara, Chiyoda"
        dinnerVenue = "Sukiyabashi Jiro"
        dinnerCuisine = "Sushi"
        eveningActivity = "Tokyo Tower Night View"
        eveningLocation = "Tokyo Tower, Minato"
      }
    } else {
      // Generic activities for other destinations
      if (tripStyle === "relaxing") {
        morningActivity = `Morning at ${destination} Beach`
        morningLocation = `${destination} Main Beach`
        lunchVenue = "Seaside Café"
        lunchCuisine = "Seafood"
        afternoonActivity = "Spa and Wellness Treatment"
        afternoonLocation = `${destination} Luxury Spa`
        dinnerVenue = "Sunset Restaurant"
        dinnerCuisine = "Local Cuisine"
        eveningActivity = "Beachfront Cocktails"
        eveningLocation = `${destination} Beach Bar`
      } else if (tripStyle === "adventure") {
        morningActivity = `Hiking in ${destination} National Park`
        morningLocation = `${destination} Trails`
        lunchVenue = "Mountain Lodge"
        lunchCuisine = "Hearty Local Food"
        afternoonActivity = "Water Sports Adventure"
        afternoonLocation = `${destination} Adventure Center`
        dinnerVenue = "Explorer's Tavern"
        dinnerCuisine = "Barbecue"
        eveningActivity = "Campfire Stories"
        eveningLocation = `${destination} Campground`
      } else if (tripStyle === "cultural") {
        morningActivity = `Visit ${destination} Museum`
        morningLocation = `${destination} National Museum`
        lunchVenue = "Historic Café"
        lunchCuisine = "Traditional"
        afternoonActivity = "Guided Cultural Tour"
        afternoonLocation = `${destination} Old Town`
        dinnerVenue = "Heritage Restaurant"
        dinnerCuisine = "Local Specialties"
        eveningActivity = "Traditional Performance"
        eveningLocation = `${destination} Cultural Center`
      } else {
        morningActivity = `Explore ${destination} Downtown`
        morningLocation = `${destination} City Center`
        lunchVenue = "Local Favorite Restaurant"
        lunchCuisine = "Mixed Cuisine"
        afternoonActivity = "Shopping and Sightseeing"
        afternoonLocation = `${destination} Main Square`
        dinnerVenue = "Highly Rated Restaurant"
        dinnerCuisine = "International"
        eveningActivity = "Night Tour"
        eveningLocation = `${destination} Nightlife District`
      }
    }

    mockDays.push({
      day: dayNumber,
      date: currentDate.toISOString().split("T")[0],
      morning: {
        activity: morningActivity,
        location: morningLocation,
        time: "9:00 AM - 12:00 PM",
        notes: `Enjoy a wonderful morning exploring ${morningLocation}. Don't forget to take photos!`,
      },
      lunch: {
        venue: lunchVenue,
        cuisine: lunchCuisine,
        priceRange: "$$",
        notes: `${lunchVenue} offers delicious ${lunchCuisine} cuisine. Try their signature dishes!`,
      },
      afternoon: {
        activity: afternoonActivity,
        location: afternoonLocation,
        time: "2:00 PM - 5:00 PM",
        notes: `${afternoonActivity} is a must-do activity in ${destination}. Allow at least 3 hours to fully enjoy it.`,
      },
      dinner: {
        venue: dinnerVenue,
        cuisine: dinnerCuisine,
        priceRange: "$$$",
        notes: `${dinnerVenue} is known for its excellent ${dinnerCuisine} dishes and great atmosphere.`,
      },
      evening: {
        activity: eveningActivity,
        location: eveningLocation,
        time: "8:00 PM - 10:00 PM",
        notes: `End your day with ${eveningActivity} for a memorable experience.`,
      },
    })
  }

  // Generate tips based on destination and trip style
  const tips = [
    `Always carry a map or use a navigation app when exploring ${destination}.`,
    "Try to learn a few basic phrases in the local language.",
    "Keep important documents in a safe place.",
    "Check the weather forecast daily and dress accordingly.",
    "Use public transportation to save money and experience local life.",
  ]

  // Add specific tips based on trip style
  if (tripStyle === "relaxing") {
    tips.push("Don't overplan your days - leave time for spontaneous relaxation.")
    tips.push("Consider booking spa treatments in advance as they can fill up quickly.")
  } else if (tripStyle === "adventure") {
    tips.push("Pack appropriate gear for outdoor activities.")
    tips.push("Check if you need permits for any adventure activities.")
    tips.push("Consider travel insurance that covers adventure sports.")
  } else if (tripStyle === "cultural") {
    tips.push("Research local customs and etiquette before your trip.")
    tips.push("Visit museums during weekdays to avoid crowds.")
    tips.push("Look for local cultural events happening during your stay.")
  }

  // Estimate cost based on trip style and duration
  let baseCost = 0
  if (tripStyle === "luxury") {
    baseCost = 500
  } else if (tripStyle === "budget") {
    baseCost = 100
  } else {
    baseCost = 250
  }
  const estimatedTotalCost = `$${baseCost * tripDuration} - $${baseCost * tripDuration * 1.5}`

  const mockItinerary = {
    destination,
    tripStyle,
    startDate,
    endDate,
    days: mockDays,
    tips,
    estimatedTotalCost,
  }

  // Generate a unique ID for this itinerary
  const itineraryId = nanoid()

  // Store the itinerary data
  itineraries.set(itineraryId, {
    ...mockItinerary,
    id: itineraryId,
    createdAt: new Date().toISOString(),
  })

  revalidatePath("/itinerary/[id]")
  return itineraryId
}

export async function getItinerary(id: string) {
  return itineraries.get(id) || null
}

export async function updateItineraryDay(id: string, dayIndex: number, dayData: any) {
  const itinerary = itineraries.get(id)

  if (!itinerary) {
    throw new Error("Itinerary not found")
  }

  itinerary.days[dayIndex] = {
    ...itinerary.days[dayIndex],
    ...dayData,
  }

  itineraries.set(id, itinerary)
  revalidatePath(`/itinerary/${id}`)

  return itinerary
}
