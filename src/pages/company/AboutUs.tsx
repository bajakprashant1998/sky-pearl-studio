import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    ArrowRight, Target, Rocket, Lightbulb, Users, Globe, Layers,
    Search, MousePointer, Layout, Share2, Megaphone, PenTool, Mail,
    BarChart, ShoppingCart, ShoppingBag, Video, Cpu, Database,
    Bot, GraduationCap, Code, Palette, Briefcase, Building2, Store,
    CheckCircle2, Award, TrendingUp, Zap, Shield, Clock, Heart,
    Star, Phone, MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
    { icon: Search, title: "SEO", desc: "Comprehensive on-page, off-page, and technical SEO strategies.", link: "/services/seo" },
    { icon: MousePointer, title: "PPC Advertising", desc: "ROI-driven search, display, and shopping campaigns.", link: "/services/ppc" },
    { icon: Layout, title: "Web Design", desc: "High-performing, responsive, and conversion-focused websites.", link: "/services/web-design" },
    { icon: Share2, title: "Social Media", desc: "Organic growth, community management, and storytelling.", link: "/services/social-media" },
    { icon: Megaphone, title: "Paid Social", desc: "Targeted campaigns on FB, Insta, LinkedIn, & TikTok.", link: "/services/social-media" },
    { icon: PenTool, title: "Content Marketing", desc: "SEO blogs, articles, and visual storytelling.", link: "/services/content-marketing" },
    { icon: Mail, title: "Email Marketing", desc: "Personalized automation workflows and retention strategies.", link: "/services/email-marketing" },
    { icon: Target, title: "CRO", desc: "A/B testing and UX improvements to boost conversions.", link: "/services/conversion-optimization" },
    { icon: ShoppingCart, title: "E-commerce", desc: "Scaling online stores via SEO, PPC, and retention ads.", link: "/services/ecommerce-marketing" },
    { icon: ShoppingBag, title: "Amazon Marketing", desc: "Listing optimization, PPC, and storefront design.", link: "/services/amazon-marketing" },
    { icon: Video, title: "Video Marketing", desc: "Brand videos, explainers, and performance ads.", link: "/services/video-marketing" },
    { icon: Layers, title: "Programmatic Ads", desc: "Automated media buying for scalable reach.", link: "/services/programmatic-advertising" },
    { icon: BarChart, title: "Analytics & Data", desc: "Performance dashboards and ROI attribution modeling.", link: "/services/analytics-ai-technology" },
    { icon: Bot, title: "AI & Automation", desc: "Chatbots, predictive analytics, and workflow automation.", link: "/services/ai-marketing" },
    { icon: GraduationCap, title: "Training", desc: "Professional courses, internships, and certifications.", link: "/services/training-programs" },
    { icon: Code, title: "SaaS Products", desc: "Custom software, CRM systems, and cloud solutions.", link: "/services/saas-products" },
    { icon: Palette, title: "Branding", desc: "Logo design, corporate identity, and creative strategy.", link: "/services/branding-design" },
];

const industries = [
    { icon: Rocket, label: "Startups & SaaS" },
    { icon: ShoppingBag, label: "E-commerce & Retail" },
    { icon: Building2, label: "Real Estate" },
    { icon: GraduationCap, label: "Education & EdTech" },
    { icon: Heart, label: "Healthcare" },
    { icon: Briefcase, label: "Manufacturing & B2B" },
    { icon: Globe, label: "Professional Services" },
];

const values = [
    { icon: Target, title: "Results-Driven", desc: "Every strategy is designed to deliver measurable business outcomes." },
    { icon: Lightbulb, title: "Innovation First", desc: "We stay ahead of trends to give you a competitive advantage." },
    { icon: Shield, title: "Transparency", desc: "Clear communication and honest reporting at every step." },
    { icon: Users, title: "Partnership", desc: "We work as an extension of your team, not just a vendor." },
];

const stats = [
    { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
    { value: "98%", label: "Client Satisfaction", icon: Star },
    { value: "15+", label: "Years Experience", icon: Clock },
    { value: "50+", label: "Team Members", icon: Users },
];

const AboutUs = () => {
    // SEO Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Digital Bull Technology Pvt LTD",
        "url": "https://digitalbull.com",
        "logo": "https://digitalbull.com/dibull_logo.png",
        "description": "Full-service digital growth, technology, and creative solutions company specializing in AI, SaaS, Marketing, and Training.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "hello@digitalbull.com",
            "contactType": "customer service"
        },
        "sameAs": [
            "https://www.linkedin.com/company/digitalbull",
            "https://twitter.com/digitalbull",
            "https://www.facebook.com/digitalbull"
        ]
    };

    return (
        <>
            <Helmet>
                <title>About Us | Digital Bull Technology - Digital Marketing Agency</title>
                <meta
                    name="description"
                    content="Digital Bull Technology Pvt LTD is a full-service digital growth company specializing in AI, SaaS, Marketing, and Training. 15+ years of experience, 500+ projects delivered."
                />
                <meta name="keywords" content="digital marketing agency, digital bull technology, SEO company, PPC agency, web design, AI marketing, SaaS development" />
                <link rel="canonical" href="https://digitalbull.com/about-us" />
                
                {/* Open Graph */}
                <meta property="og:title" content="About Us | Digital Bull Technology" />
                <meta property="og:description" content="Full-service digital growth company specializing in AI, SaaS, Marketing, and Training." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://digitalbull.com/about-us" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us | Digital Bull Technology" />
                <meta name="twitter:description" content="Full-service digital growth company specializing in AI, SaaS, Marketing, and Training." />
                
                {/* Structured Data */}
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-950 text-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-50" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6 animate-fade-up">
                                    Strategic Digital Growth Partner
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                                    Innovation Meets <span className="text-blue-500">Execution</span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-300 mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
                                    Digital Bull Technology Pvt. Ltd. is a full-service digital growth, technology, and creative solutions company.
                                    We blend strategy, data, and AI to drive measurable success for businesses worldwide.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
                                    <Button variant="hero" size="lg" asChild>
                                        <Link to="/contact">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button variant="heroOutline" size="lg" asChild>
                                        <a href="#services">
                                            Our Services
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            {/* Stats Infographic */}
                            <div className="grid grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                                {stats.map((stat, index) => (
                                    <div 
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
                                    >
                                        <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-sm text-slate-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission - Infographic Style */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative bg-card border border-border rounded-3xl p-8 lg:p-12 hover:shadow-2xl transition-all">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                                        <Target className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        To become a globally trusted digital transformation partner, delivering intelligent,
                                        AI-driven, and performance-focused solutions that empower businesses and professionals worldwide.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <article className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-blue-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Rocket className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                                            <p className="text-muted-foreground">Deliver scalable, result-oriented digital and technology solutions empowered by AI and automation.</p>
                                        </div>
                                    </div>
                                </article>
                                <article className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Lightbulb className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Creative Excellence</h3>
                                            <p className="text-muted-foreground">Build impactful brands and upskill professionals through world-class training and internships.</p>
                                        </div>
                                    </div>
                                </article>
                                <article className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Long-term Value</h3>
                                            <p className="text-muted-foreground">Create lasting partnerships through transparency, data-driven insights, and performance.</p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-primary font-semibold tracking-wide uppercase text-sm">What We Stand For</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Our Core Values</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <article
                                    key={index}
                                    className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all text-center group animate-fade-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <value.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm">{value.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Ecosystem - Grid Infographic */}
                <section id="services" className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-primary font-semibold tracking-wide uppercase text-sm">Comprehensive Ecosystem</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Integrated Solutions Under One Roof</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We don't just fix one part of your business; we optimize the entire digital lifecycle.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    to={service.link}
                                    className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all group block"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                                        <service.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industries We Serve */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-primary font-semibold tracking-wide uppercase text-sm">Industry Expertise</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Industries We Empower</h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {industries.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border min-w-[140px] hover:border-primary/50 hover:shadow-lg transition-all cursor-default">
                                    <div className="w-14 h-14 bg-primary/10 rounded-full shadow-sm flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="font-medium text-sm text-center">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px]" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-blue-400 font-semibold tracking-wide uppercase text-sm">Why Us</span>
                                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">Why Partner With Us?</h2>
                                <div className="space-y-4">
                                    {[
                                        { title: "All-in-One Digital Ecosystem", desc: "Complete solutions from SEO to AI" },
                                        { title: "AI & Data-Driven Approach", desc: "Decisions backed by analytics" },
                                        { title: "Scalable for All Growth Stages", desc: "From startups to enterprises" },
                                        { title: "Creative + Technical Mastery", desc: "Best of both worlds" },
                                        { title: "Future-Ready Innovation", desc: "Stay ahead of the curve" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-lg block">{item.title}</span>
                                                <span className="text-slate-400 text-sm">{item.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
                                    <h3 className="text-2xl font-bold mb-4">Ready to Transform?</h3>
                                    <p className="text-blue-100 mb-8 leading-relaxed">
                                        We don't just deliver services—we build long-term partnerships.
                                        Let's discuss your goals and how we can help you achieve them.
                                    </p>
                                    <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold" asChild>
                                        <Link to="/contact">Let's Talk Business</Link>
                                    </Button>
                                    
                                    <div className="mt-8 pt-8 border-t border-white/20 text-left">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Mail className="w-5 h-5 text-blue-200" />
                                            <span className="text-blue-100">hello@digitalbull.com</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-blue-200" />
                                            <span className="text-blue-100">+91 XXX XXX XXXX</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default AboutUs;
