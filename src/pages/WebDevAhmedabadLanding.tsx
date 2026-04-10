import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  CheckCircle2, Phone, Globe, Shield, Zap, Smartphone, Users, Star,
  ArrowRight, Clock, Rocket, MessageCircle, Code, Palette, Search,
  BarChart3, ShoppingCart, Building2, Stethoscope, GraduationCap,
  Briefcase, UtensilsCrossed, Plane, Home, Award, TrendingUp,
  ChevronDown, ChevronUp, Headphones, MonitorSmartphone, Settings, Eye,
  Sparkles, Target, MousePointerClick, Layers
} from "lucide-react";

import imgCadbull from "@/assets/portfolio-ahmedabad/cadbull.png";
import imgArcll from "@/assets/portfolio-ahmedabad/arcll.png";
import imgInteriorsstore from "@/assets/portfolio-ahmedabad/interiorsstore.png";
import imgLovermatching from "@/assets/portfolio-ahmedabad/lovermatching.png";
import imgBhagavadgitagyan from "@/assets/portfolio-ahmedabad/bhagavadgitagyan.png";
import imgRentalyacht from "@/assets/portfolio-ahmedabad/rentalyacht.png";
import imgDreamdecor from "@/assets/portfolio-ahmedabad/dreamdecor.png";
import imgBetterviewtourism from "@/assets/portfolio-ahmedabad/betterviewtourism.png";
import imgJhpapi from "@/assets/portfolio-ahmedabad/jhpapi.png";
import imgHireforjob from "@/assets/portfolio-ahmedabad/hireforjob.png";
import imgGiftcityproperty from "@/assets/portfolio-ahmedabad/giftcityproperty.png";
import imgHandbricks from "@/assets/portfolio-ahmedabad/handbricks.png";
import imgDubaisqft from "@/assets/portfolio-ahmedabad/dubaisqft.png";
import imgCastingscreen from "@/assets/portfolio/castingscreen.webp";
import imgAutocadfiles from "@/assets/portfolio/autocadfiles.webp";
import imgAkyca from "@/assets/portfolio/akyca-new.webp";
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
  { value: "49999", label: "₹49,999 – Enterprise" },
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
    badge: "⭐ Most Popular — Best Value for Growing Business",
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
    price: "₹49,999",
    badge: "🔥 Premium Plan — Complete AI-Powered Growth Suite",
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
  { icon: Headphones, text: "24/7 Dedicated Support" },
  { icon: MonitorSmartphone, text: "Cross-Browser Compatible" },
  { icon: Settings, text: "Easy to Manage CMS" },
];

const processSteps = [
  { step: "01", title: "Requirement Analysis", desc: "We understand your business goals, target audience, and website requirements in detail.", icon: Search },
  { step: "02", title: "UI/UX Design", desc: "Our designers create a stunning, conversion-focused layout tailored to your brand.", icon: Palette },
  { step: "03", title: "Development", desc: "Expert developers build your website with clean code, fast loading, and mobile responsiveness.", icon: Code },
  { step: "04", title: "SEO & Optimization", desc: "We optimize every page for Google ranking with targeted keywords and technical SEO.", icon: BarChart3 },
  { step: "05", title: "Launch & Support", desc: "Your website goes live with full testing, and we provide ongoing support and maintenance.", icon: Rocket },
];

const industries = [
  { icon: ShoppingCart, name: "E-Commerce" },
  { icon: Building2, name: "Real Estate" },
  { icon: Stethoscope, name: "Healthcare" },
  { icon: GraduationCap, name: "Education" },
  { icon: Briefcase, name: "B2B / Corporate" },
  { icon: UtensilsCrossed, name: "Restaurant & Food" },
  { icon: Plane, name: "Travel & Tourism" },
  { icon: Home, name: "Interior & Architecture" },
  { icon: Settings, name: "Manufacturing" },
  { icon: TrendingUp, name: "Finance & Insurance" },
];

const stats = [
  { number: "500+", label: "Websites Delivered" },
  { number: "100+", label: "Happy Clients" },
  { number: "4.9★", label: "Google Rating" },
  { number: "3-7", label: "Days Delivery" },
];

const testimonials = [
  { name: "Rajesh Patel", role: "Owner, Patel Electronics", content: "DiBull ne humare business ke liye excellent website banayi. Leads directly WhatsApp par aate hain. Sales 3x badh gayi!", rating: 5 },
  { name: "Priya Shah", role: "Founder, Shah Boutique", content: "Very professional team. Website 5 din mein ready thi aur SEO ke wajah se Google par top par aa gaye. Highly recommended!", rating: 5 },
  { name: "Amit Desai", role: "MD, Desai Industries", content: "Enterprise plan liya tha. AI marketing agent aur lead automation system ne business ko next level par le jaaya. Best investment!", rating: 5 },
  { name: "Neha Mehta", role: "CEO, Mehta Interiors", content: "₹9,999 mein itna accha website milega socha nahi tha. Google Business Profile integration se local customers bahut aate hain.", rating: 5 },
];

const faqs = [
  { q: "Website kitne din mein ready hoti hai?", a: "Hamare packages ke according website 3 se 7 working days mein ready ho jaati hai. Enterprise plan mein 10-15 days lag sakte hain." },
  { q: "Kya domain aur hosting free hai?", a: "Haan! Sabhi packages mein 1 year free domain aur 12 month hosting included hai. Enterprise plan mein 24 month hosting milti hai." },
  { q: "Kya main apni website khud manage kar sakta hoon?", a: "Professional, Business Pro, aur Enterprise plans mein dynamic admin panel milta hai jisse aap apni website ka content khud update kar sakte hain." },
  { q: "SEO kya hai aur isse kya fayda hoga?", a: "SEO (Search Engine Optimization) se aapki website Google par top results mein aati hai. Isse aapko daily organic leads milti hain bina kisi paid advertising ke." },
  { q: "Payment kaise hoga?", a: "Hum UPI, Bank Transfer, aur online payment accept karte hain. 50% advance aur 50% delivery par payment hota hai." },
  { q: "Kya ecommerce website bhi bana sakte hain?", a: "Bilkul! Hum complete ecommerce websites banate hain jismein product listing, cart, payment gateway, aur order management sab included hota hai." },
  { q: "Support kaise milega?", a: "Sabhi plans mein WhatsApp aur phone support milta hai. Enterprise plan mein dedicated account manager milta hai." },
];

const portfolioItems = [
  { name: "Casting Screen", image: imgCastingscreen, category: "Talent Platform", url: "https://castingscreen.com/" },
  { name: "AutoCAD Files", image: imgAutocadfiles, category: "CAD Platform", url: "https://autocadfiles.com/" },
  { name: "Akyca", image: imgAkyca, category: "Finance", url: "https://akyca.com/" },
  { name: "CadBull", image: imgCadbull, category: "CAD Library", url: "https://cadbull.com/" },
  { name: "ARCLL", image: imgArcll, category: "Architecture", url: "https://arcll.com/" },
  { name: "Interiors Store", image: imgInteriorsstore, category: "E-Commerce", url: "https://interiorsstore.com/" },
  { name: "Lover Matching", image: imgLovermatching, category: "Dating Platform", url: "https://lovermatching.com/" },
  { name: "Bhagavad Gita Gyan", image: imgBhagavadgitagyan, category: "Spiritual", url: "https://bhagavadgitagyan.com/" },
  { name: "Rental Yacht Dubai", image: imgRentalyacht, category: "Tourism", url: "https://rentalyachtindubai.com/" },
  { name: "Dream Decor", image: imgDreamdecor, category: "Interior", url: "https://dreamdecor.dibull.com/" },
  { name: "Better View Tourism", image: imgBetterviewtourism, category: "Tourism", url: "https://betterviewtourism.dibull.com/" },
  { name: "JHP API", image: imgJhpapi, category: "Pharma", url: "https://jhpapi.dibull.com/" },
  { name: "HireForJob", image: imgHireforjob, category: "Job Portal", url: "https://www.hireforjob.com/" },
  { name: "GIFT City Property", image: imgGiftcityproperty, category: "Real Estate", url: "https://giftcityproperty.com/" },
  { name: "Handbricks", image: imgHandbricks, category: "Real Estate", url: "https://handbricks.com/" },
  { name: "Dubai SqFt", image: imgDubaisqft, category: "Real Estate", url: "https://dubaisqft.com/" },
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
        score: formData.package === "49999" ? 90 : formData.package === "19999" ? 75 : formData.package === "14999" ? 65 : formData.package === "9999" ? 55 : 40,
        temperature: formData.package === "49999" || formData.package === "19999" ? "hot" : formData.package === "14999" || formData.package === "9999" ? "warm" : "cold",
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
        className="w-full h-12 rounded-lg border border-white/30 bg-white/10 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
      >
        <option value="" disabled>Select Package *</option>
        {packages.map(p => <option key={p.value} value={p.value} className="bg-[#0a1628] text-white">{p.label}</option>)}
      </select>
      <Input required placeholder="Your Name *" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500" />
      <Input required placeholder="WhatsApp Number *" type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500" />
      <Input required placeholder="Email Address *" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500" />
      <Input placeholder="Business Name" value={formData.business_name} onChange={e => setFormData(p => ({ ...p, business_name: e.target.value }))} className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500" />
      <Textarea placeholder="Your Requirement" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500 min-h-[80px]" />
      <Button type="submit" disabled={loading} className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-red-600/30 transition-all">
        {loading ? "Submitting..." : buttonText}
      </Button>
      <p className="text-center text-sm text-muted-foreground">{note}</p>
    </form>
  );
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
        <span className="font-semibold text-white/90 pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />}
      </button>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5">
          <p className="text-white/60 text-sm leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
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
          "priceRange": "₹5,999 - ₹49,999",
          "description": "Best website development company in Ahmedabad offering professional web design, SEO, and digital marketing services.",
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0a1628] text-white font-sans">
        {/* Red Top Strip */}
        <div className="bg-red-600 text-white text-center py-2.5 text-sm font-bold tracking-wider uppercase animate-pulse">
          🔥 LIMITED TIME OFFER — Free Domain + Free Hosting 🔥
        </div>

        {/* HERO SECTION */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Advanced background graphics */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2040] to-[#0a1628]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[200px]" />
          
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-red-400/30 rounded-full"
              style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%` }}
              animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}

          {/* Decorative icons */}
          <motion.div className="absolute top-20 left-10 text-red-500/10" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <Target className="w-16 h-16" />
          </motion.div>
          <motion.div className="absolute bottom-20 right-10 text-blue-500/10" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            <Layers className="w-20 h-20" />
          </motion.div>
          <motion.div className="absolute top-32 right-1/4 text-red-400/10" animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}>
            <Sparkles className="w-12 h-12" />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div className="text-center lg:text-left space-y-6" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                {/* Trust badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/15 border border-red-500/30 rounded-full text-sm text-red-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Award className="w-4 h-4" />
                  <span className="font-medium">Ahmedabad's #1 Web Development Company</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-red-500">FREE DOMAIN</span> + <span className="text-red-500">FREE HOSTING</span>
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-white/90">
                  Get Your Business Website Starting at <span className="text-red-400 font-bold">₹5,999</span>
                </p>
                <p className="text-xl text-yellow-300 font-medium">📲 Get Daily Leads on Your Phone</p>
                
                {/* Mini stats row */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {[
                    { icon: MousePointerClick, text: "500+ Projects" },
                    { icon: Star, text: "4.9★ Rating" },
                    { icon: Zap, text: "3-7 Days Delivery" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/70"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <item.icon className="w-3.5 h-3.5 text-red-400" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>

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

              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Glow effect behind form */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 rounded-2xl blur-xl -z-10" />
                <h2 className="text-2xl font-bold text-center mb-6">Book Your Website Now</h2>
                <LeadForm id="hero-form" buttonText="Get Free Consultation" note="We will contact you within 24 hours" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS COUNTER */}
        <section className="py-10 bg-gradient-to-r from-red-700/90 via-red-600 to-red-700/90 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-extrabold text-white">{s.number}</p>
                  <p className="text-white/80 text-sm mt-1">{s.label}</p>
                </motion.div>
              ))}
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
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap ${
                      plan.premium ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/30" : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                    }`}>
                      {plan.badge}
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

        {/* OUR PROCESS */}
        <section className="py-16 md:py-24 bg-[#0d1e38]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Our <span className="text-red-500">Work Process</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">Simple, transparent, and result-driven — here's how we build your website</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-0">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start py-8 relative"
                >
                  {/* Connector line */}
                  {i < processSteps.length - 1 && (
                    <div className="absolute left-[27px] top-[72px] w-0.5 h-[calc(100%-40px)] bg-gradient-to-b from-red-500/40 to-transparent" />
                  )}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-red-600/15 border border-red-500/30 flex items-center justify-center relative z-10">
                    <step.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Step {step.step}</span>
                    <h3 className="text-xl font-bold mt-1 text-white">{step.title}</h3>
                    <p className="text-white/60 text-sm mt-2 leading-relaxed max-w-lg">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES WE SERVE */}
        <section className="py-16 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Industries <span className="text-red-500">We Serve</span>
              </h2>
              <p className="text-white/60">We have built websites for 50+ different industries across Ahmedabad</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {industries.map((ind, i) => (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/[0.08] transition-all group"
                >
                  <ind.icon className="w-8 h-8 text-white/40 group-hover:text-red-400 transition-colors" />
                  <span className="text-xs font-medium text-white/70 text-center">{ind.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

         {/* PORTFOLIO SHOWCASE */}
         <section className="py-16 md:py-24 bg-[#0d1e38]">
           <div className="container mx-auto px-4">
             <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold mb-3">
                 Our <span className="text-red-500">Portfolio</span>
               </h2>
               <p className="text-white/60">Websites we have designed & developed</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
               {portfolioItems.map((item, i) => (
                 <motion.a
                   key={item.name}
                   href={item.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.05 }}
                   className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-red-500/40 transition-all"
                 >
                   {/* Browser mockup */}
                   <div className="bg-[#1a2a44] px-3 py-1.5 flex items-center gap-1.5 border-b border-white/10">
                     <div className="w-2 h-2 rounded-full bg-red-400" />
                     <div className="w-2 h-2 rounded-full bg-yellow-400" />
                     <div className="w-2 h-2 rounded-full bg-green-400" />
                     <span className="ml-2 text-[9px] text-white/40 truncate">{item.url.replace(/https?:\/\//, '').replace(/\/$/, '')}</span>
                   </div>
                   {/* Screenshot */}
                   <div className="aspect-[16/10] overflow-hidden">
                     <img
                       src={item.image}
                       alt={`${item.name} website`}
                       className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                       loading="lazy"
                     />
                   </div>
                   {/* Info */}
                   <div className="p-3">
                     <h3 className="font-bold text-white text-sm">{item.name}</h3>
                     <span className="text-[10px] text-white/50">{item.category}</span>
                   </div>
                 </motion.a>
               ))}
             </div>
           </div>
         </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why <span className="text-red-500">Choose Us</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08 }}
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

        {/* TESTIMONIALS */}
        <section className="py-16 md:py-24 bg-[#0d1e38]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                What Our <span className="text-red-500">Clients Say</span>
              </h2>
              <p className="text-white/60">Real reviews from our Ahmedabad-based clients</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 relative"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed italic">"{t.content}"</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Frequently Asked <span className="text-red-500">Questions</span>
              </h2>
              <p className="text-white/60">Got questions? We've got answers.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM LEAD FORM */}
        <section className="py-16 md:py-24 bg-[#0d1e38]">
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
