import { Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, ChevronRight, TrendingUp, Users, Zap, Award, Target, BarChart3, Star, CheckCircle2, Sparkles, Layers, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedSection from "./AnimatedSection";
import { Helmet } from "react-helmet-async";
import { Subcategory, ServiceStat } from "@/data/services";
import { ReactNode } from "react";
import GrowthChart from "@/components/charts/GrowthChart";
import ROICalculator from "@/components/charts/ROICalculator";
import ChannelPerformance from "@/components/charts/ChannelPerformance";

interface ServicePageLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  subcategories: Subcategory[];
  benefits: string[];
  ctaText?: string;
  slug: string;
  extraSection?: ReactNode;
  stats?: ServiceStat[];
}

const defaultStats = [
  { value: "500+", label: "Projects Delivered", icon: CheckCircle2, color: "from-blue-500 to-cyan-500" },
  { value: "98%", label: "Client Satisfaction", icon: Star, color: "from-amber-500 to-orange-500" },
  { value: "3x", label: "Average ROI", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
  { value: "24/7", label: "Support Available", icon: Shield, color: "from-purple-500 to-pink-500" },
];

const whyChooseUs = [
  { icon: Target, title: "Data-Driven Strategy", desc: "Every decision backed by analytics and performance metrics" },
  { icon: Zap, title: "Fast Implementation", desc: "Quick turnaround without compromising quality" },
  { icon: Users, title: "Dedicated Team", desc: "Expert professionals assigned to your project" },
  { icon: Award, title: "Proven Results", desc: "Track record of delivering exceptional outcomes" },
];

const processSteps = [
  { number: "01", title: "Discovery & Analysis", desc: "We dive deep into your business, competitors, and market to understand your unique needs." },
  { number: "02", title: "Strategy Development", desc: "Create a customized roadmap aligned with your goals and budget." },
  { number: "03", title: "Implementation", desc: "Execute the strategy with precision using industry best practices." },
  { number: "04", title: "Optimization & Reporting", desc: "Continuous improvement based on data and transparent reporting." },
];

const ServicePageLayout = ({
  icon: Icon,
  title,
  subtitle,
  description,
  subcategories,
  benefits,
  ctaText = "Get Started Today",
  slug,
  extraSection,
  stats = defaultStats,
}: ServicePageLayoutProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Digital Bull Technology Pvt LTD"
    }
  };

  return (
    <>
      <Helmet>
        <title>{title} - Digital Bull Technology</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Digital Bull Technology`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://dibull.com/services/${slug}`} />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <link rel="canonical" href={`https://dibull.com/services/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Digital Bull Technology`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section - Enhanced with stats */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>

          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedSection delay={0.1}>
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                    <Icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                    {subtitle}
                  </span>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {title}
                  </h1>
                </AnimatedSection>

                <AnimatedSection delay={0.25}>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                    {description}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" className="group" asChild>
                      <Link to="/contact">
                        {ctaText}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="heroOutline" size="lg" asChild>
                      <Link to="/contact">Free Consultation</Link>
                    </Button>
                  </div>
                </AnimatedSection>
              </div>

              {/* Stats Grid */}
              <AnimatedSection delay={0.35}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Extra Section (like SEO Checker) */}
        {extraSection}

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Why Digital Bull
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Us for <span className="text-gradient">{subtitle}</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We combine expertise, innovation, and dedication to deliver exceptional results
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full group text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Subcategories Section - Card Based with Colors */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive <span className="text-gradient">{subtitle}</span> Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our full range of services designed to accelerate your growth
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subcategories.map((subcategory, index) => {
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
                  <AnimatedSection key={subcategory.id} delay={index * 0.1}>
                    <Link
                      to={`/services/${slug}/${subcategory.id}`}
                      className="block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover-lift h-full group"
                    >
                      {/* Colored Header */}
                      <div className={`bg-gradient-to-r ${colorClass} p-6`}>
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <subcategory.icon className="w-7 h-7 text-white" />
                          </div>
                          <ChevronRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-xl font-bold text-white mt-4">
                          {subcategory.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <ul className="space-y-3">
                          {subcategory.items.slice(0, 4).map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                              <span className="text-muted-foreground text-sm leading-relaxed">
                                {item.name}
                              </span>
                            </li>
                          ))}
                          {subcategory.items.length > 4 && (
                            <li className="text-sm text-primary font-medium pl-8">
                              +{subcategory.items.length - 4} more services
                            </li>
                          )}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-sm font-medium text-primary group-hover:underline">
                            Explore Services →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section - Timeline Style */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How We Deliver <span className="text-gradient">Results</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven methodology that ensures success at every stage
              </p>
            </AnimatedSection>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <AnimatedSection key={index} delay={index * 0.15}>
                    <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full group">
                      {/* Step Number */}
                      <div className="text-5xl font-bold text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors">
                        {step.number}
                      </div>

                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                        <span className="text-lg font-bold text-white">{step.number}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>

                      {/* Connector Line */}
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                      )}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data & Analytics Section with Charts */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Data-Driven Success
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Measurable <span className="text-gradient">Results</span> You Can Expect
              </h2>
              <p className="text-lg text-muted-foreground">
                Our strategies are backed by data and proven to deliver tangible business growth
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GrowthChart />
              <ROICalculator />
              <ChannelPerformance />
            </div>
          </div>
        </section>

        {/* Benefits Section - Enhanced */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left">
                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                  Key Benefits
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Transform Your Business with Our <span className="text-gradient">{subtitle}</span> Services
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Partner with us to unlock your business potential with proven strategies and measurable results.
                </p>

                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />

                  <div className="relative z-10">
                    <Sparkles className="w-12 h-12 mb-6 opacity-80" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-white/80 mb-6 text-lg">
                      Let's discuss how we can help grow your business with our comprehensive {subtitle.toLowerCase()} services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90" asChild>
                        <Link to="/contact">
                          Contact Us
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10" asChild>
                        <Link to="/case-studies">View Case Studies</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 lg:p-12 border border-border text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

                <div className="relative">
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-xl lg:text-2xl font-medium mb-6 text-foreground">
                    "Digital Bull Technology transformed our online presence. Their {subtitle.toLowerCase()} expertise helped us achieve 300% growth in organic traffic within 6 months."
                  </blockquote>

                  <div>
                    <p className="font-semibold text-foreground">Marketing Director</p>
                    <p className="text-sm text-muted-foreground">Fortune 500 Company</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-gradient">{subtitle}</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get a free consultation and discover how we can help you achieve your business goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/free-tools">Try Free Tools</Link>
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

export default ServicePageLayout;