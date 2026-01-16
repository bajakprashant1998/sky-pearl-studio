import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Film, Video, Play, ArrowRight, CheckCircle, Sparkles,
  Scissors, Volume2, Captions, Upload, Settings, Target, TrendingUp,
  Users, Award, Clock, Eye, Youtube, Clapperboard, Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AIVideoEditingPage = () => {
  const topics = [
    {
      icon: Scissors,
      title: "AI-Based Video Editing Tools",
      description: "Master AI-powered video editing software that automates complex editing tasks",
      tools: ["CapCut", "Runway ML", "Descript", "Pictory"]
    },
    {
      icon: Youtube,
      title: "Reels, Shorts & YouTube Creation",
      description: "Create viral short-form and long-form video content for all major platforms",
      tools: ["CapCut", "InShot", "VN Editor", "Adobe Premiere Rush"]
    },
    {
      icon: Captions,
      title: "AI Subtitles & Captions",
      description: "Generate accurate subtitles and captions automatically using AI transcription",
      tools: ["Descript", "Kapwing", "Veed.io", "Submagic"]
    },
    {
      icon: Mic,
      title: "AI Voice-Overs & Text-to-Speech",
      description: "Create professional voice-overs using AI voice synthesis technology",
      tools: ["ElevenLabs", "Murf.ai", "Play.ht", "Speechify"]
    },
    {
      icon: Upload,
      title: "Multi-Platform Video Optimization",
      description: "Optimize videos for different platforms - YouTube, Instagram, TikTok, LinkedIn",
      tools: ["Canva Video", "Kapwing", "Lumen5", "InVideo"]
    },
    {
      icon: Clapperboard,
      title: "AI Video Generation",
      description: "Generate videos from text prompts using cutting-edge AI technology",
      tools: ["Runway Gen-3", "Pika Labs", "Sora", "Synthesia"]
    }
  ];

  const projects = [
    { title: "YouTube Video Series", description: "Create a 5-part educational video series with AI editing", duration: "5 Days" },
    { title: "Instagram Reels Campaign", description: "Produce 15+ viral reels for a brand launch", duration: "3 Days" },
    { title: "Product Promotional Video", description: "Create professional product videos with AI voice-overs", duration: "2 Days" },
    { title: "Podcast to Video", description: "Transform audio podcasts into engaging video content", duration: "2 Days" },
    { title: "AI-Generated Short Film", description: "Create a short film using AI video generation tools", duration: "3 Days" }
  ];

  const benefits = [
    { icon: Clock, title: "Edit 10x Faster", description: "AI automates hours of manual editing" },
    { icon: Eye, title: "Professional Quality", description: "Cinema-grade results without the learning curve" },
    { icon: Volume2, title: "Perfect Audio", description: "AI handles subtitles, captions & voice-overs" },
    { icon: TrendingUp, title: "Viral Content", description: "Create content optimized for engagement" }
  ];

  const stats = [
    { value: "85%", label: "Time Saved" },
    { value: "15+", label: "AI Tools" },
    { value: "50+", label: "Videos Created" },
    { value: "5", label: "Platforms Covered" }
  ];

  const platforms = [
    { name: "YouTube", icon: Youtube },
    { name: "Instagram", icon: Play },
    { name: "TikTok", icon: Video },
    { name: "LinkedIn", icon: Film },
    { name: "Facebook", icon: Clapperboard }
  ];

  return (
    <>
      <Helmet>
        <title>AI Video Editing & Creation Course | Digital Marketing Academy | Dibull</title>
        <meta name="description" content="Master AI-powered video editing with CapCut, Runway ML, and more. Create professional videos, reels, and shorts with AI subtitles and voice-overs." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 right-20 hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Film className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-40 left-20 hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <Play className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-200" />
              <span className="text-purple-100 font-medium">AI-Powered Skills</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI Video Editing & <span className="text-purple-200">Creation</span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Master AI-powered video editing, create viral reels & shorts, and produce professional videos with AI subtitles and voice-overs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 gap-2">
                <Link to="/contact?interest=academy&module=AI Video Editing" className="flex items-center gap-2">
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
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-12 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Multi-Platform Mastery</span>
            <h3 className="text-2xl font-bold text-foreground mt-2">Create Content for All Major Platforms</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl px-8 py-4 shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow"
              >
                <platform.icon className="w-6 h-6 text-purple-500" />
                <span className="font-semibold text-foreground">{platform.name}</span>
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
              What You'll <span className="text-purple-600">Learn</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training on AI-powered video editing and content creation
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
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <topic.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{topic.title}</h3>
                    <p className="text-muted-foreground mb-4">{topic.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tools.map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs rounded-full font-medium">
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
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Why Learn AI Video <span className="text-purple-600">Editing?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Video is the king of content. AI tools are revolutionizing how videos are created and edited, making professional video production accessible to everyone.
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
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
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
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  Career Opportunities
                </h3>
                <ul className="space-y-4">
                  {["Video Editor", "Content Creator", "YouTube Manager", "Social Media Video Specialist", "Video Marketing Manager", "Freelance Videographer"].map((career, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-200" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold">₹4-18 LPA</div>
                  <div className="text-purple-200">Average Salary Range</div>
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
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Hands-On Learning</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Real-World <span className="text-purple-600">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build a portfolio of professional videos during the course
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
                <Card className="h-full bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold">
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

      {/* Video Content Stats */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-950/40 dark:to-violet-950/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">82%</div>
              <div className="text-foreground font-medium">of internet traffic is video</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">5B+</div>
              <div className="text-foreground font-medium">YouTube videos watched daily</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">2x</div>
              <div className="text-foreground font-medium">engagement vs images</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-violet-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Master AI Video Creation?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join our Digital Marketing Academy and become a video content powerhouse
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 gap-2">
                <Link to="/contact?interest=academy&module=AI Video Editing" className="flex items-center gap-2">
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

export default AIVideoEditingPage;
