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
  Sparkles
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

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.2) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="container relative z-10 px-4">
          <AnimatedSection direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Knowledge Hub
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Digital Marketing <span className="text-primary">Insights</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Expert insights, trends, and strategies to help you succeed in the digital landscape. 
                Stay ahead with our latest articles on SEO, AI marketing, web development, and more.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-lg z-40">
        <div className="container px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {blogCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && !searchQuery && (
        <section className="py-12">
          <div className="container px-4">
            <AnimatedSection direction="up">
              <Link to={`/blog/${featuredPost.slug}`}>
                <Card className="overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl group">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                      <Sparkles className="w-24 h-24 text-primary/30" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary">{featuredPost.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {featuredPost.metaDescription}
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
              </h2>
              <span className="text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          </AnimatedSection>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === "All" && !searchQuery ? recentPosts : filteredPosts).map((post) => (
                <StaggerItem key={post.id}>
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 group">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary/30" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.metaDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-primary text-sm font-medium flex items-center gap-1">
                            Read
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
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

      {/* Tags Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Tag className="w-6 h-6 text-primary" />
                Popular Topics
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 20).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer transition-colors"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-white/90 mb-8">
                Get the latest digital marketing insights delivered straight to your inbox.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Subscribe to Newsletter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
