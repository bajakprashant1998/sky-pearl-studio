import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Check, ArrowRight, TrendingUp, Target, Award, Shield, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug } from "@/data/services";
import { getSubcategoryData } from "@/data/subcategoryData";
import { useState } from "react";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

// Benefit-specific content generator
const generateBenefitContent = (title: string, subcategoryTitle: string) => {
    return {
        description: `Realize the full value of your investment with ${title}.`,
        longDescription: `Achieving ${title} is a primary goal for many businesses utilizing ${subcategoryTitle}. Our expertise ensures that you not only reach this milestone but sustain it. We focus on delivering ${title} through strategic planning, efficient execution, and continuous optimization, driving tangible growth and competitive advantage.`,
        impactPoints: [
            `Direct contribution to ${title}`,
            "Measurable improvement in ROI",
            "Competitive differentiation",
            "Long-term business sustainability",
            "Enhanced operational efficiency"
        ],
        faqs: [
            {
                question: `Why is ${title} considered a key benefit?`,
                answer: `${title} directly correlates with business success, offering a clear indicator of performance and value generation from your ${subcategoryTitle} initiatives.`
            },
            {
                question: `How do you measure success in terms of ${title}?`,
                answer: `We use specific KPIs and analytics to track progress towards ${title}, ensuring complete transparency and accountability.`
            },
            {
                question: `Timeframe to see ${title}?`,
                answer: `While timelines vary, our strategies are designed to accelerate the realization of ${title}, aiming for quick wins followed by sustained growth.`
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

    // Find exact benefit name using the subcategory data helper
    const subData = getSubcategoryData(subcategory.id, subcategory.title, service.title, subcategory.items.map(i => i.name));
    const foundBenefit = subData.keyBenefits.find(benefit =>
        benefit.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemSlug
    );

    const itemTitle = foundBenefit || itemSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const content = generateBenefitContent(itemTitle, subcategory.title);
    const ServiceIcon = service.icon;

    return (
        <>
            <Helmet>
                <title>{itemTitle} (Benefit) - {subcategory.title} | Digital Bull Technology</title>
                <meta name="description" content={content.description} />
            </Helmet>

            <Navbar />

            <main className="pt-20">
                <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-background to-emerald-50/20 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
                            <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-xl mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                {itemTitle}
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                {content.description}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-sm text-center mb-12">
                                <h2 className="text-3xl font-bold mb-6">Why This Benefit Matters</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {content.longDescription}
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold mb-8 text-center">Impact on Your Business</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {content.impactPoints.map((point, index) => (
                                    <div key={index} className="bg-muted/20 p-6 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                            <Check className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12">Insights & Answers</h2>
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

export default BenefitDetailPage;
