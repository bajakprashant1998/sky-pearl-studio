import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const steps = [
  { icon: Search, step: "01", title: "Discovery & Audit", description: "We deep-dive into your business, competitors, and market to uncover growth opportunities.", color: "from-blue-500 to-cyan-500", highlights: ["Market Analysis", "Competitor Research", "Technical Audit"], duration: "1–2 Days" },
  { icon: Lightbulb, step: "02", title: "Strategy & Planning", description: "Custom digital strategy designed around your goals, audience, and budget.", color: "from-purple-500 to-pink-500", highlights: ["Channel Selection", "Content Strategy", "KPI Definition"], duration: "3–5 Days" },
  { icon: Rocket, step: "03", title: "Execute & Launch", description: "Our expert team implements campaigns with precision across all digital channels.", color: "from-orange-500 to-red-500", highlights: ["Campaign Setup", "Creative Design", "Multi-channel Launch"], duration: "1–2 Weeks" },
  { icon: BarChart3, step: "04", title: "Optimize & Scale", description: "Continuous data analysis and optimization to maximize ROI and scale results.", color: "from-green-500 to-emerald-500", highlights: ["A/B Testing", "Performance Tuning", "Growth Scaling"], duration: "Ongoing" },
];

const HowWeWorkSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4" whileHover={{ scale: 1.05 }}>
              <Sparkles className="w-4 h-4" />
              Our Process
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How We <span className="text-gradient">Deliver Results</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A proven 4-step framework that transforms businesses through strategic digital marketing.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline connector for desktop */}
        <div className="hidden lg:block relative mb-4">
          <motion.div
            className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 opacity-20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <AnimatedSection key={step.step} delay={index * 0.15}>
              <motion.div
                className="relative bg-card rounded-2xl p-7 border border-border h-full flex flex-col group hover:border-primary/40 transition-all duration-500"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Step number badge */}
                <motion.div
                  className={`absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-sm font-bold text-white shadow-lg`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {step.step}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {step.description}
                </p>

                {/* Duration badge */}
                <div className={`inline-flex items-center self-start px-2.5 py-1 rounded-full text-xs font-medium mb-3 bg-gradient-to-r ${step.color} text-white/90`}>
                  ⏱ {step.duration}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                  {step.highlights.map((h) => (
                    <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {h}
                    </span>
                  ))}
                </div>

                <motion.div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${step.color} rounded-b-2xl`} initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }} />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="text-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/contact">
                Start Your Growth Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
