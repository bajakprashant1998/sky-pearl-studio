import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  TrendingUp,
  Zap,
  BarChart3,
  Shield,
  Target,
  Layers,
  Brain,
  Eye,
  Crown,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Building2,
  DollarSign,
  Globe,
  Users,
  Cpu,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection, { FloatingElement } from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Data ─── */

const visionPillars = [
  {
    icon: Layers,
    title: "Systems Thinking",
    description:
      "We build interconnected growth systems — not isolated campaigns. Every piece amplifies the next.",
  },
  {
    icon: Cpu,
    title: "Automation First",
    description:
      "Eliminate repetitive tasks, reduce human error, and let your team focus on high-impact decisions.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Growth",
    description:
      "Every move is measurable. We rely on real-time analytics, not assumptions, to scale what works.",
  },
];

const trustStats = [
  { value: "10+", label: "Years of Experience" },
  { value: "500+", label: "Clients Served" },
  { value: "30+", label: "Industries" },
  { value: "98%", label: "Client Retention" },
];

interface StageService {
  name: string;
  slug: string;
}

interface Stage {
  number: number;
  name: string;
  objective: string;
  description: string;
  services: StageService[];
  outcomes: string[];
  emotionalLine: string;
  icon: typeof Rocket;
  accent: string;
}

const stages: Stage[] = [
  {
    number: 1,
    name: "Digital Foundation",
    objective: "Build a conversion-ready digital presence",
    description:
      "Before driving any traffic, your digital assets must be engineered to convert. We design and develop high-performance websites, craft compelling brand identities, and create user experiences that turn visitors into customers — from day one.",
    services: [
      { name: "Website Design", slug: "web-design" },
      { name: "Conversion UI/UX", slug: "conversion-ui-ux" },
      { name: "Branding & Design", slug: "branding-design" },
      { name: "Custom Development", slug: "custom-development" },
    ],
    outcomes: [
      "Professional, mobile-optimised website",
      "Conversion-focused user journeys",
      "Consistent, memorable brand identity",
      "Scalable technology architecture",
    ],
    emotionalLine: "Your business finally looks and feels like a market leader.",
    icon: Building2,
    accent: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    name: "Automation & Intelligence",
    objective: "Automate workflows and unlock intelligent decision-making",
    description:
      "With a strong foundation in place, we layer in intelligent automation. Email sequences, CRM pipelines, AI-powered insights, and SaaS tools work around the clock — so your business scales without scaling headcount.",
    services: [
      { name: "Marketing Automation", slug: "marketing-automation-crm" },
      { name: "Email Marketing", slug: "email-marketing" },
      { name: "Analytics & AI", slug: "analytics-ai-technology" },
      { name: "AI Marketing", slug: "ai-marketing" },
      { name: "SaaS Products", slug: "saas-products" },
    ],
    outcomes: [
      "Automated lead nurturing & follow-ups",
      "Real-time business intelligence dashboards",
      "AI-driven campaign optimisation",
      "Reduced operational overhead by up to 80%",
    ],
    emotionalLine: "Your systems work for you — even while you sleep.",
    icon: Zap,
    accent: "from-violet-500 to-purple-500",
  },
  {
    number: 3,
    name: "Traffic & Audience Growth",
    objective: "Generate predictable, high-quality traffic at scale",
    description:
      "Now we drive the right audience to your optimised assets. Through a multi-channel acquisition strategy spanning search, social, content, and programmatic advertising, we create a reliable pipeline of qualified prospects.",
    services: [
      { name: "SEO Services", slug: "seo" },
      { name: "PPC Advertising", slug: "ppc" },
      { name: "Social Media", slug: "social-media" },
      { name: "Content Marketing", slug: "content-marketing" },
      { name: "Video Marketing", slug: "video-marketing" },
      { name: "Programmatic Ads", slug: "programmatic-advertising" },
    ],
    outcomes: [
      "Top search rankings for key terms",
      "Profitable paid acquisition channels",
      "Engaged social media communities",
      "Consistent, high-value content engine",
    ],
    emotionalLine: "Your brand becomes impossible to ignore.",
    icon: TrendingUp,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    number: 4,
    name: "Conversion & Revenue Optimisation",
    objective: "Maximise revenue per visitor",
    description:
      "Traffic alone is meaningless without conversion. We optimise every touchpoint — from landing pages to checkout flows — to squeeze maximum revenue from every visitor, on every platform.",
    services: [
      { name: "CRO Services", slug: "conversion-optimization" },
      { name: "E-commerce Marketing", slug: "ecommerce-marketing" },
      { name: "Amazon Marketing", slug: "amazon-marketing" },
    ],
    outcomes: [
      "30–50% improvement in conversion rates",
      "Higher average order values",
      "Optimised marketplace performance",
      "Data-backed A/B testing culture",
    ],
    emotionalLine: "Every click works harder. Every rupee counts.",
    icon: Target,
    accent: "from-orange-500 to-amber-500",
  },
  {
    number: 5,
    name: "Scale & Authority Expansion",
    objective: "Achieve market dominance and scalable infrastructure",
    description:
      "With all systems performing, we shift focus to authority building and aggressive scaling. Your team is trained, your brand is recognised, and your growth infrastructure is designed to compound quarter after quarter.",
    services: [
      { name: "Training Programs", slug: "training-programs" },
      { name: "Growth Hacking", slug: "growth-hacking" },
    ],
    outcomes: [
      "Recognised as an industry authority",
      "In-house team trained on advanced strategies",
      "Scalable, self-sustaining growth engine",
      "Compound growth quarter over quarter",
    ],
    emotionalLine: "You're no longer competing — you're setting the standard.",
    icon: Crown,
    accent: "from-rose-500 to-pink-500",
  },
];

const philosophyPillars = [
  {
    icon: Building2,
    label: "Build",
    description: "Engineer a digital foundation that's designed to convert, not just exist.",
  },
  {
    icon: Cpu,
    label: "Automate",
    description: "Replace manual chaos with intelligent, scalable systems.",
  },
  {
    icon: Eye,
    label: "Attract",
    description: "Drive predictable, qualified traffic through every major channel.",
  },
  {
    icon: Target,
    label: "Convert",
    description: "Optimise every touchpoint to maximise revenue per visitor.",
  },
  {
    icon: Rocket,
    label: "Scale",
    description: "Compound your results with authority, training, and infrastructure.",
  },
];

const visionCards = [
  {
    icon: Globe,
    title: "Market Authority",
    description:
      "Your brand is the first name people think of in your industry. Organic search traffic flows in daily, and competitors model their strategy after yours.",
  },
  {
    icon: DollarSign,
    title: "Stable Revenue",
    description:
      "Predictable, recurring revenue streams powered by automated funnels, optimised ad spend, and a loyal customer base that keeps growing.",
  },
  {
    icon: Layers,
    title: "Scalable Infrastructure",
    description:
      "Systems, processes, and a trained team that can handle 10x growth without breaking. You scale the business — not the chaos.",
  },
];

/* ─── Page ─── */

const GrowthStrategyPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Digital Bull Growth Strategy",
    description:
      "A 5-stage digital growth blueprint that transforms businesses through systematic foundation building, automation, traffic generation, conversion optimisation, and authority scaling.",
    provider: {
      "@type": "Organization",
      name: "Digital Bull",
    },
  };

  return (
    <>
      <Helmet>
        <title>Growth Strategy Blueprint | Digital Bull</title>
        <meta
          name="description"
          content="Discover our 5-stage growth strategy that transforms businesses from scattered marketing to scalable, automated revenue systems. Build. Automate. Scale."
        />
        <meta property="og:title" content="Growth Strategy Blueprint | Digital Bull" />
        <meta
          property="og:description"
          content="A strategic business growth roadmap — 5 stages from digital foundation to market dominance."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sky-pearl-studio.lovable.app/growth-strategy" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-700 to-primary py-24 lg:py-36">
          {/* Floating orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <FloatingElement className="absolute top-10 left-[10%]" duration={6}>
              <div className="w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
            </FloatingElement>
            <FloatingElement className="absolute bottom-10 right-[8%]" duration={8} distance={15}>
              <div className="w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
            </FloatingElement>
            <FloatingElement className="absolute top-1/3 right-1/4" duration={5} distance={8}>
              <div className="w-48 h-48 rounded-full bg-accent/10 blur-2xl" />
            </FloatingElement>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection direction="fade" delay={0.1}>
                <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-sm px-4 py-1.5">
                  Strategic Growth Blueprint
                </Badge>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                  Build. Automate. Scale.{" "}
                  <span className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                    Your Business Growth Blueprint.
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.35}>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                  A step-by-step system that connects 20 digital services into one
                  unstoppable growth engine — so you stop guessing and start scaling
                  with predictable revenue.
                </p>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl" asChild>
                    <Link to="/contact">
                      Start Your Growth Journey <ArrowRight className="w-5 h-5 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50" asChild>
                    <Link to="/services">See Our Services</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Floating metric cards */}
            <AnimatedSection direction="up" delay={0.7}>
              <div className="flex flex-wrap justify-center gap-4 mt-16 max-w-3xl mx-auto">
                {[
                  { label: "Revenue Growth", value: "3×" },
                  { label: "Automation", value: "80%" },
                  { label: "Lead Quality", value: "+150%" },
                  { label: "ROI Average", value: "5:1" },
                ].map((m) => (
                  <motion.div
                    key={m.label}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 text-center"
                    whileHover={{ scale: 1.05, y: -4 }}
                  >
                    <p className="text-2xl font-bold text-white">{m.value}</p>
                    <p className="text-xs text-blue-200">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════ VISION & AUTHORITY ═══════════════ */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">Our Approach</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Stop Marketing at Random.{" "}
                <span className="text-gradient">Start Growing by Design.</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Modern businesses don't need more campaigns — they need a system.
                We architect interconnected digital ecosystems that generate
                compounding returns, predictable revenue, and real market authority.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {visionPillars.map((p, i) => (
                <AnimatedSection key={p.title} direction="up" delay={i * 0.15}>
                  <div className="bg-card border border-border rounded-2xl p-8 text-center hover-lift h-full">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                      <p.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Trust stats */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {trustStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl md:text-4xl font-extrabold text-gradient">{s.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════ GROWTH ROADMAP ═══════════════ */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-20">
              <Badge variant="outline" className="mb-4">The Roadmap</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                5 Stages to{" "}
                <span className="text-gradient">Unstoppable Growth</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Each stage builds on the last. Together they form a complete
                digital growth system — from a solid foundation to market
                dominance.
              </p>
            </AnimatedSection>

            <div className="relative max-w-4xl mx-auto">
              {/* Vertical timeline line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-accent/40 to-primary/20 hidden md:block" />
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-accent/40 to-primary/20 md:hidden" />

              {stages.map((stage, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <AnimatedSection
                    key={stage.number}
                    direction={isEven ? "left" : "right"}
                    delay={idx * 0.12}
                    className="relative mb-16 last:mb-0"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${stage.accent} flex items-center justify-center z-10 shadow-lg border-4 border-background`}
                    >
                      <span className="text-white font-bold text-sm">{stage.number}</span>
                    </div>

                    {/* Card */}
                    <div
                      className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${
                        isEven ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                      }`}
                    >
                      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stage.accent} flex items-center justify-center`}>
                            <stage.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              Stage {stage.number}
                            </p>
                            <h3 className="text-xl font-bold text-foreground">{stage.name}</h3>
                          </div>
                        </div>

                        <p className="text-sm font-semibold text-primary mb-2">{stage.objective}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{stage.description}</p>

                        {/* Services tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {stage.services.map((svc) => (
                            <Link
                              key={svc.slug}
                              to={`/services/${svc.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {svc.name}
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>

                        {/* Outcomes */}
                        <div className="space-y-2 mb-4">
                          {stage.outcomes.map((o) => (
                            <div key={o} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              <span className="text-sm text-muted-foreground">{o}</span>
                            </div>
                          ))}
                        </div>

                        {/* Emotional line */}
                        <p className="text-sm font-semibold italic text-foreground/80 border-l-2 border-primary/40 pl-3">
                          {stage.emotionalLine}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ TRANSFORMATION ═══════════════ */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-900 to-blue-700 text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                The Transformation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From Scattered Marketing to a{" "}
                <span className="text-cyan-300">Scalable Growth System</span>
              </h2>
              <p className="text-blue-200 text-lg">
                See the difference between businesses that market randomly and
                those that follow a strategic growth system.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedSection direction="left" delay={0.1}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X2Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold">Before</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Disconnected campaigns with no unified strategy",
                      "Manual processes eating up your team's time",
                      "Unpredictable revenue and inconsistent leads",
                      "Wasted ad spend on unoptimised channels",
                      "No clear ROI measurement",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-blue-200 text-sm">
                        <span className="text-red-400 mt-1">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.2}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold">After</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Unified strategy where every service amplifies the next",
                      "80% of repetitive tasks fully automated",
                      "Predictable lead flow and stable recurring revenue",
                      "Every rupee optimised with data-backed decisions",
                      "Real-time dashboards showing exact ROI",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-blue-100 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Transformation metrics */}
            <AnimatedSection direction="up" delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
                {[
                  { label: "Revenue Increase", value: "200%+" },
                  { label: "Lead Quality", value: "3× Better" },
                  { label: "Time Saved", value: "40 hrs/mo" },
                  { label: "Cost Efficiency", value: "+65%" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-3xl font-extrabold text-white">{m.value}</p>
                    <p className="text-xs text-blue-300 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════ WHY THIS WORKS ═══════════════ */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">The Philosophy</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why This Strategy{" "}
                <span className="text-gradient">Actually Works</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Most agencies sell services. We architect outcomes. Here's the
                five-part philosophy that drives predictable, compounding growth.
              </p>
            </AnimatedSection>

            {/* Philosophy flow */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-5xl mx-auto mb-16">
              {philosophyPillars.map((p, i) => (
                <AnimatedSection key={p.label} direction="up" delay={i * 0.1} className="flex-1">
                  <div className="relative bg-card border border-border rounded-2xl p-6 text-center hover-lift h-full flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <p.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{p.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                    {i < philosophyPillars.length - 1 && (
                      <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary z-10" />
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Key principles */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    icon: BarChart3,
                    title: "Measurable ROI",
                    desc: "Every action has a metric. Every metric has a dashboard. No guesswork.",
                  },
                  {
                    icon: Shield,
                    title: "Predictable Revenue",
                    desc: "Systems-driven growth removes the rollercoaster. You know what's coming next quarter.",
                  },
                  {
                    icon: Brain,
                    title: "Compounding Returns",
                    desc: "Each stage amplifies the last. Growth doesn't just add up — it multiplies.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-muted/50 rounded-xl p-5 border border-border">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════ FUTURE VISION ═══════════════ */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">Your Future</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Where Will Your Business Be in{" "}
                <span className="text-gradient">12 Months?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Imagine waking up to a business that runs on systems, generates
                leads on autopilot, and is recognised as a market leader. That's
                what this roadmap delivers.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {visionCards.map((card, i) => (
                <AnimatedSection key={card.title} direction="up" delay={i * 0.15}>
                  <div className="bg-card border border-border rounded-2xl p-8 text-center hover-lift h-full">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5">
                      <card.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{card.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CONVERSION CTA ═══════════════ */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection direction="scale">
              <div className="max-w-3xl mx-auto">
                <Lightbulb className="w-12 h-12 mx-auto text-cyan-300 mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  Your Growth Story Starts{" "}
                  <span className="text-cyan-300">Right Here.</span>
                </h2>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  The best time to build a scalable growth system was a year ago.
                  The second-best time is today. Let's design your roadmap — together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl text-base px-8" asChild>
                    <Link to="/contact">
                      Book Your Free Strategy Call <ArrowRight className="w-5 h-5 ml-1" />
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                  {["No commitment required", "Free consultation", "Custom roadmap", "Results guaranteed"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

/* Inline X icon for "Before" section */
const X2Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default GrowthStrategyPage;
