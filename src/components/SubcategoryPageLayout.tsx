import { Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, Star, ChevronDown, ChevronUp, TrendingUp, Users, Zap, Award, Target, CheckCircle2, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { getSubcategoryData, processIcons, benefitIcons } from "@/data/subcategoryData";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

interface SubcategoryPageLayoutProps {
  serviceIcon: LucideIcon;
  serviceSlug: string;
  serviceTitle: string;
  subcategoryId: string;
  subcategoryTitle: string;
  items: { name: string }[];
}

const stats = [
  { value: "250%", label: "Avg. Traffic Increase", icon: TrendingUp },
  { value: "45%", label: "Conversion Boost", icon: Target },
  { value: "200+", label: "Projects Delivered", icon: CheckCircle2 },
  { value: "4.9/5", label: "Client Rating", icon: Star },
];

const whyChoosePoints = [
  { icon: Shield, title: "Proven Methodology", desc: "Battle-tested strategies that deliver consistent results" },
  { icon: Zap, title: "Fast Implementation", desc: "Quick turnaround with quality-focused execution" },
  { icon: Users, title: "Expert Team", desc: "Industry specialists dedicated to your success" },
  { icon: Globe, title: "Global Experience", desc: "Serving clients across diverse industries worldwide" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }
  })
};

const AnimatedBar = ({ value, color }: { value: number; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-3 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" as const }}
      />
    </div>
  );
};

const SubcategoryPageLayout = ({
  serviceIcon: ServiceIcon,
  serviceSlug,
  serviceTitle,
  subcategoryId,
  subcategoryTitle,
  items,
}: SubcategoryPageLayoutProps) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const subcategoryData = getSubcategoryData(
    subcategoryId,
    subcategoryTitle,
    serviceTitle,
    items.map(i => i.name)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": subcategoryTitle,
    "description": subcategoryData.description,
    "provider": {
      "@type": "Organization",
      "name": "Digital Bull Technology Pvt LTD"
    },
    "serviceType": serviceTitle
  };

  return (
    <>
      <Helmet>
        <title>{subcategoryTitle} - {serviceTitle} | Digital Bull Technology</title>
        <meta name="description" content={subcategoryData.description} />
        <meta property="og:title" content={`${subcategoryTitle} | Digital Bull Technology`} />
        <meta property="og:description" content={subcategoryData.description} />
        <link rel="canonical" href={`https://dibull.com/services/${serviceSlug}/${subcategoryId}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden text-white">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.15, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-sm text-white/70 mb-8 flex-wrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to={`/services/${serviceSlug}`} className="hover:text-white transition-colors">
                {serviceTitle}
              </Link>
              <span>/</span>
              <span className="text-white">{subcategoryTitle}</span>
            </motion.nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <ServiceIcon className="w-10 h-10 text-white" />
                </motion.div>

                <motion.span
                  className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {serviceTitle}
                </motion.span>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  {subcategoryTitle}
                </motion.h1>

                <motion.p
                  className="text-xl text-white/80 leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {subcategoryData.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/contact">
                      Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <Link to="/contact">Free Consultation</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="w-8 h-8 text-white/80 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Complete Service Package
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What's <span className="text-gradient">Included</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive solutions tailored to your specific needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => {
                const itemSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const colors = [
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-pink-500",
                  "from-amber-500 to-orange-500",
                  "from-green-500 to-emerald-500",
                  "from-rose-500 to-red-500",
                  "from-indigo-500 to-blue-500",
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index}
                  >
                    <Link
                      to={`/services/${serviceSlug}/${subcategoryId}/feature/${itemSlug}`}
                      className="block group"
                    >
                      <motion.div
                        className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full"
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <Check className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Professional {item.name.toLowerCase()} services to boost your online presence and drive results.
                        </p>
                        <span className="text-sm font-medium text-primary flex items-center">
                          Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Our <span className="text-gradient">{subcategoryTitle}</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {subcategoryData.longDescription}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whyChoosePoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <point.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{point.title}</h4>
                        <p className="text-sm text-muted-foreground">{point.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Infographic */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
                  <h3 className="text-xl font-bold mb-6 text-center">Our Impact</h3>
                  <div className="space-y-6">
                    {[
                      { label: "Traffic Growth", value: 95, color: "bg-blue-500" },
                      { label: "Conversion Rate", value: 85, color: "bg-green-500" },
                      { label: "ROI Improvement", value: 90, color: "bg-purple-500" },
                      { label: "Client Satisfaction", value: 98, color: "bg-amber-500" },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm font-bold text-primary">{item.value}%</span>
                        </div>
                        <AnimatedBar value={item.value} color={item.color} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Benefits Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Key Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Benefits of Our <span className="text-gradient">{subcategoryTitle}</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover how our services can transform your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategoryData.keyBenefits.map((benefit, index) => {
                const BenefitIcon = benefitIcons[index % benefitIcons.length];
                const benefitSlug = benefit.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const bgColors = [
                  "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
                  "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
                  "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
                  "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
                  "bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30",
                  "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30",
                ];
                const iconColors = [
                  "text-blue-600",
                  "text-purple-600",
                  "text-amber-600",
                  "text-green-600",
                  "text-rose-600",
                  "text-indigo-600",
                ];

                return (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index}
                  >
                    <Link
                      to={`/services/${serviceSlug}/${subcategoryId}/benefit/${benefitSlug}`}
                      className="block group h-full"
                    >
                      <motion.div
                        className={`${bgColors[index % bgColors.length]} rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full flex flex-col`}
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-14 h-14 bg-white dark:bg-card rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                          <BenefitIcon className={`w-7 h-7 ${iconColors[index % iconColors.length]}`} />
                        </div>
                        <p className="text-foreground font-semibold group-hover:text-primary transition-colors mb-3">{benefit}</p>
                        <div className="mt-auto flex items-center text-sm font-medium text-primary">
                          Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How We Deliver <span className="text-gradient">Results</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven approach to delivering exceptional {subcategoryTitle} results
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {subcategoryData.processSteps.map((step, index) => {
                const StepIcon = processIcons[index % processIcons.length];
                const colors = ["bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-green-500", "bg-rose-500"];

                return (
                  <motion.div
                    key={index}
                    className="flex gap-6 mb-8 last:mb-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index}
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`w-14 h-14 ${colors[index % colors.length]} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
                        whileHover={{ scale: 1.15 }}
                      >
                        {index + 1}
                      </motion.div>
                      {index < subcategoryData.processSteps.length - 1 && (
                        <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent mt-4" />
                      )}
                    </div>

                    <motion.div
                      className="flex-1 bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <StepIcon className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {subcategoryData.testimonialSnippet && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"
                  animate={{ scale: [1.3, 1, 1.3] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                />

                <div className="relative text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>

                  <blockquote className="text-xl lg:text-2xl font-medium mb-6 italic">
                    "{subcategoryData.testimonialSnippet.quote}"
                  </blockquote>

                  <div>
                    <p className="font-semibold">{subcategoryData.testimonialSnippet.author}</p>
                    <p className="text-sm text-white/70">{subcategoryData.testimonialSnippet.company}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Get answers to common questions about our {subcategoryTitle} services
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {subcategoryData.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openFaqIndex === index ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-gradient">{subcategoryTitle}</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how our {subcategoryTitle} services can help you achieve your business goals. Get a free consultation today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to={`/services/${serviceSlug}`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to {serviceTitle}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explore More <span className="text-gradient">{serviceTitle}</span>
              </h2>
            </motion.div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to={`/services/${serviceSlug}`}>
                  View All {serviceTitle} Services <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SubcategoryPageLayout;
