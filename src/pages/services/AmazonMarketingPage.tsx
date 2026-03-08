import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const amazonFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What Amazon marketing services do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We provide Amazon SEO, PPC management, A+ Content creation, brand store design, product listing optimization, review management, and comprehensive Amazon advertising campaigns." } },
    { "@type": "Question", "name": "How do you improve Amazon product rankings?", "acceptedAnswer": { "@type": "Answer", "text": "We optimize product titles, bullet points, descriptions, and backend keywords. Combined with strategic PPC campaigns and review generation, we improve organic rankings and Best Seller eligibility." } },
    { "@type": "Question", "name": "What's your Amazon advertising approach?", "acceptedAnswer": { "@type": "Answer", "text": "We use a mix of Sponsored Products, Sponsored Brands, and Sponsored Display ads with strategic bid management, negative keyword optimization, and ACOS targets aligned with your margins." } },
    { "@type": "Question", "name": "Do you help with Amazon Brand Registry?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We assist with Brand Registry enrollment, help create Enhanced Brand Content (A+ Content), brand stores, and protect your brand from counterfeiters and hijackers." } }
  ]
};

const AmazonMarketingPage = () => {
  const service = getServiceBySlug("amazon-marketing");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(amazonFaqSchema)}</script>
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
      extraSection={<ServiceExtraSections slug="amazon-marketing" subtitle={service.subtitle} />}
    />
    </>
  );
};

export default AmazonMarketingPage;
