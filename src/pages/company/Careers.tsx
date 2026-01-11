import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase, Users, Zap, Bike, HeartHandshake, Globe, Send, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";

const benefits = [
  {
    icon: Globe,
    title: "Remote-First Culture",
    description: "Work from anywhere. We believe in output over hours and trust our team to deliver excellence from wherever they are most productive."
  },
  {
    icon: Zap,
    title: "Fast-Paced Growth",
    description: "Accelerate your career with challenging projects and early responsibility. We're growing fast, and we want you to grow with us."
  },
  {
    icon: HeartHandshake,
    title: "Comprehensive Health",
    description: "We take care of our own. Full medical, dental, and vision coverage for you and your dependents."
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description: "Join a diverse team of passionate experts. We support each other, share knowledge, and celebrate wins together."
  },
  {
    icon: Briefcase,
    title: "Professional Development",
    description: "Annual stipend for courses, conferences, and books. We invest in your continuous learning."
  },
  {
    icon: Bike,
    title: "Work-Life Balance",
    description: "Flexible hours and generous PTO. We believe that well-rested employees are the most creative and effective."
  }
];

const Careers = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://email.dibull.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send application");
      }

      toast({
        title: "Application Submitted!",
        description: "We have received your details. Please email your resume to info@dibull.com to complete your application.",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again or email us directly at info@dibull.com"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers | Join Digital Bull Technology | Digital Marketing Jobs</title>
        <meta name="description" content="Join Digital Bull Technology's team of digital marketing experts. We're hiring SEO specialists, PPC managers, content creators, and developers. Remote-first culture with great benefits." />
        <meta name="keywords" content="digital marketing jobs, SEO careers, PPC jobs, marketing agency careers, remote marketing jobs, Ahmedabad jobs, Digital Bull careers" />
        <meta property="og:title" content="Careers at Digital Bull Technology | We're Hiring" />
        <meta property="og:description" content="Join our team of digital marketing experts. Remote-first culture, professional development, and competitive benefits." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dibull.com/careers" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden text-primary-foreground">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <AnimatedSection>
              <span className="inline-block py-2 px-4 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-6 tracking-wide uppercase">
                We're Hiring!
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Build the Future of <br className="hidden md:block" />
                <span className="text-blue-300">Digital Marketing</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Join a team of innovators, creators, and strategists. We're redefining how businesses grow in the digital age.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Button size="lg" variant="secondary" className="group" asChild>
                <a href="#apply">
                  Submit Your Resume
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                Why Join Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join Digital Bull?</h2>
              <p className="text-muted-foreground text-lg">
                We believe that a great workplace is built on trust, growth, and shared success. Here's what you can expect when you join our team.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover-lift transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                      <benefit.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Submission Form */}
        <section id="apply" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
                  Apply Now
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Submit Your Application</h2>
                <p className="text-muted-foreground text-lg">
                  Ready to join our team? Fill out the form below.
                  <br className="hidden sm:block" />
                  <span className="text-primary font-medium">Note: Please email your resume separately to info@dibull.com after submitting.</span>
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message / Cover Letter <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder="Tell us about yourself, your experience, and why you'd like to join Digital Bull Technology..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    By submitting, you agree to our privacy policy. Your information will be handled with care.
                  </p>
                </form>
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  You can also email your resume directly to{" "}
                  <a href="mailto:info@dibull.com" className="text-primary font-semibold hover:underline">
                    info@dibull.com
                  </a>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Careers;
