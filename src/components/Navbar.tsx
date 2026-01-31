import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight, Sparkles, TrendingUp, Flame, GraduationCap, Wrench, Building2, BookOpen, Users, Phone, Briefcase } from "lucide-react";
import { services } from "@/data/services";
import { motion, AnimatePresence } from "framer-motion";
const trendingServices = [{
  id: "ai-marketing",
  label: "AI Marketing",
  color: "from-purple-500 to-pink-500"
}, {
  id: "seo",
  label: "SEO Services",
  color: "from-blue-500 to-cyan-500"
}, {
  id: "ppc",
  label: "PPC Advertising",
  color: "from-orange-500 to-red-500"
}];
const companyLinks = [{
  to: "/about-us",
  label: "About Us",
  icon: Building2,
  description: "Our story & mission"
}, {
  to: "/our-verticals",
  label: "Our Verticals",
  icon: Briefcase,
  description: "Specialized platforms"
}, {
  to: "/case-studies",
  label: "Case Studies",
  icon: BookOpen,
  description: "Success stories"
}, {
  to: "/careers",
  label: "Careers",
  icon: Users,
  description: "Join our team"
}];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [expandedServiceMobile, setExpandedServiceMobile] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setServicesOpen(false);
    setCompanyOpen(false);
    setIsOpen(false);
  }, [location.pathname]);
  const getHref = (hash: string) => {
    return isHomePage ? hash : `/${hash}`;
  };
  const activeService = services.find(s => s.id === hoveredService) || services[0];
  const navLinkClass = (isActive: boolean = false) => `relative text-sm font-medium transition-all duration-300 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`;
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5" : "bg-background/80 backdrop-blur-lg border-b border-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.img src="/dibull_logo.png" alt="Digital Bull Logo" className="w-10 h-10 rounded-xl shadow-md group-hover:shadow-lg transition-shadow" whileHover={{
            scale: 1.05,
            rotate: 5
          }} transition={{
            type: "spring",
            stiffness: 400
          }} />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-extrabold text-base">
              
              Digital Bull Technology Pvt Ltd   
  

              

            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link to="/" className={`px-4 py-2 rounded-lg ${navLinkClass(location.pathname === "/")}`}>
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => {
            setServicesOpen(true);
            setCompanyOpen(false);
            if (!hoveredService) setHoveredService(services[0].id);
          }} onMouseLeave={() => setServicesOpen(false)}>
              <button className={`flex items-center gap-1.5 px-4 py-2 rounded-lg ${navLinkClass(location.pathname.includes("/services"))}`}>
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && <motion.div className="absolute top-full left-1/2 -translate-x-1/2 pt-3" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden w-[900px]">
                      {/* Header with Trending */}
                      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 border-b border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <motion.div animate={{
                          scale: [1, 1.2, 1]
                        }} transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}>
                              <Flame className="w-5 h-5 text-orange-500" />
                            </motion.div>
                            <span className="font-semibold text-foreground">Trending Services</span>
                          </div>
                          <div className="flex gap-2">
                            {trendingServices.map((ts, index) => <motion.div key={ts.id} initial={{
                          opacity: 0,
                          x: 10
                        }} animate={{
                          opacity: 1,
                          x: 0
                        }} transition={{
                          delay: index * 0.1
                        }}>
                                <Link to={`/services/${ts.id}`} onClick={() => setServicesOpen(false)} className={`px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${ts.color} hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1`}>
                                  <TrendingUp className="w-3 h-3" />
                                  {ts.label}
                                </Link>
                              </motion.div>)}
                          </div>
                        </div>
                      </div>

                      <div className="flex">
                        {/* Left side: Service Categories */}
                        <div className="w-1/3 border-r border-border bg-muted/30 max-h-[60vh] overflow-y-auto">
                          <div className="p-2">
                            {services.map((service, index) => <motion.div key={service.id} initial={{
                          opacity: 0,
                          x: -10
                        }} animate={{
                          opacity: 1,
                          x: 0
                        }} transition={{
                          delay: index * 0.02
                        }} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${hoveredService === service.id ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`} onMouseEnter={() => setHoveredService(service.id)}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${hoveredService === service.id ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
                                  <service.icon className={`w-5 h-5 ${hoveredService === service.id ? "text-primary-foreground" : "text-primary"}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium block truncate">{service.shortTitle}</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 -rotate-90 ${hoveredService === service.id ? "text-primary-foreground/70" : "opacity-50"}`} />
                              </motion.div>)}
                          </div>
                        </div>

                        {/* Right side: Service Details Card */}
                        <div className="w-2/3 p-6 bg-card max-h-[60vh] overflow-y-auto">
                          <AnimatePresence mode="wait">
                            {activeService && <motion.div key={activeService.id} initial={{
                          opacity: 0,
                          y: 10
                        }} animate={{
                          opacity: 1,
                          y: 0
                        }} exit={{
                          opacity: 0,
                          y: -10
                        }} transition={{
                          duration: 0.2
                        }} className="space-y-5">
                                {/* Service Header Card */}
                                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-5 border border-primary/20">
                                  <div className="flex items-start gap-4">
                                    <motion.div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg" whileHover={{
                                scale: 1.1,
                                rotate: 5
                              }}>
                                      <activeService.icon className="w-7 h-7 text-primary-foreground" />
                                    </motion.div>
                                    <div className="flex-1">
                                      <h3 className="text-lg font-bold text-foreground">{activeService.shortTitle}</h3>
                                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                        {activeService.subtitle}
                                      </p>
                                      <Link to={`/services/${activeService.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline mt-2 group" onClick={() => setServicesOpen(false)}>
                                        Explore Service 
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>

                                {/* Subcategories Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                  {activeService.subcategories.slice(0, 6).map((sub, index) => <motion.div key={sub.id} initial={{
                              opacity: 0,
                              y: 5
                            }} animate={{
                              opacity: 1,
                              y: 0
                            }} transition={{
                              delay: index * 0.05
                            }}>
                                      <Link to={`/services/${activeService.slug}/${sub.id}`} className="group flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-200" onClick={() => setServicesOpen(false)}>
                                        <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                                          <sub.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                          {sub.title}
                                        </span>
                                      </Link>
                                    </motion.div>)}
                                </div>

                                {/* View All Link */}
                                {activeService.subcategories.length > 6 && <Link to={`/services/${activeService.slug}`} onClick={() => setServicesOpen(false)} className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline group">
                                    View all {activeService.subcategories.length} subcategories 
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </Link>}
                              </motion.div>}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="bg-muted/50 p-4 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span>17 Services • 100+ Subcategories</span>
                        </div>
                        <Link to="/free-tools" onClick={() => setServicesOpen(false)} className="text-sm font-medium text-primary hover:underline flex items-center gap-1 group">
                          Try our Free Tools 
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div>

            {/* Free Tools */}
            <Link to="/free-tools" className={`flex items-center gap-1.5 px-4 py-2 rounded-lg ${navLinkClass(location.pathname === "/free-tools")}`}>
              <Wrench className="w-4 h-4" />
              Free Tools
            </Link>

            {/* Academy - Highlighted */}
            <Link to="/digital-marketing-academy" className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg ${location.pathname.includes("/digital-marketing-academy") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"} transition-all duration-300`}>
              <GraduationCap className="w-4 h-4" />
              Academy
              <motion.span className="absolute -top-1 -right-1 text-[9px] bg-gradient-to-r from-primary to-accent text-white px-1.5 py-0.5 rounded-full font-bold shadow-md" animate={{
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                NEW
              </motion.span>
            </Link>

            {/* Company Dropdown */}
            <div className="relative" onMouseEnter={() => {
            setCompanyOpen(true);
            setServicesOpen(false);
          }} onMouseLeave={() => setCompanyOpen(false)}>
              <button className={`flex items-center gap-1.5 px-4 py-2 rounded-lg ${navLinkClass(["/about-us", "/our-verticals", "/case-studies", "/careers"].some(p => location.pathname === p))}`}>
                Company
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {companyOpen && <motion.div className="absolute top-full right-0 pt-3" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden w-64">
                      <div className="p-2">
                        {companyLinks.map((link, index) => <motion.div key={link.to} initial={{
                      opacity: 0,
                      x: -10
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      delay: index * 0.05
                    }}>
                            <Link to={link.to} onClick={() => setCompanyOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors group">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <link.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block">
                                  {link.label}
                                </span>
                                <span className="text-xs text-muted-foreground">{link.description}</span>
                              </div>
                            </Link>
                          </motion.div>)}
                      </div>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div>

            {/* Blog */}
            <Link to="/blog" className={`flex items-center gap-1.5 px-4 py-2 rounded-lg ${navLinkClass(location.pathname.includes("/blog"))}`}>
              <BookOpen className="w-4 h-4" />
              Blog
            </Link>

            {/* Contact */}
            <Link to="/contact" className={`flex items-center gap-1.5 px-4 py-2 rounded-lg ${navLinkClass(location.pathname === "/contact")}`}>
              <Phone className="w-4 h-4" />
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <Button variant="hero" className="shadow-lg shadow-primary/25" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button className="lg:hidden p-2.5 text-foreground rounded-lg hover:bg-muted transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" whileTap={{
          scale: 0.95
        }}>
            <AnimatePresence mode="wait">
              {isOpen ? <motion.div key="close" initial={{
              rotate: -90,
              opacity: 0
            }} animate={{
              rotate: 0,
              opacity: 1
            }} exit={{
              rotate: 90,
              opacity: 0
            }} transition={{
              duration: 0.2
            }}>
                  <X className="w-6 h-6" />
                </motion.div> : <motion.div key="menu" initial={{
              rotate: 90,
              opacity: 0
            }} animate={{
              rotate: 0,
              opacity: 1
            }} exit={{
              rotate: -90,
              opacity: 0
            }} transition={{
              duration: 0.2
            }}>
                  <Menu className="w-6 h-6" />
                </motion.div>}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && <motion.div className="lg:hidden py-4 border-t border-border bg-background max-h-[85vh] overflow-y-auto" initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: "auto"
        }} exit={{
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.3
        }}>
              <div className="flex flex-col gap-1">
                <Link to="/" className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted" onClick={() => setIsOpen(false)}>
                  Home
                </Link>

                {/* Mobile Services Accordion */}
                <div className="space-y-1">
                  <span className="text-foreground font-semibold py-3 px-4 block flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Services
                  </span>
                  <div className="space-y-1 ml-2">
                    {services.map(service => <div key={service.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Link to={`/services/${service.slug}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary text-sm transition-colors py-2.5 px-3 flex-1 rounded-lg hover:bg-muted" onClick={() => setIsOpen(false)}>
                            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                              <service.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium">{service.shortTitle}</span>
                          </Link>
                          <button onClick={e => {
                      e.preventDefault();
                      setExpandedServiceMobile(expandedServiceMobile === service.id ? null : service.id);
                    }} className="p-3 hover:bg-muted rounded-lg">
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedServiceMobile === service.id ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        <AnimatePresence>
                          {expandedServiceMobile === service.id && <motion.div className="pl-4 border-l-2 border-primary/20 ml-4 space-y-1 py-1" initial={{
                      opacity: 0,
                      height: 0
                    }} animate={{
                      opacity: 1,
                      height: "auto"
                    }} exit={{
                      opacity: 0,
                      height: 0
                    }} transition={{
                      duration: 0.2
                    }}>
                              {service.subcategories.map(sub => <Link key={sub.id} to={`/services/${service.slug}/${sub.id}`} className="flex items-center gap-2 py-2.5 px-3 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted" onClick={() => setIsOpen(false)}>
                                  <sub.icon className="w-4 h-4" />
                                  {sub.title}
                                </Link>)}
                            </motion.div>}
                        </AnimatePresence>
                      </div>)}
                  </div>
                </div>

                <Link to="/free-tools" className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted" onClick={() => setIsOpen(false)}>
                  <Wrench className="w-4 h-4 text-primary" />
                  Free Tools
                </Link>

                <Link to="/digital-marketing-academy" className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted" onClick={() => setIsOpen(false)}>
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span>Academy</span>
                  <span className="text-[9px] bg-gradient-to-r from-primary to-accent text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                </Link>

                {/* Company Section */}
                <div className="space-y-1">
                  <span className="text-foreground font-semibold py-3 px-4 block flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Company
                  </span>
                  <div className="space-y-1 ml-2">
                    {companyLinks.map(link => <Link key={link.to} to={link.to} className="flex items-center gap-3 text-muted-foreground hover:text-primary text-sm transition-colors py-2.5 px-3 rounded-lg hover:bg-muted" onClick={() => setIsOpen(false)}>
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                          <link.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">{link.label}</span>
                          <span className="text-xs text-muted-foreground">{link.description}</span>
                        </div>
                      </Link>)}
                  </div>
                </div>

                <Link to="/blog" className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted" onClick={() => setIsOpen(false)}>
                  <BookOpen className="w-4 h-4 text-primary" />
                  Blog
                </Link>

                <Link to="/contact" className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted" onClick={() => setIsOpen(false)}>
                  <Phone className="w-4 h-4 text-primary" />
                  Contact
                </Link>

                {/* Mobile CTA */}
                <div className="flex flex-col gap-3 pt-4 mt-3 border-t border-border px-2">
                  <Button variant="hero" size="lg" className="w-full shadow-lg" asChild>
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </nav>;
};
export default Navbar;