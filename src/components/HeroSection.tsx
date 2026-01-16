import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Star, Users, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

const clients = [
  { name: "HireForJob", logo: "H" },
  { name: "Cadbull", logo: "C" },
  { name: "CastingScreen", logo: "CS" },
  { name: "Shuttech", logo: "S" },
  { name: "GiftCity", logo: "G" },
];

const features = [
  "SEO & Content Marketing",
  "PPC & Social Ads",
  "Web Design & Development",
  "AI-Powered Marketing",
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 animate-fade-up">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">Rated #1 Digital Agency in India</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Scale Your Business with{" "}
              <span className="relative">
                <span className="text-gradient">Data-Driven</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                </svg>
              </span>{" "}
              Marketing
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              We help ambitious businesses increase revenue, generate qualified leads, and
              dominate their market through strategic digital marketing solutions.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" className="group text-base px-8" asChild>
                <Link to="/contact">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group text-base" asChild>
                <Link to="/case-studies">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  View Success Stories
                </Link>
              </Button>
            </div>

            {/* Client Logos */}
            <div className="pt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-sm text-muted-foreground mb-4">Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                {clients.map((client) => (
                  <div
                    key={client.name}
                    className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-sm font-bold text-primary hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                    title={client.name}
                  >
                    {client.logo}
                  </div>
                ))}
                <span className="text-sm text-muted-foreground">+500 more</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Dashboard */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-card rounded-3xl border border-border shadow-2xl p-8 animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Marketing Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Real-time analytics</p>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Traffic</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">+247%</div>
                    <div className="text-xs text-green-600 mt-1">↑ 12% vs last month</div>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-accent" />
                      <span className="text-xs text-muted-foreground">Leads</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">10.2M</div>
                    <div className="text-xs text-green-600 mt-1">↑ 8% vs last month</div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 bg-muted/50 rounded-xl flex items-end justify-between px-4 pb-4 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-sm transition-all duration-300 hover:from-accent hover:to-accent/50"
                      style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">$12M+</div>
                    <div className="text-xs text-muted-foreground">Revenue Generated</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">4.9/5</div>
                    <div className="text-xs text-muted-foreground">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
