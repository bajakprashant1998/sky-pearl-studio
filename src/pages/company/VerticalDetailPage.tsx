import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getVerticalBySlug, livePlatforms } from "@/data/verticalsData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Users, 
  Target,
  Sparkles,
  Globe,
  Layers,
  ChevronRight
} from "lucide-react";

const VerticalDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const platform = getVerticalBySlug(slug || "");

  if (!platform) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Platform Not Found</h1>
            <p className="text-muted-foreground mb-8">The platform you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/our-verticals">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Verticals
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const otherPlatforms = livePlatforms.filter(p => p.id !== platform.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{platform.name} - {platform.tagline} | Digital Bull Technology</title>
        <meta 
          name="description" 
          content={platform.description} 
        />
        <meta name="keywords" content={`${platform.name}, ${platform.tagline}, Digital Bull, ${platform.targetAudience.join(', ')}`} />
        <link rel="canonical" href={`https://dibull.com/our-verticals/${platform.id}`} />
        <meta property="og:title" content={`${platform.name} - ${platform.tagline}`} />
        <meta property="og:description" content={platform.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className={`relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br ${platform.color}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

        <div className="container px-4 py-20 relative z-10">
          {/* Breadcrumb */}
          <AnimatedSection direction="up">
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/our-verticals" className="hover:text-white transition-colors">Our Verticals</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{platform.name}</span>
            </nav>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <Badge className="bg-white/20 text-white border-0 mb-4">
                LIVE PLATFORM
              </Badge>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <platform.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{platform.name}</h1>
                  <p className="text-xl text-white/90">{platform.tagline}</p>
                </div>
              </div>

              <p className="text-lg text-white/90 leading-relaxed mb-8">
                {platform.fullDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-foreground hover:bg-white/90 shadow-xl">
                    Visit {platform.name}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10">
                    Partner With Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {platform.stats.map((stat, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-sm text-white/80">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Platform Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What {platform.name} Offers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive features designed to serve our users with excellence
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platform.features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center flex-shrink-0`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-foreground font-medium">{feature}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Target Audience & Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Target Audience */}
            <AnimatedSection direction="left">
              <Card className="h-full border-2">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Who It's For</h3>
                  </div>
                  <div className="space-y-4">
                    {platform.targetAudience.map((audience, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="font-medium">{audience}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Key Benefits */}
            <AnimatedSection direction="right">
              <Card className="h-full border-2">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Key Benefits</h3>
                  </div>
                  <div className="space-y-4">
                    {platform.keyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg border">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0`} style={{ color: `hsl(var(--primary))` }} />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-br ${platform.color}`}>
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Explore {platform.name}?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of users who are already benefiting from our platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-foreground hover:bg-white/90 shadow-xl">
                    <Globe className="w-5 h-5 mr-2" />
                    Visit {platform.website}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10">
                    <Layers className="w-5 h-5 mr-2" />
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Other Platforms */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Other Platforms</h2>
              <p className="text-muted-foreground">Discover more from our ecosystem</p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {otherPlatforms.map((otherPlatform, index) => (
              <StaggerItem key={index}>
                <Link to={`/our-verticals/${otherPlatform.id}`}>
                  <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 group overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`bg-gradient-to-br ${otherPlatform.color} p-6`}>
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <otherPlatform.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{otherPlatform.name}</h3>
                        <p className="text-white/80">{otherPlatform.tagline}</p>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground text-sm line-clamp-2">{otherPlatform.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-primary font-medium">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/our-verticals">
                View All Platforms
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default VerticalDetailPage;
