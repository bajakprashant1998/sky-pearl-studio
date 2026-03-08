import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import SEOChecker from "@/components/SEOChecker";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const seoServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://dibull.com/services/seo#service",
  "name": "SEO Services in Ahmedabad – Digital Bull Technology",
  "description": "Expert SEO services in Ahmedabad including technical SEO, on-page optimization, link building, local SEO, and AI-powered search optimization. Proven results with 300%+ organic traffic growth for clients.",
  "url": "https://dibull.com/services/seo",
  "image": "https://dibull.com/dibull_logo.png",
  "priceRange": "₹₹-₹₹₹",
  "telephone": "+91-9313401885",
  "email": "info@dibull.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ahmedabad",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "380015",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.0225",
    "longitude": "72.5714"
  },
  "areaServed": [
    { "@type": "City", "name": "Ahmedabad" },
    { "@type": "State", "name": "Gujarat" },
    { "@type": "Country", "name": "India" }
  ],
  "serviceType": ["Search Engine Optimization", "Technical SEO", "Local SEO", "On-Page SEO", "Off-Page SEO", "AI SEO"],
  "knowsAbout": ["Google Search", "SEO Audits", "Keyword Research", "Link Building", "Content Optimization", "Schema Markup", "Core Web Vitals"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "SEO Service Packages",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO Audit & Fix" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "On-Page SEO Optimization" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO & Google Business Profile" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Link Building & Authority Growth" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI-Powered Search Optimization" } }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "89",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Rajesh Kumar" },
      "reviewBody": "Digital Bull Technology transformed our online presence. Their SEO expertise helped us achieve 300% growth in organic traffic within 6 months."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Priya Mehta" },
      "reviewBody": "Outstanding SEO results. Our website went from page 5 to page 1 for competitive keywords in just 4 months."
    }
  ],
  "potentialAction": {
    "@type": "CommunicateAction",
    "target": "https://dibull.com/contact",
    "name": "Get Free SEO Audit"
  },
  "sameAs": [
    "https://www.linkedin.com/company/digital-bull-technology",
    "https://www.instagram.com/dibulltechnology",
    "https://www.facebook.com/dibulltechnology"
  ]
};

const SEOPage = () => {
  const service = getServiceBySlug("seo");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(seoServiceSchema)}</script>
      </Helmet>
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
        extraSection={
          <>
            <SEOChecker />
            <ServiceExtraSections slug="seo" subtitle={service.subtitle} />
          </>
        }
      />
    </>
  );
};

export default SEOPage;
