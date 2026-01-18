import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { getUpcomingPlatformBySlug, upcomingPlatforms } from "@/data/upcomingVerticalsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight,
  Clock,
  Rocket,
  Target,
  Users,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Bell
} from "lucide-react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const UpcomingVerticalDetailPage = () => {
  const { slug } = useParams();
  const platform = getUpcomingPlatformBySlug(slug || "");
  const [countdown, setCountdown] = useState<CountdownValues>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!platform) return;

    const calculateCountdown = () => {
      const launchDate = new Date(platform.launchDate).getTime();
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [platform]);

  if (!platform) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Platform not found</h1>
            <Link to="/our-verticals" className="text-primary hover:underline">
              Back to Our Verticals
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const otherPlatforms = upcomingPlatforms.filter(p => p.id !== platform.id).slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <Helmet>
        <title>{platform.name} - Coming Soon | Digital Bull Technology</title>
        <meta 
          name="description" 
          content={`${platform.name} - ${platform.tagline}. ${platform.description} Launching soon by Digital Bull Technology.`} 
        />
        <meta name="keywords" content={`${platform.name}, ${platform.tagline}, Digital Bull Technology, coming soon, ${platform.targetMarket.join(', ')}`} />
        <link rel="canonical" href={`https://dibull.com/our-verticals/upcoming/${platform.id}`} />
        <meta property="og:title" content={`${platform.name} - Coming Soon | Digital Bull Technology`} />
        <meta property="og:description" content={platform.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Hero Section with Countdown */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-10`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-br ${platform.color} rounded-full blur-3xl opacity-20 animate-pulse`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br ${platform.color} rounded-full blur-3xl opacity-15 animate-pulse`} style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative z-10 px-4 py-20">
          <AnimatedSection direction="up">
            <div className="text-center max-w-4xl mx-auto">
              {/* Back Link */}
              <Link 
                to="/our-verticals" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Verticals
              </Link>

              {/* Coming Soon Badge */}
              <div className="flex justify-center mb-6">
                <Badge className={`px-4 py-2 text-sm bg-gradient-to-r ${platform.color} text-white border-0`}>
                  <Rocket className="w-4 h-4 mr-2" />
                  Coming Soon
                </Badge>
              </div>

              {/* Platform Icon */}
              <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${platform.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                <platform.icon className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-4">{platform.name}</h1>
              <p className="text-xl md:text-2xl text-primary font-medium mb-6">{platform.tagline}</p>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">{platform.description}</p>

              {/* Countdown Timer */}
              <div className="bg-card/80 backdrop-blur-lg border border-border rounded-3xl p-8 mb-10 shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Launch Countdown</span>
                </div>
                <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.minutes, label: "Minutes" },
                    { value: countdown.seconds, label: "Seconds" }
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-br ${platform.color} bg-clip-text text-transparent`}>
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notify Me Form */}
              <div className="max-w-md mx-auto">
                {subscribed ? (
                  <div className="bg-primary/10 text-primary border border-primary/30 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-medium">Thank you! We'll notify you when {platform.name} launches.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                    <Button type="submit" className={`bg-gradient-to-r ${platform.color} hover:opacity-90`}>
                      <Bell className="w-4 h-4 mr-2" />
                      Notify Me
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Our Vision</span>
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed italic">
                "{platform.visionStatement}"
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  About {platform.name}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  What We're Building
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {platform.fullDescription}
                </p>
                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Problem We're Solving
                  </h3>
                  <p className="text-muted-foreground">{platform.problemSolving}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <Card className="border-2 overflow-hidden">
                <div className={`bg-gradient-to-br ${platform.color} p-8`}>
                  <h3 className="text-2xl font-bold text-white mb-4">What Makes Us Unique</h3>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {platform.uniqueValue.map((value, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-foreground font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Planned Features */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Planned Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What to Expect
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're building a comprehensive platform with these exciting features
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platform.plannedFeatures.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}>
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">{feature}</h3>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Target Market */}
      <section className="py-20">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Users className="w-4 h-4 mr-2" />
                Target Audience
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Who Is This For?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {platform.name} is designed for these communities and professionals
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {platform.targetMarket.map((audience, index) => (
              <StaggerItem key={index}>
                <Badge 
                  variant="secondary" 
                  className="text-base px-6 py-3 bg-card border border-border hover:border-primary/50 transition-colors cursor-default"
                >
                  {audience}
                </Badge>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-br ${platform.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container px-4 relative z-10">
          <AnimatedSection direction="up">
            <div className="text-center max-w-3xl mx-auto text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Be the First to Know
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join our waiting list and get exclusive early access when {platform.name} launches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-white/90 px-8">
                    Partner With Us
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                    Visit Website
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Other Upcoming Platforms */}
      <section className="py-20">
        <div className="container px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                More Upcoming Platforms
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore other exciting platforms we're building
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {otherPlatforms.map((p) => (
              <StaggerItem key={p.id}>
                <Link to={`/our-verticals/upcoming/${p.id}`}>
                  <Card className="h-full hover:border-primary/50 hover:-translate-y-1 transition-all">
                    <CardContent className="p-0">
                      <div className={`bg-gradient-to-br ${p.color} p-6 opacity-90`}>
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                          <p.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{p.name}</h3>
                        <p className="text-white/80 text-sm">{p.tagline}</p>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{p.description}</p>
                        <span className="text-primary font-medium text-sm flex items-center gap-1">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default UpcomingVerticalDetailPage;
