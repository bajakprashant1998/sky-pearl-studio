import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-primary rounded-3xl p-8 md:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Grow Your Business?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Let's discuss how we can help you achieve your digital marketing
                goals. Schedule a free consultation today.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground">hello@digipulse.com</span>
                </div>
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground">123 Marketing Ave, New York, NY</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-card rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <Button variant="hero" size="lg" className="w-full group">
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
