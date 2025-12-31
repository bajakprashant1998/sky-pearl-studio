import { Mail } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  {
    title: "Email Strategy",
    description: "Develop targeted email campaigns that align with your customer journey.",
  },
  {
    title: "Newsletter Design",
    description: "Beautiful, responsive email templates that reflect your brand identity.",
  },
  {
    title: "Automation Workflows",
    description: "Set up automated sequences for welcome series, nurturing, and re-engagement.",
  },
  {
    title: "List Segmentation",
    description: "Target the right audience with personalized messaging for better results.",
  },
  {
    title: "A/B Testing",
    description: "Optimize subject lines, content, and CTAs through continuous testing.",
  },
  {
    title: "Performance Analytics",
    description: "Track opens, clicks, and conversions to measure campaign success.",
  },
];

const benefits = [
  "Highest ROI of any marketing channel",
  "Direct communication with your audience",
  "Personalized messaging at scale",
  "Automated campaigns that work 24/7",
  "Nurture leads through the sales funnel",
  "Retain customers with targeted content",
];

const EmailMarketingPage = () => {
  return (
    <ServicePageLayout
      icon={Mail}
      title="Email Marketing"
      subtitle="Email Campaigns & Automation"
      description="Nurture leads and drive conversions with personalized email campaigns. Our data-driven approach ensures your messages reach the right people at the right time."
      features={features}
      benefits={benefits}
      ctaText="Start Email Campaigns"
    />
  );
};

export default EmailMarketingPage;
