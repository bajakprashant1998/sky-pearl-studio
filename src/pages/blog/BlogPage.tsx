import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { useBlogPosts, useBlogCategories } from "@/hooks/useBlogPosts";
import { blogCategories } from "@/data/blogData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search,
  Tag,
  Sparkles,
  TrendingUp,
  Newspaper,
  Zap,
  Users,
  Loader2,
  BarChart3,
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
  Lightbulb,
  Settings
} from "lucide-react";

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

// Get background pattern based on index
const getPatternStyle = (index: number) => {
  const patterns = [
    { backgroundImage: "radial-gradient(circle at 20% 80%, currentColor 2px, transparent 2px)", backgroundSize: "20px 20px" },
    { backgroundImage: "linear-gradient(45deg, currentColor 1px, transparent 1px)", backgroundSize: "12px 12px" },
    { backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" },
    { backgroundImage: "linear-gradient(0deg, currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" },
  ];
  return patterns[index % patterns.length];
};

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allPosts = [], isLoading } = useBlogPosts();
  const { data: categories = blogCategories } = useBlogCategories();

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Blog | Digital Marketing Insights & Trends | Digital Bull Technology</title>
        <meta 
          name="description" 
          content="Stay updated with the latest digital marketing trends, SEO strategies, AI marketing insights, and web development best practices from Digital Bull experts in Ahmedabad." 
        />
        <meta 
          name="keywords" 
          content="digital marketing blog, SEO tips, AI marketing, web development, social media marketing, online business growth, Digital Bull, Ahmedabad digital marketing" 
        />
        <link rel="canonical" href="https://dibull.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog | Digital Marketing Insights & Trends | Digital Bull Technology" />
        <meta property="og:description" content="Expert insights on digital marketing, SEO, AI, and web development from Ahmedabad's leading digital agency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dibull.com/blog" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Digital Marketing Insights & Trends" />
        <meta name="twitter:description" content="Expert insights on digital marketing, SEO, AI, and web development." />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Digital Bull Technology" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        
        {/* Blog Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Digital Bull Technology Blog",
            "description": "Expert insights on digital marketing, SEO, AI, and web development",
            "url": "https://dibull.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Digital Bull Technology",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dibull.com/dibull_logo.png"
              }
            },
            "inLanguage": "en-IN"
          })}
        </script>
        
        {/* BreadcrumbList Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dibull.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://dibull.com/blog"
              }
            ]
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero Section - Ultra Premium Design */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Animated Floating Elements */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="container relative z-10 px-4">
          <AnimatedSection direction="up">
            <div className="text-center max-w-4xl mx-auto">
              {/* Premium Badge with Glow */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-background to-accent/10 backdrop-blur-md border border-primary/20 rounded-full px-6 py-3 mb-8 shadow-lg shadow-primary/5">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI-Powered Insights • Updated Hourly</span>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                Digital Marketing <br />
                <span className="relative">
                  <span className="text-gradient">Knowledge Hub</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" className="animate-draw-line" />
                    <defs>
                      <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Expert insights, cutting-edge strategies, and industry trends to 
                <span className="text-primary font-semibold"> dominate the digital landscape.</span>
              </p>

              {/* Search Bar - Ultra Premium */}
              <div className="relative max-w-xl mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl" />
                <div className="relative bg-background/90 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl shadow-primary/5 p-2 transition-all group-hover:border-primary/30">
                  <div className="flex items-center gap-3">
                    <Search className="w-6 h-6 text-muted-foreground ml-4" />
                    <input
                      type="text"
                      placeholder="Search articles, topics, trends..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent py-4 text-lg outline-none placeholder:text-muted-foreground/50"
                    />
                    <Button size="lg" className="rounded-xl px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Stats - Glassmorphism Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
                {[
                  { icon: Newspaper, label: "Total Articles", value: `${allPosts.length}+`, color: "from-primary to-blue-600" },
                  { icon: Tag, label: "Categories", value: `${categories.length - 1}`, color: "from-violet-500 to-purple-600" },
                  { icon: Users, label: "Monthly Readers", value: "50K+", color: "from-emerald-500 to-teal-600" },
                  { icon: Zap, label: "AI Updates", value: "2/Hour", color: "from-amber-500 to-orange-600" }
                ].map((stat, i) => (
                  <div key={i} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`} />
                    <div className="relative bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-5 hover:border-primary/30 transition-all hover:-translate-y-1 duration-300">
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter - Ultra Premium */}
      <section className="py-4 border-y border-border/30 sticky top-16 lg:top-20 bg-background/80 backdrop-blur-xl z-40">
        <div className="container px-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground hidden md:block mr-2">Filter:</span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
              {categories.map((category) => {
                const count = category === "All" 
                  ? allPosts.length 
                  : allPosts.filter(p => p.category === category).length;
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-full px-4 transition-all duration-300 ${
                      selectedCategory === category 
                        ? "shadow-lg shadow-primary/25 scale-105" 
                        : "hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {category}
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === category 
                        ? "bg-white/20" 
                        : "bg-muted"
                    }`}>
                      {count}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post - Ultra Premium with Animated Border */}
      {selectedCategory === "All" && !searchQuery && featuredPost && !isLoading && (
        <section className="py-16">
          <div className="container px-4">
            <AnimatedSection direction="up">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Featured Article</h2>
                  <p className="text-sm text-muted-foreground">Hand-picked for you</p>
                </div>
              </div>

              <Link to={`/blog/${featuredPost.slug}`}>
                <div className="relative group">
                  {/* Animated Gradient Border */}
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded-3xl opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500 animate-gradient-x" />
                  
                  <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-card rounded-3xl">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Icon & Infographic Section */}
                      <div className={`relative aspect-video lg:aspect-auto lg:min-h-[520px] overflow-hidden bg-gradient-to-br ${getCategoryGradient(featuredPost.category)}`}>
                        {/* Pattern Overlay */}
                        <div 
                          className="absolute inset-0 opacity-10 text-white"
                          style={getPatternStyle(0)}
                        />
                        
                        {/* Animated Floating Elements */}
                        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" />
                        <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
                        
                        {/* Main Icon with Glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative group-hover:scale-110 transition-transform duration-700">
                            <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-[2] animate-pulse" />
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150" />
                            {(() => {
                              const IconComponent = getCategoryIcon(featuredPost.category);
                              return <IconComponent className="relative w-36 h-36 lg:w-52 lg:h-52 text-white drop-shadow-2xl" strokeWidth={0.8} />;
                            })()}
                          </div>
                        </div>
                        
                        {/* Enhanced Stats Bar */}
                        <div className="absolute bottom-6 left-6 right-6 flex gap-3 flex-wrap">
                          <div className="bg-white/25 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2 border border-white/20">
                            <TrendingUp className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">Trending Now</span>
                          </div>
                          <div className="bg-white/25 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2 border border-white/20">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">{featuredPost.readTime}</span>
                          </div>
                          <div className="bg-white/25 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2 border border-white/20">
                            <Users className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">2.5K reads</span>
                          </div>
                        </div>
                        
                        {/* Featured Badge with Animation */}
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-white text-primary px-5 py-2 text-sm font-bold shadow-xl animate-pulse">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Editor's Pick
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <CardContent className="p-8 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-background via-background to-primary/3">
                        <div className="flex items-center gap-3 mb-6">
                          <Badge variant="secondary" className="px-4 py-1.5 bg-primary/10 text-primary border-0">{featuredPost.category}</Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(featuredPost.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        
                        <h2 className="text-3xl lg:text-5xl font-bold mb-5 group-hover:text-primary transition-colors leading-tight tracking-tight">
                          {featuredPost.title}
                        </h2>
                        
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {featuredPost.metaDescription}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {featuredPost.tags.slice(0, 5).map(tag => (
                            <Badge key={tag} variant="outline" className="px-4 py-1.5 text-sm border-primary/20 hover:bg-primary/5 transition-colors">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-border/50">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            Expert Analysis
                          </span>
                          <div className="flex items-center text-primary font-bold text-lg group-hover:gap-4 gap-2 transition-all duration-300">
                            Read Full Article
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                              <ArrowRight className="w-5 h-5 text-primary-foreground group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Blog Posts Grid - Enhanced Cards */}
      <section className="py-16 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
                </h2>
                <p className="text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} available
                </p>
              </div>
            </div>
          </AnimatedSection>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-full overflow-hidden border-0 bg-card">
                  <div className="aspect-[16/10] w-full bg-gradient-to-br from-muted to-muted/50 animate-pulse flex items-center justify-center">
                    <Settings className="w-12 h-12 text-muted-foreground/30 animate-spin" />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <AnimatedSection direction="up">
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Search className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            </AnimatedSection>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === "All" && !searchQuery ? recentPosts : filteredPosts).map((post, index) => {
                const IconComponent = getCategoryIcon(post.category);
                return (
                  <StaggerItem key={post.id}>
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="h-full overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 border-0 bg-card">
                        {/* Icon Graphic Section */}
                        <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${getCategoryGradient(post.category)}`}>
                          {/* Pattern Overlay */}
                          <div 
                            className="absolute inset-0 opacity-10 text-white"
                            style={getPatternStyle(index)}
                          />
                          
                          {/* Floating Elements */}
                          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg" />
                          
                          {/* Main Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative group-hover:scale-110 transition-transform duration-500">
                              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150" />
                              <IconComponent className="relative w-16 h-16 lg:w-20 lg:h-20 text-white drop-shadow-lg" strokeWidth={1.5} />
                            </div>
                          </div>
                          
                          {/* Category Badge */}
                          <Badge className="absolute top-4 left-4 bg-white/90 text-foreground backdrop-blur-sm shadow-lg">
                            {post.category}
                          </Badge>
                          
                          {/* Read Time Pill */}
                          <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-white" />
                            <span className="text-white text-xs font-medium">{post.readTime}</span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {post.tags.length} Topics
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                            {post.metaDescription}
                          </p>
                          
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {post.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center text-primary font-medium text-sm pt-4 border-t border-border/50 group-hover:gap-3 gap-2 transition-all">
                            <Rocket className="w-4 h-4" />
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Popular Topics - Enhanced */}
      <section className="py-16">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 p-10 lg:p-16">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <Badge variant="outline" className="mb-4 px-4 py-2">
                    <Tag className="w-4 h-4 mr-2" />
                    Trending Topics
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    Explore Popular Topics
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Discover the most searched and trending topics in digital marketing
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                  {Array.from(new Set(allPosts.flatMap(post => post.tags))).slice(0, 15).map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="px-5 py-2.5 text-sm font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter CTA - Premium */}
      <section className="py-20">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-3xl">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
              
              {/* Decorative Blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 py-16 px-8 lg:px-16">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Stay Ahead of the Curve
                  </Badge>
                  
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Get Expert Insights Delivered
                  </h2>
                  
                  <p className="text-xl text-white/90 mb-10 leading-relaxed">
                    Join 50,000+ marketers receiving our weekly AI-curated digest of the latest trends, 
                    strategies, and insider tips in digital marketing.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl px-8">
                        Subscribe Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/services/digital-marketing">
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                        Explore Services
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
