import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { ArrowRight, Sparkles, Flame, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
const serviceColors = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-orange-500 to-red-500", "from-green-500 to-emerald-500", "from-indigo-500 to-violet-500", "from-rose-500 to-pink-500", "from-teal-500 to-cyan-500", "from-amber-500 to-orange-500"];
const ServicesSection = () => {
  // Show first 8 services on homepage
  const featuredServices = services.slice(0, 8);
  return <section id="services" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      <motion.div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" animate={{
      scale: [1.2, 1, 1.2],
      opacity: [0.5, 0.3, 0.5]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4" whileHover={{
            scale: 1.05
          }}>
              <Sparkles className="w-4 h-4" />
              17+ Digital Services
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Digital Marketing Solutions That{" "}
              <span className="text-gradient">Deliver Results</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive digital marketing services tailored to your business goals, 
              powered by data-driven strategies and industry expertise.
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-0 mx-0 mb-0">
          {featuredServices.map((service, index) => <AnimatedSection key={service.id} delay={0.05 * index}>
              <Link to={`/services/${service.slug}`} className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                {/* Hover gradient overlay */}
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${serviceColors[index % serviceColors.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                {/* Trending badge for first 3 */}
                {index < 3 && <motion.div className="absolute top-3 right-3 z-10" initial={{
              scale: 0,
              rotate: -20
            }} animate={{
              scale: 1,
              rotate: 0
            }} transition={{
              delay: 0.3 + index * 0.1,
              type: "spring"
            }}>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${serviceColors[index]} shadow-lg`}>
                      <Flame className="w-3 h-3" />
                      HOT
                    </span>
                  </motion.div>}

                {/* Icon */}
                <motion.div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${serviceColors[index % serviceColors.length]} shadow-lg relative`} whileHover={{
              scale: 1.1,
              rotate: 5
            }} transition={{
              type: "spring",
              stiffness: 300
            }}>
                  <service.icon className="w-7 h-7 text-white relative z-10" />
                  <motion.div className="absolute inset-0 rounded-xl bg-white/20" animate={{
                opacity: [0, 0.3, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                  {service.subtitle}
                </p>

                {/* Subcategories preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {service.subcategories.slice(0, 2).map(sub => <span key={sub.id} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {sub.title}
                    </span>)}
                  {service.subcategories.length > 2 && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      +{service.subcategories.length - 2} more
                    </span>}
                </div>

                {/* Link */}
                <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all mt-auto">
                  Explore Service
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Bottom border animation */}
                <motion.div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${serviceColors[index % serviceColors.length]}`} initial={{
              width: 0
            }} whileHover={{
              width: "100%"
            }} transition={{
              duration: 0.3
            }} />
              </Link>
            </AnimatedSection>)}
        </div>

        {/* View All Services */}
        <AnimatedSection delay={0.5}>
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Explore all {services.length} services we offer across SEO, PPC, Social Media, Content Marketing, and more
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {services.slice(8).map((service, index) => <motion.div key={service.id} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.05
            }}>
                  <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                    <service.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {service.shortTitle}
                    <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </Link>
                </motion.div>)}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>;
};
export default ServicesSection;