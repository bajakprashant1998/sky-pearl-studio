import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { services, getServiceBySlug } from "@/data/services";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

interface RelatedServicesProps {
  currentSlug: string;
  relatedSlugs?: string[];
  title?: string;
}

const RelatedServices = ({ currentSlug, relatedSlugs, title }: RelatedServicesProps) => {
  // Default related services mapping if not provided
  const defaultRelatedMap: Record<string, string[]> = {
    seo: ["content-marketing", "web-design", "ppc"],
    ppc: ["seo", "social-media", "conversion-optimization"],
    "web-design": ["seo", "branding-design", "conversion-optimization"],
    "social-media": ["content-marketing", "video-marketing", "ppc"],
    "content-marketing": ["seo", "social-media", "email-marketing"],
    "email-marketing": ["content-marketing", "conversion-optimization", "social-media"],
    "conversion-optimization": ["web-design", "ppc", "analytics-ai-technology"],
    "ecommerce-marketing": ["amazon-marketing", "ppc", "seo"],
    "amazon-marketing": ["ecommerce-marketing", "ppc", "seo"],
    "video-marketing": ["social-media", "content-marketing", "branding-design"],
    "programmatic-advertising": ["ppc", "social-media", "analytics-ai-technology"],
    "analytics-ai-technology": ["conversion-optimization", "seo", "programmatic-advertising"],
    "custom-development": ["web-design", "saas-products", "ai-marketing"],
    "ai-marketing": ["analytics-ai-technology", "custom-development", "ppc"],
    "training-programs": ["seo", "social-media", "content-marketing"],
    "saas-products": ["custom-development", "analytics-ai-technology", "ai-marketing"],
    "branding-design": ["web-design", "video-marketing", "content-marketing"],
  };

  const slugsToShow = relatedSlugs || defaultRelatedMap[currentSlug] || [];
  const relatedServices = slugsToShow
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean)
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  const currentService = getServiceBySlug(currentSlug);
  const displayTitle = title || `Services That Work Great With ${currentService?.shortTitle || "This Service"}`;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Boost Your Results
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {displayTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{displayTitle.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Combine services for maximum impact and accelerated growth
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {relatedServices.map((service, index) => {
            if (!service) return null;
            const Icon = service.icon;
            const colors = [
              "from-blue-500 to-cyan-500",
              "from-purple-500 to-pink-500",
              "from-amber-500 to-orange-500",
            ];

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full group"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colors[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {service.shortTitle}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {service.description.slice(0, 100)}...
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default RelatedServices;
