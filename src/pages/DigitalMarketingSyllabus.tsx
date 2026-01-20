import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AnimatedSection, { FloatingElement } from "@/components/AnimatedSection";
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  IndianRupee,
  BookOpen,
  ArrowRight,
  Globe,
  Laptop,
  Search,
  FileText,
  Share2,
  MousePointerClick,
  MessageSquare,
  BarChart3,
  Shield,
  Palette,
  Film,
  Brain,
  Target,
  Sparkles,
  Code,
  TrendingUp,
  Mail,
  Phone,
  Megaphone,
  Star,
  Zap,
  Users,
  Award,
  PieChart,
  LineChart,
  Database,
  Layers
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DigitalMarketingSyllabus = () => {
  const syllabusModules = [
    {
      month: "Month 1-2",
      title: "Digital Marketing Foundations",
      color: "from-blue-500 to-cyan-500",
      icon: Globe,
      modules: [
        {
          title: "Introduction to Digital Marketing",
          icon: Globe,
          topics: [
            "Digital marketing ecosystem overview",
            "Traditional vs digital marketing",
            "Online consumer behavior & psychology",
            "Customer journey mapping",
            "Digital branding fundamentals",
            "Setting SMART marketing goals",
            "Industry overview & career paths"
          ],
          hours: "20 Hours"
        },
        {
          title: "Website & Landing Page Fundamentals",
          icon: Laptop,
          topics: [
            "How websites work (domain, hosting, DNS)",
            "Content Management Systems (CMS)",
            "WordPress fundamentals",
            "Website structure & navigation",
            "User Experience (UX) basics",
            "Landing page design principles",
            "A/B testing fundamentals",
            "Lead generation strategies"
          ],
          hours: "30 Hours"
        },
        {
          title: "Search Engine Optimization (SEO)",
          icon: Search,
          topics: [
            "How search engines work",
            "Keyword research methodology",
            "On-page SEO optimization",
            "Meta tags & descriptions",
            "Content optimization",
            "Image SEO & alt tags",
            "Internal linking strategies",
            "URL structure optimization"
          ],
          hours: "40 Hours"
        }
      ]
    },
    {
      month: "Month 3-4",
      title: "Advanced Marketing Strategies",
      color: "from-purple-500 to-pink-500",
      icon: TrendingUp,
      modules: [
        {
          title: "Advanced SEO & Technical SEO",
          icon: Code,
          topics: [
            "Technical SEO audits",
            "Site speed optimization",
            "Mobile-first indexing",
            "Schema markup & structured data",
            "XML sitemaps & robots.txt",
            "Off-page SEO strategies",
            "Link building techniques",
            "Local SEO & Google Business Profile",
            "SEO tools mastery (SEMrush, Ahrefs)"
          ],
          hours: "35 Hours"
        },
        {
          title: "Content Marketing",
          icon: FileText,
          topics: [
            "Content strategy development",
            "SEO content writing",
            "Blog post creation",
            "Content pillars & clusters",
            "Copywriting fundamentals",
            "Headline writing techniques",
            "Content calendar planning",
            "Content repurposing strategies"
          ],
          hours: "25 Hours"
        },
        {
          title: "Social Media Marketing",
          icon: Share2,
          topics: [
            "Social media strategy",
            "Platform-specific strategies",
            "Instagram marketing mastery",
            "Facebook marketing",
            "LinkedIn B2B strategies",
            "Content creation for social",
            "Community management",
            "Influencer marketing basics",
            "Social media tools & scheduling"
          ],
          hours: "40 Hours"
        }
      ]
    },
    {
      month: "Month 5",
      title: "Paid Advertising & Performance",
      color: "from-orange-500 to-red-500",
      icon: Target,
      modules: [
        {
          title: "Google Ads Mastery",
          icon: MousePointerClick,
          topics: [
            "Google Ads account structure",
            "Search campaigns setup",
            "Display advertising",
            "YouTube video ads",
            "Shopping campaigns",
            "Remarketing strategies",
            "Bid strategies & optimization",
            "Quality Score improvement",
            "Conversion tracking setup"
          ],
          hours: "45 Hours"
        },
        {
          title: "Social Media Advertising",
          icon: Megaphone,
          topics: [
            "Facebook Ads Manager",
            "Instagram advertising",
            "LinkedIn Ads",
            "Audience targeting techniques",
            "Custom & lookalike audiences",
            "Ad creative best practices",
            "Campaign optimization",
            "ROAS optimization"
          ],
          hours: "35 Hours"
        },
        {
          title: "Email & WhatsApp Marketing",
          icon: MessageSquare,
          topics: [
            "Email marketing strategy",
            "List building techniques",
            "Email automation workflows",
            "Newsletter creation",
            "Drip campaign setup",
            "A/B testing emails",
            "WhatsApp Business API",
            "WhatsApp marketing automation"
          ],
          hours: "20 Hours"
        }
      ]
    },
    {
      month: "Month 6",
      title: "Analytics, AI & Career Prep",
      color: "from-green-500 to-emerald-500",
      icon: Brain,
      modules: [
        {
          title: "Analytics & Data Tracking",
          icon: BarChart3,
          topics: [
            "Google Analytics 4 mastery",
            "Setting up tracking",
            "Traffic analysis",
            "User behavior insights",
            "Conversion funnel analysis",
            "Custom reports & dashboards",
            "Google Tag Manager",
            "Attribution modeling"
          ],
          hours: "30 Hours"
        },
        {
          title: "AI-Powered Marketing",
          icon: Brain,
          topics: [
            "AI content generation tools",
            "ChatGPT for marketing",
            "AI image generation",
            "AI video creation",
            "Automated marketing workflows",
            "AI website builders",
            "AI graphic design tools",
            "AI analytics & insights"
          ],
          hours: "40 Hours"
        },
        {
          title: "Online Reputation & Career",
          icon: Shield,
          topics: [
            "Brand reputation monitoring",
            "Review management",
            "Crisis management",
            "Personal branding",
            "Portfolio development",
            "Resume building",
            "Interview preparation",
            "Freelancing setup"
          ],
          hours: "20 Hours"
        }
      ]
    }
  ];

  const aiSkillsModules = [
    {
      title: "AI Website Designing",
      icon: Laptop,
      color: "from-blue-600 to-indigo-500",
      topics: [
        "AI-powered website builders (Wix ADI, Framer AI)",
        "No-code platforms mastery",
        "Low-code development basics",
        "AI-assisted UI/UX design",
        "Responsive design with AI",
        "E-commerce site creation",
        "Landing page optimization with AI"
      ],
      projects: ["Build 3 complete websites", "Create 5 landing pages"]
    },
    {
      title: "AI Graphic Designing",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      topics: [
        "MidJourney & DALL-E mastery",
        "Canva AI features",
        "AI logo creation",
        "Social media graphics",
        "Ad banner design",
        "Brand identity with AI",
        "Image enhancement & editing"
      ],
      projects: ["Create brand identity kit", "Design 20+ social creatives"]
    },
    {
      title: "AI Video Editing",
      icon: Film,
      color: "from-purple-600 to-violet-500",
      topics: [
        "AI video editing tools",
        "CapCut & Runway ML",
        "Reels & Shorts creation",
        "YouTube video production",
        "AI subtitles & captions",
        "AI voice-overs",
        "Video optimization for platforms"
      ],
      projects: ["Create 10 short-form videos", "Produce 2 long-form videos"]
    }
  ];

  const learningOutcomes = [
    { icon: Search, text: "Master SEO for organic traffic", color: "bg-green-500" },
    { icon: MousePointerClick, text: "Run profitable ad campaigns", color: "bg-blue-500" },
    { icon: Share2, text: "Build social media presence", color: "bg-pink-500" },
    { icon: Brain, text: "Leverage AI for marketing", color: "bg-purple-500" },
    { icon: BarChart3, text: "Analyze data for insights", color: "bg-orange-500" },
    { icon: Palette, text: "Create stunning visuals", color: "bg-rose-500" }
  ];

  return (
    <>
      <Helmet>
        <title>Digital Marketing Syllabus 2024 | Complete Course Curriculum - Digital Bull Academy</title>
        <meta
          name="description"
          content="Detailed 6-month digital marketing syllabus covering SEO, social media, Google Ads, AI marketing, and more. View complete curriculum with modules, topics, and learning outcomes."
        />
        <meta
          name="keywords"
          content="digital marketing ahmedabad, digital marketing agency ahmedabad, digital marketing company in ahmedabad, digital marketing syllabus, digital marketing course curriculum, SEO training syllabus, social media marketing course, Google Ads training, AI marketing course, digital marketing training ahmedabad"
        />
        <link rel="canonical" href="https://dibull.com/digital-marketing-syllabus" />
        <meta property="og:title" content="Complete Digital Marketing Syllabus | 6-Month Course" />
        <meta property="og:description" content="Comprehensive digital marketing curriculum with SEO, social media, PPC, AI skills, and practical projects." />
        <meta property="og:type" content="article" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <FloatingElement duration={4} distance={20}>
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          </FloatingElement>
          <FloatingElement duration={5} distance={15}>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          </FloatingElement>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full border border-primary/30 mb-6">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">Complete Course Curriculum</span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Digital Marketing <span className="text-gradient">Syllabus</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Comprehensive 6-month curriculum covering all aspects of digital marketing and AI-powered creative skills. From fundamentals to advanced strategies.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">6 Months | 720+ Hours</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                    <Layers className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">12+ Core Modules</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">30+ Live Projects</span>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/digital-marketing-academy">
                    Enroll in This Course
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Course Overview Stats */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {learningOutcomes.map((outcome, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center group">
                    <div className={`w-12 h-12 ${outcome.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <outcome.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{outcome.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Month-wise Syllabus */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Detailed Curriculum
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Month-by-Month <span className="text-gradient">Learning Path</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Structured learning journey from digital marketing basics to advanced AI-powered strategies
              </p>
            </AnimatedSection>

            <div className="space-y-12 max-w-5xl mx-auto">
              {syllabusModules.map((monthData, monthIndex) => (
                <AnimatedSection key={monthIndex} delay={monthIndex * 0.1}>
                  <div className="bg-card rounded-3xl border border-border overflow-hidden">
                    {/* Month Header */}
                    <div className={`bg-gradient-to-r ${monthData.color} p-6`}>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <monthData.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <span className="text-white/80 text-sm font-medium">{monthData.month}</span>
                          <h3 className="text-2xl font-bold text-white">{monthData.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Modules */}
                    <div className="p-6">
                      <Accordion type="multiple" className="space-y-4">
                        {monthData.modules.map((module, moduleIndex) => (
                          <AccordionItem
                            key={moduleIndex}
                            value={`${monthIndex}-${moduleIndex}`}
                            className="border border-border rounded-xl overflow-hidden bg-muted/30"
                          >
                            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
                              <div className="flex items-center gap-4 text-left">
                                <div className={`w-10 h-10 bg-gradient-to-br ${monthData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                  <module.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground">{module.title}</h4>
                                  <span className="text-xs text-muted-foreground">{module.hours}</span>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-5">
                              <ul className="grid md:grid-cols-2 gap-2 mt-2">
                                {module.topics.map((topic, topicIndex) => (
                                  <li key={topicIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* AI Skills Curriculum */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                <Brain className="w-4 h-4 inline mr-2" />
                AI-Powered Skills
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Advanced AI-Based <span className="text-gradient">Creative Skills</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Master cutting-edge AI tools for website design, graphics, and video production
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {aiSkillsModules.map((module, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-card rounded-3xl border border-border overflow-hidden h-full group hover:border-primary/50 hover:shadow-2xl transition-all">
                    <div className={`bg-gradient-to-br ${module.color} p-6 text-center`}>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <module.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{module.title}</h3>
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Topics Covered</h4>
                      <ul className="space-y-2 mb-6">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-border">
                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Projects</h4>
                        {module.projects.map((project, pIndex) => (
                          <div key={pIndex} className="flex items-center gap-2 text-sm mb-1">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>{project}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Download & Enroll CTA */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <GraduationCap className="w-16 h-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master Digital Marketing?
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Duration</p>
                  <p className="text-xl font-bold">6 Months</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Timing</p>
                  <p className="text-xl font-bold">10 AM – 6:30 PM</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <IndianRupee className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-sm opacity-80">Fees</p>
                  <p className="text-xl font-bold">₹25,000/Month</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Enroll Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <a href="tel:+919824011921">
                    <Phone className="w-5 h-5 mr-2" />
                    +91 98240 11921
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

export default DigitalMarketingSyllabus;
