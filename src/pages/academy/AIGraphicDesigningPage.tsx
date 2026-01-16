import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Palette, Image, Wand2, ArrowRight, CheckCircle, Sparkles,
  Brush, Layers, Shapes, Pencil, Settings, Target, TrendingUp,
  Users, Award, Clock, Eye, Lightbulb, Rocket, Instagram, Megaphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AIGraphicDesigningPage = () => {
  const topics = [
    {
      icon: Wand2,
      title: "AI Logo & Brand Identity Creation",
      description: "Generate professional logos and complete brand identity kits using AI tools",
      tools: ["Looka", "Brandmark", "Designs.ai", "Logo AI"]
    },
    {
      icon: Instagram,
      title: "Social Media Creatives & Ad Banners",
      description: "Create scroll-stopping social media graphics and ad creatives with AI assistance",
      tools: ["Canva AI", "Adobe Express", "Crello", "Picsart"]
    },
    {
      icon: Image,
      title: "Image Enhancement & Background Removal",
      description: "Master AI-powered image editing, enhancement, and background manipulation",
      tools: ["Remove.bg", "PhotoRoom", "Remini", "Topaz AI"]
    },
    {
      icon: Brush,
      title: "Design Automation Using AI Tools",
      description: "Automate repetitive design tasks and create designs at scale with AI",
      tools: ["Designs.ai", "Designify", "AutoDraw", "Khroma"]
    },
    {
      icon: Sparkles,
      title: "MidJourney & DALL-E Mastery",
      description: "Create stunning AI-generated artwork and visuals with text-to-image tools",
      tools: ["MidJourney", "DALL-E 3", "Stable Diffusion", "Leonardo AI"]
    },
    {
      icon: Pencil,
      title: "AI-Assisted Illustration & Art",
      description: "Create unique illustrations and artwork using AI-powered creative tools",
      tools: ["Adobe Firefly", "Clipdrop", "NightCafe", "Artbreeder"]
    }
  ];

  const projects = [
    { title: "Brand Identity Kit", description: "Create complete brand guidelines with logo, colors & typography", duration: "3 Days" },
    { title: "Social Media Campaign", description: "Design 20+ social media graphics for a brand launch", duration: "2 Days" },
    { title: "Product Photography", description: "Enhance and edit product images for e-commerce", duration: "1 Day" },
    { title: "AI Art Collection", description: "Generate unique artwork using MidJourney & DALL-E", duration: "2 Days" },
    { title: "Ad Creative Suite", description: "Create multi-platform advertising creatives", duration: "2 Days" }
  ];

  const benefits = [
    { icon: Clock, title: "Create in Minutes", description: "What took hours now takes minutes with AI" },
    { icon: Eye, title: "Professional Quality", description: "AI-enhanced designs look agency-quality" },
    { icon: TrendingUp, title: "Scale Your Output", description: "Create 100s of designs quickly" },
    { icon: Award, title: "Stay Ahead", description: "Master the tools shaping the future" }
  ];

  const stats = [
    { value: "80%", label: "Time Saved" },
    { value: "20+", label: "AI Tools" },
    { value: "100+", label: "Designs Created" },
    { value: "∞", label: "Creative Possibilities" }
  ];

  const toolShowcase = [
    { name: "MidJourney", category: "Text-to-Image" },
    { name: "Canva AI", category: "Design Suite" },
    { name: "DALL-E 3", category: "Image Generation" },
    { name: "Remove.bg", category: "Background Removal" },
    { name: "Adobe Firefly", category: "Creative AI" },
    { name: "Looka", category: "Logo Design" }
  ];

  return (
    <>
      <Helmet>
        <title>AI Graphic Designing Course | Digital Marketing Academy | Dibull</title>
        <meta name="description" content="Master AI-powered graphic design with MidJourney, DALL-E, Canva AI and more. Create stunning visuals, logos, and social media graphics with AI tools." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl" />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 right-20 hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Palette className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-40 left-20 hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-pink-200" />
              <span className="text-pink-100 font-medium">AI-Powered Skills</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI Graphic <span className="text-pink-200">Designing</span>
            </h1>
            
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Master AI tools like MidJourney, DALL-E, and Canva AI to create stunning graphics, logos, and social media content in minutes.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 gap-2">
                <Link to="/contact?interest=academy&module=AI Graphic Designing" className="flex items-center gap-2">
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
                <div className="text-pink-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="py-12 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {toolShowcase.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-full px-6 py-3 shadow-md flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-pink-500" />
                <div>
                  <span className="font-semibold text-foreground">{tool.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({tool.category})</span>
                </div>
              </motion.div>
            ))}
          </div>
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
              What You'll <span className="text-pink-500">Learn</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training on AI-powered graphic design tools and techniques
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
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-300 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <topic.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{topic.title}</h3>
                    <p className="text-muted-foreground mb-4">{topic.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tools.map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs rounded-full font-medium">
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
              <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Why Learn AI Graphic <span className="text-pink-500">Designing?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                AI is revolutionizing graphic design. Master these skills to create professional visuals faster than ever and stay ahead in the creative industry.
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
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0">
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
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Rocket className="w-8 h-8" />
                  Career Opportunities
                </h3>
                <ul className="space-y-4">
                  {["AI Graphic Designer", "Social Media Designer", "Brand Identity Designer", "Creative Director", "Freelance Designer", "Marketing Designer"].map((career, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-pink-200" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold">₹3-12 LPA</div>
                  <div className="text-pink-200">Average Salary Range</div>
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
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Hands-On Learning</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Real-World <span className="text-pink-500">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build a stunning portfolio of AI-generated designs during the course
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
                <Card className="h-full bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border-pink-200/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold">
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
      <section className="py-20 bg-gradient-to-br from-pink-500 to-rose-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Master AI Graphic Designing?
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Join our Digital Marketing Academy and unleash your creative potential with AI
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 gap-2">
                <Link to="/contact?interest=academy&module=AI Graphic Designing" className="flex items-center gap-2">
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

export default AIGraphicDesigningPage;
