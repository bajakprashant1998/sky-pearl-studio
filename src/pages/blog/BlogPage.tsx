import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { blogPosts, blogCategories, getBlogPostsByCategory } from "@/data/blogData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Users
} from "lucide-react";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = getBlogPostsByCategory(selectedCategory).filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Blog | Digital Marketing Insights & Trends | Digital Bull</title>
        <meta 
          name="description" 
          content="Stay updated with the latest digital marketing trends, SEO strategies, AI marketing insights, and web development best practices from Digital Bull experts." 
        />
        <meta 
          name="keywords" 
          content="digital marketing blog, SEO tips, AI marketing, web development, social media marketing, online business growth, Digital Bull" 
        />
        <link rel="canonical" href="https://dibull.com/blog" />
        <meta property="og:title" content="Blog | Digital Marketing Insights & Trends | Digital Bull" />
        <meta property="og:description" content="Expert insights on digital marketing, SEO, AI, and web development." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Hero Section - Premium Design */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10 px-4">
          <AnimatedSection direction="up">
            <div className="text-center max-w-4xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-8">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-semibold text-foreground">AI-Powered Insights • Updated Daily</span>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Digital Marketing <br />
                <span className="text-gradient">Knowledge Hub</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Expert insights, cutting-edge strategies, and industry trends to help you dominate the digital landscape. 
                <span className="text-primary font-medium"> Updated with AI-powered analysis.</span>
              </p>

              {/* Search Bar - Enhanced */}
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                <div className="relative bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl p-2">
                  <div className="flex items-center gap-3">
                    <Search className="w-6 h-6 text-muted-foreground ml-4" />
                    <input
                      type="text"
                      placeholder="Search articles, topics, trends..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent py-4 text-lg outline-none placeholder:text-muted-foreground/60"
                    />
                    <Button size="lg" className="rounded-xl px-6">
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
                {[
                  { icon: Newspaper, label: "Articles", value: `${blogPosts.length}+` },
                  { icon: Tag, label: "Topics", value: `${blogCategories.length - 1}` },
                  { icon: Users, label: "Readers", value: "50K+" },
                  { icon: Zap, label: "AI Updates", value: "Daily" }
                ].map((stat, i) => (
                  <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-all">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter - Enhanced */}
      <section className="py-6 border-y border-border/50 sticky top-16 lg:top-20 bg-background/95 backdrop-blur-xl z-40">
        <div className="container px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {blogCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-6 transition-all ${
                  selectedCategory === category 
                    ? "shadow-lg shadow-primary/25" 
                    : "hover:bg-primary/10"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post - Premium Card */}
      {selectedCategory === "All" && !searchQuery && (
        <section className="py-16">
          <div className="container px-4">
            <AnimatedSection direction="up">
              <Link to={`/blog/${featuredPost.slug}`}>
                <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative aspect-video lg:aspect-auto lg:min-h-[480px] overflow-hidden">
                      <img 
                        src={featuredPost.featuredImage} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold shadow-lg">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                        <Badge variant="secondary" className="mb-2">{featuredPost.category}</Badge>
                        <h2 className="text-2xl font-bold text-white mb-2">{featuredPost.title}</h2>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-background via-background to-primary/5">
                      <div className="flex items-center gap-3 mb-6">
                        <Badge variant="secondary" className="px-4 py-1">{featuredPost.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {featuredPost.metaDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {featuredPost.tags.slice(0, 4).map(tag => (
                          <Badge key={tag} variant="outline" className="px-3 py-1 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                        <div className="flex items-center text-primary font-semibold text-lg group-hover:gap-3 gap-2 transition-all">
                          Read Full Article
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
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

          {filteredPosts.length === 0 ? (
            <AnimatedSection direction="up">
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
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
              {(selectedCategory === "All" && !searchQuery ? recentPosts : filteredPosts).map((post) => (
                <StaggerItem key={post.id}>
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 border-0 bg-card">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-sm">
                          {post.category}
                        </Badge>
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
                            <Clock className="w-4 h-4" />
                            {post.readTime}
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
                        
                        <div className="flex items-center text-primary font-medium text-sm pt-4 border-t border-border/50">
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
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
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 15).map((tag) => (
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
