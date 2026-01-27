import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "@/components/AnimatedSection";
import { Helmet } from "react-helmet-async";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs?: FAQ[];
  serviceTitle: string;
  serviceSlug: string;
}

const defaultFAQs: FAQ[] = [
  {
    question: "How long does it take to see results?",
    answer: "Results vary depending on the service and your current situation. Typically, you can expect to see initial improvements within 2-4 weeks, with significant results becoming apparent within 3-6 months of consistent effort.",
  },
  {
    question: "What is included in your pricing?",
    answer: "Our pricing includes strategy development, implementation, ongoing optimization, regular reporting, and dedicated account management. We provide transparent pricing with no hidden fees.",
  },
  {
    question: "Do you offer customized solutions?",
    answer: "Absolutely! We understand that every business is unique. We create tailored strategies based on your specific goals, industry, target audience, and budget to maximize results.",
  },
  {
    question: "How do you measure success?",
    answer: "We track key performance indicators (KPIs) aligned with your business objectives. This includes metrics like traffic growth, conversion rates, ROI, lead quality, and revenue impact. You'll receive detailed monthly reports.",
  },
  {
    question: "What makes Digital Bull different from other agencies?",
    answer: "We combine data-driven strategies with creative excellence. Our team includes certified experts with proven track records. We focus on ROI, maintain transparent communication, and treat your business as if it were our own.",
  },
  {
    question: "Can I pause or cancel my services?",
    answer: "Yes, we offer flexible engagement models. While we recommend consistent effort for best results, you can pause or adjust your services with 30 days notice. No long-term lock-in contracts.",
  },
  {
    question: "Do you provide training and knowledge transfer?",
    answer: "Yes! We believe in empowering our clients. We offer training sessions, share best practices, and ensure your team understands our strategies and can maintain results independently if needed.",
  },
  {
    question: "How do we get started?",
    answer: "Simply schedule a free consultation through our contact form. We'll discuss your goals, audit your current situation, and propose a customized strategy. No obligations, just actionable insights.",
  },
];

const ServiceFAQ = ({ faqs = defaultFAQs, serviceTitle, serviceSlug }: ServiceFAQProps) => {
  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <HelpCircle className="w-4 h-4 inline mr-2" />
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our {serviceTitle} services
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>

            <AnimatedSection className="mt-12 text-center">
              <div className="bg-muted/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our team is here to help.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="hero" asChild>
                    <Link to={`/contact?service=${serviceSlug}`}>
                      Contact Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceFAQ;
