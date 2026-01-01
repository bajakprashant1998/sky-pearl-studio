import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import NotFound from "@/pages/NotFound";

const SocialMediaPage = () => {
  const service = getServiceBySlug("social-media");
  
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
    />
  );
};

export default SocialMediaPage;
