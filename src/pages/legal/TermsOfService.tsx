import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | Digital Bull Technology</title>
                <meta name="description" content="Read Digital Bull Technology's Terms of Service. Understand the rules, regulations, and conditions for using our digital marketing services and website." />
                <meta name="keywords" content="terms of service, terms and conditions, user agreement, Digital Bull terms, service agreement" />
                <link rel="canonical" href="https://dibull.com/terms-of-service" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                        <p className="lead text-muted-foreground text-lg mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                        <p>
                            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Digital Bull Technology website (the "Service") operated by Digital Bull Technology ("us", "we", or "our").
                        </p>
                        <p>
                            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Digital Bull Technology and its licensors. The Service is protected by copyright, trademark, and other laws of both the India and foreign countries.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Links To Other Web Sites</h2>
                        <p>
                            Our Service may contain links to third-party web sites or services that are not owned or controlled by Digital Bull Technology.
                        </p>
                        <p>
                            Digital Bull Technology has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Digital Bull Technology shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Termination</h2>
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">5. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at: <a href="mailto:legal@digitalbull.com" className="text-primary hover:underline">legal@digitalbull.com</a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default TermsOfService;
