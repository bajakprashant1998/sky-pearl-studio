import { PenTool } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  {
    title: "Content Strategy",
    description: "Develop a comprehensive content plan that aligns with your business objectives.",
  },
  {
    title: "Blog Writing",
    description: "SEO-optimized articles that establish thought leadership and drive traffic.",
  },
  {
    title: "Video Production",
    description: "Engaging video content for social media, websites, and advertising campaigns.",
  },
  {
    title: "Infographics & Design",
    description: "Visual content that simplifies complex information and boosts engagement.",
  },
  {
    title: "Ebooks & Whitepapers",
    description: "In-depth resources that generate leads and demonstrate expertise.",
  },
  {
    title: "Content Distribution",
    description: "Strategic promotion across channels to maximize content reach and impact.",
  },
];

const benefits = [
  "Establish authority in your industry",
  "Attract and nurture leads organically",
  "Improve SEO with quality content",
  "Build trust with your target audience",
  "Create shareable assets for social media",
  "Generate long-term traffic and leads",
];

const ContentMarketingPage = () => {
  return (
    <ServicePageLayout
      icon={PenTool}
      title="Content Marketing"
      subtitle="Content Strategy & Creation"
      description="Create compelling content that attracts, engages, and converts your target audience. Our content strategies drive meaningful connections and measurable business results."
      features={features}
      benefits={benefits}
      ctaText="Start Creating Content"
    />
  );
};

export default ContentMarketingPage;
