import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Monitor, Code, Layers, Zap, ArrowRight, CheckCircle, Sparkles,
  Globe, Layout, Smartphone, Palette, Settings, Target, TrendingUp,
  Users, Award, Clock, BookOpen, Lightbulb, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AIWebsiteDesigningPage = () => {
  const topics = [
    {
      icon: Sparkles,
      title: "AI-Powered Website Builders",
      description: "Master Wix ADI, Framer AI, and other AI-powered platforms that create stunning websites in minutes",
      tools: ["Wix ADI", "Framer AI", "Durable AI", "10Web AI"]
    },
    {
      icon: Code,
      title: "No-Code & Low-Code Platforms",
      description: "Build professional websites without writing code using modern no-code and low-code solutions",
      tools: ["Webflow", "Bubble", "Carrd", "Softr"]
    },
    {
      icon: Layout,
      title: "AI-Assisted UI/UX Layouts",
      description: "Use AI to generate user-friendly layouts that enhance user experience and engagement",
      tools: ["Figma AI", "Uizard", "Galileo AI", "Relume"]
    },
    {
      icon: Target,
      title: "High-Conversion Landing Pages",
      description: "Create landing pages optimized for conversions using AI-driven design principles",
      tools: ["Leadpages", "Unbounce", "Instapage", "ClickFunnels"]
    },
    {
      icon: Smartphone,
      title: "Responsive & Mobile-First Design",
      description: "Ensure your websites look perfect on all devices with AI-powered responsive design",
      tools: ["Bootstrap Studio", "Responsively", "BrowserStack"]
    },
    {
      icon: Settings,
      title: "Website Optimization with AI",
      description: "Leverage AI tools to optimize website performance, speed, and SEO",
      tools: ["PageSpeed AI", "Lighthouse", "GTmetrix"]
    }
  ];

  const projects = [
    { title: "Portfolio Website", description: "Build a complete personal portfolio using AI tools", duration: "2 Days" },
    { title: "E-commerce Store", description: "Create a fully functional online store with AI assistance", duration: "3 Days" },
    { title: "Business Landing Page", description: "Design high-converting landing pages for businesses", duration: "1 Day" },
    { title: "Blog/Content Website", description: "Build a blog with AI-generated layouts and features", duration: "2 Days" },
    { title: "SaaS Website", description: "Create a modern SaaS product website with AI", duration: "3 Days" }
  ];

  const benefits = [
    { icon: Clock, title: "10x Faster Development", description: "Build websites in hours, not weeks" },
    { icon: Users, title: "No Coding Required", description: "Perfect for non-technical entrepreneurs" },
    { icon: TrendingUp, title: "Higher Conversions", description: "AI-optimized designs that convert" },
    { icon: Award, title: "Professional Results", description: "Agency-quality websites at fraction of cost" }
  ];

  const stats = [
    { value: "95%", label: "Cost Reduction" },
    { value: "10x", label: "Faster Development" },
    { value: "40%", label: "Higher Conversions" },
    { value: "15+", label: "AI Tools Covered" }
  ];

  return (
    <>
      <Helmet>
        <title>AI Website Designing Course | Digital Marketing Academy | Dibull</title>
        <meta name="description" content="Master AI-powered website builders, no-code platforms, and UI/UX design with AI tools. Build professional websites in hours, not weeks." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 right-20 hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Monitor className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100 font-medium">AI-Powered Skills</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI Website <span className="text-blue-200">Designing</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Master the latest AI tools for website designing. Build stunning, high-converting websites in hours without writing a single line of code.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                <Link to="/contact?interest=academy&module=AI Website Designing" className="flex items-center gap-2">
                  Enroll Now <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link to="/digital-marketing-syllabus">View Syllabus</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Curriculum</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              What You'll <span className="text-primary">Learn</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training on AI-powered website building tools and techniques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <topic.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{topic.title}</h3>
                    <p className="text-muted-foreground mb-4">{topic.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tools.map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Why Learn AI Website <span className="text-primary">Designing?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                The future of web development is AI-powered. Learn skills that will make you 10x more productive and valuable in the job market.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Rocket className="w-8 h-8" />
                  Career Opportunities
                </h3>
                <ul className="space-y-4">
                  {["Web Designer", "UI/UX Designer", "Landing Page Specialist", "No-Code Developer", "Freelance Web Developer", "Digital Agency Owner"].map((career, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-200" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold">₹4-15 LPA</div>
                  <div className="text-blue-200">Average Salary Range</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Hands-On Learning</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Real-World <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build a portfolio of professional websites during the course
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm text-muted-foreground bg-white dark:bg-slate-800 px-3 py-1 rounded-full">{project.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Master AI Website Designing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our Digital Marketing Academy and become an expert in AI-powered web design
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                <Link to="/contact?interest=academy&module=AI Website Designing" className="flex items-center gap-2">
                  Enroll Now <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link to="/digital-marketing-academy">Explore Full Program</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AIWebsiteDesigningPage;
