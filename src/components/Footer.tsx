import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight, Sparkles, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { motion } from "framer-motion";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Split services into two columns for desktop
  const midPoint = Math.ceil(services.length / 2);
  const servicesCol1 = services.slice(0, midPoint);
  const servicesCol2 = services.slice(midPoint);
  const links = {
    company: [{
      name: "About Us",
      href: "/about-us"
    }, {
      name: "Careers",
      href: "/careers"
    }, {
      name: "Digital Marketing Academy",
      href: "/digital-marketing-academy"
    }, {
      name: "Case Studies",
      href: "/case-studies"
    }, {
      name: "Contact",
      href: "/contact"
    }],
    legal: [{
      name: "Privacy Policy",
      href: "/privacy-policy"
    }, {
      name: "Terms of Service",
      href: "/terms-of-service"
    }, {
      name: "Cookie Policy",
      href: "/cookie-policy"
    }]
  };
  const socials = [{
    icon: Facebook,
    href: "https://www.facebook.com/share/1GGViEsE5a/?mibextid=wwXIfr",
    label: "Facebook",
    color: "hover:bg-[#1877F2]"
  }, {
    icon: Twitter,
    href: "https://x.com/digital_1221?s=21&t=gZqAEY-otu1upyCHIOj4Uw",
    label: "Twitter",
    color: "hover:bg-[#1DA1F2]"
  }, {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/digitalbulltechnology/",
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2]"
  }, {
    icon: Instagram,
    href: "https://www.instagram.com/digitalbulltechnology?igsh=MWxjbTJtMHkxNTBoNg==",
    label: "Instagram",
    color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]"
  }];
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/3 to-transparent rounded-full" />
      </div>

      {/* Top CTA Section */}
      <div className="relative border-b border-slate-800/50">
        <div className="container mx-auto px-4 py-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Stay Updated</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-slate-400 max-w-md">
                Get the latest digital marketing insights, tips, and trends delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full sm:w-80 px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              </div>
              <motion.button type="submit" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all">
                {isSubscribed ? <>
                    <span>Subscribed!</span>
                    <Sparkles className="w-4 h-4" />
                  </> : <>
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Socials */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <img src="/dibull_logo.png" alt="Digital Bull Logo" className="w-12 h-12 rounded-xl shadow-lg" />
                <div className="absolute inset-0 rounded-xl bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Digital Bull
                </span>
                <p className="text-xs text-slate-500">Technology Pvt Ltd</p>
              </div>
            </Link>
            
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Transforming businesses through innovative digital marketing strategies.
              Your growth is our mission, your success is our story.
            </p>

            <div className="flex gap-3">
              {socials.map((social, index) => <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" initial={{
              opacity: 0,
              scale: 0.5
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} whileHover={{
              scale: 1.1,
              y: -3
            }} className={`w-11 h-11 bg-slate-800/80 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-transparent hover:shadow-lg ${social.color}`} aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </motion.a>)}
            </div>

            {/* Contact Info - Desktop */}
            <div className="hidden lg:block space-y-4 pt-6 border-t border-slate-800/50">
              <motion.div whileHover={{
              x: 5
            }} className="flex items-start gap-4 text-slate-400 group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-1">Our Office</p>
                  <p className="text-sm leading-relaxed">
                    A 823 Moneyplant High Street,<br />
                    Jagatpur Road, Near GOTA Cross Road,<br />
                    Ahmedabad, Gujarat
                  </p>
                </div>
              </motion.div>

              <motion.a href="tel:+919824011921" whileHover={{
              x: 5
            }} className="flex items-center gap-4 text-slate-400 group">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-0.5">Call Us</p>
                  <p className="text-sm group-hover:text-green-400 transition-colors">+91-98240-11921</p>
                </div>
              </motion.a>

              <motion.a href="mailto:info@dibull.com" whileHover={{
              x: 5
            }} className="flex items-center gap-4 text-slate-400 group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300 mb-0.5">Email Us</p>
                  <p className="text-sm group-hover:text-purple-400 transition-colors">info@dibull.com</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid lg:col-span-8 lg:grid-cols-4 gap-8">
            {/* Services Column 1 */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                Services
              </h4>
              <ul className="space-y-3">
                {servicesCol1.map(service => <li key={service.id}>
                    <Link to={`/services/${service.slug}`} className="text-slate-400 hover:text-blue-400 transition-all text-sm flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{service.shortTitle}</span>
                    </Link>
                  </li>)}
              </ul>
            </motion.div>

            {/* Services Column 2 */}
            <motion.div variants={itemVariants} className="lg:col-span-1 pt-0">
              <div className="h-[52px]" aria-hidden="true" />
              <ul className="space-y-3">
                {servicesCol2.map(service => <li key={service.id}>
                    <Link to={`/services/${service.slug}`} className="text-slate-400 hover:text-blue-400 transition-all text-sm flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{service.shortTitle}</span>
                    </Link>
                  </li>)}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full" />
                Company
              </h4>
              <ul className="space-y-3">
                {links.company.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-slate-400 hover:text-green-400 transition-all text-sm flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>)}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
                Legal
              </h4>
              <ul className="space-y-3">
                {links.legal.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-slate-400 hover:text-purple-400 transition-all text-sm flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>)}
              </ul>
            </motion.div>
          </div>

          {/* Mobile Layout - Accordion */}
          <div className="lg:hidden col-span-full">
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="services" className="border border-slate-800/50 rounded-xl px-4 bg-slate-900/30">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-blue-400 hover:no-underline py-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Services
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2 pb-4">
                    {services.map(service => <Link key={service.id} to={`/services/${service.slug}`} className="text-slate-400 hover:text-blue-400 transition-colors py-2 block text-sm pl-4 border-l-2 border-slate-800 hover:border-blue-500">
                        {service.shortTitle}
                      </Link>)}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="company" className="border border-slate-800/50 rounded-xl px-4 bg-slate-900/30">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-green-400 hover:no-underline py-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Company
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-4">
                    {links.company.map(link => <li key={link.name}>
                        <Link to={link.href} className="text-slate-400 hover:text-green-400 transition-colors text-sm block py-2 pl-4 border-l-2 border-slate-800 hover:border-green-500">
                          {link.name}
                        </Link>
                      </li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legal" className="border border-slate-800/50 rounded-xl px-4 bg-slate-900/30">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-purple-400 hover:no-underline py-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Legal
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-4">
                    {links.legal.map(link => <li key={link.name}>
                        <Link to={link.href} className="text-slate-400 hover:text-purple-400 transition-colors text-sm block py-2 pl-4 border-l-2 border-slate-800 hover:border-purple-500">
                          {link.name}
                        </Link>
                      </li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact" className="border border-slate-800/50 rounded-xl px-4 bg-slate-900/30">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-blue-400 hover:no-underline py-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    Contact Info
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pb-4">
                    <div className="flex items-start gap-3 text-slate-400 p-3 bg-slate-800/30 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">
                        A 823 Moneyplant High Street,<br />
                        Jagatpur Road, Near GOTA Cross Road,<br />
                        Ahmedabad, Gujarat
                      </p>
                    </div>
                    <a href="tel:+919824011921" className="flex items-center gap-3 text-slate-400 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">+91-98240-11921</span>
                    </a>
                    <a href="mailto:info@dibull.com" className="flex items-center gap-3 text-slate-400 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <span className="text-sm">info@dibull.com</span>
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>

        {/* Trust Badges / Certifications */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="py-10 border-t border-slate-800/50">
          <p className="text-center text-slate-500 text-sm mb-8 flex items-center justify-center gap-2">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-slate-700" />
            Certified Partner & Technology Expertise
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-slate-700" />
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {[{
            name: "Google Partner",
            icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
          }, {
            name: "Meta Partner",
            icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2" />
                  </svg>
          }, {
            name: "Microsoft Ads",
            icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M11.4 11.4H2V2h9.4v9.4z" fill="#F25022" />
                    <path d="M22 11.4h-9.4V2H22v9.4z" fill="#7FBA00" />
                    <path d="M11.4 22H2v-9.4h9.4V22z" fill="#00A4EF" />
                    <path d="M22 22h-9.4v-9.4H22V22z" fill="#FFB900" />
                  </svg>
          }, {
            name: "LinkedIn Marketing",
            icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2" />
                  </svg>
          }, {
            name: "AI Powered",
            icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F" />
                  </svg>
          }].map((badge, index) => <motion.div key={badge.name} initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            scale: 1.05,
            y: -2
          }} className="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all shadow-lg cursor-default">
                {badge.icon}
                <span className="text-slate-300 text-sm font-medium">{badge.name}</span>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} <span className="text-slate-400">Digital Bull Technology Pvt LTD</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-slate-600 text-xs">
              <span className="px-2 py-1 bg-slate-800/50 rounded text-blue-50">Google Partner</span>
              <span className="px-2 py-1 bg-slate-800/50 rounded text-blue-50">Meta Business Partner</span>
              <span className="px-2 py-1 bg-slate-800/50 rounded hidden sm:inline text-blue-50">Microsoft Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;