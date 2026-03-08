import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const ppcServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://dibull.com/services/ppc#service",
  "name": "PPC & Google Ads Management in Ahmedabad – Digital Bull Technology",
  "description": "Expert PPC management and Google Ads services in Ahmedabad. We deliver high-ROI paid advertising campaigns across Google, Facebook, Instagram, and LinkedIn with data-driven optimization and transparent reporting.",
  "url": "https://dibull.com/services/ppc",
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
  "serviceType": ["PPC Advertising", "Google Ads Management", "Facebook Ads", "LinkedIn Ads", "Remarketing", "Shopping Ads"],
  "knowsAbout": ["Google Ads", "Meta Ads", "LinkedIn Advertising", "Display Advertising", "Remarketing", "Conversion Tracking", "A/B Testing"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "PPC Service Packages",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Search Ads Management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Advertising" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Display & Remarketing Campaigns" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shopping & E-commerce Ads" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PPC Audit & Strategy" } }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "72",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Amit Shah" },
      "reviewBody": "Our Google Ads ROAS improved by 4x after switching to Digital Bull. Their PPC team is incredibly data-driven and proactive."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Sneha Patel" },
      "reviewBody": "Digital Bull reduced our cost-per-lead by 60% while increasing conversion volume. Exceptional PPC management."
    }
  ],
  "potentialAction": {
    "@type": "CommunicateAction",
    "target": "https://dibull.com/contact",
    "name": "Get Free PPC Audit"
  },
  "sameAs": [
    "https://www.linkedin.com/company/digital-bull-technology",
    "https://www.instagram.com/dibulltechnology",
    "https://www.facebook.com/dibulltechnology"
  ]
};

const PPCPage = () => {
  const service = getServiceBySlug("ppc");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ppcServiceSchema)}</script>
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
        extraSection={<ServiceExtraSections slug="ppc" subtitle={service.subtitle} />}
      />
    </>
  );
};

export default PPCPage;
