import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const brandingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What does a complete branding package include?", "acceptedAnswer": { "@type": "Answer", "text": "Our branding packages include logo design, color palette, typography, brand guidelines, business cards, letterheads, social media templates, and brand voice documentation for consistent communication." } },
    { "@type": "Question", "name": "How long does the branding process take?", "acceptedAnswer": { "@type": "Answer", "text": "Logo design takes 2-3 weeks. Complete brand identity development requires 4-6 weeks including research, concept development, revisions, and final deliverables." } },
    { "@type": "Question", "name": "How many logo concepts will we receive?", "acceptedAnswer": { "@type": "Answer", "text": "We provide 3-5 unique logo concepts based on your brief. You can request unlimited revisions on your chosen concept until you're completely satisfied." } },
    { "@type": "Question", "name": "Do you offer rebranding services?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We specialize in both new brand creation and strategic rebranding. We analyze your current brand equity and create updated identities that retain recognition while modernizing your image." } }
  ]
};

const BrandingDesignPage = () => {
  const service = getServiceBySlug("branding-design");
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
      extraSection={<ServiceExtraSections slug="branding-design" subtitle={service.subtitle} />}
    />
  );
};

export default BrandingDesignPage;
