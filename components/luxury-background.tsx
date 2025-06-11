"use client"

import Image from "next/image"

export default function LuxuryBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Image src="/fluid-background-new.png" alt="Luxury Fluid Background" fill className="object-cover" priority />
      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
