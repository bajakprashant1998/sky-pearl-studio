import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Globe, Shield, Zap, Smartphone, Users, Star, ArrowRight, Clock, Rocket, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const packages = [
  { value: "5999", label: "₹5,999 – Starter" },
  { value: "9999", label: "₹9,999 – Growth" },
  { value: "14999", label: "₹14,999 – Professional" },
  { value: "19999", label: "₹19,999 – Business Pro" },
  { value: "35000", label: "₹35,000 – Enterprise" },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "₹5,999",
    badge: null,
    highlight: false,
    premium: false,
    features: [
      "Up to 4 Pages Website",
      "Free Domain (1 Year)",
      "12 Month Hosting",
      "WhatsApp Integration",
      "Direct Leads on Phone",
      "1 Month SEO (3 Keywords)",
    ],
  },
  {
    name: "Growth",
    price: "₹9,999",
    badge: "Most Popular",
    highlight: true,
    premium: false,
    features: [
      "Up to 12 Pages Website",
      "Free Domain (1 Year)",
      "12 Month Hosting",
      "WhatsApp Integration",
      "Direct Leads on Phone",
      "2 Month SEO (5 Keywords)",
      "Google Business Profile Integration",
    ],
  },
  {
    name: "Professional",
    price: "₹14,999",
    badge: null,
    highlight: false,
    premium: false,
    features: [
      "Up to 20 Pages Website",
      "Free Domain (1 Year)",
      "12 Month Hosting",
      "WhatsApp Integration",
      "Direct Leads on Phone",
      "4 Month SEO (5 Keywords)",
      "Google Business Profile Integration",
      "Dynamic Admin Panel Access",
    ],
  },
  {
    name: "Business Pro",
    price: "₹19,999",
    badge: null,
    highlight: false,
    premium: false,
    features: [
      "Up to 50 Pages Website",
      "Free Domain (1 Year)",
      "12 Month Hosting",
      "WhatsApp Integration",
      "Direct Leads on Phone",
      "6 Month SEO (5 Keywords)",
      "Google Business Profile Integration",
      "Dynamic Admin Panel Access",
    ],
  },
  {
    name: "Enterprise",
    price: "₹35,000",
    badge: "Premium Plan",
    highlight: false,
    premium: true,
    features: [
      "Unlimited Pages Website",
      "Free Domain (1 Year)",
      "24 Month Hosting",
      "WhatsApp Integration",
      "Direct Leads on Phone",
      "12 Month SEO (15 Keywords)",
      "Google Business Profile Integration",
      "Dynamic Admin Panel Access",
      "AI SEO Agent",
      "AI Marketing Representative",
      "Lead Automation System",
    ],
  },
];

const whyChooseUs = [
  { icon: MessageCircle, text: "Get Leads Directly on WhatsApp" },
  { icon: Rocket, text: "SEO Optimized Websites" },
  { icon: Zap, text: "Fast Delivery (3–7 Days)" },
  { icon: Smartphone, text: "Mobile Responsive Design" },
  { icon: Shield, text: "Complete Business Growth Solution" },
];

interface LeadFormProps {
  id: string;
  buttonText: string;
  note: string;
}

const LeadForm = ({ id, buttonText, note }: LeadFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    package: "",
    name: "",
    phone: "",
    email: "",
    business_name: "",
    message: "",
    _honey: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._honey) return;
    if (!formData.name || !formData.phone || !formData.email || !formData.package) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const selectedPkg = packages.find(p => p.value === formData.package);
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        business_name: formData.business_name || null,
        message: formData.message || null,
        budget: selectedPkg?.label || formData.package,
        website_type: "Website Development",
        source: "ahmedabad-landing",
        score: formData.package === "35000" ? 90 : formData.package === "19999" ? 75 : formData.package === "14999" ? 65 : formData.package === "9999" ? 55 : 40,
        temperature: formData.package === "35000" || formData.package === "19999" ? "hot" : formData.package === "14999" || formData.package === "9999" ? "warm" : "cold",
      });
      if (error) throw error;
      toast.success("Thank you! We will contact you within 24 hours.");
      setFormData({ package: "", name: "", phone: "", email: "", business_name: "", message: "", _honey: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id={id} className="space-y-4 w-full max-w-lg mx-auto">
      <input type="text" name="_honey" className="hidden" value={formData._honey} onChange={e => setFormData(p => ({ ...p, _honey: e.target.value }))} tabIndex={-1} autoComplete="off" />
      <select
        required
        value={formData.package}
        onChange={e => setFormData(p => ({ ...p, package: e.target.value }))}
        className="w-full h-12 rounded-lg border border-white/20 bg-white/10 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
      >
        <option value="" disabled>Select Package *</option>
        {packages.map(p => <option key={p.value} value={p.value} className="bg-[#0a1628] text-white">{p.label}</option>)}
      </select>
      <Input required placeholder="Your Name *" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="h-12 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground focus:ring-red-500" />
      <Input required placeholder="WhatsApp Number *" type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="h-12 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground focus:ring-red-500" />
      <Input required placeholder="Email Address *" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="h-12 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground focus:ring-red-500" />
      <Input placeholder="Business Name" value={formData.business_name} onChange={e => setFormData(p => ({ ...p, business_name: e.target.value }))} className="h-12 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground focus:ring-red-500" />
      <Textarea placeholder="Your Requirement" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className="bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground focus:ring-red-500 min-h-[80px]" />
      <Button type="submit" disabled={loading} className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-red-600/30 transition-all">
        {loading ? "Submitting..." : buttonText}
      </Button>
      <p className="text-center text-sm text-muted-foreground">{note}</p>
    </form>
  );
};

const WebDevAhmedabadLanding = () => {
  return (
    <>
      <Helmet>
        <title>Best Website Development Company in Ahmedabad | Starting ₹5,999 – DiBull</title>
        <meta name="description" content="Top website developer in Ahmedabad. Get a professional business website starting at ₹5,999 with free domain, hosting, SEO & WhatsApp leads. Best web design company in Ahmedabad." />
        <meta name="keywords" content="website developer in ahmedabad, web development company ahmedabad, website development company ahmedabad, best website developer in ahmedabad, web developer in ahmedabad, web designer in ahmedabad, website development in ahmedabad, top 10 web design company in ahmedabad, best web development company in ahmedabad, web design company ahmedabad, best website development company in ahmedabad, ecommerce website developer in ahmedabad, best web design and development company in ahmedabad, best web design company in ahmedabad, best website design and development company in ahmedabad, best website designing company in ahmedabad, e commerce website development in ahmedabad, ecommerce development ahmedabad, ecommerce development company in ahmedabad, ecommerce development in ahmedabad" />
        <link rel="canonical" href="https://www.dibull.com/website-development-in-ahmedabad" />
        <meta property="og:title" content="Best Website Development in Ahmedabad | Starting ₹5,999" />
        <meta property="og:description" content="Get your business website with free domain + hosting starting at ₹5,999. Best web development company in Ahmedabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dibull.com/website-development-in-ahmedabad" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Digital Bull Technology Pvt Ltd",
          "url": "https://www.dibull.com",
          "telephone": "+919825009111",
          "address": { "@type": "PostalAddress", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" },
          "priceRange": "₹5,999 - ₹35,000",
          "description": "Best website development company in Ahmedabad offering professional web design, SEO, and digital marketing services.",
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0a1628] text-white">
        {/* Red Top Strip */}
        <div className="bg-red-600 text-white text-center py-2.5 text-sm font-bold tracking-wider uppercase animate-pulse">
          🔥 LIMITED TIME OFFER — Free Domain + Free Hosting 🔥
        </div>

        {/* HERO SECTION */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2040] to-[#0a1628]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <motion.div className="text-center lg:text-left space-y-6" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-red-500">FREE DOMAIN</span> + <span className="text-red-500">FREE HOSTING</span>
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-white/90">
                  Get Your Business Website Starting at <span className="text-red-400 font-bold">₹5,999</span>
                </p>
                <p className="text-xl text-yellow-300 font-medium">
                  📲 Get Daily Leads on Your Phone
                </p>
                <div className="flex items-center gap-2 justify-center lg:justify-start text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Limited Slots Available • Offer Ending Soon</span>
                </div>
                <Button
                  onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className="h-14 px-10 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all lg:hidden"
                >
                  Book Your Website Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              {/* Right - Form */}
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-center mb-6">Book Your Website Now</h2>
                <LeadForm id="hero-form" buttonText="Get Free Consultation" note="We will contact you within 24 hours" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST + BRANDING */}
        <section className="py-10 bg-[#0d1e38] border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-3 mb-8">
              <h2 className="text-2xl font-bold">Digital Bull Technology Pvt Ltd</h2>
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm">
                <a href="https://www.dibull.com" className="flex items-center gap-1.5 hover:text-white transition-colors"><Globe className="w-4 h-4" /> www.dibull.com</a>
                <a href="tel:9825009111" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone className="w-4 h-4" /> 9825009111</a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { icon: Zap, label: "Fast Delivery" },
                { icon: Smartphone, label: "Mobile Friendly" },
                { icon: Users, label: "100+ Clients Served" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <b.icon className="w-6 h-6 text-red-400" />
                  <span className="text-xs font-medium text-white/80">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="py-16 md:py-24 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Choose Your <span className="text-red-500">Website Package</span>
              </h2>
              <p className="text-white/60">All packages include Free Domain + Hosting</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl p-6 flex flex-col border transition-all hover:-translate-y-1 ${
                    plan.premium
                      ? "bg-gradient-to-b from-yellow-900/30 via-[#1a2a44] to-[#0a1628] border-yellow-500/40 shadow-lg shadow-yellow-500/10"
                      : plan.highlight
                      ? "bg-gradient-to-b from-red-900/20 via-[#1a2a44] to-[#0a1628] border-red-500/40 shadow-lg shadow-red-500/10 scale-[1.02]"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                      plan.premium ? "bg-yellow-500 text-black" : "bg-red-600 text-white"
                    }`}>
                      {plan.premium ? "🔥 " : "⭐ "}{plan.badge}
                    </div>
                  )}
                  <div className="text-center mb-4 pt-2">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <p className={`text-3xl font-extrabold mt-1 ${plan.premium ? "text-yellow-400" : plan.highlight ? "text-red-400" : "text-white"}`}>{plan.price}</p>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.premium ? "text-yellow-400" : "text-green-400"}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => document.getElementById("bottom-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className={`w-full mt-6 h-12 font-bold rounded-lg ${
                      plan.premium ? "bg-yellow-500 hover:bg-yellow-600 text-black" : plan.highlight ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 bg-[#0d1e38]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why <span className="text-red-500">Choose Us</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM LEAD FORM */}
        <section className="py-16 md:py-24 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="text-center space-y-3 mb-8">
                <h2 className="text-3xl font-bold">Get Started Today</h2>
                <p className="text-white/60">Fill the form below and our team will contact you shortly</p>
              </div>
              <LeadForm id="bottom-form" buttonText="Book Your Website Now" note="Our team will contact you shortly" />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-gradient-to-r from-red-700 via-red-600 to-red-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Start Growing Your Business Online Today
            </h2>
            <Button
              onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="h-14 px-12 bg-white text-red-600 hover:bg-white/90 text-lg font-bold rounded-xl shadow-lg"
            >
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-white/80 text-sm flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> Limited Time Offer • Limited Slots Available
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-[#060f1f] text-center text-white/40 text-sm border-t border-white/5">
          <p>© {new Date().getFullYear()} Digital Bull Technology Pvt Ltd. All rights reserved.</p>
          <p className="mt-1">Best Website Development Company in Ahmedabad</p>
        </footer>
      </div>
    </>
  );
};

export default WebDevAhmedabadLanding;
