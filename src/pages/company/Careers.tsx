import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase, Users, Zap, Bike, HeartHandshake, Globe, Upload, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or DOC/DOCX file."
        });
        e.target.value = '';
        setFileName("");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB."
        });
        e.target.value = '';
        setFileName("");
        return;
      }

      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    
    // Simulate form submission - in production, this would send to backend
    try {
      // Create mailto link with form data (for demo purposes)
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const message = formData.get('message') as string;

      // Note: File attachment requires backend implementation
      const mailtoLink = `mailto:info@dibull.com?subject=Job Application from ${encodeURIComponent(name)}&body=${encodeURIComponent(`
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}

Resume: ${fileName ? `Attached (${fileName})` : 'Not attached'}

---
This application was submitted via the Digital Bull Technology careers page.
      `)}`;

      window.location.href = mailtoLink;

      toast({
        title: "Application Ready!",
        description: "Your email client should open with the application details. Please attach your resume and send.",
      });

      formRef.current?.reset();
      setFileName("");
    } catch (error) {
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Submit Your Resume</h2>
                <p className="text-muted-foreground text-lg">
                  Ready to join our team? Fill out the form below and we'll get in touch with you.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message / Cover Letter
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder="Tell us about yourself, your experience, and why you'd like to join Digital Bull Technology..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Resume/CV <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <input
                        name="resume"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex items-center gap-4 px-4 py-4 rounded-lg border-2 border-dashed border-border bg-muted/30 hover:border-primary/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          {fileName ? (
                            <p className="font-medium text-foreground">{fileName}</p>
                          ) : (
                            <>
                              <p className="font-medium text-foreground">Click to upload or drag and drop</p>
                              <p className="text-sm text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={loading}
                  >
                    {loading ? (
                      "Submitting..."
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
                </div>
              </form>

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
