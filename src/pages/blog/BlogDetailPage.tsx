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
import LazyImage from "@/components/LazyImage";
import { 
  ArrowLeft, 
  ArrowRight,
  ArrowUp,
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
import { useState, useMemo, useEffect } from "react";

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

// Format content with proper HTML - removes all markdown symbols and creates clean lists
function formatContent(content: string) {
  // First, clean up markdown symbols
  let cleaned = content
    .replace(/^#{1,4}\s+/gm, '')
    .replace(/\n#\s*$/gm, '')
    .replace(/\s#\s*$/gm, '')
    .replace(/#\s*$/gm, '');
  
  // Convert markdown lists to proper HTML lists
  const lines = cleaned.split('\n');
  let result = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('- ')) {
      if (!inList) {
        result += '<ul class="list-none space-y-3 my-4 pl-0">';
        inList = true;
      }
      const listContent = line.substring(2)
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
      result += `<li class="flex items-start gap-3"><span class="text-primary mt-1.5 flex-shrink-0">•</span><span>${listContent}</span></li>`;
    } else {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      if (line) {
        const formatted = line
          .replace(/### ([^\n]+)/g, '<h3 class="text-xl font-bold text-primary mt-6 mb-3">$1</h3>')
          .replace(/## ([^\n]+)/g, '<h2 class="text-2xl font-bold text-primary mt-8 mb-4">$1</h2>')
          .replace(/# ([^\n]+)/g, '<h1 class="text-3xl font-bold text-primary mt-8 mb-4">$1</h1>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
        result += `<p class="mb-4 leading-relaxed">${formatted}</p>`;
      }
    }
  }
  
  if (inList) {
    result += '</ul>';
  }
  
  return result;
}

// Simple content formatter for inline use
function formatSectionContent(content: string) {
  // Don't strip markdown headings yet - we need to convert them to HTML first
  const lines = content.split('\n');
  let result = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines but close list if open
    if (!line) {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      continue;
    }

    // Ignore standalone markdown symbols that sometimes leak into generated content
    // (e.g. a line that is just "#")
    if (/^#{1,6}$/.test(line)) {
      continue;
    }

    // Handle sub-headings (### )
    if (line.startsWith('### ')) {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      const headingText = line.substring(4).replace(/\*\*([^*]+)\*\*/g, '$1');
      result += `<h3 class="text-xl font-bold text-foreground mt-6 mb-3">${headingText}</h3>`;
      continue;
    }
    
    // Handle bullet points
    if (line.startsWith('- ')) {
      if (!inList) {
        result += '<ul class="list-none space-y-3 my-4 pl-0">';
        inList = true;
      }
      const listContent = line.substring(2)
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
      result += `<li class="flex items-start gap-3"><span class="text-primary mt-1.5 flex-shrink-0">•</span><span class="flex-1">${listContent}</span></li>`;
      continue;
    }
    
    // Regular paragraphs
    if (inList) {
      result += '</ul>';
      inList = false;
    }
    
    // Format bold text and create paragraph
    const formatted = line
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    result += `<p class="mb-4 leading-relaxed">${formatted}</p>`;
  }
  
  if (inList) {
    result += '</ul>';
  }
  
  return result;
}

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useBlogPost(slug || "");
  const { data: allPosts = [] } = useBlogPosts();
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Calculate remaining read time based on progress
  const remainingReadTime = useMemo(() => {
    if (!post) return "";
    const totalMinutes = parseInt(post.readTime) || 5;
    const remaining = Math.ceil(totalMinutes * (1 - readingProgress / 100));
    if (remaining <= 0) return "< 1 min left";
    if (remaining === 1) return "1 min left";
    return `${remaining} min left`;
  }, [post, readingProgress]);

  // Reading progress bar effect & active section tracking
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
      
      // Show back to top button after scrolling 400px
      setShowBackToTop(scrollTop > 400);
      
      // Find active section for table of contents
      const sections = document.querySelectorAll('[data-section-id]');
      let currentActive = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          currentActive = section.getAttribute('data-section-id') || "";
        }
      });
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
          <div 
            className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        <div className="min-h-screen pt-20 bg-secondary/30">
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
        <div className="min-h-screen flex items-center justify-center bg-secondary/30">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card shadow-lg flex items-center justify-center">
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
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
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
        
        {/* Google News Meta Tags */}
        <meta name="news_keywords" content={post.tags.slice(0, 10).join(', ')} />
        <meta name="original-source" content={`https://dibull.com/blog/${post.slug}`} />
        <meta name="syndication-source" content={`https://dibull.com/blog/${post.slug}`} />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* NewsArticle Structured Data for Google News */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://dibull.com/blog/${post.slug}`
            },
            "headline": post.title,
            "description": post.metaDescription,
            "image": {
              "@type": "ImageObject",
              "url": post.featuredImage,
              "width": 1200,
              "height": 630
            },
            "datePublished": post.publishDate,
            "dateModified": post.publishDate,
            "author": {
              "@type": "Organization",
              "name": post.author,
              "url": "https://dibull.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Digital Bull Technology",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dibull.com/dibull_logo.png",
                "width": 600,
                "height": 60
              },
              "url": "https://dibull.com"
            },
            "articleSection": post.category,
            "keywords": post.tags.join(', '),
            "wordCount": post.content.split(/\s+/).length,
            "inLanguage": "en-IN",
            "isAccessibleForFree": true,
            "copyrightHolder": {
              "@type": "Organization",
              "name": "Digital Bull Technology"
            },
            "copyrightYear": new Date(post.publishDate).getFullYear()
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Light Gray Background for entire page */}
      <div className="bg-secondary/30 min-h-screen">
        {/* Hero Section with Gradient */}
        <section className="relative pt-20 pb-12 bg-gradient-to-br from-secondary via-secondary/50 to-accent/10">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          
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
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1.5 mb-6 text-sm font-medium">
                  {post.category}
                </Badge>
                
                {/* Main Title - Large, Bold, Dark Blue */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Intro Description */}
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  {post.metaDescription}
                </p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
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
                  {/* Dynamic remaining time */}
                  {readingProgress > 0 && readingProgress < 100 && (
                    <span className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary font-medium text-sm">
                      <Clock className="w-4 h-4" />
                      {remainingReadTime}
                    </span>
                  )}
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
                    <LazyImage 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </Card>
                </AnimatedSection>

                {/* Content Sections as Cards */}
                {contentSections.map((section, index) => {
                  // Calculate section number (only count 'section' types, starting from 1)
                  const sectionNumber = contentSections
                    .slice(0, index + 1)
                    .filter(s => s.type === 'section')
                    .length;
                  
                  return (
                    <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                      {section.type === 'intro' && (
                        <Card className="border-0 shadow-lg rounded-2xl bg-card">
                          <CardContent className="p-8">
                            <div 
                              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                              style={{ lineHeight: '1.8' }}
                              dangerouslySetInnerHTML={{ 
                                __html: section.content
                                  .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground">$1</strong>')
                                  .replace(/\n\n/g, '</p><p class="mb-4">')
                              }} 
                            />
                          </CardContent>
                        </Card>
                      )}

                      {section.type === 'section' && (
                        <Card 
                          id={`section-${index}`}
                          data-section-id={`section-${index}`}
                          className="border-0 shadow-lg rounded-2xl bg-card hover:shadow-xl transition-shadow duration-300 scroll-mt-24"
                        >
                          <CardContent className="p-8">
                            {/* Section Number & Title */}
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                {sectionNumber}
                              </span>
                              {section.title}
                            </h2>
                            
                            {/* Section Content */}
                            <div 
                              className="prose prose-lg max-w-none text-muted-foreground"
                              style={{ lineHeight: '1.8' }}
                              dangerouslySetInnerHTML={{ __html: formatSectionContent(section.content) }}
                            />
                          </CardContent>
                        </Card>
                      )}

                    {section.type === 'tip' && (
                      <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-secondary to-secondary/50 border-l-4 border-l-primary overflow-hidden">
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
                            className="text-foreground leading-relaxed"
                            style={{ lineHeight: '1.8' }}
                            dangerouslySetInnerHTML={{ __html: formatSectionContent(section.content) }}
                          />
                        </CardContent>
                      </Card>
                    )}
                    </AnimatedSection>
                  );
                })}

                {/* If no sections parsed, show raw content in a card */}
                {contentSections.length === 0 && (
                  <AnimatedSection direction="up">
                    <Card className="border-0 shadow-lg rounded-2xl bg-card">
                      <CardContent className="p-8">
                        <div 
                          className="prose prose-lg max-w-none text-muted-foreground"
                          style={{ lineHeight: '1.8' }}
                          dangerouslySetInnerHTML={{ __html: formatSectionContent(post.content) }}
                        />
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )}

                {/* Tags Card */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-lg rounded-2xl bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Tag className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">Tags:</span>
                        {post.tags.map((tag) => (
                          <Link key={tag} to={`/blog?search=${encodeURIComponent(tag)}`}>
                            <Badge 
                              variant="outline" 
                              className="px-4 py-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer border-border"
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
                  <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-primary/5 to-secondary border border-primary/10">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-foreground mb-2">Have questions about this article?</h3>
                          <p className="text-muted-foreground mb-5">
                            Our team of digital marketing experts is here to help you implement these strategies.
                          </p>
                          <Link to="/contact">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
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
                  <Card className="border-0 shadow-lg rounded-2xl bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <span className="font-semibold text-foreground">Share this article:</span>
                        <div className="flex items-center gap-3">
                          <a 
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                          <a 
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                          <button 
                            onClick={handleCopyLink}
                            className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>

              {/* Floating Social Share Buttons - Desktop only */}
              <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-40">
                <div className="bg-white rounded-2xl shadow-lg p-3 space-y-3">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
                    title="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
                    title="Copy link"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Sidebar - Sticky */}
              <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
                {/* Table of Contents */}
                {contentSections.filter(s => s.type === 'section').length > 0 && (
                  <Card className="border-0 shadow-lg rounded-2xl bg-card overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary px-6 py-4 border-b border-border">
                      <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Table of Contents
                      </h3>
                    </div>
                    <CardContent className="p-4">
                      <nav className="space-y-1">
                        {contentSections.map((section, index) => {
                          if (section.type !== 'section') return null;

                          // Section id stays aligned with the rendered card id (uses original array index)
                          const sectionId = `section-${index}`;
                          const isActive = activeSection === sectionId;

                          // Display number must match the main content numbering (only count 'section' types)
                          const sectionNumber = contentSections
                            .slice(0, index + 1)
                            .filter((s) => s.type === 'section')
                            .length;

                          return (
                            <a
                              key={sectionId}
                              href={`#${sectionId}`}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className={`flex items-start gap-3 p-3 rounded-xl transition-all text-sm ${
                                isActive
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <span
                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {sectionNumber}
                              </span>
                              <span className="line-clamp-2">{section.title}</span>
                            </a>
                          );
                        })}
                      </nav>
                    </CardContent>
                  </Card>
                )}
                {/* Author Card */}
                <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-card">
                  <div className="h-24 bg-gradient-to-br from-primary to-accent" />
                  <CardContent className="pt-0 pb-6 px-6 -mt-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-background shadow-lg">
                      <User className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-xl text-foreground mb-1">{post.author}</h3>
                      <p className="text-muted-foreground mb-6">
                        Digital Marketing Experts
                      </p>
                      <Link to="/about-us">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                          About Our Team
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Need Help CTA Card */}
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="relative p-8 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-background/5 rounded-full blur-xl" />
                    
                    <div className="relative z-10">
                      <Sparkles className="w-12 h-12 mb-5 text-primary-foreground/90" />
                      <h3 className="font-bold text-2xl mb-3">Need Help?</h3>
                      <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                        Get expert assistance with your digital marketing strategy.
                      </p>
                      <Link to="/contact">
                        <Button className="w-full bg-background text-primary hover:bg-background/90 font-semibold shadow-lg">
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-2xl bg-card">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-foreground mb-5 flex items-center gap-2">
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
                            <div className="flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors">
                              <LazyImage 
                                src={relatedPost.featuredImage} 
                                alt={relatedPost.title}
                                className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                  {relatedPost.title}
                                </h4>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
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
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container px-4">
            <AnimatedSection direction="up">
              <div className="text-center mb-12">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 px-4 py-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Reading
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  More Expert Insights
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
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
                        <LazyImage 
                          src={p.featuredImage} 
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="bg-primary/10 text-primary text-xs mb-3">{p.category}</Badge>
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
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
                <Button variant="outline" size="lg" className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <Footer />
    </>
  );
};

export default BlogDetailPage;
