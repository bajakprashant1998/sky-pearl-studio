import { useState } from "react";
import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface QuickContactWidgetProps {
  serviceName?: string;
  whatsappNumber?: string;
  phoneNumber?: string;
}

const QuickContactWidget = ({
  serviceName = "Digital Marketing",
  whatsappNumber = "919876543210",
  phoneNumber = "+91 98765 43210",
}: QuickContactWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - redirect to contact page with prefilled data
    const params = new URLSearchParams({
      name,
      email,
      service: serviceName,
    });
    window.location.href = `/contact?${params.toString()}`;
  };

  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in your ${serviceName} services. Can you help me?`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Main FAB Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/40 flex items-center justify-center text-white"
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
              {/* Pulse Animation */}
              <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded Widget */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-0 right-0 w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 text-white relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20 h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <h3 className="font-bold text-lg">Get a Free Quote</h3>
                <p className="text-white/80 text-sm">We typically reply within 2 hours</p>
              </div>

              {/* Content */}
              <div className="p-4">
                {!submitted ? (
                  <>
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2 p-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors text-sm font-medium"
                      >
                        <Phone className="w-4 h-4" />
                        Call Us
                      </a>
                    </div>

                    <div className="relative flex items-center my-4">
                      <div className="flex-grow border-t border-border"></div>
                      <span className="flex-shrink mx-3 text-xs text-muted-foreground">or leave your details</span>
                      <div className="flex-grow border-t border-border"></div>
                    </div>

                    {/* Quick Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <Input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-10"
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-10"
                      />
                      <div className="bg-muted/50 rounded-lg p-2 text-xs text-muted-foreground">
                        Interested in: <span className="font-medium text-foreground">{serviceName}</span>
                      </div>
                      <Button type="submit" className="w-full" variant="hero">
                        Get Quote
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Thanks!</h4>
                    <p className="text-muted-foreground text-sm">
                      We'll get back to you within 2 hours.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default QuickContactWidget;
