import { Share2 } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  {
    title: "Social Strategy",
    description: "Custom social media strategies aligned with your brand goals and target audience.",
  },
  {
    title: "Content Creation",
    description: "Engaging posts, stories, and videos that resonate with your followers.",
  },
  {
    title: "Community Management",
    description: "Active engagement with your audience to build loyalty and trust.",
  },
  {
    title: "Influencer Marketing",
    description: "Partner with relevant influencers to expand your reach and credibility.",
  },
  {
    title: "Social Listening",
    description: "Monitor brand mentions and industry trends to stay ahead of conversations.",
  },
  {
    title: "Analytics & Reporting",
    description: "Detailed insights into performance metrics and audience behavior.",
  },
];

const benefits = [
  "Build a loyal community around your brand",
  "Increase brand awareness and recognition",
  "Drive website traffic from social platforms",
  "Generate leads through social engagement",
  "Stay connected with customers in real-time",
  "Humanize your brand with authentic content",
];

const SocialMediaPage = () => {
  return (
    <ServicePageLayout
      icon={Share2}
      title="Social Media Marketing"
      subtitle="Social Media Management"
      description="Build your brand presence and engage audiences across all social platforms. We create compelling content and foster meaningful connections that turn followers into customers."
      features={features}
      benefits={benefits}
      ctaText="Grow Your Following"
    />
  );
};

export default SocialMediaPage;
