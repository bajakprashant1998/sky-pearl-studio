import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, Star, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { getSubcategoryData, processIcons, benefitIcons, SubcategoryDetail } from "@/data/subcategoryData";
import { cn } from "@/lib/utils";

interface SubcategoryPageLayoutProps {
  serviceIcon: LucideIcon;
  serviceSlug: string;
  serviceTitle: string;
  subcategoryId: string;
  subcategoryTitle: string;
  items: { name: string }[];
}

const SubcategoryPageLayout = ({
  serviceIcon: ServiceIcon,
  serviceSlug,
  serviceTitle,
  subcategoryId,
  subcategoryTitle,
  items,
}: SubcategoryPageLayoutProps) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const subcategoryData = getSubcategoryData(
    subcategoryId,
    subcategoryTitle,
    serviceTitle,
    items.map(i => i.name)
  );

  return (
    <>
      <Helmet>
        <title>{subcategoryTitle} - {serviceTitle} | DigiPulse</title>
        <meta name="description" content={subcategoryData.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to={`/services/${serviceSlug}`} className="hover:text-primary transition-colors">
                {serviceTitle}
              </Link>
              <span>/</span>
              <span className="text-foreground">{subcategoryTitle}</span>
            </nav>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <ServiceIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
                  {serviceTitle}
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {subcategoryTitle}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {subcategoryData.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="#contact">Free Consultation</a>
                  </Button>
                </div>
              </div>
              
              {/* Hero Stats/Features Card */}
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    What's Included
                  </h3>
                  <ul className="space-y-4">
                    {items.map((item, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-3 animate-fade-up"
                        style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long Description Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our <span className="text-gradient">{subcategoryTitle}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {subcategoryData.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Key Benefits Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Key <span className="text-gradient">Benefits</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover how our {subcategoryTitle} services can transform your business
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subcategoryData.keyBenefits.map((benefit, index) => {
                const BenefitIcon = benefitIcons[index % benefitIcons.length];
                return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-up group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <BenefitIcon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{benefit}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient">Process</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven approach to delivering exceptional {subcategoryTitle} results
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {subcategoryData.processSteps.map((step, index) => {
                const StepIcon = processIcons[index % processIcons.length];
                return (
                  <div
                    key={index}
                    className="flex gap-6 mb-8 last:mb-0 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Step Number & Line */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                        {index + 1}
                      </div>
                      {index < subcategoryData.processSteps.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-4" />
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <StepIcon className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonial Snippet */}
        {subcategoryData.testimonialSnippet && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-card rounded-3xl p-8 lg:p-12 border border-border text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
                
                <div className="relative">
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl lg:text-2xl font-medium mb-6 text-foreground">
                    "{subcategoryData.testimonialSnippet.quote}"
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold text-foreground">{subcategoryData.testimonialSnippet.author}</p>
                    <p className="text-sm text-muted-foreground">{subcategoryData.testimonialSnippet.company}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Get answers to common questions about our {subcategoryTitle} services
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {subcategoryData.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openFaqIndex === index ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-gradient">{subcategoryTitle}</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how our {subcategoryTitle} services can help you achieve your business goals. Get a free consultation today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/#contact">
                    Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to={`/services/${serviceSlug}`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to {serviceTitle}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More <span className="text-gradient">{serviceTitle}</span>
              </h2>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to={`/services/${serviceSlug}`}>
                  View All {serviceTitle} Services <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SubcategoryPageLayout;
