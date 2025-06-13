import { Globe, Clock, Sparkles, Map, Compass, Wallet } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Worldwide Destinations",
      description: "Plan trips to any destination around the world with local insights and recommendations.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Save Time",
      description: "Create complete itineraries in seconds instead of spending hours on research.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Personalized Experience",
      description: "Get recommendations tailored to your interests, budget, and travel style.",
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Interactive Maps",
      description: "Visualize your daily activities with interactive maps showing all locations.",
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Local Expertise",
      description: "Discover hidden gems and authentic experiences recommended by locals.",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Budget Estimates",
      description: "Get cost estimates for your entire trip to help with financial planning.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">Features</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything You Need for Perfect Trips</h2>
          <p className="text-muted-foreground md:text-lg max-w-[800px]">
            TripPlanner combines AI technology with travel expertise to create the most comprehensive and personalized
            travel planning experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
