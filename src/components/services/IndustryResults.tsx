import { useState } from "react";
import { ShoppingCart, Building2, Heart, Home, Laptop, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  value: string;
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role: string;
}

interface IndustryResult {
  industry: string;
  icon: LucideIcon;
  metrics: Metric[];
  testimonial: Testimonial;
  caseStudySlug?: string;
}

interface IndustryResultsProps {
  results?: IndustryResult[];
  serviceTitle: string;
}

const defaultResults: IndustryResult[] = [
  {
    industry: "E-commerce",
    icon: ShoppingCart,
    metrics: [
      { label: "Revenue Increase", value: "250%" },
      { label: "ROAS Improvement", value: "4.2x" },
      { label: "Conversion Rate", value: "5.8%" },
      { label: "CAC Reduction", value: "35%" },
    ],
    testimonial: {
      quote: "Digital Bull helped us scale our online store from ₹10L to ₹2.5Cr monthly revenue in just 8 months.",
      author: "Rajesh Kumar",
      company: "Fashion Brand",
      role: "Founder & CEO",
    },
  },
  {
    industry: "SaaS",
    icon: Laptop,
    metrics: [
      { label: "Lead Generation", value: "180%" },
      { label: "Demo Bookings", value: "3x" },
      { label: "Trial to Paid", value: "28%" },
      { label: "LTV Increase", value: "45%" },
    ],
    testimonial: {
      quote: "Their B2B marketing expertise helped us acquire enterprise clients we thought were out of reach.",
      author: "Priya Sharma",
      company: "Tech Startup",
      role: "Marketing Director",
    },
  },
  {
    industry: "Healthcare",
    icon: Heart,
    metrics: [
      { label: "Patient Inquiries", value: "200%" },
      { label: "Appointment Bookings", value: "150%" },
      { label: "Trust Score", value: "95%" },
      { label: "Local Visibility", value: "320%" },
    ],
    testimonial: {
      quote: "We went from struggling to get noticed to being the #1 ranked clinic in our city.",
      author: "Dr. Amit Patel",
      company: "Multi-specialty Clinic",
      role: "Managing Director",
    },
  },
  {
    industry: "Real Estate",
    icon: Home,
    metrics: [
      { label: "Lead Quality", value: "85%" },
      { label: "Cost per Lead", value: "-40%" },
      { label: "Site Visits", value: "3x" },
      { label: "Closing Rate", value: "22%" },
    ],
    testimonial: {
      quote: "Their targeted campaigns helped us sell out our project 6 months ahead of schedule.",
      author: "Vikram Malhotra",
      company: "Real Estate Developer",
      role: "Sales Head",
    },
  },
  {
    industry: "Education",
    icon: GraduationCap,
    metrics: [
      { label: "Enrollments", value: "400%" },
      { label: "Cost per Enrollment", value: "-55%" },
      { label: "Brand Awareness", value: "280%" },
      { label: "Parent Inquiries", value: "5x" },
    ],
    testimonial: {
      quote: "From a local institute to a recognized brand with students from 15+ countries.",
      author: "Neha Gupta",
      company: "Online Academy",
      role: "Co-founder",
    },
  },
  {
    industry: "Manufacturing",
    icon: Building2,
    metrics: [
      { label: "B2B Leads", value: "220%" },
      { label: "Export Inquiries", value: "180%" },
      { label: "Brand Visibility", value: "350%" },
      { label: "Deal Size", value: "+65%" },
    ],
    testimonial: {
      quote: "Digital Bull positioned us as industry leaders, opening doors to international markets.",
      author: "Suresh Agarwal",
      company: "Manufacturing Corp",
      role: "Business Head",
    },
  },
];

const IndustryResults = ({ results = defaultResults, serviceTitle }: IndustryResultsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeResult = results[activeIndex];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Industry Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Results Across <span className="text-gradient">Industries</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how our {serviceTitle} services have transformed businesses like yours
          </p>
        </AnimatedSection>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <button
                key={result.industry}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeIndex === index
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {result.industry}
              </button>
            );
          })}
        </div>

        {/* Active Industry Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Metrics */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <activeResult.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{activeResult.industry}</h3>
                    <p className="text-sm text-muted-foreground">Key Performance Metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {activeResult.metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-muted/50 rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />

                <div className="relative z-10">
                  <div className="text-6xl font-serif text-white/20 mb-4">"</div>
                  <blockquote className="text-lg md:text-xl font-medium mb-6 -mt-8">
                    {activeResult.testimonial.quote}
                  </blockquote>
                  <div>
                    <p className="font-semibold">{activeResult.testimonial.author}</p>
                    <p className="text-white/70 text-sm">{activeResult.testimonial.role}</p>
                    <p className="text-white/70 text-sm">{activeResult.testimonial.company}</p>
                  </div>

                  {activeResult.caseStudySlug && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-6 bg-white/20 hover:bg-white/30 text-white border-white/30"
                      asChild
                    >
                      <Link to={`/case-studies/${activeResult.caseStudySlug}`}>
                        View Case Study
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IndustryResults;
