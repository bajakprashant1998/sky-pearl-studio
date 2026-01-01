import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | Digital Bull Technology</title>
                <meta name="description" content="Our commitment to your privacy. Read our Privacy Policy to understand how we collect, use, and protect your information." />
            </Helmet>

            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                        <p className="lead text-muted-foreground text-lg mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                        <p>
                            Digital Bull Technology ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Digital Bull Technology.
                        </p>
                        <p>
                            This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service"). By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us. For example, we collect information when you:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Create an account or complete a purchase</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Request customer support</li>
                            <li>Communicate with us</li>
                        </ul>
                        <p>The types of information we may collect include your name, email address, postal address, credit card information, and other contact or identifying information you choose to provide.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Usage of Collected Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send you technical notices, updates, security alerts, and support messages</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Communicate with you about products, services, offers, promotions, and events</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no internet or email transmission is ever fully secure or error free.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Services</h2>
                        <p>
                            We may share information about you with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. We may also share your information to comply with laws or to protect the rights, property, or safety of Digital Bull Technology, our users, or others.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@digitalbull.com" className="text-primary hover:underline">privacy@digitalbull.com</a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default PrivacyPolicy;
