import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Gift, Copy, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ReferralPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referredName, setReferredName] = useState("");
  const [referredEmail, setReferredEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const code = `REF-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await supabase.from("referrals").insert({
      referrer_name: name,
      referrer_email: email,
      referred_name: referredName || null,
      referred_email: referredEmail || null,
      code,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setReferralCode(code);
      setSubmitted(true);
      toast.success("Referral submitted successfully!");
    }
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Code copied!");
  };

  return (
    <>
      <Helmet>
        <title>Referral Program | Digital Bull Technology</title>
        <meta name="description" content="Refer a business to Digital Bull Technology and earn rewards. Share your referral link today!" />
      </Helmet>
      <Navbar />
      <div className="min-h-screen pt-20 bg-secondary/30">
        <div className="container px-4 py-16 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Referral Program</h1>
            <p className="text-muted-foreground text-lg">
              Know a business that needs digital marketing? Refer them and earn rewards!
            </p>
          </div>

          {!submitted ? (
            <div className="bg-card rounded-2xl border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-bold text-foreground mb-4">Your Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-4">Referred Business (Optional)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Business/Person Name" value={referredName} onChange={(e) => setReferredName(e.target.value)} />
                    <Input type="email" placeholder="Their Email" value={referredEmail} onChange={(e) => setReferredEmail(e.target.value)} />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Referral"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Referral Submitted!</h2>
              <p className="text-muted-foreground mb-6">Your referral code:</p>
              <div className="flex items-center justify-center gap-3 mb-6">
                <code className="bg-muted px-6 py-3 rounded-xl text-lg font-bold text-primary">{referralCode}</code>
                <Button variant="outline" size="icon" onClick={copyCode}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Share this code with your referral. We'll track it and reward you once they convert!</p>
            </div>
          )}

          {/* How it works */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Submit Referral", desc: "Fill in your details and the business you're referring" },
              { step: "2", title: "We Connect", desc: "Our team reaches out to the referred business" },
              { step: "3", title: "Earn Rewards", desc: "Get rewarded when they become a client" },
            ].map((item) => (
              <div key={item.step} className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReferralPage;
