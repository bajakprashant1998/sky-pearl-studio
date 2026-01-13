import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "./AnimatedSection";
import TurnstileWidget from "@/components/TurnstileWidget";

const ContactSection = () => {
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

      // Clear form
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

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your digital marketing goals. Schedule a free consultation today.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column - Contact Info Cards */}
          <AnimatedSection direction="left" className="lg:col-span-2 space-y-4">
            {/* Email Card */}
            <a
              href="mailto:cadbull2014@gmail.com"
              className="group block bg-card rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Email Us</p>
                  <span className="text-foreground font-medium break-all">
                    cadbull2014@gmail.com
                  </span>
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+919824011921"
              className="group block bg-card rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Call Us</p>
                  <span className="text-foreground font-medium">
                    +91 98240 11921
                  </span>
                </div>
              </div>
            </a>

            {/* Address Card */}
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Visit Us</p>
                  <span className="font-semibold text-foreground block mb-1">Digital Bull Technology Pvt Ltd</span>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    A 823 Moneyplant High street<br />
                    Jagatpur Road, Near GOTA Cross road<br />
                    Ahmedabad
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Form */}
          <AnimatedSection direction="right" className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
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
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
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
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
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
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project or requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                  />
                </div>

                <div className="py-1">
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
                  size="lg"
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
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
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
