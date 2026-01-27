import { Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface ComparisonTableProps {
  tiers?: Tier[];
  serviceSlug: string;
}

const defaultTiers: Tier[] = [
  {
    name: "Basic",
    price: "₹25,000",
    description: "Perfect for startups and small businesses",
    features: [
      "Core service implementation",
      "Monthly performance reports",
      "Email support",
      "Basic analytics dashboard",
    ],
  },
  {
    name: "Professional",
    price: "₹50,000",
    description: "Ideal for growing businesses",
    features: [
      "Core service implementation",
      "Monthly performance reports",
      "Priority email & chat support",
      "Advanced analytics dashboard",
      "A/B testing & optimization",
      "Dedicated account manager",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Core service implementation",
      "Weekly performance reports",
      "24/7 priority support",
      "Custom analytics solutions",
      "A/B testing & optimization",
      "Dedicated team of experts",
      "Custom integrations",
      "SLA guarantees",
    ],
  },
];

const ComparisonTable = ({ tiers = defaultTiers, serviceSlug }: ComparisonTableProps) => {
  const allFeatures = [...new Set(tiers.flatMap((tier) => tier.features))];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient">Growth Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Flexible pricing options designed to scale with your business needs
          </p>
        </AnimatedSection>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="grid grid-cols-4 gap-4 min-w-[900px]">
            {/* Header row */}
            <div className="p-6" />
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl text-center ${
                  tier.highlighted
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-xl scale-105"
                    : "bg-card border border-border"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-foreground"}`}>
                  {tier.name}
                </h3>
                <div className={`text-3xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-foreground"}`}>
                  {tier.price}
                  <span className={`text-sm font-normal ${tier.highlighted ? "text-white/70" : "text-muted-foreground"}`}>
                    /month
                  </span>
                </div>
                <p className={`text-sm mb-4 ${tier.highlighted ? "text-white/80" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>
                <Button
                  variant={tier.highlighted ? "secondary" : "outline"}
                  className={`w-full ${tier.highlighted ? "bg-white text-primary hover:bg-white/90" : ""}`}
                  asChild
                >
                  <Link to={`/contact?service=${serviceSlug}&plan=${tier.name.toLowerCase()}`}>
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            ))}

            {/* Feature rows */}
            {allFeatures.map((feature, featureIndex) => (
              <>
                <div
                  key={`feature-${featureIndex}`}
                  className={`p-4 flex items-center text-sm font-medium ${
                    featureIndex % 2 === 0 ? "bg-muted/30" : ""
                  } rounded-l-lg`}
                >
                  {feature}
                </div>
                {tiers.map((tier, tierIndex) => {
                  const hasFeature = tier.features.includes(feature);
                  return (
                    <div
                      key={`${tier.name}-${featureIndex}`}
                      className={`p-4 flex items-center justify-center ${
                        featureIndex % 2 === 0 ? "bg-muted/30" : ""
                      } ${tierIndex === tiers.length - 1 ? "rounded-r-lg" : ""}`}
                    >
                      {hasFeature ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/30" />
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl ${
                tier.highlighted
                  ? "bg-gradient-to-br from-primary to-accent text-white shadow-xl"
                  : "bg-card border border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-foreground"}`}>
                {tier.name}
              </h3>
              <div className={`text-3xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-foreground"}`}>
                {tier.price}
                <span className={`text-sm font-normal ${tier.highlighted ? "text-white/70" : "text-muted-foreground"}`}>
                  /month
                </span>
              </div>
              <p className={`text-sm mb-4 ${tier.highlighted ? "text-white/80" : "text-muted-foreground"}`}>
                {tier.description}
              </p>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${tier.highlighted ? "text-white" : "text-green-500"}`} />
                    <span className={tier.highlighted ? "text-white/90" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.highlighted ? "secondary" : "outline"}
                className={`w-full ${tier.highlighted ? "bg-white text-primary hover:bg-white/90" : ""}`}
                asChild
              >
                <Link to={`/contact?service=${serviceSlug}&plan=${tier.name.toLowerCase()}`}>
                  Get Started
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
