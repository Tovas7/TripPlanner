import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Download, Edit, MapPin, Pencil, Share2, Star, Trash2, Users, Plus } from "lucide-react"
import { TripDetailMap } from "@/components/trip-detail-map"
import { TripTimeline } from "@/components/trip-timeline"
import { TripNotes } from "@/components/trip-notes"
import { TripExpenses } from "@/components/trip-expenses"

// Mock function to get trip data
function getTripById(id: string) {
  const trips = {
    "paris-2023": {
      id: "paris-2023",
      title: "Paris Adventure",
      destination: "Paris, France",
      startDate: "2023-06-15",
      endDate: "2023-06-22",
      dateRange: "June 15 - June 22, 2023",
      description:
        "A week-long cultural exploration of Paris, visiting iconic landmarks, museums, and enjoying the local cuisine.",
      image: "/placeholder.svg?height=400&width=800&text=Paris",
      tripStyle: "cultural",
      travelers: 2,
      status: "completed",
      rating: 5,
      totalExpenses: "$2,450",
      createdAt: "2023-05-01",
      updatedAt: "2023-06-25",
      highlights: [
        "Visited the Eiffel Tower at sunset",
        "Explored the Louvre Museum",
        "Enjoyed a Seine River cruise",
        "Discovered Montmartre's artistic charm",
      ],
      days: [
        {
          day: 1,
          date: "2023-06-15",
          title: "Arrival & Eiffel Tower",
          description: "Arrive in Paris, check in to hotel, and visit the Eiffel Tower in the evening.",
          activities: [
            {
              time: "10:00 AM",
              title: "Arrival at Charles de Gaulle Airport",
              location: "Charles de Gaulle Airport",
              type: "travel",
            },
            {
              time: "12:30 PM",
              title: "Check-in at Hotel",
              location: "Le Marais District",
              type: "accommodation",
            },
            {
              time: "3:00 PM",
              title: "Explore Le Marais",
              location: "Le Marais District",
              type: "sightseeing",
            },
            {
              time: "7:00 PM",
              title: "Eiffel Tower Visit",
              location: "Eiffel Tower",
              type: "attraction",
            },
            {
              time: "9:00 PM",
              title: "Dinner at Bistro Parisien",
              location: "Near Eiffel Tower",
              type: "food",
            },
          ],
        },
        {
          day: 2,
          date: "2023-06-16",
          title: "Louvre & Notre Dame",
          description: "Explore the world-famous Louvre Museum and visit Notre Dame Cathedral.",
          activities: [
            {
              time: "9:00 AM",
              title: "Breakfast at Local Café",
              location: "Le Marais",
              type: "food",
            },
            {
              time: "10:30 AM",
              title: "Louvre Museum",
              location: "Rue de Rivoli",
              type: "attraction",
            },
            {
              time: "2:00 PM",
              title: "Lunch at Café Marly",
              location: "Louvre Museum",
              type: "food",
            },
            {
              time: "4:00 PM",
              title: "Notre Dame Cathedral",
              location: "Île de la Cité",
              type: "attraction",
            },
            {
              time: "7:30 PM",
              title: "Seine River Cruise",
              location: "Seine River",
              type: "activity",
            },
          ],
        },
        {
          day: 3,
          date: "2023-06-17",
          title: "Montmartre & Sacré-Cœur",
          description: "Discover the artistic neighborhood of Montmartre and visit Sacré-Cœur Basilica.",
          activities: [
            {
              time: "9:30 AM",
              title: "Breakfast at Hotel",
              location: "Le Marais",
              type: "food",
            },
            {
              time: "11:00 AM",
              title: "Montmartre Walking Tour",
              location: "Montmartre",
              type: "activity",
            },
            {
              time: "1:30 PM",
              title: "Lunch at La Maison Rose",
              location: "Montmartre",
              type: "food",
            },
            {
              time: "3:00 PM",
              title: "Sacré-Cœur Basilica",
              location: "Montmartre",
              type: "attraction",
            },
            {
              time: "6:00 PM",
              title: "Place du Tertre",
              location: "Montmartre",
              type: "activity",
            },
          ],
        },
      ],
      notes: [
        {
          id: "note-1",
          title: "Restaurant Recommendations",
          content: "Try Le Comptoir for authentic French cuisine. Make reservations at least 2 weeks in advance.",
          createdAt: "2023-05-15",
        },
        {
          id: "note-2",
          title: "Museum Passes",
          content:
            "Get the Paris Museum Pass to save money and skip lines. Available for 2, 4, or 6 days. Covers most major attractions.",
          createdAt: "2023-05-20",
        },
        {
          id: "note-3",
          title: "Transportation Tips",
          content:
            "Buy a carnet of 10 metro tickets to save money. Consider getting a Navigo Découverte pass for unlimited travel.",
          createdAt: "2023-06-01",
        },
      ],
      expenses: [
        { category: "Accommodation", amount: 950, currency: "USD" },
        { category: "Transportation", amount: 350, currency: "USD" },
        { category: "Food & Dining", amount: 650, currency: "USD" },
        { category: "Activities & Tours", amount: 320, currency: "USD" },
        { category: "Shopping", amount: 180, currency: "USD" },
      ],
    },
    "tokyo-2023": {
      id: "tokyo-2023",
      title: "Tokyo Discovery",
      destination: "Tokyo, Japan",
      startDate: "2023-08-10",
      endDate: "2023-08-18",
      dateRange: "August 10 - August 18, 2023",
      description: "Exploring the blend of traditional and ultramodern in Japan's capital.",
      image: "/placeholder.svg?height=400&width=800&text=Tokyo",
      tripStyle: "adventure",
      travelers: 1,
      status: "completed",
      rating: 5,
      totalExpenses: "$3,200",
      createdAt: "2023-07-01",
      updatedAt: "2023-08-20",
      highlights: [
        "Experienced the bustling Shibuya Crossing",
        "Visited the historic Senso-ji Temple",
        "Explored the Tsukiji Outer Market",
        "Enjoyed the view from Tokyo Skytree",
      ],
      days: [
        {
          day: 1,
          date: "2023-08-10",
          title: "Arrival & Shibuya",
          description: "Arrive in Tokyo, check in to hotel, and explore Shibuya area.",
          activities: [
            {
              time: "11:00 AM",
              title: "Arrival at Narita Airport",
              location: "Narita International Airport",
              type: "travel",
            },
            {
              time: "2:00 PM",
              title: "Check-in at Hotel",
              location: "Shibuya",
              type: "accommodation",
            },
            {
              time: "4:00 PM",
              title: "Shibuya Crossing",
              location: "Shibuya",
              type: "sightseeing",
            },
            {
              time: "7:00 PM",
              title: "Dinner at Ichiran Ramen",
              location: "Shibuya",
              type: "food",
            },
          ],
        },
      ],
      notes: [
        {
          id: "note-1",
          title: "Transportation Tips",
          content: "Get a Suica card for easy travel on trains and buses. Can also be used at convenience stores.",
          createdAt: "2023-07-15",
        },
      ],
      expenses: [
        { category: "Accommodation", amount: 1200, currency: "USD" },
        { category: "Transportation", amount: 400, currency: "USD" },
        { category: "Food & Dining", amount: 800, currency: "USD" },
        { category: "Activities & Tours", amount: 500, currency: "USD" },
        { category: "Shopping", amount: 300, currency: "USD" },
      ],
    },
    "bali-2023": {
      id: "bali-2023",
      title: "Bali Retreat",
      destination: "Bali, Indonesia",
      startDate: "2023-10-05",
      endDate: "2023-10-15",
      dateRange: "October 5 - October 15, 2023",
      description: "10 days of relaxation and spiritual discovery in paradise.",
      image: "/placeholder.svg?height=400&width=800&text=Bali",
      tripStyle: "relaxing",
      travelers: 2,
      status: "upcoming",
      rating: null,
      totalExpenses: "$2,800 (estimated)",
      createdAt: "2023-08-15",
      updatedAt: "2023-09-20",
      highlights: [
        "Planned visit to Ubud Sacred Monkey Forest",
        "Scheduled traditional Balinese massage",
        "Reserved spot for sunrise trek to Mount Batur",
        "Booked beachfront villa in Seminyak",
      ],
      days: [
        {
          day: 1,
          date: "2023-10-05",
          title: "Arrival & Seminyak",
          description: "Arrive in Bali, check in to villa, and relax at Seminyak Beach.",
          activities: [
            {
              time: "2:00 PM",
              title: "Arrival at Ngurah Rai Airport",
              location: "Denpasar",
              type: "travel",
            },
            {
              time: "4:00 PM",
              title: "Check-in at Villa",
              location: "Seminyak",
              type: "accommodation",
            },
            {
              time: "6:00 PM",
              title: "Sunset at Seminyak Beach",
              location: "Seminyak",
              type: "activity",
            },
            {
              time: "8:00 PM",
              title: "Dinner at Ku De Ta",
              location: "Seminyak",
              type: "food",
            },
          ],
        },
      ],
      notes: [
        {
          id: "note-1",
          title: "Packing List",
          content:
            "Don't forget: sunscreen, insect repellent, light clothing, swimwear, comfortable walking shoes, and adapter plugs.",
          createdAt: "2023-09-01",
        },
      ],
      expenses: [
        { category: "Accommodation", amount: 1400, currency: "USD" },
        { category: "Transportation", amount: 500, currency: "USD" },
        { category: "Food & Dining", amount: 400, currency: "USD" },
        { category: "Activities & Tours", amount: 300, currency: "USD" },
        { category: "Shopping", amount: 200, currency: "USD" },
      ],
    },
  }

  return trips[id] || null
}

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const trip = getTripById(params.id)

  if (!trip) {
    notFound()
  }

  const statusColors = {
    upcoming: "bg-blue-500",
    active: "bg-green-500",
    completed: "bg-purple-500",
    cancelled: "bg-red-500",
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/trips">
          <Button variant="ghost" size="sm" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Trips
          </Button>
        </Link>
      </div>

      {/* Trip Header */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <div className="aspect-[21/9] md:aspect-[3/1] bg-muted">
          <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="object-cover w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className="capitalize bg-primary hover:bg-primary">{trip.tripStyle}</Badge>
            <Badge
              className={`capitalize ${
                statusColors[trip.status as keyof typeof statusColors] || "bg-muted-foreground"
              }`}
            >
              {trip.status}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{trip.title}</h1>
          <div className="flex flex-wrap gap-4 text-white/90">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {trip.destination}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {trip.dateRange}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {trip.travelers} {trip.travelers === 1 ? "Traveler" : "Travelers"}
            </div>
            {trip.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                {trip.rating}/5
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trip Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button asChild>
          <Link href={`/trips/${trip.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Trip
          </Link>
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" asChild>
          <Link href="/#plan-trip">
            <Plus className="mr-2 h-4 w-4" />
            Plan Another Trip
          </Link>
        </Button>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      {/* Trip Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Trip Overview</CardTitle>
            <CardDescription>
              Details about your {trip.tripStyle} trip to {trip.destination}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{trip.description}</p>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Trip Highlights</h3>
              <ul className="space-y-1">
                {trip.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-medium">{new Date(trip.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="font-medium">{new Date(trip.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-medium">{trip.days.length} days</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Total Cost</p>
                <p className="font-medium">{trip.totalExpenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trip Map</CardTitle>
            <CardDescription>Key locations for your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-md overflow-hidden">
              <TripDetailMap destination={trip.destination} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trip Details Tabs */}
      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="mt-6 space-y-8">
          {trip.days.map((day) => (
            <Card key={day.day} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Day {day.day}: {day.title}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">{day.description}</p>

                <div className="space-y-6">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-20 text-sm text-muted-foreground">{activity.time}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {activity.location}
                        </p>
                      </div>
                      <div>
                        <Badge variant="outline" className="capitalize">
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Itinerary
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <TripNotes notes={trip.notes} tripId={trip.id} />
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <TripExpenses expenses={trip.expenses} totalExpenses={trip.totalExpenses} />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <TripTimeline days={trip.days} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
