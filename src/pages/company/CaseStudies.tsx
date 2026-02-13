import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Building2, MonitorSmartphone, Target, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudiesData } from "@/data/caseStudiesData";
import AnimatedSection from "@/components/AnimatedSection";

const CaseStudies = () => {
  return (
    <>
      <Helmet>
        <title>Case Studies | Client Success Stories | Digital Bull Technology</title>
        <meta
          name="description"
          content="Explore our case studies showcasing how Digital Bull Technology helped HireForJob, Cadbull, CastingScreen, and other industry leaders achieve massive growth through SEO, PPC, and digital marketing strategies."
        />
        <meta
          name="keywords"
          content="case studies, digital marketing success stories, SEO case study, PPC results, client success, HireForJob, Cadbull, CastingScreen, marketing ROI"
        />
        <link rel="canonical" href="https://dibull.com/case-studies" />
        <meta property="og:title" content="Case Studies | Digital Bull Technology Success Stories" />
        <meta property="og:description" content="See how we've helped industry leaders achieve 450%+ traffic growth, 1M+ app installs, and 3.5x revenue increases." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dibull.com/case-studies" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Case Studies | Digital Bull Technology Success Stories" />
        <meta name="twitter:description" content="See how we've helped industry leaders achieve 450%+ traffic growth and 3.5x revenue increases." />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-6">
                Our Portfolio
              </span>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Driving Growth for <span className="text-gradient">Industry Leaders</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                From global platforms like Cadbull to local powerhouses like Gift City Properties, 
                we deliver measurable results that transform businesses.
              </p>
            </AnimatedSection>

            {/* Stats Overview */}
            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="w-px h-16 bg-border hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">$50M+</div>
                  <div className="text-sm text-muted-foreground">Revenue Generated</div>
                </div>
                <div className="w-px h-16 bg-border hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudiesData.map((study, index) => (
                <AnimatedSection key={study.id} delay={0.1 + index * 0.1}>
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-primary border border-primary/20">
                        {study.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 text-muted-foreground text-sm font-medium">
                        <study.icon className="w-4 h-4 text-primary" />
                        <span className="uppercase tracking-wide text-xs">{study.client}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {study.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                        {study.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 py-4 border-t border-border mb-4">
                        {study.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-lg font-bold text-primary">{stat.value}</div>
                            <div className="text-[10px] text-muted-foreground leading-tight">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{study.timeline}</span>
                        <span className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          View Case Study
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Industries We <span className="text-gradient">Transform</span>
                </h2>
                <p className="text-muted-foreground">
                  Our expertise spans across multiple industries, delivering customized solutions for unique challenges.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Users, name: "Recruitment" },
                { icon: Building2, name: "Architecture" },
                { icon: MonitorSmartphone, name: "Mobile Apps" },
                { icon: Globe, name: "Tech & Media" },
                { icon: Target, name: "Real Estate" },
                { icon: TrendingUp, name: "E-commerce" },
              ].map((industry, i) => (
                <AnimatedSection key={industry.name} delay={0.1 + i * 0.05}>
                  <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/50 hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <industry.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{industry.name}</h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000')] opacity-10 bg-cover bg-center" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Be Our Next Success Story
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Join HireForJob, Cadbull, and other industry leaders who chose Digital Bull Technology 
                to transform their digital presence.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Button size="lg" variant="secondary" className="text-base" asChild>
                <Link to="/contact">
                  Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
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

export default CaseStudies;
