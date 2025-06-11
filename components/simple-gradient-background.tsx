"use client"

import { useEffect, useRef } from "react"

export default function SimpleGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Basit floating circles
    class SimpleCircle {
      x: number
      y: number
      radius: number
      color: string
      speed: number
      angle: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 100 + 50
        this.color = this.getColor()
        this.speed = 0.002
        this.angle = Math.random() * Math.PI * 2
      }

      getColor() {
        const colors = ["#3b82f6", "#8b5cf6", "#ec4899"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.angle += this.speed
        this.x += Math.cos(this.angle) * 0.5
        this.y += Math.sin(this.angle) * 0.5
      }

      draw() {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color + "20") // Çok transparan
        gradient.addColorStop(1, this.color + "01") // Neredeyse görünmez
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Sadece birkaç daire oluştur
    const circles: SimpleCircle[] = []
    for (let i = 0; i < 5; i++) {
      circles.push(new SimpleCircle())
    }

    // Basit animasyon
    const animate = () => {
      // Temizleme yapmıyoruz, sadece üzerine çiziyoruz
      ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      circles.forEach((circle) => {
        circle.update()
        circle.draw()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Başlangıçta siyah arka plan
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Basit gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
    </div>
  )
}
