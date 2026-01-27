import { Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, ChevronRight, TrendingUp, Users, Zap, Award, Target, BarChart3, Star, CheckCircle2, Sparkles, Layers, Globe, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedSection from "./AnimatedSection";
import { Helmet } from "react-helmet-async";
import { Subcategory, ServiceStat } from "@/data/services";
import { ReactNode } from "react";
import GrowthChart from "@/components/charts/GrowthChart";
import ROICalculator from "@/components/charts/ROICalculator";
import ChannelPerformance from "@/components/charts/ChannelPerformance";
import { motion } from "framer-motion";

// New Service Enhancement Components
import ClientLogos from "@/components/services/ClientLogos";
import ComparisonTable from "@/components/services/ComparisonTable";
import IndustryResults from "@/components/services/IndustryResults";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import RelatedServices from "@/components/services/RelatedServices";
import ResultsTimeline from "@/components/services/ResultsTimeline";
import VideoTestimonial from "@/components/services/VideoTestimonial";
import QuickContactWidget from "@/components/services/QuickContactWidget";

interface ServicePageLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  subcategories: Subcategory[];
  benefits: string[];
  ctaText?: string;
  slug: string;
  extraSection?: ReactNode;
  stats?: ServiceStat[];
}

const defaultStats = [
  { value: "500+", label: "Projects Delivered", icon: CheckCircle2, color: "from-blue-500 to-cyan-500" },
  { value: "98%", label: "Client Satisfaction", icon: Star, color: "from-amber-500 to-orange-500" },
  { value: "3x", label: "Average ROI", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
  { value: "24/7", label: "Support Available", icon: Shield, color: "from-purple-500 to-pink-500" },
];

const whyChooseUs = [
  { icon: Target, title: "Data-Driven Strategy", desc: "Every decision backed by analytics and performance metrics" },
  { icon: Zap, title: "Fast Implementation", desc: "Quick turnaround without compromising quality" },
  { icon: Users, title: "Dedicated Team", desc: "Expert professionals assigned to your project" },
  { icon: Award, title: "Proven Results", desc: "Track record of delivering exceptional outcomes" },
];

const processSteps = [
  { number: "01", title: "Discovery & Analysis", desc: "We dive deep into your business, competitors, and market to understand your unique needs.", duration: "Week 1-2", tools: ["Google Analytics", "SEMrush", "Ahrefs"] },
  { number: "02", title: "Strategy Development", desc: "Create a customized roadmap aligned with your goals and budget.", duration: "Week 2-3", tools: ["Notion", "Miro", "Figma"] },
  { number: "03", title: "Implementation", desc: "Execute the strategy with precision using industry best practices.", duration: "Week 3-8", tools: ["WordPress", "Shopify", "Custom"] },
  { number: "04", title: "Optimization & Reporting", desc: "Continuous improvement based on data and transparent reporting.", duration: "Ongoing", tools: ["Data Studio", "Looker", "Tableau"] },
];

const trustBadges = [
  { name: "Google Partner", color: "bg-blue-500" },
  { name: "Meta Partner", color: "bg-indigo-500" },
  { name: "Microsoft Ads", color: "bg-cyan-500" },
  { name: "HubSpot Certified", color: "bg-orange-500" },
];

const ServicePageLayout = ({
  icon: Icon,
  title,
  subtitle,
  description,
  subcategories,
  benefits,
  ctaText = "Get Started Today",
  slug,
  extraSection,
  stats = defaultStats,
}: ServicePageLayoutProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Digital Bull Technology Pvt LTD"
    }
  };

  // Rotating subtitles for hero section
  const rotatingSubtitles = [
    subtitle,
    "ROI-Focused Strategies",
    "Data-Driven Excellence",
    "Results That Matter"
  ];

  return (
    <>
      <Helmet>
        <title>{title} - Digital Bull Technology</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Digital Bull Technology`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://dibull.com/services/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section - Enhanced with Animated Background */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>

          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedSection delay={0.1}>
                  <motion.div 
                    className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/25"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                    {subtitle}
                  </span>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {title}
                  </h1>
                </AnimatedSection>

                <AnimatedSection delay={0.25}>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                    {description}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" className="group" asChild>
                      <Link to="/contact">
                        {ctaText}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="heroOutline" size="lg" asChild>
                      <Link to="/contact">Free Consultation</Link>
                    </Button>
                  </div>
                </AnimatedSection>
              </div>

              {/* Stats Grid with Animated Counters */}
              <AnimatedSection delay={0.35}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* NEW: Client Logos Section */}
        <ClientLogos />

        {/* Extra Section (like SEO Checker) */}
        {extraSection}

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Why Digital Bull
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Us for <span className="text-gradient">{subtitle}</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We combine expertise, innovation, and dedication to deliver exceptional results
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full group text-center"
                    whileHover={{ y: -8 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* NEW: Video Testimonial Section */}
        <VideoTestimonial 
          title={`See How We Deliver ${subtitle} Results`}
          clientName="Leading Industry Brand"
          result="Exceptional Growth Achieved"
        />

        {/* Subcategories Section - Enhanced with Badges */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive <span className="text-gradient">{subtitle}</span> Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our full range of services designed to accelerate your growth
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subcategories.map((subcategory, index) => {
                const colors = [
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-pink-500",
                  "from-amber-500 to-orange-500",
                  "from-green-500 to-emerald-500",
                  "from-rose-500 to-red-500",
                  "from-indigo-500 to-blue-500",
                ];
                const colorClass = colors[index % colors.length];
                const isPopular = index === 0; // First subcategory marked as popular

                return (
                  <AnimatedSection key={subcategory.id} delay={index * 0.1}>
                    <Link
                      to={`/services/${slug}/${subcategory.id}`}
                      className="block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover-lift h-full group relative"
                    >
                      {/* Popular Badge */}
                      {isPopular && (
                        <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3 fill-current" />
                          POPULAR
                        </div>
                      )}

                      {/* Colored Header */}
                      <div className={`bg-gradient-to-r ${colorClass} p-6`}>
                        <div className="flex items-center justify-between">
                          <motion.div 
                            className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <subcategory.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <ChevronRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-xl font-bold text-white mt-4">
                          {subcategory.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <ul className="space-y-3">
                          {subcategory.items.slice(0, 4).map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                              <span className="text-muted-foreground text-sm leading-relaxed">
                                {item.name}
                              </span>
                            </li>
                          ))}
                          {subcategory.items.length > 4 && (
                            <li className="text-sm text-primary font-medium pl-8">
                              +{subcategory.items.length - 4} more services
                            </li>
                          )}
                        </ul>

                        {/* Timeline Badge */}
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-sm font-medium text-primary group-hover:underline">
                            Explore Services →
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            2-4 weeks
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* NEW: Comparison Table Section */}
        <ComparisonTable serviceSlug={slug} />

        {/* Process Section - Enhanced with Duration & Tools */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How We Deliver <span className="text-gradient">Results</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven methodology that ensures success at every stage
              </p>
            </AnimatedSection>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <AnimatedSection key={index} delay={index * 0.15}>
                    <motion.div 
                      className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full group"
                      whileHover={{ y: -8 }}
                    >
                      {/* Step Number */}
                      <div className="text-5xl font-bold text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors">
                        {step.number}
                      </div>

                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                        <span className="text-lg font-bold text-white">{step.number}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>

                      {/* Duration Badge */}
                      <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1">
                        {step.tools.slice(0, 2).map((tool, i) => (
                          <span key={i} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Connector Line */}
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                      )}
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Related Services Cross-Sell */}
        <RelatedServices currentSlug={slug} />

        {/* Data & Analytics Section with Results Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Data-Driven Success
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Measurable <span className="text-gradient">Results</span> You Can Expect
              </h2>
              <p className="text-lg text-muted-foreground">
                Our strategies are backed by data and proven to deliver tangible business growth
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GrowthChart />
              <ROICalculator />
              {/* NEW: Results Timeline Component */}
              <ResultsTimeline serviceTitle={subtitle} />
            </div>
          </div>
        </section>

        {/* Benefits Section - Enhanced */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left">
                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                  Key Benefits
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Transform Your Business with Our <span className="text-gradient">{subtitle}</span> Services
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Partner with us to unlock your business potential with proven strategies and measurable results.
                </p>

                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />

                  <div className="relative z-10">
                    <Sparkles className="w-12 h-12 mb-6 opacity-80" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-white/80 mb-6 text-lg">
                      Let's discuss how we can help grow your business with our comprehensive {subtitle.toLowerCase()} services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90" asChild>
                        <Link to="/contact">
                          Contact Us
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10" asChild>
                        <Link to="/case-studies">View Case Studies</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* NEW: Industry Results Section */}
        <IndustryResults serviceTitle={subtitle} />

        {/* NEW: FAQ Section with Schema */}
        <ServiceFAQ serviceTitle={subtitle} serviceSlug={slug} />

        {/* CTA Section - Enhanced with Trust Badges */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.2) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              {/* Urgency Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                Limited slots available this month
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-gradient">{subtitle}</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get a free consultation and discover how we can help you achieve your business goals.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium"
                  >
                    <div className={`w-2 h-2 rounded-full ${badge.color}`} />
                    {badge.name}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/case-studies">View Case Studies</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* NEW: Quick Contact Floating Widget */}
      <QuickContactWidget serviceName={subtitle} />

      <Footer />
    </>
  );
};

export default ServicePageLayout;
