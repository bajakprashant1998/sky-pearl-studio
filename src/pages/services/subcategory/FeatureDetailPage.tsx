import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    ArrowLeft, Check, ArrowRight, Settings, Zap, BarChart3, Shield,
    Target, Lightbulb, TrendingUp, Clock, Users, Award, Rocket,
    ChevronDown, ChevronUp, Play, Star, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug, ServiceStat } from "@/data/services";
import { useState } from "react";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

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
            { title: `Optimized ${title}`, desc: "Industry-leading optimization techniques", icon: Target },
            { title: "Best Practices", desc: "Implementation following proven methodologies", icon: Shield },
            { title: "Strategic Integration", desc: "Seamless fit with your marketing mix", icon: Zap },
            { title: "Enhanced UX", desc: "Improved user experience and engagement", icon: Users },
            { title: "Data-Driven", desc: "Decisions backed by comprehensive analytics", icon: BarChart3 },
            { title: "Scalable Solutions", desc: "Future-proof strategies for growth", icon: Rocket }
        ],
        process: [
            {
                step: 1,
                title: "Discovery & Audit",
                description: `We thoroughly analyze your current setup to identify gaps and opportunities within ${title}.`,
                icon: Lightbulb,
                details: ["Current state analysis", "Competitor benchmarking", "Gap identification"]
            },
            {
                step: 2,
                title: "Strategy Development",
                description: `Custom strategy crafted specifically for your ${title} objectives.`,
                icon: Target,
                details: ["Goal setting", "KPI definition", "Roadmap creation"]
            },
            {
                step: 3,
                title: "Implementation",
                description: `Our team executes targeted improvements for ${title} using proven methodologies.`,
                icon: Settings,
                details: ["Technical setup", "Content optimization", "Integration testing"]
            },
            {
                step: 4,
                title: "Monitoring & Optimization",
                description: `We continuously track the impact of ${title} on your overall campaign success.`,
                icon: BarChart3,
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
        faqs: [
            {
                question: `How does ${title} fit into my overall strategy?`,
                answer: `${title} works synergistically with other ${subcategoryTitle} efforts to create a cohesive and effective digital presence. We ensure seamless integration with your existing marketing stack.`
            },
            {
                question: `What makes your approach to ${title} unique?`,
                answer: `We combine technical expertise with creative problem-solving to deliver ${title} solutions that are both robust and innovative. Our data-driven methodology ensures measurable results.`
            },
            {
                question: `Can ${title} be customized for my industry?`,
                answer: `Absolutely. We tailor our ${title} services to meet the unique challenges and requirements of your specific sector, ensuring relevance and maximum impact.`
            },
            {
                question: `What is the expected timeline for results?`,
                answer: `While timelines vary based on project scope, most clients see initial improvements within 4-6 weeks, with significant results materializing within 3-6 months.`
            }
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

    // SEO structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": itemTitle,
        "description": content.description,
        "provider": {
            "@type": "Organization",
            "name": "Digital Bull Technology Pvt LTD",
            "url": "https://digitalbull.com"
        },
        "serviceType": subcategory.title,
        "areaServed": "Worldwide"
    };

    return (
        <>
            <Helmet>
                <title>{itemTitle} | {subcategory.title} Services - Digital Bull Technology</title>
                <meta name="description" content={content.description} />
                <meta name="keywords" content={`${itemTitle}, ${subcategory.title}, ${service.shortTitle}, digital marketing, Digital Bull Technology`} />
                <link rel="canonical" href={`https://digitalbull.com/services/${serviceSlug}/${subcategoryId}/feature/${itemSlug}`} />

                {/* Open Graph */}
                <meta property="og:title" content={`${itemTitle} | Digital Bull Technology`} />
                <meta property="og:description" content={content.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://digitalbull.com/services/${serviceSlug}/${subcategoryId}/feature/${itemSlug}`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${itemTitle} | Digital Bull Technology`} />
                <meta name="twitter:description" content={content.description} />

                {/* Structured Data */}
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section with Stats Infographic */}
                <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="container mx-auto px-4 relative">
                        {/* Breadcrumb with Schema */}
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span aria-hidden="true">/</span>
                            <Link to={`/services/${serviceSlug}`} className="hover:text-primary transition-colors">{service.shortTitle}</Link>
                            <span aria-hidden="true">/</span>
                            <Link to={`/services/${serviceSlug}/${subcategoryId}`} className="hover:text-primary transition-colors">{subcategory.title}</Link>
                            <span aria-hidden="true">/</span>
                            <span className="text-foreground" aria-current="page">{itemTitle}</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="animate-fade-up">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                                    <ServiceIcon className="w-4 h-4" />
                                    <span>{subcategory.title}</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                    {itemTitle}
                                </h1>

                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    {content.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Button variant="hero" size="lg" asChild>
                                        <Link to="/contact">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button variant="heroOutline" size="lg" asChild>
                                        <a href="#process">
                                            <Play className="w-4 h-4 mr-2" />
                                            See Our Process
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            {/* Stats Infographic Card */}
                            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
                                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-primary" />
                                        Why Choose Us
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        {content.keyStats.map((stat, index) => (
                                            <div
                                                key={index}
                                                className="text-center p-4 rounded-2xl bg-muted/50 hover:bg-primary/5 transition-colors"
                                                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                                            >
                                                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                                                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Grid with Icons */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Key <span className="text-gradient">Benefits</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Discover how our {itemTitle} services drive real business results
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {content.benefits.map((benefit, index) => (
                                <article
                                    key={index}
                                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-up group"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <benefit.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Timeline Infographic */}
                <section id="process" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Our <span className="text-gradient">Process</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                A proven 4-step approach to delivering exceptional results
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {content.process.map((step, index) => (
                                    <article
                                        key={index}
                                        className="relative animate-fade-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {/* Connector Line */}
                                        {index < content.process.length - 1 && (
                                            <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                                        )}

                                        <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full relative z-10">
                                            {/* Step Number */}
                                            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mb-4 shadow-lg">
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
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* What You Get - Deliverables */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    What You <span className="text-gradient">Get</span>
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    {content.longDescription}
                                </p>
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/contact">
                                        Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-primary" />
                                    Deliverables
                                </h3>
                                <ul className="space-y-4">
                                    {content.deliverables.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 animate-fade-up"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs with Schema */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Frequently Asked <span className="text-gradient">Questions</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Get answers to common questions about our {itemTitle} services
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {content.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                                        aria-expanded={openFaqIndex === index}
                                    >
                                        <span className="font-semibold pr-4">{faq.question}</span>
                                        {openFaqIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                        )}
                                    </button>
                                    <div className={cn(
                                        "overflow-hidden transition-all duration-300",
                                        openFaqIndex === index ? "max-h-96" : "max-h-0"
                                    )}>
                                        <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20">
                    <div className="container mx-auto px-4 text-center">
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
                            <Button variant="outline" size="lg" asChild>
                                <Link to={`/services/${serviceSlug}/${subcategoryId}`}>
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to {subcategory.title}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default FeatureDetailPage;
