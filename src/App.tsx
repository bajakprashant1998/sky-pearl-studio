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
import SocialMediaPage from "./pages/services/SocialMediaPage";
import ContentMarketingPage from "./pages/services/ContentMarketingPage";
import EmailMarketingPage from "./pages/services/EmailMarketingPage";
import ConversionOptimizationPage from "./pages/services/ConversionOptimizationPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/seo" element={<SEOPage />} />
            <Route path="/services/ppc" element={<PPCPage />} />
            <Route path="/services/social-media" element={<SocialMediaPage />} />
            <Route path="/services/content-marketing" element={<ContentMarketingPage />} />
            <Route path="/services/email-marketing" element={<EmailMarketingPage />} />
            <Route path="/services/conversion-optimization" element={<ConversionOptimizationPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
