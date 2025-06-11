"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import StaticBackground from "@/components/static-background"
import Image from "next/image"

export default function ProjectsPage() {
  const projects = [
    {
      title: "London Startup AI Project",
      description: "Advanced AI-powered business intelligence platform for London-based startup ecosystem.",
      tech: ["Python", "TensorFlow", "React", "Node.js", "AWS"],
      status: "Live",
      image: "/images/london-startup-ai.png",
    },
    {
      title: "AI Assistant",
      description: "Artificial intelligence-powered assistant application.",
      tech: ["Python", "React", "AI", "Cloud"],
      status: "Live",
      image: "/images/projects/ai-assistant.png",
    },
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce and payment systems.",
      tech: ["Next.js", "Stripe", "Web3", "API"],
      status: "Development",
      image: "/images/projects/ecommerce-platform.png",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website.",
      tech: ["React", "Three.js", "GSAP", "WebGL"],
      status: "Beta",
      image: "/images/projects/portfolio-website.png",
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile application with React Native.",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      status: "Planning",
      image: "/images/projects/mobile-app.png",
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for business analytics.",
      tech: ["D3.js", "Node.js", "MongoDB", "Express"],
      status: "Development",
      image: "/images/projects/data-analytics.png",
    },
  ]

  return (
    <div className="min-h-screen text-white bg-black" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Static Background */}
      <StaticBackground />

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Top Bar */}
        <div className="bg-black border-b border-zinc-800">
          <div className="container mx-auto px-4 flex justify-end py-2">
            <Button variant="ghost" size="sm" className="text-white text-xs hover:bg-zinc-800">
              SUBSCRIBE
            </Button>
            <Button variant="ghost" size="sm" className="text-white text-xs hover:bg-zinc-800">
              SIGN IN
            </Button>
          </div>
        </div>

        {/* Header */}
        <header className="bg-black sticky top-0 z-50 border-b border-zinc-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="text-3xl font-black tracking-tighter">
                  <span className="text-white">AG</span>
                  <span className="text-white">STELLAR</span>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/tech" className="text-white hover:text-zinc-300 text-sm font-medium">
                  Tech
                </Link>
                <Link href="/ai" className="text-white hover:text-zinc-300 text-sm font-medium">
                  AI
                </Link>
                <Link href="/development" className="text-white hover:text-zinc-300 text-sm font-medium">
                  Development
                </Link>
                <Link href="/projects" className="text-white hover:text-zinc-300 text-sm font-medium">
                  Projects
                </Link>
                <Link href="/blog" className="text-white hover:text-zinc-300 text-sm font-medium">
                  Blog
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Projects Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="mb-8 text-white hover:text-zinc-300" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>

            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-5xl font-black tracking-tight mb-2">Projects</h1>
                <p className="text-zinc-400">Our latest work and technology innovations</p>
              </div>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Contact Us
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-video mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3" />
                    <Badge
                      className={`absolute top-4 right-4 ${
                        project.status === "Live"
                          ? "bg-green-500"
                          : project.status === "Development"
                            ? "bg-amber-500"
                            : project.status === "Beta"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    <Link href="#">{project.title}</Link>
                  </h2>
                  <p className="text-zinc-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-zinc-800 px-0 group">
                    View Project Details
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-zinc-900">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how AGStellar can help transform your ambitious ideas into powerful, working products.
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg">Get in Touch</Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-12 border-t border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">AGStellar</h3>
                <p className="text-zinc-400 mb-4">
                  Creating innovative software solutions that transform ideas into reality.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4 text-zinc-300">Categories</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      AI & Machine Learning
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Mobile Apps
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4 text-zinc-300">Company</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="hover:text-white">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4 text-zinc-300">Legal</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-zinc-500 text-sm">&copy; 2025 AGStellar. All rights reserved.</p>
              <div className="flex items-center mt-4 md:mt-0">
                <Button variant="link" className="text-zinc-500 text-sm hover:text-white">
                  Privacy
                </Button>
                <span className="text-zinc-700 mx-2">|</span>
                <Button variant="link" className="text-zinc-500 text-sm hover:text-white">
                  Terms
                </Button>
                <span className="text-zinc-700 mx-2">|</span>
                <Button variant="link" className="text-zinc-500 text-sm hover:text-white">
                  Sitemap
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
