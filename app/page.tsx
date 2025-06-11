"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import StaticBackground from "@/components/static-background"
import Image from "next/image"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const featuredArticle = {
    title: "Innovating Tomorrow: The Future of AI and Technology",
    excerpt: "How artificial intelligence is reshaping our world and what it means for the future of technology.",
    author: "Gökdeniz",
    date: "June 11, 2025",
    category: "AI",
    image: "/images/featured-ai-future.png",
  }

  const topStories = [
    {
      title: "London Startup AI Project Revolutionizes Business Intelligence",
      excerpt: "How this groundbreaking platform is changing the game for startups.",
      author: "AGStellar Team",
      date: "June 10, 2025",
      category: "Tech",
      comments: 24,
      image: "/images/london-street.png",
    },
    {
      title: "The Evolution of Web Development in 2025",
      excerpt: "New frameworks and technologies that are defining the modern web.",
      author: "AGStellar Team",
      date: "June 9, 2025",
      category: "Development",
      comments: 18,
      image: "/images/web-development-setup.png",
    },
    {
      title: "Mobile App Trends That Will Dominate Next Year",
      excerpt: "What to expect in the world of mobile applications in the coming year.",
      author: "AGStellar Team",
      date: "June 8, 2025",
      category: "Mobile",
      comments: 32,
      image: "/images/mobile-app-abstract.png",
    },
    {
      title: "How Blockchain is Transforming Financial Systems",
      excerpt: "A deep dive into the impact of blockchain technology on modern finance.",
      author: "AGStellar Team",
      date: "June 7, 2025",
      category: "Blockchain",
      comments: 15,
      image: "/images/blockchain-bank.png",
    },
  ]

  const latestArticles = [
    {
      title: "The Future of Software Development in the AI Era",
      excerpt: "How artificial intelligence is changing the way we build and deploy software applications.",
      image: "/images/tech-article-1.png",
      category: "Technology",
    },
    {
      title: "Building Scalable Applications with Modern Architecture",
      excerpt: "Best practices for creating robust, maintainable, and scalable software systems.",
      image: "/images/tech-article-2.png",
      category: "Technology",
    },
    {
      title: "Machine Learning Integration in Web Applications",
      excerpt: "Practical approaches to implementing ML features in modern web development.",
      image: "/images/tech-article-3.png",
      category: "Technology",
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

              {/* Search and Menu */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800 md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Featured Article */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-12 gap-8">
                {/* Left Sidebar - Fixed Featured text */}
                <div className="hidden md:block md:col-span-1 relative">
                  <div className="absolute top-32 left-6 transform -rotate-90 origin-top-left">
                    <h2 className="text-5xl font-black tracking-tighter text-white uppercase whitespace-nowrap">
                      Featured
                    </h2>
                  </div>
                </div>

                {/* Main Featured Article */}
                <div className="md:col-span-7">
                  <div className="relative aspect-[4/3] mb-6">
                    <Image
                      src={featuredArticle.image || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <Badge className="bg-cyan-500 hover:bg-cyan-600 mb-4">{featuredArticle.category}</Badge>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-lg text-zinc-300 mb-4">{featuredArticle.excerpt}</p>
                  <div className="flex items-center text-sm text-zinc-400">
                    <span>{featuredArticle.author}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>

                {/* Top Stories */}
                <div className="md:col-span-4">
                  <h3 className="text-lg font-medium text-cyan-500 mb-6">Top Stories</h3>
                  <div className="space-y-8">
                    {topStories.map((story, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={story.image || "/placeholder.svg"}
                            alt={story.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <Badge className="bg-zinc-800 text-xs mr-2">{story.category}</Badge>
                            <span className="text-xs text-zinc-500">{story.date}</span>
                          </div>
                          <h4 className="font-bold mb-1 leading-tight text-sm">
                            <Link href="#" className="hover:text-cyan-400 line-clamp-2">
                              {story.title}
                            </Link>
                          </h4>
                          <div className="flex items-center text-xs text-zinc-500">
                            <span>{story.author}</span>
                            <span className="mx-1">•</span>
                            <span>{story.comments} comments</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Latest Articles */}
          <section className="py-12 bg-zinc-900">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <Button variant="ghost" className="text-white hover:text-cyan-400 group">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {latestArticles.map((article, index) => (
                  <div key={index} className="group">
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Badge className="bg-zinc-800 text-xs mb-2">{article.category}</Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400">
                      <Link href="#">{article.title}</Link>
                    </h3>
                    <p className="text-zinc-400 text-sm mb-3">{article.excerpt}</p>
                    <div className="flex items-center text-xs text-zinc-500">
                      <span>AGStellar Team</span>
                      <span className="mx-1">•</span>
                      <span>June 5, 2025</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-16 bg-zinc-800">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest updates on technology, AI, and software development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Subscribe</Button>
              </div>
            </div>
          </section>
        </main>

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
