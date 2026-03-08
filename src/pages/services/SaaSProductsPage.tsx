import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const saasFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What SaaS products do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We develop custom SaaS solutions including CRM systems, project management tools, marketing automation platforms, analytics dashboards, and industry-specific applications tailored to your business needs." } },
    { "@type": "Question", "name": "How long does SaaS development take?", "acceptedAnswer": { "@type": "Answer", "text": "MVP development typically takes 3-4 months, while full-featured SaaS products require 6-12 months depending on complexity. We use agile methodology for iterative delivery." } },
    { "@type": "Question", "name": "Do you provide ongoing SaaS maintenance?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer comprehensive maintenance packages including bug fixes, security updates, feature enhancements, server monitoring, and 24/7 technical support." } },
    { "@type": "Question", "name": "Can you integrate with existing systems?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! We specialize in API integrations with popular platforms like Salesforce, HubSpot, Stripe, QuickBooks, and custom enterprise systems using REST and GraphQL APIs." } }
  ]
};

const SaaSProductsPage = () => {
  const service = getServiceBySlug("saas-products");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(saasFaqSchema)}</script>
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
      extraSection={<ServiceExtraSections slug="saas-products" subtitle={service.subtitle} />}
    />
    </>
  );
};

export default SaaSProductsPage;
