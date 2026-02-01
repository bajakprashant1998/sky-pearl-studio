import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import NotFound from "@/pages/NotFound";

const ConversionUXPage = () => {
    const service = getServiceBySlug("conversion-ui-ux");

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
        />
    );
};

export default ConversionUXPage;
