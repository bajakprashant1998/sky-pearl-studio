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
  ArrowUp,
  Calendar, 
  Clock, 
  User,
  Users,
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
  ChevronRight,
  Target,
  Megaphone,
  LineChart,
  Globe,
  Palette,
  Code,
  Mail,
  Share2,
  PieChart,
  Rocket,
  Brain,
  ShoppingCart,
  Video,
  BarChart3,
  TrendingUp,
  Zap,
  Award,
  Settings
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

// Category to icon mapping for visual variety
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, React.ElementType> = {
    "SEO": Target,
    "Content Marketing": BookOpen,
    "Social Media": Share2,
    "PPC": BarChart3,
    "Email Marketing": Mail,
    "Web Development": Code,
    "AI Marketing": Brain,
    "E-commerce": ShoppingCart,
    "Video Marketing": Video,
    "Branding": Palette,
    "Analytics": LineChart,
    "Digital Marketing": Megaphone,
  };
  return iconMap[category] || Lightbulb;
};

// Get gradient colors based on category
const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    "SEO": "from-emerald-500 to-teal-600",
    "Content Marketing": "from-violet-500 to-purple-600",
    "Social Media": "from-pink-500 to-rose-600",
    "PPC": "from-amber-500 to-orange-600",
    "Email Marketing": "from-blue-500 to-indigo-600",
    "Web Development": "from-cyan-500 to-sky-600",
    "AI Marketing": "from-fuchsia-500 to-pink-600",
    "E-commerce": "from-green-500 to-emerald-600",
    "Video Marketing": "from-red-500 to-rose-600",
    "Branding": "from-indigo-500 to-violet-600",
    "Analytics": "from-slate-500 to-gray-600",
    "Digital Marketing": "from-primary to-blue-600",
  };
  return gradients[category] || "from-primary to-accent";
};

// Get pattern style for decorative elements
const getPatternStyle = (index: number) => {
  const patterns = [
    { backgroundImage: "radial-gradient(circle at 20% 80%, currentColor 2px, transparent 2px)", backgroundSize: "20px 20px" },
    { backgroundImage: "linear-gradient(45deg, currentColor 1px, transparent 1px)", backgroundSize: "12px 12px" },
    { backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" },
    { backgroundImage: "linear-gradient(0deg, currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" },
  ];
  return patterns[index % patterns.length];
};

// Parse content into structured sections
function parseContentToSections(content: string) {
  const sections: { type: 'intro' | 'section' | 'tip'; title?: string; content: string }[] = [];
  
  // Split by ## headers
  const parts = content.split(/(?=## )/);
  
  parts.forEach((part, index) => {
    if (index === 0 && !part.startsWith('## ')) {
      // First part is intro - clean any standalone # symbols
      const cleanedIntro = part
        .replace(/^#+\s*$/gm, '') // Remove lines that are just #
        .replace(/\s+#+\s*$/gm, '') // Remove trailing # at end of lines
        .trim();
      if (cleanedIntro) {
        sections.push({ type: 'intro', content: cleanedIntro });
      }
    } else if (part.startsWith('## ')) {
      const lines = part.split('\n');
      // Clean section title - remove all # prefixes and suffixes
      const title = lines[0]
        .replace(/^#{1,6}\s*/, '')  // Remove leading ##
        .replace(/\s*#{1,6}$/, '')  // Remove trailing #
        .trim();
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
    // (e.g. a line that is just "#" or "##" or "###" etc.)
    if (/^#{1,6}\s*$/.test(line)) {
      continue;
    }
    
    // Also skip lines that are just # with optional whitespace
    if (/^\s*#+\s*$/.test(line)) {
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
  
  // Smart reading time state
  const [scrollSpeed, setScrollSpeed] = useState<'slow' | 'normal' | 'fast' | 'skimming'>('normal');
  const [adaptiveRemainingTime, setAdaptiveRemainingTime] = useState<string>("");
  const [wordsPerMinute, setWordsPerMinute] = useState(200); // Average WPM

  // Calculate word count from content
  const wordCount = useMemo(() => {
    if (!post) return 0;
    return post.content.split(/\s+/).filter(word => word.length > 0).length;
  }, [post]);

  // Smart reading time estimator based on scroll speed
  useEffect(() => {
    if (!post) return;
    
    let lastScrollTop = window.scrollY;
    let lastScrollTime = Date.now();
    let scrollSpeeds: number[] = [];
    const SAMPLE_SIZE = 10;
    
    const calculateAdaptiveTime = () => {
      const scrollTop = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = Math.abs(scrollTop - lastScrollTop);
      
      // Calculate pixels per second
      const pixelsPerSecond = timeDiff > 0 ? (scrollDiff / timeDiff) * 1000 : 0;
      
      // Store recent scroll speeds
      scrollSpeeds.push(pixelsPerSecond);
      if (scrollSpeeds.length > SAMPLE_SIZE) {
        scrollSpeeds.shift();
      }
      
      // Calculate average scroll speed
      const avgSpeed = scrollSpeeds.reduce((a, b) => a + b, 0) / scrollSpeeds.length;
      
      // Categorize scroll speed and adjust WPM
      let newWpm = 200;
      let speedCategory: 'slow' | 'normal' | 'fast' | 'skimming' = 'normal';
      
      if (avgSpeed < 50) {
        // Slow/careful reading - user is reading thoroughly
        newWpm = 150;
        speedCategory = 'slow';
      } else if (avgSpeed < 200) {
        // Normal reading speed
        newWpm = 200;
        speedCategory = 'normal';
      } else if (avgSpeed < 500) {
        // Fast reading/scanning
        newWpm = 350;
        speedCategory = 'fast';
      } else {
        // Skimming - very fast scroll
        newWpm = 600;
        speedCategory = 'skimming';
      }
      
      setScrollSpeed(speedCategory);
      setWordsPerMinute(prev => Math.round(prev * 0.7 + newWpm * 0.3)); // Smooth transition
      
      // Calculate remaining words based on progress
      const remainingWords = Math.ceil(wordCount * (1 - readingProgress / 100));
      const remainingMinutes = Math.ceil(remainingWords / wordsPerMinute);
      
      // Format remaining time
      if (remainingMinutes <= 0 || readingProgress >= 95) {
        setAdaptiveRemainingTime("Almost done!");
      } else if (remainingMinutes === 1) {
        setAdaptiveRemainingTime("~1 min left");
      } else if (remainingMinutes < 60) {
        setAdaptiveRemainingTime(`~${remainingMinutes} min left`);
      } else {
        const hours = Math.floor(remainingMinutes / 60);
        const mins = remainingMinutes % 60;
        setAdaptiveRemainingTime(`~${hours}h ${mins}m left`);
      }
      
      lastScrollTop = scrollTop;
      lastScrollTime = currentTime;
    };
    
    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateAdaptiveTime();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    calculateAdaptiveTime();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, wordCount, readingProgress, wordsPerMinute]);

  // Static remaining read time fallback
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

  // Category to related services mapping
  const getRelatedServices = (category: string) => {
    const serviceMap: Record<string, { title: string; href: string; description: string; gradient: string; icon: React.ElementType }[]> = {
      "SEO": [
        { title: "SEO Services", href: "/services/seo", description: "Boost your search rankings and organic traffic", gradient: "from-emerald-500 to-teal-600", icon: Target },
        { title: "Content Marketing", href: "/services/content-marketing", description: "Create content that drives results", gradient: "from-violet-500 to-purple-600", icon: BookOpen },
        { title: "Analytics & AI", href: "/services/analytics-ai", description: "Data-driven insights for growth", gradient: "from-blue-500 to-indigo-600", icon: LineChart },
      ],
      "AI Marketing": [
        { title: "AI Marketing", href: "/services/ai-marketing", description: "Leverage AI for smarter marketing", gradient: "from-fuchsia-500 to-pink-600", icon: Brain },
        { title: "Analytics & AI", href: "/services/analytics-ai", description: "Advanced analytics solutions", gradient: "from-blue-500 to-indigo-600", icon: LineChart },
        { title: "PPC Advertising", href: "/services/ppc", description: "AI-optimized paid campaigns", gradient: "from-amber-500 to-orange-600", icon: BarChart3 },
      ],
      "Web Development": [
        { title: "Web Design", href: "/services/web-design", description: "Modern, responsive websites", gradient: "from-cyan-500 to-sky-600", icon: Code },
        { title: "Custom Development", href: "/services/custom-development", description: "Tailored web solutions", gradient: "from-slate-500 to-gray-600", icon: Code },
        { title: "E-commerce", href: "/services/ecommerce-marketing", description: "Online store solutions", gradient: "from-green-500 to-emerald-600", icon: ShoppingCart },
      ],
      "Social Media": [
        { title: "Social Media", href: "/services/social-media", description: "Grow your social presence", gradient: "from-pink-500 to-rose-600", icon: Share2 },
        { title: "Content Marketing", href: "/services/content-marketing", description: "Engaging content strategy", gradient: "from-violet-500 to-purple-600", icon: BookOpen },
        { title: "Video Marketing", href: "/services/video-marketing", description: "Video content that converts", gradient: "from-red-500 to-rose-600", icon: Video },
      ],
      "Content Marketing": [
        { title: "Content Marketing", href: "/services/content-marketing", description: "Strategic content creation", gradient: "from-violet-500 to-purple-600", icon: BookOpen },
        { title: "SEO Services", href: "/services/seo", description: "SEO-optimized content", gradient: "from-emerald-500 to-teal-600", icon: Target },
        { title: "Social Media", href: "/services/social-media", description: "Content distribution", gradient: "from-pink-500 to-rose-600", icon: Share2 },
      ],
      "E-commerce": [
        { title: "E-commerce Marketing", href: "/services/ecommerce-marketing", description: "Grow your online store", gradient: "from-green-500 to-emerald-600", icon: ShoppingCart },
        { title: "Amazon Marketing", href: "/services/amazon-marketing", description: "Dominate Amazon marketplace", gradient: "from-amber-500 to-orange-600", icon: ShoppingCart },
        { title: "PPC Advertising", href: "/services/ppc", description: "Drive targeted traffic", gradient: "from-blue-500 to-indigo-600", icon: BarChart3 },
      ],
    };
    return serviceMap[category] || serviceMap["SEO"];
  };

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
      {/* Reading Progress Bar - Enhanced with Speed Indicator */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-muted/50 z-50 backdrop-blur-sm">
        <div 
          className={`h-full transition-all duration-150 ease-out relative ${
            scrollSpeed === 'slow' 
              ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500' 
              : scrollSpeed === 'fast' 
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500' 
              : scrollSpeed === 'skimming' 
              ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500'
              : 'bg-gradient-to-r from-primary via-accent to-primary'
          }`}
          style={{ width: `${readingProgress}%` }}
        >
          {/* Glow effect at the end */}
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-md animate-pulse ${
            scrollSpeed === 'slow' ? 'bg-emerald-500' 
            : scrollSpeed === 'fast' ? 'bg-amber-500' 
            : scrollSpeed === 'skimming' ? 'bg-rose-500'
            : 'bg-primary'
          }`} />
        </div>
        {/* Progress & Speed indicator */}
        {readingProgress > 5 && readingProgress < 95 && (
          <div 
            className={`absolute top-4 text-xs font-bold backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border transition-all flex items-center gap-1.5 ${
              scrollSpeed === 'slow' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                : scrollSpeed === 'fast' 
                ? 'bg-amber-50 text-amber-600 border-amber-200' 
                : scrollSpeed === 'skimming' 
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-background/90 text-primary border-primary/20'
            }`}
            style={{ left: `${Math.min(readingProgress, 85)}%`, transform: 'translateX(-50%)' }}
          >
            {scrollSpeed === 'slow' && <BookOpen className="w-3 h-3" />}
            {scrollSpeed === 'normal' && <Zap className="w-3 h-3" />}
            {scrollSpeed === 'fast' && <TrendingUp className="w-3 h-3" />}
            {scrollSpeed === 'skimming' && <Rocket className="w-3 h-3" />}
            <span>{Math.round(readingProgress)}%</span>
            <span className="text-[9px] opacity-70">• {adaptiveRemainingTime || remainingReadTime}</span>
          </div>
        )}
        {/* Completion indicator */}
        {readingProgress >= 95 && (
          <div 
            className="absolute top-4 right-4 text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce-subtle"
          >
            <Check className="w-3 h-3" />
            <span>Article Complete!</span>
          </div>
        )}
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
      <div className="bg-gradient-to-b from-secondary/40 via-secondary/20 to-background min-h-screen">
        {/* Hero Section - Ultra Premium */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/50 to-accent/10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.05) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
          
          <div className="container px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link 
                to="/blog" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary font-medium truncate max-w-[200px]">{post.category}</span>
            </nav>
            
            <AnimatedSection direction="up">
              <div className="max-w-4xl">
                {/* Category Badge with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(post.category)} flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const IconComponent = getCategoryIcon(post.category);
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-2 text-sm font-semibold">
                    {post.category}
                  </Badge>
                </div>
                
                {/* Main Title - Large, Bold */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                  {post.title}
                </h1>
                
                {/* Intro Description */}
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
                  {post.metaDescription}
                </p>
                
                {/* Enhanced Meta Info Bar */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-5 py-3 shadow-md border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-foreground">{post.author}</span>
                      <span className="text-xs text-muted-foreground">Expert Team</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border border-border/50">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border border-border/50">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{post.readTime}</span>
                  </div>
                  
                  {/* Smart Reading Time Indicator */}
                  {readingProgress > 0 && readingProgress < 95 && (
                    <div className={`flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border transition-all duration-500 ${
                      scrollSpeed === 'slow' 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : scrollSpeed === 'fast' 
                        ? 'bg-amber-500/10 border-amber-500/30' 
                        : scrollSpeed === 'skimming' 
                        ? 'bg-rose-500/10 border-rose-500/30'
                        : 'bg-primary/10 border-primary/20'
                    }`}>
                      {/* Speed Icon */}
                      {scrollSpeed === 'slow' && <BookOpen className="w-5 h-5 text-emerald-600" />}
                      {scrollSpeed === 'normal' && <Zap className="w-5 h-5 text-primary" />}
                      {scrollSpeed === 'fast' && <TrendingUp className="w-5 h-5 text-amber-600" />}
                      {scrollSpeed === 'skimming' && <Rocket className="w-5 h-5 text-rose-600" />}
                      
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${
                          scrollSpeed === 'slow' 
                            ? 'text-emerald-600' 
                            : scrollSpeed === 'fast' 
                            ? 'text-amber-600' 
                            : scrollSpeed === 'skimming' 
                            ? 'text-rose-600'
                            : 'text-primary'
                        }`}>
                          {adaptiveRemainingTime || remainingReadTime}
                        </span>
                        <span className="text-[10px] text-muted-foreground capitalize">
                          {scrollSpeed === 'slow' ? 'Deep reading' : 
                           scrollSpeed === 'fast' ? 'Speed reading' :
                           scrollSpeed === 'skimming' ? 'Skimming' : 'Reading'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Completion Badge */}
                  {readingProgress >= 95 && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border border-emerald-500/30 animate-pulse">
                      <Check className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-600">Complete!</span>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12">
          <div className="container px-4">
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 max-w-7xl mx-auto">
              
              {/* Main Content - Card-Based Layout */}
              <div className="space-y-8">
                <AnimatedSection direction="up">
                  {/* Hero Graphic Card - Ultra Premium */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl opacity-50 blur-md group-hover:opacity-75 transition-opacity animate-gradient-x" />
                    <Card className={`relative overflow-hidden border-0 shadow-2xl rounded-2xl bg-gradient-to-br ${getCategoryGradient(post.category)}`}>
                      <div className="relative h-72 md:h-96">
                        {/* Animated Pattern Overlay */}
                        <div 
                          className="absolute inset-0 opacity-15 text-white"
                          style={getPatternStyle(0)}
                        />
                        
                        {/* Animated Floating Elements */}
                        <div className="absolute top-10 right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-float" />
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/15 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
                        
                        {/* Main Icon with Enhanced Glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative group-hover:scale-110 transition-transform duration-700">
                            <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-[2] animate-pulse" />
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150" />
                            {(() => {
                              const IconComponent = getCategoryIcon(post.category);
                              return <IconComponent className="relative w-28 h-28 md:w-40 md:h-40 text-white drop-shadow-2xl" strokeWidth={0.8} />;
                            })()}
                          </div>
                        </div>
                        
                        {/* Enhanced Stats Bar */}
                        <div className="absolute bottom-6 left-6 right-6 flex gap-3 flex-wrap">
                          <div className="bg-white/25 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-2 border border-white/20 shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">Expert Analysis</span>
                          </div>
                          <div className="bg-white/25 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-2 border border-white/20 shadow-lg">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">{post.readTime}</span>
                          </div>
                          <div className="bg-white/25 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-2 border border-white/20 shadow-lg">
                            <Award className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">{post.category}</span>
                          </div>
                          <div className="bg-white/25 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-2 border border-white/20 shadow-lg">
                            <Users className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">2.5K reads</span>
                          </div>
                        </div>
                        
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-6 left-6">
                          <div className="w-4 h-16 bg-white/30 rounded-full" />
                          <div className="w-16 h-4 bg-white/30 rounded-full mt-2" />
                        </div>
                        <div className="absolute top-6 right-6 flex items-center gap-2">
                          <Badge className="bg-white/90 text-primary font-bold shadow-lg">
                            <Sparkles className="w-4 h-4 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
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

                {/* Related Services Section */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-8 py-5 border-b border-border">
                      <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-primary" />
                        Related Services
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Explore our expert services in {post.category}</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid sm:grid-cols-3 gap-4">
                        {getRelatedServices(post.category).map((service, idx) => (
                          <Link key={idx} to={service.href}>
                            <div className="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                <service.icon className="w-5 h-5 text-white" />
                              </div>
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{service.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                            </div>
                          </Link>
                        ))}
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
                              {/* Icon instead of image */}
                              <div className={`w-16 h-14 rounded-lg flex-shrink-0 bg-gradient-to-br ${getCategoryGradient(relatedPost.category)} flex items-center justify-center`}>
                                {(() => {
                                  const IconComponent = getCategoryIcon(relatedPost.category);
                                  return <IconComponent className="w-7 h-7 text-white" strokeWidth={1.5} />;
                                })()}
                              </div>
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
              {allPosts.filter(p => p.id !== post.id).slice(0, 3).map((p, index) => {
                const IconComponent = getCategoryIcon(p.category);
                return (
                  <StaggerItem key={p.id}>
                    <Link to={`/blog/${p.slug}`}>
                      <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 rounded-2xl bg-white">
                        {/* Icon Graphic Section */}
                        <div className={`aspect-video overflow-hidden relative bg-gradient-to-br ${getCategoryGradient(p.category)}`}>
                          {/* Pattern Overlay */}
                          <div 
                            className="absolute inset-0 opacity-10 text-white"
                            style={getPatternStyle(index)}
                          />
                          
                          {/* Floating Elements */}
                          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                          
                          {/* Main Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative group-hover:scale-110 transition-transform duration-500">
                              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150" />
                              <IconComponent className="relative w-14 h-14 text-white drop-shadow-lg" strokeWidth={1.5} />
                            </div>
                          </div>
                          
                          {/* Read Time Pill */}
                          <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-white" />
                            <span className="text-white text-xs font-medium">{p.readTime}</span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <Badge className="bg-primary/10 text-primary text-xs mb-3">{p.category}</Badge>
                          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {p.title}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Rocket className="w-4 h-4 mr-1 text-primary" />
                            Read Article
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                );
              })}
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
