import { BarChart3 } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  {
    title: "Google Ads Management",
    description: "Strategic campaign management across Search, Display, and Shopping networks.",
  },
  {
    title: "Facebook & Instagram Ads",
    description: "Targeted social advertising to reach your ideal customers where they spend time.",
  },
  {
    title: "LinkedIn Advertising",
    description: "B2B focused campaigns to generate high-quality professional leads.",
  },
  {
    title: "Remarketing Campaigns",
    description: "Re-engage website visitors with personalized ads that drive conversions.",
  },
  {
    title: "Landing Page Optimization",
    description: "Create high-converting landing pages designed to maximize campaign ROI.",
  },
  {
    title: "A/B Testing",
    description: "Continuous testing and optimization to improve ad performance over time.",
  },
];

const benefits = [
  "Immediate visibility and traffic from day one",
  "Precise targeting to reach your ideal customers",
  "Complete control over advertising budget",
  "Measurable ROI with detailed analytics",
  "Scalable campaigns that grow with your business",
  "Expert management saving you time and money",
];

const PPCPage = () => {
  return (
    <ServicePageLayout
      icon={BarChart3}
      title="PPC Advertising"
      subtitle="Pay-Per-Click Marketing"
      description="Maximize ROI with targeted pay-per-click campaigns across Google, Facebook, LinkedIn, and more. Our data-driven approach ensures every dollar works harder for your business."
      features={features}
      benefits={benefits}
      ctaText="Launch Your Campaign"
    />
  );
};

export default PPCPage;
