import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function HelpPage() {
  const faqs = [
    {
      question: "How does TripPlanner work?",
      answer:
        "TripPlanner uses AI to generate personalized travel itineraries based on your preferences. Simply enter your destination, travel dates, and preferences, and our AI will create a detailed day-by-day itinerary for your trip.",
    },
    {
      question: "Can I edit my itinerary after it's generated?",
      answer:
        "Yes! You can customize any part of your itinerary. Add or remove activities, change restaurants, or adjust timings to make the itinerary perfect for you.",
    },
    {
      question: "Is TripPlanner free to use?",
      answer:
        "TripPlanner offers both free and premium plans. The free plan allows you to create basic itineraries, while the premium plan offers additional features like offline access, PDF exports, and more detailed recommendations.",
    },
    {
      question: "Can I share my itinerary with others?",
      answer:
        "You can share your itinerary via email, link, or social media. This is perfect for group trips where everyone needs access to the plan.",
    },
    {
      question: "How accurate are the time estimates for activities?",
      answer:
        "Our time estimates are based on average visit durations and travel times. However, actual times may vary based on factors like crowds, season, and personal pace. We recommend using them as guidelines.",
    },
  ]

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Help Center</h1>
        <p className="text-muted-foreground max-w-2xl">
          Find answers to common questions and learn how to make the most of TripPlanner.
        </p>
      </div>

      <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to the most common questions about TripPlanner.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Learn how to use TripPlanner effectively with our guides.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Getting Started with TripPlanner</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn the basics of creating your first itinerary with TripPlanner.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Customizing Your Itinerary</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover how to personalize and edit your generated itineraries.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Using the Interactive Map</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Make the most of the map feature to visualize your daily activities.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Have a question or issue? Our support team is here to help.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's your question about?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Please describe your issue or question" rows={5} />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
