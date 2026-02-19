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
import { motion, AnimatePresence } from "framer-motion";
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
  Settings,
  ExternalLink,
  Link2,
  CheckCircle2,
  Star,
  Quote,
  Eye,
  ThumbsUp,
  Bookmark,
  Send,
  Play
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { injectSeoLinks, getCategoryAuthorityLinks, getRecommendedReading } from "@/utils/blogSeoLinks";

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
  
  const parts = content.split(/(?=## )/);
  
  parts.forEach((part, index) => {
    if (index === 0 && !part.startsWith('## ')) {
      const cleanedIntro = part
        .replace(/^#+\s*$/gm, '')
        .replace(/\s+#+\s*$/gm, '')
        .trim();
      if (cleanedIntro) {
        sections.push({ type: 'intro', content: cleanedIntro });
      }
    } else if (part.startsWith('## ')) {
      const lines = part.split('\n');
      const title = lines[0]
        .replace(/^#{1,6}\s*/, '')
        .replace(/\s*#{1,6}$/, '')
        .trim();
      const sectionContent = lines.slice(1).join('\n').trim();
      
      if (title.toLowerCase().includes('tip') || title.toLowerCase().includes('actionable')) {
        sections.push({ type: 'tip', title, content: sectionContent });
      } else {
        sections.push({ type: 'section', title, content: sectionContent });
      }
    }
  });
  
  return sections;
}

// Simple content formatter for inline use
function formatSectionContent(content: string, injectLinks: boolean = false, currentSlug?: string) {
  const lines = content.split('\n');
  let result = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      continue;
    }

    if (/^#{1,6}\s*$/.test(line) || /^\s*#+\s*$/.test(line)) {
      continue;
    }

    if (line.startsWith('### ')) {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      const headingText = line.substring(4).replace(/\*\*([^*]+)\*\*/g, '$1');
      result += `<h3 class="text-xl font-bold text-foreground mt-6 mb-3">${headingText}</h3>`;
      continue;
    }
    
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
    
    if (inList) {
      result += '</ul>';
      inList = false;
    }
    
    const formatted = line
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    result += `<p class="mb-4 leading-relaxed">${formatted}</p>`;
  }
  
  if (inList) {
    result += '</ul>';
  }
  
  if (injectLinks) {
    const { content: linkedContent } = injectSeoLinks(result, currentSlug);
    return linkedContent;
  }
  
  return result;
}

// Extract key takeaways from content sections
function extractKeyTakeaways(sections: { type: string; title?: string; content: string }[]): string[] {
  const takeaways: string[] = [];
  sections.forEach(section => {
    if (section.title) {
      // Clean the title and add as takeaway
      const clean = section.title.replace(/\*\*/g, '').trim();
      if (clean.length > 10 && clean.length < 120) {
        takeaways.push(clean);
      }
    }
  });
  return takeaways.slice(0, 6);
}

// Section accent colors for visual variety
const sectionAccents = [
  { border: "border-l-primary", bg: "bg-primary/5", icon: "text-primary", badge: "bg-primary/10 text-primary" },
  { border: "border-l-violet-500", bg: "bg-violet-500/5", icon: "text-violet-500", badge: "bg-violet-500/10 text-violet-600" },
  { border: "border-l-emerald-500", bg: "bg-emerald-500/5", icon: "text-emerald-500", badge: "bg-emerald-500/10 text-emerald-600" },
  { border: "border-l-amber-500", bg: "bg-amber-500/5", icon: "text-amber-500", badge: "bg-amber-500/10 text-amber-600" },
  { border: "border-l-rose-500", bg: "bg-rose-500/5", icon: "text-rose-500", badge: "bg-rose-500/10 text-rose-600" },
  { border: "border-l-cyan-500", bg: "bg-cyan-500/5", icon: "text-cyan-500", badge: "bg-cyan-500/10 text-cyan-600" },
  { border: "border-l-indigo-500", bg: "bg-indigo-500/5", icon: "text-indigo-500", badge: "bg-indigo-500/10 text-indigo-600" },
  { border: "border-l-pink-500", bg: "bg-pink-500/5", icon: "text-pink-500", badge: "bg-pink-500/10 text-pink-600" },
];

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useBlogPost(slug || "");
  const { data: allPosts = [] } = useBlogPosts();
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const [scrollSpeed, setScrollSpeed] = useState<'slow' | 'normal' | 'fast' | 'skimming'>('normal');
  const [adaptiveRemainingTime, setAdaptiveRemainingTime] = useState<string>("");
  const [wordsPerMinute, setWordsPerMinute] = useState(200);

  const wordCount = useMemo(() => {
    if (!post) return 0;
    return post.content.split(/\s+/).filter(word => word.length > 0).length;
  }, [post]);

  // Smart reading time estimator
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
      const pixelsPerSecond = timeDiff > 0 ? (scrollDiff / timeDiff) * 1000 : 0;
      
      scrollSpeeds.push(pixelsPerSecond);
      if (scrollSpeeds.length > SAMPLE_SIZE) scrollSpeeds.shift();
      
      const avgSpeed = scrollSpeeds.reduce((a, b) => a + b, 0) / scrollSpeeds.length;
      
      let newWpm = 200;
      let speedCategory: 'slow' | 'normal' | 'fast' | 'skimming' = 'normal';
      
      if (avgSpeed < 50) { newWpm = 150; speedCategory = 'slow'; }
      else if (avgSpeed < 200) { newWpm = 200; speedCategory = 'normal'; }
      else if (avgSpeed < 500) { newWpm = 350; speedCategory = 'fast'; }
      else { newWpm = 600; speedCategory = 'skimming'; }
      
      setScrollSpeed(speedCategory);
      setWordsPerMinute(prev => Math.round(prev * 0.7 + newWpm * 0.3));
      
      const remainingWords = Math.ceil(wordCount * (1 - readingProgress / 100));
      const remainingMinutes = Math.ceil(remainingWords / wordsPerMinute);
      
      if (remainingMinutes <= 0 || readingProgress >= 95) setAdaptiveRemainingTime("Almost done!");
      else if (remainingMinutes === 1) setAdaptiveRemainingTime("~1 min left");
      else if (remainingMinutes < 60) setAdaptiveRemainingTime(`~${remainingMinutes} min left`);
      else {
        const hours = Math.floor(remainingMinutes / 60);
        const mins = remainingMinutes % 60;
        setAdaptiveRemainingTime(`~${hours}h ${mins}m left`);
      }
      
      lastScrollTop = scrollTop;
      lastScrollTime = currentTime;
    };
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { calculateAdaptiveTime(); ticking = false; });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateAdaptiveTime();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, wordCount, readingProgress, wordsPerMinute]);

  const remainingReadTime = useMemo(() => {
    if (!post) return "";
    const totalMinutes = parseInt(post.readTime) || 5;
    const remaining = Math.ceil(totalMinutes * (1 - readingProgress / 100));
    if (remaining <= 0) return "< 1 min left";
    if (remaining === 1) return "1 min left";
    return `${remaining} min left`;
  }, [post, readingProgress]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
      setShowBackToTop(scrollTop > 400);
      
      const sections = document.querySelectorAll('[data-section-id]');
      let currentActive = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) currentActive = section.getAttribute('data-section-id') || "";
      });
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  }, [post, allPosts]);

  const contentSections = useMemo(() => {
    if (!post) return [];
    return parseContentToSections(post.content);
  }, [post]);

  const keyTakeaways = useMemo(() => extractKeyTakeaways(contentSections), [contentSections]);

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
        <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
          <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150 ease-out" style={{ width: `${readingProgress}%` }} />
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
      <div className="fixed top-0 left-0 w-full h-1.5 bg-muted/50 z-50 backdrop-blur-sm">
        <motion.div 
          className={`h-full relative ${
            scrollSpeed === 'slow' ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500' 
            : scrollSpeed === 'fast' ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500' 
            : scrollSpeed === 'skimming' ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500'
            : 'bg-gradient-to-r from-primary via-accent to-primary'
          }`}
          style={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-md animate-pulse ${
            scrollSpeed === 'slow' ? 'bg-emerald-500' 
            : scrollSpeed === 'fast' ? 'bg-amber-500' 
            : scrollSpeed === 'skimming' ? 'bg-rose-500'
            : 'bg-primary'
          }`} />
        </motion.div>
        {readingProgress > 5 && readingProgress < 95 && (
          <div 
            className={`absolute top-4 text-xs font-bold backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border transition-all flex items-center gap-1.5 ${
              scrollSpeed === 'slow' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
              : scrollSpeed === 'fast' ? 'bg-amber-50 text-amber-600 border-amber-200' 
              : scrollSpeed === 'skimming' ? 'bg-rose-50 text-rose-600 border-rose-200'
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
        {readingProgress >= 95 && (
          <div className="absolute top-4 right-4 text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
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
        <meta name="news_keywords" content={post.tags.slice(0, 10).join(', ')} />
        <meta name="original-source" content={`https://dibull.com/blog/${post.slug}`} />
        <meta name="syndication-source" content={`https://dibull.com/blog/${post.slug}`} />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://dibull.com/blog/${post.slug}` },
            "headline": post.title,
            "description": post.metaDescription,
            "image": { "@type": "ImageObject", "url": post.featuredImage, "width": 1200, "height": 630 },
            "datePublished": post.publishDate,
            "dateModified": post.publishDate,
            "author": { "@type": "Organization", "name": post.author, "url": "https://dibull.com" },
            "publisher": {
              "@type": "Organization", "name": "Digital Bull Technology",
              "logo": { "@type": "ImageObject", "url": "https://dibull.com/dibull_logo.png", "width": 600, "height": 60 },
              "url": "https://dibull.com"
            },
            "articleSection": post.category,
            "keywords": post.tags.join(', '),
            "wordCount": post.content.split(/\s+/).length,
            "inLanguage": "en-IN",
            "isAccessibleForFree": true,
            "copyrightHolder": { "@type": "Organization", "name": "Digital Bull Technology" },
            "copyrightYear": new Date(post.publishDate).getFullYear()
          })}
        </script>
      </Helmet>

      <Navbar />

      <div className="bg-gradient-to-b from-secondary/40 via-secondary/20 to-background min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
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
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary font-medium truncate max-w-[200px]">{post.category}</span>
            </nav>
            
            <AnimatedSection direction="up">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(post.category)} flex items-center justify-center shadow-lg`}>
                    {(() => { const IC = getCategoryIcon(post.category); return <IC className="w-6 h-6 text-white" />; })()}
                  </div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-2 text-sm font-semibold">
                    {post.category}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
                  {post.metaDescription}
                </p>
                
                {/* Meta Info Bar */}
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

                  <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border border-border/50">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{wordCount.toLocaleString()} words</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12">
          <div className="container px-4">
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 max-w-7xl mx-auto">
              
              {/* Main Content */}
              <div className="space-y-8">
                {/* Hero Graphic Card */}
                <AnimatedSection direction="up">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl opacity-50 blur-md group-hover:opacity-75 transition-opacity" />
                    <Card className={`relative overflow-hidden border-0 shadow-2xl rounded-2xl bg-gradient-to-br ${getCategoryGradient(post.category)}`}>
                      <div className="relative h-72 md:h-96">
                        <div className="absolute inset-0 opacity-15 text-white" style={getPatternStyle(0)} />
                        <div className="absolute top-10 right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-float" />
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/15 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative group-hover:scale-110 transition-transform duration-700">
                            <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-[2] animate-pulse" />
                            {(() => { const IC = getCategoryIcon(post.category); return <IC className="relative w-28 h-28 md:w-40 md:h-40 text-white drop-shadow-2xl" strokeWidth={0.8} />; })()}
                          </div>
                        </div>
                        
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

                {/* Key Takeaways Card */}
                {keyTakeaways.length > 2 && (
                  <AnimatedSection direction="up" delay={0.1}>
                    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-primary/10">
                      <div className="bg-gradient-to-r from-primary to-accent px-8 py-4">
                        <h3 className="font-bold text-lg text-primary-foreground flex items-center gap-2">
                          <Bookmark className="w-5 h-5" />
                          Key Takeaways
                        </h3>
                        <p className="text-sm text-primary-foreground/80">What you'll learn from this article</p>
                      </div>
                      <CardContent className="p-6">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {keyTakeaways.map((takeaway, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.08, duration: 0.4 }}
                              className="flex items-start gap-3 p-3 rounded-xl bg-card/80 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group cursor-default"
                            >
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${sectionAccents[idx % sectionAccents.length].badge}`}>
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                                {takeaway}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )}

                {/* Content Sections as Enhanced Cards */}
                {contentSections.map((section, index) => {
                  const sectionNumber = contentSections.slice(0, index + 1).filter(s => s.type === 'section').length;
                  const accent = sectionAccents[(sectionNumber - 1) % sectionAccents.length];
                  
                  return (
                    <AnimatedSection key={index} direction="up" delay={index * 0.05}>
                      {section.type === 'intro' && (
                        <Card className="border-0 shadow-lg rounded-2xl bg-card overflow-hidden">
                          <CardContent className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-accent" />
                              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Introduction</span>
                            </div>
                            <div 
                              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed [&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary [&_a]:transition-colors text-lg"
                              style={{ lineHeight: '1.9' }}
                              dangerouslySetInnerHTML={{ 
                                __html: injectSeoLinks(
                                  section.content
                                    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground">$1</strong>')
                                    .replace(/\n\n/g, '</p><p class="mb-4">'),
                                  slug
                                ).content
                              }} 
                            />
                          </CardContent>
                        </Card>
                      )}

                      {section.type === 'section' && (
                        <Card 
                          id={`section-${index}`}
                          data-section-id={`section-${index}`}
                          className={`border-0 shadow-lg rounded-2xl bg-card hover:shadow-xl transition-all duration-300 scroll-mt-24 overflow-hidden border-l-4 ${accent.border}`}
                        >
                          <CardContent className="p-8 md:p-10">
                            {/* Section Header */}
                            <div className="flex items-start gap-4 mb-6">
                              <motion.div 
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${accent.badge}`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {sectionNumber}
                              </motion.div>
                              <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                                  {section.title}
                                </h2>
                              </div>
                            </div>
                            
                            <div className={`w-full h-px mb-6 ${accent.bg} bg-gradient-to-r from-transparent via-current to-transparent opacity-30`} 
                              style={{ backgroundImage: `linear-gradient(to right, transparent, currentColor, transparent)` }} />
                            
                            <div 
                              className="prose prose-lg max-w-none text-muted-foreground [&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary [&_a]:transition-colors [&_a]:font-medium"
                              style={{ lineHeight: '1.9' }}
                              dangerouslySetInnerHTML={{ __html: formatSectionContent(section.content, true, slug) }}
                            />
                          </CardContent>
                        </Card>
                      )}

                      {section.type === 'tip' && (
                        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden border-l-4 border-l-amber-500">
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                            <CardContent className="p-8">
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                  <Lightbulb className="w-6 h-6 text-white" />
                                </motion.div>
                                <div>
                                  <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">
                                    {section.title || 'Actionable Tip'}
                                  </h3>
                                  <span className="text-xs text-amber-600/70">Pro Insight</span>
                                </div>
                              </div>
                              
                              <div 
                                className="text-foreground leading-relaxed [&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary [&_a]:transition-colors"
                                style={{ lineHeight: '1.8' }}
                                dangerouslySetInnerHTML={{ __html: formatSectionContent(section.content, true, slug) }}
                              />
                            </CardContent>
                          </div>
                        </Card>
                      )}
                    </AnimatedSection>
                  );
                })}

                {/* Fallback raw content */}
                {contentSections.length === 0 && (
                  <AnimatedSection direction="up">
                    <Card className="border-0 shadow-lg rounded-2xl bg-card">
                      <CardContent className="p-8">
                        <div 
                          className="prose prose-lg max-w-none text-muted-foreground [&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary [&_a]:transition-colors"
                          style={{ lineHeight: '1.8' }}
                          dangerouslySetInnerHTML={{ __html: formatSectionContent(post.content, true, slug) }}
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
                            <Badge variant="outline" className="px-4 py-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer border-border">
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                {/* Questions CTA Card - Enhanced */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                    <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/10">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
                      <CardContent className="p-8 relative">
                        <div className="flex items-start gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                            <MessageCircle className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-2xl text-foreground mb-2">Have questions about this article?</h3>
                            <p className="text-muted-foreground mb-5 text-lg">
                              Our team of digital marketing experts is here to help you implement these strategies.
                            </p>
                            <div className="flex flex-wrap gap-3">
                              <Link to="/contact">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 shadow-lg">
                                  Get Expert Help
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </Link>
                              <Link to="/services">
                                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                  Explore Services
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </AnimatedSection>

                {/* Share Section */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-lg rounded-2xl bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <span className="font-semibold text-foreground block">Share this article</span>
                          <span className="text-sm text-muted-foreground">Help others discover this insight</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {[
                            { icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, label: "Twitter", color: "hover:bg-sky-500" },
                            { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, label: "Facebook", color: "hover:bg-blue-600" },
                            { icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`, label: "LinkedIn", color: "hover:bg-blue-700" },
                          ].map((social, idx) => (
                            <motion.a 
                              key={idx}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-3 rounded-full bg-muted ${social.color} hover:text-white transition-all shadow-sm hover:shadow-md`}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              title={`Share on ${social.label}`}
                            >
                              <social.icon className="w-5 h-5" />
                            </motion.a>
                          ))}
                          <motion.button 
                            onClick={handleCopyLink}
                            className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                          </motion.button>
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
                            <motion.div 
                              className="group p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                              whileHover={{ y: -4, scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md`}>
                                <service.icon className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{service.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                              <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Learn more <ArrowRight className="w-3 h-3" />
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                {/* Authority Resources */}
                <AnimatedSection direction="up">
                  <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-8 py-5 border-b border-border">
                      <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-blue-600" />
                        Authority Resources
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Trusted external sources for deeper learning</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {getCategoryAuthorityLinks(post.category).map((resource, idx) => (
                          <a key={idx} href={resource.href} target="_blank" rel="noopener noreferrer"
                            className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Globe className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors mb-1 flex items-center gap-1">
                                {resource.title}
                                <ExternalLink className="w-3 h-3 opacity-50" />
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">{resource.href}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                {/* Recommended Reading */}
                {relatedPosts.length > 0 && (
                  <AnimatedSection direction="up">
                    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-8 py-5 border-b border-border">
                        <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-violet-600" />
                          Recommended Reading
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">Continue learning with related articles</p>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {relatedPosts.map((relatedPost, idx) => (
                            <Link key={idx} to={`/blog/${relatedPost.slug}`}
                              className="group flex items-start gap-4 p-4 rounded-xl border border-border hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
                            >
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(relatedPost.category)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                {(() => { const IC = getCategoryIcon(relatedPost.category); return <IC className="w-6 h-6 text-white" />; })()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground group-hover:text-violet-600 transition-colors mb-1 line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{relatedPost.readTime}</span>
                                  <Badge variant="outline" className="text-[10px] py-0.5">{relatedPost.category}</Badge>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-violet-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )}
              </div>

              {/* Floating Social Share - Desktop */}
              <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-40">
                <div className="bg-card rounded-2xl shadow-lg p-3 space-y-3 border border-border/50">
                  {[
                    { icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}` },
                    { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                    { icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}` },
                  ].map((s, i) => (
                    <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
                      whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                    >
                      <s.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                  <motion.button onClick={handleCopyLink}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
                    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>

              {/* Sidebar */}
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
                          const sectionId = `section-${index}`;
                          const isActive = activeSection === sectionId;
                          const sectionNumber = contentSections.slice(0, index + 1).filter(s => s.type === 'section').length;
                          const accent = sectionAccents[(sectionNumber - 1) % sectionAccents.length];

                          return (
                            <a key={sectionId} href={`#${sectionId}`}
                              onClick={(e) => { e.preventDefault(); document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }); }}
                              className={`flex items-start gap-3 p-3 rounded-xl transition-all text-sm ${
                                isActive ? `${accent.bg} font-medium` : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isActive ? accent.badge : 'bg-muted text-muted-foreground'
                              }`}>
                                {sectionNumber}
                              </span>
                              <span className={`line-clamp-2 ${isActive ? accent.icon : ''}`}>{section.title}</span>
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
                      <p className="text-muted-foreground mb-4">Digital Marketing Experts</p>
                      <div className="flex items-center justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
                      </div>
                      <Link to="/about-us">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                          About Our Team
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter CTA */}
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="relative p-7 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                        <Send className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">Get Weekly Insights</h3>
                      <p className="text-white/80 text-sm mb-5 leading-relaxed">
                        Join 5,000+ marketers receiving our top strategies directly in their inbox.
                      </p>
                      <Link to="/contact">
                        <Button className="w-full bg-white text-violet-700 hover:bg-white/90 font-semibold shadow-lg">
                          Subscribe Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* SEO Badge Card */}
                <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-800/50">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Link2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">SEO Optimized</h4>
                        <p className="text-xs text-muted-foreground">Enhanced with quality links</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { label: "Internal Links", value: "3-5", color: "bg-primary" },
                        { label: "Authority Links", value: "1-3", color: "bg-blue-500" },
                        { label: "SEO Score", value: "Excellent", color: "bg-emerald-500", isGreen: true },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-background/60">
                          <span className="text-muted-foreground flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${item.color}`} />
                            {item.label}
                          </span>
                          <span className={`font-semibold ${item.isGreen ? 'text-emerald-600' : 'text-foreground'}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Need Help CTA Card */}
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <div className="relative p-8 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-full blur-2xl" />
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
                          <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="block group">
                            <div className="flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors">
                              <div className={`w-16 h-14 rounded-lg flex-shrink-0 bg-gradient-to-br ${getCategoryGradient(relatedPost.category)} flex items-center justify-center`}>
                                {(() => { const IC = getCategoryIcon(relatedPost.category); return <IC className="w-7 h-7 text-white" strokeWidth={1.5} />; })()}
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

        {/* More Articles Section - Enhanced Cards */}
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container px-4">
            <AnimatedSection direction="up">
              <div className="text-center mb-14">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 px-4 py-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Reading
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  More Expert Insights
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                  Explore more articles to enhance your digital marketing knowledge
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {allPosts.filter(p => p.id !== post.id).slice(0, 3).map((p, index) => {
                const IconComponent = getCategoryIcon(p.category);
                return (
                  <StaggerItem key={p.id}>
                    <Link to={`/blog/${p.slug}`}>
                      <motion.div
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl bg-card">
                          {/* Card Graphic */}
                          <div className={`aspect-[16/10] overflow-hidden relative bg-gradient-to-br ${getCategoryGradient(p.category)}`}>
                            <div className="absolute inset-0 opacity-10 text-white" style={getPatternStyle(index)} />
                            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700" style={{ transitionDelay: '100ms' }} />
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                className="relative"
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 200 }}
                              >
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150" />
                                <IconComponent className="relative w-16 h-16 text-white drop-shadow-lg" strokeWidth={1.2} />
                              </motion.div>
                            </div>
                            
                            <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-white" />
                              <span className="text-white text-xs font-medium">{p.readTime}</span>
                            </div>
                            
                            {/* Category Badge */}
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-white/90 text-primary text-xs font-semibold shadow-sm">
                                {p.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                              {p.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {p.metaDescription}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(p.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              <span className="flex items-center text-sm text-primary font-semibold group-hover:translate-x-1 transition-transform">
                                Read More
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <div className="text-center mt-12">
              <Link to="/blog">
                <Button variant="outline" size="lg" className="px-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default BlogDetailPage;
