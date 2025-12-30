import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  "Data-driven strategies for measurable results",
  "Dedicated account managers for personalized support",
  "Transparent reporting and real-time analytics",
  "Cutting-edge tools and technologies",
  "Industry-leading expertise and certifications",
  "Flexible packages tailored to your budget",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image/Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Card */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl transform rotate-3" />
              <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xl">D</span>
                    </div>
                    <div>
                      <div className="font-bold text-foreground">DigiPulse Agency</div>
                      <div className="text-sm text-muted-foreground">Est. 2009</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Client Retention</span>
                      <span className="font-bold text-primary">94%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Avg. ROI Increase</span>
                      <span className="font-bold text-primary">320%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Projects Completed</span>
                      <span className="font-bold text-primary">1,500+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Google Partner</div>
                    <div className="text-xs text-muted-foreground">Certified Agency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                A Partner Committed to Your{" "}
                <span className="text-gradient">Growth</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                With over 15 years of experience, we've helped hundreds of businesses
                transform their digital presence and achieve remarkable growth.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="group">
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
