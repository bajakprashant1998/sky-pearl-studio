import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AnimatedSection, { StaggerContainer, StaggerItem, FloatingElement } from "@/components/AnimatedSection";
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  IndianRupee,
  Users,
  Award,
  BookOpen,
  Code,
  Palette,
  Video,
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
  Megaphone,
  Zap,
  Brain,
  Lightbulb,
  Star,
  Building2,
  Laptop,
  PenTool,
  Film,
  LineChart,
  Shield,
  HeartHandshake,
  Rocket,
  MousePointerClick,
  Settings,
  CircleDollarSign,
  Heart,
  UserCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DigitalMarketingAcademy = () => {
  const courseDetails = [
    { icon: Clock, label: "Duration", value: "6 Months", color: "from-blue-500 to-cyan-500" },
    { icon: Clock, label: "Class Timing", value: "10:00 AM - 6:30 PM", color: "from-purple-500 to-pink-500" },
    { icon: IndianRupee, label: "Course Fees", value: "₹25,000/Month", color: "from-green-500 to-emerald-500" },
    { icon: BookOpen, label: "Training Type", value: "Practical + Theory + Live Projects", color: "from-amber-500 to-orange-500" },
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
    { icon: Globe, text: "Website creation using AI tools", color: "bg-blue-500" },
    { icon: Search, text: "SEO audits on real websites", color: "bg-green-500" },
    { icon: Share2, text: "Social media marketing campaigns", color: "bg-pink-500" },
    { icon: Palette, text: "AI-based graphic & video projects", color: "bg-purple-500" },
    { icon: BarChart3, text: "Paid ads execution & optimization", color: "bg-orange-500" },
    { icon: FileText, text: "Analytics dashboards & reports", color: "bg-cyan-500" },
  ];

  const careerOpportunities = [
    { title: "Digital Marketing Executive", icon: Megaphone, color: "from-blue-500 to-cyan-500" },
    { title: "SEO Specialist", icon: Search, color: "from-green-500 to-emerald-500" },
    { title: "Social Media Manager", icon: Share2, color: "from-pink-500 to-rose-500" },
    { title: "Performance Marketing Executive", icon: Target, color: "from-orange-500 to-amber-500" },
    { title: "AI Website Designer", icon: Laptop, color: "from-purple-500 to-violet-500" },
    { title: "AI Graphic Designer", icon: Palette, color: "from-rose-500 to-pink-500" },
    { title: "Video Content Creator", icon: Video, color: "from-red-500 to-orange-500" },
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
              "price": "5000",
              "priceCurrency": "INR",
              "priceValidUntil": "2026-12-31"
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            <FloatingElement duration={4} distance={20}>
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            </FloatingElement>
            <FloatingElement duration={5} distance={15}>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            </FloatingElement>
            <FloatingElement duration={6} distance={25}>
              <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            </FloatingElement>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {/* Badge */}
                <AnimatedSection delay={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full border border-primary/30">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Professional Training Academy</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </AnimatedSection>

                {/* Heading */}
                <AnimatedSection delay={0.1}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                    Digital Marketing{" "}
                    <span className="relative inline-block">
                      <span className="text-gradient">Academy</span>
                      <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                      </svg>
                    </span>
                  </h1>
                </AnimatedSection>

                {/* Subtitle */}
                <AnimatedSection delay={0.2}>
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    Learn Digital Marketing & AI Skills with Practical, Career-Focused Training
                  </p>
                </AnimatedSection>

                {/* Description */}
                <AnimatedSection delay={0.3}>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                    Digital Marketing Academy is a professional training center in Ahmedabad dedicated to delivering in-depth, practical, and industry-oriented education in Digital Marketing and AI-based creative technologies. We strongly believe that practical knowledge creates confidence and career success.
                  </p>
                </AnimatedSection>

                {/* Quick Info */}
                <AnimatedSection delay={0.4}>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">6 Months</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                      <IndianRupee className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">₹25,000/Month</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Live Projects</span>
                    </div>
                  </div>
                </AnimatedSection>

                {/* CTA Buttons */}
                <AnimatedSection delay={0.5}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="hero" size="lg" className="group text-base px-8" asChild>
                      <Link to="/contact?interest=academy">
                        Enroll Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="group text-base" asChild>
                      <a href="tel:+919824011921">
                        <Phone className="w-5 h-5 mr-2" />
                        Call: +91 98240 11921
                      </a>
                    </Button>
                  </div>
                </AnimatedSection>
              </div>

              {/* Course Details Cards */}
              <AnimatedSection delay={0.3} direction="right">
                <div className="grid grid-cols-2 gap-4">
                  {courseDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${detail.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <detail.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">{detail.label}</div>
                      <div className="text-lg font-bold text-foreground">{detail.value}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Why Choose Us
              </span>
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
                    <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
                      <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <benefit.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <h3 className="text-foreground font-bold">{benefit.text}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Marketing Curriculum */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Complete Curriculum
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Digital Marketing <span className="text-gradient">Syllabus</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
                In-depth training covering all aspects of digital marketing from fundamentals to advanced strategies
              </p>
              <Link to="/digital-marketing-syllabus">
                <Button size="lg" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  View Complete 6-Month Syllabus
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {digitalMarketingCurriculum.map((module, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <Link to={`/digital-marketing-academy/module/${module.slug}`}>
                    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
                      <div className={`bg-gradient-to-r ${module.color} p-4`}>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <module.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-white">{module.title}</h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          Explore Module <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* AI Skills Curriculum */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                <Brain className="w-4 h-4 inline mr-2" />
                AI-Powered Skills
              </span>
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
                    <div className="bg-card rounded-3xl overflow-hidden border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 h-full group cursor-pointer">
                      <div className={`bg-gradient-to-br ${module.color} p-6 text-center`}>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <module.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{module.title}</h3>
                      </div>
                      <div className="p-6">
                        <ul className="space-y-3">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-3 text-sm">
                              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{topic}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center justify-center gap-2 text-primary font-medium">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Projects */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Hands-On Learning
              </span>
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
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${project.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <project.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <p className="font-medium text-foreground">{project.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Career Paths
              </span>
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
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-center group h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${career.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <career.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground">{career.title}</h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Career Support */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Certifications */}
              <AnimatedSection direction="left">
                <div className="bg-card rounded-3xl p-8 border border-border h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Certifications</h3>
                  </div>
                  <ul className="space-y-4">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Career Support */}
              <AnimatedSection direction="right">
                <div className="bg-card rounded-3xl p-8 border border-border h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <HeartHandshake className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Career Support</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {careerSupport.map((support, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <support.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{support.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who Can Join */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Open for All
              </span>
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
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <audience.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{audience.title}</h3>
                    <p className="text-sm text-muted-foreground">{audience.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enrollment CTA */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <GraduationCap className="w-16 h-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Enroll Now – Start Your Digital & AI Career
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Duration</p>
                  <p className="text-xl font-bold">6 Months</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Timing</p>
                  <p className="text-xl font-bold">10 AM – 6:30 PM</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <IndianRupee className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Fees</p>
                  <p className="text-xl font-bold">₹25,000/Month</p>
                </div>
              </div>

              <p className="text-xl text-white/80 mb-8">
                Join Digital Marketing Academy and gain practical digital marketing + AI skills to build a successful, future-ready career.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8" asChild>
                  <Link to="/contact?interest=academy">
                    Enroll Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg" asChild>
                  <a href="tel:+919824011921">
                    <Phone className="w-5 h-5 mr-2" />
                    +91 98240 11921
                  </a>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80">
                <a href="mailto:info@dibull.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  info@dibull.com
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="https://wa.me/919824011921" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Us
                </a>
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
