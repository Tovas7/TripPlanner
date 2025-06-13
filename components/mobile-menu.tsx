"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  navigation: Array<{ name: string; href: string }>
  isHome: boolean
  onPlanNewTrip: () => void
}

export function MobileMenu({ navigation, isHome, onPlanNewTrip }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="md:hidden relative z-50">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] z-50">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TripPlanner</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary px-2 py-1 rounded-md",
                  pathname === item.href
                    ? "text-foreground font-semibold bg-muted"
                    : pathname.startsWith(item.href) && item.href !== "/"
                      ? "text-foreground font-semibold bg-muted"
                      : "text-muted-foreground hover:bg-muted/50",
                )}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Plan New Trip button in mobile menu */}
          <Button
            onClick={() => {
              onPlanNewTrip()
              setOpen(false)
            }}
            className="w-full"
            size="lg"
          >
            {isHome ? "Plan Your Trip" : "Plan New Trip"}
          </Button>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
