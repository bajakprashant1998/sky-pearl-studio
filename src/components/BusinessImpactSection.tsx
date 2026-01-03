import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { businessImpactData } from "@/data/businessImpactData";
import AnimatedSection from "./AnimatedSection";

const BusinessImpactSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Business Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Measurable Results That{" "}
            <span className="text-gradient">Drive Growth</span>
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
                className="block bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover-lift h-full"
              >
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <impact.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">
                    {impact.stat}
                  </span>
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
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessImpactSection;
