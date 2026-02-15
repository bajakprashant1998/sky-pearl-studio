import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { services } from "@/data/services";
import { ArrowRight, Sparkles, Flame, Search, Filter, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect, useRef } from "react";

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Marketing", value: "marketing" },
  { label: "Development", value: "development" },
  { label: "Design", value: "design" },
  { label: "Analytics", value: "analytics" },
];

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

const AnimatedCounter = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.span
        className="text-2xl md:text-3xl font-bold text-foreground tabular-nums"
        key={count}
      >
        {count}{suffix}
      </motion.span>
      <span className="text-sm text-muted-foreground mt-1">{label}</span>
    </div>
  );
};

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        !searchQuery ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

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
        url: `https://dibull.com/services/${service.slug}`,
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
        <meta property="og:url" content="https://dibull.com/services" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <link rel="canonical" href="https://dibull.com/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing Services | Digital Bull" />
        <meta name="twitter:description" content="Explore 20+ digital marketing services including SEO, PPC, Web Design, Social Media, AI Marketing, and more." />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <motion.div
            className="absolute top-20 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/80 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-semibold mb-8 border border-border/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  {services.length}+ Digital Services
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
                  Our Digital Marketing{" "}
                  <span className="text-gradient">Services</span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Comprehensive, data-driven digital marketing solutions tailored to accelerate
                  your business growth and maximize ROI.
                </p>

                {/* Search Bar */}
                <motion.div
                  className="mt-10 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all shadow-sm"
                    />
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-12 text-center">
                  {[
                    { end: 20, suffix: "+", label: "Services" },
                    { end: 100, suffix: "+", label: "Subcategories" },
                    { end: 500, suffix: "+", label: "Clients Served" },
                    { end: 98, suffix: "%", label: "Satisfaction" },
                  ].map((stat) => (
                    <AnimatedCounter key={stat.label} end={stat.end} suffix={stat.suffix} label={stat.label} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            {/* Results count */}
            {searchQuery && (
              <motion.p
                className="text-sm text-muted-foreground mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Showing {filteredServices.length} of {services.length} services
              </motion.p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <AnimatedSection key={service.id} delay={0.03 * index}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group relative bg-card rounded-2xl border border-border/60 hover:border-primary/40 transition-all duration-500 h-full flex flex-col overflow-hidden hover:shadow-xl hover:shadow-primary/5"
                  >
                    {/* Top gradient bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${serviceColors[index % serviceColors.length]} opacity-60 group-hover:opacity-100 transition-opacity`} />

                    <div className="p-6 flex flex-col flex-1">
                      {/* Hover gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${serviceColors[index % serviceColors.length]} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                      />

                      {/* Trending badge for first 3 */}
                      {index < 3 && (
                        <motion.div
                          className="absolute top-4 right-4 z-10"
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        >
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${serviceColors[index]} shadow-lg`}
                          >
                            <Flame className="w-3 h-3" />
                            TRENDING
                          </span>
                        </motion.div>
                      )}

                      {/* Icon */}
                      <motion.div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${serviceColors[index % serviceColors.length]} shadow-lg relative`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <service.icon className="w-7 h-7 text-white relative z-10" />
                      </motion.div>

                      {/* Content */}
                      <h2 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.shortTitle}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-3">
                        {service.subtitle}
                      </p>

                      {/* Subcategories preview */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.subcategories.slice(0, 2).map((sub) => (
                          <span
                            key={sub.id}
                            className="text-xs bg-muted/80 px-2.5 py-1 rounded-lg text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                          >
                            {sub.title}
                          </span>
                        ))}
                        {service.subcategories.length > 2 && (
                          <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-medium">
                            +{service.subcategories.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Link */}
                      <span className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-2.5 gap-1.5 transition-all mt-auto">
                        Explore Service
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            {/* No results */}
            {filteredServices.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No services found</h3>
                <p className="text-muted-foreground">Try a different search term</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Choose <span className="text-gradient">Digital Bull?</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We combine cutting-edge technology with proven strategies to deliver measurable results.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🎯", title: "Data-Driven", desc: "Every decision backed by analytics and real-time data insights" },
                { icon: "🚀", title: "Growth Focused", desc: "Strategies designed to scale your business exponentially" },
                { icon: "🤖", title: "AI-Powered", desc: "Leveraging artificial intelligence for smarter marketing" },
                { icon: "💎", title: "Premium Quality", desc: "Enterprise-grade solutions at competitive pricing" },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.1}>
                  <motion.div
                    className="text-center p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    whileHover={{ y: -4 }}
                  >
                    <span className="text-4xl mb-4 block">{item.icon}</span>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />
          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-bold mb-5">
                Ready to Grow Your Business?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Let's discuss how our digital marketing services can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/case-studies">
                    View Case Studies
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;
