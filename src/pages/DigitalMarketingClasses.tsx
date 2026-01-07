import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    CheckCircle2,
    Clock,
    IndianRupee,
    Users,
    Award,
    BookOpen,
    Code,
    Palette,
    Video,
    TrendingUp,
    Briefcase,
    Mail,
    Phone,
    Download,
    ArrowRight,
    Sparkles,
    Target,
    Globe,
    Search,
    Share2,
    BarChart3,
    MessageSquare,
    FileText,
    Megaphone,
    Zap,
    Brain,
    Lightbulb,
    Star
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const DigitalMarketingClasses = () => {
    const courseDetails = [
        { icon: Clock, label: "Duration", value: "6 Months", color: "from-blue-500 to-cyan-500" },
        { icon: Clock, label: "Class Timing", value: "10:00 AM - 6:30 PM", color: "from-purple-500 to-pink-500" },
        { icon: IndianRupee, label: "Course Fees", value: "₹5,000 per Month", color: "from-green-500 to-emerald-500" },
        { icon: BookOpen, label: "Training Type", value: "Practical + Theory + Live Projects", color: "from-amber-500 to-orange-500" },
    ];

    const benefits = [
        { icon: Sparkles, text: "Latest Digital Marketing + AI integrated syllabus" },
        { icon: Clock, text: "6 months in-depth training from basics to advanced level" },
        { icon: Target, text: "Daily practical sessions with tools and live examples" },
        { icon: Award, text: "Expert trainers with real industry experience" },
        { icon: Users, text: "Small batches for personal attention and doubt-solving" },
        { icon: Briefcase, text: "Portfolio building for jobs, freelancing, and business growth" },
        { icon: TrendingUp, text: "Career guidance, interview preparation & freelancing roadmap" },
    ];

    const digitalMarketingCurriculum = [
        {
            title: "Digital Marketing Fundamentals",
            topics: [
                "Introduction to Digital Marketing ecosystem",
                "Online consumer behavior & digital branding",
                "Difference between traditional & digital marketing",
                "Career scope & opportunities"
            ]
        },
        {
            title: "Website & Landing Page Fundamentals",
            topics: [
                "How websites work (domains, hosting, CMS)",
                "Website structure & user experience basics",
                "Landing pages for lead generation",
                "Conversion-focused website strategy"
            ]
        },
        {
            title: "Search Engine Optimization (SEO)",
            topics: [
                "Keyword research (tools & techniques)",
                "On-Page SEO (content, tags, structure)",
                "Off-Page SEO (backlinks & authority building)",
                "Technical SEO (speed, mobile, indexing)",
                "Local SEO & Google Business optimization",
                "SEO audits & ranking strategies"
            ]
        },
        {
            title: "Content Marketing",
            topics: [
                "Blog writing & SEO content strategy",
                "Website content planning",
                "Copywriting for ads & landing pages",
                "Content calendars & brand storytelling"
            ]
        },
        {
            title: "Social Media Marketing",
            topics: [
                "Instagram, Facebook, LinkedIn strategies",
                "Organic growth techniques",
                "Social media content planning",
                "Audience targeting & engagement",
                "Brand building on social platforms"
            ]
        },
        {
            title: "Paid Advertising & Performance Marketing",
            topics: [
                "Google Ads (Search, Display & Video Ads)",
                "Social media paid ads (Meta platforms)",
                "Campaign structure & budget planning",
                "Ad copywriting & creative strategy",
                "Conversion tracking & optimization"
            ]
        },
        {
            title: "Email & WhatsApp Marketing",
            topics: [
                "Email campaign planning",
                "List building & segmentation",
                "Automation basics",
                "WhatsApp marketing strategies",
                "Customer retention techniques"
            ]
        },
        {
            title: "Analytics & Reporting",
            topics: [
                "Google Analytics fundamentals",
                "Traffic & user behavior analysis",
                "Conversion tracking",
                "Campaign performance reports",
                "Data-driven decision making"
            ]
        },
        {
            title: "Online Reputation Management (ORM)",
            topics: [
                "Brand monitoring",
                "Reviews & feedback management",
                "Crisis handling strategies",
                "Trust & credibility building"
            ]
        }
    ];

    const aiSkillsCurriculum = [
        {
            title: "AI Website Designing",
            topics: [
                "AI-powered website creation tools",
                "No-code & low-code platforms",
                "AI-assisted UI/UX layouts",
                "Fast website & landing page development",
                "Conversion-focused design using AI"
            ]
        },
        {
            title: "AI Graphic Designing",
            topics: [
                "AI logo & brand identity creation",
                "Social media creatives & ad banners",
                "Image enhancement & background removal",
                "Creative automation with AI tools",
                "Brand kits & design consistency"
            ]
        },
        {
            title: "AI Video Editing & Creation",
            topics: [
                "AI video editing tools & workflows",
                "Short-form reels, ads & YouTube videos",
                "AI subtitles, captions & voice-over",
                "Video resizing for multiple platforms",
                "Marketing-focused video creation"
            ]
        }
    ];

    const practicalProjects = [
        { icon: Globe, text: "Website creation using AI tools" },
        { icon: Search, text: "SEO audits on real websites" },
        { icon: Share2, text: "Social media content & ad campaigns" },
        { icon: Palette, text: "AI graphics & video projects" },
        { icon: BarChart3, text: "Paid ads execution & optimization" },
        { icon: FileText, text: "Analytics dashboards & reports" },
    ];

    const careerOpportunities = [
        "Digital Marketing Executive",
        "SEO Specialist",
        "Social Media Manager",
        "Performance Marketing Executive",
        "AI Website Designer",
        "AI Graphic Designer",
        "Video Content Creator",
        "Freelancer or Agency Owner"
    ];

    const targetAudience = [
        "Students & freshers",
        "Working professionals",
        "Business owners",
        "Freelancers",
        "Housewives",
        "Anyone interested in digital & AI skills"
    ];

    return (
        <>
            <Helmet>
                <title>Digital Marketing Classes | 6-Month Practical Training Program - Digital Bull</title>
                <meta
                    name="description"
                    content="Learn Digital Marketing & AI skills with our 6-month practical training program. ₹5,000/month. Expert trainers, live projects, portfolio building & career support. Enroll now!"
                />
                <meta
                    name="keywords"
                    content="digital marketing classes, digital marketing course, AI marketing training, SEO training, social media marketing course, graphic design course, video editing course, digital marketing institute"
                />
                <link rel="canonical" href="https://dibull.com/digital-marketing-classes" />
                <meta property="og:title" content="Digital Marketing Classes | 6-Month Practical Training" />
                <meta property="og:description" content="Learn Digital Marketing & AI skills with practical, career-focused training. ₹5,000/month. Enroll now!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dibull.com/digital-marketing-classes" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <main className="min-h-screen">
                <Navbar />

                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
                        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 animate-fade-up">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-foreground">Professional Training Program</span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] animate-fade-up" style={{ animationDelay: "0.1s" }}>
                                Digital Marketing{" "}
                                <span className="relative">
                                    <span className="text-gradient">Classes</span>
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                        <path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                                    </svg>
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                Learn Digital Marketing & AI Skills with Practical, Career-Focused Training
                            </p>

                            {/* Description */}
                            <p className="text-base text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.25s" }}>
                                Professional coaching platform dedicated to providing in-depth, practical, and industry-relevant training in Digital Marketing and AI-based creative skills. Work on live projects, tools, and practical assignments to become job-ready and confident.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
                                <Button variant="hero" size="lg" className="group text-base px-8" asChild>
                                    <Link to="/contact">
                                        Enroll Now
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" className="group text-base" asChild>
                                    <a href="mailto:info@dibull.com?subject=Request for Course Syllabus">
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Syllabus
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Why Choose Our <span className="text-gradient">Digital Marketing Classes?</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                We believe skills matter more than certificates. Our teaching approach is designed around hands-on execution and real results.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <benefit.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <p className="text-foreground">{benefit.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Course Overview Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Course <span className="text-gradient">Overview</span>
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Fixed details for our comprehensive 6-month program
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {courseDetails.map((detail, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 animate-scale-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${detail.color} rounded-xl flex items-center justify-center mb-4`}>
                                        <detail.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-1">{detail.label}</div>
                                    <div className="text-lg font-bold text-foreground">{detail.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Curriculum Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Complete <span className="text-gradient">Curriculum</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                In-depth training covering all aspects of digital marketing and AI-powered creative skills
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Digital Marketing Modules */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Megaphone className="w-6 h-6 text-primary" />
                                    Digital Marketing Modules
                                </h3>
                                <Accordion type="single" collapsible className="space-y-4">
                                    {digitalMarketingCurriculum.map((module, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`dm-${index}`}
                                            className="bg-card border border-border rounded-xl overflow-hidden"
                                        >
                                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                                                    </div>
                                                    <span className="font-semibold">{module.title}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-4">
                                                <ul className="space-y-2 ml-11">
                                                    {module.topics.map((topic, topicIndex) => (
                                                        <li key={topicIndex} className="flex items-start gap-2 text-muted-foreground">
                                                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                            <span>{topic}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>

                            {/* AI Skills Modules */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Brain className="w-6 h-6 text-accent" />
                                    Advanced AI-Based Creative & Tech Skills
                                </h3>
                                <Accordion type="single" collapsible className="space-y-4">
                                    {aiSkillsCurriculum.map((module, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`ai-${index}`}
                                            className="bg-card border border-border rounded-xl overflow-hidden"
                                        >
                                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Sparkles className="w-4 h-4 text-accent" />
                                                    </div>
                                                    <span className="font-semibold">{module.title}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-4">
                                                <ul className="space-y-2 ml-11">
                                                    {module.topics.map((topic, topicIndex) => (
                                                        <li key={topicIndex} className="flex items-start gap-2 text-muted-foreground">
                                                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                                            <span>{topic}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Practical Training Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Practical Training & <span className="text-gradient">Live Projects</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Maximum hands-on exposure throughout the course. Build a strong professional portfolio.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {practicalProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <project.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <p className="font-medium text-foreground">{project.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certifications & Career Support Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                    Certifications & <span className="text-gradient">Career Support</span>
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {/* Certifications */}
                                <div className="bg-card rounded-2xl p-8 border border-border">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold">Certifications</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span>Digital Marketing & AI Course Completion Certificate</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span>Practical Skill Certification</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span>Guidance for Google Ads & Analytics Certifications</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Career Support */}
                                <div className="bg-card rounded-2xl p-8 border border-border">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                            <Briefcase className="w-6 h-6 text-accent" />
                                        </div>
                                        <h3 className="text-xl font-bold">Career Support</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span>Interview preparation</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span>Resume & portfolio guidance</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span>Freelancing & income roadmap</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span>Agency & business growth tips</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Career Opportunities */}
                            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
                                <h3 className="text-2xl font-bold mb-6 text-center">Career Opportunities After Completing the Course</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {careerOpportunities.map((career, index) => (
                                        <div
                                            key={index}
                                            className="bg-card rounded-xl p-4 border border-border flex items-center gap-2"
                                        >
                                            <Star className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span className="text-sm font-medium">{career}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who Can Join Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                    Who Can <span className="text-gradient">Join?</span>
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    This course is designed for everyone interested in digital marketing and AI skills
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {targetAudience.map((audience, index) => (
                                    <div
                                        key={index}
                                        className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span className="font-medium">{audience}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 text-center">
                                <Lightbulb className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                <p className="text-lg font-semibold text-foreground">
                                    No technical or coding background required!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enrollment CTA Section */}
                <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                Ready to Start Your <span className="text-gradient">Digital Career?</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Join Digital Marketing Classes and gain practical digital marketing + AI skills that help you build a successful, future-ready career.
                            </p>

                            {/* Course Summary Cards */}
                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                <div className="bg-card rounded-xl p-6 border border-border">
                                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-foreground mb-1">6 Months</div>
                                    <div className="text-sm text-muted-foreground">Course Duration</div>
                                </div>
                                <div className="bg-card rounded-xl p-6 border border-border">
                                    <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                                    <div className="text-lg font-bold text-foreground mb-1">10:00 AM – 6:30 PM</div>
                                    <div className="text-sm text-muted-foreground">Class Timing</div>
                                </div>
                                <div className="bg-card rounded-xl p-6 border border-border">
                                    <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-foreground mb-1">₹5,000</div>
                                    <div className="text-sm text-muted-foreground">Per Month</div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
                                <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <a
                                        href="mailto:info@dibull.com"
                                        className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                                    >
                                        <Mail className="w-5 h-5 text-primary" />
                                        <div className="text-left">
                                            <div className="text-sm text-muted-foreground">Email</div>
                                            <div className="font-semibold">info@dibull.com</div>
                                        </div>
                                    </a>
                                    <a
                                        href="https://wa.me/919824011921"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                                    >
                                        <Phone className="w-5 h-5 text-green-600" />
                                        <div className="text-left">
                                            <div className="text-sm text-muted-foreground">Call / WhatsApp</div>
                                            <div className="font-semibold">+91 98240 11921</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Button variant="hero" size="lg" className="group text-lg px-12" asChild>
                                <Link to="/contact">
                                    Enroll Now - Start Your Journey
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
};

export default DigitalMarketingClasses;
