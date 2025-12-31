import { Link } from "react-router-dom";
import { services } from "@/data/services";

const ServicesSection = () => {
  // Show first 6 services on homepage
  const featuredServices = services.slice(0, 6);

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Digital Marketing Solutions That{" "}
            <span className="text-gradient">Deliver Results</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer comprehensive digital marketing services tailored to your
            business goals and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.slug}`}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {service.shortTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {service.description}
              </p>
              <span className="inline-flex items-center mt-4 text-primary font-medium group-hover:gap-2 transition-all">
                Learn More
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Explore all {services.length} services we offer
          </p>
          <Link
            to="/services/seo"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
