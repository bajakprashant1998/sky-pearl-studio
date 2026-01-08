import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import BusinessImpactSection from "@/components/BusinessImpactSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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
    "description": "Leading digital marketing agency helping businesses grow with SEO, PPC advertising, social media marketing, and content strategies.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A 823 Moneyplant High street, Jagatpur Road, Near GOTA Cross road",
      "addressLocality": "Ahmedabad",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 9824011921",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/share/1GGViEsE5a/?mibextid=wwXIfr",
      "https://x.com/digital_1221?s=21&t=gZqAEY-otu1upyCHIOj4Uw",
      "https://www.linkedin.com/company/digitalbulltechnology/",
      "https://www.instagram.com/digitalbulltechnology?igsh=MWxjbTJtMHkxNTBoNg=="
    ]
  };

  return (
    <>
      <Helmet>
        <title>Digital Bull Technology | Digital Marketing Agency - SEO, PPC & Social Media</title>
        <meta
          name="description"
          content="Digital Bull Technology is a leading digital marketing agency helping businesses grow with SEO, PPC advertising, social media marketing, and content strategies. Get results that matter."
        />
        <meta
          name="keywords"
          content="digital marketing agency, SEO services, PPC advertising, social media marketing, content marketing, email marketing, web design, branding, Digital Bull Technology"
        />
        <link rel="canonical" href="https://dibull.com" />
        <meta property="og:title" content="Digital Bull Technology | Digital Marketing Agency" />
        <meta property="og:description" content="Leading digital marketing agency helping businesses grow with SEO, PPC, social media, and content strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dibull.com" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Bull Technology | Digital Marketing Agency" />
        <meta name="twitter:description" content="Leading digital marketing agency helping businesses grow with SEO, PPC, social media, and content strategies." />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <BusinessImpactSection />
        <AboutSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
