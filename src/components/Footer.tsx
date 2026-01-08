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

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Digital Bull Technology Pvt LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Optional bottom links or badges could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
