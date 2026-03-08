import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";
import { usePortfolioItems } from "@/hooks/useDynamicContent";

import akyca from "@/assets/portfolio/akyca.webp";
import betterviewtourism from "@/assets/portfolio/betterviewtourism.webp";
import cadbull from "@/assets/portfolio/cadbull.webp";
import dreamdecor from "@/assets/portfolio/dreamdecor.webp";
import gujaratvoyage from "@/assets/portfolio/gujaratvoyage.webp";
import handbricks from "@/assets/portfolio/handbricks.webp";
import hireforjob from "@/assets/portfolio/hireforjob.webp";
import rentalyacht from "@/assets/portfolio/rentalyacht.webp";
import tapovanschool from "@/assets/portfolio/tapovanschool.webp";

const staticProjects = [
  { name: "Cadbull", image: cadbull, category: "Web Design", color: "from-blue-500 to-cyan-500" },
  { name: "HireForJob", image: hireforjob, category: "Job Portal", color: "from-green-500 to-emerald-500" },
  { name: "Gujarat Voyage", image: gujaratvoyage, category: "Tourism", color: "from-amber-500 to-orange-500" },
  { name: "Better View", image: betterviewtourism, category: "Tourism", color: "from-cyan-500 to-teal-500" },
  { name: "Dream Decor", image: dreamdecor, category: "Interior", color: "from-purple-500 to-violet-500" },
  { name: "Tapovan School", image: tapovanschool, category: "Education", color: "from-rose-500 to-pink-500" },
];

const PortfolioShowcase = () => {
  const { data: dbItems } = usePortfolioItems(true);

  const projects = dbItems && dbItems.length > 0
    ? dbItems.map((item: any) => ({
        name: item.title,
        image: item.image_url || "",
        category: item.category || "Web Design",
        color: "from-blue-500 to-cyan-500",
        websiteUrl: item.website_url,
      }))
    : staticProjects;
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              Our Portfolio
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Websites That <span className="text-gradient">Convert</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We design & develop high-performance websites that drive real business results
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {projects.map((project, index) => (
            <AnimatedSection key={project.name} delay={index * 0.08}>
              <motion.div
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-border bg-card cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Browser mockup top bar */}
                <div className="bg-muted/80 px-3 py-2 flex items-center gap-1.5 border-b border-border">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" />
                  <div className="flex-1 mx-2 sm:mx-3">
                    <div className="bg-background rounded-md px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] text-muted-foreground truncate">
                      {project.name.toLowerCase().replace(/\s/g, '')}.com
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={`${project.name} website`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium text-white bg-gradient-to-r ${project.color} mb-1.5`}>
                        {project.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white">{project.name}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="text-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/case-studies">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
