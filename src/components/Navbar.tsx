import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";
import {
  Rocket,
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  GraduationCap,
  Wrench,
  Building2,
  BookOpen,
  Users,
  Phone,
  Briefcase,
  Sun,
  Moon,
  Languages,
} from "lucide-react";
import { services } from "@/data/services";
import { motion, AnimatePresence } from "framer-motion";

const trendingServices = [
  { id: "ai-marketing", label: "AI Marketing", color: "from-purple-500 to-pink-500" },
  { id: "seo", label: "SEO Services", color: "from-blue-500 to-cyan-500" },
  { id: "ppc", label: "PPC Advertising", color: "from-orange-500 to-red-500" },
];

const companyLinks = [
  { to: "/about-us", label: "About Us", icon: Building2, description: "Our story & mission" },
  { to: "/our-verticals", label: "Our Verticals", icon: Briefcase, description: "Specialized platforms" },
  { to: "/case-studies", label: "Case Studies", icon: BookOpen, description: "Success stories" },
  { to: "/careers", label: "Careers", icon: Users, description: "Join our team" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [expandedServiceMobile, setExpandedServiceMobile] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
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

  const navLinkClass = (isActive: boolean = false) => 
    `relative text-sm font-medium transition-all duration-300 ${
      isActive 
        ? "text-primary bg-primary/10" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
    }`;

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]" 
          : "bg-background/50 backdrop-blur-xl border-b border-transparent"
      }`}
    >
      {/* Top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <img 
                src="/dibull_logo.png" 
                alt="Digital Bull Logo" 
                className="w-12 h-12 object-contain drop-shadow-md"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                Digital Bull
              </span>
              <span className="text-[9px] text-muted-foreground font-semibold tracking-[0.2em] uppercase leading-none mt-0.5">
                Technology Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 bg-muted/30 backdrop-blur-sm rounded-full px-1.5 py-1 border border-border/30">
              {/* Home */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                Home
              </Link>

              {/* Services Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setServicesOpen(true);
                  setCompanyOpen(false);
                  if (!hoveredService) setHoveredService(services[0].id);
                }}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button 
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname.includes("/services")
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                  }`}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div 
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden w-[880px]">
                        {/* Trending bar */}
                        <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-5 py-3 border-b border-border/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Flame className="w-4 h-4 text-destructive" />
                              <span className="text-sm font-semibold text-foreground">Trending</span>
                            </div>
                            <div className="flex gap-2">
                              {trendingServices.map((ts) => (
                                <Link
                                  key={ts.id}
                                  to={`/services/${ts.id}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                                >
                                  {ts.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex">
                          {/* Left: Category list */}
                          <div className="w-[280px] border-r border-border/50 bg-muted/20 max-h-[55vh] overflow-y-auto py-2 px-2">
                            {services.map((service) => (
                              <div
                                key={service.id}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                                  hoveredService === service.id
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                                onMouseEnter={() => setHoveredService(service.id)}
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  hoveredService === service.id ? "bg-primary-foreground/20" : "bg-primary/10"
                                }`}>
                                  <service.icon className={`w-4 h-4 ${hoveredService === service.id ? "text-primary-foreground" : "text-primary"}`} />
                                </div>
                                <span className="text-sm font-medium flex-1 truncate">{service.shortTitle}</span>
                                <ArrowRight className={`w-3.5 h-3.5 ${hoveredService === service.id ? "text-primary-foreground/70" : "opacity-0"} transition-opacity`} />
                              </div>
                            ))}
                          </div>

                          {/* Right: Detail panel */}
                          <div className="flex-1 p-5 max-h-[55vh] overflow-y-auto">
                            <AnimatePresence mode="wait">
                              {activeService && (
                                <motion.div 
                                  key={activeService.id}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.15 }}
                                  className="space-y-4"
                                >
                                  {/* Header */}
                                  <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                                    <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                                      <activeService.icon className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-base font-bold text-foreground">{activeService.shortTitle}</h3>
                                      <p className="text-xs text-muted-foreground line-clamp-1">{activeService.subtitle}</p>
                                    </div>
                                    <Link
                                      to={`/services/${activeService.slug}`}
                                      onClick={() => setServicesOpen(false)}
                                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 group flex-shrink-0"
                                    >
                                      View All
                                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                  </div>

                                  {/* Subcategories */}
                                  <div className="grid grid-cols-2 gap-2">
                                    {activeService.subcategories.slice(0, 8).map((sub, index) => (
                                      <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.03 }}
                                      >
                                        <Link
                                          to={`/services/${activeService.slug}/${sub.id}`}
                                          className="group flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted/60 transition-all duration-200"
                                          onClick={() => setServicesOpen(false)}
                                        >
                                          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                                            <sub.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                          </div>
                                          <span className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                            {sub.title}
                                          </span>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-muted/30 px-5 py-3 border-t border-border/50 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            20 Services • 100+ Subcategories
                          </span>
                          <Link
                            to="/free-tools"
                            onClick={() => setServicesOpen(false)}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 group"
                          >
                            Free Tools
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Growth Strategy */}
              <Link
                to="/growth-strategy"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/growth-strategy"
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                Strategy
              </Link>

              {/* Free Tools */}
              <Link
                to="/free-tools"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/free-tools"
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                Tools
              </Link>

              {/* Academy */}
              <Link
                to="/digital-marketing-academy"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname.includes("/digital-marketing-academy")
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                Academy
                <span className="absolute -top-1.5 -right-1 text-[8px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full font-bold leading-none">
                  NEW
                </span>
              </Link>

              {/* Company Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setCompanyOpen(true);
                  setServicesOpen(false);
                }}
                onMouseLeave={() => setCompanyOpen(false)}
              >
                <button 
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    ["/about-us", "/our-verticals", "/case-studies", "/careers"].some(p => location.pathname === p)
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                  }`}
                >
                  Company
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${companyOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {companyOpen && (
                    <motion.div 
                      className="absolute top-full right-0 pt-4"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden w-56">
                        <div className="py-1.5 px-1.5">
                          {companyLinks.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              onClick={() => setCompanyOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <link.icon className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block leading-tight">
                                  {link.label}
                                </span>
                                <span className="text-[11px] text-muted-foreground leading-tight">{link.description}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blog */}
              <Link
                to="/blog"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname.includes("/blog")
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                Blog
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/contact"
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-1.5">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                title="Change language"
              >
                <Languages className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-xl p-1 min-w-[80px] z-50"
                  >
                    {(Object.keys(languages) as Array<keyof typeof languages>).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang as "en" | "hi" | "gu"); setLangOpen(false); }}
                        className={`w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                          language === lang ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {languages[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="hero" size="sm" className="shadow-lg shadow-primary/25 rounded-full px-5 h-9" asChild>
                <Link to="/contact">
                  <Rocket className="w-3.5 h-3.5 mr-1.5" />
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2.5 text-foreground rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="lg:hidden py-4 border-t border-border bg-background max-h-[85vh] overflow-y-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>

                {/* Mobile Services Accordion */}
                <div className="space-y-1">
                  <span className="text-foreground font-semibold py-3 px-4 block flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Services
                  </span>
                  <div className="space-y-1 ml-2">
                    {services.map((service) => (
                      <div key={service.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/services/${service.slug}`}
                            className="flex items-center gap-3 text-muted-foreground hover:text-primary text-sm transition-colors py-2.5 px-3 flex-1 rounded-lg hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
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
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedServiceMobile === service.id ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        <AnimatePresence>
                          {expandedServiceMobile === service.id && (
                            <motion.div 
                              className="pl-4 border-l-2 border-primary/20 ml-4 space-y-1 py-1"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {service.subcategories.map(sub => (
                                <Link
                                  key={sub.id}
                                  to={`/services/${service.slug}/${sub.id}`}
                                  className="flex items-center gap-2 py-2.5 px-3 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <sub.icon className="w-4 h-4" />
                                  {sub.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/growth-strategy"
                  className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  <Rocket className="w-4 h-4 text-primary" />
                  Growth Strategy
                </Link>

                <Link
                  to="/free-tools"
                  className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  <Wrench className="w-4 h-4 text-primary" />
                  Free Tools
                </Link>

                <Link
                  to="/digital-marketing-academy"
                  className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
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
                    {companyLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary text-sm transition-colors py-2.5 px-3 rounded-lg hover:bg-muted"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                          <link.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium block">{link.label}</span>
                          <span className="text-xs text-muted-foreground">{link.description}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/blog"
                  className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="w-4 h-4 text-primary" />
                  Blog
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-3 text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-xl hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Contact
                </Link>

                {/* Mobile Theme & Language */}
                <div className="flex items-center gap-3 pt-4 mt-3 border-t border-border px-2">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
                  </button>
                  <div className="flex gap-1">
                    {(Object.keys(languages) as Array<keyof typeof languages>).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang as "en" | "hi" | "gu")}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          language === lang ? "bg-primary/10 text-primary" : "bg-muted/60 text-muted-foreground"
                        }`}
                      >
                        {languages[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="flex flex-col gap-3 pt-3 px-2">
                  <Button variant="hero" size="lg" className="w-full shadow-lg" asChild>
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;