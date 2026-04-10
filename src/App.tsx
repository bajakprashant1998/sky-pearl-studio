import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import LiveChatWidget from "@/components/LiveChatWidget";

// Eagerly load Index for LCP
import Index from "./pages/Index";

// Lazy-load all other routes for bundle splitting
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicesPage = lazy(() => import("./pages/services/ServicesPage"));
const SEOPage = lazy(() => import("./pages/services/SEOPage"));
const PPCPage = lazy(() => import("./pages/services/PPCPage"));
const WebDesignPage = lazy(() => import("./pages/services/WebDesignPage"));
const SocialMediaPage = lazy(() => import("./pages/services/SocialMediaPage"));
const ContentMarketingPage = lazy(() => import("./pages/services/ContentMarketingPage"));
const EmailMarketingPage = lazy(() => import("./pages/services/EmailMarketingPage"));
const ConversionOptimizationPage = lazy(() => import("./pages/services/ConversionOptimizationPage"));
const EcommerceMarketingPage = lazy(() => import("./pages/services/EcommerceMarketingPage"));
const AmazonMarketingPage = lazy(() => import("./pages/services/AmazonMarketingPage"));
const VideoMarketingPage = lazy(() => import("./pages/services/VideoMarketingPage"));
const ProgrammaticAdvertisingPage = lazy(() => import("./pages/services/ProgrammaticAdvertisingPage"));
const AnalyticsAIPage = lazy(() => import("./pages/services/AnalyticsAIPage"));
const CustomDevelopmentPage = lazy(() => import("./pages/services/CustomDevelopmentPage"));
const AIMarketingPage = lazy(() => import("./pages/services/AIMarketingPage"));
const TrainingProgramsPage = lazy(() => import("./pages/services/TrainingProgramsPage"));
const SaaSProductsPage = lazy(() => import("./pages/services/SaaSProductsPage"));
const BrandingDesignPage = lazy(() => import("./pages/services/BrandingDesignPage"));
const MarketingAutomationPage = lazy(() => import("./pages/services/MarketingAutomationPage"));
const ConversionUXPage = lazy(() => import("./pages/services/ConversionUXPage"));
const GrowthHackingPage = lazy(() => import("./pages/services/GrowthHackingPage"));
const SubcategoryPage = lazy(() => import("./pages/services/subcategory/SubcategoryPage"));
const FeatureDetailPage = lazy(() => import("./pages/services/subcategory/FeatureDetailPage"));
const BenefitDetailPage = lazy(() => import("./pages/services/subcategory/BenefitDetailPage"));
const Careers = lazy(() => import("./pages/company/Careers"));
const AboutUs = lazy(() => import("./pages/company/AboutUs"));
const OurVerticals = lazy(() => import("./pages/company/OurVerticals"));
const VerticalDetailPage = lazy(() => import("./pages/company/VerticalDetailPage"));
const UpcomingVerticalDetailPage = lazy(() => import("./pages/company/UpcomingVerticalDetailPage"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const CaseStudies = lazy(() => import("./pages/company/CaseStudies"));
const CaseStudyDetailPage = lazy(() => import("./pages/company/CaseStudyDetailPage"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy"));
const ImpactDetailPage = lazy(() => import("./pages/impact/ImpactDetailPage"));
const FreeToolsPage = lazy(() => import("./pages/tools/FreeToolsPage"));
const ToolDetailPage = lazy(() => import("./pages/tools/ToolDetailPage"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/blog/BlogDetailPage"));
const DigitalMarketingAcademy = lazy(() => import("./pages/DigitalMarketingAcademy"));
const DigitalMarketingSyllabus = lazy(() => import("./pages/DigitalMarketingSyllabus"));
const AcademyBenefitDetailPage = lazy(() => import("./pages/academy/AcademyBenefitDetailPage"));
const AcademyModuleDetailPage = lazy(() => import("./pages/academy/AcademyModuleDetailPage"));
const AIWebsiteDesigningPage = lazy(() => import("./pages/academy/AIWebsiteDesigningPage"));
const AIGraphicDesigningPage = lazy(() => import("./pages/academy/AIGraphicDesigningPage"));
const AIVideoEditingPage = lazy(() => import("./pages/academy/AIVideoEditingPage"));
const GrowthStrategyPage = lazy(() => import("./pages/GrowthStrategyPage"));
const GrowthStageDetailPage = lazy(() => import("./pages/GrowthStageDetailPage"));
const AdminRoute = lazy(() => import("@/components/admin/AdminRoute"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminPages = lazy(() => import("@/pages/admin/AdminPages"));
const AdminPageEditor = lazy(() => import("@/pages/admin/AdminPageEditor"));
const AdminBlog = lazy(() => import("@/pages/admin/AdminBlog"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const AdminTestimonials = lazy(() => import("@/pages/admin/AdminTestimonials"));
const AdminRevenueForecasting = lazy(() => import("@/pages/admin/AdminRevenueForecasting"));
const AdminAIAgent = lazy(() => import("@/pages/admin/AdminAIAgent"));
const AdminContentWriter = lazy(() => import("@/pages/admin/AdminContentWriter"));
const AdminComments = lazy(() => import("@/pages/admin/AdminComments"));
const AdminABTesting = lazy(() => import("@/pages/admin/AdminABTesting"));
const AdminReferrals = lazy(() => import("@/pages/admin/AdminReferrals"));
const AdminActivityLog = lazy(() => import("@/pages/admin/AdminActivityLog"));
const AdminBulkEmail = lazy(() => import("@/pages/admin/AdminBulkEmail"));
const AdminUptimeMonitor = lazy(() => import("@/pages/admin/AdminUptimeMonitor"));
const AdminClientProjects = lazy(() => import("@/pages/admin/AdminClientProjects"));
const AdminSiteSettings = lazy(() => import("@/pages/admin/AdminSiteSettings"));
const AdminPortfolio = lazy(() => import("@/pages/admin/AdminPortfolio"));
const AdminFAQs = lazy(() => import("@/pages/admin/AdminFAQs"));
const AdminClientLogos = lazy(() => import("@/pages/admin/AdminClientLogos"));
const AdminMediaLibrary = lazy(() => import("@/pages/admin/AdminMediaLibrary"));
const AdminNavigation = lazy(() => import("@/pages/admin/AdminNavigation"));
const AdminAcademy = lazy(() => import("@/pages/admin/AdminAcademy"));
const ReferralPage = lazy(() => import("@/pages/ReferralPage"));
const ClientPortal = lazy(() => import("@/pages/ClientPortal"));
const QuoteCalculator = lazy(() => import("@/pages/QuoteCalculator"));
const WebDesignLandingPage = lazy(() => import("@/pages/WebDesignLandingPage"));
const WebDevAhmedabadLanding = lazy(() => import("@/pages/WebDevAhmedabadLanding"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <WhatsAppButton />
          <ScrollToTop />
          <LiveChatWidget />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/seo" element={<SEOPage />} />
              <Route path="/services/ppc" element={<PPCPage />} />
              <Route path="/services/web-design" element={<WebDesignPage />} />
              <Route path="/services/social-media" element={<SocialMediaPage />} />
              <Route path="/services/content-marketing" element={<ContentMarketingPage />} />
              <Route path="/services/email-marketing" element={<EmailMarketingPage />} />
              <Route path="/services/conversion-optimization" element={<ConversionOptimizationPage />} />
              <Route path="/services/ecommerce-marketing" element={<EcommerceMarketingPage />} />
              <Route path="/services/amazon-marketing" element={<AmazonMarketingPage />} />
              <Route path="/services/video-marketing" element={<VideoMarketingPage />} />
              <Route path="/services/programmatic-advertising" element={<ProgrammaticAdvertisingPage />} />
              <Route path="/services/analytics-ai-technology" element={<AnalyticsAIPage />} />
              <Route path="/services/custom-development" element={<CustomDevelopmentPage />} />
              <Route path="/services/ai-marketing" element={<AIMarketingPage />} />
              <Route path="/services/training-programs" element={<TrainingProgramsPage />} />
              <Route path="/services/saas-products" element={<SaaSProductsPage />} />
              <Route path="/services/branding-design" element={<BrandingDesignPage />} />
              <Route path="/services/marketing-automation-crm" element={<MarketingAutomationPage />} />
              <Route path="/services/conversion-ui-ux" element={<ConversionUXPage />} />
              <Route path="/services/growth-hacking" element={<GrowthHackingPage />} />
              <Route path="/services/:serviceSlug/:subcategoryId" element={<SubcategoryPage />} />
              <Route path="/services/:serviceSlug/:subcategoryId/feature/:itemSlug" element={<FeatureDetailPage />} />
              <Route path="/services/:serviceSlug/:subcategoryId/benefit/:itemSlug" element={<BenefitDetailPage />} />
              <Route path="/impact/:slug" element={<ImpactDetailPage />} />
              <Route path="/free-tools" element={<FreeToolsPage />} />
              <Route path="/free-tools/:toolSlug" element={<ToolDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/digital-marketing-academy" element={<DigitalMarketingAcademy />} />
              <Route path="/digital-marketing-academy/benefit/:benefitSlug" element={<AcademyBenefitDetailPage />} />
              <Route path="/digital-marketing-academy/module/:moduleSlug" element={<AcademyModuleDetailPage />} />
              <Route path="/digital-marketing-academy/ai-website-designing" element={<AIWebsiteDesigningPage />} />
              <Route path="/digital-marketing-academy/ai-graphic-designing" element={<AIGraphicDesigningPage />} />
              <Route path="/digital-marketing-academy/ai-video-editing" element={<AIVideoEditingPage />} />
              <Route path="/digital-marketing-syllabus" element={<DigitalMarketingSyllabus />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/our-verticals" element={<OurVerticals />} />
              <Route path="/our-verticals/:slug" element={<VerticalDetailPage />} />
              <Route path="/our-verticals/upcoming/:slug" element={<UpcomingVerticalDetailPage />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/growth-strategy" element={<GrowthStrategyPage />} />
              <Route path="/growth-strategy/:stageSlug" element={<GrowthStageDetailPage />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              {/* Public Pages */}
              <Route path="/websitedesignlandingpage" element={<WebDesignLandingPage />} />
              <Route path="/quote-calculator" element={<QuoteCalculator />} />
              <Route path="/referral" element={<ReferralPage />} />
              <Route path="/client-portal" element={<ClientPortal />} />
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminDashboard /></AdminRoute></Suspense>} />
              <Route path="/admin/pages" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminPages /></AdminRoute></Suspense>} />
              <Route path="/admin/pages/:pageId" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminPageEditor /></AdminRoute></Suspense>} />
              <Route path="/admin/blog" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminBlog /></AdminRoute></Suspense>} />
              <Route path="/admin/comments" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminComments /></AdminRoute></Suspense>} />
              <Route path="/admin/leads" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminLeads /></AdminRoute></Suspense>} />
              <Route path="/admin/testimonials" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminTestimonials /></AdminRoute></Suspense>} />
              <Route path="/admin/client-projects" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminClientProjects /></AdminRoute></Suspense>} />
              <Route path="/admin/site-settings" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminSiteSettings /></AdminRoute></Suspense>} />
              <Route path="/admin/portfolio" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminPortfolio /></AdminRoute></Suspense>} />
              <Route path="/admin/faqs" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminFAQs /></AdminRoute></Suspense>} />
              <Route path="/admin/client-logos" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminClientLogos /></AdminRoute></Suspense>} />
              <Route path="/admin/media" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminMediaLibrary /></AdminRoute></Suspense>} />
              <Route path="/admin/navigation" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminNavigation /></AdminRoute></Suspense>} />
              <Route path="/admin/academy" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminAcademy /></AdminRoute></Suspense>} />
              <Route path="/admin/ab-testing" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminABTesting /></AdminRoute></Suspense>} />
              <Route path="/admin/referrals" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminReferrals /></AdminRoute></Suspense>} />
              <Route path="/admin/bulk-email" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminBulkEmail /></AdminRoute></Suspense>} />
              <Route path="/admin/activity-log" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminActivityLog /></AdminRoute></Suspense>} />
              <Route path="/admin/uptime" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminUptimeMonitor /></AdminRoute></Suspense>} />
              <Route path="/admin/settings" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminSettings /></AdminRoute></Suspense>} />
              <Route path="/admin/revenue" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminRevenueForecasting /></AdminRoute></Suspense>} />
              <Route path="/admin/ai-agent" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminAIAgent /></AdminRoute></Suspense>} />
              <Route path="/admin/content-writer" element={<Suspense fallback={<PageLoader />}><AdminRoute><AdminContentWriter /></AdminRoute></Suspense>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
