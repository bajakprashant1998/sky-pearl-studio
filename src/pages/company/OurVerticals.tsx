import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem, CountUp } from "@/components/AnimatedSection";
import { livePlatforms } from "@/data/verticalsData";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Rocket, 
  Briefcase,
  Star,
  ShoppingBag,
  Gamepad2,
  Pill,
  Palette,
  Clapperboard,
  FileArchive,
  ArrowRight,
  Sparkles,
  Layers,
  Target,
  Zap,
  Users,
  TrendingUp,
  Building2,
  Award,
  CheckCircle2,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const upcomingPlatforms = [
  {
    name: "HireForJob",
    tagline: "Global Job Portal",
    website: "www.hireforjob.com",
    url: "https://www.hireforjob.com",
    description: "A next-generation recruitment platform connecting global talent with employers across industries.",
    icon: Briefcase,
    color: "from-indigo-500 to-indigo-300"
  },
  {
    name: "KundliChart",
    tagline: "Astrology Portal",
    website: "www.kundlichart.com",
    url: "https://www.kundlichart.com",
    description: "An advanced astrology platform offering personalized kundli charts, predictions, and life insights.",
    icon: Star,
    color: "from-amber-500 to-amber-300"
  },
  {
    name: "MakeOnIndia",
    tagline: "Marketplace & E-Commerce",
    website: "www.makeonindia.com",
    url: "https://www.makeonindia.com",
    description: "A 'Make in India' driven marketplace empowering Indian brands, manufacturers, and entrepreneurs.",
    icon: ShoppingBag,
    color: "from-orange-500 to-orange-300"
  },
  {
    name: "GameToxic",
    tagline: "Gaming Development Platform",
    website: "www.gametoxic.com",
    url: "https://www.gametoxic.com",
    description: "A future-ready gaming ecosystem for players, developers, and esports communities.",
    icon: Gamepad2,
    color: "from-red-500 to-red-300"
  },
  {
    name: "DrugsEffect",
    tagline: "Medicine Directory",
    website: "www.drugseffect.com",
    url: "https://www.drugseffect.com",
    description: "A comprehensive healthcare and medicine information portal for users and professionals.",
    icon: Pill,
    color: "from-teal-500 to-teal-300"
  },
  {
    name: "YourDesignStory",
    tagline: "Artist & Creative Portal",
    website: "www.yourdesignstory.com",
    url: "https://www.yourdesignstory.com",
    description: "A digital stage for artists, designers, and creative professionals to showcase and grow.",
    icon: Palette,
    color: "from-fuchsia-500 to-fuchsia-300"
  },
  {
    name: "HindiFilmCinema",
    tagline: "Hindi Film Industry Portal",
    website: "www.hindifilmcinema.com",
    url: "https://www.hindifilmcinema.com",
    description: "A complete Bollywood hub with film news, reviews, trailers, interviews, and industry articles.",
    icon: Clapperboard,
    color: "from-rose-500 to-rose-300"
  },
  {
    name: "FilesBundle",
    tagline: "Digital Files Marketplace",
    website: "www.filesbundle.com",
    url: "https://www.filesbundle.com",
    description: "A marketplace for listing, selling, and downloading digital assets like templates, design files, and tools.",
    icon: FileArchive,
    color: "from-cyan-500 to-cyan-300"
  }
];

const ecosystemStats = [
  { value: 14, suffix: "+", label: "Digital Platforms", icon: Globe },
  { value: 5, suffix: "M+", label: "Global Users", icon: Users },
  { value: 180, suffix: "+", label: "Countries Reached", icon: Building2 },
  { value: 10, suffix: "+", label: "Industries Served", icon: TrendingUp },
];

const industryCategories = [
  { name: "Architecture & CAD", icon: Building2, platforms: 1, color: "from-blue-500 to-cyan-500" },
  { name: "Technology & Media", icon: Zap, platforms: 1, color: "from-purple-500 to-violet-500" },
  { name: "Entertainment", icon: Clapperboard, platforms: 2, color: "from-pink-500 to-rose-500" },
  { name: "Real Estate", icon: Building2, platforms: 1, color: "from-emerald-500 to-green-500" },
  { name: "Healthcare", icon: Pill, platforms: 1, color: "from-teal-500 to-cyan-500" },
  { name: "Employment", icon: Briefcase, platforms: 1, color: "from-indigo-500 to-blue-500" },
];

const OurVerticals = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Our Verticals | Digital Bull Technology - Global Digital Ecosystems</title>
        <meta 
          name="description" 
          content="Explore Digital Bull Technology's diverse portfolio of industry-leading digital platforms across architecture, engineering, technology, real estate, entertainment, and more." 
        />
        <meta 
          name="keywords" 
          content="digital platforms, technology verticals, CAD library, job portal, real estate, gaming, healthcare, creative platforms, Digital Bull" 
        />
        <link rel="canonical" href="https://dibull.com/our-verticals" />
        <meta property="og:title" content="Our Verticals | Digital Bull Technology" />
        <meta property="og:description" content="Building world-class digital platforms across industries." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Globe Network Visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="w-[600px] h-[600px] text-primary" />
          </motion.div>
        </div>

        <motion.div 
          className="container relative z-10 px-4 py-20"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full border border-primary/30 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Powering Global Industries</span>
              <motion.div
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            </motion.div>
            
            {/* Heading */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our{" "}
              <span className="relative inline-block">
                <span className="text-gradient">Verticals</span>
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full" 
                  viewBox="0 0 200 12" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.path 
                    d="M2 10C50 2 150 2 198 10" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                </motion.svg>
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Building world-class digital platforms across industries
            </motion.p>
            
            {/* Description */}
            <motion.p 
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Digital Bull Technology Pvt. Ltd. creates powerful niche-based platforms across architecture, 
              engineering, technology, real estate, marketing, gaming, healthcare, entertainment, and employment. 
              Each vertical is designed to solve real-world industry challenges and empower global communities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                variant="hero"
                size="lg" 
                className="group text-base px-8"
                onClick={() => document.getElementById('live-platforms')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center">
                  Explore Our Ecosystem
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="group text-base"
                asChild
              >
                <Link to="/contact">
                  <Layers className="w-5 h-5 mr-2" />
                  Partner With Us
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/20 rounded-full blur-3xl"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ecosystemStats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={0.1 * index}>
                <motion.div 
                  className="text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-foreground/80" />
                  <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className="text-primary-foreground/70 font-medium">{stat.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Categories Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up" className="text-center mb-12">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Layers className="w-4 h-4" />
              Diverse Portfolio
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Industries We <span className="text-gradient">Transform</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platforms span multiple sectors, each solving unique industry challenges
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {industryCategories.map((category, index) => (
              <AnimatedSection key={category.name} delay={index * 0.1}>
                <motion.div 
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <div className="flex items-center gap-4 relative">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <category.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.platforms} Platform{category.platforms > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Live Platforms Section */}
      <section id="live-platforms" className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container px-4 relative z-10">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <motion.div 
                className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Play className="w-4 h-4 fill-current" />
                </motion.div>
                <span className="font-semibold">Live & Operational</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                🌍 Live <span className="text-gradient">Platforms</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our portfolio of active platforms serving millions of users globally
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livePlatforms.map((platform, index) => (
              <StaggerItem key={index}>
                <Link 
                  to={`/our-verticals/${platform.id}`}
                  className="block h-full"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden">
                      <CardContent className="p-0">
                        {/* Header with Gradient */}
                        <div className={`bg-gradient-to-br ${platform.color} p-6 relative overflow-hidden`}>
                          {/* Animated pattern */}
                          <motion.div 
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                              backgroundSize: "20px 20px"
                            }}
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          />
                          
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 font-bold shadow-lg">
                              <motion.div
                                className="w-2 h-2 bg-green-400 rounded-full mr-2"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              LIVE
                            </Badge>
                          </div>
                          <motion.div 
                            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            <platform.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-white mb-1 relative z-10">{platform.name}</h3>
                          <p className="text-white/90 font-medium relative z-10">{platform.tagline}</p>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {platform.description}
                          </p>
                          
                          {/* Stats preview */}
                          <div className="flex gap-4 mb-4">
                            {platform.stats.slice(0, 2).map((stat, i) => (
                              <div key={i} className="text-center">
                                <div className="text-lg font-bold text-primary">{stat.value}</div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-primary font-medium text-sm">{platform.website}</span>
                            <div className="flex items-center gap-1 text-primary">
                              <span className="text-sm font-medium">Explore</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Upcoming Platforms Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }} />

        <div className="container px-4 relative">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <motion.div 
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Rocket className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold">Coming Soon</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                🚀 Upcoming <span className="text-gradient">Platforms</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Innovative platforms in development, launching soon to transform industries
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingPlatforms.map((platform, index) => (
              <StaggerItem key={index}>
                <Link 
                  to={`/our-verticals/upcoming/${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block h-full"
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group overflow-hidden bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        {/* Header with Gradient */}
                        <div className={`bg-gradient-to-br ${platform.color} p-5 relative overflow-hidden`}>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-white/90 text-muted-foreground border-0 font-semibold text-xs">
                              UPCOMING
                            </Badge>
                          </div>
                          <motion.div 
                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            <platform.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <h3 className="text-xl font-bold text-white mb-0.5">{platform.name}</h3>
                          <p className="text-white/80 text-sm font-medium">{platform.tagline}</p>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
                            {platform.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary/70 font-medium text-sm truncate">{platform.website}</span>
                            <span className="text-primary text-sm font-medium flex items-center gap-1">
                              View <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Our Platforms */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up" className="text-center mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4" />
              Our Approach
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Our Platforms <span className="text-gradient">Succeed</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "Niche Focus", desc: "Deep specialization in specific industries for maximum impact" },
              { icon: Users, title: "User-Centric", desc: "Built around real user needs with intuitive experiences" },
              { icon: Zap, title: "Innovation", desc: "Cutting-edge technology powering every platform" },
              { icon: TrendingUp, title: "Scalability", desc: "Designed to grow with global user demands" },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <motion.div 
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-primary/90 to-blue-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-10 left-10 w-40 h-40 border border-white/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-60 h-60 border border-white/10 rounded-full"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="container px-4 relative z-10">
          <AnimatedSection direction="up">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="w-5 h-5" />
                <span className="font-semibold">Our Mission</span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Vision
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                To build world-class digital ecosystems that empower professionals, creators, and businesses 
                across industries—through innovation, technology, and scalable platforms shaping the future 
                of the digital world.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    className="group bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-2xl"
                    asChild
                  >
                    <Link to="/contact">
                      <Layers className="w-5 h-5 mr-2" />
                      Partner With Us
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group border-2 border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                    onClick={() => document.getElementById('live-platforms')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Explore Platforms
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OurVerticals;