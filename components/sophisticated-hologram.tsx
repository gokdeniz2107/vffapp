"use client"

import { useEffect, useRef } from "react"

export default function SophisticatedHologram() {
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

    // Sophisticated particle system
    class ElegantParticle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      opacity: number
      life: number
      maxLife: number
      hue: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.z = Math.random() * 500 + 500
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.vz = (Math.random() - 0.5) * 2
        this.size = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.3 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
        this.hue = Math.random() * 60 + 180 // Blue to cyan range
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.z += this.vz
        this.life++

        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8
        if (this.z < 100 || this.z > 1000) this.vz *= -0.8

        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.hue = Math.random() * 60 + 180
        }

        this.opacity = 0.1 + 0.2 * Math.sin(this.life * 0.02)
      }

      draw() {
        const scale = 500 / (500 + this.z - 500)
        const x = this.x + (this.x - canvas.width / 2) * (1 - scale)
        const y = this.y + (this.y - canvas.height / 2) * (1 - scale)
        const size = this.size * scale

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`
        ctx.shadowColor = `hsl(${this.hue}, 70%, 60%)`
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Elegant grid system
    class GridSystem {
      draw(time: number) {
        ctx.save()
        ctx.globalAlpha = 0.08
        ctx.strokeStyle = "hsl(200, 80%, 60%)"
        ctx.lineWidth = 0.5

        const gridSize = 80
        const offset = time * 10

        // Vertical lines
        for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x + Math.sin(time * 0.001 + x * 0.01) * 5, 0)
          ctx.lineTo(x + Math.sin(time * 0.001 + x * 0.01) * 5, canvas.height)
          ctx.stroke()
        }

        // Horizontal lines
        for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y + Math.cos(time * 0.001 + y * 0.01) * 5)
          ctx.lineTo(canvas.width, y + Math.cos(time * 0.001 + y * 0.01) * 5)
          ctx.stroke()
        }
        ctx.restore()
      }
    }

    // Sophisticated geometric shapes
    class GeometricShape {
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
        this.rotationSpeed = (Math.random() - 0.5) * 0.005
        this.size = Math.random() * 30 + 15
        this.opacity = Math.random() * 0.15 + 0.05
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.2
        this.hue = Math.random() * 40 + 180
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
        ctx.strokeStyle = `hsl(${this.hue}, 60%, 70%)`
        ctx.shadowColor = `hsl(${this.hue}, 60%, 70%)`
        ctx.shadowBlur = 10
        ctx.lineWidth = 1

        // Draw sophisticated hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x = Math.cos(angle) * this.size
          const y = Math.sin(angle) * this.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()

        // Inner lines
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x1 = Math.cos(angle) * this.size * 0.3
          const y1 = Math.sin(angle) * this.size * 0.3
          const x2 = Math.cos(angle) * this.size
          const y2 = Math.sin(angle) * this.size
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
        }
        ctx.stroke()
        ctx.restore()
      }
    }

    // Elegant wave system
    class WaveSystem {
      draw(time: number) {
        ctx.save()
        ctx.globalAlpha = 0.1
        ctx.strokeStyle = "hsl(190, 80%, 60%)"
        ctx.lineWidth = 1

        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          const amplitude = 30 + i * 10
          const frequency = 0.005 + i * 0.002
          const phase = time * 0.001 + (i * Math.PI) / 3

          for (let x = 0; x <= canvas.width; x += 2) {
            const y = canvas.height / 2 + Math.sin(x * frequency + phase) * amplitude + i * 40
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
        ctx.restore()
      }
    }

    // Initialize systems
    const particles: ElegantParticle[] = []
    const shapes: GeometricShape[] = []
    const gridSystem = new GridSystem()
    const waveSystem = new WaveSystem()

    for (let i = 0; i < 80; i++) {
      particles.push(new ElegantParticle())
    }

    for (let i = 0; i < 6; i++) {
      shapes.push(new GeometricShape())
    }

    let time = 0

    const animate = () => {
      // Subtle background clear
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 1

      // Draw grid system
      gridSystem.draw(time)

      // Draw wave system
      waveSystem.draw(time)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Update and draw shapes
      shapes.forEach((shape) => {
        shape.update()
        shape.draw()
      })

      // Central hologram effect
      ctx.save()
      ctx.globalAlpha = 0.15 + 0.05 * Math.sin(time * 0.003)
      ctx.strokeStyle = "hsl(200, 80%, 70%)"
      ctx.shadowColor = "hsl(200, 80%, 70%)"
      ctx.shadowBlur = 20
      ctx.lineWidth = 1

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 80 + 20 * Math.sin(time * 0.002)

      // Outer ring
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Inner rings
      for (let i = 1; i <= 2; i++) {
        ctx.globalAlpha = (0.15 + 0.05 * Math.sin(time * 0.003)) * (1 - i * 0.3)
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * (0.6 - i * 0.2), 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.restore()

      // Subtle scan lines
      if (Math.random() < 0.01) {
        ctx.save()
        ctx.globalAlpha = 0.05
        ctx.fillStyle = "hsl(200, 80%, 70%)"
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 1)
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
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(5,15,25,0.95) 0%, rgba(0,0,0,0.98) 100%)",
        }}
      />
      {/* Sophisticated overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />
    </div>
  )
}
