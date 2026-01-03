import { Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedSection from "./AnimatedSection";
import { Helmet } from "react-helmet-async";
import { Subcategory } from "@/data/services";
import { ReactNode } from "react";

interface ServicePageLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  subcategories: Subcategory[];
  benefits: string[];
  ctaText?: string;
  slug: string;
  extraSection?: ReactNode;
}

const ServicePageLayout = ({
  icon: Icon,
  title,
  subtitle,
  description,
  subcategories,
  benefits,
  ctaText = "Get Started Today",
  slug,
  extraSection,
}: ServicePageLayoutProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Digital Bull Technology Pvt LTD"
    }
  };

  return (
    <>
      <Helmet>
        <title>{title} - Digital Bull Technology</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Digital Bull Technology`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://dibull.com/services/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </AnimatedSection>
            
            <div className="max-w-4xl">
              <AnimatedSection delay={0.1}>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.15}>
                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                  {subtitle}
                </span>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {title}
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={0.25}>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  {description}
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <Link to="/contact">
                      {ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="#contact">Schedule Consultation</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Extra Section (like SEO Checker) */}
        {extraSection}

        {/* Subcategories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We <span className="text-gradient">Offer</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive solutions tailored to your business needs
              </p>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subcategories.map((subcategory, index) => (
                <AnimatedSection key={subcategory.id} delay={index * 0.1}>
                  <Link
                    to={`/services/${slug}/${subcategory.id}`}
                    className="block bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover-lift h-full group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <subcategory.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">
                      {subcategory.title}
                    </h3>
                    <ul className="space-y-3">
                      {subcategory.items.slice(0, 4).map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground text-sm leading-relaxed">
                            {item.name}
                          </span>
                        </li>
                      ))}
                      {subcategory.items.length > 4 && (
                        <li className="text-sm text-primary font-medium pl-8">
                          +{subcategory.items.length - 4} more services
                        </li>
                      )}
                    </ul>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left">
                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Our <span className="text-gradient">Services</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Partner with us to unlock your business potential with proven strategies and measurable results.
                </p>
                
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
              
              <AnimatedSection direction="right">
                <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-8 lg:p-12 border border-primary/20">
                  <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let's discuss how we can help grow your business with our comprehensive services.
                  </p>
                  <Button variant="hero" className="w-full group" asChild>
                    <Link to="/contact">
                      Contact Us 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ServicePageLayout;
