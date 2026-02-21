import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle, Star, ArrowRight, Monitor, Smartphone, Zap, Shield,
  TrendingUp, Users, Award, Clock, ChevronRight, Sparkles, Globe,
  Code2, Palette, BarChart3, HeadphonesIcon, Phone, Mail,
  Play, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Portfolio images
import cadbullImg from "@/assets/portfolio/cadbull.webp";
import hireforjobImg from "@/assets/portfolio/hireforjob.webp";
import handbricksImg from "@/assets/portfolio/handbricks.webp";
import rentalyachtImg from "@/assets/portfolio/rentalyacht.webp";
import betterviewImg from "@/assets/portfolio/betterviewtourism.webp";
import dreamdecorImg from "@/assets/portfolio/dreamdecor.webp";
import tapovanImg from "@/assets/portfolio/tapovanschool.webp";
import gujaratvoyageImg from "@/assets/portfolio/gujaratvoyage.webp";
import akycoImg from "@/assets/portfolio/akyca.webp";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  phone: z.string().max(20).optional(),
  business_name: z.string().max(150).optional(),
  website_type: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().max(1000).optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

const portfolioProjects = [
  { img: cadbullImg, title: "CAD Library Platform", category: "SaaS / Marketplace", tags: ["E-Commerce", "Search", "Library"] },
  { img: hireforjobImg, title: "Job Portal App", category: "HR / Recruitment", tags: ["Map-based", "AI Matching", "Portal"] },
  { img: handbricksImg, title: "Real Estate Platform", category: "Real Estate", tags: ["Property Listing", "Search", "Modern UI"] },
  { img: rentalyachtImg, title: "Yacht Rental Dubai", category: "Tourism / Luxury", tags: ["Booking", "Tours", "Dubai"] },
  { img: betterviewImg, title: "Better View Tourism", category: "Travel & Tourism", tags: ["Activities", "Dubai", "Booking"] },
  { img: dreamdecorImg, title: "Dream Decor Furniture", category: "E-Commerce", tags: ["Furniture", "Shop", "Elegant"] },
  { img: tapovanImg, title: "Tapovan School", category: "Education", tags: ["School", "Admissions", "Boarding"] },
  { img: gujaratvoyageImg, title: "Gujarat Voyage Center", category: "Travel", tags: ["Tourism", "Hotels", "Gujarat"] },
  { img: akycoImg, title: "AKY & Co. CA Firm", category: "Finance / CA", tags: ["Finance", "Consulting", "Professional"] },
];

const services = [
  { icon: Monitor, title: "Custom Website Design", desc: "Pixel-perfect, brand-aligned designs tailored uniquely for your business." },
  { icon: Smartphone, title: "Mobile-First Responsive", desc: "Flawless experience on every screen — desktop, tablet, and phone." },
  { icon: Zap, title: "Lightning Fast Performance", desc: "Google Core Web Vitals optimized for speed, SEO, and conversions." },
  { icon: Code2, title: "Custom Development", desc: "React, Next.js, WordPress — built clean and scalable." },
  { icon: Palette, title: "Branding & UI/UX Design", desc: "Cohesive brand identity with intuitive user experience design." },
  { icon: BarChart3, title: "SEO-Ready Architecture", desc: "Technical SEO baked in from day one to help you rank faster." },
  { icon: Shield, title: "Secure & Reliable Hosting", desc: "SSL, daily backups, 99.9% uptime with enterprise-grade infrastructure." },
  { icon: HeadphonesIcon, title: "Ongoing Support & AMC", desc: "Dedicated support plans to keep your website always updated." },
];

const stats = [
  { value: "150+", label: "Websites Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Years Experience" },
  { value: "40+", label: "Industries Served" },
];

const testimonials = [
  { name: "Rajesh Patel", role: "Founder, TechVentures", text: "DiBull transformed our digital presence. Our lead generation increased by 3x within 2 months of launching the new website.", rating: 5 },
  { name: "Priya Sharma", role: "CEO, GreenLeaf Organics", text: "The team delivered a stunning e-commerce site that perfectly captures our brand. Sales went up 40% in the first quarter.", rating: 5 },
  { name: "Mohammed Al-Rashid", role: "Director, Dubai Luxury Tours", text: "Professional, creative, and on-time delivery. The website has become our #1 sales channel now.", rating: 5 },
  { name: "Anita Desai", role: "Principal, Tapovan School", text: "Our school admissions inquiries doubled after the website launch. Absolutely outstanding work!", rating: 5 },
];

const websiteTypes = [
  "Business / Corporate Website",
  "E-Commerce Store",
  "Portfolio / Creative",
  "Real Estate",
  "School / Education",
  "Restaurant / Food",
  "Travel & Tourism",
  "Healthcare / Medical",
  "Other",
];

const budgetRanges = [
  "$100 – $300",
  "$300 – $600",
  "$600 – $1,000",
  "$1,000+",
  "Let's discuss",
];

// Animated counter
const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={`transition-all duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}>
      {value}
    </span>
  );
};

const SectionWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const WebDesignLandingPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        business_name: data.business_name || null,
        website_type: data.website_type || null,
        budget: data.budget || null,
        message: data.message || null,
        source: "web-design-landing",
        status: "new",
      }]);

      if (error) throw error;

      setSubmitted(true);
      reset();
      toast({ title: "Inquiry Submitted!", description: "We'll get back to you within 24 hours." });
    } catch (err) {
      console.error("Lead submission error:", err);
      toast({ title: "Submission Failed", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Professional Website Design Services | DiBull Digital</title>
        <meta name="description" content="Get a stunning, high-converting website for your business. Custom web design, e-commerce, and development by DiBull Digital. 150+ websites delivered. Get a free quote today." />
        <meta name="keywords" content="website design, web development, custom website, e-commerce website, DiBull" />
        <link rel="canonical" href="https://dibull.com/websitedesignlandingpage" />
        <meta property="og:title" content="Professional Website Design Services | DiBull Digital" />
        <meta property="og:description" content="Get a stunning, high-converting website for your business. 150+ websites delivered. Get a free quote today." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background overflow-x-hidden">

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Gradient BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative z-10 container mx-auto px-4 py-24 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" /> India's Top-Rated Web Design Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6"
            >
              Websites That
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Win Clients
              </span>
              <br />
              For You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              We design high-converting, visually stunning websites that establish credibility, attract more customers, and grow your revenue — starting at just $100.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button size="lg" onClick={scrollToForm} className="group text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors">
                <span className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary ml-1" />
                </span>
                See Our Work
              </button>
            </motion.div>

            {/* USP Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur border border-primary/30 rounded-full px-5 py-2.5 shadow-sm">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Get Website in Just 48 Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur border border-accent/30 rounded-full px-5 py-2.5 shadow-sm">
                <Globe className="w-5 h-5 text-accent" />
                <span className="text-sm font-bold text-foreground">Demo Website in Just $10</span>
              </div>
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur border border-primary/30 rounded-full px-5 py-2.5 shadow-sm">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Starting at $100</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((s) => (
                <div key={s.label} className="bg-card/80 backdrop-blur border border-border rounded-2xl p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-primary">
                    <Counter value={s.value} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronRight className="w-6 h-6 text-muted-foreground rotate-90" />
          </motion.div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="bg-primary py-4 overflow-hidden">
          <div className="flex animate-marquee-slow gap-12 text-primary-foreground text-sm font-medium whitespace-nowrap">
            {["✓ Custom Website Design", "✓ Mobile Responsive", "✓ SEO Optimized", "⚡ Get Website in Just 48 Hours", "✓ Demo Website in Just $10", "✓ Starting at $100", "✓ Post-Launch Support", "✓ 150+ Happy Clients", "✓ 10+ Years Experience", "✓ Custom Website Design", "✓ Mobile Responsive", "✓ SEO Optimized", "⚡ Get Website in Just 48 Hours", "✓ Demo Website in Just $10", "✓ Starting at $100", "✓ Post-Launch Support"].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionWrapper className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-4">Everything You Need for a<br />Winning Online Presence</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">From initial concept to launch and beyond — we handle everything.</p>
            </SectionWrapper>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <SectionWrapper key={service.title}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-card border border-border rounded-2xl p-6 h-full group hover:border-primary/40 hover:shadow-lg transition-all cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </motion.div>
                </SectionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section id="portfolio" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <SectionWrapper className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-4">Real Websites.<br />Real Results.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Browse our latest website projects across industries. Each one built for performance, beauty, and conversion.</p>
            </SectionWrapper>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioProjects.map((project, i) => (
                <SectionWrapper key={project.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative bg-card rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-xl transition-all"
                    onClick={() => setActivePortfolio(i)}
                  >
                    {/* Browser chrome mockup */}
                    <div className="bg-muted border-b border-border px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 bg-background/80 rounded px-3 py-0.5 text-xs text-muted-foreground font-mono truncate">
                        www.{project.title.toLowerCase().replace(/\s+/g, "")}.com
                      </div>
                    </div>
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-primary-foreground">
                          <Globe className="w-10 h-10 mx-auto mb-2" />
                          <span className="font-bold text-lg">View Project</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-foreground">{project.title}</h3>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">{project.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </SectionWrapper>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" onClick={scrollToForm} className="bg-primary text-primary-foreground px-10">
                Start Your Project Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Portfolio lightbox */}
        <AnimatePresence>
          {activePortfolio !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setActivePortfolio(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActivePortfolio(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="bg-muted border-b border-border px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{portfolioProjects[activePortfolio].title}</div>
                </div>
                <img
                  src={portfolioProjects[activePortfolio].img}
                  alt={portfolioProjects[activePortfolio].title}
                  className="w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{portfolioProjects[activePortfolio].title}</h3>
                  <p className="text-muted-foreground">{portfolioProjects[activePortfolio].category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <SectionWrapper>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why DiBull</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-6">We Don't Just Build Websites.<br />We Build Growth Engines.</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Most web agencies hand you a beautiful website and disappear. We're different. We build websites that are engineered for conversion, optimized for search engines, and built to grow with your business.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, title: "ROI-Focused Design", desc: "Every design decision is made to maximize your leads and sales." },
                    { icon: Clock, title: "On-Time Delivery", desc: "We've delivered 150+ projects on time — your deadline is our commitment." },
                    { icon: Users, title: "Dedicated Team", desc: "You get a designer, developer, and project manager on every project." },
                    { icon: Award, title: "10+ Years of Excellence", desc: "Trusted by startups, SMBs, and enterprises across India and UAE." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionWrapper>

              <SectionWrapper>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Average Traffic Increase", value: "+180%", color: "from-blue-500 to-cyan-500" },
                    { label: "Lead Generation Boost", value: "+240%", color: "from-purple-500 to-pink-500" },
                    { label: "Avg. Page Load Time", value: "< 2s", color: "from-green-500 to-emerald-500" },
                    { label: "Google Ranking Improvement", value: "Top 5", color: "from-orange-500 to-amber-500" },
                  ].map((metric) => (
                    <div key={metric.label} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                      <div className={`text-3xl font-extrabold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Package teaser */}
                <div className="mt-6 bg-primary rounded-2xl p-6 text-primary-foreground">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-bold text-lg">Starting at 100 USD</span>
                  </div>
                  <p className="text-primary-foreground/80 text-sm mb-4">Professional 5-page website with mobile design, SEO setup, and 3 months of free support.</p>
                  <Button onClick={scrollToForm} variant="secondary" className="w-full bg-primary-foreground text-primary font-bold hover:bg-primary-foreground/90">
                    Get Free Quote Now →
                  </Button>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <SectionWrapper className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Client Love</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-4">What Our Clients Say</h2>
            </SectionWrapper>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <SectionWrapper key={t.name}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-border rounded-2xl p-7 h-full flex flex-col hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-foreground italic mb-6 leading-relaxed flex-1">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </SectionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <SectionWrapper className="text-center mb-20">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Process</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-4">From Idea to Live in 4 Steps</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">A streamlined process designed to deliver your dream website — fast, transparent, and stress-free.</p>
            </SectionWrapper>

            {/* Desktop timeline connector */}
            <div className="hidden lg:block absolute top-[55%] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { step: "01", title: "Discovery Call", desc: "We learn about your business, goals, audience, and competitors to build the perfect strategy.", icon: Phone, color: "from-primary/20 to-primary/5", borderColor: "border-primary/30", duration: "15 min call" },
                { step: "02", title: "Design & Review", desc: "Our designers craft pixel-perfect mockups. We iterate together until you absolutely love it.", icon: Palette, color: "from-accent/20 to-accent/5", borderColor: "border-accent/30", duration: "3-5 days" },
                { step: "03", title: "Development", desc: "We build with clean, modern code — responsive, SEO-optimized, and blazing fast.", icon: Code2, color: "from-primary/20 to-primary/5", borderColor: "border-primary/30", duration: "5-10 days" },
                { step: "04", title: "Launch & Support", desc: "We deploy your site, run QA checks, and provide ongoing support to keep it thriving.", icon: Zap, color: "from-accent/20 to-accent/5", borderColor: "border-accent/30", duration: "Ongoing" },
              ].map((step, i) => (
                <SectionWrapper key={step.step}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative bg-card border ${step.borderColor} rounded-2xl p-6 text-center h-full group hover:shadow-xl transition-shadow`}
                  >
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-black shadow-lg shadow-primary/30 z-10">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mt-4 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.desc}</p>

                    {/* Duration tag */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </span>

                    {/* Arrow connector for desktop */}
                    {i < 3 && (
                      <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card border border-border rounded-full items-center justify-center shadow-sm">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                </SectionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEAD FORM ── */}
        <section id="contact-form" className="py-24 bg-background" ref={formRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <SectionWrapper className="text-center mb-10">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Free Consultation</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 mb-4">Let's Build Your Dream Website</h2>
                <p className="text-muted-foreground">Fill the form below and our expert will call you within 24 hours — no commitment, just a friendly conversation.</p>
              </SectionWrapper>

              <SectionWrapper>
                <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
                      <p className="text-muted-foreground mb-6">Your inquiry has been submitted. We'll reach out within 24 hours.</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="https://wa.me/917567177771" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            WhatsApp Us Now
                          </Button>
                        </a>
                        <Button variant="outline" onClick={() => setSubmitted(false)}>
                          Submit Another
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                          <Input
                            {...register("name")}
                            placeholder="Your full name"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address *</label>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="you@company.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number</label>
                          <Input {...register("phone")} placeholder="+91 98765 43210" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">Business Name</label>
                          <Input {...register("business_name")} placeholder="Your Company Name" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">Website Type</label>
                          <select
                            {...register("website_type")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
                          >
                            <option value="">Select type...</option>
                            {websiteTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">Budget Range</label>
                          <select
                            {...register("budget")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
                          >
                            <option value="">Select budget...</option>
                            {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Tell us about your project</label>
                        <Textarea
                          {...register("message")}
                          placeholder="Describe your business, goals, any specific requirements..."
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary text-primary-foreground text-base font-bold py-6 hover:bg-primary/90 shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> Submitting...</span>
                        ) : (
                          <span className="flex items-center gap-2">Get My Free Consultation <ArrowRight className="w-5 h-5" /></span>
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No commitment</span>
                        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Free consultation</span>
                        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Reply in 24hrs</span>
                      </div>
                    </form>
                  )}
                </div>
              </SectionWrapper>
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
                Ready to Stand Out Online?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
                Join 150+ businesses that trust DiBull Digital to power their online growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-primary-foreground text-primary font-bold px-10 py-6 hover:bg-primary-foreground/90"
                >
                  Start Your Project <ArrowRight className="ml-2" />
                </Button>
                <a href="mailto:info@dibull.com">
                  <Button size="lg" variant="outline" className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-6">
                    <Mail className="w-5 h-5 mr-2" /> info@dibull.com
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WebDesignLandingPage;
