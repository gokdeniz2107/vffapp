import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

// Bu normalde veritabanından gelecek
const blogPost = {
  title: "React 19'da Yeni Özellikler ve Geliştirmeler",
  content: `
    <p>React 19, web geliştirme dünyasında büyük bir heyecan yaratan yeni özellikler ve iyileştirmeler getiriyor. Bu yazıda, React'in en son sürümünde neler değiştiğini ve bu değişikliklerin geliştiriciler için ne anlama geldiğini detaylı bir şekilde inceleyeceğiz.</p>

    <h2>Server Components'ta Yenilikler</h2>
    <p>React 19 ile birlikte Server Components daha da güçlendi. Artık server-side rendering işlemleri daha verimli ve performanslı hale geldi. Bu özellik sayesinde:</p>
    <ul>
      <li>Daha hızlı sayfa yükleme süreleri</li>
      <li>Daha iyi SEO performansı</li>
      <li>Azaltılmış JavaScript bundle boyutu</li>
    </ul>

    <h2>Concurrent Features</h2>
    <p>React 19'da concurrent features artık varsayılan olarak aktif. Bu da şu avantajları getiriyor:</p>
    <ul>
      <li>Daha akıcı kullanıcı deneyimi</li>
      <li>Otomatik batching iyileştirmeleri</li>
      <li>Suspense ile daha iyi loading states</li>
    </ul>

    <h2>Yeni Hook'lar</h2>
    <p>React 19 ile birlikte gelen yeni hook'lar geliştirici deneyimini büyük ölçüde iyileştiriyor:</p>

    <h3>useOptimistic Hook</h3>
    <p>Bu hook, optimistic updates yapmayı kolaylaştırıyor ve kullanıcı deneyimini iyileştiriyor.</p>

    <h3>useFormStatus Hook</h3>
    <p>Form durumlarını yönetmek artık çok daha kolay ve sezgisel.</p>

    <h2>Performans İyileştirmeleri</h2>
    <p>React 19, önceki sürümlere göre %20 daha hızlı rendering performansı sunuyor. Bu iyileştirmeler özellikle büyük uygulamalarda kendini gösteriyor.</p>

    <h2>Sonuç</h2>
    <p>React 19, modern web geliştirme için gereken tüm araçları sunuyor. Bu yeni özellikler sayesinde daha performanslı, daha kullanıcı dostu uygulamalar geliştirebilirsiniz.</p>
  `,
  date: "15 Aralık 2024",
  author: {
    name: "Ahmet Yılmaz",
    avatar: "/placeholder-user.jpg",
    bio: "Senior Frontend Developer ve React uzmanı",
  },
  category: "React",
  readTime: "8 dk",
  likes: 42,
  comments: 12,
}

const relatedPosts = [
  {
    title: "Next.js ile Full-Stack Geliştirme",
    slug: "nextjs-fullstack-gelistirme",
    category: "Next.js",
  },
  {
    title: "TypeScript Best Practices",
    slug: "typescript-best-practices",
    category: "TypeScript",
  },
  {
    title: "Modern CSS Teknikleri",
    slug: "modern-css-teknikleri",
    category: "CSS",
  },
]

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold">TechBlog</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Ana Sayfa
            </Link>
            <Link href="/blog" className="text-gray-900 font-medium">
              Blog
            </Link>
            <Link href="/hakkimizda" className="text-gray-600 hover:text-gray-900">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-gray-600 hover:text-gray-900">
              İletişim
            </Link>
          </nav>
          <Button asChild>
            <Link href="/iletisim">İletişime Geç</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Blog'a Dön
          </Link>
        </Button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="lg:w-2/3">
            <Card>
              <CardHeader className="space-y-4">
                <Badge className="w-fit">{blogPost.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">{blogPost.title}</h1>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={blogPost.author.avatar || "/placeholder.svg"} alt={blogPost.author.name} />
                    <AvatarFallback>AY</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{blogPost.author.name}</p>
                    <p className="text-sm text-gray-500">{blogPost.author.bio}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPost.readTime} okuma
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {blogPost.likes} beğeni
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {blogPost.comments} yorum
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Beğen
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Featured Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-8"></div>

                {/* Content */}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-semibold mb-3">Etiketler:</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">Web Development</Badge>
                    <Badge variant="secondary">Frontend</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Yorumlar ({blogPost.comments})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Comment Form */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Yorum Yap</h4>
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={4}
                      placeholder="Yorumunuzu yazın..."
                    ></textarea>
                    <Button className="mt-3">Yorum Gönder</Button>
                  </div>

                  {/* Sample Comments */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-sm">Mehmet Kaya</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Çok faydalı bir yazı olmuş. React 19'daki yenilikleri merakla bekliyordum.
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">2 saat önce</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-sm">Ayşe Şahin</p>
                          <p className="text-sm text-gray-600 mt-1">
                            useOptimistic hook gerçekten çok kullanışlı görünüyor. Projemde deneyeceğim.
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">5 saat önce</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="space-y-6">
              {/* Author Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Yazar Hakkında</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={blogPost.author.avatar || "/placeholder.svg"} alt={blogPost.author.name} />
                      <AvatarFallback>AY</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{blogPost.author.name}</p>
                      <p className="text-sm text-gray-500">{blogPost.author.bio}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    5+ yıllık deneyime sahip frontend developer. React, Next.js ve modern web teknolojileri konusunda
                    uzman.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Tüm Yazıları Gör
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>İlgili Yazılar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPosts.map((post, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <Badge variant="secondary" className="text-xs mb-1">
                            {post.category}
                          </Badge>
                          <h4 className="font-medium text-sm line-clamp-2 hover:text-blue-600 transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle>Bülten</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Yeni yazılarımızdan haberdar olmak için e-posta listemize katılın.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="E-posta adresiniz"
                      className="w-full p-2 border rounded-lg text-sm"
                    />
                    <Button className="w-full" size="sm">
                      Abone Ol
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
