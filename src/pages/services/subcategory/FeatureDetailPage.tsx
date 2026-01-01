import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Check, ArrowRight, Star, ChevronDown, ChevronUp, Settings, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug } from "@/data/services";
import { useState } from "react";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

// Feature-specific content generator
const generateFeatureContent = (title: string, subcategoryTitle: string, serviceTitle: string) => {
    return {
        description: `Comprehensive ${title} services designed to enhance your ${subcategoryTitle} performance.`,
        longDescription: `${title} is a critical component of successful ${subcategoryTitle}. Our approach ensures that every aspect of ${title} is optimized to meet your specific business objectives, delivering measurable results as part of our broader ${serviceTitle} offerings.`,
        benefits: [
            `Optimization of ${title}`,
            "Industry best practices implementation",
            "Strategic integration with your marketing mix",
            "Enhanced user experience and engagement",
            "Data-backed decision making",
            "Scalable solutions for future growth"
        ],
        process: [
            {
                title: "Audit & Analysis",
                description: `We thoroughly analyze your current setup to identify gaps and opportunities within ${title}.`,
                icon: SearchIcon
            },
            {
                title: "Strategic Implementation",
                description: `Our team executes targeted improvements for ${title} using proven methodologies.`,
                icon: Settings
            },
            {
                title: "Performance Monitoring",
                description: `We continuously track the impact of ${title} on your overall campaign success.`,
                icon: BarChart3
            }
        ],
        faqs: [
            {
                question: `How does ${title} fit into my overall strategy?`,
                answer: `${title} works synergistically with other ${subcategoryTitle} efforts to create a cohesive and effective digital presence.`
            },
            {
                question: `What makes your approach to ${title} unique?`,
                answer: `We combine technical expertise with creative problem-solving to deliver ${title} solutions that are both robust and innovative.`
            },
            {
                question: `Can ${title} be customized for my industry?`,
                answer: `Absolutely. We tailor our ${title} services to meet the unique challenges and requirements of your specific sector.`
            }
        ]
    };
};

const SearchIcon = Settings; // Placeholder

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

    // Find exact feature name
    const foundItem = subcategory.items.find(item =>
        item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemSlug
    );

    const itemTitle = foundItem ? foundItem.name : itemSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const content = generateFeatureContent(itemTitle, subcategory.title, service.title);
    const ServiceIcon = service.icon;

    return (
        <>
            <Helmet>
                <title>{itemTitle} (Feature) - {subcategory.title} | Digital Bull Technology</title>
                <meta name="description" content={content.description} />
            </Helmet>

            <Navbar />

            <main className="pt-20">
                <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-background to-indigo-50/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="container mx-auto px-4 relative">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link to={`/services/${serviceSlug}`} className="hover:text-primary transition-colors">{service.shortTitle}</Link>
                            <span>/</span>
                            <Link to={`/services/${serviceSlug}/${subcategoryId}`} className="hover:text-primary transition-colors">{subcategory.title}</Link>
                            <span>/</span>
                            <span className="text-foreground">{itemTitle}</span>
                        </nav>

                        <div className="max-w-4xl mx-auto text-center animate-fade-up">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-xl mb-6">
                                <Settings className="w-6 h-6" />
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                {itemTitle}
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                {content.description}
                            </p>

                            <div className="flex justify-center gap-4">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/#contact">
                                        Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Feature Overview</h2>
                                <p className="text-lg text-muted-foreground mb-6">
                                    {content.longDescription}
                                </p>
                                <ul className="space-y-4">
                                    {content.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-muted/30 p-8 rounded-3xl border border-border">
                                <h3 className="text-xl font-bold mb-6">Implementation Process</h3>
                                <div className="space-y-6">
                                    {content.process.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">{step.title}</h4>
                                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
                            <div className="space-y-4">
                                {content.faqs.map((faq, index) => (
                                    <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                                        >
                                            <span className="font-semibold pr-4">{faq.question}</span>
                                            {openFaqIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </button>
                                        <div className={cn("overflow-hidden transition-all duration-300", openFaqIndex === index ? "max-h-96" : "max-h-0")}>
                                            <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <Button variant="outline" size="lg" asChild>
                            <Link to={`/services/${serviceSlug}/${subcategoryId}`}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to {subcategory.title}
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default FeatureDetailPage;
