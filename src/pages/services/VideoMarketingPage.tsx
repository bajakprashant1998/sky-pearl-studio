import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const videoFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What types of marketing videos do you produce?", "acceptedAnswer": { "@type": "Answer", "text": "We create explainer videos, product demos, testimonials, social media content, YouTube ads, brand films, animated videos, and live-action productions for all platforms." } },
    { "@type": "Question", "name": "How much does video production cost?", "acceptedAnswer": { "@type": "Answer", "text": "Costs vary by complexity. Social media videos start at ₹15,000, while full production brand videos range from ₹50,000-₹5,00,000 depending on duration, animation, and production requirements." } },
    { "@type": "Question", "name": "Do you handle YouTube channel management?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer complete YouTube services including channel optimization, SEO, thumbnail design, content strategy, community management, and YouTube Ads campaigns." } },
    { "@type": "Question", "name": "What's the video production timeline?", "acceptedAnswer": { "@type": "Answer", "text": "Simple videos take 1-2 weeks. Complex productions with scripting, filming, and post-production require 3-6 weeks. Rush delivery is available for urgent projects." } }
  ]
};

const VideoMarketingPage = () => {
  const service = getServiceBySlug("video-marketing");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(videoFaqSchema)}</script>
      </Helmet>
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
      extraSection={<ServiceExtraSections slug="video-marketing" subtitle={service.subtitle} />}
    />
    </>
  );
};

export default VideoMarketingPage;
