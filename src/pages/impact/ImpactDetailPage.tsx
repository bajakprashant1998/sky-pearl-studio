import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Quote, TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3, Users, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { CountUp } from "@/components/AnimatedSection";
import { getImpactBySlug, businessImpactData } from "@/data/businessImpactData";
import NotFound from "@/pages/NotFound";

const ImpactDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const impact = getImpactBySlug(slug || "");

  if (!impact) {
    return <NotFound />;
  }

  // Extract numeric value from stat for animations
  const extractNumeric = (stat: string): { value: number; suffix: string; prefix: string } => {
    const match = stat.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (match) {
      return { prefix: match[1], value: parseFloat(match[2]), suffix: match[3] };
    }
    return { prefix: '', value: 0, suffix: stat };
  };

  const statInfo = extractNumeric(impact.stat);

  // Before/After comparison data based on impact type
  const getComparisonData = () => {
    const comparisons: Record<string, { metric: string; before: string; after: string; improvement: string; icon: React.ElementType }[]> = {
      "revenue-growth": [
        { metric: "Annual Revenue", before: "$2M", after: "$6.9M", improvement: "+247%", icon: TrendingUp },
        { metric: "Customer Acquisition Cost", before: "$450", after: "$247", improvement: "-45%", icon: ArrowDownRight },
        { metric: "Average Deal Size", before: "$15K", after: "$25K", improvement: "+67%", icon: ArrowUpRight },
        { metric: "Sales Cycle", before: "90 days", after: "45 days", improvement: "-50%", icon: Zap },
      ],
      "lead-generation": [
        { metric: "Monthly Leads", before: "150", after: "620", improvement: "+312%", icon: Users },
        { metric: "Cost Per Lead", before: "$85", after: "$36", improvement: "-58%", icon: ArrowDownRight },
        { metric: "Lead Conversion Rate", before: "12%", after: "23%", improvement: "+89%", icon: Target },
        { metric: "Pipeline Value", before: "$1.2M", after: "$5.4M", improvement: "+350%", icon: BarChart3 },
      ],
      "roi-maximization": [
        { metric: "Marketing ROI", before: "1.8x", after: "4.7x", improvement: "+162%", icon: TrendingUp },
        { metric: "Ad Spend Efficiency", before: "35%", after: "92%", improvement: "+162%", icon: ArrowUpRight },
        { metric: "Customer Acquisition Cost", before: "$520", after: "$307", improvement: "-41%", icon: ArrowDownRight },
        { metric: "Revenue Per Marketing $", before: "$1.80", after: "$5.76", improvement: "+220%", icon: BarChart3 },
      ],
      "brand-visibility": [
        { metric: "Brand Search Volume", before: "2.5K", after: "15K", improvement: "+500%", icon: TrendingUp },
        { metric: "Social Following", before: "12K", after: "150K+", improvement: "+1150%", icon: Users },
        { metric: "Media Mentions", before: "3", after: "25+", improvement: "+733%", icon: ArrowUpRight },
        { metric: "Market Share", before: "2%", after: "12%", improvement: "+500%", icon: Target },
      ],
      "conversion-optimization": [
        { metric: "Conversion Rate", before: "1.8%", after: "4.6%", improvement: "+156%", icon: Target },
        { metric: "Cart Abandonment", before: "78%", after: "45%", improvement: "-43%", icon: ArrowDownRight },
        { metric: "Average Order Value", before: "$85", after: "$109", improvement: "+28%", icon: ArrowUpRight },
        { metric: "Revenue Per Visitor", before: "$1.53", after: "$5.01", improvement: "+234%", icon: BarChart3 },
      ],
      "market-expansion": [
        { metric: "Markets Served", before: "2", after: "10", improvement: "+400%", icon: Target },
        { metric: "Customer Base", before: "850", after: "4,400+", improvement: "+420%", icon: Users },
        { metric: "New Market Revenue", before: "$0", after: "65%", improvement: "New", icon: TrendingUp },
        { metric: "Brand Recognition", before: "Regional", after: "National", improvement: "Expanded", icon: ArrowUpRight },
      ],
    };
    return comparisons[impact.slug] || comparisons["revenue-growth"];
  };

  const comparisonData = getComparisonData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${impact.title} - Digital Bull Technology`,
    "description": impact.shortDescription,
    "author": {
      "@type": "Organization",
      "name": "Digital Bull Technology Pvt LTD"
    }
  };

  return (
    <>
      <Helmet>
        <title>{impact.title} | Business Impact | Digital Bull Technology</title>
        <meta name="description" content={impact.shortDescription} />
        <meta property="og:title" content={`${impact.title} | Digital Bull Technology`} />
        <meta property="og:description" content={impact.shortDescription} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://dibull.com/impact/${impact.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section - Enhanced with Particles */}
        <section className={`py-20 lg:py-32 bg-gradient-to-br ${impact.color} relative overflow-hidden`}>
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-white/80 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link to="/#impact" className="hover:text-white transition-colors">Business Impact</Link></li>
                <li>/</li>
                <li className="text-white font-medium">{impact.title}</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left">
                <motion.div 
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring" }}
                >
                  <impact.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {impact.title}
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {impact.fullDescription}
                </p>
                <Button size="lg" variant="secondary" className="group shadow-xl" asChild>
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection direction="right" className="hidden lg:block">
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring" }}
                >
                  <div className="text-center">
                    <div className="text-7xl font-bold text-white mb-2">
                      {statInfo.prefix}
                      <CountUp end={statInfo.value} suffix={statInfo.suffix} duration={2} />
                    </div>
                    <p className="text-xl text-white/80">{impact.statLabel}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Impact Metrics Dashboard */}
        <section className="py-20 bg-background relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                <BarChart3 className="w-4 h-4 mr-2" />
                Impact Dashboard
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Measurable <span className="text-gradient">Transformation</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from our {impact.title.toLowerCase()} strategies
              </p>
            </AnimatedSection>

            {/* Before/After Comparison Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {comparisonData.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg"
                  >
                    <div className={`bg-gradient-to-r ${impact.color} p-4`}>
                      <div className="flex items-center justify-between">
                        <span className="text-white/90 text-sm font-medium">{item.metric}</span>
                        <item.icon className="w-5 h-5 text-white/80" />
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="space-y-4">
                        {/* Before */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Before</span>
                          <span className="text-lg font-semibold text-muted-foreground">{item.before}</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative">
                          <Progress value={100} className="h-2 bg-muted" />
                          <motion.div 
                            className={`absolute inset-0 h-2 rounded-full bg-gradient-to-r ${impact.color}`}
                            initial={{ width: "20%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
                          />
                        </div>
                        
                        {/* After */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">After</span>
                          <span className="text-lg font-bold text-foreground">{item.after}</span>
                        </div>
                        
                        {/* Improvement Badge */}
                        <div className="pt-2 border-t border-border">
                          <Badge className={`${item.improvement.startsWith('-') || item.improvement === 'New' || item.improvement === 'Expanded' ? 'bg-green-500/10 text-green-600' : 'bg-primary/10 text-primary'} font-bold`}>
                            {item.improvement.startsWith('+') || item.improvement.startsWith('-') ? (
                              <>
                                {item.improvement.startsWith('-') ? <ArrowDownRight className="w-3 h-3 mr-1" /> : <ArrowUpRight className="w-3 h-3 mr-1" />}
                                {item.improvement}
                              </>
                            ) : (
                              <>{item.improvement}</>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Key Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What You'll <span className="text-gradient">Achieve</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {impact.benefits.map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all shadow-sm"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${impact.color} flex items-center justify-center flex-shrink-0`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-foreground font-medium">{benefit}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How We <span className="text-gradient">Deliver Results</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {impact.process.map((step, index) => (
                <AnimatedSection key={step.step} delay={index * 0.15}>
                  <motion.div 
                    className="relative text-center"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${impact.color} flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.step}
                    </motion.div>
                    {index < impact.process.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                    )}
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Section - Enhanced */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-4xl mx-auto">
              <Card className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl">
                <div className={`bg-gradient-to-r ${impact.color} p-6`}>
                  <div className="flex items-center gap-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                    <div>
                      <span className="text-sm text-white/80 uppercase tracking-wide">Success Story</span>
                      <h3 className="text-2xl font-bold text-white">{impact.caseStudy.company}</h3>
                    </div>
                    <Badge className="ml-auto bg-white/20 text-white border-white/30">
                      {impact.caseStudy.industry}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="p-5 bg-muted/50 rounded-xl">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Challenge
                      </h4>
                      <p className="text-muted-foreground">{impact.caseStudy.challenge}</p>
                    </div>
                    <div className="p-5 bg-primary/5 rounded-xl">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Solution
                      </h4>
                      <p className="text-muted-foreground">{impact.caseStudy.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Results Achieved</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {impact.caseStudy.results.map((result, index) => (
                        <motion.div 
                          key={index} 
                          className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${impact.color} bg-opacity-10`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground font-medium">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className={`py-20 bg-gradient-to-br ${impact.color}`}>
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                <Quote className="w-16 h-16 text-white/30 mx-auto mb-8" />
              </motion.div>
              <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                "{impact.testimonial.quote}"
              </blockquote>
              <div>
                <p className="text-white font-bold text-lg">{impact.testimonial.author}</p>
                <p className="text-white/80">{impact.testimonial.role}</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Achieve Similar Results?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's discuss how we can help you achieve your {impact.title.toLowerCase()} goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <Link to="/contact">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Other Impacts */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Explore Other Impact Areas</h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {businessImpactData
                .filter(item => item.slug !== impact.slug)
                .slice(0, 3)
                .map((item, index) => (
                  <AnimatedSection key={item.id} delay={index * 0.1}>
                    <Link
                      to={`/impact/${item.slug}`}
                      className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all group shadow-sm hover:shadow-lg"
                    >
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.stat} {item.statLabel}</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ImpactDetailPage;
