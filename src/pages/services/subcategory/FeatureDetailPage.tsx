import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    ArrowLeft, Check, ArrowRight, Settings, Zap, BarChart3, Shield,
    Target, Lightbulb, TrendingUp, Clock, Users, Award, Rocket,
    ChevronDown, Play, Star, CheckCircle2, Quote, X, Phone,
    MessageCircle, Sparkles, Globe, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug, ServiceStat } from "@/data/services";
import { useState, useEffect, useRef } from "react";
import NotFound from "@/pages/NotFound";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
    BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Animated counter component
const AnimatedCounter = ({ value }: { value: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const numericPart = value.replace(/[^0-9.]/g, "");
    const prefix = value.replace(/[0-9.]+.*/, "");
    const afterNum = value.replace(/.*[0-9.]/, "");
    const [count, setCount] = useState(0);
    const target = parseFloat(numericPart) || 0;

    useEffect(() => {
        if (!isInView || target === 0) return;
        let start = 0;
        const duration = 1400;
        const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step); else setCount(target);
        };
        requestAnimationFrame(step);
    }, [isInView, target]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{isInView ? count : 0}{afterNum}
        </span>
    );
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }
    })
};

const testimonials = [
    { quote: "The results exceeded our expectations. We saw a 300% increase in qualified leads within the first quarter.", name: "Rajesh Kumar", role: "Marketing Director", company: "TechVista Solutions", result: "+300% Leads" },
    { quote: "Professional execution and transparent reporting. They truly understand what it takes to deliver ROI.", name: "Priya Sharma", role: "CEO", company: "GrowthEdge Digital", result: "5x ROI" },
    { quote: "Their strategic approach transformed our online presence completely. Highly recommended for any business.", name: "Amit Patel", role: "Founder", company: "NextLevel Commerce", result: "+200% Traffic" },
];

const comparisonData = [
    { feature: "Dedicated Project Manager", us: true, others: false },
    { feature: "Weekly Performance Reports", us: true, others: false },
    { feature: "Custom Strategy", us: true, others: false },
    { feature: "24/7 Support", us: true, others: false },
    { feature: "Free Audit & Consultation", us: true, others: false },
    { feature: "AI-Powered Insights", us: true, others: false },
];

const trustBadges = ["Google Partner", "Meta Business Partner", "ISO 27001", "500+ Clients", "4.9★ Rating"];

// Feature-specific content generator with rich data
const generateFeatureContent = (title: string, subcategoryTitle: string, serviceTitle: string, customStats?: ServiceStat[]) => {
    return {
        description: `Comprehensive ${title} services designed to enhance your ${subcategoryTitle} performance and drive measurable business growth.`,
        longDescription: `${title} is a critical component of successful ${subcategoryTitle}. Our approach ensures that every aspect of ${title} is optimized to meet your specific business objectives, delivering measurable results as part of our broader ${serviceTitle} offerings. We combine industry best practices with innovative strategies to help you stay ahead of the competition.`,
        keyStats: customStats || [
            { value: "98%", label: "Client Satisfaction", icon: Star },
            { value: "3x", label: "Average ROI", icon: TrendingUp },
            { value: "24/7", label: "Expert Support", icon: Clock },
            { value: "500+", label: "Projects Delivered", icon: Award }
        ],
        benefits: [
            { title: `Optimized ${title}`, desc: "Industry-leading optimization techniques for maximum impact", icon: Target },
            { title: "Best Practices", desc: "Implementation following proven methodologies and standards", icon: Shield },
            { title: "Strategic Integration", desc: "Seamless fit with your overall marketing mix", icon: Zap },
            { title: "Enhanced UX", desc: "Improved user experience and deeper engagement", icon: Users },
            { title: "Data-Driven", desc: "Decisions backed by comprehensive analytics and insights", icon: BarChart3 },
            { title: "Scalable Solutions", desc: "Future-proof strategies built for sustained growth", icon: Rocket }
        ],
        process: [
            {
                step: 1, title: "Discovery & Audit", icon: Lightbulb,
                description: `We thoroughly analyze your current setup to identify gaps and opportunities within ${title}.`,
                details: ["Current state analysis", "Competitor benchmarking", "Gap identification"]
            },
            {
                step: 2, title: "Strategy Development", icon: Target,
                description: `Custom strategy crafted specifically for your ${title} objectives.`,
                details: ["Goal setting", "KPI definition", "Roadmap creation"]
            },
            {
                step: 3, title: "Implementation", icon: Settings,
                description: `Our team executes targeted improvements for ${title} using proven methodologies.`,
                details: ["Technical setup", "Content optimization", "Integration testing"]
            },
            {
                step: 4, title: "Monitoring & Optimization", icon: BarChart3,
                description: `We continuously track the impact of ${title} on your overall campaign success.`,
                details: ["Real-time tracking", "Performance analysis", "Continuous improvement"]
            }
        ],
        deliverables: [
            "Comprehensive audit report",
            "Custom strategy document",
            "Implementation roadmap",
            "Monthly performance reports",
            "Dedicated account manager",
            "Priority support access"
        ],
        useCases: [
            { title: "Startups", desc: `Launch with a strong ${title} foundation from day one`, icon: Rocket },
            { title: "SMBs", desc: `Scale your ${title} to compete with larger players`, icon: TrendingUp },
            { title: "Enterprise", desc: `Enterprise-grade ${title} with custom SLAs`, icon: Globe },
        ],
        faqs: [
            { question: `How does ${title} fit into my overall strategy?`, answer: `${title} works synergistically with other ${subcategoryTitle} efforts to create a cohesive and effective digital presence. We ensure seamless integration with your existing marketing stack.` },
            { question: `What makes your approach to ${title} unique?`, answer: `We combine technical expertise with creative problem-solving to deliver ${title} solutions that are both robust and innovative. Our data-driven methodology ensures measurable results.` },
            { question: `Can ${title} be customized for my industry?`, answer: `Absolutely. We tailor our ${title} services to meet the unique challenges and requirements of your specific sector, ensuring relevance and maximum impact.` },
            { question: `What is the expected timeline for results?`, answer: `While timelines vary based on project scope, most clients see initial improvements within 4-6 weeks, with significant results materializing within 3-6 months.` },
            { question: `What kind of reporting do you provide?`, answer: `We provide weekly progress updates and comprehensive monthly reports with KPI tracking, insights, and strategic recommendations for continuous improvement.` }
        ]
    };
};

const FeatureDetailPage = () => {
    const { serviceSlug, subcategoryId, itemSlug } = useParams<{
        serviceSlug: string;
        subcategoryId: string;
        itemSlug: string;
    }>();

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
        return () => clearInterval(timer);
    }, []);

    if (!serviceSlug || !subcategoryId || !itemSlug) return <NotFound />;

    const service = getServiceBySlug(serviceSlug);
    if (!service) return <NotFound />;

    const subcategory = service.subcategories.find(sub => sub.id === subcategoryId);
    if (!subcategory) return <NotFound />;

    const foundItem = subcategory.items.find(item =>
        item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemSlug
    );

    const itemTitle = foundItem ? foundItem.name : itemSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const content = generateFeatureContent(itemTitle, subcategory.title, service.title, foundItem?.stats);
    const ServiceIcon = service.icon;

    // Related items (other features in the same subcategory)
    const relatedItems = subcategory.items.filter(item =>
        item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') !== itemSlug
    ).slice(0, 3);

    // SEO structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": itemTitle,
        "description": content.description,
        "provider": {
            "@type": "Organization",
            "name": "Digital Bull Technology Pvt LTD",
            "url": "https://dibull.com"
        },
        "serviceType": subcategory.title,
        "areaServed": "Worldwide"
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
    };

    return (
        <>
            <Helmet>
                <title>{itemTitle} | {subcategory.title} Services - Digital Bull Technology</title>
                <meta name="description" content={content.description} />
                <meta name="keywords" content={`${itemTitle}, ${subcategory.title}, ${service.shortTitle}, digital marketing, Digital Bull Technology`} />
                <link rel="canonical" href={`https://dibull.com/services/${serviceSlug}/${subcategoryId}/feature/${itemSlug}`} />
                <meta property="og:title" content={`${itemTitle} | Digital Bull Technology`} />
                <meta property="og:description" content={content.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://dibull.com/services/${serviceSlug}/${subcategoryId}/feature/${itemSlug}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${itemTitle} | Digital Bull Technology`} />
                <meta name="twitter:description" content={content.description} />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
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
                        {/* Breadcrumb */}
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <Breadcrumb className="mb-8">
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild><Link to={`/services/${serviceSlug}`} className="text-muted-foreground hover:text-primary">{service.shortTitle}</Link></BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild><Link to={`/services/${serviceSlug}/${subcategoryId}`} className="text-muted-foreground hover:text-primary">{subcategory.title}</Link></BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{itemTitle}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <motion.div
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <ServiceIcon className="w-4 h-4" />
                                    <span>{subcategory.title}</span>
                                </motion.div>

                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15, duration: 0.5 }}
                                >
                                    {itemTitle}
                                </motion.h1>

                                <motion.p
                                    className="text-xl text-muted-foreground leading-relaxed mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    {content.description}
                                </motion.p>

                                <motion.div
                                    className="flex flex-wrap gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.5 }}
                                >
                                    <Button variant="hero" size="lg" className="group" asChild>
                                        <Link to="/contact">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                    <Button variant="heroOutline" size="lg" asChild>
                                        <a href="#process">
                                            <Play className="w-4 h-4 mr-2" />
                                            See Our Process
                                        </a>
                                    </Button>
                                </motion.div>
                            </div>

                            {/* Stats Infographic Card */}
                            <motion.div
                                className="bg-card rounded-3xl p-8 border border-border shadow-xl"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    Why Choose Us
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    {content.keyStats.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            className="text-center p-4 rounded-2xl bg-muted/50 hover:bg-primary/5 transition-colors"
                                            whileHover={{ y: -4, scale: 1.03 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                                            <div className="text-3xl font-bold text-primary mb-1">
                                                <AnimatedCounter value={stat.value} />
                                            </div>
                                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Trust Badges Strip */}
                <section className="py-4 bg-muted/50 border-y border-border">
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

                {/* Benefits Grid with Icons */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp} custom={0}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Key Benefits</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Why <span className="text-gradient">{itemTitle}</span> Matters
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Discover how our {itemTitle} services drive real business results
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {content.benefits.map((benefit, index) => (
                                <motion.article
                                    key={index}
                                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    variants={fadeUp} custom={index}
                                    whileHover={{ y: -6 }}
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <benefit.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Timeline */}
                <section id="process" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp} custom={0}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Our Process</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                How We Deliver <span className="text-gradient">Results</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">A proven 4-step approach to delivering exceptional outcomes</p>
                        </motion.div>

                        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {content.process.map((step, index) => (
                                <motion.article
                                    key={index}
                                    className="relative"
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    variants={fadeUp} custom={index}
                                >
                                    {index < content.process.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                                    )}
                                    <motion.div
                                        className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full relative z-10 group"
                                        whileHover={{ y: -6 }}
                                    >
                                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                            {step.step}
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <step.icon className="w-5 h-5 text-primary" />
                                            <h3 className="text-lg font-bold">{step.title}</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                                        <ul className="space-y-2">
                                            {step.details.map((detail, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp} custom={0}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">The Difference</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Why We <span className="text-gradient">Stand Out</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto bg-card rounded-2xl border border-border overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                                <div className="p-4 font-semibold text-sm">Feature</div>
                                <div className="p-4 font-semibold text-center text-sm text-primary">Digital Bull</div>
                                <div className="p-4 font-semibold text-center text-sm text-muted-foreground">Others</div>
                            </div>
                            {comparisonData.map((row, i) => (
                                <motion.div
                                    key={i}
                                    className="grid grid-cols-3 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <div className="p-4 text-sm font-medium">{row.feature}</div>
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

                {/* What You Get - Deliverables */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                                    Deliverables
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    What You <span className="text-gradient">Get</span>
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    {content.longDescription}
                                </p>
                                <Button variant="hero" size="lg" className="group" asChild>
                                    <Link to="/contact">
                                        Start Your Project <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                className="bg-card rounded-3xl p-8 border border-border shadow-lg"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-primary" />
                                    Included in Every Package
                                </h3>
                                <ul className="space-y-4">
                                    {content.deliverables.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-start gap-3"
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.06 }}
                                        >
                                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-foreground">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp} custom={0}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Who It's For</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Perfect for <span className="text-gradient">Every Business</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {content.useCases.map((uc, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-card rounded-2xl p-8 border border-border text-center hover:border-primary/50 hover:shadow-xl transition-all group"
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    variants={fadeUp} custom={i}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                                        <uc.icon className="w-8 h-8 text-primary-foreground" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{uc.title}</h3>
                                    <p className="text-sm text-muted-foreground">{uc.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Carousel */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-12"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp} custom={0}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Client Success</span>
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
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <blockquote className="text-xl lg:text-2xl font-medium mb-8 leading-relaxed">
                                        "{testimonials[activeTestimonial].quote}"
                                    </blockquote>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{testimonials[activeTestimonial].name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}</p>
                                        </div>
                                        <div className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-bold">
                                            {testimonials[activeTestimonial].result}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
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

                {/* FAQs */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp} custom={0}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">FAQs</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Frequently Asked <span className="text-gradient">Questions</span>
                            </h2>
                        </motion.div>

                        <div className="max-w-3xl mx-auto space-y-3">
                            {content.faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-card rounded-xl border border-border overflow-hidden"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                                        aria-expanded={openFaqIndex === i}
                                    >
                                        <span className="font-semibold pr-4">{faq.question}</span>
                                        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaqIndex === i ? "rotate-180" : ""}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openFaqIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                {relatedItems.length > 0 && (
                    <section className="py-20 bg-muted/30">
                        <div className="container mx-auto px-4">
                            <motion.div
                                className="text-center max-w-3xl mx-auto mb-16"
                                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUp} custom={0}
                            >
                                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">Explore More</span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Related <span className="text-gradient">Services</span>
                                </h2>
                            </motion.div>

                            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                {relatedItems.map((item, i) => {
                                    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                    const colors = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-amber-500 to-orange-500"];
                                    return (
                                        <motion.div
                                            key={i}
                                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                                            variants={fadeUp} custom={i}
                                        >
                                            <Link
                                                to={`/services/${serviceSlug}/${subcategoryId}/feature/${slug}`}
                                                className="block group"
                                            >
                                                <motion.div
                                                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full"
                                                    whileHover={{ y: -6 }}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors[i % 3]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                                        <Layers className="w-6 h-6 text-white" />
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                                                    <span className="text-sm font-medium text-primary flex items-center">
                                                        Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

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
                                Ready to Get Started with <span className="text-gradient">{itemTitle}</span>?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Let's discuss how we can help you achieve your goals. Get a free consultation today.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/contact">
                                        Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button variant="heroOutline" size="lg" asChild>
                                    <Link to={`/services/${serviceSlug}/${subcategoryId}`}>
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to {subcategory.title}
                                    </Link>
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

export default FeatureDetailPage;
