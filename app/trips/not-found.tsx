import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function TripNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <div className="bg-muted/50 p-6 rounded-full mb-6">
        <MapPin className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Trip Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        We couldn't find the trip you're looking for. It may have been deleted or the link might be incorrect.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/trips">View All Trips</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Plan a New Trip</Link>
        </Button>
      </div>
    </div>
  )
}
