import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const ContactUs = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Digital Bull Technology",
        "description": "Get in touch with Digital Bull Technology for digital marketing, SEO, PPC, and web design services.",
        "mainEntity": {
            "@type": "Organization",
            "name": "Digital Bull Technology",
            "telephone": "+91-9824011921",
            "email": "info@dibull.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "A 823 Moneyplant High Street, Jagatpur Road",
                "addressLocality": "Ahmedabad",
                "addressCountry": "IN"
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | Get Free Consultation | Digital Bull Technology</title>
                <meta
                    name="description"
                    content="Contact Digital Bull Technology for a free consultation on SEO, PPC, social media marketing, and web design. Call +91 9824011921 or email info@dibull.com. Based in Ahmedabad."
                />
                <meta
                    name="keywords"
                    content="contact digital marketing agency, free marketing consultation, SEO consultation, PPC services contact, Ahmedabad digital agency, Digital Bull contact"
                />
                <link rel="canonical" href="https://dibull.com/contact" />
                <meta property="og:title" content="Contact Digital Bull Technology | Free Consultation" />
                <meta property="og:description" content="Get in touch for a free digital marketing consultation. Expert SEO, PPC, and web design services." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dibull.com/contact" />
                <meta name="twitter:card" content="summary" />
                <meta name="robots" content="index, follow" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-20">
                <ContactSection />
            </main>

            <Footer />
        </>
    );
};

export default ContactUs;
