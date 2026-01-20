import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
    ArrowLeft, Check, ArrowRight, TrendingUp, Target, Award, Shield, Users, 
    ChevronDown, ChevronUp, Zap, BarChart3, Rocket, Clock, Star,
    CheckCircle2, LineChart, PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug } from "@/data/services";
import { getSubcategoryData } from "@/data/subcategoryData";
import { useState } from "react";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

// Benefit-specific content generator with rich data
const generateBenefitContent = (title: string, subcategoryTitle: string) => {
    return {
        description: `Realize the full value of your investment with ${title} - a key advantage of our ${subcategoryTitle} services.`,
        longDescription: `Achieving ${title} is a primary goal for many businesses utilizing ${subcategoryTitle}. Our expertise ensures that you not only reach this milestone but sustain it. We focus on delivering ${title} through strategic planning, efficient execution, and continuous optimization, driving tangible growth and competitive advantage.`,
        metrics: [
            { value: "150%", label: "Average Improvement", icon: TrendingUp },
            { value: "60%", label: "Cost Reduction", icon: PieChart },
            { value: "2x", label: "Faster Results", icon: Clock },
            { value: "95%", label: "Success Rate", icon: Award }
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
            }
        ],
        howWeDeliver: [
            {
                step: 1,
                title: "Assessment",
                desc: "We evaluate your current state and identify opportunities"
            },
            {
                step: 2,
                title: "Strategy",
                desc: "Custom roadmap designed to achieve this specific benefit"
            },
            {
                step: 3,
                title: "Implementation",
                desc: "Expert execution with continuous monitoring"
            },
            {
                step: 4,
                title: "Optimization",
                desc: "Ongoing refinement to maximize and sustain results"
            }
        ],
        testimonial: {
            quote: `The improvement in ${title} exceeded our expectations. Digital Bull's approach was methodical and effective.`,
            author: "Marketing Director",
            company: "Fortune 500 Client",
            rating: 5
        },
        faqs: [
            {
                question: `Why is ${title} considered a key benefit?`,
                answer: `${title} directly correlates with business success, offering a clear indicator of performance and value generation from your ${subcategoryTitle} initiatives.`
            },
            {
                question: `How do you measure success in terms of ${title}?`,
                answer: `We use specific KPIs and analytics to track progress towards ${title}, ensuring complete transparency and accountability with detailed monthly reports.`
            },
            {
                question: `What is the typical timeframe to achieve ${title}?`,
                answer: `While timelines vary, our strategies are designed to accelerate the realization of ${title}, aiming for quick wins within 4-6 weeks followed by sustained improvement over 3-6 months.`
            },
            {
                question: `Is ${title} guaranteed?`,
                answer: `While we can't guarantee specific outcomes, our track record shows consistent success in delivering ${title} for our clients across various industries.`
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
    const ServiceIcon = service.icon;

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
                {/* Hero Section with Metrics Infographic */}
                <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50/50 via-background to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="container mx-auto px-4 relative">
                        {/* Breadcrumb */}
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
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium mb-6">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Key Benefit</span>
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
                                            Achieve This Benefit <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Metrics Infographic */}
                            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
                                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-green-600" />
                                        Expected Results
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        {content.metrics.map((metric, index) => (
                                            <div 
                                                key={index} 
                                                className="text-center p-4 rounded-2xl bg-green-50/50 dark:bg-green-900/10 hover:bg-green-100/50 dark:hover:bg-green-900/20 transition-colors"
                                            >
                                                <metric.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                                <div className="text-3xl font-bold text-green-600 mb-1">{metric.value}</div>
                                                <div className="text-sm text-muted-foreground">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why This Matters */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Why This <span className="text-gradient">Matters</span>
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                    {content.longDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Areas - Visual Infographic */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Business <span className="text-gradient">Impact</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                How achieving {itemTitle} transforms your business
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {content.impactAreas.map((area, index) => (
                                <article
                                    key={index}
                                    className="bg-card rounded-2xl p-6 border border-border hover:border-green-500/50 hover:shadow-xl transition-all duration-300 animate-fade-up group relative overflow-hidden"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Background stat */}
                                    <div className="absolute -top-4 -right-4 text-6xl font-bold text-green-100 dark:text-green-900/30 opacity-50 group-hover:opacity-80 transition-opacity">
                                        {area.stat}
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <area.icon className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{area.title}</h3>
                                        <p className="text-muted-foreground text-sm">{area.desc}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How We Deliver - Process */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                How We <span className="text-gradient">Deliver</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our proven approach to achieving {itemTitle}
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-500 hidden md:block" />
                                
                                <div className="space-y-8">
                                    {content.howWeDeliver.map((step, index) => (
                                        <div 
                                            key={index}
                                            className="flex gap-6 animate-fade-up"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0 relative z-10">
                                                {step.step}
                                            </div>
                                            <div className="flex-1 bg-card rounded-2xl p-6 border border-border hover:border-green-500/50 transition-colors">
                                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                                <p className="text-muted-foreground">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial */}
                <section className="py-16 bg-gradient-to-br from-green-50/50 via-background to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto bg-card rounded-3xl p-8 lg:p-12 border border-border text-center relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-green-100/30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-100/30 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

                            <div className="relative">
                                <div className="flex justify-center gap-1 mb-6">
                                    {[...Array(content.testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <blockquote className="text-xl lg:text-2xl font-medium mb-6 text-foreground">
                                    "{content.testimonial.quote}"
                                </blockquote>

                                <div>
                                    <p className="font-semibold text-foreground">{content.testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{content.testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Questions About <span className="text-gradient">{itemTitle}</span>
                            </h2>
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
                                            <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
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
                <section className="py-20 bg-gradient-to-br from-green-100/50 via-background to-emerald-100/30 dark:from-green-950/30 dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Achieve <span className="text-gradient">{itemTitle}</span>?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Let's discuss how we can help you realize this benefit for your business.
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

export default BenefitDetailPage;
