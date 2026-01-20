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
    Star, Phone, MapPin, ArrowUpRight, Sparkles, Eye, MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import GrowthChart from "@/components/charts/GrowthChart";
import ServiceDistributionChart from "@/components/charts/ServiceDistributionChart";
import PerformanceMetrics from "@/components/charts/PerformanceMetrics";
import ClientSuccessRadar from "@/components/charts/ClientSuccessRadar";
import IndustryStats from "@/components/charts/IndustryStats";

const services = [
    { icon: Search, title: "SEO", desc: "Comprehensive on-page, off-page, and technical SEO strategies.", link: "/services/seo", color: "from-blue-500 to-cyan-500" },
    { icon: MousePointer, title: "PPC Advertising", desc: "ROI-driven search, display, and shopping campaigns.", link: "/services/ppc", color: "from-purple-500 to-pink-500" },
    { icon: Layout, title: "Web Design", desc: "High-performing, responsive, and conversion-focused websites.", link: "/services/web-design", color: "from-amber-500 to-orange-500" },
    { icon: Share2, title: "Social Media", desc: "Organic growth, community management, and storytelling.", link: "/services/social-media", color: "from-green-500 to-emerald-500" },
    { icon: Megaphone, title: "Paid Social", desc: "Targeted campaigns on FB, Insta, LinkedIn, & TikTok.", link: "/services/social-media", color: "from-rose-500 to-red-500" },
    { icon: PenTool, title: "Content Marketing", desc: "SEO blogs, articles, and visual storytelling.", link: "/services/content-marketing", color: "from-indigo-500 to-blue-500" },
    { icon: Mail, title: "Email Marketing", desc: "Personalized automation workflows and retention strategies.", link: "/services/email-marketing", color: "from-teal-500 to-cyan-500" },
    { icon: Target, title: "CRO", desc: "A/B testing and UX improvements to boost conversions.", link: "/services/conversion-optimization", color: "from-violet-500 to-purple-500" },
    { icon: ShoppingCart, title: "E-commerce", desc: "Scaling online stores via SEO, PPC, and retention ads.", link: "/services/ecommerce-marketing", color: "from-orange-500 to-amber-500" },
    { icon: ShoppingBag, title: "Amazon Marketing", desc: "Listing optimization, PPC, and storefront design.", link: "/services/amazon-marketing", color: "from-yellow-500 to-orange-500" },
    { icon: Video, title: "Video Marketing", desc: "Brand videos, explainers, and performance ads.", link: "/services/video-marketing", color: "from-pink-500 to-rose-500" },
    { icon: Layers, title: "Programmatic Ads", desc: "Automated media buying for scalable reach.", link: "/services/programmatic-advertising", color: "from-sky-500 to-blue-500" },
    { icon: BarChart, title: "Analytics & Data", desc: "Performance dashboards and ROI attribution modeling.", link: "/services/analytics-ai-technology", color: "from-emerald-500 to-green-500" },
    { icon: Bot, title: "AI & Automation", desc: "Chatbots, predictive analytics, and workflow automation.", link: "/services/ai-marketing", color: "from-fuchsia-500 to-pink-500" },
    { icon: GraduationCap, title: "Training", desc: "Professional courses, internships, and certifications.", link: "/services/training-programs", color: "from-blue-500 to-indigo-500" },
    { icon: Code, title: "SaaS Products", desc: "Custom software, CRM systems, and cloud solutions.", link: "/services/saas-products", color: "from-slate-500 to-gray-600" },
    { icon: Palette, title: "Branding", desc: "Logo design, corporate identity, and creative strategy.", link: "/services/branding-design", color: "from-red-500 to-rose-500" },
];

const industries = [
    { icon: Rocket, label: "Startups & SaaS", color: "from-blue-500 to-cyan-500" },
    { icon: ShoppingBag, label: "E-commerce & Retail", color: "from-amber-500 to-orange-500" },
    { icon: Building2, label: "Real Estate", color: "from-green-500 to-emerald-500" },
    { icon: GraduationCap, label: "Education & EdTech", color: "from-purple-500 to-pink-500" },
    { icon: Heart, label: "Healthcare", color: "from-red-500 to-rose-500" },
    { icon: Briefcase, label: "Manufacturing & B2B", color: "from-slate-500 to-gray-600" },
    { icon: Globe, label: "Professional Services", color: "from-indigo-500 to-blue-500" },
];

const values = [
    { icon: Target, title: "Results-Driven", desc: "Every strategy is designed to deliver measurable business outcomes.", color: "from-blue-500 to-cyan-500" },
    { icon: Lightbulb, title: "Innovation First", desc: "We stay ahead of trends to give you a competitive advantage.", color: "from-amber-500 to-orange-500" },
    { icon: Shield, title: "Transparency", desc: "Clear communication and honest reporting at every step.", color: "from-green-500 to-emerald-500" },
    { icon: Users, title: "Partnership", desc: "We work as an extension of your team, not just a vendor.", color: "from-purple-500 to-pink-500" },
];

const stats = [
    { value: "500+", label: "Projects Completed", icon: CheckCircle2, suffix: "" },
    { value: "98", label: "Client Satisfaction", icon: Star, suffix: "%" },
    { value: "15", label: "Years Experience", icon: Clock, suffix: "+" },
    { value: "50", label: "Team Members", icon: Users, suffix: "+" },
];

const achievements = [
    { icon: Award, title: "Google Premier Partner", desc: "Top 3% of agencies worldwide" },
    { icon: TrendingUp, title: "500+ Projects Delivered", desc: "Across 20+ industries" },
    { icon: Star, title: "98% Client Satisfaction", desc: "Based on 200+ reviews" },
    { icon: Globe, title: "Global Reach", desc: "Clients in 15+ countries" },
];

const whyChooseUs = [
    { title: "All-in-One Digital Ecosystem", desc: "Complete solutions from SEO to AI, all under one roof", icon: Layers },
    { title: "AI & Data-Driven Approach", desc: "Decisions backed by analytics and machine learning", icon: Bot },
    { title: "Scalable for All Growth Stages", desc: "From startups to enterprises, we grow with you", icon: TrendingUp },
    { title: "Creative + Technical Mastery", desc: "Best of both worlds for maximum impact", icon: Sparkles },
    { title: "Future-Ready Innovation", desc: "Stay ahead of the curve with cutting-edge solutions", icon: Rocket },
];

const AboutUs = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Digital Bull Technology Pvt LTD",
        "url": "https://dibull.com",
        "logo": "https://dibull.com/dibull_logo.png",
        "description": "Full-service digital growth, technology, and creative solutions company specializing in AI, SaaS, Marketing, and Training.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "A 823 Moneyplant High street Jagatpur Road, Near GOTA Cross road",
            "addressLocality": "Ahmedabad",
            "addressCountry": "India"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "info@dibull.com",
            "telephone": "+91-9824011921",
            "contactType": "customer service"
        },
        "sameAs": [
            "https://www.linkedin.com/company/digitalbulltechnology/",
            "https://x.com/digital_1221?s=21&t=gZqAEY-otu1upyCHIOj4Uw",
            "https://www.facebook.com/share/1GGViEsE5a/?mibextid=wwXIfr",
            "https://www.instagram.com/digitalbulltechnology?igsh=MWxjbTJtMHkxNTBoNg=="
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
                <link rel="canonical" href="https://dibull.com/about-us" />
                <meta property="og:title" content="About Us | Digital Bull Technology" />
                <meta property="og:description" content="Full-service digital growth company specializing in AI, SaaS, Marketing, and Training." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dibull.com/about-us" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us | Digital Bull Technology" />
                <meta name="twitter:description" content="Full-service digital growth company specializing in AI, SaaS, Marketing, and Training." />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section - Dramatic Full-Width */}
                <section className="relative py-24 lg:py-36 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent text-white">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                    </div>

                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-6 animate-fade-up">
                                    🚀 Your Strategic Digital Growth Partner
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-up leading-tight" style={{ animationDelay: "0.1s" }}>
                                    Innovation Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Execution</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
                                    Digital Bull Technology Pvt. Ltd. is a full-service digital growth, technology, and creative solutions company.
                                </p>
                                <p className="text-lg text-white/60 mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
                                    We blend strategy, data, and AI to drive measurable success for businesses worldwide.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
                                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
                                        <Link to="/contact">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                                        <a href="#services">
                                            Our Services
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            {/* Stats Infographic */}
                            <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all group"
                                    >
                                        <stat.icon className="w-10 h-10 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                                            {stat.value}<span className="text-amber-400">{stat.suffix}</span>
                                        </div>
                                        <div className="text-sm text-white/70">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Brand Punchlines Section */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Eye, title: "See Farther", desc: "We anticipate trends before they happen" },
                                { icon: Zap, title: "Move Faster", desc: "Agile execution that keeps you ahead" },
                                { icon: Target, title: "Hit Harder", desc: "Strategies that deliver maximum impact" },
                            ].map((item, index) => (
                                <div key={index} className="text-center p-8 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 hover:shadow-xl transition-all animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision & Mission - Infographic Style */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="relative group animate-fade-up">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative bg-card border border-border rounded-3xl p-8 lg:p-12 hover:shadow-2xl transition-all">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                        <Target className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        To become a globally trusted digital transformation partner, delivering intelligent,
                                        AI-driven, and performance-focused solutions that empower businesses and professionals worldwide.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                {[
                                    { icon: Rocket, title: "Our Mission", desc: "Deliver scalable, result-oriented digital and technology solutions empowered by AI and automation.", color: "from-green-500 to-emerald-500" },
                                    { icon: Lightbulb, title: "Creative Excellence", desc: "Build impactful brands and upskill professionals through world-class training and internships.", color: "from-purple-500 to-pink-500" },
                                    { icon: Users, title: "Long-term Value", desc: "Create lasting partnerships through transparency, data-driven insights, and performance.", color: "from-orange-500 to-amber-500" },
                                ].map((item, index) => (
                                    <article key={index} className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                                <p className="text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Analytics Section with Charts */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Data-Driven Results</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Real data showcasing the measurable impact we deliver for our clients
                            </p>
                        </div>
                        
                        {/* Industry Stats */}
                        <div className="mb-12">
                            <IndustryStats />
                        </div>
                        
                        {/* Charts Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <GrowthChart />
                            <ServiceDistributionChart />
                            <PerformanceMetrics />
                            <ClientSuccessRadar />
                        </div>
                    </div>
                </section>

                {/* Achievements Bar */}
                <section className="py-12 bg-primary">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {achievements.map((item, index) => (
                                <div key={index} className="text-center text-white animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <item.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="text-sm text-white/70">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Values - Colorful Cards */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">What We Stand For</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <article
                                    key={index}
                                    className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all group animate-fade-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`h-2 bg-gradient-to-r ${value.color}`} />
                                    <div className="p-8 text-center">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm">{value.desc}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Ecosystem - Colorful Grid */}
                <section id="services" className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">Comprehensive Ecosystem</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Solutions Under One Roof</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We don't just fix one part of your business; we optimize the entire digital lifecycle.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    to={service.link}
                                    className="group block animate-fade-up"
                                    style={{ animationDelay: `${index * 0.03}s` }}
                                >
                                    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all h-full">
                                        <div className={`h-1 bg-gradient-to-r ${service.color}`} />
                                        <div className="p-6">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <service.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                            <p className="text-sm text-muted-foreground">{service.desc}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industries We Serve - Visual Grid */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Industry Expertise</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Empower</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Specialized solutions tailored for your industry
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                            {industries.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center gap-4 p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all cursor-default group animate-fade-up"
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="font-medium text-sm text-center">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us - Dark Section with Cards */}
                <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px]" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="animate-fade-up">
                                <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold mb-4">Why Us</span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Partner With Digital Bull?</h2>
                                <div className="space-y-4">
                                    {whyChooseUs.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-lg block">{item.title}</span>
                                                <span className="text-slate-400 text-sm">{item.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 shadow-2xl">
                                    <Sparkles className="w-12 h-12 text-white/80 mb-6" />
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform?</h3>
                                    <p className="text-blue-100 mb-8 leading-relaxed text-lg">
                                        We don't just deliver services—we build long-term partnerships.
                                        Let's discuss your goals and how we can help you achieve them.
                                    </p>
                                    <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold" asChild>
                                        <Link to="/contact">
                                            Let's Talk Business <ArrowUpRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>

                                    <div className="mt-8 pt-8 border-t border-white/20">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Mail className="w-5 h-5 text-blue-200" />
                                            <span className="text-blue-100">info@dibull.com</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Phone className="w-5 h-5 text-blue-200" />
                                            <span className="text-blue-100">+91 9824011921</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-blue-200" />
                                            <span className="text-blue-100 text-sm">Ahmedabad, India</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center animate-fade-up">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Ready to <span className="text-gradient">Grow Your Business</span>?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Join 500+ businesses that have transformed their digital presence with Digital Bull Technology.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/contact">
                                        Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button variant="heroOutline" size="lg" asChild>
                                    <Link to="/case-studies">View Case Studies</Link>
                                </Button>
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