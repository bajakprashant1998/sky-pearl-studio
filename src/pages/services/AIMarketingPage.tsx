import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const aiFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How can AI improve my marketing campaigns?", "acceptedAnswer": { "@type": "Answer", "text": "AI enhances marketing through predictive analytics, automated content optimization, personalized customer journeys, smart bidding strategies, and real-time performance adjustments that can improve ROI by 30-50%." } },
    { "@type": "Question", "name": "What AI marketing tools do you use?", "acceptedAnswer": { "@type": "Answer", "text": "We leverage cutting-edge AI platforms including ChatGPT, Google AI, predictive analytics tools, automated content generators, and custom machine learning models tailored to your business needs." } },
    { "@type": "Question", "name": "Is AI marketing suitable for small businesses?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! AI marketing scales to any business size. Small businesses benefit from automation that saves time, reduces costs, and enables competing with larger companies through smart targeting and personalization." } },
    { "@type": "Question", "name": "How long does it take to see results from AI marketing?", "acceptedAnswer": { "@type": "Answer", "text": "Initial improvements are visible within 2-4 weeks as AI learns your audience. Significant ROI improvements typically occur within 60-90 days as the system optimizes campaigns based on accumulated data." } }
  ]
};

const AIMarketingPage = () => {
  const service = getServiceBySlug("ai-marketing");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aiFaqSchema)}</script>
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
      extraSection={<ServiceExtraSections slug="ai-marketing" subtitle={service.subtitle} />}
    />
    </>
  );
};

export default AIMarketingPage;
