import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin, Loader2, Clock, MessageCircle, Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import TurnstileWidget from "@/components/TurnstileWidget";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email address";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!formData.message.trim()) return "Message is required";
    if (!captchaToken) return "Please complete the CAPTCHA verification";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: error,
      });
      return;
    }

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
          captchaToken: captchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setCaptchaToken(null);

    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Digital Bull Technology",
    "description": "Get in touch with Digital Bull Technology for digital marketing, SEO, PPC, and web design services.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Digital Bull Technology",
      "telephone": "+91-9824011921",
      "email": "info@dibull.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "A 823 Moneyplant High Street, Jagatpur Road",
        "addressLocality": "Ahmedabad",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Get Free Consultation | Digital Bull Technology</title>
        <meta
          name="description"
          content="Contact Digital Bull Technology for a free consultation on SEO, PPC, social media marketing, and web design. Call +91 9824011921 or email info@dibull.com. Based in Ahmedabad."
        />
        <meta
          name="keywords"
          content="contact digital marketing agency, free marketing consultation, SEO consultation, PPC services contact, Ahmedabad digital agency, Digital Bull contact"
        />
        <link rel="canonical" href="https://dibull.com/contact" />
        <meta property="og:title" content="Contact Digital Bull Technology | Free Consultation" />
        <meta property="og:description" content="Get in touch for a free digital marketing consultation. Expert SEO, PPC, and web design services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dibull.com/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20 min-h-screen bg-gradient-hero">
        {/* Hero Header */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <MessageCircle className="w-4 h-4" />
                Let's Connect
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Get in Touch With
                <span className="text-gradient block mt-2">Our Experts</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to transform your digital presence? Our team is here to help you achieve your business goals.
              </p>
            </AnimatedSection>

            {/* Main Content - Split Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Side - Illustration & Info */}
              <AnimatedSection direction="left" className="order-2 lg:order-1">
                {/* Decorative Illustration */}
                <div className="relative mb-8">
                  <div className="relative bg-gradient-primary rounded-3xl p-8 md:p-12 overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                    </div>

                    {/* Floating elements */}
                    <div className="relative z-10">
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-float">
                            <Send className="w-16 h-16 md:w-20 md:h-20 text-white" />
                          </div>
                          <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce-subtle">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse-slow">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">We'd Love to Hear From You</h3>
                        <p className="text-white/80 text-lg">Drop us a message and we'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <a
                    href="mailto:cadbull2014@gmail.com"
                    className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Email Us</span>
                      <p className="text-foreground font-semibold text-lg">cadbull2014@gmail.com</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="tel:+919824011921"
                    className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Call Us</span>
                      <p className="text-foreground font-semibold text-lg">+91 98240 11921</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>

                  <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Visit Us</span>
                      <p className="text-foreground font-semibold">Digital Bull Technology Pvt Ltd</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        A 823 Moneyplant High Street, Jagatpur Road,<br />
                        Near GOTA Cross Road, Ahmedabad
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-secondary/50 rounded-2xl border border-primary/10">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Business Hours</span>
                      <p className="text-foreground font-semibold">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      <p className="text-muted-foreground text-sm mt-1">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right Side - Form */}
              <AnimatedSection direction="right" className="order-1 lg:order-2">
                <div className="bg-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-border/50 sticky top-28">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Send Us a Message</h2>
                    <p className="text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your project or requirements..."
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                      />
                    </div>

                    <div className="py-2">
                      {siteKey ? (
                        <TurnstileWidget
                          siteKey={siteKey}
                          onVerify={(token) => setCaptchaToken(token)}
                          onError={() => {
                            toast({
                              variant: "destructive",
                              title: "Verification Failed",
                              description: "CAPTCHA verification failed. Please try again.",
                            });
                            setCaptchaToken(null);
                          }}
                        />
                      ) : (
                        <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-lg">
                          Error: CAPTCHA site key is missing.
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      By submitting this form, you agree to our{" "}
                      <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                    </p>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.2813085773164!2d72.54181491545393!3d23.0778699847924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e835e65f29e67%3A0xc7a0a593c53e8bf8!2sMoneyplant%20Highstreet!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Digital Bull Technology Location"
                  className="w-full"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContactUs;
