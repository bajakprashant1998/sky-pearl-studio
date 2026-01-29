import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AnimatedSection, { FloatingElement } from "@/components/AnimatedSection";
import { getAcademyBenefitBySlug, academyBenefitsData } from "@/data/academyBenefitsData";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Phone,
  Mail,
  Star
} from "lucide-react";

const AcademyBenefitDetailPage = () => {
  const { benefitSlug } = useParams<{ benefitSlug: string }>();
  const benefit = benefitSlug ? getAcademyBenefitBySlug(benefitSlug) : undefined;

  if (!benefit) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Benefit Not Found</h1>
            <Button asChild>
              <Link to="/digital-marketing-academy">Back to Academy</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const IconComponent = benefit.icon;

  return (
    <>
      <Helmet>
        <title>{benefit.fullTitle} | Digital Marketing Academy Ahmedabad</title>
        <meta
          name="description"
          content={`${benefit.description} Join the best digital marketing academy in Ahmedabad for practical, career-focused training.`}
        />
        <meta
          name="keywords"
          content="digital marketing ahmedabad, digital marketing agency ahmedabad, digital marketing company in ahmedabad, marketing agency in ahmedabad, social media marketing agency in ahmedabad, digital marketing academy, digital marketing course ahmedabad"
        />
        <link rel="canonical" href={`https://dibull.com/digital-marketing-academy/benefit/${benefit.slug}`} />
        <meta property="og:title" content={`${benefit.fullTitle} | Digital Marketing Academy`} />
        <meta property="og:description" content={benefit.description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <FloatingElement duration={4} distance={20}>
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          </FloatingElement>
          <FloatingElement duration={5} distance={15}>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          </FloatingElement>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection delay={0}>
              <Link
                to="/digital-marketing-academy"
                className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Academy
              </Link>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <AnimatedSection delay={0.1}>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${benefit.gradient} rounded-full`}>
                    <IconComponent className="w-5 h-5 text-white" />
                    <span className="text-sm font-semibold text-white">Why Choose Us</span>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {benefit.fullTitle.split(' ').slice(0, -2).join(' ')}{' '}
                    <span className="text-gradient">
                      {benefit.fullTitle.split(' ').slice(-2).join(' ')}
                    </span>
                  </h1>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/contact">
                        Enroll Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="tel:+919824011921">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Us
                      </a>
                    </Button>
                  </div>
                </AnimatedSection>
              </div>

              {/* Stats Cards */}
              <AnimatedSection delay={0.3} direction="right">
                <div className="grid grid-cols-2 gap-4">
                  {benefit.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-center group"
                    >
                      <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                What's Included
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Features & <span className="text-gradient">Benefits</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefit.features.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full group">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">{feature}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {benefit.details.map((detail, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3">{detail.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{detail.content}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Other Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Explore Other <span className="text-gradient">Benefits</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {academyBenefitsData
                .filter(b => b.slug !== benefit.slug)
                .slice(0, 4)
                .map((otherBenefit, index) => {
                  const OtherIcon = otherBenefit.icon;
                  return (
                    <AnimatedSection key={otherBenefit.id} delay={index * 0.05}>
                      <Link to={`/digital-marketing-academy/benefit/${otherBenefit.slug}`}>
                        <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full group">
                          <div className={`w-12 h-12 bg-gradient-to-br ${otherBenefit.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <OtherIcon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                            {otherBenefit.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {otherBenefit.shortDesc}
                          </p>
                        </div>
                      </Link>
                    </AnimatedSection>
                  );
                })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <GraduationCap className="w-16 h-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Digital Marketing Career?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join Digital Marketing Academy and experience {benefit.title.toLowerCase()} along with all other benefits. Limited seats available!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Enroll Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <a href="mailto:info@dibull.com">
                    <Mail className="w-5 h-5 mr-2" />
                    info@dibull.com
                  </a>
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

export default AcademyBenefitDetailPage;
