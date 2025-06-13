import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Travel Enthusiast",
      content:
        "TripPlanner saved me hours of research for my trip to Japan. The AI created an itinerary that perfectly matched my interests and even suggested local spots I wouldn't have found otherwise.",
      avatar: "AJ",
    },
    {
      name: "Sarah Williams",
      role: "Digital Nomad",
      content:
        "As someone who travels frequently, TripPlanner has become my go-to tool. The day-by-day schedules are perfectly balanced, and the cost estimates help me budget effectively.",
      avatar: "SW",
    },
    {
      name: "Michael Chen",
      role: "Family Traveler",
      content:
        "Planning a family trip used to be stressful until I found TripPlanner. The AI understood our needs and created a kid-friendly itinerary with plenty of activities everyone enjoyed.",
      avatar: "MC",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Loved by Travelers Worldwide</h2>
          <p className="text-muted-foreground md:text-lg max-w-[800px]">
            Discover why thousands of travelers rely on TripPlanner to create memorable experiences around the globe.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
