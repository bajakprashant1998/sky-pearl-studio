import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

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
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Visual */}
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Rotated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-primary rounded-3xl"
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
                <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <span className="text-primary-foreground font-bold text-xl">D</span>
                      </motion.div>
                      <div>
                        <div className="font-bold text-foreground">Digital Bull Technology</div>
                        <div className="text-sm text-muted-foreground">Est. 2009</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Client Retention", value: "94%" },
                        { label: "Avg. ROI Increase", value: "320%" },
                        { label: "Projects Completed", value: "1,500+" },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="flex justify-between items-center p-4 bg-muted rounded-xl group hover:bg-primary/5 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span>
                          <span className="font-bold text-primary">{stat.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-4 shadow-xl border border-border"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Google Partner</div>
                    <div className="text-xs text-muted-foreground">Certified Agency</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Microsoft</div>
                    <div className="text-xs text-muted-foreground">Certified Agency</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right Column - Content */}
          <AnimatedSection direction="right">
            <div className="space-y-8">
              <div>
                <motion.span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4" />
                  Why Choose Us
                </motion.span>
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
                {features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/about-us">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
