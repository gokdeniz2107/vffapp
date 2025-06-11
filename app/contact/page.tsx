"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import StaticBackground from "@/components/static-background"

export default function ContactPage() {
  return (
    <div className="min-h-screen text-black" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Static Background */}
      <StaticBackground />

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              {/* Logo Text */}
              <div className="text-left leading-none" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                <div className="text-2xl font-black text-black tracking-wider">AG</div>
                <div className="text-2xl font-black text-black tracking-wider">STELL</div>
                <div className="text-2xl font-black text-black tracking-wider">AR</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-black transition-colors font-semibold text-lg"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-black transition-colors font-semibold text-lg"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-black transition-colors font-semibold text-lg"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-black transition-colors font-semibold text-lg"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-black hover:text-gray-800 transition-colors font-semibold text-lg"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Contact
              </Link>
            </nav>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-lg"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </header>

        {/* Contact Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Button variant="ghost" className="mb-8 text-black" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>

            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-black">Contact</span>
              </h2>
              <p className="text-gray-800 max-w-3xl mx-auto text-lg">Let's build tomorrow's projects together</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-10">
                  <h3 className="text-2xl font-bold mb-8 text-black">Get In Touch With Me</h3>

                  <div className="space-y-8">
                    {[
                      { icon: Mail, label: "Email", value: "info@agstellar.com" },
                      { icon: Phone, label: "Phone", value: "+90 537 426 49 49" },
                      { icon: MapPin, label: "Location", value: "Antalya, Turkey" },
                    ].map((contact, index) => (
                      <div key={index} className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                          <contact.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-800 text-sm">{contact.label}</p>
                          <p className="text-black font-medium">{contact.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <h4 className="text-lg font-bold mb-6 text-black">Social Media</h4>
                    <div className="flex gap-4">
                      <Button
                        size="sm"
                        className="bg-purple-100 border border-purple-200 hover:bg-purple-200 text-purple-700"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-100 border border-purple-200 hover:bg-purple-200 text-purple-700"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-10">
                  <h3 className="text-2xl font-bold mb-8 text-black">Project Proposal</h3>
                  <form className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-black mb-3">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-blue-400"
                        placeholder="Your name and surname"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-3">Email</label>
                      <input
                        type="email"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-blue-400"
                        placeholder="Your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-3">Project Details</label>
                      <textarea
                        rows={4}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-blue-400 resize-none"
                        placeholder="Share details about your project..."
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white transform hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      Send Proposal
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-100 py-8 border-t border-slate-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo */}
              <div className="text-left leading-none mb-4 md:mb-0">
                <div className="text-xl font-black text-black tracking-wider">AG</div>
                <div className="text-base font-black text-black tracking-wider">STELL</div>
                <div className="text-lg font-black text-black tracking-wider">AR</div>
              </div>

              <p className="text-gray-800">&copy; 2025 AGStellar. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
