import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Clock, Users, Target, TrendingUp, BarChart, Award } from "lucide-react";
import { caseStudiesData } from "@/data/caseStudiesData";
import AnimatedSection from "@/components/AnimatedSection";
import NotFound from "@/pages/NotFound";

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudiesData.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return <NotFound />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": caseStudy.description,
    "publisher": {
      "@type": "Organization",
      "name": "Digital Bull Technology",
      "logo": "https://dibull.com/dibull_logo.png"
    }
  };

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Case Study | Digital Bull Technology</title>
        <meta name="description" content={caseStudy.description} />
        <meta name="keywords" content={`${caseStudy.client}, ${caseStudy.category}, case study, digital marketing, ${caseStudy.services.join(", ")}`} />
        <link rel="canonical" href={`https://dibull.com/case-studies/${caseStudy.slug}`} />
        <meta property="og:title" content={`${caseStudy.title} | Digital Bull Technology`} />
        <meta property="og:description" content={caseStudy.description} />
        <meta property="og:image" content={caseStudy.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <Link to="/case-studies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Link>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {caseStudy.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {caseStudy.timeline}
                    </span>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {caseStudy.title}
                  </h1>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <p className="text-lg text-muted-foreground mb-6">
                    {caseStudy.fullDescription}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <caseStudy.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{caseStudy.client}</h2>
                      <p className="text-muted-foreground">{caseStudy.category}</p>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.25}>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.services.map((service) => (
                      <span key={service} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-8">
              {caseStudy.stats.map((stat, i) => (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <div className="text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
                    <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                    <div className="text-primary-foreground/80">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection>
                <div className="bg-card rounded-3xl p-8 border border-border h-full">
                  <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                  <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="bg-card rounded-3xl p-8 border border-border h-full">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                  <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A structured approach to delivering exceptional results
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.process.map((phase, i) => (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <div className="bg-card rounded-2xl p-6 border border-border h-full relative">
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {phase.phase}
                    </div>
                    <h3 className="text-lg font-bold mt-4 mb-2">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Before & After Metrics */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The <span className="text-gradient">Transformation</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comparing key metrics before and after our engagement
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedSection>
                <div className="bg-card rounded-3xl p-8 border border-red-500/30">
                  <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    <BarChart className="w-5 h-5 text-red-500" />
                    Before
                  </h3>
                  <div className="space-y-4">
                    {caseStudy.metrics.before.map((metric, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="font-bold text-foreground">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="bg-card rounded-3xl p-8 border border-green-500/30">
                  <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    After
                  </h3>
                  <div className="space-y-4">
                    {caseStudy.metrics.after.map((metric, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="font-bold text-green-600">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Results</h2>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {caseStudy.results.map((result, i) => (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <div className="flex items-start gap-4 bg-card p-6 rounded-2xl border border-border">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{result}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 relative border border-primary/20">
                <Quote className="w-12 h-12 text-primary/30 absolute top-8 right-8" />
                <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-foreground">
                      {caseStudy.testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{caseStudy.testimonial.author}</div>
                    <div className="text-muted-foreground">{caseStudy.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Achieve Similar Results?
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Let's discuss how we can help your business grow with our proven strategies.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/case-studies">
                    View More Case Studies
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

export default CaseStudyDetailPage;
