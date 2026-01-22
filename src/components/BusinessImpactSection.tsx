import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { businessImpactData } from "@/data/businessImpactData";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const BusinessImpactSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"
          animate={{ 
            x: [-30, 30, -30],
            y: [-15, 15, -15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"
          animate={{ 
            x: [30, -30, 30],
            y: [15, -15, 15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4 tracking-wide uppercase"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-4 h-4" />
            Business Impact
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Measurable Results That{" "}
            <span className="text-gradient relative">
              Drive Growth
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We don't just promise results—we deliver them. Explore how our strategies
            create tangible business impact for our clients.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessImpactData.map((impact, index) => (
            <AnimatedSection
              key={impact.id}
              delay={index * 0.1}
              className="group"
            >
              <Link
                to={`/impact/${impact.slug}`}
                className="relative block bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 h-full overflow-hidden"
              >
                {/* Animated gradient background on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${impact.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Floating sparkle */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-primary/50" />
                </motion.div>

                {/* Icon with gradient background */}
                <motion.div 
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <impact.icon className="w-8 h-8 text-primary-foreground relative z-10" />
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-white/20"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>

                {/* Stat with animated counter effect */}
                <div className="mb-4 relative">
                  <motion.span 
                    className="text-4xl md:text-5xl font-bold text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {impact.stat}
                  </motion.span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {impact.statLabel}
                  </p>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {impact.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {impact.shortDescription}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Bottom accent line */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${impact.color}`}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessImpactSection;
