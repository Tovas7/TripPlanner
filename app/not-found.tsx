import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Oops! Itinerary Not Found</h1>
      <p className="text-muted-foreground mb-8">
        We couldn't find the itinerary you're looking for. It may have expired or been removed.
      </p>
      <Link href="/">
        <Button>Create a New Itinerary</Button>
      </Link>
    </div>
  )
}
