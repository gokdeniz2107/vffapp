"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"
import StaticBackground from "@/components/static-background"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Yapay Zeka ile Geleceği Şekillendirmek",
      excerpt:
        "AI teknolojilerinin günlük hayatımıza etkisi, machine learning algoritmaları ve gelecekteki potansiyeli üzerine detaylı bir analiz.",
      date: "15 Aralık 2024",
      author: "AGStellar Team",
      category: "Yapay Zeka",
      readTime: "8 dk",
      slug: "yapay-zeka-gelecek",
    },
    {
      id: 2,
      title: "React 19'da Yeni Özellikler ve Server Components",
      excerpt:
        "React'in yeni sürümünde gelen özellikler, server components, concurrent features ve geliştirici deneyimindeki iyileştirmeler.",
      date: "12 Aralık 2024",
      author: "AGStellar Team",
      category: "React",
      readTime: "6 dk",
      slug: "react-19-yenilikler",
    },
    {
      id: 3,
      title: "Next.js 15 ile Full-Stack Geliştirme",
      excerpt:
        "Next.js'in en son sürümü ile modern web uygulamaları geliştirme, API routes, middleware ve performans optimizasyonları.",
      date: "10 Aralık 2024",
      author: "AGStellar Team",
      category: "Next.js",
      readTime: "10 dk",
      slug: "nextjs-15-fullstack",
    },
  ]

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
                className="text-black hover:text-gray-800 transition-colors font-semibold text-lg"
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

        {/* Blog Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Button variant="ghost" className="mb-8 text-black" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>

            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-black">Blog</span>
              </h2>
              <p className="text-gray-800 max-w-3xl mx-auto text-lg">Latest insights and articles about technology</p>
            </div>

            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
                  <div className="md:flex">
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <Badge
                            variant="secondary"
                            className={`${
                              post.category === "Yapay Zeka"
                                ? "bg-purple-100 text-purple-800"
                                : post.category === "React"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {post.category}
                          </Badge>
                          <span className="text-sm text-gray-800">{post.readTime} okuma</span>
                        </div>
                        <CardTitle className="text-xl text-black group-hover:text-gray-800 transition-colors duration-300">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-6 line-clamp-3 text-gray-800 leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-800">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-black hover:text-gray-800" asChild>
                            <Link href={`/blog/${post.slug}`}>
                              Read More <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
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
