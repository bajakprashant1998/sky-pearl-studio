import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, CheckCircle2, Quote, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { getImpactBySlug, businessImpactData } from "@/data/businessImpactData";
import NotFound from "@/pages/NotFound";

const ImpactDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const impact = getImpactBySlug(slug || "");

  if (!impact) {
    return <NotFound />;
  }

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
        {/* Hero Section */}
        <section className={`py-20 lg:py-32 bg-gradient-to-br ${impact.color} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
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
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <impact.icon className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {impact.title}
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {impact.fullDescription}
                </p>
                <Button size="lg" variant="secondary" className="group" asChild>
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection direction="right" className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="text-7xl font-bold text-white mb-2">{impact.stat}</div>
                    <p className="text-xl text-white/80">{impact.statLabel}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
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
                  <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover-lift">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${impact.color} flex items-center justify-center flex-shrink-0`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-foreground font-medium">{benefit}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
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
                  <div className="relative text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${impact.color} flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white`}>
                      {step.step}
                    </div>
                    {index < impact.process.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                    )}
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border">
                <div className="flex items-center gap-4 mb-8">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div>
                    <span className="text-sm text-muted-foreground uppercase tracking-wide">Case Study</span>
                    <h3 className="text-2xl font-bold">{impact.caseStudy.company}</h3>
                  </div>
                  <span className="ml-auto px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                    {impact.caseStudy.industry}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{impact.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-muted-foreground">{impact.caseStudy.solution}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Results</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {impact.caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className={`py-20 bg-gradient-to-br ${impact.color}`}>
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <Quote className="w-16 h-16 text-white/30 mx-auto mb-8" />
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
                      className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover-lift group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
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
