import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

export default function ExplorePage() {
  const destinations = [
    {
      name: "Paris",
      country: "France",
      description: "The city of lights and romance",
      image: "/placeholder.svg?height=200&width=300&text=Paris",
    },
    {
      name: "Tokyo",
      country: "Japan",
      description: "A blend of traditional and ultramodern",
      image: "/placeholder.svg?height=200&width=300&text=Tokyo",
    },
    {
      name: "New York",
      country: "USA",
      description: "The city that never sleeps",
      image: "/placeholder.svg?height=200&width=300&text=New+York",
    },
    {
      name: "Rome",
      country: "Italy",
      description: "Eternal city with ancient history",
      image: "/placeholder.svg?height=200&width=300&text=Rome",
    },
    {
      name: "Bali",
      country: "Indonesia",
      description: "Island paradise with stunning beaches",
      image: "/placeholder.svg?height=200&width=300&text=Bali",
    },
    {
      name: "Barcelona",
      country: "Spain",
      description: "Vibrant city with unique architecture",
      image: "/placeholder.svg?height=200&width=300&text=Barcelona",
    },
  ]

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Explore Destinations</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Discover amazing destinations around the world and get inspired for your next adventure.
        </p>

        <div className="w-full max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search destinations..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-[16/9] bg-muted">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="object-cover w-full h-full"
                width={300}
                height={200}
              />
            </div>
            <CardHeader>
              <CardTitle>{destination.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {destination.country}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{destination.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Plan a Trip</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
