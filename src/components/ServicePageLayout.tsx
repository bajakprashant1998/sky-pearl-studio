import { Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import { Subcategory } from "@/data/services";

interface ServicePageLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  subcategories: Subcategory[];
  benefits: string[];
  ctaText?: string;
  slug: string;
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
}: ServicePageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title} - Digital Bull Technology</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="max-w-4xl">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
                {subtitle}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg">
                  {ctaText}
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <a href="#contact">Schedule Consultation</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We <span className="text-gradient">Offer</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive solutions tailored to your business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subcategories.map((subcategory, index) => (
                <Link
                  key={subcategory.id}
                  to={`/services/${slug}/${subcategory.id}`}
                  className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-up group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {subcategory.title}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
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
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
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
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-8 lg:p-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how we can help grow your business with our comprehensive services.
                </p>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/#contact">
                    Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
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

export default ServicePageLayout;
