import { Target } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  {
    title: "Conversion Audits",
    description: "Comprehensive analysis of your website to identify conversion barriers.",
  },
  {
    title: "User Experience Design",
    description: "Optimize user flows and interfaces to guide visitors toward conversion.",
  },
  {
    title: "A/B & Multivariate Testing",
    description: "Scientific testing to determine what resonates best with your audience.",
  },
  {
    title: "Heatmap Analysis",
    description: "Visualize user behavior to understand how visitors interact with your site.",
  },
  {
    title: "Form Optimization",
    description: "Streamline forms to reduce friction and increase completion rates.",
  },
  {
    title: "Personalization",
    description: "Deliver tailored experiences based on user behavior and preferences.",
  },
];

const benefits = [
  "Increase conversion rates by 50% or more",
  "Maximize value from existing traffic",
  "Reduce customer acquisition costs",
  "Improve user experience and satisfaction",
  "Make data-driven design decisions",
  "Achieve sustainable revenue growth",
];

const ConversionOptimizationPage = () => {
  return (
    <ServicePageLayout
      icon={Target}
      title="Conversion Optimization"
      subtitle="CRO & User Experience"
      description="Turn more visitors into customers with data-driven CRO strategies. We analyze user behavior and implement proven techniques to maximize your website's conversion potential."
      features={features}
      benefits={benefits}
      ctaText="Optimize Conversions"
    />
  );
};

export default ConversionOptimizationPage;
