"use client"

import { useEffect, useRef } from "react"

export default function AestheticBackground() {
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

    // Soft floating bubbles
    class SoftBubble {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 40 + 20
        this.opacity = Math.random() * 0.1 + 0.05
        this.hue = Math.random() * 60 + 300 // Purple to pink range
        this.life = 0
        this.maxLife = Math.random() * 500 + 300
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life++

        // Soft bouncing
        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8

        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.hue = Math.random() * 60 + 300
        }

        // Soft breathing effect
        this.opacity = 0.05 + 0.05 * Math.sin(this.life * 0.01)
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity

        // Create soft gradient
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `hsl(${this.hue}, 70%, 80%)`)
        gradient.addColorStop(1, `hsl(${this.hue}, 70%, 90%)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Soft wave patterns
    class SoftWave {
      draw(time: number) {
        ctx.save()
        ctx.globalAlpha = 0.03

        for (let i = 0; i < 3; i++) {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
          gradient.addColorStop(0, `hsl(${320 + i * 20}, 60%, 85%)`)
          gradient.addColorStop(0.5, `hsl(${340 + i * 20}, 60%, 90%)`)
          gradient.addColorStop(1, `hsl(${320 + i * 20}, 60%, 85%)`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.beginPath()

          const amplitude = 50 + i * 20
          const frequency = 0.003 + i * 0.001
          const phase = time * 0.0005 + (i * Math.PI) / 4

          for (let x = 0; x <= canvas.width; x += 3) {
            const y = canvas.height / 2 + Math.sin(x * frequency + phase) * amplitude + i * 60
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
        ctx.restore()
      }
    }

    // Soft geometric shapes
    class SoftShape {
      x: number
      y: number
      rotation: number
      rotationSpeed: number
      size: number
      opacity: number
      vx: number
      vy: number
      hue: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.rotation = 0
        this.rotationSpeed = (Math.random() - 0.5) * 0.002
        this.size = Math.random() * 60 + 30
        this.opacity = Math.random() * 0.08 + 0.02
        this.vx = (Math.random() - 0.5) * 0.1
        this.vy = (Math.random() - 0.5) * 0.1
        this.hue = Math.random() * 80 + 280 // Purple to blue range
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.rotation += this.rotationSpeed

        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.globalAlpha = this.opacity

        // Soft gradient fill
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size)
        gradient.addColorStop(0, `hsl(${this.hue}, 50%, 85%)`)
        gradient.addColorStop(1, `hsl(${this.hue}, 50%, 95%)`)

        ctx.fillStyle = gradient

        // Draw soft rounded rectangle
        const radius = this.size * 0.3
        ctx.beginPath()
        ctx.roundRect(-this.size / 2, -this.size / 2, this.size, this.size, radius)
        ctx.fill()

        ctx.restore()
      }
    }

    // Initialize elements
    const bubbles: SoftBubble[] = []
    const shapes: SoftShape[] = []
    const wave = new SoftWave()

    for (let i = 0; i < 15; i++) {
      bubbles.push(new SoftBubble())
    }

    for (let i = 0; i < 8; i++) {
      shapes.push(new SoftShape())
    }

    let time = 0

    const animate = () => {
      // Very subtle clear
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 1

      // Draw soft waves
      wave.draw(time)

      // Update and draw bubbles
      bubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw()
      })

      // Update and draw shapes
      shapes.forEach((shape) => {
        shape.update()
        shape.draw()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

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
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "linear-gradient(135deg, #fef7ff 0%, #f3e8ff 25%, #e0e7ff 50%, #f0f9ff 75%, #fefce8 100%)",
        }}
      />
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-blue-50/30" />
    </div>
  )
}
