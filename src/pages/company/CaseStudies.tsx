import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, TrendingUp, Users, Target, Building2, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
    {
        id: 1,
        client: "HireForJob.com",
        category: "Recruitment Portal",
        title: "Scaling Job Portal Traffic to 1M+ Monthly Visitors",
        description: "We implemented a massive programmatic SEO strategy for job listings and optimized the user flow for candidate registrations, establishing HireForJob as a leading recruitment platform.",
        stats: [
            { label: "Organic Traffic", value: "+450%" },
            { label: "Candidate Signups", value: "250k+" },
            { label: "Employer Leads", value: "+180%" },
        ],
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
        icon: Users,
    },
    {
        id: 2,
        client: "Cadbull.com",
        category: "Architecture & CAD",
        title: "Global SEO Domination for World's Largest CAD Library",
        description: "Cadbull needed to reach architects worldwide. We rebuilt their site structure for technical SEO and optimized thousands of CAD drawing pages to rank #1 globally for key architecture terms.",
        stats: [
            { label: "Global Ranking", value: "Top 3" },
            { label: "Daily Downloads", value: "50k+" },
            { label: "Revenue Growth", value: "3.5x" },
        ],
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
        icon: Building2,
    },
    {
        id: 3,
        client: "CastingScreen",
        category: "Mobile App Marketing",
        title: "Launching a Screen Mirroring App to Top Charts",
        description: "A comprehensive App Store Optimization (ASO) and PPC campaign to launch CastingScreen, driving massive installs and stabilizing daily active users.",
        stats: [
            { label: "App Installs", value: "1M+" },
            { label: "CPI (Cost Per Install)", value: "-60%" },
            { label: "Store Rating", value: "4.5★" },
        ],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
        icon: MonitorSmartphone,
    },
    {
        id: 4,
        client: "Shuttech",
        category: "Tech News & Services",
        title: "Establishing Authority in Niche Tech Journalism",
        description: "We helped Shuttech grow from a small blog to a recognized tech news source through content marketing, backlinking strategies, and high-speed AMP pages.",
        stats: [
            { label: "Monthly Readers", value: "+300%" },
            { label: "Ad Revenue", value: "+210%" },
            { label: "Newsletter subs", value: "50k" },
        ],
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
        icon: TrendingUp,
    },
    {
        id: 5,
        client: "GiftCityProperty.com",
        category: "Real Estate",
        title: "High-Ticket Lead Generation for GIFT City Investments",
        description: "Targeting high-net-worth investors for India's first operational smart city. Our hyper-local SEO and LinkedIn ad campaigns delivered premium qualified leads for commercial & residential projects.",
        stats: [
            { label: "Lead Quality", value: "Premium" },
            { label: "CPL (Cost Per Lead)", value: "-45%" },
            { label: "Sales Conversion", value: "+35%" },
        ],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        icon: Target,
    },
];

const CaseStudies = () => {
    return (
        <>
            <Helmet>
                <title>Client Success Stories | Digital Bull Technology</title>
                <meta
                    name="description"
                    content="See how we've helped HireForJob, Cadbull, and other industry leaders achieve massive growth through our digital marketing strategies."
                />
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/10">
                    <div className="container mx-auto px-4 text-center">
                        <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-6 animate-fade-up">
                            Our Portfolio
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                            Driving Growth for <span className="text-gradient">Industry Leaders</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                            From global platforms like Cadbull to local powerhouses like Gift City Properties, we deliver measurable results.
                        </p>
                    </div>
                </section>

                {/* Case Studies Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {caseStudies.map((study, index) => (
                                <div
                                    key={study.id}
                                    className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 animate-fade-up flex flex-col"
                                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors z-10" />
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                                            {study.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3 text-muted-foreground text-sm font-medium">
                                            <study.icon className="w-4 h-4 text-secondary" />
                                            <span className="uppercase tracking-wide text-xs">{study.client}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {study.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                                            {study.description}
                                        </p>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-2 py-4 border-t border-border mb-4 bg-muted/30 rounded-lg px-2">
                                            {study.stats.map((stat, i) => (
                                                <div key={i} className="text-center">
                                                    <div className="text-base font-bold text-primary">{stat.value}</div>
                                                    <div className="text-[10px] text-muted-foreground leading-tight">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <Button variant="ghost" className="w-full justify-between items-center group-hover:bg-primary/5 transition-colors text-sm">
                                            View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000')] opacity-10 bg-cover bg-center" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Be Our Next Success Story
                        </h2>
                        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                            Join HireForJob, Cadbull, and other satisfied clients who chose Digital Bull Technology.
                        </p>
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/#contact">
                                Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default CaseStudies;
