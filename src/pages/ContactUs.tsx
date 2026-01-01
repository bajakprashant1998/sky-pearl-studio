import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const ContactUs = () => {
    return (
        <>
            <Helmet>
                <title>Contact Us - Digital Bull Technology Pvt. Ltd.</title>
                <meta
                    name="description"
                    content="Get in touch with Digital Bull Technology. Whether you have a project in mind or just want to say hi, we'd love to hear from you."
                />
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
