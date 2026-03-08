import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const growthFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is growth hacking?", "acceptedAnswer": { "@type": "Answer", "text": "Growth hacking is a data-driven marketing approach focused on rapid experimentation across channels to identify the most efficient ways to grow a business. It combines marketing, product development, and analytics." } },
    { "@type": "Question", "name": "How is growth hacking different from traditional marketing?", "acceptedAnswer": { "@type": "Answer", "text": "Growth hacking prioritizes speed and experimentation over traditional marketing's longer campaigns. It uses data to make quick decisions, tests multiple hypotheses simultaneously, and focuses on scalable, cost-effective tactics." } },
    { "@type": "Question", "name": "What growth metrics do you track?", "acceptedAnswer": { "@type": "Answer", "text": "We track AARRR metrics: Acquisition, Activation, Retention, Revenue, and Referral. Plus viral coefficients, customer lifetime value, churn rate, and growth velocity indicators." } },
    { "@type": "Question", "name": "Can growth hacking work for established businesses?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! While popular with startups, established businesses use growth hacking to launch new products, enter new markets, optimize conversion funnels, and accelerate revenue growth." } }
  ]
};

const GrowthHackingPage = () => {
  const service = getServiceBySlug("growth-hacking");
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
      extraSection={<ServiceExtraSections slug="growth-hacking" subtitle={service.subtitle} />}
    />
  );
};

export default GrowthHackingPage;
