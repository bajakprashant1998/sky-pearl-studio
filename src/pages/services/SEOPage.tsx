import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import SEOChecker from "@/components/SEOChecker";
import NotFound from "@/pages/NotFound";

const SEOPage = () => {
  const service = getServiceBySlug("seo");
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
      extraSection={
        <>
          <SEOChecker />
          <ServiceExtraSections slug="seo" subtitle={service.subtitle} />
        </>
      }
    />
  );
};

export default SEOPage;
