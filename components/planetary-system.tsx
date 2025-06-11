"use client"

import { useEffect, useRef } from "react"

export default function PlanetarySystem() {
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

    // Planet class
    class Planet {
      x: number
      y: number
      centerX: number
      centerY: number
      radius: number
      orbitRadius: number
      angle: number
      speed: number
      size: number
      color: string
      glowColor: string
      moons: Moon[]

      constructor(
        centerX: number,
        centerY: number,
        orbitRadius: number,
        size: number,
        speed: number,
        color: string,
        glowColor: string,
      ) {
        this.centerX = centerX
        this.centerY = centerY
        this.orbitRadius = orbitRadius
        this.angle = Math.random() * Math.PI * 2
        this.speed = speed
        this.size = size
        this.color = color
        this.glowColor = glowColor
        this.x = centerX + Math.cos(this.angle) * orbitRadius
        this.y = centerY + Math.sin(this.angle) * orbitRadius
        this.moons = []

        // Add moons to some planets
        if (Math.random() > 0.6) {
          const moonCount = Math.floor(Math.random() * 2) + 1
          for (let i = 0; i < moonCount; i++) {
            this.moons.push(new Moon(this, 20 + i * 15, 2 + Math.random() * 2))
          }
        }
      }

      update() {
        this.angle += this.speed
        this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius
        this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius

        this.moons.forEach((moon) => moon.update())
      }

      draw() {
        // Draw orbit path
        ctx.save()
        ctx.globalAlpha = 0.1
        ctx.strokeStyle = this.glowColor
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(this.centerX, this.centerY, this.orbitRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()

        // Draw planet glow
        ctx.save()
        ctx.globalAlpha = 0.3
        const glowGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
        glowGradient.addColorStop(0, this.glowColor)
        glowGradient.addColorStop(1, "transparent")
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw planet
        ctx.save()
        const planetGradient = ctx.createRadialGradient(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          0,
          this.x,
          this.y,
          this.size,
        )
        planetGradient.addColorStop(0, this.color)
        planetGradient.addColorStop(1, this.color.replace("0.8", "0.4"))

        ctx.fillStyle = planetGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw moons
        this.moons.forEach((moon) => moon.draw())
      }
    }

    // Moon class
    class Moon {
      planet: Planet
      orbitRadius: number
      angle: number
      speed: number
      size: number
      x: number
      y: number

      constructor(planet: Planet, orbitRadius: number, speed: number) {
        this.planet = planet
        this.orbitRadius = orbitRadius
        this.angle = Math.random() * Math.PI * 2
        this.speed = speed
        this.size = 2
        this.x = 0
        this.y = 0
      }

      update() {
        this.angle += this.speed
        this.x = this.planet.x + Math.cos(this.angle) * this.orbitRadius
        this.y = this.planet.y + Math.sin(this.angle) * this.orbitRadius
      }

      draw() {
        ctx.save()
        ctx.fillStyle = "rgba(200, 200, 220, 0.8)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Star class
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      life: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
        this.life = 0
      }

      update() {
        this.life += this.twinkleSpeed
        this.opacity = 0.3 + 0.5 * Math.sin(this.life)
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Star sparkle effect
        if (this.opacity > 0.7) {
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(this.x - this.size * 2, this.y)
          ctx.lineTo(this.x + this.size * 2, this.y)
          ctx.moveTo(this.x, this.y - this.size * 2)
          ctx.lineTo(this.x, this.y + this.size * 2)
          ctx.stroke()
        }
        ctx.restore()
      }
    }

    // Asteroid class
    class Asteroid {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      rotationSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 3 + 1
        this.rotation = 0
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.rotation += this.rotationSpeed

        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.fillStyle = "rgba(150, 150, 150, 0.6)"
        ctx.beginPath()

        // Draw irregular asteroid shape
        const points = 6
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2
          const radius = this.size * (0.8 + Math.random() * 0.4)
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize solar system
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Create sun
    const sun = {
      x: centerX,
      y: centerY,
      size: 25,
      draw() {
        // Sun glow
        ctx.save()
        ctx.globalAlpha = 0.4
        const sunGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        sunGlow.addColorStop(0, "rgba(255, 200, 50, 0.8)")
        sunGlow.addColorStop(1, "transparent")
        ctx.fillStyle = sunGlow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Sun core
        ctx.save()
        const sunGradient = ctx.createRadialGradient(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          0,
          this.x,
          this.y,
          this.size,
        )
        sunGradient.addColorStop(0, "rgba(255, 255, 150, 1)")
        sunGradient.addColorStop(0.7, "rgba(255, 150, 50, 1)")
        sunGradient.addColorStop(1, "rgba(255, 100, 0, 1)")

        ctx.fillStyle = sunGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      },
    }

    // Create planets
    const planets: Planet[] = [
      new Planet(centerX, centerY, 80, 4, 0.02, "rgba(150, 150, 150, 0.8)", "rgba(150, 150, 150, 0.3)"), // Mercury
      new Planet(centerX, centerY, 120, 6, 0.015, "rgba(255, 200, 100, 0.8)", "rgba(255, 200, 100, 0.3)"), // Venus
      new Planet(centerX, centerY, 160, 7, 0.01, "rgba(100, 150, 255, 0.8)", "rgba(100, 150, 255, 0.3)"), // Earth
      new Planet(centerX, centerY, 200, 5, 0.008, "rgba(255, 100, 100, 0.8)", "rgba(255, 100, 100, 0.3)"), // Mars
      new Planet(centerX, centerY, 280, 15, 0.005, "rgba(200, 150, 100, 0.8)", "rgba(200, 150, 100, 0.3)"), // Jupiter
      new Planet(centerX, centerY, 350, 12, 0.003, "rgba(255, 200, 150, 0.8)", "rgba(255, 200, 150, 0.3)"), // Saturn
      new Planet(centerX, centerY, 420, 8, 0.002, "rgba(100, 200, 255, 0.8)", "rgba(100, 200, 255, 0.3)"), // Uranus
      new Planet(centerX, centerY, 480, 8, 0.001, "rgba(100, 100, 255, 0.8)", "rgba(100, 100, 255, 0.3)"), // Neptune
    ]

    // Create stars
    const stars: Star[] = []
    for (let i = 0; i < 200; i++) {
      stars.push(new Star())
    }

    // Create asteroids
    const asteroids: Asteroid[] = []
    for (let i = 0; i < 30; i++) {
      asteroids.push(new Asteroid())
    }

    let time = 0

    const animate = () => {
      // Clear with space background
      ctx.fillStyle = "rgba(5, 10, 20, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 1

      // Draw stars
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      // Draw asteroids
      asteroids.forEach((asteroid) => {
        asteroid.update()
        asteroid.draw()
      })

      // Draw sun
      sun.draw()

      // Draw planets
      planets.forEach((planet) => {
        planet.update()
        planet.draw()
      })

      // Add some cosmic dust
      if (Math.random() < 0.1) {
        ctx.save()
        ctx.globalAlpha = 0.1
        ctx.fillStyle = "rgba(200, 200, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2)
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
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10, 15, 30, 0.95) 0%, rgba(5, 5, 15, 0.98) 100%)",
        }}
      />
      {/* Space overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
    </div>
  )
}
