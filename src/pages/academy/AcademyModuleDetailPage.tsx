import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Wrench,
  GraduationCap,
  Target,
  Rocket,
  IndianRupee,
  BarChart3,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { getModuleBySlug, academyModules } from "@/data/academyModulesData";
import { CountUp } from "@/components/AnimatedSection";

const AcademyModuleDetailPage = () => {
  const { moduleSlug } = useParams();
  const module = getModuleBySlug(moduleSlug || "");

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module not found</h1>
          <Link to="/digital-marketing-academy">
            <Button>Back to Academy</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = module.icon;
  const currentIndex = academyModules.findIndex(m => m.slug === module.slug);
  const nextModule = academyModules[currentIndex + 1];
  const prevModule = academyModules[currentIndex - 1];

  return (
    <>
      <Helmet>
        <title>{module.title} | Digital Marketing Academy - Dibull Digital</title>
        <meta name="description" content={`${module.description}. Learn ${module.skills.join(", ")} with hands-on training and industry-recognized certification.`} />
        <meta name="keywords" content={`${module.title}, digital marketing course, ${module.skills.join(", ")}, online marketing training`} />
        <link rel="canonical" href={`https://dibulldigital.com/digital-marketing-academy/${module.slug}`} />
        <meta property="og:title" content={`${module.title} | Digital Marketing Academy`} />
        <meta property="og:description" content={module.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 ${module.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/digital-marketing-academy" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Academy
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                <Clock className="w-3 h-3 mr-1" />
                {module.duration}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {module.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              {module.overview}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
              <Link to="/digital-marketing-syllabus">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Full Syllabus
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Curriculum</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive coverage of all essential topics with hands-on practice
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border/50">
                  <CardContent className="p-6">
                    <div className={`w-10 h-10 rounded-lg ${module.gradient} flex items-center justify-center mb-4`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{topic.title}</h3>
                    <p className="text-muted-foreground text-sm">{topic.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl ${module.gradient} flex items-center justify-center`}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Skills You'll Gain</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {module.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl ${module.gradient} flex items-center justify-center`}>
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Tools You'll Master</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {module.tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-2 px-4">
                    {tool}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Scope Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className={`${module.gradient} text-white mb-4`}>
              <Rocket className="w-3 h-3 mr-1" />
              Career Prospects
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {module.futureScope.title}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {module.futureScope.description}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className={`text-center p-6 ${module.gradient} border-0`}>
                <IndianRupee className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{module.futureScope.salaryRange}</div>
                <div className="text-white/80 text-sm">Salary Range</div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center p-6 bg-card border-border/50">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-xl font-bold text-foreground mb-1">{module.futureScope.demandTrend}</div>
                <div className="text-muted-foreground text-sm">Demand Trend</div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center p-6 bg-card border-border/50">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-lg font-bold text-foreground mb-1">{module.futureScope.industryGrowth}</div>
                <div className="text-muted-foreground text-sm">Industry Growth</div>
              </Card>
            </motion.div>
          </div>

          {/* Career Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Career Opportunities</h3>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {module.futureScope.careers.map((career, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-muted/50 text-center hover:bg-muted transition-colors"
                  >
                    <Building2 className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                    <span className="text-sm font-medium text-foreground">{career}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Project Work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Hands-On Experience</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real-World Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Apply your learning through practical projects that build your portfolio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {module.projectWork.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow border-border/50">
                  <div className={`w-12 h-12 rounded-full ${module.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-xl font-bold text-white">{index + 1}</span>
                  </div>
                  <p className="text-foreground font-medium">{project}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className={`w-20 h-20 rounded-2xl ${module.gradient} flex items-center justify-center mx-auto mb-6`}>
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry-Recognized Certification
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Upon completion, you'll receive the <strong className="text-foreground">{module.certification}</strong> from Dibull Digital Academy.
            </p>
            <Link to="/contact">
              <Button size="lg" className={`${module.gradient} text-white border-0`}>
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Your Journey Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {prevModule ? (
              <Link to={`/digital-marketing-academy/${prevModule.slug}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {prevModule.shortTitle}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            
            <Link to="/digital-marketing-academy">
              <Button variant="ghost">View All Modules</Button>
            </Link>
            
            {nextModule ? (
              <Link to={`/digital-marketing-academy/${nextModule.slug}`}>
                <Button variant="outline" className="gap-2">
                  {nextModule.shortTitle}
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
};

export default AcademyModuleDetailPage;
