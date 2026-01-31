import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Star, Users, TrendingUp, Award, Zap, Target, BarChart3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const clients = [
  { name: "HireForJob", logo: "H" },
  { name: "Cadbull", logo: "C" },
  { name: "CastingScreen", logo: "CS" },
  { name: "Shuttech", logo: "S" },
  { name: "GiftCity", logo: "G" },
];

const features = [
  { text: "SEO & Content Marketing", icon: Target },
  { text: "PPC & Social Ads", icon: BarChart3 },
  { text: "Web Design & Development", icon: Zap },
  { text: "AI-Powered Marketing", icon: Sparkles },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">Rated #1 Digital Agency in India</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Scale Your Business with{" "}
              <span className="relative inline-block">
                <span className="text-gradient">Data-Driven</span>
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
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                </motion.svg>
              </span>{" "}
              Marketing
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We help ambitious businesses increase revenue, generate qualified leads, and
              dominate their market through strategic digital marketing solutions.
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.text} 
                  className="flex items-center gap-2 text-sm text-muted-foreground group cursor-default"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="group-hover:text-foreground transition-colors">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button variant="hero" size="lg" className="group text-base px-8 relative overflow-hidden" asChild>
                <Link to="/contact">
                  <span className="relative z-10 flex items-center">
                    Get Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600"
                    initial={false}
                    whileHover={{ scale: 1.05 }}
                  />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group text-base" asChild>
                <Link to="/case-studies">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                  View Success Stories
                </Link>
              </Button>
            </motion.div>

            {/* Client Logos */}
            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-muted-foreground mb-4">Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                {clients.map((client, index) => (
                  <motion.div
                    key={client.name}
                    className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-sm font-bold text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer"
                    title={client.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                  >
                    {client.logo}
                  </motion.div>
                ))}
                <motion.span 
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  +500 more
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats Dashboard */}
          <div className="relative hidden lg:block">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main Dashboard Card */}
              <div className="bg-card rounded-3xl border border-border shadow-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Marketing Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Real-time analytics</p>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium flex items-center gap-1">
                    <motion.span 
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Live
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20"
                    whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.5)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Traffic</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">+247%</div>
                    <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <motion.span
                        animate={{ y: [-1, 1, -1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ↑
                      </motion.span>
                      12% vs last month
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/20"
                    whileHover={{ scale: 1.02, borderColor: "hsl(var(--accent) / 0.5)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-accent" />
                      <span className="text-xs text-muted-foreground">Leads</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">10.2M</div>
                    <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <motion.span
                        animate={{ y: [-1, 1, -1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      >
                        ↑
                      </motion.span>
                      8% vs last month
                    </div>
                  </motion.div>
                </div>

                {/* Animated Chart */}
                <div className="h-32 bg-muted/50 rounded-xl flex items-end justify-between px-4 pb-4 gap-2 overflow-hidden">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-sm cursor-pointer"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                      whileHover={{ 
                        scaleY: 1.1, 
                        background: "linear-gradient(to top, hsl(var(--accent)), hsl(var(--accent) / 0.5))" 
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-card rounded-2xl p-4 shadow-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">$12M+</div>
                    <div className="text-xs text-muted-foreground">Revenue Generated</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  animate={{ y: [2, -2, 2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">4.9/5</div>
                    <div className="text-xs text-muted-foreground">Client Rating</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* New floating notification */}
              <motion.div 
                className="absolute top-1/2 -right-12 bg-card rounded-xl p-3 shadow-lg border border-green-500/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground">New Lead</div>
                      <div className="text-[10px] text-muted-foreground">Just now</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
