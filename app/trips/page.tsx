import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function TripsPage() {
  // Mock trip data
  const trips = [
    {
      id: "paris-2023",
      title: "Paris Adventure",
      destination: "Paris, France",
      dateRange: "June 15 - June 22, 2023",
      description: "7 days of cultural exploration in the city of lights.",
      image: "/placeholder.svg?height=225&width=400&text=Paris",
      tripStyle: "cultural",
    },
    {
      id: "tokyo-2023",
      title: "Tokyo Discovery",
      destination: "Tokyo, Japan",
      dateRange: "August 10 - August 18, 2023",
      description: "Exploring the blend of traditional and ultramodern in Japan's capital.",
      image: "/placeholder.svg?height=225&width=400&text=Tokyo",
      tripStyle: "adventure",
    },
    {
      id: "bali-2023",
      title: "Bali Retreat",
      destination: "Bali, Indonesia",
      dateRange: "October 5 - October 15, 2023",
      description: "10 days of relaxation and spiritual discovery in paradise.",
      image: "/placeholder.svg?height=225&width=400&text=Bali",
      tripStyle: "relaxing",
    },
  ]

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">My Trips</h1>
        <p className="text-muted-foreground max-w-2xl">
          View and manage all your saved trips and itineraries in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Empty state when no trips */}
        {trips.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted/50 p-4 rounded-full mb-4">
              <Plane className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">No trips yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't created any trips yet. Start planning your next adventure!
            </p>
            <Button asChild>
              <Link href="/">Plan a New Trip</Link>
            </Button>
          </div>
        ) : (
          // Trip cards
          trips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden">
              <div className="aspect-[16/9] bg-muted relative group">
                <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button asChild variant="secondary">
                    <Link href={`/trips/${trip.id}`}>View Trip</Link>
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>
                  <Link href={`/trips/${trip.id}`} className="hover:text-primary transition-colors">
                    {trip.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {trip.destination}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  {trip.dateRange}
                </div>
                <p className="text-sm text-muted-foreground">{trip.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/trips/${trip.id}`}>View</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/trips/${trip.id}/edit`}>Edit</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <div className="mt-12 text-center">
        <Button asChild>
          <Link href="/">Plan a New Trip</Link>
        </Button>
      </div>
    </div>
  )
}
