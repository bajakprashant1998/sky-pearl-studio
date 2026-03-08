import { getServiceBySlug } from "@/data/services";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import NotFound from "@/pages/NotFound";
import { Helmet } from "react-helmet-async";

const emailFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What email marketing platforms do you work with?", "acceptedAnswer": { "@type": "Answer", "text": "We work with all major platforms including Mailchimp, Klaviyo, HubSpot, ActiveCampaign, SendGrid, and ConvertKit. We recommend platforms based on your business size and automation needs." } },
    { "@type": "Question", "name": "How do you build email lists?", "acceptedAnswer": { "@type": "Answer", "text": "We create high-converting lead magnets, optimize signup forms, implement exit-intent popups, and develop referral programs. All methods are GDPR and CAN-SPAM compliant." } },
    { "@type": "Question", "name": "What email open rates can I expect?", "acceptedAnswer": { "@type": "Answer", "text": "Industry averages are 15-25%. Our optimized campaigns consistently achieve 25-40% open rates through strategic segmentation, compelling subject lines, and optimal send timing." } },
    { "@type": "Question", "name": "Do you handle email automation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We build complete automation workflows including welcome sequences, abandoned cart recovery, re-engagement campaigns, post-purchase flows, and behavioral trigger emails." } }
  ]
};

const EmailMarketingPage = () => {
  const service = getServiceBySlug("email-marketing");
  if (!service) return <NotFound />;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(emailFaqSchema)}</script>
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
      extraSection={<ServiceExtraSections slug="email-marketing" subtitle={service.subtitle} />}
    />
    </>
  );
};

export default EmailMarketingPage;
