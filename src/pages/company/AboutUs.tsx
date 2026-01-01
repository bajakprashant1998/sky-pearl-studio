import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    ArrowRight, Target, Rocket, Lightbulb, Users, Globe, Layers,
    Search, MousePointer, Layout, Share2, Megaphone, PenTool, Mail,
    BarChart, ShoppingCart, ShoppingBag, Video, Cpu, Database,
    Bot, GraduationCap, Code, Palette, Briefcase, Building2, Store
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
    { icon: Search, title: "SEO", desc: "Comprehensive on-page, off-page, and technical SEO strategies." },
    { icon: MousePointer, title: "PPC Advertising", desc: "ROI-driven search, display, and shopping campaigns." },
    { icon: Layout, title: "Web Design", desc: "High-performing, responsive, and conversion-focused websites." },
    { icon: Share2, title: "Social Media", desc: "Organic growth, community management, and storytelling." },
    { icon: Megaphone, title: "Paid Social", desc: "Targeted campaigns on FB, Insta, LinkedIn, & TikTok." },
    { icon: PenTool, title: "Content Marketing", desc: "SEO blogs, articles, and visual storytelling." },
    { icon: Mail, title: "Email Marketing", desc: "Personalized automation workflows and retention strategies." },
    { icon: Target, title: "CRO", desc: "A/B testing and UX improvements to boost conversions." },
    { icon: ShoppingCart, title: "E-commerce", desc: "Scaling online stores via SEO, PPC, and retention ads." },
    { icon: ShoppingBag, title: "Amazon Marketing", desc: "Listing optimization, PPC, and storefront design." },
    { icon: Video, title: "Video Marketing", desc: "Brand videos, explainers, and performance ads." },
    { icon: Layers, title: "Programmatic Ads", desc: "Automated media buying for scalable reach." },
    { icon: BarChart, title: "Analytics & Data", desc: "Performance dashboards and ROI attribution modeling." },
    { icon: Bot, title: "AI & Automation", desc: "Chatbots, predictive analytics, and workflow automation." },
    { icon: GraduationCap, title: "Training", desc: "Professional courses, internships, and certifications." },
    { icon: Code, title: "SaaS Products", desc: "Custom software, CRM systems, and cloud solutions." },
    { icon: Palette, title: "Branding", desc: "Logo design, corporate identity, and creative strategy." },
];

const industries = [
    { icon: Rocket, label: "Startups & SaaS" },
    { icon: ShoppingBag, label: "E-commerce & Retail" },
    { icon: Building2, label: "Real Estate" },
    { icon: GraduationCap, label: "Education & EdTech" },
    { icon: Users, label: "Healthcare" },
    { icon: Briefcase, label: "Manufacturing & B2B" },
    { icon: Globe, label: "Professional Services" },
];

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Digital Bull Technology Pvt. Ltd.</title>
                <meta
                    name="description"
                    content="We are a full-service digital growth company specializing in AI, SaaS, Marketing, and Training. Read our story and vision."
                />
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-950 text-white">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] opacity-20 bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6 animate-fade-up">
                            Strategic Digital Growth Partner
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                            Innovation Meets <span className="text-blue-500">Execution</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
                            Digital Bull Technology Pvt. Ltd. is a full-service digital growth, technology, and creative solutions company.
                            We blend strategy, data, and AI to drive measurable success for businesses worldwide.
                        </p>
                    </div>
                </section>

                {/* Vision & Mission - Infographic Style */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative bg-card border border-border rounded-3xl p-8 lg:p-12 hover:shadow-2xl transition-all">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
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
                                <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-blue-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Rocket className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                                            <p className="text-muted-foreground">Deliver scalable, result-oriented digital and technology solutions empowered by AI and automation.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Lightbulb className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Creative Excellence</h3>
                                            <p className="text-muted-foreground">Build impactful brands and upskill professionals through world-class training and internships.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Long-term Value</h3>
                                            <p className="text-muted-foreground">Create lasting partnerships through transparency, data-driven insights, and performance.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Ecosystem - Grid Infographic */}
                <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Comprehensive Ecosystem</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Integrated Solutions Under One Roof</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We don't just fix one part of your business; we optimize the entire digital lifecycle.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-background rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industries We Serve */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Industries We Empower</h2>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {industries.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3 p-6 bg-muted/20 rounded-2xl min-w-[140px] hover:bg-muted/40 transition-colors cursor-default">
                                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                                    </div>
                                    <span className="font-medium text-sm text-center">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
                    {/* Decorative blur */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px]" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Partner With Us?</h2>
                                <div className="space-y-6">
                                    {["All-in-One Digital Ecosystem", "AI & Data-Driven Approach", "Scalable for All Growth Stages", "Creative + Technical Mastery", "Future-Ready Innovation"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <ArrowRight className="w-4 h-4 text-green-400" />
                                            </div>
                                            <span className="font-medium text-lg">{item}</span>
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
                                    <Button size="lg" variant="secondary" className="w-full text-blue-700 font-bold" asChild>
                                        <Link to="/#contact">Let's Talk Business</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
};

export default AboutUs;
