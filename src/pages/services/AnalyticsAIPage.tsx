import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const analyticsFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What analytics tools do you implement?", "acceptedAnswer": { "@type": "Answer", "text": "We work with Google Analytics 4, Adobe Analytics, Mixpanel, Amplitude, Looker Studio, and custom BI solutions. We ensure proper tracking setup and create actionable dashboards." } },
    { "@type": "Question", "name": "How do you use AI in analytics?", "acceptedAnswer": { "@type": "Answer", "text": "We leverage AI for predictive analytics, customer segmentation, anomaly detection, attribution modeling, and automated insights generation to uncover growth opportunities in your data." } },
    { "@type": "Question", "name": "Can you help with GA4 migration?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We provide complete GA4 migration services including property setup, event tracking configuration, conversion mapping, audience creation, and custom report development." } },
    { "@type": "Question", "name": "What KPIs should we track?", "acceptedAnswer": { "@type": "Answer", "text": "Essential KPIs include conversion rate, customer acquisition cost, lifetime value, ROI by channel, engagement metrics, and revenue attribution. We customize KPI frameworks based on your business goals." } }
  ]
};

const AnalyticsAIPage = () => {
  const service = getServiceBySlug("analytics-ai-technology");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(analyticsFaqSchema)}</script>
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
      extraSection={<ServiceExtraSections slug="analytics-ai-technology" subtitle={service.subtitle} />}
    />
    </>
  );
};

export default AnalyticsAIPage;
