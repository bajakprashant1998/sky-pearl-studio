import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Target,
  Megaphone,
  LineChart,
  Palette,
  Code,
  Mail,
  Share2,
  Brain,
  ShoppingCart,
  Video,
  BarChart3,
  Lightbulb,
  Rocket,
  TrendingUp,
  Zap,
} from "lucide-react";

// Category to icon mapping
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

const FeaturedBlogCarousel = () => {
  const { data: posts = [], isLoading } = useBlogPosts();
  const featuredPosts = posts.slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background via-secondary/30 to-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-0">
                <Skeleton className="aspect-[16/10] w-full" />
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container px-4 relative z-10">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Latest Insights
              </Badge>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              From Our <span className="text-primary relative">
                Knowledge Hub
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay ahead with expert insights on digital marketing, SEO strategies, and industry trends
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredPosts.map((post, index) => {
                const IconComponent = getCategoryIcon(post.category);
                return (
                  <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link to={`/blog/${post.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 border-0 bg-card relative">
                          {/* Hover glow effect */}
                          <motion.div 
                            className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(post.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                          />

                          {/* Icon Graphic Section */}
                          <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${getCategoryGradient(post.category)}`}>
                            {/* Pattern Overlay */}
                            <div 
                              className="absolute inset-0 opacity-10 text-white"
                              style={getPatternStyle(index)}
                            />
                            
                            {/* Floating Elements */}
                            <motion.div 
                              className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg" />
                            
                            {/* Main Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div 
                                className="relative"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150" />
                                <IconComponent className="relative w-16 h-16 lg:w-20 lg:h-20 text-white drop-shadow-lg" strokeWidth={1.5} />
                              </motion.div>
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
                          <CardContent className="p-6 relative">
                            <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                Trending
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {post.title}
                            </h3>
                            
                            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                              {post.metaDescription}
                            </p>
                            
                            <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                              <Rocket className="w-4 h-4" />
                              Read Article
                              <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                            </div>

                            {/* Bottom accent line */}
                            <motion.div 
                              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${getCategoryGradient(post.category)}`}
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all" />
              <CarouselNext className="static translate-y-0 bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all" />
            </div>
          </Carousel>
        </AnimatedSection>

        {/* View All CTA */}
        <AnimatedSection direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <Link to="/blog">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 group">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore All Articles
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedBlogCarousel;