import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/data/services";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getHref = (hash: string) => {
    return isHomePage ? hash : `/${hash}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">DB</span>
            </div>
            <span className="text-xl font-bold text-foreground">Digital Bull</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Home
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary font-medium transition-colors duration-300">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-card border border-border rounded-xl shadow-xl py-2 min-w-[280px] max-h-[70vh] overflow-y-auto animate-fade-in">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                      >
                        <service.icon className="w-4 h-4" />
                        <span className="text-sm">{service.shortTitle}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <a
              href={getHref("#about")}
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              About
            </a>
            <a
              href={getHref("#testimonials")}
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Testimonials
            </a>
            <a
              href={getHref("#contact")}
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" className="text-foreground">
              Log In
            </Button>
            <Button variant="hero">Get Started</Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <div className="space-y-2">
                <span className="text-muted-foreground font-medium py-2 block">Services</span>
                <div className="pl-4 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <service.icon className="w-4 h-4" />
                      {service.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
              
              <a
                href={getHref("#about")}
                className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href={getHref("#testimonials")}
                className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>
              <a
                href={getHref("#contact")}
                className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start">
                  Log In
                </Button>
                <Button variant="hero">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
