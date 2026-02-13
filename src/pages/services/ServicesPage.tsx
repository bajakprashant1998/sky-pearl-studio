import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { services } from "@/data/services";
import { ArrowRight, Sparkles, Flame, Zap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const serviceColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-indigo-500 to-violet-500",
  "from-rose-500 to-pink-500",
  "from-teal-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-fuchsia-500 to-purple-500",
  "from-lime-500 to-green-500",
];

const ServicesPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Digital Marketing Services",
    description: "Comprehensive digital marketing services by Digital Bull",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.subtitle,
        url: `https://sky-pearl-studio.lovable.app/services/${service.slug}`,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>All Digital Marketing Services | Digital Bull</title>
        <meta
          name="description"
          content="Explore 20+ digital marketing services including SEO, PPC, Web Design, Social Media, AI Marketing, and more. Data-driven strategies for business growth."
        />
        <meta property="og:title" content="Digital Marketing Services | Digital Bull" />
        <meta
          property="og:description"
          content="Explore 20+ digital marketing services including SEO, PPC, Web Design, Social Media, AI Marketing, and more."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sky-pearl-studio.lovable.app/services" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
          <motion.div
            className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <AnimatedSection>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                {services.length}+ Digital Services
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our Digital Marketing{" "}
                <span className="text-gradient">Services</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive, data-driven digital marketing solutions tailored to accelerate
                your business growth and maximize ROI.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <AnimatedSection key={service.id} delay={0.03 * index}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Hover gradient overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${serviceColors[index % serviceColors.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                    />

                    {/* Trending badge for first 3 */}
                    {index < 3 && (
                      <motion.div
                        className="absolute top-3 right-3 z-10"
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      >
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${serviceColors[index]} shadow-lg`}
                        >
                          <Flame className="w-3 h-3" />
                          HOT
                        </span>
                      </motion.div>
                    )}

                    {/* Icon */}
                    <motion.div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${serviceColors[index % serviceColors.length]} shadow-lg relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <service.icon className="w-7 h-7 text-white relative z-10" />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-white/20"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </motion.div>

                    {/* Content */}
                    <h2 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.shortTitle}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                      {service.subtitle}
                    </p>

                    {/* Subcategories preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.subcategories.slice(0, 2).map((sub) => (
                        <span
                          key={sub.id}
                          className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                        >
                          {sub.title}
                        </span>
                      ))}
                      {service.subcategories.length > 2 && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          +{service.subcategories.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Stats preview */}
                    {service.stats && service.stats.length > 0 && (
                      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{service.stats[0].value}</span>
                        <span>{service.stats[0].label}</span>
                      </div>
                    )}

                    {/* Link */}
                    <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all mt-auto">
                      Explore Service
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>

                    {/* Bottom border animation */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${serviceColors[index % serviceColors.length]}`}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how our digital marketing services can help you achieve your goals.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;
