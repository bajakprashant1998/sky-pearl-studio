import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

interface NewsletterSignupProps {
  source?: string;
  variant?: "footer" | "sidebar";
}

const NewsletterSignup = ({ source = "footer", variant = "footer" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setStatus("loading");
    const { error } = await supabase
      .from("newsletter_subscribers" as any)
      .insert([{ email: parsed.data, source }] as any);

    if (error) {
      if (error.code === "23505") {
        toast.info("You're already subscribed! 🎉");
        setStatus("success");
      } else {
        toast.error("Something went wrong. Please try again.");
        setStatus("error");
      }
    } else {
      toast.success("Successfully subscribed! 🚀");
      setStatus("success");
    }

    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  if (variant === "sidebar") {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-bold text-foreground">Newsletter</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Get the latest digital marketing tips & trends in your inbox weekly.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-2.5 bg-background/80 border border-border rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
            disabled={status === "loading"}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Subscribing...
                </motion.span>
              ) : status === "success" ? (
                <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Subscribed!
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Subscribe
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
        <p className="text-xs text-muted-foreground/60 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    );
  }

  // Footer variant — replaces the existing footer newsletter form
  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:w-80 px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          required
          disabled={status === "loading"}
        />
        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={status === "loading"}
        className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
      >
        <AnimatePresence mode="wait">
          {status === "loading" ? (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Subscribing...
            </motion.span>
          ) : status === "success" ? (
            <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <span>Subscribed!</span>
              <Sparkles className="w-4 h-4" />
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};

export default NewsletterSignup;
