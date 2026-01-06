import { TrendingUp, Users, Award, Globe, Target, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  {
    icon: TrendingUp,
    value: "500+",
    label: "Successful Campaigns",
    description: "Delivered across industries",
  },
  {
    icon: Users,
    value: "10M+",
    label: "Leads Generated",
    description: "For our valued clients",
  },
  {
    icon: Target,
    value: "$50M+",
    label: "Revenue Generated",
    description: "In client growth",
  },
  {
    icon: Award,
    value: "98%",
    label: "Client Satisfaction",
    description: "Consistently maintained",
  },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
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
              <div className="text-center p-8 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-primary-foreground/60 text-sm">
                  {stat.description}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
