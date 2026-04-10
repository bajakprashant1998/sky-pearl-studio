import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Phone, Globe, Shield, Zap, Smartphone, Users, Star,
  ArrowRight, Clock, Rocket, MessageCircle, Code, Palette, Search,
  BarChart3, ShoppingCart, Building2, Stethoscope, GraduationCap,
  Briefcase, UtensilsCrossed, Plane, Home, Award, TrendingUp,
  ChevronDown, ChevronUp, Headphones, MonitorSmartphone, Settings,
  Sparkles, Target, MousePointerClick, Layers, ArrowDown,
  X, Crown, Check, BadgeCheck, Percent
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

// ─── DATA ───
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
  { icon: MessageCircle, text: "Get Leads Directly on WhatsApp", desc: "Every inquiry lands straight on your phone" },
  { icon: Rocket, text: "SEO Optimized Websites", desc: "Built for Google page 1 rankings" },
  { icon: Zap, text: "Fast Delivery (3–7 Days)", desc: "Go live faster than any competitor" },
  { icon: Smartphone, text: "Mobile Responsive Design", desc: "Pixel-perfect on every device" },
  { icon: Shield, text: "Complete Business Growth Solution", desc: "Website + SEO + Marketing in one package" },
  { icon: Headphones, text: "24/7 Dedicated Support", desc: "Always available when you need us" },
  { icon: MonitorSmartphone, text: "Cross-Browser Compatible", desc: "Works on Chrome, Safari, Firefox & more" },
  { icon: Settings, text: "Easy to Manage CMS", desc: "Update your content without coding" },
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
  { number: 500, suffix: "+", label: "Websites Delivered" },
  { number: 100, suffix: "+", label: "Happy Clients" },
  { number: 4.9, suffix: "★", label: "Google Rating", decimal: true },
  { number: 3, suffix: "-7", label: "Days Delivery" },
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

const rotatingWords = ["Revenue", "Leads", "Growth", "Sales", "Customers"];

// ─── ANIMATED COUNTER ───
const AnimatedCounter = ({ target, suffix = "", decimal = false }: { target: number; suffix?: string; decimal?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, decimal]);

  return <span ref={ref} className="tabular-nums">{decimal ? count.toFixed(1) : count}{suffix}</span>;
};

// ─── LEAD FORM ───
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
    <form onSubmit={handleSubmit} id={id} className="space-y-3 sm:space-y-4 w-full max-w-lg mx-auto">
      <input type="text" name="_honey" className="hidden" value={formData._honey} onChange={e => setFormData(p => ({ ...p, _honey: e.target.value }))} tabIndex={-1} autoComplete="off" />
      <select
        required
        value={formData.package}
        onChange={e => setFormData(p => ({ ...p, package: e.target.value }))}
        className="w-full h-11 sm:h-12 rounded-lg border border-white/30 bg-white/10 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
      >
        <option value="" disabled>Select Package *</option>
        {packages.map(p => <option key={p.value} value={p.value} className="bg-[#0a1628] text-white">{p.label}</option>)}
      </select>
      <Input required placeholder="Your Name *" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="h-11 sm:h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500 text-sm" />
      <Input required placeholder="WhatsApp Number *" type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="h-11 sm:h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500 text-sm" />
      <Input required placeholder="Email Address *" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="h-11 sm:h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500 text-sm" />
      <Input placeholder="Business Name" value={formData.business_name} onChange={e => setFormData(p => ({ ...p, business_name: e.target.value }))} className="h-11 sm:h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500 text-sm" />
      <Textarea placeholder="Your Requirement" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:ring-red-500 min-h-[70px] sm:min-h-[80px] text-sm" />
      <Button type="submit" disabled={loading} className="w-full h-12 sm:h-14 bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg font-bold rounded-lg shadow-lg hover:shadow-red-600/30 transition-all group">
        {loading ? "Submitting..." : (
          <span className="flex items-center justify-center gap-2">
            {buttonText}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
      <p className="text-center text-xs sm:text-sm text-white/50">{note}</p>
    </form>
  );
};

// ─── FAQ ITEM ───
const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06 }}
      className="border border-white/10 rounded-xl overflow-hidden hover:border-red-500/30 transition-colors"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/5 transition-colors">
        <span className="font-semibold text-white/90 pr-3 sm:pr-4 text-sm sm:text-base">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${open ? "text-red-400" : "text-white/40"}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── SECTION HEADING ───
const SectionHeading = ({ pre, highlight, post, subtitle }: { pre: string; highlight: string; post?: string; subtitle: string }) => (
  <motion.div
    className="text-center mb-8 sm:mb-14"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
      {pre} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">{highlight}</span>{post && ` ${post}`}
    </h2>
    <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">{subtitle}</p>
  </motion.div>
);

// ─── MAIN COMPONENT ───
const WebDevAhmedabadLanding = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Best Website Development Company in Ahmedabad | Starting ₹5,999 – DiBull</title>
        <meta name="description" content="Top-rated website development company in Ahmedabad. Get a professional business website starting at ₹5,999 with free domain, hosting, SEO & WhatsApp leads. 500+ projects delivered. 3-7 days delivery." />
        <meta name="keywords" content="website developer in ahmedabad, web development company ahmedabad, website development company ahmedabad, best website developer in ahmedabad, web developer in ahmedabad, web designer in ahmedabad, website development in ahmedabad, top 10 web design company in ahmedabad, best web development company in ahmedabad, web design company ahmedabad, best website development company in ahmedabad, ecommerce website developer in ahmedabad, best web design and development company in ahmedabad, best web design company in ahmedabad, best website design and development company in ahmedabad, best website designing company in ahmedabad, e commerce website development in ahmedabad, ecommerce development ahmedabad, ecommerce development company in ahmedabad, ecommerce development in ahmedabad, affordable website development ahmedabad, wordpress developer ahmedabad, react developer ahmedabad" />
        <link rel="canonical" href="https://www.dibull.com/website-development-in-ahmedabad" />
        <meta property="og:title" content="Best Website Development in Ahmedabad | Starting ₹5,999 – DiBull" />
        <meta property="og:description" content="Get your business website with free domain + hosting starting at ₹5,999. 500+ projects delivered. Best web development company in Ahmedabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dibull.com/website-development-in-ahmedabad" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Digital Bull Technology Pvt Ltd" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Digital Bull Technology Pvt Ltd",
          "url": "https://www.dibull.com",
          "telephone": "+919825009111",
          "address": { "@type": "PostalAddress", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN", "postalCode": "380015" },
          "priceRange": "₹5,999 - ₹49,999",
          "description": "Best website development company in Ahmedabad offering professional web design, SEO, and digital marketing services starting at ₹5,999.",
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "reviewCount": "127" },
          "sameAs": ["https://www.facebook.com/dibulltech", "https://www.instagram.com/dibulltech", "https://www.linkedin.com/company/dibull"],
          "openingHours": "Mo-Sa 09:00-19:00",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Website Development Packages",
            "itemListElement": pricingPlans.map((p, i) => ({
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": `${p.name} Website Package` },
              "price": p.price.replace("₹", "").replace(",", ""),
              "priceCurrency": "INR",
              "position": i + 1
            }))
          }
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
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.dibull.com" },
            { "@type": "ListItem", "position": 2, "name": "Website Development in Ahmedabad", "item": "https://www.dibull.com/website-development-in-ahmedabad" }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0a1628] text-white font-sans">
        {/* ─── RED TOP STRIP ─── */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-center py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">🔥 LIMITED TIME OFFER — Free Domain + Free Hosting 🔥</span>
        </div>

        {/* ─── HERO SECTION ─── */}
        <section ref={heroRef} className="relative py-10 sm:py-16 md:py-24 overflow-hidden min-h-[85vh] sm:min-h-0 flex items-center">
          {/* Parallax background */}
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2040] to-[#0a1628]" />
            <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-red-600/15 rounded-full blur-[100px] sm:blur-[180px]" />
            <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-blue-500/8 rounded-full blur-[80px] sm:blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-red-600/5 rounded-full blur-[100px] sm:blur-[200px]" />
          </motion.div>

          {/* Animated grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-400/20 rounded-full hidden sm:block"
              style={{ left: `${5 + i * 12}%`, top: `${10 + (i % 4) * 22}%` }}
              animate={{ y: [-30, 30, -30], opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
              transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}

          {/* Decorative spinning icons */}
          <motion.div className="absolute top-16 left-6 sm:left-10 text-red-500/8 hidden md:block" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            <Target className="w-16 h-16" />
          </motion.div>
          <motion.div className="absolute bottom-20 right-10 text-blue-500/8 hidden md:block" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            <Layers className="w-20 h-20" />
          </motion.div>

          <motion.div className="container mx-auto px-4 sm:px-6 relative z-10" style={{ opacity: heroOpacity }}>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div className="text-center lg:text-left space-y-4 sm:space-y-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                {/* Trust badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/15 border border-red-500/30 rounded-full text-xs sm:text-sm text-red-300 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-medium">Ahmedabad's #1 Web Development Company</span>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  <motion.span
                    className="text-red-500 inline-block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    FREE DOMAIN
                  </motion.span>
                  {" "}+{" "}
                  <motion.span
                    className="text-red-500 inline-block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    FREE HOSTING
                  </motion.span>
                </h1>

                <motion.p
                  className="text-lg sm:text-2xl md:text-3xl font-semibold text-white/90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Get Your Business Website Starting at{" "}
                  <span className="text-red-400 font-bold relative">
                    ₹5,999
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-red-400/50"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                    />
                  </span>
                </motion.p>

                {/* Rotating words */}
                <motion.div
                  className="text-base sm:text-xl text-yellow-300 font-medium h-8 sm:h-10 flex items-center justify-center lg:justify-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Grow Your</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      className="font-bold text-yellow-200 inline-block min-w-[100px] sm:min-w-[130px]"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <span>Online</span>
                </motion.div>

                {/* Mini stats row */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                  {[
                    { icon: MousePointerClick, text: "500+ Projects" },
                    { icon: Star, text: "4.9★ Rating" },
                    { icon: Zap, text: "3-7 Days Delivery" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs text-white/70 backdrop-blur-sm hover:bg-white/10 hover:border-red-500/30 transition-all cursor-default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="flex items-center gap-2 justify-center lg:justify-start text-white/50 text-xs sm:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                  <span>Limited Slots Available • Offer Ending Soon</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="lg:hidden"
                >
                  <Button
                    onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className="h-12 sm:h-14 px-8 sm:px-10 bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all group"
                  >
                    Book Your Website Now
                    <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* FORM CARD */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30, rotateY: -5 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 rounded-3xl blur-2xl -z-10 animate-pulse" />
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-600/10 to-transparent" />
                  
                  <div className="relative">
                    <h2 className="text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2">Book Your Website Now</h2>
                    <p className="text-center text-white/40 text-xs sm:text-sm mb-4 sm:mb-6">Get a free consultation within 24 hours</p>
                    <LeadForm id="hero-form" buttonText="Get Free Consultation" note="We will contact you within 24 hours" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ─── STATS COUNTER ─── */}
        <section className="py-8 sm:py-12 bg-gradient-to-r from-red-700/90 via-red-600 to-red-700/90 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M20%200v40M0%2020h40%22%20stroke%3D%22%23fff%22%20stroke-width%3D%220.3%22%20opacity%3D%220.08%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center py-2"
                >
                  <p className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">
                    <AnimatedCounter target={s.number} suffix={s.suffix} decimal={s.decimal} />
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm mt-1 font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TRUST + BRANDING ─── */}
        <section className="py-8 sm:py-10 bg-[#0d1e38] border-y border-white/5">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-bold">Digital Bull Technology Pvt Ltd</h2>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white/70 text-xs sm:text-sm">
                <a href="https://www.dibull.com" className="flex items-center gap-1.5 hover:text-red-400 transition-colors"><Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> www.dibull.com</a>
                <a href="tel:9825009111" className="flex items-center gap-1.5 hover:text-red-400 transition-colors"><Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 9825009111</a>
              </div>
            </motion.div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
              {[
                { icon: Zap, label: "Fast Delivery" },
                { icon: Smartphone, label: "Mobile Friendly" },
                { icon: Users, label: "100+ Clients" },
              ].map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(239,68,68,0.4)" }}
                  className="flex flex-col items-center gap-1.5 sm:gap-2 text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 transition-all cursor-default"
                >
                  <b.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  <span className="text-[10px] sm:text-xs font-medium text-white/80">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PACKAGES ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#0a1628] relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px]" />
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading pre="Choose Your" highlight="Website Package" subtitle="All packages include Free Domain + Hosting" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`relative rounded-2xl p-5 sm:p-6 flex flex-col border transition-all ${
                    plan.premium
                      ? "bg-gradient-to-b from-yellow-900/30 via-[#1a2a44] to-[#0a1628] border-yellow-500/40 shadow-lg shadow-yellow-500/10"
                      : plan.highlight
                      ? "bg-gradient-to-b from-red-900/20 via-[#1a2a44] to-[#0a1628] border-red-500/40 shadow-lg shadow-red-500/10 sm:scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 z-10 px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold whitespace-nowrap text-center ${
                      plan.premium ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/30" : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                    }`}>
                      {plan.badge}
                    </div>
                  )}
                  <div className={`text-center mb-3 sm:mb-4 ${plan.badge ? "pt-5 sm:pt-4" : "pt-3 sm:pt-2"}`}>
                    <h3 className="text-base sm:text-lg font-bold">{plan.name}</h3>
                    <p className={`text-2xl sm:text-3xl font-extrabold mt-1 ${plan.premium ? "text-yellow-400" : plan.highlight ? "text-red-400" : "text-white"}`}>{plan.price}</p>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
                        <CheckCircle2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 ${plan.premium ? "text-yellow-400" : "text-green-400"}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => document.getElementById("bottom-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className={`w-full mt-4 sm:mt-6 h-11 sm:h-12 font-bold rounded-lg text-sm sm:text-base group ${
                      plan.premium ? "bg-yellow-500 hover:bg-yellow-600 text-black" : plan.highlight ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR PROCESS ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#0d1e38] relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] -translate-y-1/2" />
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading pre="Our" highlight="Work Process" subtitle="Simple, transparent, and result-driven — here's how we build your website" />
            <div className="max-w-4xl mx-auto space-y-0">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex gap-4 sm:gap-6 items-start py-5 sm:py-8 relative group"
                >
                  {i < processSteps.length - 1 && (
                    <div className="absolute left-[23px] sm:left-[27px] top-[60px] sm:top-[72px] w-0.5 h-[calc(100%-36px)] sm:h-[calc(100%-40px)] bg-gradient-to-b from-red-500/40 to-transparent" />
                  )}
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600/15 border border-red-500/30 flex items-center justify-center relative z-10 group-hover:bg-red-600/25 group-hover:border-red-500/50 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  </motion.div>
                  <div>
                    <span className="text-red-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Step {step.step}</span>
                    <h3 className="text-base sm:text-xl font-bold mt-0.5 sm:mt-1 text-white group-hover:text-red-300 transition-colors">{step.title}</h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed max-w-lg">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INDUSTRIES WE SERVE ─── */}
        <section className="py-12 sm:py-16 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <SectionHeading pre="Industries" highlight="We Serve" subtitle="We have built websites for 50+ different industries across Ahmedabad" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {industries.map((ind, i) => (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, borderColor: "rgba(239,68,68,0.4)" }}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 transition-all group cursor-default"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                    <ind.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-red-400 transition-colors" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-white/70 text-center group-hover:text-white/90 transition-colors">{ind.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PORTFOLIO SHOWCASE ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#0d1e38] relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[150px]" />
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading pre="Our" highlight="Portfolio" subtitle="Websites we have designed & developed" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {portfolioItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/5 transition-all"
                >
                  {/* Browser mockup */}
                  <div className="bg-[#1a2a44] px-3 py-1.5 flex items-center gap-1.5 border-b border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="ml-2 text-[9px] text-white/40 truncate">{item.url.replace(/https?:\/\//, '').replace(/\/$/, '')}</span>
                  </div>
                  {/* Screenshot */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={`${item.name} website designed by DiBull`}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-bold text-white text-sm group-hover:text-red-300 transition-colors">{item.name}</h3>
                    <span className="text-[10px] text-white/50">{item.category}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <SectionHeading pre="Why" highlight="Choose Us" subtitle="8 reasons businesses in Ahmedabad trust DiBull" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, borderColor: "rgba(239,68,68,0.4)" }}
                  className="flex flex-col items-center text-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 transition-all group cursor-default"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-red-600/15 to-red-600/5 flex items-center justify-center group-hover:from-red-600/25 group-hover:to-red-600/10 transition-all">
                    <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[11px] sm:text-sm font-semibold text-white/90 leading-tight">{item.text}</span>
                  <span className="text-[9px] sm:text-xs text-white/40 leading-snug hidden sm:block">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#0d1e38] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px]" />
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading pre="What Our" highlight="Clients Say" subtitle="Real reviews from our Ahmedabad-based clients" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 relative hover:border-red-500/20 transition-all group"
                >
                  {/* Quote mark */}
                  <span className="absolute top-3 right-4 text-4xl text-red-500/10 font-serif leading-none">"</span>
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed italic relative z-10">"{t.content}"</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs sm:text-sm">{t.name}</p>
                      <p className="text-white/50 text-[10px] sm:text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ SECTION ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#0a1628]">
          <div className="container mx-auto px-4">
            <SectionHeading pre="Frequently Asked" highlight="Questions" subtitle="Got questions? We've got answers." />
            <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── BOTTOM LEAD FORM ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#0d1e38] relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/5 rounded-full blur-[150px]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-600/15 to-transparent" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/10 to-transparent" />
              <div className="relative">
                <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-xs text-red-300 mb-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Start your project today
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-bold">Get Started Today</h2>
                  <p className="text-white/50 text-sm sm:text-base">Fill the form below and our team will contact you shortly</p>
                </div>
                <LeadForm id="bottom-form" buttonText="Book Your Website Now" note="Our team will contact you shortly" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-red-700 via-red-600 to-red-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <motion.div
            className="container mx-auto px-4 relative z-10 text-center space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Start Growing Your Business Online Today
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
              Join 500+ businesses in Ahmedabad who chose DiBull for their website
            </p>
            <Button
              onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="h-12 sm:h-14 px-8 sm:px-12 bg-white text-red-600 hover:bg-white/90 text-base sm:text-lg font-bold rounded-xl shadow-lg group"
            >
              Get Started Now <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-white/70 text-xs sm:text-sm flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Limited Time Offer • Limited Slots Available
            </p>
          </motion.div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-6 sm:py-8 bg-[#060f1f] text-center text-white/40 text-xs sm:text-sm border-t border-white/5 pb-20 sm:pb-8">
          <p>© {new Date().getFullYear()} Digital Bull Technology Pvt Ltd. All rights reserved.</p>
          <p className="mt-1">Best Website Development Company in Ahmedabad</p>
        </footer>
      </div>
    </>
  );
};

export default WebDevAhmedabadLanding;
