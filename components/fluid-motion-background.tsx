"use client"

import { useEffect, useRef } from "react"

export default function FluidMotionBackground() {
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

    // Fluid motion system
    class FluidStream {
      x: number
      y: number
      vx: number
      vy: number
      points: { x: number; y: number; vx: number; vy: number }[]
      color: string
      width: number
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.points = []
        this.color = this.getRandomColor()
        this.width = Math.random() * 8 + 2
        this.opacity = Math.random() * 0.8 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 300 + 200

        // Create initial points
        for (let i = 0; i < 20; i++) {
          this.points.push({
            x: this.x + (Math.random() - 0.5) * 100,
            y: this.y + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
          })
        }
      }

      getRandomColor() {
        const colors = [
          "#00ffff", // Cyan
          "#ff00ff", // Magenta
          "#ffff00", // Yellow
          "#00ff00", // Green
          "#ff0080", // Pink
          "#8000ff", // Purple
          "#0080ff", // Blue
          "#ff8000", // Orange
          "#80ff00", // Lime
          "#ff0040", // Red-Pink
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update(time: number) {
        this.life++

        // Update main position
        this.x += this.vx + Math.sin(time * 0.01 + this.x * 0.01) * 0.5
        this.y += this.vy + Math.cos(time * 0.01 + this.y * 0.01) * 0.5

        // Boundary wrapping
        if (this.x < -100) this.x = canvas.width + 100
        if (this.x > canvas.width + 100) this.x = -100
        if (this.y < -100) this.y = canvas.height + 100
        if (this.y > canvas.height + 100) this.y = -100

        // Update points
        this.points.forEach((point, index) => {
          point.x += point.vx + Math.sin(time * 0.005 + index) * 0.3
          point.y += point.vy + Math.cos(time * 0.005 + index) * 0.3

          // Attract points to main position
          const dx = this.x - point.x
          const dy = this.y - point.y
          point.vx += dx * 0.001
          point.vy += dy * 0.001

          // Add some randomness
          point.vx += (Math.random() - 0.5) * 0.1
          point.vy += (Math.random() - 0.5) * 0.1

          // Damping
          point.vx *= 0.99
          point.vy *= 0.99
        })

        // Lifecycle
        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.color = this.getRandomColor()
        }

        // Breathing opacity
        this.opacity = 0.3 + 0.5 * Math.sin(this.life * 0.02)
      }

      draw() {
        if (this.points.length < 2) return

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.width
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.shadowColor = this.color
        ctx.shadowBlur = 20

        // Create smooth curve through points
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length - 2; i++) {
          const cp1x = (this.points[i].x + this.points[i + 1].x) / 2
          const cp1y = (this.points[i].y + this.points[i + 1].y) / 2
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, cp1x, cp1y)
        }

        ctx.stroke()

        // Add glow effect
        ctx.globalAlpha = this.opacity * 0.3
        ctx.lineWidth = this.width * 3
        ctx.shadowBlur = 40
        ctx.stroke()

        ctx.restore()
      }
    }

    // Flowing ribbons
    class FlowingRibbon {
      points: { x: number; y: number; vx: number; vy: number }[]
      color: string
      width: number
      opacity: number

      constructor() {
        this.points = []
        this.color = this.getRandomColor()
        this.width = Math.random() * 15 + 5
        this.opacity = Math.random() * 0.6 + 0.2

        // Create ribbon points
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        for (let i = 0; i < 30; i++) {
          this.points.push({
            x: startX + i * 20,
            y: startY + Math.sin(i * 0.3) * 50,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
          })
        }
      }

      getRandomColor() {
        const colors = [
          "#ff006e", // Hot Pink
          "#8338ec", // Purple
          "#3a86ff", // Blue
          "#06ffa5", // Mint
          "#ffbe0b", // Yellow
          "#fb5607", // Orange
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update(time: number) {
        this.points.forEach((point, index) => {
          point.x += point.vx + Math.sin(time * 0.003 + index * 0.1) * 0.5
          point.y += point.vy + Math.cos(time * 0.003 + index * 0.1) * 0.5

          // Boundary wrapping
          if (point.x < -50) point.x = canvas.width + 50
          if (point.x > canvas.width + 50) point.x = -50
          if (point.y < -50) point.y = canvas.height + 50
          if (point.y > canvas.height + 50) point.y = -50
        })
      }

      draw() {
        if (this.points.length < 2) return

        ctx.save()
        ctx.globalAlpha = this.opacity

        // Create gradient along the ribbon
        const gradient = ctx.createLinearGradient(
          this.points[0].x,
          this.points[0].y,
          this.points[this.points.length - 1].x,
          this.points[this.points.length - 1].y,
        )
        gradient.addColorStop(0, this.color + "00")
        gradient.addColorStop(0.5, this.color)
        gradient.addColorStop(1, this.color + "00")

        ctx.strokeStyle = gradient
        ctx.lineWidth = this.width
        ctx.lineCap = "round"
        ctx.shadowColor = this.color
        ctx.shadowBlur = 25

        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length - 2; i++) {
          const cp1x = (this.points[i].x + this.points[i + 1].x) / 2
          const cp1y = (this.points[i].y + this.points[i + 1].y) / 2
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, cp1x, cp1y)
        }

        ctx.stroke()
        ctx.restore()
      }
    }

    // Initialize systems
    const fluidStreams: FluidStream[] = []
    const flowingRibbons: FlowingRibbon[] = []

    for (let i = 0; i < 8; i++) {
      fluidStreams.push(new FluidStream())
    }

    for (let i = 0; i < 6; i++) {
      flowingRibbons.push(new FlowingRibbon())
    }

    let time = 0

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 1

      // Update and draw flowing ribbons
      flowingRibbons.forEach((ribbon) => {
        ribbon.update(time)
        ribbon.draw()
      })

      // Update and draw fluid streams
      fluidStreams.forEach((stream) => {
        stream.update(time)
        stream.draw()
      })

      // Add some sparkles
      if (Math.random() < 0.05) {
        ctx.save()
        ctx.globalAlpha = 0.8
        ctx.fillStyle = "#ffffff"
        ctx.shadowColor = "#ffffff"
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

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
      <canvas ref={canvasRef} className="w-full h-full bg-black" />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,119,198,0.1),transparent_50%)]" />
    </div>
  )
}
