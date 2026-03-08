import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import ServicesSection from "@/components/ServicesSection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import StatsSection from "@/components/StatsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import BusinessImpactSection from "@/components/BusinessImpactSection";
import AcademyBanner from "@/components/AcademyBanner";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturedBlogCarousel from "@/components/FeaturedBlogCarousel";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digital Bull Technology Pvt LTD",
    "url": "https://dibull.com",
    "logo": "https://dibull.com/dibull_logo.png",
    "description": "Digital Bull Technology is the best digital marketing agency in Ahmedabad offering SEO, PPC, social media marketing, content marketing, and web design services. Expert marketing company in Ahmedabad helping businesses grow.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A 823 Moneyplant High street, Jagatpur Road, Near GOTA Cross road",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382481",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 9824011921",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Gujarati"]
    },
    "sameAs": [
      "https://www.facebook.com/share/1GGViEsE5a/?mibextid=wwXIfr",
      "https://x.com/digital_1221?s=21&t=gZqAEY-otu1upyCHIOj4Uw",
      "https://www.linkedin.com/company/digitalbulltechnology/",
      "https://www.instagram.com/digitalbulltechnology?igsh=MWxjbTJtMHkxNTBoNg=="
    ],
    "areaServed": {
      "@type": "City",
      "name": "Ahmedabad"
    },
    "knowsAbout": [
      "Digital Marketing", "SEO Services", "Social Media Marketing",
      "PPC Advertising", "Web Design", "Content Marketing",
      "Email Marketing", "Branding", "E-commerce Marketing"
    ],
    "foundingDate": "2020",
    "numberOfEmployees": "10-50"
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digital Bull Technology",
    "image": "https://dibull.com/dibull_logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A 823 Moneyplant High street, Jagatpur Road, Near GOTA Cross road",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382481",
      "addressCountry": "IN"
    },
    "telephone": "+91 9824011921",
    "priceRange": "$$",
    "openingHours": "Mo-Sa 09:00-18:00",
    "url": "https://dibull.com",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0707",
      "longitude": "72.5177"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Digital Bull Technology",
    "url": "https://dibull.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dibull.com/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What industries do you specialize in?",
        "acceptedAnswer": { "@type": "Answer", "text": "We have extensive experience across diverse industries including technology, healthcare, e-commerce, finance, education, real estate, and manufacturing." }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results from digital marketing?",
        "acceptedAnswer": { "@type": "Answer", "text": "Results timeline varies by service: PPC and social media ads can show results within days, while SEO typically takes 3-6 months for significant improvements." }
      },
      {
        "@type": "Question",
        "name": "What makes Digital Bull Technology different from other agencies?",
        "acceptedAnswer": { "@type": "Answer", "text": "We combine data-driven strategies with creative excellence. Our team brings 15+ years of experience, and we focus on measurable outcomes with a 98% client satisfaction rate." }
      },
      {
        "@type": "Question",
        "name": "Do you offer customized packages or only fixed plans?",
        "acceptedAnswer": { "@type": "Answer", "text": "We offer both standard packages and customized marketing strategies based on your specific goals, budget, and industry requirements." }
      },
      {
        "@type": "Question",
        "name": "How do you measure and report campaign performance?",
        "acceptedAnswer": { "@type": "Answer", "text": "We use advanced analytics tools to track KPIs like traffic, conversions, ROI, and engagement, with detailed monthly reports and real-time dashboard access." }
      },
    ]
  };

  return (
    <>
      <SeoHead
        title="Best Digital Marketing Agency in Ahmedabad | SEO, PPC & Social Media - Digital Bull Technology"
        description="Digital Bull Technology is the leading digital marketing agency in Ahmedabad. We offer expert SEO, PPC advertising, social media marketing, content marketing & web design services. Best marketing company in Ahmedabad for business growth."
        keywords="digital marketing ahmedabad, digital marketing agency ahmedabad, digital marketing company in ahmedabad, marketing agency in ahmedabad, social media marketing agency in ahmedabad, best digital marketing agency in ahmedabad, SEO services ahmedabad, PPC advertising ahmedabad, web design ahmedabad, content marketing ahmedabad"
        canonical="https://dibull.com"
        breadcrumbs={[{ name: "Home", url: "https://dibull.com" }]}
        jsonLd={[jsonLd, localBusinessJsonLd, websiteJsonLd, faqJsonLd]}
      />

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ClientLogosMarquee />
        <ServicesSection />
        <HowWeWorkSection />
        <PortfolioShowcase />
        <StatsSection />
        <BusinessImpactSection />
        <AcademyBanner />
        <AboutSection />
        <TestimonialsSection />
        <FeaturedBlogCarousel />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
