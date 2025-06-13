"use client"
import { Button } from "@/components/ui/button"

interface HamburgerButtonProps {
  onClick: () => void
  isOpen?: boolean
}

export function HamburgerButton({ onClick, isOpen = false }: HamburgerButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="md:hidden relative z-50 transition-all duration-200"
    >
      <div className="relative w-5 h-5 flex flex-col justify-center items-center">
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
          }`}
        />
      </div>
      <span className="sr-only">{isOpen ? "Close" : "Open"} navigation menu</span>
    </Button>
  )
}
