import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Split services into two columns for desktop
  const midPoint = Math.ceil(services.length / 2);
  const servicesCol1 = services.slice(0, midPoint);
  const servicesCol2 = services.slice(midPoint);

  const links = {
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "Careers", href: "/careers" },
      { name: "Digital Marketing Classes", href: "/digital-marketing-classes" },
      // { name: "Blog", href: "#" }, // Not requested yet
      { name: "Case Studies", href: "/case-studies" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  };

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/share/1GGViEsE5a/?mibextid=wwXIfr", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/digital_1221?s=21&t=gZqAEY-otu1upyCHIOj4Uw", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/digitalbulltechnology/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/digitalbulltechnology?igsh=MWxjbTJtMHkxNTBoNg==", label: "Instagram" },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Socials - Always visible */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="/dibull_logo.png" alt="Digital Bull Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold text-white">Digital Bull</span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Transforming businesses through innovative digital marketing strategies.
              Your growth is our mission.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="hidden lg:block space-y-4 pt-4 border-t border-slate-800/50">
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <p className="text-sm leading-relaxed">
                  A 823 Moneyplant High street Jagatpur Road,<br />
                  Near GOTA Cross road Ahmedabad
                </p>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="tel:+919824011921" className="text-sm hover:text-blue-400 transition-colors">
                  +91-98240-11921
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="mailto:cadbull2014@gmail.com" className="text-sm hover:text-blue-400 transition-colors">
                  cadbull2014@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid lg:col-span-8 lg:grid-cols-4 gap-8">
            {/* Services Column 1 */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                {servicesCol1.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm hover:translate-x-1 block duration-200"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column 2 */}
            <div className="lg:col-span-1 pt-0">
              {/* Spacer for alignment with 'Services' header */}
              <div className="h-[52px]" aria-hidden="true" /> {/* Approximate height of header + margin */}
              <ul className="space-y-3">
                {servicesCol2.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm hover:translate-x-1 block duration-200"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm hover:translate-x-1 block duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-lg mb-6 text-white">Legal</h4>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm hover:translate-x-1 block duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Layout - Accordion */}
          <div className="lg:hidden col-span-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="services" className="border-slate-800">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-blue-400 hover:no-underline">Services</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2 pt-2 pb-4">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className="text-slate-400 hover:text-blue-400 transition-colors py-2 block text-sm"
                      >
                        {service.shortTitle}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="company" className="border-slate-800">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-blue-400 hover:no-underline">Company</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pt-2 pb-4">
                    {links.company.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-slate-400 hover:text-blue-400 transition-colors text-sm block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legal" className="border-slate-800">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-blue-400 hover:no-underline">Legal</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pt-2 pb-4">
                    {links.legal.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-slate-400 hover:text-blue-400 transition-colors text-sm block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact" className="border-slate-800">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-blue-400 hover:no-underline">Contact Info</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2 pb-4">
                    <div className="flex items-start gap-3 text-slate-400">
                      <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                      <p className="text-sm leading-relaxed">
                        A 823 Moneyplant High street Jagatpur Road,<br />
                        Near GOTA Cross road Ahmedabad
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <a href="tel:+919824011921" className="text-sm hover:text-blue-400 transition-colors">
                        +91-98240-11921
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <a href="mailto:cadbull2014@gmail.com" className="text-sm hover:text-blue-400 transition-colors">
                        cadbull2014@gmail.com
                      </a>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Trust Badges / Certifications */}
        <div className="py-8 border-t border-slate-800">
          <p className="text-center text-slate-500 text-sm mb-6">Certified Partner & Technology Expertise</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {/* Google Partner */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-slate-400 text-sm font-medium">Google Partner</span>
            </div>

            {/* Meta Partner */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2"/>
              </svg>
              <span className="text-slate-400 text-sm font-medium">Meta Partner</span>
            </div>

            {/* Microsoft */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M11.4 11.4H2V2h9.4v9.4z" fill="#F25022"/>
                <path d="M22 11.4h-9.4V2H22v9.4z" fill="#7FBA00"/>
                <path d="M11.4 22H2v-9.4h9.4V22z" fill="#00A4EF"/>
                <path d="M22 22h-9.4v-9.4H22V22z" fill="#FFB900"/>
              </svg>
              <span className="text-slate-400 text-sm font-medium">Microsoft Ads</span>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
              </svg>
              <span className="text-slate-400 text-sm font-medium">LinkedIn Marketing</span>
            </div>

            {/* ChatGPT / OpenAI */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/>
              </svg>
              <span className="text-slate-400 text-sm font-medium">AI Powered</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Digital Bull Technology Pvt LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <span>Google Partner</span>
            <span>•</span>
            <span>Meta Business Partner</span>
            <span>•</span>
            <span>Microsoft Advertising Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
