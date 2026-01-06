import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    name: "Vikram Mehta",
    role: "CEO, HireForJob.com",
    content:
      "Digital Bull Technology transformed our entire digital presence. Their programmatic SEO approach alone generated more qualified traffic than all our previous marketing efforts combined.",
    rating: 5,
    result: "+450% Traffic",
    image: "V",
  },
  {
    name: "Rahul Patel",
    role: "Founder, Cadbull.com",
    content:
      "Their technical SEO expertise helped us fix issues we didn't even know existed, and the international expansion strategy opened up entirely new markets for us.",
    rating: 5,
    result: "Top 3 Global",
    image: "R",
  },
  {
    name: "Ankit Sharma",
    role: "Product Manager, CastingScreen",
    content:
      "The team at Digital Bull Technology took our app from obscurity to the top charts. Their data-driven approach to ASO and user acquisition helped us compete with apps backed by much larger budgets.",
    rating: 5,
    result: "1M+ Installs",
    image: "A",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
              Client Success Stories
            </span>
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
              <div className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 h-full flex flex-col relative group">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6 group-hover:text-primary/20 transition-colors" />

                {/* Result Badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 self-start">
                  <Star className="w-4 h-4 fill-primary" />
                  {testimonial.result}
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-primary-foreground">
                      {testimonial.image}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4}>
          <div className="text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Read All Case Studies
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
