import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CookiePolicy = () => {
    return (
        <>
            <Helmet>
                <title>Cookie Policy | Digital Bull Technology</title>
                <meta name="description" content="Learn about how Digital Bull Technology uses cookies to improve your user experience." />
            </Helmet>

            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                        <p className="lead text-muted-foreground text-lg mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                        <p>
                            This Cookie Policy explains what cookies are and how we use them. You should read this policy to understand what cookies are, how we use them, the types of cookies we use i.e, the information we collect using cookies and how that information is used and how to control the cookie preferences.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. What are cookies?</h2>
                        <p>
                            Cookies are small text files that are used to store small pieces of information. The cookies are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make the website more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. How do we use cookies?</h2>
                        <p>
                            As most of the online services, our website uses cookies first-party and third-party cookies for a number of purposes. The first-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.
                        </p>
                        <p>
                            The third-party cookies used on our websites are used mainly for understanding how the website performs, how you interact with our website, keeping our services secure, providing advertisements that are relevant to you, and all in all providing you with a better and improved user experience and help speed up your future interactions with our website.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Types of Cookies We Use</h2>

                        <div className="not-prose my-6 border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Essential</TableCell>
                                        <TableCell>Necessary for the site to function (e.g., security, network management).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Marketing</TableCell>
                                        <TableCell>Used to track visitors across websites to display relevant ads.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Analytics</TableCell>
                                        <TableCell>Help us understand how visitors interact with the website.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Preferences</TableCell>
                                        <TableCell>Used to store your preferences like language or search settings.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Managing Cookies</h2>
                        <p>
                            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                        </p>
                        <p>
                            For more information about how to manage cookies, visit <a href="https://www.allaboutcookies.org/manage-cookies/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">allaboutcookies.org</a>.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default CookiePolicy;
