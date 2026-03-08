import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Calculator, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";

const SERVICES = [
  { id: "seo", name: "SEO Optimization", price: 15000 },
  { id: "ppc", name: "PPC Advertising", price: 20000 },
  { id: "social", name: "Social Media Marketing", price: 12000 },
  { id: "content", name: "Content Marketing", price: 10000 },
  { id: "web-design", name: "Website Design", price: 35000 },
  { id: "email", name: "Email Marketing", price: 8000 },
  { id: "branding", name: "Branding & Design", price: 25000 },
  { id: "ecommerce", name: "E-Commerce Marketing", price: 18000 },
  { id: "video", name: "Video Marketing", price: 15000 },
  { id: "ai-marketing", name: "AI Marketing", price: 22000 },
];

const TIMELINES = [
  { id: "1-month", label: "1 Month", multiplier: 1 },
  { id: "3-months", label: "3 Months", multiplier: 0.9 },
  { id: "6-months", label: "6 Months", multiplier: 0.8 },
  { id: "12-months", label: "12 Months", multiplier: 0.7 },
];

const QuoteCalculator = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("3-months");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const multiplier = TIMELINES.find((t) => t.id === timeline)?.multiplier || 1;
  const basePrice = selected.reduce((sum, id) => sum + (SERVICES.find((s) => s.id === id)?.price || 0), 0);
  const totalPrice = Math.round(basePrice * multiplier);
  const savings = basePrice - totalPrice;

  const toggleService = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    if (!name || !email) return toast.error("Please fill in your details");
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name,
        email,
        phone: phone || null,
        website_type: selected.join(", "),
        budget: `₹${totalPrice.toLocaleString()}/mo`,
        message: `Quote request: ${selected.map((id) => SERVICES.find((s) => s.id === id)?.name).join(", ")} | Timeline: ${TIMELINES.find((t) => t.id === timeline)?.label} | Est: ₹${totalPrice.toLocaleString()}/mo`,
        source: "quote-calculator",
      });
      if (error) throw error;
      toast.success("Quote submitted! We'll get back within 24 hours.");
      setStep(3);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Service Quote Calculator | Digital Bull Technology"
        description="Get an instant quote for digital marketing services. Select services, choose timeline, get estimated pricing."
        canonical="https://dibull.com/quote-calculator"
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" /> Instant Quote Calculator
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Get Your Custom Quote
            </h1>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Select services, choose your timeline, and get an instant estimate. No hidden costs.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? "Select Services" : s === 2 ? "Your Details" : "Done!"}
                </span>
                {s < 3 && <div className={`w-8 h-px ${step > s ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8">
              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => {
                  const isSelected = selected.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/30 bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                          isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                        </div>
                        <span className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                          {service.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        ₹{service.price.toLocaleString()}/mo
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Timeline Selector */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Choose Timeline</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TIMELINES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        timeline === t.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className="text-sm font-semibold text-foreground">{t.label}</div>
                      {t.multiplier < 1 && (
                        <div className="text-xs text-green-600 font-medium mt-1">
                          Save {Math.round((1 - t.multiplier) * 100)}%
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              {selected.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Monthly Estimate</span>
                    <div className="text-right">
                      {savings > 0 && (
                        <div className="text-sm text-muted-foreground line-through">₹{basePrice.toLocaleString()}/mo</div>
                      )}
                      <div className="text-3xl font-bold text-foreground">₹{totalPrice.toLocaleString()}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                      {savings > 0 && (
                        <div className="text-sm text-green-600 font-medium">You save ₹{savings.toLocaleString()}/mo</div>
                      )}
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full" size="lg">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone (optional)</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none" placeholder="+91 98240 11921" />
                </div>
              </div>

              {/* Quote Summary */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-3">Your Quote Summary</h3>
                <div className="space-y-1.5 mb-3">
                  {selected.map((id) => {
                    const s = SERVICES.find((s) => s.id === id);
                    return s ? (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{s.name}</span>
                        <span className="text-foreground font-medium">₹{Math.round(s.price * multiplier).toLocaleString()}</span>
                      </div>
                    ) : null;
                  })}
                </div>
                <div className="border-t border-primary/20 pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total / month</span>
                  <span className="font-bold text-lg text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={handleSubmit} disabled={submitting} className="flex-1">
                  {submitting ? "Submitting..." : "Submit Quote Request"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Quote Submitted!</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Our team will review your requirements and get back to you within 24 hours with a detailed proposal.
              </p>
              <div className="bg-card border border-border rounded-2xl p-6 max-w-sm mx-auto">
                <div className="text-3xl font-bold text-primary mb-1">₹{totalPrice.toLocaleString()}/mo</div>
                <div className="text-sm text-muted-foreground">{selected.length} services • {TIMELINES.find(t => t.id === timeline)?.label}</div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default QuoteCalculator;
