import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const pageMessages: Record<string, string> = {
  "/": "Hi Digital Bull! I visited your website and I'm interested in your digital marketing services.",
  "/services": "Hi Digital Bull! I'm looking at your services. Can you help me choose the right one?",
  "/services/seo": "Hi Digital Bull! I'm interested in your SEO services. Can we discuss?",
  "/services/ppc": "Hi Digital Bull! I want to know more about your PPC advertising services.",
  "/services/web-design": "Hi Digital Bull! I need a professional website designed. Let's discuss!",
  "/services/social-media": "Hi Digital Bull! I'm interested in your social media marketing services.",
  "/services/content-marketing": "Hi Digital Bull! I'd like to discuss content marketing for my brand.",
  "/services/email-marketing": "Hi Digital Bull! I want to explore your email marketing solutions.",
  "/services/ecommerce-marketing": "Hi Digital Bull! I need ecommerce marketing help for my online store.",
  "/services/amazon-marketing": "Hi Digital Bull! I'm interested in Amazon marketing services.",
  "/services/video-marketing": "Hi Digital Bull! I want to discuss video marketing for my business.",
  "/services/ai-marketing": "Hi Digital Bull! I'm curious about your AI marketing solutions.",
  "/services/custom-development": "Hi Digital Bull! I need custom web/app development. Can we talk?",
  "/services/branding-design": "Hi Digital Bull! I'm looking for branding & design services.",
  "/services/analytics-ai-technology": "Hi Digital Bull! I want to leverage analytics & AI for my business.",
  "/services/training-programs": "Hi Digital Bull! I'm interested in your digital marketing training programs.",
  "/services/saas-products": "Hi Digital Bull! I'd like to know about your SaaS product solutions.",
  "/services/marketing-automation-crm": "Hi Digital Bull! I want to automate my marketing with CRM tools.",
  "/services/conversion-ui-ux": "Hi Digital Bull! I need help improving my website's conversion rate & UX.",
  "/services/growth-hacking": "Hi Digital Bull! I'm interested in growth hacking strategies for my startup.",
  "/services/programmatic-advertising": "Hi Digital Bull! I want to explore programmatic advertising.",
  "/services/conversion-optimization": "Hi Digital Bull! I need help with conversion rate optimization.",
  "/contact": "Hi Digital Bull! I'd like to get in touch and discuss a project.",
  "/blog": "Hi Digital Bull! I'm reading your blog and have a question about digital marketing.",
  "/digital-marketing-academy": "Hi Digital Bull! I'm interested in enrolling in your Digital Marketing Academy.",
  "/digital-marketing-syllabus": "Hi Digital Bull! I want to know more about the academy syllabus.",
  "/about-us": "Hi Digital Bull! I learned about your company and want to connect.",
  "/careers": "Hi Digital Bull! I'm interested in career opportunities at Digital Bull.",
  "/case-studies": "Hi Digital Bull! I saw your case studies and want similar results for my business.",
  "/free-tools": "Hi Digital Bull! I tried your free tools and I'm interested in your full services.",
  "/our-verticals": "Hi Digital Bull! I want to discuss industry-specific marketing for my vertical.",
  "/growth-strategy": "Hi Digital Bull! I need a growth strategy for my business. Let's discuss!",
  "/websitedesignlandingpage": "Hi Digital Bull! I need a professional website. Let's discuss my requirements!",
};

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const phoneNumber = "919824011921";

  // Match exact path first, then try parent path for subcategory/detail pages
  let message = pageMessages[pathname];
  if (!message) {
    const parentPath = pathname.split("/").slice(0, 3).join("/");
    message = pageMessages[parentPath] || pageMessages["/"]!;
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-all duration-300 transform hover:scale-110 flex items-center justify-center group animate-fade-in"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
      <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
