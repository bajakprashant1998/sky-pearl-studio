import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Star, Users, TrendingUp, Award, Zap, Target, BarChart3, Sparkles, Shield, Globe, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useSiteSettings } from "@/hooks/useDynamicContent";
import HeroDashboard from "./hero/HeroDashboard";

const features = [
  { text: "SEO & Content Marketing", icon: Target },
  { text: "PPC & Social Ads", icon: BarChart3 },
  { text: "Web Design & Development", icon: Zap },
  { text: "AI-Powered Marketing", icon: Sparkles },
];

const rotatingWords = ["Revenue", "Leads", "Growth", "Impact"];

const HeroSection = () => {
  const { data: settings } = useSiteSettings("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [wordIndex, setWordIndex] = useState(0);
  
  const badgeText = settings?.hero_badge || "Rated #1 Digital Agency in India";
  const headingLine1 = settings?.hero_heading_line1 || "Scale Your";
  const headingHighlight = settings?.hero_heading_highlight || "Business";
  const headingLine2Prefix = settings?.hero_heading_line2_prefix || "Drive More";
  const description = settings?.hero_description || "We help ambitious businesses increase revenue, generate qualified leads, and dominate their market through strategic digital marketing solutions.";
  const ctaPrimary = settings?.hero_cta_primary || "Get Free Consultation";
  const ctaSecondary = settings?.hero_cta_secondary || "View Success Stories";
  const trustGoogle = settings?.hero_trust_google || "Google Partner";
  const trustClients = settings?.hero_trust_clients || "500+ Clients";
  const trustYears = settings?.hero_trust_years || "15+ Years";

  useEffect(() => {
    const interval = setInterval(() => setWordIndex(i => (i + 1) % rotatingWords.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="home" aria-label="Digital Marketing Agency Hero" className="relative min-h-screen flex flex-col pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        {/* Large animated orbs */}
        <motion.div
          className="absolute top-10 left-5 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.5, 0.3, 0.5], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-emerald-500/8 rounded-full blur-3xl"
          animate={{ scale: [1.1, 0.8, 1.1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Radial center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-primary/8 to-transparent rounded-full" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${8 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: i % 3 === 0 ? 6 : 3,
              height: i % 3 === 0 ? 6 : 3,
              background: i % 2 === 0 ? "hsl(var(--primary) / 0.25)" : "hsl(var(--accent) / 0.2)",
            }}
            animate={{
              y: [-25, 25, -25],
              x: [-10, 10, -10],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}

        {/* Animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <motion.line x1="10%" y1="20%" x2="40%" y2="60%" stroke="hsl(var(--primary))" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity }} />
          <motion.line x1="60%" y1="15%" x2="85%" y2="55%" stroke="hsl(var(--primary))" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }} />
          <motion.line x1="30%" y1="70%" x2="70%" y2="30%" stroke="hsl(var(--accent))" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} />
        </svg>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-[15%] right-[12%] w-16 h-16 border border-primary/10 rounded-xl"
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[25%] left-[8%] w-12 h-12 border border-accent/10 rounded-full"
          animate={{ rotate: [360, 0], y: [-15, 15, -15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[60%] right-[30%] w-8 h-8 bg-primary/5 rounded-lg"
          animate={{ rotate: [0, 45, 0, -45, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <motion.div className="container mx-auto px-4 relative z-10 py-8 flex-1 flex items-center" style={{ y, opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
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
                  <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i + 0.3 }}>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{badgeText}</span>
            </motion.div>

            {/* Heading with rotating word */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {headingLine1}{" "}
              <span className="relative inline-block">
                <span className="text-gradient">{headingHighlight}</span>
                <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                  <motion.path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.8 }} />
                </motion.svg>
              </span>
              <br />
              <span className="text-muted-foreground text-[0.65em]">{headingLine2Prefix}</span>{" "}
              <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="text-gradient block"
                    initial={{ y: 40, opacity: 0, rotateX: -45 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 45 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
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
                    {ctaPrimary}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group text-base" asChild>
                <Link to="/case-studies">
                  <motion.div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Play className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                  {ctaSecondary}
                </Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{trustGoogle}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" />
                <span>{trustClients}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>{trustYears}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats Dashboard */}
          <HeroDashboard settings={settings} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
