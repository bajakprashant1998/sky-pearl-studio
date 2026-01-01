import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <img
          src={heroBg}
          alt="Digital marketing abstract background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium animate-fade-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              #1 Rated Digital Marketing Agency
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Grow Your Business with{" "}
              <span className="text-gradient">Data-Driven</span> Marketing
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              We help businesses increase revenue, generate qualified leads, and
              build lasting customer relationships through strategic digital
              marketing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="#contact">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="group" asChild>
                <Link to="/about-us">
                  <FileText className="w-5 h-5 mr-2" />
                  Company Profile
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 items-center justify-center lg:justify-start pt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Floating Cards */}
              <div className="absolute top-0 right-0 bg-card rounded-2xl p-6 shadow-xl border border-border animate-float">
                <div className="text-4xl font-bold text-primary">+247%</div>
                <div className="text-sm text-muted-foreground">Traffic Increase</div>
              </div>

              <div className="absolute bottom-20 left-0 bg-card rounded-2xl p-6 shadow-xl border border-border animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-4xl font-bold text-primary">$12M+</div>
                <div className="text-sm text-muted-foreground">Revenue Generated</div>
              </div>

              <div className="absolute bottom-0 right-10 bg-card rounded-2xl p-6 shadow-xl border border-border animate-float" style={{ animationDelay: "2s" }}>
                <div className="text-4xl font-bold text-primary">3.2x</div>
                <div className="text-sm text-muted-foreground">ROI Average</div>
              </div>

              {/* Central Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
