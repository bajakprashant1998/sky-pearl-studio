import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import ReCAPTCHA from "react-google-recaptcha";
import AnimatedSection from "./AnimatedSection";

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData(form.current!);
    const data = {
      firstName: formData.get("user_name"),
      lastName: formData.get("user_lastname"),
      email: formData.get("user_email"),
      phone: phone,
      message: formData.get("message"),
      captchaToken,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        form.current?.reset();
        setPhone("");
        setCaptchaToken(null);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Please check if the backend server is running.",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-primary rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-primary-foreground rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <AnimatedSection direction="left" className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight">
                Ready to Grow Your Business?
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/80 mb-6 md:mb-8">
                Let's discuss how we can help you achieve your digital marketing
                goals. Schedule a free consultation today.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <a href="mailto:cadbull2014@gmail.com" className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start group hover:opacity-90 transition-opacity">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground text-sm sm:text-base break-all">cadbull2014@gmail.com</span>
                </a>
                <a href="tel:+919824011921" className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start group hover:opacity-90 transition-opacity">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground text-sm sm:text-base">+91 9824011921</span>
                </a>
                <div className="flex items-start gap-3 sm:gap-4 justify-center lg:justify-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground text-sm sm:text-base text-left leading-relaxed">
                    Digital Bull Technology Pvt ltd<br />
                    A 823 Moneyplant High street<br />
                    Jagatpur Road, Near GOTA Cross road<br />
                    Ahmedabad
                  </span>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Column - Form */}
            <AnimatedSection direction="right">
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-2xl">
                <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        name="user_name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        name="user_lastname"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email
                      </label>
                      <input
                        name="user_email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <PhoneInput
                          defaultCountry="in"
                          value={phone}
                          onChange={(phone) => setPhone(phone)}
                          inputClassName="!w-full !px-4 !py-3 !rounded-r-lg !border !border-border !bg-background !text-foreground focus:!outline-none focus:!ring-2 focus:!ring-primary transition-all !h-[48px] !text-sm sm:!text-base !border-l-0"
                          countrySelectorStyleProps={{
                            buttonClassName: "!px-3 !py-3 !rounded-l-lg !border !border-border !bg-background hover:!bg-muted transition-colors !h-[48px] !border-r-0",
                          }}
                          className="w-full flex"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm sm:text-base"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <div className="flex justify-center overflow-x-auto">
                    <div className="transform scale-90 sm:scale-100 origin-center">
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY_HERE"}
                        onChange={setCaptchaToken}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform ml-2" />
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
