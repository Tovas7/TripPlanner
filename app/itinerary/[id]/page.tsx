import { notFound } from "next/navigation"
import { getItinerary } from "@/app/actions"
import { ItineraryView } from "@/components/itinerary-view"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Download, Share2, Printer } from "lucide-react"

export default async function ItineraryPage({ params }: { params: { id: string } }) {
  const itinerary = await getItinerary(params.id)

  if (!itinerary) {
    notFound()
  }

  return (
    <div className="bg-muted/30 min-h-screen pb-12">
      <div className="bg-background border-b">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="pl-0 mb-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Planning
                </Button>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">
                Your {itinerary.tripStyle} Trip to {itinerary.destination}
              </h1>
              <p className="text-muted-foreground mt-1">
                {itinerary.startDate} to {itinerary.endDate} · {itinerary.days.length} days
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button size="sm">Save Itinerary</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <ItineraryView itinerary={itinerary} />
      </div>
    </div>
  )
}
