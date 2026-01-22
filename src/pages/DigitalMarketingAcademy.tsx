import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AnimatedSection, { FloatingElement, CountUp } from "@/components/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  IndianRupee,
  Users,
  Award,
  BookOpen,
  Palette,
  TrendingUp,
  Briefcase,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Target,
  Globe,
  Search,
  Share2,
  BarChart3,
  MessageSquare,
  FileText,
  Zap,
  Brain,
  Star,
  Building2,
  Laptop,
  Film,
  Shield,
  HeartHandshake,
  Rocket,
  MousePointerClick,
  CircleDollarSign,
  Heart,
  UserCheck,
  Play,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const DigitalMarketingAcademy = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const courseDetails = [
    { icon: Clock, label: "Duration", value: "6 Months", color: "from-blue-500 to-cyan-500" },
    { icon: Calendar, label: "Class Timing", value: "10:00 AM - 6:30 PM", color: "from-purple-500 to-pink-500" },
    { icon: IndianRupee, label: "Course Fees", value: "₹25,000/Month", color: "from-green-500 to-emerald-500" },
    { icon: BookOpen, label: "Training Type", value: "Practical + Live Projects", color: "from-amber-500 to-orange-500" },
  ];

  const benefits = [
    { icon: Sparkles, text: "AI-Integrated Syllabus", desc: "Latest Digital Marketing + AI integrated curriculum", slug: "ai-integrated-syllabus", gradient: "from-violet-500 to-purple-600" },
    { icon: Clock, text: "6-Month In-Depth Training", desc: "Comprehensive training from basics to advanced level", slug: "in-depth-training", gradient: "from-blue-500 to-cyan-500" },
    { icon: Target, text: "Daily Practical Sessions", desc: "Hands-on experience with real tools & examples", slug: "daily-practical-sessions", gradient: "from-green-500 to-emerald-500" },
    { icon: Award, text: "Expert Industry Trainers", desc: "Learn from professionals with real-world experience", slug: "expert-trainers", gradient: "from-amber-500 to-orange-500" },
    { icon: Users, text: "Small Batch Sizes", desc: "Personalized attention in every session", slug: "small-batch-sizes", gradient: "from-rose-500 to-pink-500" },
    { icon: Briefcase, text: "Portfolio Development", desc: "Build a professional portfolio for career success", slug: "portfolio-development", gradient: "from-indigo-500 to-violet-500" },
    { icon: TrendingUp, text: "Complete Career Support", desc: "Interview preparation and freelancing roadmap", slug: "career-guidance", gradient: "from-teal-500 to-cyan-500" },
    { icon: BookOpen, text: "Industry Certifications", desc: "Get certified and recognized globally", slug: "certification-support", gradient: "from-emerald-500 to-green-500" },
  ];

  const digitalMarketingCurriculum = [
    {
      title: "Digital Marketing Fundamentals",
      slug: "digital-marketing-fundamentals",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      topics: [
        "Digital marketing ecosystem & channels",
        "Online consumer behavior",
        "Digital branding strategies",
        "Career paths & opportunities"
      ]
    },
    {
      title: "Website & Landing Page Fundamentals",
      slug: "website-landing-page-fundamentals",
      icon: Laptop,
      color: "from-purple-500 to-pink-500",
      topics: [
        "How websites work (domain, hosting, CMS)",
        "Website structure & UX basics",
        "Conversion-focused landing pages",
        "Lead generation strategies"
      ]
    },
    {
      title: "Search Engine Optimization (SEO)",
      slug: "search-engine-optimization",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      topics: [
        "Keyword research & competitor analysis",
        "On-page SEO optimization",
        "Off-page SEO & link building",
        "Technical SEO (speed, mobile, indexing)",
        "Local SEO & Google Business profile optimization",
        "SEO audits & ranking strategies"
      ]
    },
    {
      title: "Content Marketing",
      slug: "content-marketing",
      icon: FileText,
      color: "from-amber-500 to-orange-500",
      topics: [
        "SEO-friendly blog writing",
        "Website & landing page content",
        "Ad copywriting fundamentals",
        "Content planning & calendars"
      ]
    },
    {
      title: "Social Media Marketing",
      slug: "social-media-marketing",
      icon: Share2,
      color: "from-rose-500 to-red-500",
      topics: [
        "Instagram, Facebook & LinkedIn strategies",
        "Organic growth techniques",
        "Content creation & scheduling",
        "Audience engagement & brand building"
      ]
    },
    {
      title: "Paid Advertising & Performance Marketing",
      slug: "paid-advertising-performance-marketing",
      icon: MousePointerClick,
      color: "from-indigo-500 to-blue-500",
      topics: [
        "Google Ads (Search, Display & Video)",
        "Social media paid advertising",
        "Budget planning & targeting",
        "Conversion tracking & optimization"
      ]
    },
    {
      title: "Email & WhatsApp Marketing",
      slug: "email-whatsapp-marketing",
      icon: MessageSquare,
      color: "from-teal-500 to-cyan-500",
      topics: [
        "Email marketing campaigns",
        "Lead nurturing & automation",
        "WhatsApp marketing strategies",
        "Customer retention techniques"
      ]
    },
    {
      title: "Analytics & Data Tracking",
      slug: "analytics-data-tracking",
      icon: BarChart3,
      color: "from-violet-500 to-purple-500",
      topics: [
        "Google Analytics fundamentals",
        "Traffic & user behavior analysis",
        "Conversion tracking",
        "Campaign performance reporting"
      ]
    },
    {
      title: "Online Reputation Management (ORM)",
      slug: "online-reputation-management",
      icon: Shield,
      color: "from-emerald-500 to-green-500",
      topics: [
        "Brand reputation monitoring",
        "Review & feedback handling",
        "Crisis management strategies",
        "Trust & credibility building"
      ]
    }
  ];

  const aiSkillsCurriculum = [
    {
      title: "AI Website Designing",
      icon: Laptop,
      color: "from-blue-600 to-indigo-500",
      slug: "ai-website-designing",
      topics: [
        "AI-powered website builders",
        "No-code & low-code platforms",
        "AI-assisted UI/UX layouts",
        "High-conversion landing pages"
      ]
    },
    {
      title: "AI Graphic Designing",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      slug: "ai-graphic-designing",
      topics: [
        "AI logo & brand identity creation",
        "Social media creatives & ad banners",
        "Image enhancement & background removal",
        "Design automation using AI tools"
      ]
    },
    {
      title: "AI Video Editing & Creation",
      icon: Film,
      color: "from-purple-600 to-violet-500",
      slug: "ai-video-editing",
      topics: [
        "AI-based video editing tools",
        "Reels, Shorts & YouTube video creation",
        "AI subtitles, captions & voice-overs",
        "Multi-platform video optimization"
      ]
    }
  ];

  const practicalProjects = [
    { icon: Globe, text: "Website creation using AI tools", color: "from-blue-500 to-cyan-500" },
    { icon: Search, text: "SEO audits on real websites", color: "from-green-500 to-emerald-500" },
    { icon: Share2, text: "Social media marketing campaigns", color: "from-pink-500 to-rose-500" },
    { icon: Palette, text: "AI-based graphic & video projects", color: "from-purple-500 to-violet-500" },
    { icon: BarChart3, text: "Paid ads execution & optimization", color: "from-orange-500 to-amber-500" },
    { icon: FileText, text: "Analytics dashboards & reports", color: "from-cyan-500 to-teal-500" },
  ];

  const careerOpportunities = [
    { title: "Digital Marketing Executive", icon: Rocket, color: "from-blue-500 to-cyan-500" },
    { title: "SEO Specialist", icon: Search, color: "from-green-500 to-emerald-500" },
    { title: "Social Media Manager", icon: Share2, color: "from-pink-500 to-rose-500" },
    { title: "Performance Marketing Executive", icon: Target, color: "from-orange-500 to-amber-500" },
    { title: "AI Website Designer", icon: Laptop, color: "from-purple-500 to-violet-500" },
    { title: "AI Graphic Designer", icon: Palette, color: "from-rose-500 to-pink-500" },
    { title: "Video Content Creator", icon: Film, color: "from-red-500 to-orange-500" },
    { title: "Freelancer or Agency Owner", icon: Building2, color: "from-indigo-500 to-blue-500" },
  ];

  const targetAudience = [
    { title: "Students & Freshers", icon: GraduationCap, desc: "Start your digital career" },
    { title: "Working Professionals", icon: Briefcase, desc: "Upskill for better opportunities" },
    { title: "Business Owners", icon: Building2, desc: "Market your business online" },
    { title: "Freelancers", icon: Laptop, desc: "Add new skills to your portfolio" },
    { title: "Housewives", icon: Heart, desc: "Start earning from home" },
    { title: "Career Changers", icon: TrendingUp, desc: "Switch to digital marketing" },
  ];

  const certifications = [
    "Digital Marketing & AI Course Completion Certificate",
    "Practical Skill Certification",
    "Guidance for Google Ads & Analytics Certifications",
  ];

  const careerSupport = [
    { text: "Interview preparation", icon: UserCheck },
    { text: "Resume & portfolio building", icon: FileText },
    { text: "Freelancing income roadmap", icon: CircleDollarSign },
    { text: "Business & agency growth guidance", icon: Rocket },
  ];

  const stats = [
    { value: 500, suffix: "+", label: "Students Trained" },
    { value: 90, suffix: "%", label: "Placement Rate" },
    { value: 50, suffix: "+", label: "AI Tools Covered" },
    { value: 12, suffix: "", label: "Core Modules" },
  ];

  return (
    <>
      <Helmet>
        <title>Digital Marketing Academy Ahmedabad | 6-Month Practical Training Course - Digital Bull Technology</title>
        <meta
          name="description"
          content="Join the best Digital Marketing Academy in Ahmedabad. 6-month practical training with AI skills, live projects & career support. ₹25,000/month. Enroll now for expert training in SEO, social media, PPC & more!"
        />
        <meta
          name="keywords"
          content="digital marketing ahmedabad, digital marketing agency ahmedabad, digital marketing company in ahmedabad, marketing agency in ahmedabad, social media marketing agency in ahmedabad, social media marketing agency ahmedabad, best digital marketing agency in ahmedabad, social media agency in ahmedabad, marketing company in ahmedabad, social media marketing in ahmedabad, digital marketing services ahmedabad, advertising companies in ahmedabad, digital marketing service in ahmedabad, digital marketing services in ahmedabad, digital marketing academy, digital marketing course ahmedabad, digital marketing training, AI marketing course, SEO training ahmedabad"
        />
        <link rel="canonical" href="https://dibull.com/digital-marketing-academy" />
        <meta property="og:title" content="Digital Marketing Academy Ahmedabad | Best Training Institute - Digital Bull" />
        <meta property="og:description" content="Learn Digital Marketing & AI skills with practical training. 6-month course with live projects & career support. ₹25,000/month. Best digital marketing academy in Ahmedabad!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dibull.com/digital-marketing-academy" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing Academy Ahmedabad | 6-Month Training" />
        <meta name="twitter:description" content="Best digital marketing training in Ahmedabad. Practical + AI skills. ₹25,000/month. Enroll now!" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Digital Marketing Academy - Digital Bull Technology",
            "description": "Professional digital marketing training institute in Ahmedabad offering practical, career-focused courses in digital marketing and AI skills.",
            "url": "https://dibull.com/digital-marketing-academy",
            "logo": "https://dibull.com/dibull_logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "A 823 Moneyplant High street, Jagatpur Road, Near GOTA Cross road",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91 9824011921",
              "contactType": "admissions"
            },
            "offers": {
              "@type": "Offer",
              "name": "6-Month Digital Marketing Course",
              "price": "25000",
              "priceCurrency": "INR",
              "priceValidUntil": "2026-12-31"
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            
            {/* Animated orbs */}
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
              className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ 
                x: [-30, 30, -30],
                y: [-20, 20, -20],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 4) * 20}%`,
                }}
                animate={{
                  y: [-30, 30, -30],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }} />

          <motion.div 
            className="container mx-auto px-4 relative z-10"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {/* Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full border border-primary/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Professional Training Academy</span>
                  <motion.div
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                </motion.div>

                {/* Heading */}
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Digital Marketing{" "}
                  <span className="relative inline-block">
                    <span className="text-gradient">Academy</span>
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
                  className="text-xl md:text-2xl text-muted-foreground font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Learn Digital Marketing & AI Skills with Practical, Career-Focused Training
                </motion.p>

                {/* Description */}
                <motion.p 
                  className="text-base text-muted-foreground leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Digital Marketing Academy is a professional training center in Ahmedabad dedicated to delivering in-depth, practical, and industry-oriented education in Digital Marketing and AI-based creative technologies.
                </motion.p>

                {/* Quick Info Pills */}
                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {[
                    { icon: Clock, text: "6 Months", color: "text-primary" },
                    { icon: IndianRupee, text: "₹25,000/Month", color: "text-green-500" },
                    { icon: BookOpen, text: "Live Projects", color: "text-purple-500" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border hover:border-primary/50 transition-colors cursor-default"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-sm font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Button variant="hero" size="lg" className="group text-base px-8" asChild>
                    <Link to="/contact?interest=academy">
                      <span className="flex items-center">
                        Enroll Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="group text-base" asChild>
                    <a href="tel:+919824011921">
                      <Phone className="w-5 h-5 mr-2" />
                      Call: +91 98240 11921
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* Course Details Cards - Right Side */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {courseDetails.map((detail, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Hover gradient */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${detail.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${detail.color} rounded-xl flex items-center justify-center mb-4 relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <detail.icon className="w-7 h-7 text-white relative z-10" />
                      <motion.div 
                        className="absolute inset-0 rounded-xl bg-white/20"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </motion.div>
                    <div className="text-sm text-muted-foreground mb-1">{detail.label}</div>
                    <div className="text-lg font-bold text-foreground">{detail.value}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
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
              {stats.map((stat, index) => (
                <AnimatedSection key={stat.label} delay={0.1 * index}>
                  <motion.div 
                    className="text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
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

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <motion.div 
            className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-4 h-4" />
                Why Choose Us
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Why Choose <span className="text-gradient">Digital Marketing Academy?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We follow a skill-first teaching approach, ensuring students gain real expertise through practical training and industry exposure.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <Link to={`/digital-marketing-academy/benefit/${benefit.slug}`}>
                    <motion.div 
                      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 h-full group cursor-pointer relative overflow-hidden"
                      whileHover={{ y: -8 }}
                    >
                      {/* Hover effect */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />
                      
                      <motion.div 
                        className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-4 relative`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <benefit.icon className="w-7 h-7 text-white" />
                        <motion.div 
                          className="absolute inset-0 rounded-xl bg-white/20"
                          animate={{ opacity: [0, 0.4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                      </motion.div>
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <h3 className="text-foreground font-bold">{benefit.text}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      {/* Bottom accent */}
                      <motion.div 
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${benefit.gradient}`}
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Marketing Curriculum */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <BookOpen className="w-4 h-4" />
                Complete Curriculum
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Digital Marketing <span className="text-gradient">Syllabus</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
                In-depth training covering all aspects of digital marketing from fundamentals to advanced strategies
              </p>
              <Link to="/digital-marketing-syllabus">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="gap-2">
                    <BookOpen className="w-5 h-5" />
                    View Complete 6-Month Syllabus
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {digitalMarketingCurriculum.map((module, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <Link to={`/digital-marketing-academy/module/${module.slug}`}>
                    <motion.div 
                      className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 h-full group cursor-pointer"
                      whileHover={{ y: -8 }}
                    >
                      <div className={`bg-gradient-to-r ${module.color} p-4 relative overflow-hidden`}>
                        {/* Animated pattern */}
                        <motion.div 
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "15px 15px"
                          }}
                          animate={{ x: [0, 15, 0] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        
                        <div className="flex items-center gap-3 relative z-10">
                          <motion.div 
                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            <module.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <h3 className="text-lg font-bold text-white">{module.title}</h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <ul className="space-y-2">
                          {module.topics.slice(0, 4).map((topic, topicIndex) => (
                            <motion.li 
                              key={topicIndex} 
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: topicIndex * 0.05 }}
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              {topic}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          Explore Module <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* AI Skills Curriculum */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Brain className="w-4 h-4" />
                AI-Powered Skills
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Advanced AI-Based <span className="text-gradient">Creative Skills</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Master the latest AI tools for website designing, graphic design, and video creation
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {aiSkillsCurriculum.map((module, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <Link to={`/digital-marketing-academy/${module.slug}`} className="block h-full">
                    <motion.div 
                      className="bg-card rounded-3xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 h-full group cursor-pointer relative"
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div 
                        className={`absolute -inset-1 bg-gradient-to-br ${module.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                      />
                      
                      <div className={`bg-gradient-to-br ${module.color} p-6 text-center relative overflow-hidden`}>
                        {/* Animated sparkles */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute"
                            style={{ 
                              left: `${20 + i * 30}%`, 
                              top: `${20 + i * 20}%` 
                            }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: i * 0.5 
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-white/50" />
                          </motion.div>
                        ))}
                        
                        <motion.div 
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          <module.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white relative z-10">{module.title}</h3>
                      </div>
                      <div className="p-6 relative">
                        <ul className="space-y-3">
                          {module.topics.map((topic, topicIndex) => (
                            <motion.li 
                              key={topicIndex} 
                              className="flex items-start gap-3 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: topicIndex * 0.1 }}
                            >
                              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{topic}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center justify-center gap-2 text-primary font-medium">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Projects */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="w-4 h-4" />
                Hands-On Learning
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Practical Training & <span className="text-gradient">Live Projects</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                At Digital Marketing Academy, practical learning is the foundation. Every student builds a strong professional portfolio during the course.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {practicalProjects.map((project, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    <div className="flex items-center gap-4 relative">
                      <motion.div 
                        className={`w-14 h-14 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <project.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <p className="font-medium text-foreground">{project.text}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Rocket className="w-4 h-4" />
                Career Paths
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Career Opportunities <span className="text-gradient">After Course</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Open doors to diverse career paths in the digital marketing industry
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {careerOpportunities.map((career, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <motion.div 
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 text-center group h-full relative overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${career.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${career.color} rounded-2xl flex items-center justify-center mx-auto mb-4 relative`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <career.icon className="w-8 h-8 text-white" />
                      <motion.div 
                        className="absolute inset-0 rounded-2xl bg-white/20"
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </motion.div>
                    <h3 className="font-bold text-foreground">{career.title}</h3>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Career Support */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Certifications */}
              <AnimatedSection direction="left">
                <motion.div 
                  className="bg-card rounded-3xl p-8 border border-border h-full relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="flex items-center gap-3 mb-6 relative">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center"
                      whileHover={{ rotate: 10 }}
                    >
                      <Award className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">Certifications</h3>
                  </div>
                  <ul className="space-y-4 relative">
                    {certifications.map((cert, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{cert}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>

              {/* Career Support */}
              <AnimatedSection direction="right">
                <motion.div 
                  className="bg-card rounded-3xl p-8 border border-border h-full relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                  
                  <div className="flex items-center gap-3 mb-6 relative">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center"
                      whileHover={{ rotate: 10 }}
                    >
                      <HeartHandshake className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">Career Support</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative">
                    {careerSupport.map((support, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                        whileHover={{ scale: 1.05, x: 5 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <support.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{support.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who Can Join */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-4 h-4" />
                Open for All
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Who Can Join <span className="text-gradient">Digital Marketing Academy?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                No technical or coding background required. Our course is designed for everyone who wants to build a career in digital marketing.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {targetAudience.map((audience, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group text-center relative overflow-hidden"
                    whileHover={{ y: -8 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    />
                    
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <audience.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{audience.title}</h3>
                    <p className="text-sm text-muted-foreground">{audience.desc}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enrollment CTA */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
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

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GraduationCap className="w-16 h-16 text-white/80 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Enroll Now – Start Your Digital & AI Career
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: Clock, label: "Duration", value: "6 Months" },
                  { icon: Clock, label: "Timing", value: "10 AM – 6:30 PM" },
                  { icon: IndianRupee, label: "Fees", value: "₹25,000/Month" },
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    <item.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                    <p className="text-sm opacity-80">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-xl text-white/80 mb-8">
                Join Digital Marketing Academy and gain practical digital marketing + AI skills to build a successful, future-ready career.
              </p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8" asChild>
                    <Link to="/contact?interest=academy">
                      Enroll Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg" asChild>
                    <a href="tel:+919824011921">
                      <Phone className="w-5 h-5 mr-2" />
                      +91 98240 11921
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80">
                <motion.a 
                  href="mailto:info@dibull.com" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className="w-5 h-5" />
                  info@dibull.com
                </motion.a>
                <span className="hidden sm:inline">•</span>
                <motion.a 
                  href="https://wa.me/919824011921" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Us
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default DigitalMarketingAcademy;