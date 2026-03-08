import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const conversionFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is conversion rate optimization (CRO)?", "acceptedAnswer": { "@type": "Answer", "text": "CRO is the systematic process of increasing the percentage of website visitors who complete desired actions—purchases, signups, or inquiries—through data analysis, user research, and iterative testing." } },
    { "@type": "Question", "name": "How much can CRO improve my conversions?", "acceptedAnswer": { "@type": "Answer", "text": "Well-executed CRO typically improves conversion rates by 20-50%. Some clients see 100%+ improvements on specific pages through strategic UX changes and A/B testing." } },
    { "@type": "Question", "name": "What CRO tools do you use?", "acceptedAnswer": { "@type": "Answer", "text": "We use industry-leading tools including Google Optimize, Hotjar, Crazy Egg for heatmaps, VWO for A/B testing, and custom analytics setups for comprehensive conversion tracking." } },
    { "@type": "Question", "name": "How long does a CRO project take?", "acceptedAnswer": { "@type": "Answer", "text": "Initial audits take 2-3 weeks. A/B tests run 2-4 weeks each to reach statistical significance. Most CRO programs show meaningful results within 3 months of implementation." } }
  ]
};

const ConversionUXPage = () => {
  const service = getServiceBySlug("conversion-ui-ux");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(conversionFaqSchema)}</script>
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
      extraSection={<ServiceExtraSections slug="conversion-ui-ux" subtitle={service.subtitle} />}
    />
    </>
  );
};

export default ConversionUXPage;
