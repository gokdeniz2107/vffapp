"use client"

import { useEffect, useRef } from "react"

export default function HologramBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas boyutunu ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Parçacık sistemi
    class Particle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.z = Math.random() * 1000
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.vz = (Math.random() - 0.5) * 5
        this.size = Math.random() * 3 + 1
        this.color = this.getRandomColor()
        this.opacity = Math.random() * 0.8 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
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
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.z += this.vz
        this.life++

        // Sınırları kontrol et
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        if (this.z < 0 || this.z > 1000) this.vz *= -1

        // Yaşam döngüsü
        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.color = this.getRandomColor()
        }

        // Opacity animasyonu
        this.opacity = 0.5 + 0.5 * Math.sin(this.life * 0.05)
      }

      draw() {
        const scale = 1000 / (1000 + this.z)
        const x = this.x * scale
        const y = this.y * scale
        const size = this.size * scale

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Hologram çizgileri
    class HologramLine {
      x: number
      y: number
      width: number
      height: number
      opacity: number
      speed: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.width = Math.random() * 200 + 50
        this.height = 2
        this.opacity = Math.random() * 0.5 + 0.3
        this.speed = Math.random() * 3 + 1
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height + 10) {
          this.y = -10
          this.x = Math.random() * canvas.width
          this.color = this.getRandomColor()
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 10
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore()
      }
    }

    // Geometrik şekiller
    class FloatingShape {
      x: number
      y: number
      rotation: number
      rotationSpeed: number
      size: number
      color: string
      opacity: number
      vx: number
      vy: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.rotation = 0
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        this.size = Math.random() * 50 + 20
        this.color = this.getRandomColor()
        this.opacity = Math.random() * 0.3 + 0.1
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
      }

      getRandomColor() {
        const colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00", "#ff0080"]
        return colors[Math.floor(Math.random() * colors.length)]
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
        ctx.strokeStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 15
        ctx.lineWidth = 2

        // Hexagon çiz
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
        ctx.restore()
      }
    }

    // Nesneleri oluştur
    const particles: Particle[] = []
    const hologramLines: HologramLine[] = []
    const shapes: FloatingShape[] = []

    for (let i = 0; i < 150; i++) {
      particles.push(new Particle())
    }

    for (let i = 0; i < 8; i++) {
      hologramLines.push(new HologramLine())
    }

    for (let i = 0; i < 12; i++) {
      shapes.push(new FloatingShape())
    }

    let time = 0

    // Ana animasyon döngüsü
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      // Grid çizgileri
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = "#00ffff"
      ctx.lineWidth = 1
      ctx.shadowColor = "#00ffff"
      ctx.shadowBlur = 5

      // Dikey çizgiler
      for (let x = 0; x < canvas.width; x += 100) {
        ctx.beginPath()
        ctx.moveTo(x + Math.sin(time + x * 0.01) * 10, 0)
        ctx.lineTo(x + Math.sin(time + x * 0.01) * 10, canvas.height)
        ctx.stroke()
      }

      // Yatay çizgiler
      for (let y = 0; y < canvas.height; y += 100) {
        ctx.beginPath()
        ctx.moveTo(0, y + Math.cos(time + y * 0.01) * 10)
        ctx.lineTo(canvas.width, y + Math.cos(time + y * 0.01) * 10)
        ctx.stroke()
      }
      ctx.restore()

      // Parçacıkları güncelle ve çiz
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Hologram çizgilerini güncelle ve çiz
      hologramLines.forEach((line) => {
        line.update()
        line.draw()
      })

      // Şekilleri güncelle ve çiz
      shapes.forEach((shape) => {
        shape.update()
        shape.draw()
      })

      // Merkez hologram efekti
      ctx.save()
      ctx.globalAlpha = 0.3 + 0.2 * Math.sin(time * 2)
      ctx.strokeStyle = "#00ffff"
      ctx.shadowColor = "#00ffff"
      ctx.shadowBlur = 30
      ctx.lineWidth = 3

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 100 + 50 * Math.sin(time)

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // İç daireler
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * (i / 4), 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.restore()

      // Glitch efekti
      if (Math.random() < 0.02) {
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        ctx.fillStyle = `rgba(${Math.random() * 255}, 0, ${Math.random() * 255}, 0.1)`
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 5)
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
          background: "radial-gradient(ellipse at center, rgba(0,20,40,0.8) 0%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      {/* Ek CSS efektleri */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%2300ffff fillOpacity=0.03%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
    </div>
  )
}
