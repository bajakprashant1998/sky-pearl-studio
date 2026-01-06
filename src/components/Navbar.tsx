import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight, Sparkles, TrendingUp, Flame } from "lucide-react";
import { services } from "@/data/services";

const trendingServices = [
  { id: "ai-marketing", label: "AI Marketing", color: "from-purple-500 to-pink-500" },
  { id: "seo", label: "SEO Services", color: "from-blue-500 to-cyan-500" },
  { id: "ppc", label: "PPC Advertising", color: "from-orange-500 to-red-500" },
];

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in w-[900px]">
                    {/* Header with Trending */}
                    <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flame className="w-5 h-5 text-orange-500" />
                          <span className="font-semibold text-foreground">Trending Services</span>
                        </div>
                        <div className="flex gap-2">
                          {trendingServices.map((ts) => (
                            <Link
                              key={ts.id}
                              to={`/services/${ts.id}`}
                              onClick={() => setServicesOpen(false)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${ts.color} hover:opacity-90 transition-opacity flex items-center gap-1`}
                            >
                              <TrendingUp className="w-3 h-3" />
                              {ts.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      {/* Left side: Service Categories */}
                      <div className="w-1/3 border-r border-border bg-muted/30 max-h-[60vh] overflow-y-auto">
                        <div className="p-2">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${hoveredService === service.id
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                              onMouseEnter={() => setHoveredService(service.id)}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${hoveredService === service.id
                                ? "bg-primary-foreground/20"
                                : "bg-primary/10"
                                }`}>
                                <service.icon className={`w-5 h-5 ${hoveredService === service.id ? "text-primary-foreground" : "text-primary"}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium block truncate">{service.shortTitle}</span>
                              </div>
                              <ChevronDown className={`w-4 h-4 -rotate-90 ${hoveredService === service.id ? "text-primary-foreground/70" : "opacity-50"}`} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right side: Service Details Card */}
                      <div className="w-2/3 p-6 bg-card max-h-[60vh] overflow-y-auto">
                        {activeService && (
                          <div className="space-y-5">
                            {/* Service Header Card */}
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-5 border border-primary/20">
                              <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                                  <activeService.icon className="w-7 h-7 text-primary-foreground" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-foreground">{activeService.shortTitle}</h3>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {activeService.subtitle}
                                  </p>
                                  <Link
                                    to={`/services/${activeService.slug}`}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline mt-2"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    Explore Service <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Subcategories Grid */}
                            <div className="grid grid-cols-2 gap-3">
                              {activeService.subcategories.slice(0, 6).map((sub) => (
                                <Link
                                  key={sub.id}
                                  to={`/services/${activeService.slug}/${sub.id}`}
                                  className="group flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-200"
                                  onClick={() => setServicesOpen(false)}
                                >
                                  <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                                    <sub.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                  </div>
                                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{sub.title}</span>
                                </Link>
                              ))}
                            </div>

                            {/* View All Link */}
                            {activeService.subcategories.length > 6 && (
                              <Link
                                to={`/services/${activeService.slug}`}
                                onClick={() => setServicesOpen(false)}
                                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                              >
                                View all {activeService.subcategories.length} subcategories <ArrowRight className="w-4 h-4" />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-muted/50 p-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>17 Services • 100+ Subcategories</span>
                      </div>
                      <Link
                        to="/free-tools"
                        onClick={() => setServicesOpen(false)}
                        className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        Try our Free Tools <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/free-tools"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Free Tools
            </Link>
            <Link
              to="/about-us"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/case-studies"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Case Studies
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
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
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <div className="space-y-1">
                <span className="text-foreground font-semibold py-3 px-2 block">Services</span>
                <div className="space-y-1">
                  {services.map((service) => (
                    <div key={service.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/services/${service.slug}`}
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary text-sm transition-colors py-2 px-2 flex-1 rounded-lg hover:bg-muted"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <service.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium">{service.shortTitle}</span>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedServiceMobile(expandedServiceMobile === service.id ? null : service.id);
                          }}
                          className="p-3 hover:bg-muted rounded-lg"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedServiceMobile === service.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {expandedServiceMobile === service.id && (
                        <div className="pl-4 border-l-2 border-primary/20 ml-4 space-y-1 py-1">
                          {service.subcategories.map(sub => (
                            <Link
                              key={sub.id}
                              to={`/services/${service.slug}/${sub.id}`}
                              className="flex items-center gap-2 py-2 px-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
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

              <Link
                to="/free-tools"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Free Tools
              </Link>
              <Link
                to="/about-us"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/case-studies"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                to="/careers"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
