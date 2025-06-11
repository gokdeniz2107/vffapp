"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add subtle animation to the background
    let animationId: number
    let rotation = 0

    const animate = () => {
      rotation += 0.1
      if (container) {
        container.style.transform = `rotate(${rotation}deg) scale(1.1)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Main fluid background */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out"
        style={{
          transformOrigin: "center center",
        }}
      >
        <Image src="/fluid-background.png" alt="Fluid Background" fill className="object-cover opacity-80" priority />
      </div>

      {/* Overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-blue-900/10" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=0 0 256 256 xmlns=http://www.w3.org/2000/svg%3E%3Cfilter id=noiseFilter%3E%3CfeTurbulence type=fractalNoise baseFrequency=0.9 numOctaves=4 stitchTiles=stitch/%3E%3C/filter%3E%3Crect width=100%25 height=100%25 filter=url(%23noiseFilter)/%3E%3C/svg%3E')]" />
    </div>
  )
}
