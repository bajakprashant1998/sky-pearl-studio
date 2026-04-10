import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, Sparkles, ArrowDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-website-agent`;

const LANGUAGE_OPTIONS = [
  "🇬🇧 English",
  "🇮🇳 हिन्दी (Hindi)",
  "🇮🇳 ગુજરાતી (Gujarati)",
  "🇮🇳 मराठी (Marathi)",
  "🇮🇳 தமிழ் (Tamil)",
  "🇮🇳 తెలుగు (Telugu)",
  "🇮🇳 ಕನ್ನಡ (Kannada)",
  "🇮🇳 മലയാളം (Malayalam)",
  "🇮🇳 বাংলা (Bengali)",
  "🇮🇳 ਪੰਜਾਬੀ (Punjabi)",
];

const SERVICES_OPTIONS = [
  "🌐 Website Development",
  "📈 Digital Marketing (SEO/PPC)",
  "🛒 E-commerce Solutions",
  "📱 Mobile App Development",
  "🎨 Branding & Design",
  "💬 Other / Just Exploring",
];

const BUDGET_OPTIONS = [
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹3,00,000",
  "₹3,00,000 - ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

const TypingDots = () => (
  <div className="flex justify-start">
    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
      <div className="flex gap-1.5">
        {[0, 150, 300].map((d) => (
          <div key={d} className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  </div>
);

const ChatMessage = ({ msg }: { msg: Message }) => {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
        isUser
          ? "bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-br-md"
          : "bg-muted text-foreground rounded-bl-md"
      }`}>
        {isUser ? (
          msg.content
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_pre]:my-2 [&_code]:text-xs [&_pre]:text-xs [&_pre]:rounded-lg [&_pre]:p-2">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const OptionButton = ({ label, onClick, variant = "default" }: { label: string; onClick: () => void; variant?: "default" | "budget" }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`text-left text-xs px-3 py-2 rounded-xl border transition-all duration-200 ${
      variant === "budget"
        ? "border-green-500/30 text-green-700 dark:text-green-400 hover:bg-green-500/10 hover:border-green-500/50"
        : "border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40"
    }`}
  >
    {label}
  </motion.button>
);

type ChatStep = "language" | "welcome" | "conversation" | "closed";

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [step, setStep] = useState<ChatStep>("language");
  const [showOptions, setShowOptions] = useState<string[] | null>(null);
  const [optionVariant, setOptionVariant] = useState<"default" | "budget">("default");
  const [isHidden, setIsHidden] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messageCountRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
      setShowScrollBtn(!atBottom);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize with language selection
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Welcome to **DiBull Technology**! 👋🏻\n\nPlease select your preferred language / कृपया अपनी भाषा चुनें:"
      }]);
      setShowOptions(LANGUAGE_OPTIONS);
      setOptionVariant("default");
      setStep("language");
    }
  }, [open]);

  // Detect if AI response contains budget-related keywords to show budget options
  useEffect(() => {
    if (messages.length < 2) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== "assistant" || loading) return;
    
    const content = lastMsg.content.toLowerCase();
    if ((content.includes("budget") || content.includes("invest")) && !content.includes("thank you for connecting")) {
      setShowOptions(BUDGET_OPTIONS);
      setOptionVariant("budget");
    } else {
      setShowOptions(null);
      setOptionVariant("default");
    }

    // Detect closing message
    if (content.includes("thank you for connecting") || content.includes("our team will reach out")) {
      setLeadSaved(true);
      // Extract lead info from conversation and save
      saveLead();
      // Hide chat after delay
      setTimeout(() => {
        setStep("closed");
      }, 5000);
    }
  }, [messages, loading]);

  const saveLead = async () => {
    try {
      // Parse conversation to extract lead details
      const allText = messages.map(m => m.content).join("\n");
      
      // Extract details using patterns
      const nameMatch = allText.match(/(?:name|naam)\s*(?:is|hai|:)?\s*([A-Za-z\s]+?)(?:\n|,|\.|\!)/i);
      const emailMatch = allText.match(/[\w.-]+@[\w.-]+\.\w+/);
      const phoneMatch = allText.match(/(?:\+91[\s-]?)?[6-9]\d{9}/);
      const businessMatch = allText.match(/(?:company|business|brand)\s*(?:name|naam)?\s*(?:is|hai|:)?\s*([A-Za-z0-9\s&]+?)(?:\n|,|\.|\!)/i);
      
      const name = nameMatch?.[1]?.trim() || "Chat Lead";
      const email = emailMatch?.[0] || `chat_${sessionId}@lead.dibull.com`;
      const phone = phoneMatch?.[0] || null;
      const businessName = businessMatch?.[1]?.trim() || null;
      
      // Detect service interest
      const serviceKeywords: Record<string, string> = {
        "website": "Website Development",
        "seo": "SEO",
        "ppc": "PPC Advertising",
        "social media": "Social Media Marketing",
        "ecommerce": "E-commerce",
        "e-commerce": "E-commerce",
        "branding": "Branding & Design",
        "app": "Mobile App Development",
        "digital marketing": "Digital Marketing",
      };
      
      let detectedService = "General Inquiry";
      for (const [key, val] of Object.entries(serviceKeywords)) {
        if (allText.toLowerCase().includes(key)) {
          detectedService = val;
          break;
        }
      }

      // Detect budget
      const budgetMatch = allText.match(/₹[\d,]+\s*[-–]\s*₹?[\d,]+|₹[\d,]+\+|not sure/i);
      const budget = budgetMatch?.[0] || null;

      await supabase.from("leads").insert({
        name,
        email,
        phone,
        business_name: businessName,
        budget,
        website_type: detectedService,
        source: "chatbot",
        message: `[Chat Session: ${sessionId}]\n\nService Interest: ${detectedService}\n\nFull conversation available in Admin > Chat Conversations`,
        score: phone && email && !email.includes("@lead.dibull") ? 70 : 30,
        temperature: phone && email && !email.includes("@lead.dibull") ? "warm" : "cold",
      });
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
  };

  const streamMessage = async (allMessages: Message[]) => {
    setLoading(true);
    setShowOptions(null);
    abortRef.current = new AbortController();

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok || !resp.body) {
        let errMsg = "Sorry, something went wrong. Please try again.";
        if (resp.status === 429) errMsg = "⏳ Too many requests. Please wait a moment.";
        if (resp.status === 402) errMsg = "Service temporarily unavailable. Please visit dibull.com or call us.";
        setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              const currentText = assistantText;
              setMessages((prev) =>
                prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: currentText } : m))
              );
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (assistantText) {
        await supabase.from("chat_messages").insert({
          session_id: sessionId,
          role: "assistant",
          content: assistantText,
        });
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
      }
    }
    setLoading(false);
  };

  const sendMessage = async (text?: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput("");
    setShowOptions(null);
    messageCountRef.current++;

    if (step === "language") setStep("welcome");
    else if (step === "welcome") setStep("conversation");

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);

    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      role: "user",
      content: userMsg,
    });

    await streamMessage(newMessages);
  };

  if (isHidden) return null;

  return (
    <>
      {/* Chat Toggle */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 left-6 z-40 w-14 h-14 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 group-hover:hidden" />
            <Sparkles className="w-6 h-6 hidden group-hover:block" />
            <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping opacity-30" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-50 w-[400px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "560px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white px-4 py-3.5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block leading-tight">DiBull Assistant</span>
                  <span className="text-[10px] text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    Sales Consultant • Online
                  </span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="hover:bg-white/10 rounded-lg p-1.5 transition-colors relative z-10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 relative bg-gradient-to-b from-background to-muted/20">
              {messages.map((msg, i) => {
                if (msg.role === "assistant" && msg.content === "" && loading) return null;
                return <ChatMessage key={i} msg={msg} />;
              })}
              {loading && (messages[messages.length - 1]?.role === "user" || messages[messages.length - 1]?.content === "") && <TypingDots />}

              {/* Option Buttons */}
              {showOptions && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {showOptions.map((opt) => (
                    <OptionButton
                      key={opt}
                      label={opt}
                      variant={optionVariant}
                      onClick={() => sendMessage(opt)}
                    />
                  ))}
                </motion.div>
              )}

              {/* Lead Saved Confirmation */}
              {leadSaved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm text-green-700 dark:text-green-400"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Your inquiry has been recorded! Our team will contact you shortly.</span>
                </motion.div>
              )}

              {/* Scroll to bottom */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToBottom}
                    className="sticky bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            {step !== "closed" ? (
              <div className="border-t border-border p-3 bg-background/80 backdrop-blur-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm rounded-xl border-primary/20 focus:border-primary/40"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={loading || !input.trim()}
                    className="rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 shadow-md shadow-primary/20"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-1.5 opacity-60">
                  Powered by DiBull AI
                </p>
              </div>
            ) : (
              <div className="border-t border-border p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 text-center">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  🙏 Thank you for connecting with us!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Our representative will contact you shortly.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs"
                  onClick={() => {
                    setOpen(false);
                    setIsHidden(true);
                  }}
                >
                  Close Chat
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;
