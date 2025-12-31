import { Search } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  {
    title: "Keyword Research",
    description: "Deep analysis to identify high-value keywords that drive qualified traffic to your website.",
  },
  {
    title: "On-Page Optimization",
    description: "Optimize meta tags, content structure, and internal linking for maximum search visibility.",
  },
  {
    title: "Technical SEO",
    description: "Ensure your website meets all technical requirements for optimal search engine crawling.",
  },
  {
    title: "Link Building",
    description: "Build high-quality backlinks from authoritative sources to boost domain authority.",
  },
  {
    title: "Local SEO",
    description: "Dominate local search results and attract customers in your geographic area.",
  },
  {
    title: "SEO Audits",
    description: "Comprehensive analysis of your current SEO performance with actionable recommendations.",
  },
];

const benefits = [
  "Increase organic traffic by up to 300%",
  "Improve search engine rankings for target keywords",
  "Generate high-quality leads without paid advertising",
  "Build long-term sustainable online visibility",
  "Outrank competitors in search results",
  "Data-driven strategies with monthly reporting",
];

const SEOPage = () => {
  return (
    <ServicePageLayout
      icon={Search}
      title="SEO Optimization"
      subtitle="Search Engine Optimization"
      description="Boost your search rankings and drive organic traffic with our proven SEO strategies. We help businesses achieve sustainable growth through technical excellence and strategic content optimization."
      features={features}
      benefits={benefits}
      ctaText="Boost Your Rankings"
    />
  );
};

export default SEOPage;
