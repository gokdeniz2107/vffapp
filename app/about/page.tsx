"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, Code, TrendingUp, Smartphone } from "lucide-react"
import Link from "next/link"
import StaticBackground from "@/components/static-background"

export default function AboutPage() {
  return (
    <div className="min-h-screen text-black" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Static Background */}
      <StaticBackground />

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo Text */}
            <div className="text-left leading-none" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              <div className="text-2xl font-black text-black tracking-wider">AG</div>
              <div className="text-2xl font-black text-black tracking-wider">STELL</div>
              <div className="text-2xl font-black text-black tracking-wider">AR</div>
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
                className="text-black hover:text-gray-800 transition-colors font-semibold text-lg"
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
                className="text-gray-700 hover:text-black transition-colors font-semibold text-lg"
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

        {/* About Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Button variant="ghost" className="mb-8 text-black" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>

            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-black">About Me</span>
              </h2>
              <p className="text-gray-800 max-w-3xl mx-auto text-lg">Founder & Lead Developer at AGStellar</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Personal Story */}
              <div className="space-y-8">
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                        <Brain className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-black">Gökdeniz</h3>
                        <p className="text-gray-800">Founder & Lead Developer</p>
                      </div>
                    </div>

                    <div className="space-y-6 text-gray-800 leading-relaxed">
                      <p>
                        I'm Gökdeniz, the founder and lead developer at AgStellar, a software company dedicated to
                        delivering advanced, scalable, and intelligent digital solutions.
                      </p>

                      <p>
                        With a strong technical background and a vision rooted in innovation, I specialize in building
                        high-performance systems that empower businesses to grow through technology. AgStellar offers a
                        range of services including AI-based solutions, custom software development, mobile and web
                        application development, and financial software systems — particularly in the domain of stock
                        market technologies.
                      </p>

                      <p>
                        My approach is guided by precision, performance, and long-term value. Every solution we build is
                        the result of deep technical expertise, strategic thinking, and a commitment to excellence.
                      </p>

                      <p>
                        AgStellar isn't just a development company — it's a technology partner for those ready to lead
                        the future. Through innovative engineering and a focus on real-world impact, we help our clients
                        turn ambitious ideas into powerful, working products.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Services & Expertise */}
              <div className="space-y-8">
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-black text-xl">Core Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          icon: Brain,
                          title: "AI-Based Solutions",
                          description: "Intelligent systems that adapt and learn",
                        },
                        {
                          icon: Code,
                          title: "Custom Software Development",
                          description: "Tailored solutions for unique business needs",
                        },
                        {
                          icon: Smartphone,
                          title: "Mobile & Web Applications",
                          description: "Cross-platform applications with modern UX",
                        },
                        {
                          icon: TrendingUp,
                          title: "Financial Software Systems",
                          description: "Specialized in stock market technologies",
                        },
                      ].map((service, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 flex-shrink-0">
                            <service.icon className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="text-black font-semibold mb-1">{service.title}</h4>
                            <p className="text-gray-800 text-sm">{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-black text-xl">Our Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "Precision in every line of code",
                        "Performance-driven solutions",
                        "Long-term value creation",
                        "Deep technical expertise",
                        "Strategic thinking approach",
                        "Commitment to excellence",
                      ].map((value, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          <span className="text-gray-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20">
              <Card className="bg-slate-50 border-slate-200 max-w-2xl mx-auto">
                <CardContent className="p-10">
                  <h3 className="text-2xl font-bold text-black mb-4">Ready to Build the Future?</h3>
                  <p className="text-gray-800 mb-8 leading-relaxed">
                    Let's discuss how AgStellar can help transform your ambitious ideas into powerful, working products.
                  </p>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white" size="lg" asChild>
                    <Link href="/contact">
                      Start Your Project
                      <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-100 py-8 border-t border-slate-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
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
