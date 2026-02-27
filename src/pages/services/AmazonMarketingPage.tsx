import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";

const AmazonMarketingPage = () => {
  const service = getServiceBySlug("amazon-marketing");
  if (!service) return <NotFound />;

  return (
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
  );
};

export default AmazonMarketingPage;
