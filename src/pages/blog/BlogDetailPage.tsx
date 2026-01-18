import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { getBlogPostBySlug, blogPosts } from "@/data/blogData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Clock, 
  User,
  Share2,
  BookOpen,
  Tag,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug || "");

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <Link to="/blog" className="text-primary hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Helmet>
        <title>{post.title} | Digital Bull Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://dibull.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.metaDescription,
            "datePublished": post.publishDate,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Digital Bull Technology"
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Article Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="px-4 py-1">{post.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground">
                {post.metaDescription}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container px-4">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <AnimatedSection direction="up">
              <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## /g, '</p><h2>').replace(/### /g, '</p><h3>').replace(/<h2>/g, '</h3><h2>').replace(/<h3>/g, '</h2><h3>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/- \*\*/g, '<br/><strong>• ').replace(/\*\* /g, '</strong> ').replace(/- /g, '<br/>• ') }} />
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share this article:
                  </span>
                  <div className="flex gap-2">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{post.author}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Digital Marketing Experts
                    </p>
                    <Link to="/about-us">
                      <Button variant="outline" size="sm" className="w-full">
                        About Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-primary to-blue-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Get expert assistance with your digital marketing strategy.
                  </p>
                  <Link to="/contact">
                    <Button className="w-full bg-white text-primary hover:bg-white/90">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          key={relatedPost.id} 
                          to={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {relatedPost.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {relatedPost.readTime}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Continue Reading
              </h2>
              <p className="text-muted-foreground">
                Explore more insights from our blog
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((p) => (
              <StaggerItem key={p.id}>
                <Link to={`/blog/${p.slug}`}>
                  <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-primary/30" />
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="text-xs mb-2">{p.category}</Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {p.readTime}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-8">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetailPage;
