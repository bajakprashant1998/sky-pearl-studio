import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SEOPage from "./pages/services/SEOPage";
import PPCPage from "./pages/services/PPCPage";
import WebDesignPage from "./pages/services/WebDesignPage";
import SocialMediaPage from "./pages/services/SocialMediaPage";
import ContentMarketingPage from "./pages/services/ContentMarketingPage";
import EmailMarketingPage from "./pages/services/EmailMarketingPage";
import ConversionOptimizationPage from "./pages/services/ConversionOptimizationPage";
import EcommerceMarketingPage from "./pages/services/EcommerceMarketingPage";
import AmazonMarketingPage from "./pages/services/AmazonMarketingPage";
import VideoMarketingPage from "./pages/services/VideoMarketingPage";
import ProgrammaticAdvertisingPage from "./pages/services/ProgrammaticAdvertisingPage";
import AnalyticsAIPage from "./pages/services/AnalyticsAIPage";
import CustomDevelopmentPage from "./pages/services/CustomDevelopmentPage";
import AIMarketingPage from "./pages/services/AIMarketingPage";
import TrainingProgramsPage from "./pages/services/TrainingProgramsPage";
import SaaSProductsPage from "./pages/services/SaaSProductsPage";
import BrandingDesignPage from "./pages/services/BrandingDesignPage";
import SubcategoryPage from "./pages/services/subcategory/SubcategoryPage";
import FeatureDetailPage from "./pages/services/subcategory/FeatureDetailPage";
import BenefitDetailPage from "./pages/services/subcategory/BenefitDetailPage";
import Careers from "./pages/company/Careers";
import AboutUs from "./pages/company/AboutUs";
import ContactUs from "./pages/ContactUs";
import CaseStudies from "./pages/company/CaseStudies";
import CaseStudyDetailPage from "./pages/company/CaseStudyDetailPage";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import ImpactDetailPage from "./pages/impact/ImpactDetailPage";
import FreeToolsPage from "./pages/tools/FreeToolsPage";
import ToolDetailPage from "./pages/tools/ToolDetailPage";
import DigitalMarketingClasses from "./pages/DigitalMarketingClasses";


import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <WhatsAppButton />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
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
            {/* Dynamic subcategory routes */}
            <Route path="/services/:serviceSlug/:subcategoryId" element={<SubcategoryPage />} />
            {/* Dynamic feature routes */}
            <Route path="/services/:serviceSlug/:subcategoryId/feature/:itemSlug" element={<FeatureDetailPage />} />
            {/* Dynamic benefit routes */}
            <Route path="/services/:serviceSlug/:subcategoryId/benefit/:itemSlug" element={<BenefitDetailPage />} />

            {/* Business Impact routes */}
            <Route path="/impact/:slug" element={<ImpactDetailPage />} />

            {/* Free Tools routes */}
            <Route path="/free-tools" element={<FreeToolsPage />} />
            <Route path="/free-tools/:toolSlug" element={<ToolDetailPage />} />

            {/* Company & Legal routes */}
            <Route path="/digital-marketing-classes" element={<DigitalMarketingClasses />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
