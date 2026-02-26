import { TrendingUp, Users, Award, Target, Sparkles } from "lucide-react";
import AnimatedSection, { CountUp } from "./AnimatedSection";
import { motion } from "framer-motion";

const stats = [
  { icon: TrendingUp, numericValue: 500, suffix: "+", label: "Successful Campaigns", description: "Delivered across industries", color: "from-blue-500 to-cyan-500" },
  { icon: Users, numericValue: 10, suffix: "M+", label: "Leads Generated", description: "For our valued clients", color: "from-purple-500 to-pink-500" },
  { icon: Target, prefix: "$", numericValue: 50, suffix: "M+", label: "Revenue Generated", description: "In client growth", color: "from-green-500 to-emerald-500" },
  { icon: Award, numericValue: 98, suffix: "%", label: "Client Satisfaction", description: "Consistently maintained", color: "from-orange-500 to-amber-500" },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <motion.div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" animate={{ x: [20, -20, 20], y: [10, -10, 10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Our Track Record</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Proven Results That Speak for Themselves
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Our track record of success across diverse industries and marketing channels
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={0.1 * index}>
              <motion.div
                className="relative text-center p-8 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 group cursor-default overflow-hidden"
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              >
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <motion.div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-20`} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }} />
                  <div className="relative w-full h-full bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  <CountUp end={stat.numericValue} prefix={stat.prefix} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-primary-foreground font-medium mb-1">{stat.label}</div>
                <div className="text-primary-foreground/60 text-sm">{stat.description}</div>
                <motion.div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r ${stat.color} rounded-t-full`} initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }} />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
