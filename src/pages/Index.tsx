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
import FeaturedBlogCarousel from "@/components/FeaturedBlogCarousel";

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
      "Digital Marketing",
      "SEO Services",
      "Social Media Marketing",
      "PPC Advertising",
      "Web Design",
      "Content Marketing",
      "Email Marketing",
      "Branding",
      "E-commerce Marketing"
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dibull.com"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Digital Marketing Agency in Ahmedabad | SEO, PPC & Social Media - Digital Bull Technology</title>
        <meta
          name="description"
          content="Digital Bull Technology is the leading digital marketing agency in Ahmedabad. We offer expert SEO, PPC advertising, social media marketing, content marketing & web design services. Best marketing company in Ahmedabad for business growth."
        />
        <meta
          name="keywords"
          content="digital marketing ahmedabad, digital marketing agency ahmedabad, digital marketing company in ahmedabad, marketing agency in ahmedabad, social media marketing agency in ahmedabad, social media marketing agency ahmedabad, best digital marketing agency in ahmedabad, social media agency in ahmedabad, marketing company in ahmedabad, social media marketing in ahmedabad, digital marketing services ahmedabad, advertising companies in ahmedabad, digital marketing service in ahmedabad, digital marketing services in ahmedabad, SEO services ahmedabad, PPC advertising ahmedabad, web design ahmedabad, content marketing ahmedabad"
        />
        <link rel="canonical" href="https://dibull.com" />
        <meta property="og:title" content="Best Digital Marketing Agency in Ahmedabad | Digital Bull Technology" />
        <meta property="og:description" content="Leading digital marketing company in Ahmedabad offering SEO, PPC, social media marketing & web design services. Get results that matter with the best marketing agency in Ahmedabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dibull.com" />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Digital Marketing Agency in Ahmedabad | Digital Bull Technology" />
        <meta name="twitter:description" content="Top digital marketing company in Ahmedabad - SEO, PPC, social media & web design experts. Grow your business with the best marketing agency in Ahmedabad." />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        <meta name="author" content="Digital Bull Technology" />
        <meta name="language" content="en-IN" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <FeaturedBlogCarousel />
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
