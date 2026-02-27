import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import NotFound from "@/pages/NotFound";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Code, Figma, Palette, Smartphone, Monitor, Zap,
  Globe, Shield, Layers, Eye, CheckCircle2, Star, Rocket,
  Layout, MousePointer2, RefreshCcw, Server
} from "lucide-react";
import LazyImage from "@/components/LazyImage";

import akyca from "@/assets/portfolio/akyca.webp";
import betterviewtourism from "@/assets/portfolio/betterviewtourism.webp";
import cadbull from "@/assets/portfolio/cadbull.webp";
import dreamdecor from "@/assets/portfolio/dreamdecor.webp";
import gujaratvoyage from "@/assets/portfolio/gujaratvoyage.webp";
import handbricks from "@/assets/portfolio/handbricks.webp";
import hireforjob from "@/assets/portfolio/hireforjob.webp";
import rentalyacht from "@/assets/portfolio/rentalyacht.webp";
import tapovanschool from "@/assets/portfolio/tapovanschool.webp";

const portfolio = [
  { name: "Cadbull", category: "CAD Platform", image: cadbull, url: "https://cadbull.com" },
  { name: "HireForJob", category: "Job Portal", image: hireforjob, url: "https://hireforjob.com" },
  { name: "Gujarat Voyage", category: "Tourism", image: gujaratvoyage, url: "https://gujaratvoyage.com" },
  { name: "Better View Tourism", category: "Travel", image: betterviewtourism, url: "https://betterviewtourism.com" },
  { name: "Dream Decor", category: "Interior Design", image: dreamdecor, url: "https://dreamdecor.in" },
  { name: "Handbricks", category: "E-commerce", image: handbricks, url: "https://handbricks.com" },
  { name: "Akyca", category: "Corporate", image: akyca, url: "https://akyca.com" },
  { name: "Rental Yacht", category: "Luxury Services", image: rentalyacht, url: "https://rentalyacht.in" },
  { name: "Tapovan School", category: "Education", image: tapovanschool, url: "https://tapovanschool.com" },
];

const techStack = [
  { name: "React", icon: Code, desc: "Component-based UI" },
  { name: "WordPress", icon: Layout, desc: "CMS Solutions" },
  { name: "Shopify", icon: Globe, desc: "E-commerce" },
  { name: "Next.js", icon: Server, desc: "Server-side Rendering" },
  { name: "Tailwind CSS", icon: Palette, desc: "Utility-first Styling" },
  { name: "Figma", icon: Eye, desc: "Design Prototyping" },
];

const designProcess = [
  { step: "01", title: "Discovery & Research", desc: "We analyze your brand, audience, competitors, and goals to define the project scope.", duration: "1–2 Days", color: "from-blue-500 to-cyan-500" },
  { step: "02", title: "Wireframing & UX", desc: "Craft user flows and wireframes to map out the ideal user experience.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
  { step: "03", title: "Visual Design", desc: "Create pixel-perfect mockups with your brand identity, typography, and color palette.", duration: "5–7 Days", color: "from-amber-500 to-orange-500" },
  { step: "04", title: "Development", desc: "Build responsive, SEO-optimized code with modern frameworks and best practices.", duration: "7–14 Days", color: "from-green-500 to-emerald-500" },
  { step: "05", title: "Testing & Launch", desc: "Rigorous QA across devices, performance optimization, and smooth deployment.", duration: "2–3 Days", color: "from-rose-500 to-red-500" },
];

const webDesignFaqs = [
  { icon: Smartphone, q: "Is my website mobile-responsive?", a: "Absolutely. Every website we build is mobile-first and fully responsive across all screen sizes." },
  { icon: Zap, q: "How fast will my website load?", a: "We optimize for sub-2-second load times using lazy loading, CDNs, image compression, and clean code." },
  { icon: Shield, q: "Do you provide SSL and security?", a: "Yes, all our websites include free SSL certificates, security headers, and best-practice hardening." },
  { icon: RefreshCcw, q: "Can I update the website myself?", a: "We build on user-friendly CMS platforms or provide a custom admin panel so you can easily manage content." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }
  })
};

const WebDesignExtraSection = () => (
  <>
    {/* Portfolio Showcase */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Websites That <span className="text-gradient">Impress & Convert</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real projects. Real results. Browse our latest web design work across industries.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-2xl transition-all"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6 }}
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <LazyImage
                  src={project.image}
                  alt={`${project.name} website design by Digital Bull Technology`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    {/* Technology Stack */}
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
            Technologies We Use
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built with <span className="text-gradient">Modern Tech</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We use the latest technologies and frameworks to build fast, scalable, and secure websites.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4, scale: 1.03 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <tech.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-bold text-foreground text-sm">{tech.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Design Process Timeline */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Our Design Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Concept to <span className="text-gradient">Launch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A transparent, milestone-driven workflow that keeps you in the loop at every stage.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical connector */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {designProcess.map((step, i) => (
              <motion.div
                key={step.step}
                className={`flex flex-col md:flex-row items-start gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex-1">
                  <div className={`bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all group`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md`}>
                        <span className="text-sm font-bold text-white">{step.step}</span>
                      </div>
                      <span className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center w-4 flex-shrink-0 mt-8">
                  <motion.div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${step.color} shadow-lg ring-4 ring-background`}
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Quick Web Design FAQs */}
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Web Design <span className="text-gradient">Quick Answers</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {webDesignFaqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <faq.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="hero" size="lg" className="group" asChild>
            <Link to="/contact">
              Start Your Web Project
              <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

const WebDesignPage = () => {
  const service = getServiceBySlug("web-design");

  if (!service) return <NotFound />;

  return (
    <ServicePageLayout
      icon={service.icon}
      title={service.title}
      subtitle={service.subtitle}
      description={service.description}
      subcategories={service.subcategories}
      benefits={service.benefits}
      ctaText={service.ctaText}
      slug={service.slug}
      stats={service.stats}
      extraSection={<WebDesignExtraSection />}
    />
  );
};

export default WebDesignPage;
