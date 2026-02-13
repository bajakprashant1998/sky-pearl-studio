import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  Star, 
  TrendingUp, 
  Users, 
  Zap,
  CheckCircle2,
  Filter
} from "lucide-react";
import { freeToolsData, ToolCategory } from "@/data/freeToolsData";

const toolCategories: { id: ToolCategory; label: string }[] = [
  { id: 'all', label: 'All Tools' },
  { id: 'seo', label: 'SEO' },
  { id: 'content', label: 'Content' },
  { id: 'design', label: 'Design' },
  { id: 'technical', label: 'Technical' },
];

const FreeToolsPage = () => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return freeToolsData.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = !searchQuery || 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const popularTools = useMemo(() => {
    return freeToolsData.filter(tool => tool.isPopular);
  }, []);

  const getCategoryCount = (category: ToolCategory) => {
    if (category === 'all') return freeToolsData.length;
    return freeToolsData.filter(t => t.category === category).length;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Marketing Tools | SEO Checker, AI Content Generator & More | Digital Bull</title>
        <meta
          name="description"
          content="Access 15+ free marketing tools including SEO checker, website speed test, AI content generator, keyword research tool, and more. Boost your digital marketing for free."
        />
        <meta
          name="keywords"
          content="free SEO tools, free marketing tools, SEO checker, speed test, AI content generator, keyword research, backlink checker, meta tag generator"
        />
        <link rel="canonical" href="https://dibull.com/free-tools" />
        <meta property="og:title" content="Free Marketing Tools | Digital Bull Technology" />
        <meta property="og:description" content="Access 15+ free marketing tools to boost your digital presence. SEO checker, AI generators, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dibull.com/free-tools" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Marketing Tools | Digital Bull Technology" />
        <meta name="twitter:description" content="Access 15+ free marketing tools to boost your digital presence." />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                100% Free - No Signup Required
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Free <span className="text-gradient">Marketing Tools</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Powerful tools to analyze, optimize, and grow your online presence. Used by thousands of marketers worldwide.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { icon: Zap, value: "15+", label: "Free Tools", color: "from-primary to-blue-600" },
                  { icon: CheckCircle2, value: "100%", label: "Free Forever", color: "from-green-500 to-emerald-600" },
                  { icon: Users, value: "50K+", label: "Users", color: "from-purple-500 to-violet-600" },
                  { icon: TrendingUp, value: "No", label: "Signup", color: "from-amber-500 to-orange-600" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-card/60 backdrop-blur-md border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-all"
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-8 border-b border-border/50 sticky top-16 lg:top-20 bg-background/95 backdrop-blur-md z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-card border-border"
                />
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto justify-start md:justify-end">
                <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                {toolCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap rounded-full px-4 transition-all ${
                      activeCategory === category.id 
                        ? "shadow-lg shadow-primary/25" 
                        : "hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {category.label}
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.id 
                        ? "bg-white/20" 
                        : "bg-muted"
                    }`}>
                      {getCategoryCount(category.id)}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        {activeCategory === 'all' && !searchQuery && (
          <section className="py-12 bg-gradient-to-b from-secondary/30 to-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Most Popular</h2>
                  <p className="text-sm text-muted-foreground">Our top-rated tools</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/free-tools/${tool.slug}`}>
                      <div className="relative h-full bg-card border-2 border-primary/20 rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                        {/* Popular Badge */}
                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                          <Star className="w-3 h-3 mr-1" /> Popular
                        </Badge>
                        
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <tool.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {tool.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {tool.usageCount} users
                          </span>
                          <span className="flex items-center text-primary text-sm font-medium">
                            Use Now
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Tools Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {activeCategory === 'all' ? 'All Tools' : toolCategories.find(c => c.id === activeCategory)?.label + ' Tools'}
                </h2>
                <p className="text-muted-foreground">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} available
                </p>
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link to={`/free-tools/${tool.slug}`}>
                      <div className="relative h-full bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                        {/* Badges */}
                        {tool.isNew && (
                          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                            New
                          </Badge>
                        )}
                        
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <tool.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {tool.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {tool.shortDescription}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {tool.category}
                          </Badge>
                          <span className="flex items-center text-primary text-sm font-medium">
                            Use Free
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need More Advanced Solutions?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Our free tools are great for getting started. For enterprise-grade solutions with advanced features, talk to our experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Get Custom Solutions <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/services">
                    Explore Services
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FreeToolsPage;
