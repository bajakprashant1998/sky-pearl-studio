import { Search, BarChart3, Share2, PenTool, Mail, Target } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Boost your search rankings and drive organic traffic with our proven SEO strategies.",
    href: "/services/seo",
  },
  {
    icon: BarChart3,
    title: "PPC Advertising",
    description:
      "Maximize ROI with targeted pay-per-click campaigns across Google, Facebook, and more.",
    href: "/services/ppc",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Build your brand presence and engage audiences across all social platforms.",
    href: "/services/social-media",
  },
  {
    icon: PenTool,
    title: "Content Marketing",
    description:
      "Create compelling content that attracts, engages, and converts your target audience.",
    href: "/services/content-marketing",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description:
      "Nurture leads and drive conversions with personalized email campaigns.",
    href: "/services/email-marketing",
  },
  {
    icon: Target,
    title: "Conversion Optimization",
    description:
      "Turn more visitors into customers with data-driven CRO strategies.",
    href: "/services/conversion-optimization",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
      </div>
    </section>
  );
};

export default ServicesSection;
