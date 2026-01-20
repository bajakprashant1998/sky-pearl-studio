import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Clock, 
  User,
  BookOpen,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Sparkles,
  MessageCircle,
  Lightbulb,
  ChevronRight
} from "lucide-react";
import { useState, useMemo } from "react";

// Parse content into structured sections
function parseContentToSections(content: string) {
  const sections: { type: 'intro' | 'section' | 'tip'; title?: string; content: string }[] = [];
  
  // Split by ## headers
  const parts = content.split(/(?=## )/);
  
  parts.forEach((part, index) => {
    if (index === 0 && !part.startsWith('## ')) {
      // First part is intro
      sections.push({ type: 'intro', content: part.trim() });
    } else if (part.startsWith('## ')) {
      const lines = part.split('\n');
      const title = lines[0].replace('## ', '').trim();
      const sectionContent = lines.slice(1).join('\n').trim();
      
      // Check if this is an actionable tip section
      if (title.toLowerCase().includes('tip') || title.toLowerCase().includes('actionable')) {
        sections.push({ type: 'tip', title, content: sectionContent });
      } else {
        sections.push({ type: 'section', title, content: sectionContent });
      }
    }
  });
  
  return sections;
}

// Format content with proper HTML - removes all markdown header symbols
function formatContent(content: string) {
  return content
    // Remove any remaining markdown headers (# ## ### ####)
    .replace(/^#{1,4}\s+/gm, '')
    .replace(/### ([^\n]+)/g, '<h3 class="text-xl font-bold text-primary mt-6 mb-3">$1</h3>')
    .replace(/## ([^\n]+)/g, '<h2 class="text-2xl font-bold text-primary mt-8 mb-4">$1</h2>')
    .replace(/# ([^\n]+)/g, '<h1 class="text-3xl font-bold text-primary mt-8 mb-4">$1</h1>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-muted-foreground">')
    .replace(/\n- /g, '</p><li class="ml-4 mb-2 text-muted-foreground flex items-start gap-2"><ChevronRight class="w-4 h-4 text-primary mt-1 flex-shrink-0" />')
    .replace(/<li/g, '</p><ul class="my-4 space-y-2"><li')
    .replace(/- \*\*/g, '<li class="ml-4 mb-2 text-muted-foreground"><strong>')
    .replace(/\*\* /g, '</strong> ');
}

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useBlogPost(slug || "");
  const { data: allPosts = [] } = useBlogPosts();
  const [copied, setCopied] = useState(false);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post, allPosts]);

  const contentSections = useMemo(() => {
    if (!post) return [];
    return parseContentToSections(post.content);
  }, [post]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 bg-slate-50">
          <div className="container px-4 py-16">
            <div className="max-w-6xl mx-auto">
              <Skeleton className="h-64 w-full rounded-2xl mb-8" />
              <div className="grid lg:grid-cols-[1fr_340px] gap-8">
                <div className="space-y-6">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog">
              <Button className="bg-primary hover:bg-primary/90">
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

      {/* Light Gray Background for entire page */}
      <div className="bg-slate-100 min-h-screen">
        {/* Hero Section with Gradient */}
        <section className="relative pt-20 pb-12 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
          
          <div className="container px-4 relative z-10">
            {/* Back Button */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <AnimatedSection direction="up">
              <div className="max-w-4xl">
                {/* Category Badge */}
                <Badge className="bg-primary text-white hover:bg-primary/90 px-4 py-1.5 mb-6 text-sm font-medium">
                  {post.category}
                </Badge>
                
                {/* Main Title - Large, Bold, Dark Blue */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Intro Description */}
                <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
                  {post.metaDescription}
                </p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-slate-500">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    {post.author}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12">
          <div className="container px-4">
            <div className="grid lg:grid-cols-[1fr_360px] gap-8 max-w-7xl mx-auto">
              
              {/* Main Content - Card-Based Layout */}
              <div className="space-y-6">
                <AnimatedSection direction="up">
                  {/* Featured Image Card */}
                  <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </Card>
                </AnimatedSection>

                {/* Content Sections as Cards */}
                {contentSections.map((section, index) => (
                  <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                    {section.type === 'intro' && (
                      <Card className="border-0 shadow-lg rounded-2xl bg-white">
                        <CardContent className="p-8">
                          <div 
                            className="prose prose-lg max-w-none text-slate-600 leading-relaxed"
                            style={{ lineHeight: '1.8' }}
                            dangerouslySetInnerHTML={{ 
                              __html: section.content
                                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-900">$1</strong>')
                                .replace(/\n\n/g, '</p><p class="mb-4">')
                            }} 
                          />
                        </CardContent>
                      </Card>
                    )}

                    {section.type === 'section' && (
                      <Card className="border-0 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                          {/* Section Number & Title */}
                          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                              {index}
                            </span>
                            {section.title}
                          </h2>
                          
                          {/* Section Content */}
                          <div 
                            className="prose prose-lg max-w-none text-slate-600"
                            style={{ lineHeight: '1.8' }}
                            dangerouslySetInnerHTML={{ 
                              __html: section.content
                                .replace(/^#{1,4}\s+/gm, '')
                                .replace(/### ([^\n]+)/g, '<h3 class="text-xl font-bold text-slate-800 mt-6 mb-3">$1</h3>')
                                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
                                .replace(/\n\n/g, '</p><p class="mb-4">')
                                .replace(/\n- /g, '<br/><span class="flex items-start gap-2 my-2"><span class="text-primary mt-1">•</span>')
                                .replace(/\n/g, '<br/>')
                            }}
                          />
                        </CardContent>
                      </Card>
                    )}

                    {section.type === 'tip' && (
                      <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-l-primary overflow-hidden">
                        <CardContent className="p-8">
                          {/* Tip Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <Lightbulb className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">
                              {section.title || 'Actionable Tip'}
                            </h3>
                          </div>
                          
                          {/* Tip Content */}
                          <div 
                            className="text-slate-700 leading-relaxed"
                            style={{ lineHeight: '1.8' }}
                            dangerouslySetInnerHTML={{ 
                              __html: section.content
                                .replace(/^#{1,4}\s+/gm, '')
                                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
                                .replace(/\n/g, '<br/>')
                            }}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </AnimatedSection>
                ))}

                {/* If no sections parsed, show raw content in a card */}
                {contentSections.length === 0 && (
                  <AnimatedSection direction="up">
                    <Card className="border-0 shadow-lg rounded-2xl bg-white">
                      <CardContent className="p-8">
                        <div 
                          className="prose prose-lg max-w-none text-slate-600"
                          style={{ lineHeight: '1.8' }}
                          dangerouslySetInnerHTML={{ 
                            __html: post.content
                              .replace(/^#{1,4}\s+/gm, '')
                              .replace(/## ([^\n]+)/g, '</div><div class="mt-8 pt-8 border-t border-slate-200"><h2 class="text-2xl font-bold text-primary mb-4">$1</h2>')
                              .replace(/### ([^\n]+)/g, '<h3 class="text-xl font-bold text-slate-800 mt-6 mb-3">$1</h3>')
                              .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
                              .replace(/\n\n/g, '</p><p class="mb-4">')
                              .replace(/\n- /g, '<br/><span class="inline-flex items-start gap-2"><span class="text-primary">•</span>')
                              .replace(/\n/g, '<br/>')
                          }} 
                        />
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )}

                {/* Tags Card */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-lg rounded-2xl bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Tag className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-slate-900">Tags:</span>
                        {post.tags.map((tag) => (
                          <Link key={tag} to={`/blog?search=${encodeURIComponent(tag)}`}>
                            <Badge 
                              variant="outline" 
                              className="px-4 py-2 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer border-slate-300"
                            >
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                {/* Questions CTA Card */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-primary/5 to-blue-50 border border-primary/10">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-slate-900 mb-2">Have questions about this article?</h3>
                          <p className="text-slate-600 mb-5">
                            Our team of digital marketing experts is here to help you implement these strategies.
                          </p>
                          <Link to="/contact">
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                              Get in Touch
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                {/* Share Section */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-lg rounded-2xl bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <span className="font-semibold text-slate-900">Share this article:</span>
                        <div className="flex items-center gap-3">
                          <a 
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all"
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                          <a 
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                          <button 
                            onClick={handleCopyLink}
                            className="p-3 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all"
                          >
                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>

              {/* Sidebar - Sticky */}
              <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
                {/* Author Card */}
                <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white">
                  <div className="h-24 bg-gradient-to-br from-primary to-blue-600" />
                  <CardContent className="pt-0 pb-6 px-6 -mt-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center border-4 border-white shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-xl text-slate-900 mb-1">{post.author}</h3>
                      <p className="text-slate-500 mb-6">
                        Digital Marketing Experts
                      </p>
                      <Link to="/about-us">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                          About Our Team
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Need Help CTA Card */}
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="relative p-8 bg-gradient-to-br from-primary via-blue-600 to-indigo-600 text-white">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                    
                    <div className="relative z-10">
                      <Sparkles className="w-12 h-12 mb-5 text-white/90" />
                      <h3 className="font-bold text-2xl mb-3">Need Help?</h3>
                      <p className="text-white/90 mb-6 leading-relaxed">
                        Get expert assistance with your digital marketing strategy.
                      </p>
                      <Link to="/contact">
                        <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-2xl bg-white">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
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
                            <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                              <img 
                                src={relatedPost.featuredImage} 
                                alt={relatedPost.title}
                                className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                  {relatedPost.title}
                                </h4>
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
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
              </aside>
            </div>
          </div>
        </section>

        {/* More Articles Section */}
        <section className="py-20 bg-gradient-to-b from-slate-100 to-white">
          <div className="container px-4">
            <AnimatedSection direction="up">
              <div className="text-center mb-12">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 px-4 py-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Reading
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  More Expert Insights
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto">
                  Explore more articles to enhance your digital marketing knowledge
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {allPosts.filter(p => p.id !== post.id).slice(0, 3).map((p) => (
                <StaggerItem key={p.id}>
                  <Link to={`/blog/${p.slug}`}>
                    <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 rounded-2xl bg-white">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={p.featuredImage} 
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="bg-primary/10 text-primary text-xs mb-3">{p.category}</Badge>
                        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                        <div className="flex items-center text-sm text-slate-500">
                          <Clock className="w-4 h-4 mr-1" />
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
                <Button variant="outline" size="lg" className="px-8 border-primary text-primary hover:bg-primary hover:text-white">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetailPage;
