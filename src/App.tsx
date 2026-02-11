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
import MarketingAutomationPage from "./pages/services/MarketingAutomationPage";
import ConversionUXPage from "./pages/services/ConversionUXPage";
import GrowthHackingPage from "./pages/services/GrowthHackingPage";
import SubcategoryPage from "./pages/services/subcategory/SubcategoryPage";
import FeatureDetailPage from "./pages/services/subcategory/FeatureDetailPage";
import BenefitDetailPage from "./pages/services/subcategory/BenefitDetailPage";
import Careers from "./pages/company/Careers";
import AboutUs from "./pages/company/AboutUs";
import OurVerticals from "./pages/company/OurVerticals";
import VerticalDetailPage from "./pages/company/VerticalDetailPage";
import UpcomingVerticalDetailPage from "./pages/company/UpcomingVerticalDetailPage";
import ContactUs from "./pages/ContactUs";
import CaseStudies from "./pages/company/CaseStudies";
import CaseStudyDetailPage from "./pages/company/CaseStudyDetailPage";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import ImpactDetailPage from "./pages/impact/ImpactDetailPage";
import FreeToolsPage from "./pages/tools/FreeToolsPage";
import ToolDetailPage from "./pages/tools/ToolDetailPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetailPage from "./pages/blog/BlogDetailPage";

import DigitalMarketingAcademy from "./pages/DigitalMarketingAcademy";
import DigitalMarketingSyllabus from "./pages/DigitalMarketingSyllabus";
import AcademyBenefitDetailPage from "./pages/academy/AcademyBenefitDetailPage";
import AcademyModuleDetailPage from "./pages/academy/AcademyModuleDetailPage";
import AIWebsiteDesigningPage from "./pages/academy/AIWebsiteDesigningPage";
import AIGraphicDesigningPage from "./pages/academy/AIGraphicDesigningPage";
import AIVideoEditingPage from "./pages/academy/AIVideoEditingPage";

import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

import AdminRoute from "@/components/admin/AdminRoute";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPages from "@/pages/admin/AdminPages";
import AdminPageEditor from "@/pages/admin/AdminPageEditor";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminSettings from "@/pages/admin/AdminSettings";

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
            <Route path="/careers" element={<Careers />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/pages" element={<AdminRoute><AdminPages /></AdminRoute>} />
            <Route path="/admin/pages/:pageId" element={<AdminRoute><AdminPageEditor /></AdminRoute>} />
            <Route path="/admin/blog" element={<AdminRoute><AdminBlog /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
