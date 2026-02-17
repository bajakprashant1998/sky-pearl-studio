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
    Star, Phone, MapPin, ArrowUpRight, Sparkles, Eye, MessageSquare,
    CalendarDays, Quote, HandshakeIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const timeline = [
    { year: "2009", title: "The Beginning", desc: "Founded as a freelance digital marketing consultancy with a vision to make premium marketing accessible.", icon: Rocket },
    { year: "2013", title: "Agency Formation", desc: "Officially formed Digital Bull Technology with a dedicated team of 10 specialists across SEO, PPC, and design.", icon: Users },
    { year: "2016", title: "100+ Clients Milestone", desc: "Crossed 100 active clients, expanded into social media, email automation, and conversion optimization.", icon: TrendingUp },
    { year: "2019", title: "AI & Automation", desc: "Integrated AI-driven analytics, chatbots, and marketing automation into our core service stack.", icon: Bot },
    { year: "2022", title: "SaaS & Training Division", desc: "Launched our proprietary SaaS products and Digital Marketing Academy to upskill the next generation.", icon: GraduationCap },
    { year: "2025", title: "Global Expansion", desc: "Serving clients in 15+ countries with 50+ team members across strategy, tech, and creative verticals.", icon: Globe },
];

const clientTestimonials = [
    { quote: "Digital Bull transformed our online presence. Our organic traffic increased by 340% in just 8 months.", name: "Arjun Mehta", role: "CEO, TechStartup Inc.", },
    { quote: "Their data-driven approach and transparent reporting made them our most trusted digital partner.", name: "Priya Sharma", role: "Marketing Head, RetailPlus", },
    { quote: "From SEO to AI automation, their integrated solutions saved us from juggling multiple vendors.", name: "Rahul Kapoor", role: "Founder, EduLearn Platform", },
];

const AboutUs = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Digital Bull Technology Pvt LTD",
        "url": "https://dibull.com",
        "logo": "https://dibull.com/dibull_logo.png",
        "description": "Full-service digital growth, technology, and creative solutions company specializing in AI, SaaS, Marketing, and Training.",
        "founder": { "@type": "Person", "name": "Krunal Jani" },
        "foundingDate": "2009",
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
                <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
                <meta property="og:site_name" content="Digital Bull Technology" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us | Digital Bull Technology" />
                <meta name="twitter:description" content="Full-service digital growth company specializing in AI, SaaS, Marketing, and Training." />
                <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-24 lg:py-36 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent text-white">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                    </div>
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-6"
                                >
                                    🚀 Your Strategic Digital Growth Partner
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
                                >
                                    Innovation Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Execution</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed"
                                >
                                    Digital Bull Technology Pvt. Ltd. is a full-service digital growth, technology, and creative solutions company.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="text-lg text-white/60 mb-10"
                                >
                                    We blend strategy, data, and AI to drive measurable success for businesses worldwide.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-4 justify-center lg:justify-start"
                                >
                                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
                                        <Link to="/contact">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                                        <a href="#services">Our Services</a>
                                    </Button>
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all group"
                                    >
                                        <stat.icon className="w-10 h-10 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                                            {stat.value}<span className="text-amber-400">{stat.suffix}</span>
                                        </div>
                                        <div className="text-sm text-white/70">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Brand Punchlines */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Eye, title: "See Farther", desc: "We anticipate trends before they happen" },
                                { icon: Zap, title: "Move Faster", desc: "Agile execution that keeps you ahead" },
                                { icon: Target, title: "Hit Harder", desc: "Strategies that deliver maximum impact" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center p-8 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 hover:shadow-xl transition-all"
                                >
                                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Founder Spotlight */}
                <section className="py-20 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-2"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-20 scale-105" />
                                    <div className="relative bg-card border border-border rounded-3xl p-8 text-center">
                                        <div className="w-28 h-28 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                            <span className="text-4xl font-bold text-primary-foreground">KJ</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">Krunal Jani</h3>
                                        <p className="text-primary font-semibold mb-4">Founder & CEO</p>
                                        <div className="flex justify-center gap-3">
                                            {[
                                                { label: "15+ Yrs", sub: "Experience" },
                                                { label: "500+", sub: "Projects" },
                                                { label: "20+", sub: "Industries" },
                                            ].map((s, i) => (
                                                <div key={i} className="bg-muted/50 rounded-xl px-3 py-2">
                                                    <div className="font-bold text-sm">{s.label}</div>
                                                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-3 space-y-6"
                            >
                                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">Meet Our Founder</span>
                                <h2 className="text-3xl md:text-4xl font-bold">
                                    Building Digital <span className="text-gradient">Excellence</span> Since 2009
                                </h2>
                                <div className="relative pl-6 border-l-2 border-primary/30">
                                    <Quote className="w-8 h-8 text-primary/30 absolute -left-4 -top-1 bg-muted/20" />
                                    <p className="text-muted-foreground text-lg leading-relaxed italic">
                                        "I started Digital Bull with a simple belief — every business, regardless of size, deserves access to world-class digital strategies. Today, we're living that mission with AI-powered solutions, a passionate team of 50+, and a portfolio spanning 15+ countries."
                                    </p>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    With deep expertise in SEO, performance marketing, AI automation, and SaaS development, Krunal has led Digital Bull from a solo consultancy to a full-stack digital growth agency trusted by startups and enterprises alike.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
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
                            </motion.div>

                            <div className="grid gap-6">
                                {[
                                    { icon: Rocket, title: "Our Mission", desc: "Deliver scalable, result-oriented digital and technology solutions empowered by AI and automation.", color: "from-green-500 to-emerald-500" },
                                    { icon: Lightbulb, title: "Creative Excellence", desc: "Build impactful brands and upskill professionals through world-class training and internships.", color: "from-purple-500 to-pink-500" },
                                    { icon: Users, title: "Long-term Value", desc: "Create lasting partnerships through transparency, data-driven insights, and performance.", color: "from-orange-500 to-amber-500" },
                                ].map((item, index) => (
                                    <motion.article
                                        key={index}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                                <p className="text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Journey Timeline */}
                <section className="py-20 bg-background overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Our Journey</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Vision to Reality</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                A timeline of growth, innovation, and milestones that shaped Digital Bull Technology.
                            </p>
                        </div>

                        <div className="relative max-w-4xl mx-auto">
                            {/* Vertical line */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-start gap-6 mb-12 ${
                                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-6 ring-4 ring-background z-10" />

                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                                        index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                                    }`}>
                                        <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                                            <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                    <item.icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <span className="text-primary font-bold text-lg">{item.year}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground text-sm">{item.desc}</p>
                                        </div>
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Data Analytics Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Data-Driven Results</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Real data showcasing the measurable impact we deliver for our clients
                            </p>
                        </div>
                        <div className="mb-12">
                            <IndustryStats />
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <GrowthChart />
                            <ServiceDistributionChart />
                            <PerformanceMetrics />
                            <ClientSuccessRadar />
                        </div>
                    </div>
                </section>

                {/* Client Testimonials */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Client Love</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {clientTestimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/30 transition-all relative"
                                >
                                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                                    <p className="text-muted-foreground mb-6 italic leading-relaxed">"{t.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                                            {t.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">{t.name}</div>
                                            <div className="text-xs text-muted-foreground">{t.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mt-4">
                                        {[...Array(5)].map((_, si) => (
                                            <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements Bar */}
                <section className="py-12 bg-primary">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {achievements.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center text-white"
                                >
                                    <item.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="text-sm text-white/70">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">What We Stand For</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <motion.article
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
                                >
                                    <div className={`h-2 bg-gradient-to-r ${value.color}`} />
                                    <div className="p-8 text-center">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm">{value.desc}</p>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Ecosystem */}
                <section id="services" className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">Comprehensive Ecosystem</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Solutions Under One Roof</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We don't just fix one part of your business; we optimize the entire digital lifecycle.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {services.map((service, index) => (
                                <Link key={index} to={service.link} className="group block">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.03 }}
                                        className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all h-full"
                                    >
                                        <div className={`h-1 bg-gradient-to-r ${service.color}`} />
                                        <div className="p-6">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <service.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                            <p className="text-sm text-muted-foreground">{service.desc}</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industries */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Industry Expertise</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Empower</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Specialized solutions tailored for your industry
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                            {industries.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex flex-col items-center gap-4 p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all cursor-default group"
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="font-medium text-sm text-center">{item.label}</span>
                                </motion.div>
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
                                <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold mb-4">Why Us</span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Partner With Digital Bull?</h2>
                                <div className="space-y-4">
                                    {whyChooseUs.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-lg block">{item.title}</span>
                                                <span className="text-slate-400 text-sm">{item.desc}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
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
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
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
