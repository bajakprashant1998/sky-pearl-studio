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
  Linkedin,
  Copy,
  Check,
  Sparkles,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug || "");
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
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

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Digital Bull Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://dibull.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.featuredImage} />
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
            "image": post.featuredImage,
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

      {/* Hero Header with Featured Image */}
      <section className="relative pt-20 pb-0 overflow-hidden">
        {/* Full-width Featured Image */}
        <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-8 left-0 right-0 z-20">
            <div className="container px-4">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full hover:bg-background transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
        
        {/* Article Header - Overlapping */}
        <div className="container px-4 -mt-32 relative z-10">
          <AnimatedSection direction="up">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl shadow-2xl shadow-primary/5 border border-border/50 p-8 lg:p-12">
                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Description */}
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {post.metaDescription}
                </p>

                {/* Author & Share */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-muted-foreground">Digital Marketing Experts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Share:</span>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <button 
                      onClick={handleCopyLink}
                      className="p-2.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <AnimatedSection direction="up">
              <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## /g, '</p><h2>').replace(/### /g, '</p><h3>').replace(/<h2>/g, '</h3><h2>').replace(/<h3>/g, '</h2><h3>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/- \*\*/g, '<br/><strong>• ').replace(/\*\* /g, '</strong> ').replace(/- /g, '<br/>• ') }} />
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className="font-semibold mr-2">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/blog?search=${encodeURIComponent(tag)}`}>
                      <Badge variant="outline" className="px-4 py-1.5 hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Article Footer */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Have questions about this article?</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Our team of digital marketing experts is here to help you implement these strategies.
                    </p>
                    <Link to="/contact">
                      <Button size="sm">
                        Get in Touch
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author Card */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="h-20 bg-gradient-to-br from-primary to-accent" />
                <CardContent className="pt-0 pb-6 px-6 -mt-10">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-background">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">{post.author}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Digital Marketing Experts
                    </p>
                    <Link to="/about-us">
                      <Button variant="outline" size="sm" className="w-full">
                        About Our Team
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative p-6 bg-gradient-to-br from-primary via-primary to-accent text-white">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <Sparkles className="w-10 h-10 mb-4 text-white/80" />
                  <h3 className="font-bold text-xl mb-2">Need Help?</h3>
                  <p className="text-white/90 text-sm mb-6">
                    Get expert assistance with your digital marketing strategy.
                  </p>
                  <Link to="/contact">
                    <Button className="w-full bg-white text-primary hover:bg-white/90">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Table of Contents - Sticky */}
              <div className="sticky top-24">
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
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
                            <div className="flex gap-3">
                              <img 
                                src={relatedPost.featuredImage} 
                                alt={relatedPost.title}
                                className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                              />
                              <div>
                                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                  {relatedPost.title}
                                </h4>
                                <span className="text-xs text-muted-foreground">
                                  {relatedPost.readTime}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Reading
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                More Expert Insights
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Explore more articles to enhance your digital marketing knowledge
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((p) => (
              <StaggerItem key={p.id}>
                <Link to={`/blog/${p.slug}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={p.featuredImage} 
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="text-xs mb-3">{p.category}</Badge>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
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

          <div className="text-center mt-10">
            <Link to="/blog">
              <Button variant="outline" size="lg" className="px-8">
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
