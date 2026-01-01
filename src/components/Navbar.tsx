import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/data/services";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [expandedServiceMobile, setExpandedServiceMobile] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getHref = (hash: string) => {
    return isHomePage ? hash : `/${hash}`;
  };

  const activeService = services.find(s => s.id === hoveredService) || services[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/dibull_logo.png" alt="Digital Bull Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-bold" style={{ color: "#2675F4" }}>Digital Bull</span>
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
              onMouseEnter={() => {
                setServicesOpen(true);
                if (!hoveredService) setHoveredService(services[0].id);
              }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary font-medium transition-colors duration-300">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 transform -translate-x-1/4">
                  <div className="bg-card border border-border rounded-xl shadow-xl flex overflow-hidden animate-fade-in min-w-[600px] max-h-[70vh]">
                    {/* Left side: Service Categories */}
                    <div className="w-1/2 overflow-y-auto border-r border-border bg-muted/30">
                      <div className="p-2 space-y-1">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${hoveredService === service.id
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                            onMouseEnter={() => setHoveredService(service.id)}
                            onClick={() => setServicesOpen(false)}
                          >
                            <Link
                              to={`/services/${service.slug}`}
                              className="flex items-center gap-3 flex-1"
                            >
                              <service.icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{service.shortTitle}</span>
                            </Link>
                            <ChevronDown className="w-3 h-3 -rotate-90 opacity-50" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right side: Subcategories */}
                    <div className="w-1/2 overflow-y-auto p-4 bg-card">
                      {activeService && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                              <activeService.icon className="w-4 h-4 text-primary" />
                              {activeService.shortTitle}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {activeService.subtitle}
                            </p>
                            <Link
                              to={`/services/${activeService.slug}`}
                              className="text-xs font-medium text-primary hover:underline mb-4 inline-block"
                              onClick={() => setServicesOpen(false)}
                            >
                              View Main Service Page →
                            </Link>
                          </div>

                          <div className="space-y-1">
                            {activeService.subcategories.map((sub) => (
                              <Link
                                key={sub.id}
                                to={`/services/${activeService.slug}/${sub.id}`}
                                className="flex items-center gap-2 group px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                                onClick={() => setServicesOpen(false)}
                              >
                                <sub.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span>{sub.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about-us"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/careers"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Careers
            </Link>
            <a
              href={getHref("#testimonials")}
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Testimonials
            </a>
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* <Button variant="ghost" className="text-foreground">
              Log In
            </Button> */}
            <Button variant="hero" asChild>
              <Link to="/contact">Get Started</Link>
            </Button>
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
                <div className="pl-2 space-y-1">
                  {services.map((service) => (
                    <div key={service.id} className="space-y-1">
                      <div className="flex items-center justify-between pr-2">
                        <Link
                          to={`/services/${service.slug}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors py-2 flex-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <service.icon className="w-4 h-4" />
                          {service.shortTitle}
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedServiceMobile(expandedServiceMobile === service.id ? null : service.id);
                          }}
                          className="p-2"
                        >
                          <ChevronDown className={`w-3 h-3 transition-transform ${expandedServiceMobile === service.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {expandedServiceMobile === service.id && (
                        <div className="pl-8 border-l border-border ml-2 space-y-1 py-1">
                          {service.subcategories.map(sub => (
                            <Link
                              key={sub.id}
                              to={`/services/${service.slug}/${sub.id}`}
                              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <sub.icon className="w-4 h-4" />
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
              <Link
                to="/careers"
                className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Careers
              </Link>
              <a
                href={getHref("#testimonials")}
                className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start">
                  Log In
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav >
  );
};

export default Navbar;
