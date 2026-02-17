import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
  Sparkles,
  ArrowUpRight,
  Store,
  GraduationCap,
  Factory,
  Briefcase,
  HeartPulse,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection, { FloatingElement } from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ target, suffix = "", prefix = "", duration = 2 }: { target: number; suffix?: string; prefix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return controls.stop;
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

/* ─── Data ─── */

const visionPillars = [
  {
    icon: Layers,
    title: "Everything Works Together",
    description:
      "Think of it like a machine — every part connects. Your website, social media, ads, and emails all work as one team instead of doing random, disconnected things.",
    stat: "20+",
    statLabel: "Services Connected",
  },
  {
    icon: Cpu,
    title: "Let Technology Do the Work",
    description:
      "Instead of your team doing boring, repetitive tasks (like sending follow-up emails one by one), we set up smart tools that do it automatically — saving time and money.",
    stat: "80%",
    statLabel: "Tasks Automated",
  },
  {
    icon: LineChart,
    title: "Decisions Based on Real Numbers",
    description:
      "No guessing. We track everything — which ads bring customers, which pages people love, and where money is being wasted — so every decision is backed by real data.",
    stat: "5:1",
    statLabel: "Average Return on Investment",
  },
];

const trustStats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 30, suffix: "+", label: "Industries" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

interface StageService {
  name: string;
  slug: string;
}

interface Stage {
  number: number;
  slug: string;
  name: string;
  objective: string;
  description: string;
  services: StageService[];
  outcomes: string[];
  emotionalLine: string;
  icon: typeof Rocket;
  accent: string;
  accentBg: string;
}

const stages: Stage[] = [
  {
    number: 1,
    slug: "digital-foundation",
    name: "Digital Foundation",
    objective: "Build your online home — a website that actually gets customers",
    description:
      "Think of this like building a shop. Before you invite anyone in, the shop needs to look professional, be easy to walk through, and make people want to buy. We create a beautiful, fast website that works perfectly on phones and computers, design a logo and brand identity people remember, and make sure everything is set up so visitors actually take action — like calling you, filling out a form, or buying something.",
    services: [
      { name: "Website Design", slug: "web-design" },
      { name: "Conversion UI/UX", slug: "conversion-ui-ux" },
      { name: "Branding & Design", slug: "branding-design" },
      { name: "Custom Development", slug: "custom-development" },
    ],
    outcomes: [
      "A professional website that works great on all devices",
      "A clear path for visitors to become customers",
      "A brand look & feel that people remember",
      "A strong technical setup that can grow with your business",
    ],
    emotionalLine: "Your business finally looks and feels like a market leader.",
    icon: Building2,
    accent: "from-blue-500 to-cyan-500",
    accentBg: "bg-blue-500/10",
  },
  {
    number: 2,
    slug: "automation-intelligence",
    name: "Automation & Intelligence",
    objective: "Set up smart tools that work for you 24/7 — even while you sleep",
    description:
      "Imagine hiring a super-efficient assistant who never sleeps and never forgets. That's what automation does. We set up systems that automatically send welcome emails to new customers, follow up with people who showed interest, track what's working and what's not, and give you simple reports showing exactly how your business is doing — all without you lifting a finger.",
    services: [
      { name: "Marketing Automation", slug: "marketing-automation-crm" },
      { name: "Email Marketing", slug: "email-marketing" },
      { name: "Analytics & AI", slug: "analytics-ai-technology" },
      { name: "AI Marketing", slug: "ai-marketing" },
      { name: "SaaS Products", slug: "saas-products" },
    ],
    outcomes: [
      "Automatic follow-up emails that nurture interested people into buyers",
      "Simple dashboards showing how your business is performing",
      "AI tools that help you make smarter marketing decisions",
      "Up to 80% less time spent on repetitive manual work",
    ],
    emotionalLine: "Your systems work for you — even while you sleep.",
    icon: Zap,
    accent: "from-violet-500 to-purple-500",
    accentBg: "bg-violet-500/10",
  },
  {
    number: 3,
    slug: "traffic-audience-growth",
    name: "Traffic & Audience Growth",
    objective: "Get the right people to find and visit your business online",
    description:
      "Now that your 'shop' looks great and runs smartly, it's time to bring in visitors. Think of this like putting up signs on every major road pointing to your store. We help people find you when they search on Google (that's SEO), run targeted ads on Google and social media so you appear in front of the exact people who need your services, create helpful content (blogs, videos, social posts) that builds trust and attracts customers naturally.",
    services: [
      { name: "SEO Services", slug: "seo" },
      { name: "PPC Advertising", slug: "ppc" },
      { name: "Social Media", slug: "social-media" },
      { name: "Content Marketing", slug: "content-marketing" },
      { name: "Video Marketing", slug: "video-marketing" },
      { name: "Programmatic Ads", slug: "programmatic-advertising" },
    ],
    outcomes: [
      "Your business shows up at the top when people search on Google",
      "Paid ads that actually make more money than they cost",
      "An active social media presence that attracts followers and customers",
      "Helpful blogs and videos that bring visitors to your site every day",
    ],
    emotionalLine: "Your brand becomes impossible to ignore.",
    icon: TrendingUp,
    accent: "from-emerald-500 to-teal-500",
    accentBg: "bg-emerald-500/10",
  },
  {
    number: 4,
    slug: "conversion-revenue-optimisation",
    name: "Conversion & Revenue Optimisation",
    objective: "Turn more visitors into paying customers — without spending more on ads",
    description:
      "Getting visitors is only half the job — now we need to turn them into buyers. Imagine 100 people walk into your shop, but only 2 buy something. We work on increasing that to 5, 10, or even 20 buyers — from the same 100 visitors. We do this by improving your website's checkout process, testing different headlines and layouts to see what works best, and optimising your product listings on marketplaces like Amazon.",
    services: [
      { name: "CRO Services", slug: "conversion-optimization" },
      { name: "E-commerce Marketing", slug: "ecommerce-marketing" },
      { name: "Amazon Marketing", slug: "amazon-marketing" },
    ],
    outcomes: [
      "30–50% more visitors turning into actual customers",
      "Customers spending more per purchase on average",
      "Better performance on Amazon and online marketplaces",
      "Continuous testing to keep improving results over time",
    ],
    emotionalLine: "Every visitor counts. Every rupee works harder.",
    icon: Target,
    accent: "from-orange-500 to-amber-500",
    accentBg: "bg-orange-500/10",
  },
  {
    number: 5,
    slug: "scale-authority",
    name: "Scale & Authority",
    objective: "Become the go-to name in your industry and grow without limits",
    description:
      "At this point, your business is running smoothly, customers are flowing in, and revenue is growing. Now it's time to become the biggest name in your space. We train your team so they can handle growth confidently, implement advanced strategies that keep multiplying your results, and position your brand as THE authority that competitors look up to. This is where growth stops being linear and starts compounding — like interest in a savings account.",
    services: [
      { name: "Training Programs", slug: "training-programs" },
      { name: "Growth Hacking", slug: "growth-hacking" },
    ],
    outcomes: [
      "People in your industry know and trust your brand",
      "Your own team is skilled enough to drive growth independently",
      "A self-sustaining system that keeps growing on its own",
      "Results that multiply every quarter, not just add up",
    ],
    emotionalLine: "You're no longer competing — you're setting the standard.",
    icon: Crown,
    accent: "from-rose-500 to-pink-500",
    accentBg: "bg-rose-500/10",
  },
];

const philosophyPillars = [
  {
    icon: Building2,
    label: "Build",
    description: "First, create a professional online presence — your website, brand, and tools — that makes people trust you instantly.",
  },
  {
    icon: Cpu,
    label: "Automate",
    description: "Set up smart systems that handle repetitive tasks automatically, so your team can focus on what matters most.",
  },
  {
    icon: Eye,
    label: "Attract",
    description: "Bring the right people to your business through Google, social media, ads, and helpful content.",
  },
  {
    icon: Target,
    label: "Convert",
    description: "Turn those visitors into actual paying customers by making it easy and compelling to take action.",
  },
  {
    icon: Rocket,
    label: "Scale",
    description: "Once everything works, multiply your results and become the #1 name in your industry.",
  },
];

const visionCards = [
  {
    icon: Globe,
    title: "People Know Your Name",
    description:
      "When someone in your industry needs a solution, your brand is the first one they think of. People find you easily on Google, recommend you to friends, and your competitors wish they had your reputation.",
    metric: "Top 3",
    metricLabel: "Industry Ranking",
  },
  {
    icon: DollarSign,
    title: "Money Comes In Predictably",
    description:
      "No more unpredictable months. You have a steady stream of customers coming in through automated systems — like having a 24/7 salesperson that never takes a day off.",
    metric: "3×",
    metricLabel: "Revenue Growth",
  },
  {
    icon: Layers,
    title: "You Can Handle 10× More Business",
    description:
      "Your systems, your team, and your processes are ready to handle massive growth. If business suddenly doubles or triples, nothing breaks — everything just scales up smoothly.",
    metric: "10×",
    metricLabel: "Growth Capacity",
  },
];

const audienceSegments = [
  { icon: Store, title: "E-commerce Brands", description: "Looking to scale revenue and optimise conversion funnels across platforms." },
  { icon: Factory, title: "B2B Companies", description: "Needing predictable lead generation and sales pipeline automation." },
  { icon: Briefcase, title: "Startups & Scale-ups", description: "Ready to build a systematic growth engine from the ground up." },
  { icon: HeartPulse, title: "Healthcare & Education", description: "Wanting to build trust, authority, and digital-first patient/student experiences." },
  { icon: GraduationCap, title: "Professional Services", description: "Seeking thought leadership positioning and high-quality lead magnets." },
  { icon: Building2, title: "Enterprise Teams", description: "Requiring integrated marketing automation and cross-channel analytics." },
];

const faqs = [
  {
    q: "I'm new to online business — is this for me?",
    a: "Absolutely! This strategy is designed for businesses of all sizes, including those just starting online. We explain everything in plain language, handle all the technical work, and guide you step by step. You don't need to be tech-savvy — that's our job.",
  },
  {
    q: "How long until I start seeing results?",
    a: "You'll see early improvements within 60–90 days (like a better website and first leads coming in). The full impact — where all 5 stages work together and results start multiplying — typically happens within 6–12 months. Think of it like planting a garden: early sprouts come quickly, but the big harvest takes a growing season.",
  },
  {
    q: "Do I have to do all 5 stages at once?",
    a: "No! We look at where your business is right now and start from there. If you already have a good website, we might skip Stage 1 and start with automation or getting more traffic. It's completely customised to your needs.",
  },
  {
    q: "How is this different from just hiring someone to run ads?",
    a: "Running ads alone is like putting a sign outside a messy shop — people come in but leave without buying. Our approach first makes sure your 'shop' (website) is ready, then sets up automation, THEN drives visitors. Everything works together, so you get much better results for the same investment.",
  },
  {
    q: "How much does this cost?",
    a: "It depends on your business size and which stages you need. We offer a free consultation where we assess your current situation and give you a custom plan with clear, upfront pricing — no surprises or hidden fees.",
  },
  {
    q: "I already have a team — can you work with them?",
    a: "Yes! We love working with existing teams. We can handle the strategy and technical parts while your team focuses on what they do best. We also train your team so they grow more skilled over time.",
  },
  {
    q: "What if I don't understand digital marketing terms?",
    a: "That's perfectly fine. We explain everything in simple language without jargon. Our reports show clear numbers like 'how many people visited your site' and 'how many became customers' — not confusing technical terms. We're your partner, not your professor.",
  },
];

/* ─── Page ─── */

const GrowthStrategyPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        <meta property="og:url" content="https://dibull.com/growth-strategy" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <link rel="canonical" href="https://dibull.com/growth-strategy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growth Strategy Blueprint | Digital Bull" />
        <meta name="twitter:description" content="A strategic business growth roadmap — 5 stages from digital foundation to market dominance." />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-primary py-28 lg:py-40">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
          </div>

          {/* Floating orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <FloatingElement className="absolute top-10 left-[10%]" duration={6}>
              <div className="w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl" />
            </FloatingElement>
            <FloatingElement className="absolute bottom-10 right-[8%]" duration={8} distance={15}>
              <div className="w-[28rem] h-[28rem] rounded-full bg-blue-400/20 blur-3xl" />
            </FloatingElement>
            <FloatingElement className="absolute top-1/3 right-1/4" duration={5} distance={8}>
              <div className="w-48 h-48 rounded-full bg-violet-400/10 blur-2xl" />
            </FloatingElement>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection direction="fade" delay={0.1}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 text-sm px-5 py-2 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Strategic Growth Blueprint
                  </Badge>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                  Build. Automate. Scale.
                  <span className="block mt-3 bg-gradient-to-r from-cyan-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">
                    Your Business Growth Blueprint.
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.35}>
                <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto mb-12 leading-relaxed">
                  We take 20 powerful online tools and connect them into one simple,
                  step-by-step plan — so you stop wasting money on random marketing
                  and start growing your business with a clear roadmap.
                </p>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 shadow-2xl text-base px-8 py-6 font-bold rounded-xl" asChild>
                    <Link to="/contact">
                      Start Your Growth Journey <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 text-base px-8 py-6 rounded-xl backdrop-blur-sm" asChild>
                    <Link to="/services">See Our Services</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Floating metric cards */}
            <AnimatedSection direction="up" delay={0.7}>
              <div className="flex flex-wrap justify-center gap-5 mt-20 max-w-4xl mx-auto">
                {[
                  { label: "Revenue Growth", value: "3×", icon: TrendingUp },
                  { label: "Automation", value: "80%", icon: Cpu },
                  { label: "Lead Quality", value: "+150%", icon: Target },
                  { label: "ROI Average", value: "5:1", icon: BarChart3 },
                ].map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-2xl px-6 py-4 text-center min-w-[140px] group"
                    whileHover={{ scale: 1.08, y: -6 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <m.icon className="w-5 h-5 text-cyan-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-extrabold text-white">{m.value}</p>
                    <p className="text-xs text-blue-200/80 mt-1">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Scroll indicator */}
            <motion.div
              className="flex justify-center mt-16"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-6 h-6 text-white/40" />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ VISION & AUTHORITY ═══════════════ */}
        <section className="py-24 lg:py-32 bg-background relative">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-20">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">Our Approach</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
                Stop Doing Random Things Online.{" "}
                <span className="text-gradient">Start Growing With a Plan.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Many businesses throw money at ads, post randomly on social media,
                and hope something works. That's not a strategy — that's guessing.
                We replace the guesswork with a proven system where every piece
                supports the others, like gears in a well-oiled machine.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {visionPillars.map((p, i) => (
                <AnimatedSection key={p.title} direction="up" delay={i * 0.15}>
                  <motion.div
                    className="relative bg-card border border-border rounded-2xl p-8 text-center hover-lift h-full overflow-hidden group"
                    whileHover={{ borderColor: "hsl(217, 91%, 50%)" }}
                  >
                    {/* Gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                        <p.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                      <div className="pt-4 border-t border-border">
                        <p className="text-2xl font-extrabold text-gradient">{p.stat}</p>
                        <p className="text-xs text-muted-foreground mt-1">{p.statLabel}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Animated trust stats */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto bg-muted/50 rounded-2xl p-8 border border-border">
                {trustStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-4xl md:text-5xl font-extrabold text-gradient">
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════ WHO THIS IS FOR ═══════════════ */}
        <section className="py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">Built For Ambitious Businesses</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who Is This <span className="text-gradient">Growth Blueprint</span> For?
              </h2>
              <p className="text-muted-foreground text-lg">
                Whether you're a startup building from scratch or an enterprise scaling to new markets — this framework adapts to your business.
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {audienceSegments.map((seg, i) => (
                <AnimatedSection key={seg.title} direction="up" delay={i * 0.08}>
                  <motion.div
                    className="flex items-start gap-4 bg-card border border-border rounded-xl p-6 h-full group cursor-default"
                    whileHover={{ y: -4, boxShadow: "0 12px 24px -8px hsl(217 91% 50% / 0.12)" }}
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <seg.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{seg.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{seg.description}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ GROWTH ROADMAP ═══════════════ */}
        <section className="py-24 lg:py-32 bg-background relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, hsl(217 91% 50%) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-20">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">The Roadmap</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
                5 Stages to{" "}
                <span className="text-gradient">Unstoppable Growth</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Think of these 5 stages like building a house: you start with a strong
                foundation, then add walls, plumbing, and finally the finishing touches.
                Each step only works well because the previous one was done right.
              </p>
            </AnimatedSection>

            <div className="relative max-w-5xl mx-auto">
              {/* Vertical timeline line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent/40 to-primary/20 hidden md:block" />
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent/40 to-primary/20 md:hidden" />

              {stages.map((stage, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <AnimatedSection
                    key={stage.number}
                    direction={isEven ? "left" : "right"}
                    delay={idx * 0.1}
                    className="relative mb-20 last:mb-0"
                  >
                    {/* Timeline dot with glow */}
                    <motion.div
                      className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${stage.accent} flex items-center justify-center z-10 shadow-lg border-4 border-background`}
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <stage.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Connector line glow dot */}
                    <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${stage.accent} opacity-20 blur-xl z-0`} />

                    {/* Card */}
                    <Link
                      to={`/growth-strategy/${stage.slug}`}
                      className={`block ml-20 md:ml-0 md:w-[calc(50%-50px)] ${
                        isEven ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                      }`}
                    >
                      <motion.div
                        className="bg-card border border-border rounded-2xl p-7 md:p-9 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
                        whileHover={{ y: -4 }}
                      >
                        {/* Stage number watermark */}
                        <span className="absolute -right-2 -top-4 text-[8rem] font-extrabold text-primary/[0.03] leading-none select-none pointer-events-none">
                          {stage.number}
                        </span>

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-5">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stage.accent} flex items-center justify-center shadow-sm`}>
                              <stage.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Stage {stage.number}
                              </p>
                              <h3 className="text-xl font-bold text-foreground">{stage.name}</h3>
                            </div>
                          </div>

                          <p className="text-sm font-semibold text-primary mb-3">{stage.objective}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{stage.description}</p>

                          {/* Services tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {stage.services.map((svc) => (
                              <span
                                key={svc.slug}
                                className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full"
                              >
                                {svc.name}
                              </span>
                            ))}
                          </div>

                          {/* Outcomes */}
                          <div className="space-y-2.5 mb-5">
                            {stage.outcomes.map((o) => (
                              <div key={o} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">{o}</span>
                              </div>
                            ))}
                          </div>

                          {/* Emotional line */}
                          <div className={`${stage.accentBg} rounded-lg px-4 py-3 mb-5`}>
                            <p className="text-sm font-semibold italic text-foreground/80">
                              "{stage.emotionalLine}"
                            </p>
                          </div>

                          {/* Learn More */}
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline transition-colors">
                            Learn more about this stage <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ TRANSFORMATION ═══════════════ */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden relative">
          {/* Grid pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
                The Transformation
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                From Scattered Marketing to a{" "}
                <span className="text-cyan-300">Scalable Growth System</span>
              </h2>
              <p className="text-blue-200/80 text-lg">
                Here's a simple side-by-side look at what happens when businesses
                try to figure out online marketing on their own vs. when they follow
                a structured growth plan.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <AnimatedSection direction="left" delay={0.1}>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <X2Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Before</h3>
                      <p className="text-xs text-red-300/80">Without a growth system</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Posting on social media randomly with no clear plan",
                      "Spending hours on tasks that could be automated",
                      "Some months are great, others are terrible — no consistency",
                      "Spending money on ads but not sure if they're working",
                      "No way to track what's actually bringing in customers",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-blue-200/80 text-sm">
                        <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.2}>
                <div className="bg-white/[0.08] backdrop-blur-sm border border-emerald-400/20 rounded-2xl p-8 h-full relative overflow-hidden">
                  {/* Subtle glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">After</h3>
                        <p className="text-xs text-emerald-300/80">With our growth blueprint</p>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "One clear plan where everything — website, ads, social media — works together",
                        "Smart tools handle repetitive work, saving 40+ hours every month",
                        "Customers come in steadily and predictably, month after month",
                        "Every rupee spent on marketing is tracked, measured, and optimised",
                        "Simple dashboards show exactly what's working and what's not",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-blue-100 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Transformation metrics */}
            <AnimatedSection direction="up" delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20">
                {[
                  { label: "Revenue Increase", value: 200, suffix: "%+" },
                  { label: "Lead Quality", value: 3, suffix: "× Better" },
                  { label: "Time Saved", value: 40, suffix: " hrs/mo" },
                  { label: "Cost Efficiency", value: 65, suffix: "%", prefix: "+" },
                ].map((m) => (
                  <div key={m.label} className="text-center bg-white/[0.05] rounded-xl p-5 border border-white/10">
                    <p className="text-3xl md:text-4xl font-extrabold text-white">
                      <AnimatedCounter target={m.value} suffix={m.suffix} prefix={m.prefix || ""} />
                    </p>
                    <p className="text-xs text-blue-300/80 mt-2">{m.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════ WHY THIS WORKS ═══════════════ */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">The Philosophy</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
                Why This Approach{" "}
                <span className="text-gradient">Actually Works</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Instead of selling you one service and hoping for the best, we
                follow a simple 5-step formula. Here's why it works better than
                doing random marketing activities.
              </p>
            </AnimatedSection>

            {/* Philosophy flow */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-6xl mx-auto mb-20">
              {philosophyPillars.map((p, i) => (
                <AnimatedSection key={p.label} direction="up" delay={i * 0.1} className="flex-1">
                  <motion.div
                    className="relative bg-card border border-border rounded-2xl p-6 text-center hover-lift h-full flex flex-col items-center group"
                    whileHover={{ borderColor: "hsl(217, 91%, 50%)" }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <p.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{p.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                    {i < philosophyPillars.length - 1 && (
                      <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary z-10" />
                    )}
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Key principles */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    icon: BarChart3,
                    title: "You Can See What's Working",
                    desc: "Every action we take is measured with real numbers. No vague promises — you see exactly how many people visited, how many became customers, and how much revenue each campaign brings in.",
                  },
                  {
                    icon: Shield,
                    title: "No More Rollercoaster Months",
                    desc: "With a proper system in place, your revenue becomes predictable. You'll know roughly how many leads and sales to expect each month, making business planning much easier.",
                  },
                  {
                    icon: Brain,
                    title: "Results Keep Multiplying",
                    desc: "Each stage makes the next one more powerful. A great website makes your ads work better. Better ads bring more data. More data makes everything smarter. It's like a snowball effect.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 bg-muted/50 rounded-2xl p-6 border border-border"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1.5">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════ FUTURE VISION ═══════════════ */}
        <section className="py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">Your Future</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
                Where Will Your Business Be in{" "}
                <span className="text-gradient">12 Months?</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Close your eyes and picture this: your business runs smoothly
                with smart systems, new customers come in every single day without
                you chasing them, and everyone in your industry knows your name.
                That's not a dream — that's what this roadmap is built to deliver.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {visionCards.map((card, i) => (
                <AnimatedSection key={card.title} direction="up" delay={i * 0.15}>
                  <motion.div
                    className="bg-card border border-border rounded-2xl p-8 text-center hover-lift h-full group relative overflow-hidden"
                    whileHover={{ borderColor: "hsl(217, 91%, 50%)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                        <card.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm mb-5">{card.description}</p>
                      <div className="pt-4 border-t border-border">
                        <p className="text-2xl font-extrabold text-gradient">{card.metric}</p>
                        <p className="text-xs text-muted-foreground mt-1">{card.metricLabel}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">Common Questions</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <AnimatedSection key={i} direction="up" delay={i * 0.05}>
                  <motion.div
                    className="bg-card border border-border rounded-xl overflow-hidden"
                    whileHover={{ borderColor: "hsl(217 91% 50% / 0.3)" }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                      <motion.div
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === i ? "auto" : 0,
                        opacity: openFaq === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CONVERSION CTA ═══════════════ */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <FloatingElement className="absolute top-10 left-[15%]" duration={7}>
              <div className="w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />
            </FloatingElement>
            <FloatingElement className="absolute bottom-10 right-[10%]" duration={9} distance={12}>
              <div className="w-80 h-80 rounded-full bg-white/5 blur-3xl" />
            </FloatingElement>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedSection direction="scale">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <Lightbulb className="w-8 h-8 text-cyan-300" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Your Growth Story Starts{" "}
                  <span className="text-cyan-300">Right Here.</span>
                </h2>
                <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                  The best time to build a scalable growth system was a year ago.
                  The second-best time is today. Let's design your roadmap — together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 shadow-2xl text-base px-10 py-6 font-bold rounded-xl" asChild>
                    <Link to="/contact">
                      Book Your Free Strategy Call <ArrowUpRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-blue-200/80">
                  {["No commitment required", "Free consultation", "Custom roadmap", "Results guaranteed"].map((t) => (
                    <span key={t} className="flex items-center gap-2">
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
