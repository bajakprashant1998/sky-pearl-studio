import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Bot, Sparkles, ArrowDown, CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-website-agent`;

const LANGUAGE_OPTIONS = [
  "🇬🇧 English",
  "🇮🇳 हिन्दी",
  "🇮🇳 ગુજરાતી",
  "🇮🇳 मराठी",
  "🇮🇳 தமிழ்",
  "🇮🇳 తెలుగు",
  "🇮🇳 ಕನ್ನಡ",
  "🇮🇳 മലയാളം",
  "🇮🇳 বাংলা",
  "🇮🇳 ਪੰਜਾਬੀ",
];

// Extract numbered options from AI text like "1. Option\n2. Option"
function extractOptions(text: string): string[] {
  const lines = text.split("\n");
  const options: string[] = [];
  for (const line of lines) {
    const match = line.trim().match(/^\d+\.\s+(.+)/);
    if (match) {
      options.push(match[1].trim());
    }
  }
  return options.length >= 2 ? options : [];
}

// Remove numbered list from text to show only the question part
function getTextWithoutOptions(text: string): string {
  const lines = text.split("\n");
  const nonOptionLines: string[] = [];
  for (const line of lines) {
    if (!line.trim().match(/^\d+\.\s+/)) {
      nonOptionLines.push(line);
    }
  }
  return nonOptionLines.join("\n").trim();
}

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

const ChatMessage = ({ msg, hideOptions }: { msg: Message; hideOptions?: boolean }) => {
  const isUser = msg.role === "user";
  const displayText = !isUser && hideOptions ? getTextWithoutOptions(msg.content) : msg.content;
  
  // Don't render if only options remain and we're hiding them
  if (!isUser && hideOptions && !displayText.replace(/\[SHOW_LEAD_FORM\]/g, "").trim()) return null;

  // Remove the marker from displayed text
  const cleanText = displayText.replace(/\[SHOW_LEAD_FORM\]/g, "").trim();
  if (!cleanText) return null;

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
          cleanText
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
            <ReactMarkdown>{cleanText}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const OptionButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <motion.button
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="w-full text-left text-sm px-4 py-2.5 rounded-xl border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
  >
    {label}
  </motion.button>
);

type ChatStep = "language" | "conversation" | "lead_form" | "closed";

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [step, setStep] = useState<ChatStep>("language");
  const [extractedOptions, setExtractedOptions] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCity, setLeadCity] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, step, scrollToBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 60);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Init
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Welcome to **DiBull Technology**! 👋🏻\n\nPlease select your preferred language / कृपया अपनी भाषा चुनें:"
      }]);
      setExtractedOptions([]);
      setStep("language");
    }
  }, [open]);

  // After AI responds, extract options or detect lead form marker
  useEffect(() => {
    if (loading || messages.length < 1) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== "assistant") return;

    // Check for lead form marker
    if (lastMsg.content.includes("[SHOW_LEAD_FORM]")) {
      setExtractedOptions([]);
      setStep("lead_form");
      return;
    }

    // Extract numbered options from AI response
    if (step !== "language") {
      const opts = extractOptions(lastMsg.content);
      setExtractedOptions(opts);
    }
  }, [messages, loading]);

  const saveLead = async () => {
    if (!leadName.trim() || !leadPhone.trim()) return;
    setLeadSubmitting(true);

    try {
      // Extract service and budget from conversation
      const allText = messages.map(m => m.content).join("\n");
      const serviceKeywords: Record<string, string> = {
        "website": "Website Development",
        "seo": "SEO", "ppc": "PPC",
        "social media": "Social Media Marketing",
        "ecommerce": "E-commerce", "e-commerce": "E-commerce",
        "branding": "Branding & Design",
        "app": "Mobile App Development",
        "digital marketing": "Digital Marketing",
      };
      let detectedService = "General Inquiry";
      for (const [key, val] of Object.entries(serviceKeywords)) {
        if (allText.toLowerCase().includes(key)) { detectedService = val; break; }
      }
      const budgetMatch = allText.match(/₹[\d,]+\s*[-–]\s*₹?[\d,]+|₹[\d,]+\+/);

      await supabase.from("leads").insert({
        name: leadName.trim(),
        email: `chat_${sessionId.slice(5, 20)}@lead.dibull.com`,
        phone: leadPhone.trim(),
        business_name: leadCity.trim() || null,
        budget: budgetMatch?.[0] || null,
        website_type: detectedService,
        source: "chatbot",
        message: `[Chat Session: ${sessionId}]\nCity: ${leadCity.trim()}\nService: ${detectedService}\n\nFull conversation in Admin > Chat Conversations`,
        score: 70,
        temperature: "warm",
      });

      // Save lead submission as chat message too
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: `📋 Lead Form Submitted:\nName: ${leadName.trim()}\nWhatsApp: ${leadPhone.trim()}\nCity: ${leadCity.trim()}`,
      });

      setStep("closed");
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
    setLeadSubmitting(false);
  };

  const streamMessage = async (allMessages: Message[]) => {
    setLoading(true);
    setExtractedOptions([]);
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
        if (resp.status === 402) errMsg = "Service temporarily unavailable. Please visit dibull.com.";
        setMessages(prev => [...prev, { role: "assistant", content: errMsg }]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
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
              const cur = assistantText;
              setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: cur } : m));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (assistantText) {
        await supabase.from("chat_messages").insert({
          session_id: sessionId, role: "assistant", content: assistantText,
        });
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
      }
    }
    setLoading(false);
  };

  const sendMessage = async (text?: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput("");
    setExtractedOptions([]);

    if (step === "language") setStep("conversation");

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);

    await supabase.from("chat_messages").insert({
      session_id: sessionId, role: "user", content: userMsg,
    });

    await streamMessage(newMessages);
  };

  if (isHidden) return null;

  // Determine which options to show
  const showLanguageOptions = step === "language" && !loading;
  const showAIOptions = step === "conversation" && extractedOptions.length > 0 && !loading;

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span className="text-sm sm:text-base font-semibold whitespace-nowrap">AI Assistant</span>
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
            style={{ height: "580px" }}
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

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 relative bg-gradient-to-b from-background to-muted/20">
              {messages.map((msg, i) => {
                if (msg.role === "assistant" && msg.content === "" && loading) return null;
                const isLastAssistant = msg.role === "assistant" && i === messages.length - 1;
                return (
                  <ChatMessage
                    key={i}
                    msg={msg}
                    hideOptions={isLastAssistant && (showAIOptions || step === "lead_form")}
                  />
                );
              })}

              {loading && <TypingDots />}

              {/* Language Options */}
              {showLanguageOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-2 pt-1"
                >
                  {LANGUAGE_OPTIONS.map(lang => (
                    <OptionButton key={lang} label={lang} onClick={() => sendMessage(lang)} />
                  ))}
                </motion.div>
              )}

              {/* AI-extracted Options */}
              {showAIOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-col gap-2 pt-1"
                >
                  {extractedOptions.map((opt, i) => (
                    <OptionButton key={i} label={opt} onClick={() => sendMessage(opt)} />
                  ))}
                </motion.div>
              )}

              {/* Lead Form */}
              {step === "lead_form" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20 rounded-2xl p-4 space-y-3"
                >
                  <p className="text-sm font-semibold text-foreground text-center">
                    📋 Almost done! Fill this quick form:
                  </p>
                  <Input
                    placeholder="Your Name / आपका नाम"
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                    className="text-sm rounded-xl"
                  />
                  <Input
                    placeholder="WhatsApp Number"
                    value={leadPhone}
                    onChange={e => setLeadPhone(e.target.value)}
                    className="text-sm rounded-xl"
                    type="tel"
                  />
                  <Input
                    placeholder="City / शहर"
                    value={leadCity}
                    onChange={e => setLeadCity(e.target.value)}
                    className="text-sm rounded-xl"
                  />
                  <Button
                    onClick={saveLead}
                    disabled={!leadName.trim() || !leadPhone.trim() || leadSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                  >
                    {leadSubmitting ? "Submitting..." : "Submit ✅"}
                  </Button>
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

            {/* Bottom Bar */}
            {step === "closed" ? (
              <div className="border-t border-border p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                    Thank you for connecting! 🙏
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Our representative will contact you shortly on WhatsApp.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs"
                  onClick={() => { setOpen(false); setIsHidden(true); }}
                >
                  Close Chat
                </Button>
              </div>
            ) : step === "lead_form" ? (
              <div className="border-t border-border px-4 py-2 bg-background/80">
                <p className="text-[10px] text-muted-foreground text-center opacity-60">
                  Powered by DiBull AI • Your data is secure
                </p>
              </div>
            ) : (
              <div className="border-t border-border p-3 bg-background/80 backdrop-blur-sm">
                <form
                  onSubmit={e => { e.preventDefault(); sendMessage(); }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type or select an option above..."
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;
