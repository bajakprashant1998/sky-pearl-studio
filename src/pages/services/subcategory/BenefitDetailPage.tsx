import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
    ArrowLeft, Check, ArrowRight, TrendingUp, Target, Award, Shield, Users, 
    ChevronDown, ChevronUp, Zap, BarChart3, Rocket, Clock, Star,
    CheckCircle2, LineChart, PieChart, Phone, Mail, Globe, Sparkles,
    BadgeCheck, Layers, Settings, Eye, ThumbsUp, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug } from "@/data/services";
import { getSubcategoryData } from "@/data/subcategoryData";
import { useState } from "react";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";
import AnimatedSection from "@/components/AnimatedSection";

// Benefit-specific content generator with rich data
const generateBenefitContent = (title: string, subcategoryTitle: string) => {
    return {
        description: `Realize the full value of your investment with ${title} - a key advantage of our ${subcategoryTitle} services.`,
        longDescription: `Achieving ${title} is a primary goal for many businesses utilizing ${subcategoryTitle}. Our expertise ensures that you not only reach this milestone but sustain it. We focus on delivering ${title} through strategic planning, efficient execution, and continuous optimization, driving tangible growth and competitive advantage.`,
        detailedOverview: `In today's competitive digital landscape, ${title} has become more crucial than ever. Our comprehensive approach to ${subcategoryTitle} ensures that your business doesn't just achieve ${title}, but maintains and builds upon it over time. We leverage cutting-edge strategies, data-driven insights, and industry best practices to deliver measurable results that directly impact your bottom line.`,
        keyFeatures: [
            { title: "Data-Driven Strategy", desc: "Every decision backed by comprehensive analytics and market research", icon: BarChart3 },
            { title: "Custom Solutions", desc: "Tailored approaches designed specifically for your business goals", icon: Settings },
            { title: "Continuous Optimization", desc: "Ongoing refinements to maximize performance and ROI", icon: TrendingUp },
            { title: "Expert Team", desc: "Industry veterans with proven track records of success", icon: Users },
            { title: "Transparent Reporting", desc: "Clear, detailed reports on progress and performance", icon: Eye },
            { title: "24/7 Support", desc: "Dedicated support team always available to assist you", icon: MessageCircle }
        ],
        metrics: [
            { value: "150%", label: "Average Improvement", icon: TrendingUp, color: "from-primary to-accent" },
            { value: "60%", label: "Cost Reduction", icon: PieChart, color: "from-primary to-accent" },
            { value: "2x", label: "Faster Results", icon: Clock, color: "from-primary to-accent" },
            { value: "95%", label: "Success Rate", icon: Award, color: "from-primary to-accent" }
        ],
        impactAreas: [
            { 
                title: "Revenue Growth", 
                desc: "Direct positive impact on your bottom line through improved performance",
                icon: LineChart,
                stat: "+35%"
            },
            { 
                title: "Competitive Edge", 
                desc: "Stand out from competitors with superior results",
                icon: Rocket,
                stat: "Top 10%"
            },
            { 
                title: "Efficiency Gains", 
                desc: "Streamlined processes that save time and resources",
                icon: Zap,
                stat: "40% faster"
            },
            { 
                title: "Customer Satisfaction", 
                desc: "Enhanced experiences that drive loyalty and retention",
                icon: Users,
                stat: "98% happy"
            },
            { 
                title: "Sustainability", 
                desc: "Long-term results that continue to deliver value",
                icon: Shield,
                stat: "12+ months"
            },
            { 
                title: "Brand Authority", 
                desc: "Build trust and credibility in your industry",
                icon: Award,
                stat: "3x growth"
            }
        ],
        performanceStats: [
            { label: "Client Retention Rate", value: 97, suffix: "%" },
            { label: "Projects Completed", value: 500, suffix: "+" },
            { label: "Industries Served", value: 25, suffix: "+" },
            { label: "Team Experts", value: 50, suffix: "+" }
        ],
        howWeDeliver: [
            {
                step: 1,
                title: "Discovery & Assessment",
                desc: "We thoroughly evaluate your current state, identify opportunities, and understand your unique business goals and challenges.",
                details: ["Comprehensive audit", "Competitor analysis", "Goal alignment", "Gap identification"]
            },
            {
                step: 2,
                title: "Strategic Planning",
                desc: "Custom roadmap designed to achieve this specific benefit with clear milestones and measurable KPIs.",
                details: ["Custom strategy", "Timeline creation", "Resource planning", "KPI definition"]
            },
            {
                step: 3,
                title: "Expert Implementation",
                desc: "Our specialists execute the strategy with precision, continuous monitoring, and real-time adjustments.",
                details: ["Technical execution", "Quality assurance", "Progress tracking", "Regular updates"]
            },
            {
                step: 4,
                title: "Optimization & Growth",
                desc: "Ongoing refinement and scaling to maximize and sustain results while exploring new opportunities.",
                details: ["Performance analysis", "Continuous improvement", "Scaling strategies", "Innovation focus"]
            }
        ],
        successStories: [
            {
                industry: "E-commerce",
                improvement: "+180%",
                metric: "Organic Traffic",
                timeline: "6 months"
            },
            {
                industry: "SaaS",
                improvement: "+250%",
                metric: "Lead Generation",
                timeline: "4 months"
            },
            {
                industry: "Healthcare",
                improvement: "+120%",
                metric: "Conversions",
                timeline: "5 months"
            }
        ],
        testimonial: {
            quote: `The improvement in ${title} exceeded our expectations. Digital Bull's approach was methodical and effective. They truly understand the nuances of digital marketing and delivered exceptional results.`,
            author: "Marketing Director",
            company: "Fortune 500 Client",
            rating: 5,
            avatar: "MD"
        },
        faqs: [
            {
                question: `Why is ${title} considered a key benefit?`,
                answer: `${title} directly correlates with business success, offering a clear indicator of performance and value generation from your ${subcategoryTitle} initiatives. It provides measurable improvements that impact your overall business objectives.`
            },
            {
                question: `How do you measure success in terms of ${title}?`,
                answer: `We use specific KPIs and analytics to track progress towards ${title}, ensuring complete transparency and accountability with detailed monthly reports. Our measurement framework includes both quantitative metrics and qualitative assessments.`
            },
            {
                question: `What is the typical timeframe to achieve ${title}?`,
                answer: `While timelines vary based on your specific situation, our strategies are designed to accelerate the realization of ${title}, aiming for quick wins within 4-6 weeks followed by sustained improvement over 3-6 months.`
            },
            {
                question: `Is ${title} guaranteed?`,
                answer: `While we can't guarantee specific outcomes due to various external factors, our track record shows consistent success in delivering ${title} for our clients across various industries. We're committed to achieving the best possible results.`
            },
            {
                question: `What makes your approach to ${title} different?`,
                answer: `Our approach combines data-driven strategies with creative innovation. We don't use cookie-cutter solutions – every strategy is tailored to your specific business needs, industry dynamics, and competitive landscape.`
            },
            {
                question: `How do you ensure long-term sustainability of ${title}?`,
                answer: `We build sustainable strategies that adapt to market changes. Our ongoing optimization process ensures that your results not only maintain but continue to improve over time through continuous refinement and innovation.`
            }
        ]
    };
};

const BenefitDetailPage = () => {
    const { serviceSlug, subcategoryId, itemSlug } = useParams<{
        serviceSlug: string;
        subcategoryId: string;
        itemSlug: string;
    }>();

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    if (!serviceSlug || !subcategoryId || !itemSlug) return <NotFound />;

    const service = getServiceBySlug(serviceSlug);
    if (!service) return <NotFound />;

    const subcategory = service.subcategories.find(sub => sub.id === subcategoryId);
    if (!subcategory) return <NotFound />;

    const subData = getSubcategoryData(subcategory.id, subcategory.title, service.title, subcategory.items.map(i => i.name));
    const foundBenefit = subData.keyBenefits.find(benefit =>
        benefit.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemSlug
    );

    const itemTitle = foundBenefit || itemSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const content = generateBenefitContent(itemTitle, subcategory.title);

    // SEO structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${itemTitle} - ${subcategory.title}`,
        "description": content.description,
        "provider": {
            "@type": "Organization",
            "name": "Digital Bull Technology Pvt LTD",
            "url": "https://dibull.com"
        },
        "serviceType": subcategory.title,
        "areaServed": "Worldwide"
    };

    return (
        <>
            <Helmet>
                <title>{itemTitle} | {subcategory.title} Benefits - Digital Bull Technology</title>
                <meta name="description" content={content.description} />
                <meta name="keywords" content={`${itemTitle}, ${subcategory.title}, ${service.shortTitle}, digital marketing benefits, Digital Bull Technology`} />
                <link rel="canonical" href={`https://digitalbull.com/services/${serviceSlug}/${subcategoryId}/benefit/${itemSlug}`} />
                
                {/* Open Graph */}
                <meta property="og:title" content={`${itemTitle} | Digital Bull Technology`} />
                <meta property="og:description" content={content.description} />
                <meta property="og:type" content="website" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${itemTitle} | Digital Bull Technology`} />
                <meta name="twitter:description" content={content.description} />
                
                {/* Structured Data */}
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section - Enhanced with Blue Theme */}
                <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/30 via-background to-primary/5 dark:from-primary/10 dark:to-accent/5 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full opacity-50" />

                    <div className="container mx-auto px-4 relative">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span aria-hidden="true">/</span>
                            <Link to={`/services/${serviceSlug}`} className="hover:text-primary transition-colors">{service.shortTitle}</Link>
                            <span aria-hidden="true">/</span>
                            <Link to={`/services/${serviceSlug}/${subcategoryId}`} className="hover:text-primary transition-colors">{subcategory.title}</Link>
                            <span aria-hidden="true">/</span>
                            <span className="text-foreground font-medium" aria-current="page">{itemTitle}</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection direction="up">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Key Benefit</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                                    {itemTitle}
                                </h1>

                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    {content.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mb-8">
                                    <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                                        <Link to="/contact">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild className="border-primary/30 hover:bg-primary/5">
                                        <a href="tel:+919974916002">
                                            <Phone className="w-4 h-4 mr-2" /> Call Now
                                        </a>
                                    </Button>
                                </div>

                                {/* Quick Stats Row */}
                                <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        <BadgeCheck className="w-5 h-5 text-primary" />
                                        <span className="text-sm text-muted-foreground">Verified Results</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" />
                                        <span className="text-sm text-muted-foreground">500+ Clients</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-5 h-5 text-primary" />
                                        <span className="text-sm text-muted-foreground">Award Winning</span>
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Metrics Infographic Card */}
                            <AnimatedSection direction="up" delay={0.2}>
                                <div className="bg-card rounded-2xl p-8 border border-border shadow-xl relative overflow-hidden">
                                    {/* Decorative corner */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
                                    
                                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-primary" />
                                        Expected Results
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {content.metrics.map((metric, index) => (
                                            <div 
                                                key={index} 
                                                className="text-center p-5 rounded-xl bg-gradient-to-br from-secondary/50 to-primary/5 dark:from-primary/10 dark:to-accent/5 hover:shadow-md transition-all duration-300 group"
                                            >
                                                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <metric.icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                                                <div className="text-sm text-muted-foreground">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Detailed Overview Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <AnimatedSection direction="up">
                                    <span className="inline-block text-primary font-semibold mb-3 uppercase tracking-wider text-sm">Overview</span>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                        Why <span className="text-primary">{itemTitle}</span> Matters
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                        {content.longDescription}
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {content.detailedOverview}
                                    </p>
                                </AnimatedSection>

                                {/* Stats Infographic */}
                                <AnimatedSection direction="up" delay={0.2}>
                                    <div className="grid grid-cols-2 gap-4">
                                        {content.performanceStats.map((stat, index) => (
                                            <div 
                                                key={index}
                                                className="bg-card rounded-xl p-6 border border-border text-center hover:border-primary/30 transition-colors group"
                                            >
                                                <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform inline-block">
                                                    {stat.value}{stat.suffix}
                                                </div>
                                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block text-primary font-semibold mb-3 uppercase tracking-wider text-sm">What You Get</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Key <span className="text-primary">Features</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Everything included to help you achieve {itemTitle}
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {content.keyFeatures.map((feature, index) => (
                                <AnimatedSection key={index} direction="up" delay={index * 0.05}>
                                    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full group">
                                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                            <feature.icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Business Impact Section - Clean Card Design */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block text-primary font-semibold mb-3 uppercase tracking-wider text-sm">Results</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Business <span className="text-primary">Impact</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                How achieving {itemTitle} transforms your business
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {content.impactAreas.map((area, index) => (
                                <AnimatedSection key={index} direction="up" delay={index * 0.05}>
                                    <article className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group relative overflow-hidden h-full">
                                        {/* Background stat - subtle watermark effect */}
                                        <div className="absolute top-2 right-4 text-5xl md:text-6xl font-bold text-primary/5 dark:text-primary/10 select-none pointer-events-none">
                                            {area.stat}
                                        </div>
                                        
                                        <div className="relative z-10">
                                            {/* Icon with primary color background */}
                                            <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <area.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 text-foreground">{area.title}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{area.desc}</p>
                                        </div>
                                    </article>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Success Stories Infographic */}
                <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block text-primary font-semibold mb-3 uppercase tracking-wider text-sm">Proven Results</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Success <span className="text-primary">Stories</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Real results from real clients across industries
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {content.successStories.map((story, index) => (
                                <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                                    <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                                <TrendingUp className="w-8 h-8 text-primary" />
                                            </div>
                                            <div className="text-4xl font-bold text-primary mb-2">{story.improvement}</div>
                                            <div className="text-lg font-semibold text-foreground mb-1">{story.metric}</div>
                                            <div className="text-sm text-muted-foreground mb-3">{story.industry}</div>
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                                                <Clock className="w-3 h-3" /> {story.timeline}
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How We Deliver - Enhanced Process */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-primary font-semibold mb-3 uppercase tracking-wider text-sm">Our Process</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                How We <span className="text-primary">Deliver</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our proven 4-step approach to achieving {itemTitle}
                            </p>
                        </AnimatedSection>

                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                {content.howWeDeliver.map((step, index) => (
                                    <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                                        <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full group">
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                                                    <p className="text-muted-foreground mb-4">{step.desc}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {step.details.map((detail, i) => (
                                                            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 rounded-full text-xs text-muted-foreground">
                                                                <Check className="w-3 h-3 text-primary" /> {detail}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial - Enhanced */}
                <section className="py-20 bg-gradient-to-br from-secondary/30 via-background to-primary/5">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up">
                            <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 lg:p-12 border border-border text-center relative overflow-hidden shadow-xl">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                                <div className="absolute top-6 left-6 text-8xl text-primary/10 font-serif">"</div>

                                <div className="relative z-10">
                                    {/* Avatar */}
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                                        {content.testimonial.avatar}
                                    </div>

                                    {/* Stars */}
                                    <div className="flex justify-center gap-1 mb-6">
                                        {[...Array(content.testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                                        ))}
                                    </div>

                                    <blockquote className="text-xl lg:text-2xl font-medium mb-8 text-foreground leading-relaxed">
                                        "{content.testimonial.quote}"
                                    </blockquote>

                                    <div>
                                        <p className="font-bold text-lg text-foreground">{content.testimonial.author}</p>
                                        <p className="text-muted-foreground">{content.testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* FAQs - Enhanced */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block text-primary font-semibold mb-3 uppercase tracking-wider text-sm">FAQ</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Frequently Asked <span className="text-primary">Questions</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Everything you need to know about {itemTitle}
                            </p>
                        </AnimatedSection>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {content.faqs.map((faq, index) => (
                                <AnimatedSection key={index} direction="up" delay={index * 0.05}>
                                    <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors">
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                                            aria-expanded={openFaqIndex === index}
                                        >
                                            <span className="font-semibold pr-4 text-foreground">{faq.question}</span>
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                                                openFaqIndex === index ? "bg-primary text-primary-foreground" : "bg-muted"
                                            )}>
                                                {openFaqIndex === index ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </div>
                                        </button>
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-300",
                                            openFaqIndex === index ? "max-h-96" : "max-h-0"
                                        )}>
                                            <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section - Enhanced */}
                <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_40%)]" />
                    
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <AnimatedSection direction="up">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary-foreground">
                                Ready to Achieve {itemTitle}?
                            </h2>
                            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                                Let's discuss how we can help you realize this benefit for your business. Get a free consultation today.
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90 shadow-lg">
                                    <Link to="/contact">
                                        Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                                    <Link to={`/services/${serviceSlug}/${subcategoryId}`}>
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to {subcategory.title}
                                    </Link>
                                </Button>
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/90">
                                <a href="tel:+919974916002" className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Phone className="w-5 h-5" />
                                    <span>+91 99749 16002</span>
                                </a>
                                <a href="mailto:info@dibull.com" className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Mail className="w-5 h-5" />
                                    <span>info@dibull.com</span>
                                </a>
                                <a href="https://dibull.com" className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Globe className="w-5 h-5" />
                                    <span>dibull.com</span>
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default BenefitDetailPage;
