"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

interface TripDetailMapProps {
  destination: string
}

export function TripDetailMap({ destination }: TripDetailMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(1, "#e2e8f0")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#cbd5e1"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * canvas.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * canvas.width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw a simple map representation
    // This is just a placeholder - in a real app, you'd use a proper map library
    ctx.fillStyle = "#bfdbfe" // Light blue for water
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100)

    // Draw some land masses
    ctx.fillStyle = "#d9f99d" // Light green for land
    ctx.beginPath()
    ctx.ellipse(canvas.width / 2, canvas.height / 2, 100, 70, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(canvas.width / 4, canvas.height / 3, 60, 40, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse((canvas.width / 4) * 3, (canvas.height / 3) * 2, 80, 50, 0, 0, Math.PI * 2)
    ctx.fill()

    // Draw destination marker
    ctx.fillStyle = "#ef4444" // Red for marker
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw destination name
    ctx.fillStyle = "#000000"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(destination, canvas.width / 2, canvas.height / 2 + 25)

    // Draw compass
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(canvas.width - 30, 30, 15, 0, Math.PI * 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(canvas.width - 30, 15)
    ctx.lineTo(canvas.width - 30, 45)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(canvas.width - 45, 30)
    ctx.lineTo(canvas.width - 15, 30)
    ctx.stroke()

    ctx.fillStyle = "#000000"
    ctx.font = "bold 10px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("N", canvas.width - 30, 13)
  }, [destination])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
      <div className="absolute bottom-2 left-2 bg-white/80 p-2 rounded text-xs">
        Interactive map placeholder for {destination}
      </div>
      <div className="absolute top-2 right-2 bg-white/80 p-2 rounded flex items-center text-xs">
        <MapPin className="h-3 w-3 mr-1" />
        {destination}
      </div>
    </div>
  )
}
