import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const faqs = [
  { question: "What industries do you specialize in?", answer: "We have extensive experience across diverse industries including technology, healthcare, e-commerce, finance, education, real estate, and manufacturing. Our team tailors strategies to match each industry's unique challenges and opportunities, ensuring relevant and effective marketing campaigns." },
  { question: "How long does it take to see results from digital marketing?", answer: "Results timeline varies by service: PPC and social media ads can show results within days, while SEO typically takes 3-6 months for significant improvements. We provide monthly reports tracking progress and adjust strategies based on performance data. Our clients typically see measurable ROI within the first 90 days." },
  { question: "What makes Digital Bull Technology different from other agencies?", answer: "We combine data-driven strategies with creative excellence. Our team brings 15+ years of experience, and we focus on measurable outcomes—not vanity metrics. We offer transparent reporting, dedicated account managers, and treat your business goals as our own. Plus, our 98% client satisfaction rate speaks for itself." },
  { question: "Do you offer customized packages or only fixed plans?", answer: "We offer both! While we have standard packages for common needs, we understand every business is unique. We create customized marketing strategies based on your specific goals, budget, and industry requirements. Schedule a free consultation to discuss a tailored solution for your business." },
  { question: "How do you measure and report campaign performance?", answer: "We use advanced analytics tools to track KPIs relevant to your goals—traffic, conversions, ROI, engagement, and more. You'll receive detailed monthly reports with insights and recommendations. Plus, you get access to a real-time dashboard to monitor performance anytime." },
  { question: "What is your pricing structure?", answer: "Our pricing is transparent and competitive. We offer project-based pricing for one-time work and monthly retainers for ongoing campaigns. Pricing depends on scope, services required, and campaign scale. Contact us for a detailed quote tailored to your needs—no hidden fees, ever." },
  { question: "Can you help with website design and development too?", answer: "Absolutely! We offer comprehensive web design and development services including responsive websites, e-commerce platforms, landing pages, and web applications. Our designs are SEO-optimized, mobile-first, and conversion-focused to ensure your digital presence drives results." },
  { question: "Do you provide ongoing support after project completion?", answer: "Yes! We offer various support and maintenance packages to keep your digital assets performing optimally. This includes regular updates, security monitoring, performance optimization, and continuous improvements based on data insights. We're your long-term digital growth partner." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4" whileHover={{ scale: 1.05 }}>
            <HelpCircle className="w-4 h-4" />
            FAQ
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Questions About Our{" "}
            <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to commonly asked questions about our digital marketing services,
            process, and how we can help grow your business.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 px-0">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <AccordionItem value={`faq-${index}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all duration-300">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5 gap-4">
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed pl-11">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-muted-foreground">
              Still have questions?
            </p>
            <Button variant="hero" size="default" className="group" asChild>
              <Link to="/contact">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Our Team
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
