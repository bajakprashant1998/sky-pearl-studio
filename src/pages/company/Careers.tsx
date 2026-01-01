import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase, Users, Zap, Bike, HeartHandshake, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const benefits = [
    {
        icon: Globe,
        title: "Remote-First Culture",
        description: "Work from anywhere. We believe in output over hours and trust our team to deliver excellence from wherever they are most productive."
    },
    {
        icon: Zap,
        title: "Fast-Paced Growth",
        description: "Accelerate your career with challenging projects and early responsibility. We're growing fast, and we want you to grow with us."
    },
    {
        icon: HeartHandshake,
        title: "Comprehensive Health",
        description: "We take care of our own. Full medical, dental, and vision coverage for you and your dependents."
    },
    {
        icon: Users,
        title: "Collaborative Team",
        description: "Join a diverse team of passionate experts. We support each other, share knowledge, and celebrate wins together."
    },
    {
        icon: Briefcase,
        title: "Professional Development",
        description: "Annual stipend for courses, conferences, and books. We invest in your continuous learning."
    },
    {
        icon: Bike,
        title: "Work-Life Balance",
        description: "Flexible hours and generous PTO. We believe that well-rested employees are the most creative and effective."
    }
];

const openings = [
    {
        id: "seo-specialist",
        title: "Senior SEO Specialist",
        department: "Marketing",
        location: "Remote",
        type: "Full-time",
        description: "We are looking for an experienced SEO Specialist to lead our organic search strategies. You will be responsible for technical audits, keyword strategy, and driving measurable traffic growth for our enterprise clients.",
        requirements: [
            "5+ years of experience in SEO",
            "Deep understanding of technical SEO and web vitals",
            "Experience with tools like Ahrefs, SEMrush, and GSC",
            "Strong analytical skills and ability to report on ROI"
        ]
    },
    {
        id: "content-writer",
        title: "Content Strategist & Writer",
        department: "Content",
        location: "Remote",
        type: "Full-time",
        description: "Join our creative team to craft compelling narratives for SaaS and B2B brands. You will oversee content calendars, produce high-quality blog posts, and ensure brand voice consistency.",
        requirements: [
            "3+ years of content writing experience",
            "Portfolio demonstrating B2B technical writing",
            "Knowledge of SEO content best practices",
            "Excellent editing and proofreading skills"
        ]
    },
    {
        id: "frontend-dev",
        title: "Frontend Developer (React)",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description: "Build beautiful, high-performance web experiences. You will work closely with designers to implement pixel-perfect UIs using React, TypeScript, and Tailwind CSS.",
        requirements: [
            "Strong proficiency in React and TypeScript",
            "Experience with Tailwind CSS and modern styling patterns",
            "Understanding of web performance optimization",
            "Eye for design details and micro-interactions"
        ]
    }
];

const Careers = () => {
    return (
        <>
            <Helmet>
                <title>Careers | Digital Bull Technology</title>
                <meta name="description" content="Join the Digital Bull team. We are hiring passionate individuals to help transform businesses through digital innovation." />
            </Helmet>

            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 animate-fade-up">
                            We are hiring!
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                            Build the Future of <br className="hidden md:block" />
                            <span className="text-blue-500">Digital Marketing</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                            Join a team of innovators, creators, and strategists. We are redefining how businesses grow in the digital age.
                        </p>
                        <div className="flex justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none" asChild>
                                <a href="#openings">View Openings</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Why Join Us */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold mb-4">Why Join Digital Bull?</h2>
                            <p className="text-muted-foreground">
                                We believe that a great workplace is built on trust, growth, and shared success. Here's what you can expect when you join our team.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="p-6 rounded-2xl bg-muted/30 border border-border hover:border-primary/50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                                        <benefit.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section id="openings" className="py-20 bg-slate-50 dark:bg-slate-900/20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>

                        <div className="max-w-3xl mx-auto">
                            {openings.map((job, index) => (
                                <div key={job.id} className="mb-4 bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value={job.id} className="border-none">
                                            <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline">
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-left w-full">
                                                    <span className="font-bold text-lg flex-1">{job.title}</span>
                                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mr-4">
                                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">{job.department}</span>
                                                        <span>{job.location}</span>
                                                        <span>{job.type}</span>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 pt-2">
                                                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                                                    <p className="mb-4">{job.description}</p>
                                                    <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                                                    <ul className="list-disc pl-5 space-y-1 mb-6">
                                                        {job.requirements.map((req, i) => (
                                                            <li key={i}>{req}</li>
                                                        ))}
                                                    </ul>
                                                    <Button asChild>
                                                        <a href={`mailto:careers@digitalbull.com?subject=Application for ${job.title}`}>
                                                            Apply for position <ArrowRight className="w-4 h-4 ml-2" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))}

                            <div className="text-center mt-12 p-8 bg-muted/30 rounded-2xl border border-dashed border-border">
                                <h3 className="text-xl font-bold mb-2">Don't see the right role?</h3>
                                <p className="text-muted-foreground mb-6">
                                    We are always looking for talented individuals. Send us your resume and we'll keep you in mind for future openings.
                                </p>
                                <Button variant="outline" asChild>
                                    <a href="mailto:careers@digitalbull.com">Contact Careers Team</a>
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

export default Careers;
