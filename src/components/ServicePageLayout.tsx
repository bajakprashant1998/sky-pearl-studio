import { Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, ChevronRight, TrendingUp, Users, Zap, Award, Target, BarChart3, Star, CheckCircle2, Sparkles, Layers, Globe, Shield, Phone, MessageCircle, Clock, ThumbsUp, X, ChevronDown, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import { Subcategory, ServiceStat } from "@/data/services";
import { ReactNode, useEffect, useRef, useState } from "react";
import GrowthChart from "@/components/charts/GrowthChart";
import ROICalculator from "@/components/charts/ROICalculator";
import ChannelPerformance from "@/components/charts/ChannelPerformance";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  { number: "01", title: "Discovery & Analysis", desc: "We dive deep into your business, competitors, and market to understand your unique needs." },
  { number: "02", title: "Strategy Development", desc: "Create a customized roadmap aligned with your goals and budget." },
  { number: "03", title: "Implementation", desc: "Execute the strategy with precision using industry best practices." },
  { number: "04", title: "Optimization & Reporting", desc: "Continuous improvement based on data and transparent reporting." },
];

const testimonials = [
  {
    quote: "Digital Bull Technology transformed our online presence. Their expertise helped us achieve 300% growth in organic traffic within 6 months.",
    name: "Rajesh Kumar",
    role: "Marketing Director",
    company: "TechVista Solutions",
    result: "+300% Traffic",
  },
  {
    quote: "The team delivered outstanding results. Our conversion rate improved by 150% and we saw a significant boost in quality leads.",
    name: "Priya Sharma",
    role: "CEO",
    company: "GrowthEdge Digital",
    result: "+150% Conversions",
  },
  {
    quote: "Professional, innovative, and result-oriented. They exceeded our expectations in every metric we tracked.",
    name: "Amit Patel",
    role: "Founder",
    company: "NextLevel Commerce",
    result: "5x ROI",
  },
];

const comparisonData = [
  { feature: "Dedicated Project Manager", us: true, others: false },
  { feature: "Weekly Performance Reports", us: true, others: false },
  { feature: "Custom Strategy", us: true, others: false },
  { feature: "24/7 Support", us: true, others: false },
  { feature: "Transparent Pricing", us: true, others: true },
  { feature: "Money-Back Guarantee", us: true, others: false },
  { feature: "Free Audit & Consultation", us: true, others: false },
  { feature: "AI-Powered Insights", us: true, others: false },
];

const faqs = [
  { q: "How long does it take to see results?", a: "Most clients see measurable results within 30-90 days depending on the service. We set clear KPIs and milestones from day one." },
  { q: "What is your pricing structure?", a: "We offer flexible pricing tailored to your business needs—monthly retainers, project-based, or performance-based models. Contact us for a custom quote." },
  { q: "Do you offer a free consultation?", a: "Yes! We provide a free, no-obligation consultation and audit to understand your needs and recommend the best strategy." },
  { q: "Can I cancel anytime?", a: "Absolutely. We believe in earning your business every month. No long-term lock-in contracts required." },
  { q: "How do you measure success?", a: "We track key performance indicators (KPIs) like traffic, conversions, ROI, and engagement, with transparent weekly and monthly reports." },
];

const trustBadges = [
  "Google Partner",
  "Meta Business Partner",
  "ISO 27001 Certified",
  "500+ Happy Clients",
  "4.9★ Rating",
];

const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = value.replace(/[^0-9.]/g, "");
  const prefix = value.replace(/[0-9.]+.*/, "");
  const afterNum = value.replace(/.*[0-9.]/, "").replace(suffix, "");
  const [count, setCount] = useState(0);
  const target = parseFloat(numericPart) || 0;

  useEffect(() => {
    if (!isInView || target === 0) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-3xl font-bold text-foreground mb-1 tabular-nums">
      {prefix}{isInView ? count : 0}{afterNum}{suffix}
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{title} - Digital Bull Technology</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Digital Bull Technology`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://dibull.com/services/${slug}`} />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <link rel="canonical" href={`https://dibull.com/services/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Digital Bull Technology`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl"
              animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/services" className="text-muted-foreground hover:text-primary">Services</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/25"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <Icon className="w-10 h-10 text-primary-foreground" />
                </motion.div>

                <motion.span
                  className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4 tracking-wide uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {subtitle}
                </motion.span>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {title}
                </motion.h1>

                <motion.p
                  className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  {description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Button variant="hero" size="lg" className="group" asChild>
                    <Link to="/contact">
                      {ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <Link to="/contact">Free Consultation</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Stats Grid with animated counters */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all group cursor-default"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <AnimatedCounter value={stat.value} />
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Badges Strip */}
        <section className="py-4 bg-muted/50 border-y border-border overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center flex-wrap gap-6 md:gap-10">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {badge}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Section */}
        {extraSection}

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Why Digital Bull
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Us for <span className="text-gradient">{subtitle}</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We combine expertise, innovation, and dedication to deliver exceptional results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full group text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                  whileHover={{ y: -8 }}
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Subcategories Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive <span className="text-gradient">{subtitle}</span> Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our full range of services designed to accelerate your growth
              </p>
            </motion.div>

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

                return (
                  <motion.div
                    key={subcategory.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index}
                  >
                    <Link
                      to={`/services/${slug}/${subcategory.id}`}
                      className="block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 h-full group"
                    >
                      <motion.div
                        className={`bg-gradient-to-r ${colorClass} p-6`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <subcategory.icon className="w-7 h-7 text-white" />
                          </div>
                          <ChevronRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-xl font-bold text-white mt-4">
                          {subcategory.title}
                        </h3>
                      </motion.div>

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
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-sm font-medium text-primary group-hover:underline">
                            Explore Services →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section - Timeline */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How We Deliver <span className="text-gradient">Results</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven methodology that ensures success at every stage
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full group"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index}
                    whileHover={{ y: -6 }}
                  >
                    <div className="text-5xl font-bold text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-md">
                      <span className="text-lg font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table — Us vs Others */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                The Digital Bull Difference
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why We <span className="text-gradient">Stand Out</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                See how we compare to typical agencies
              </p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto bg-card rounded-2xl border border-border overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                <div className="p-4 font-semibold text-foreground text-sm">Feature</div>
                <div className="p-4 font-semibold text-center text-sm">
                  <span className="text-primary">Digital Bull</span>
                </div>
                <div className="p-4 font-semibold text-center text-sm text-muted-foreground">Others</div>
              </div>
              {/* Table Rows */}
              {comparisonData.map((row, i) => (
                <motion.div
                  key={i}
                  className="grid grid-cols-3 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="p-4 text-sm text-foreground font-medium">{row.feature}</div>
                  <div className="p-4 flex justify-center">
                    <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="p-4 flex justify-center">
                    {row.others ? (
                      <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-destructive/10 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-destructive" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Data & Analytics Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Data-Driven Success
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Measurable <span className="text-gradient">Results</span> You Can Expect
              </h2>
              <p className="text-lg text-muted-foreground">
                Our strategies are backed by data and proven to deliver tangible business growth
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GrowthChart />
              <ROICalculator />
              <ChannelPerformance />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
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
                      transition={{ delay: index * 0.08 }}
                    >
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"
                    animate={{ scale: [1.3, 1, 1.3] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  />

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
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Client Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="text-gradient">Clients</span> Say
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className="bg-card rounded-3xl p-8 lg:p-12 border border-border relative overflow-hidden"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                >
                  <Quote className="w-12 h-12 text-primary/15 absolute top-6 right-6" />
                  <div className="flex justify-start gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl lg:text-2xl font-medium mb-8 text-foreground leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{testimonials[activeTestimonial].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}</p>
                    </div>
                    <div className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-bold">
                      {testimonials[activeTestimonial].result}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                FAQs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20 relative overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-gradient">{subtitle}</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get a free consultation and discover how we can help you achieve your business goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/free-tools">Try Free Tools</Link>
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

export default ServicePageLayout;
