import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient shadow overlay */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      {/* CTA Bar */}
      <div className="bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 safe-area-pb">
        <div className="flex items-center gap-3">
          {/* Call Button */}
          <a
            href="tel:+919904699748"
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Call us"
          >
            <Phone className="w-5 h-5 text-primary" />
          </a>
          
          {/* Main CTA Button */}
          <Button 
            variant="hero" 
            size="lg" 
            className="flex-1 group text-base font-semibold h-12"
            asChild
          >
            <Link to="/contact">
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileCTA;