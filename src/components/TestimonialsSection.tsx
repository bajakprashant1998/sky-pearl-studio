import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Vikram Mehta",
    role: "CEO, HireForJob.com",
    content:
      "Digital Bull Technology transformed our entire digital presence. Their programmatic SEO approach alone generated more qualified traffic than all our previous marketing efforts combined.",
    rating: 5,
    result: "+450% Traffic",
    image: "V",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Rahul Patel",
    role: "Founder, Cadbull.com",
    content:
      "Their technical SEO expertise helped us fix issues we didn't even know existed, and the international expansion strategy opened up entirely new markets for us.",
    rating: 5,
    result: "Top 3 Global",
    image: "R",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Ankit Sharma",
    role: "Product Manager, CastingScreen",
    content:
      "The team at Digital Bull Technology took our app from obscurity to the top charts. Their data-driven approach to ASO and user acquisition helped us compete with apps backed by much larger budgets.",
    rating: 5,
    result: "1M+ Installs",
    image: "A",
    color: "from-orange-500 to-red-500",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 fill-current" />
              Client Success Stories
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results from real clients. See how we've helped businesses like yours achieve extraordinary growth.
            </p>
          </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={0.1 * index}>
              <motion.div
                className="bg-card rounded-3xl p-8 border border-border h-full flex flex-col relative group overflow-hidden"
                whileHover={{ y: -8, borderColor: "hsl(var(--primary) / 0.4)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Hover gradient */}
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6 group-hover:text-primary/20 transition-colors" />

                {/* Result Badge */}
                <motion.div
                  className={`inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${testimonial.color} text-white rounded-full text-sm font-semibold mb-6 self-start shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Star className="w-4 h-4 fill-white" />
                  {testimonial.result}
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i + 0.2 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-xl font-bold text-white">{testimonial.image}</span>
                  </motion.div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${testimonial.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4}>
          <div className="text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
            >
              Read All Case Studies
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
