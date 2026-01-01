import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Digital Bull Technology | Digital Marketing Agency - SEO, PPC & Social Media</title>
        <meta
          name="description"
          content="Digital Bull Technology is a leading digital marketing agency helping businesses grow with SEO, PPC advertising, social media marketing, and content strategies. Get results that matter."
        />
        <meta
          name="keywords"
          content="digital marketing agency, SEO services, PPC advertising, social media marketing, content marketing, email marketing"
        />
        <link rel="canonical" href="https://digitalbull.com" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
