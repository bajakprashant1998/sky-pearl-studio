import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const socialFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Which social media platforms should my business be on?", "acceptedAnswer": { "@type": "Answer", "text": "Platform selection depends on your target audience. B2B businesses thrive on LinkedIn, while B2C brands excel on Instagram and Facebook. We analyze your audience demographics to recommend the optimal platform mix." } },
    { "@type": "Question", "name": "How often should we post on social media?", "acceptedAnswer": { "@type": "Answer", "text": "Posting frequency varies by platform: Instagram 1-2 times daily, Facebook 1 time daily, LinkedIn 1-2 times per weekday, Twitter 3-5 times daily. Consistency matters more than volume." } },
    { "@type": "Question", "name": "Can you handle influencer partnerships?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We manage end-to-end influencer campaigns including identification, outreach, contract negotiation, content approval, and performance tracking across micro to macro influencers." } },
    { "@type": "Question", "name": "How do you measure social media ROI?", "acceptedAnswer": { "@type": "Answer", "text": "We track engagement rates, reach, follower growth, website traffic from social, lead generation, conversion rates, and revenue attribution using advanced analytics and UTM tracking." } }
  ]
};

const SocialMediaPage = () => {
  const service = getServiceBySlug("social-media");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(socialFaqSchema)}</script>
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
      extraSection={<ServiceExtraSections slug="social-media" subtitle={service.subtitle} />}
    />
  );
};

export default SocialMediaPage;
