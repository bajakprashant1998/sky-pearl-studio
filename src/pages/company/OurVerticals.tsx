import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Globe, 
  Rocket, 
  ExternalLink, 
  Building2, 
  Cpu, 
  Film, 
  HardHat, 
  TrendingUp, 
  Home as HomeIcon,
  Briefcase,
  Star,
  ShoppingBag,
  Gamepad2,
  Pill,
  Palette,
  Clapperboard,
  FileArchive,
  ArrowRight,
  Sparkles,
  Layers,
  Target,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const livePlatforms = [
  {
    name: "Cadbull",
    tagline: "World's Largest AutoCAD Library",
    website: "www.cadbull.com",
    url: "https://www.cadbull.com",
    description: "Global hub for architects, civil engineers, and interior designers offering millions of professional AutoCAD DWG drawings including architectural plans, structural details, interiors, landscape, and 3D resources.",
    icon: Building2,
    color: "from-blue-600 to-blue-400"
  },
  {
    name: "Shuttech",
    tagline: "Technology Information Hub",
    website: "www.shuttech.com",
    url: "https://www.shuttech.com",
    description: "A modern technology portal delivering news, tutorials, software reviews, and insights on AI, web, apps, and emerging digital trends.",
    icon: Cpu,
    color: "from-purple-600 to-purple-400"
  },
  {
    name: "CastingScreen",
    tagline: "Talent Management Platform",
    website: "www.castingscreen.com",
    url: "https://www.castingscreen.com",
    description: "A professional ecosystem for talent discovery featuring artist profiles, casting opportunities, and networking for the entertainment and creative industries.",
    icon: Film,
    color: "from-pink-600 to-pink-400"
  },
  {
    name: "CivilEngi",
    tagline: "Civil Engineering Technology",
    website: "www.civilengi.com",
    url: "https://www.civilengi.com",
    description: "A dedicated knowledge base for civil engineers and construction professionals with technical articles, methods, innovations, and industry updates.",
    icon: HardHat,
    color: "from-orange-600 to-orange-400"
  },
  {
    name: "DiBull",
    tagline: "Digital Marketing, Development & Coaching",
    website: "www.dibull.com",
    url: "https://www.dibull.com",
    description: "A growth-driven platform providing digital marketing services, website and app development, and business & career coaching.",
    icon: TrendingUp,
    color: "from-primary to-blue-400"
  },
  {
    name: "Gift City Property",
    tagline: "Real Estate Listing Portal",
    website: "www.giftcityproperty.com",
    url: "https://www.giftcityproperty.com",
    description: "A specialized real estate platform for GIFT City featuring commercial and residential property listings, projects, and investor-focused insights.",
    icon: HomeIcon,
    color: "from-emerald-600 to-emerald-400"
  }
];

const upcomingPlatforms = [
  {
    name: "HireForJob",
    tagline: "Global Job Portal",
    website: "www.hireforjob.com",
    url: "https://www.hireforjob.com",
    description: "A next-generation recruitment platform connecting global talent with employers across industries.",
    icon: Briefcase,
    color: "from-indigo-500 to-indigo-300"
  },
  {
    name: "KundliChart",
    tagline: "Astrology Portal",
    website: "www.kundlichart.com",
    url: "https://www.kundlichart.com",
    description: "An advanced astrology platform offering personalized kundli charts, predictions, and life insights.",
    icon: Star,
    color: "from-amber-500 to-amber-300"
  },
  {
    name: "MakeOnIndia",
    tagline: "Marketplace & E-Commerce",
    website: "www.makeonindia.com",
    url: "https://www.makeonindia.com",
    description: "A 'Make in India' driven marketplace empowering Indian brands, manufacturers, and entrepreneurs.",
    icon: ShoppingBag,
    color: "from-orange-500 to-orange-300"
  },
  {
    name: "GameToxic",
    tagline: "Gaming Development Platform",
    website: "www.gametoxic.com",
    url: "https://www.gametoxic.com",
    description: "A future-ready gaming ecosystem for players, developers, and esports communities.",
    icon: Gamepad2,
    color: "from-red-500 to-red-300"
  },
  {
    name: "DrugsEffect",
    tagline: "Medicine Directory",
    website: "www.drugseffect.com",
    url: "https://www.drugseffect.com",
    description: "A comprehensive healthcare and medicine information portal for users and professionals.",
    icon: Pill,
    color: "from-teal-500 to-teal-300"
  },
  {
    name: "YourDesignStory",
    tagline: "Artist & Creative Portal",
    website: "www.yourdesignstory.com",
    url: "https://www.yourdesignstory.com",
    description: "A digital stage for artists, designers, and creative professionals to showcase and grow.",
    icon: Palette,
    color: "from-fuchsia-500 to-fuchsia-300"
  },
  {
    name: "HindiFilmCinema",
    tagline: "Hindi Film Industry Portal",
    website: "www.hindifilmcinema.com",
    url: "https://www.hindifilmcinema.com",
    description: "A complete Bollywood hub with film news, reviews, trailers, interviews, and industry articles.",
    icon: Clapperboard,
    color: "from-rose-500 to-rose-300"
  },
  {
    name: "FilesBundle",
    tagline: "Digital Files Marketplace",
    website: "www.filesbundle.com",
    url: "https://www.filesbundle.com",
    description: "A marketplace for listing, selling, and downloading digital assets like templates, design files, and tools.",
    icon: FileArchive,
    color: "from-cyan-500 to-cyan-300"
  }
];

const OurVerticals = () => {
  return (
    <>
      <Helmet>
        <title>Our Verticals | Digital Bull Technology - Global Digital Ecosystems</title>
        <meta 
          name="description" 
          content="Explore Digital Bull Technology's diverse portfolio of industry-leading digital platforms across architecture, engineering, technology, real estate, entertainment, and more." 
        />
        <meta 
          name="keywords" 
          content="digital platforms, technology verticals, CAD library, job portal, real estate, gaming, healthcare, creative platforms, Digital Bull" 
        />
        <link rel="canonical" href="https://dibull.com/our-verticals" />
        <meta property="og:title" content="Our Verticals | Digital Bull Technology" />
        <meta property="og:description" content="Building world-class digital platforms across industries." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-900/20" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl" />

        {/* Globe Network Visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Globe className="w-[500px] h-[500px] text-primary animate-spin" style={{ animationDuration: '60s' }} />
        </div>

        <div className="container relative z-10 px-4 py-20">
          <AnimatedSection direction="up">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/50">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Powering Global Industries
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Our Verticals
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
                Building world-class digital platforms across industries.
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Digital Bull Technology Pvt. Ltd. creates powerful niche-based platforms across architecture, 
                engineering, technology, real estate, marketing, gaming, healthcare, entertainment, and employment. 
                Each vertical is designed to solve real-world industry challenges and empower global communities 
                through innovation and scalable technology.
              </p>

              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-primary/25"
                onClick={() => document.getElementById('live-platforms')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Our Ecosystem
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Live Platforms Section */}
      <section id="live-platforms" className="py-24 bg-background relative">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full mb-4">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Live & Operational</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                🌍 Live Platforms
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our portfolio of active platforms serving millions of users globally
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livePlatforms.map((platform, index) => (
              <StaggerItem key={index}>
                <a 
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="h-full border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 group overflow-hidden">
                    <CardContent className="p-0">
                      {/* Header with Gradient */}
                      <div className={`bg-gradient-to-br ${platform.color} p-6 relative overflow-hidden`}>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 font-bold">
                            LIVE
                          </Badge>
                        </div>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <platform.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{platform.name}</h3>
                        <p className="text-white/90 font-medium">{platform.tagline}</p>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {platform.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-medium text-sm">{platform.website}</span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Upcoming Platforms Section */}
      <section className="py-24 bg-muted/30 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--muted-foreground)/0.1) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="container px-4 relative">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full mb-4">
                <Rocket className="w-5 h-5" />
                <span className="font-semibold">Coming Soon</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                🚀 Upcoming Platforms
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Innovative platforms in development, launching soon to transform industries
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingPlatforms.map((platform, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group overflow-hidden bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {/* Header with Gradient */}
                    <div className={`bg-gradient-to-br ${platform.color} p-5 relative overflow-hidden opacity-90`}>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90 text-muted-foreground border-0 font-semibold text-xs">
                          UPCOMING
                        </Badge>
                      </div>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <platform.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-0.5">{platform.name}</h3>
                      <p className="text-white/80 text-sm font-medium">{platform.tagline}</p>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
                        {platform.description}
                      </p>
                      <span className="text-primary/70 font-medium text-sm">{platform.website}</span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-primary/90 to-blue-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border border-white/30 rounded-full animate-pulse" />
            <div className="absolute bottom-20 right-20 w-60 h-60 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="container px-4 relative z-10">
          <AnimatedSection direction="up">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Our Mission</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Our Vision
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 font-light">
                To build world-class digital ecosystems that empower professionals, creators, and businesses 
                across industries—through innovation, technology, and scalable platforms shaping the future 
                of the digital world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="group bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-2xl"
                  >
                    <Layers className="w-5 h-5 mr-2" />
                    Partner With Us
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-2 border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                  onClick={() => document.getElementById('live-platforms')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Our Platforms
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OurVerticals;
