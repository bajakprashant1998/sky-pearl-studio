import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Bot, Sparkles, ArrowDown, CheckCircle2, Send, Volume2, VolumeX, Mail, Phone, MapPin, User, Mic, MicOff, Star, Briefcase } from "lucide-react";
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

// Map browser language codes to our language options
const BROWSER_LANG_MAP: Record<string, string> = {
  "en": "🇬🇧 English",
  "hi": "🇮🇳 हिन्दी",
  "gu": "🇮🇳 ગુજરાતી",
  "mr": "🇮🇳 मराठी",
  "ta": "🇮🇳 தமிழ்",
  "te": "🇮🇳 తెలుగు",
  "kn": "🇮🇳 ಕನ್ನಡ",
  "ml": "🇮🇳 മലയാളം",
  "bn": "🇮🇳 বাংলা",
  "pa": "🇮🇳 ਪੰਜਾਬੀ",
};

const getDetectedLanguage = (): string | null => {
  const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
  return browserLang ? BROWSER_LANG_MAP[browserLang] || null : null;
};

// Simple notification sound using Web Audio API
const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08);
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch { /* silent fail */ }
};

function extractOptions(text: string): string[] {
  const lines = text.split("\n");
  const options: string[] = [];
  for (const line of lines) {
    const match = line.trim().match(/^\d+\.\s+(.+)/);
    if (match) options.push(match[1].trim());
  }
  return options.length >= 2 ? options : [];
}

function getTextWithoutOptions(text: string): string {
  const lines = text.split("\n");
  const nonOptionLines: string[] = [];
  for (const line of lines) {
    if (!line.trim().match(/^\d+\.\s+/)) nonOptionLines.push(line);
  }
  return nonOptionLines.join("\n").trim();
}

const TypingDots = () => (
  <div className="flex justify-start">
    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
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
  if (!isUser && hideOptions && !displayText.replace(/\[SHOW_LEAD_FORM\]/g, "").trim()) return null;
  const cleanText = displayText.replace(/\[SHOW_LEAD_FORM\]/g, "").trim();
  if (!cleanText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-blue-500/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 ring-1 ring-white/20 shadow-sm">
          <Bot className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
        isUser
          ? "bg-gradient-to-br from-primary via-blue-600 to-indigo-600 text-white rounded-br-md shadow-primary/20"
          : "bg-white/80 dark:bg-white/10 backdrop-blur-sm text-foreground rounded-bl-md border border-white/30 dark:border-white/10"
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

const OptionButton = ({ label, onClick, index }: { label: string; onClick: () => void; index: number }) => (
  <motion.button
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.06 }}
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-primary/15 text-primary hover:bg-primary/10 hover:border-primary/40 hover:shadow-sm transition-all duration-200"
  >
    {label}
  </motion.button>
);

type ChatStep = "language" | "lead_form" | "conversation" | "closed";

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => {
    // Reuse existing session from localStorage if available (within 24h)
    const saved = localStorage.getItem("dibull_chat_session");
    if (saved) {
      try {
        const { id, ts } = JSON.parse(saved);
        if (Date.now() - ts < 24 * 60 * 60 * 1000) return id;
      } catch { /* ignore */ }
    }
    const newId = `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("dibull_chat_session", JSON.stringify({ id: newId, ts: Date.now() }));
    return newId;
  });
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [step, setStep] = useState<ChatStep>("language");
  const [extractedOptions, setExtractedOptions] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCity, setLeadCity] = useState("");
  const [leadBusinessType, setLeadBusinessType] = useState("");
  const [chatRating, setChatRating] = useState(0);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detectedLang] = useState(() => getDetectedLanguage());
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<any>(null);

  // Voice input via Web Speech API
  const toggleVoice = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setInput(prev => prev || "Voice not supported on this browser");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; // default Hindi, works for most Indian languages
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    let finalTranscript = "";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setInput(finalTranscript + interim);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript.trim()) {
        setInput(finalTranscript.trim());
      }
    };

    recognition.start();
  }, [isListening]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, loading, step, scrollToBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 60);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset unread when opened
  useEffect(() => {
    if (open) setUnreadCount(0);
  }, [open]);

  // Init — restore chat history from DB if session exists
  useEffect(() => {
    if (!open || historyLoaded) return;

    const restoreHistory = async () => {
      try {
        const { data } = await supabase
          .from("chat_messages")
          .select("role, content")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true });

        if (data && data.length > 0) {
          const restored: Message[] = data.map(m => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          }));
          setMessages(restored);
          // Determine step from history
          const hasLeadForm = restored.some(m => m.content.includes("📋 Lead Form Submitted"));
          const lastAssistant = [...restored].reverse().find(m => m.role === "assistant");
          if (lastAssistant?.content.includes("[SHOW_LEAD_FORM]")) {
            setStep("closed");
          } else if (hasLeadForm && restored.length > 2) {
            setStep("conversation");
            const opts = extractOptions(lastAssistant?.content || "");
            setExtractedOptions(opts);
          } else if (restored.length > 1 && !hasLeadForm) {
            // Language selected but no lead form yet
            setStep("lead_form");
          }
        } else {
          // Fresh session
          setMessages([{
            role: "assistant",
            content: "Welcome to **DiBull Technology**! 👋🏻\n\nPlease select your preferred language / कृपया अपनी भाषा चुनें:"
          }]);
          setExtractedOptions([]);
          setStep("language");
        }
      } catch {
        // Fallback to fresh session
        setMessages([{
          role: "assistant",
          content: "Welcome to **DiBull Technology**! 👋🏻\n\nPlease select your preferred language / कृपया अपनी भाषा चुनें:"
        }]);
        setStep("language");
      }
      setHistoryLoaded(true);
    };

    restoreHistory();
  }, [open, historyLoaded, sessionId]);

  // After AI responds, extract options or detect lead form
  useEffect(() => {
    if (loading || messages.length < 1) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== "assistant") return;

    if (lastMsg.content.includes("[SHOW_LEAD_FORM]")) {
      setExtractedOptions([]);
      setStep("closed");
      return;
    }

    if (step === "conversation") {
      const opts = extractOptions(lastMsg.content);
      setExtractedOptions(opts);
    }
  }, [messages, loading]);

  const validateLeadForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!leadName.trim()) errors.name = "Name is required";
    if (!leadPhone.trim()) errors.phone = "WhatsApp number is required";
    else if (!/^[\d\s+()-]{7,15}$/.test(leadPhone.trim())) errors.phone = "Enter a valid phone number";
    if (leadEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) errors.email = "Enter a valid email";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveLead = async () => {
    if (!validateLeadForm()) return;
    setLeadSubmitting(true);

    try {
      const detectedService = leadBusinessType || "General Inquiry";

      await supabase.from("leads").insert({
        name: leadName.trim(),
        email: leadEmail.trim() || `chat_${sessionId.slice(5, 20)}@lead.dibull.com`,
        phone: leadPhone.trim(),
        business_name: leadCity.trim() || null,
        budget: null,
        website_type: detectedService,
        source: "chatbot",
        message: `[Chat Session: ${sessionId}]\nCity: ${leadCity.trim()}\nBusiness: ${detectedService}`,
        score: 70,
        temperature: "warm",
      });

      await supabase.from("chat_messages").insert({
        session_id: sessionId, role: "user",
        content: `📋 Lead Form Submitted:\nName: ${leadName.trim()}\nEmail: ${leadEmail.trim()}\nWhatsApp: ${leadPhone.trim()}\nCity: ${leadCity.trim()}`,
      });

      // Now start the AI conversation
      setStep("conversation");
      const currentMessages = messages;
      await streamMessage(currentMessages);
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
        // Play sound for new assistant message
        if (soundEnabled && !open) {
          playNotificationSound();
          setUnreadCount(prev => prev + 1);
        } else if (soundEnabled) {
          playNotificationSound();
        }

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

    if (step === "language") {
      setStep("lead_form");
      // Don't start AI conversation yet — wait for lead form
      const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
      setMessages(newMessages);
      await supabase.from("chat_messages").insert({
        session_id: sessionId, role: "user", content: userMsg,
      });
      return;
    }

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);

    await supabase.from("chat_messages").insert({
      session_id: sessionId, role: "user", content: userMsg,
    });

    await streamMessage(newMessages);
  };

  // Save partial lead on exit if user had any conversation
  const handleClose = useCallback(async () => {
    setOpen(false);
    if (step !== "language" && step !== "closed" && messages.length > 1) {
      try {
        const hasLeadForm = messages.some(m => m.content.includes("📋 Lead Form Submitted"));
        if (!hasLeadForm) {
          const chatContent = messages.map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 500);
          await supabase.from("leads").insert({
            name: leadName.trim() || "Chat Visitor",
            email: leadEmail.trim() || `partial_${sessionId.slice(5, 20)}@lead.dibull.com`,
            phone: leadPhone.trim() || null,
            business_name: leadCity.trim() || null,
            budget: null,
            website_type: leadBusinessType || "Partial Chat",
            source: "chatbot-partial",
            message: `[Partial Chat - User exited]\nSession: ${sessionId}\n\n${chatContent}`,
            score: 30,
            temperature: "cold",
          });
        }
      } catch { /* silent */ }
    }
  }, [step, messages, leadName, leadEmail, leadPhone, leadCity, leadBusinessType, sessionId]);

  if (isHidden) return null;

  const showLanguageOptions = step === "language" && !loading;
  const showAIOptions = step === "conversation" && extractedOptions.length > 0 && !loading;
  const floatingHorizontalSpacing = "calc(env(safe-area-inset-left, 0px) + clamp(1rem, 2vw, 1.5rem))";
  const floatingBottomSpacing = "calc(env(safe-area-inset-bottom, 0px) + clamp(1rem, 2vw, 1.5rem))";
  const floatingOffsetStyle = {
    position: "fixed" as const,
    left: floatingHorizontalSpacing,
    bottom: floatingBottomSpacing,
    top: "auto",
    right: "auto",
  };

  return (
    <>
      {/* Toggle Button with unread badge */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="z-[9999] flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all relative"
          style={floatingOffsetStyle}
          aria-label="Open AI Assistant"
        >
          <Bot className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-semibold whitespace-nowrap">AI Assistant</span>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window - Glassmorphism */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.85 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="z-[9999] w-[400px] max-w-[calc(100vw-48px)] max-h-[calc(100dvh-100px)] bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl shadow-black/10 flex flex-col overflow-hidden"
            style={{
              ...floatingOffsetStyle,
              height: "min(600px, calc(100dvh - 100px))",
            }}
          >
            {/* Header - Glass */}
            <div className="relative bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white px-4 py-4 flex items-center justify-between overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm block leading-tight">DiBull Assistant</span>
                  <span className="text-[10px] text-white/70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    AI Sales Consultant • Always Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="hover:bg-white/10 rounded-lg p-1.5 transition-colors"
                  title={soundEnabled ? "Mute sounds" : "Unmute sounds"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
                </button>
                <button onClick={() => setOpen(false)} className="hover:bg-white/10 rounded-lg p-1.5 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 relative bg-gradient-to-b from-slate-50/50 to-blue-50/30 dark:from-gray-900/50 dark:to-gray-800/30">
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
                  className="space-y-2 pt-1"
                >
                  {/* Detected language recommendation */}
                  {detectedLang && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => sendMessage(detectedLang)}
                      className="w-full text-left text-sm px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary/30 text-primary hover:bg-primary/15 transition-all duration-200 flex items-center justify-between"
                    >
                      <span className="font-medium">{detectedLang}</span>
                      <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">✨ Recommended</span>
                    </motion.button>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {LANGUAGE_OPTIONS.filter(l => l !== detectedLang).map((lang, i) => (
                      <OptionButton key={lang} label={lang} onClick={() => sendMessage(lang)} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* AI-extracted Options */}
              {showAIOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col gap-2 pt-1"
                >
                  {extractedOptions.map((opt, i) => (
                    <OptionButton key={i} label={opt} onClick={() => sendMessage(opt)} index={i} />
                  ))}
                </motion.div>
              )}

              {/* Lead Form - Enhanced */}
              {step === "lead_form" && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-primary/15 rounded-2xl p-4 space-y-3 shadow-lg shadow-primary/5"
                >
                  <div className="text-center mb-1">
                    <p className="text-sm font-bold text-foreground">👋 Welcome! Let's get started</p>
                    <p className="text-[11px] text-muted-foreground">Tell us about yourself for a personalized experience</p>
                  </div>

                  {/* Name */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                      <Input
                        placeholder="Your Name *"
                        value={leadName}
                        onChange={e => { setLeadName(e.target.value); setFormErrors(p => ({ ...p, name: "" })); }}
                        className={`text-sm rounded-xl pl-9 bg-white/60 dark:bg-white/5 ${formErrors.name ? "border-red-400" : "border-primary/15"}`}
                      />
                    </div>
                    {formErrors.name && <p className="text-[10px] text-red-500 mt-0.5 ml-1">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                      <Input
                        placeholder="Email (optional)"
                        value={leadEmail}
                        onChange={e => { setLeadEmail(e.target.value); setFormErrors(p => ({ ...p, email: "" })); }}
                        className={`text-sm rounded-xl pl-9 bg-white/60 dark:bg-white/5 ${formErrors.email ? "border-red-400" : "border-primary/15"}`}
                        type="email"
                      />
                    </div>
                    {formErrors.email && <p className="text-[10px] text-red-500 mt-0.5 ml-1">{formErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                      <Input
                        placeholder="WhatsApp Number *"
                        value={leadPhone}
                        onChange={e => { setLeadPhone(e.target.value); setFormErrors(p => ({ ...p, phone: "" })); }}
                        className={`text-sm rounded-xl pl-9 bg-white/60 dark:bg-white/5 ${formErrors.phone ? "border-red-400" : "border-primary/15"}`}
                        type="tel"
                      />
                    </div>
                    {formErrors.phone && <p className="text-[10px] text-red-500 mt-0.5 ml-1">{formErrors.phone}</p>}
                  </div>

                  {/* City */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <Input
                      placeholder="City / शहर"
                      value={leadCity}
                      onChange={e => setLeadCity(e.target.value)}
                      className="text-sm rounded-xl pl-9 bg-white/60 dark:bg-white/5 border-primary/15"
                    />
                  </div>

                  {/* Business Type Dropdown */}
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 z-10" />
                    <select
                      value={leadBusinessType}
                      onChange={e => setLeadBusinessType(e.target.value)}
                      className="w-full text-sm rounded-xl pl-9 pr-3 py-2 bg-white/60 dark:bg-white/5 border border-primary/15 text-foreground appearance-none cursor-pointer focus:outline-none focus:border-primary/40"
                    >
                      <option value="">Select Business Type</option>
                      <option value="Retail / Shop">🏪 Retail / Shop</option>
                      <option value="Restaurant / Food">🍽️ Restaurant / Food</option>
                      <option value="Healthcare / Medical">🏥 Healthcare / Medical</option>
                      <option value="Education / Coaching">📚 Education / Coaching</option>
                      <option value="Real Estate">🏠 Real Estate</option>
                      <option value="Manufacturing">🏭 Manufacturing</option>
                      <option value="IT / SaaS">💻 IT / SaaS</option>
                      <option value="E-commerce">🛒 E-commerce</option>
                      <option value="Fashion / Beauty">👗 Fashion / Beauty</option>
                      <option value="Travel / Hospitality">✈️ Travel / Hospitality</option>
                      <option value="Finance / Legal">💼 Finance / Legal</option>
                      <option value="Other">📦 Other</option>
                    </select>
                  </div>

                  <Button
                    onClick={saveLead}
                    disabled={leadSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-primary via-blue-600 to-indigo-600 hover:opacity-90 shadow-md shadow-primary/20 font-semibold"
                  >
                    {leadSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : "Start Chat 🚀"}
                  </Button>
                  <p className="text-[9px] text-muted-foreground text-center">🔒 Your data is 100% secure & private</p>
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
                    className="sticky bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            {step === "closed" ? (
              <div className="border-t border-white/20 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 backdrop-blur-sm text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    Thank you{leadName ? `, ${leadName}` : ""}! 🙏
                  </p>
                </motion.div>
                <p className="text-xs text-muted-foreground">
                  Our team will contact you shortly on WhatsApp.
                </p>

                {/* WhatsApp direct link - prominent button */}
                <a
                  href={`https://wa.me/919824011921?text=${encodeURIComponent(`Hi DiBull! I'm ${leadName.trim() || "interested"}. I just enquired about ${leadBusinessType || "your services"}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-green-500/20 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp Now
                </a>

                {/* Star Rating */}
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1.5">Rate your experience</p>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setChatRating(star)}
                        className="transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= chatRating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  {chatRating > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-primary mt-1"
                    >
                      {chatRating >= 4 ? "Thank you! We're glad you liked it! ⭐" : chatRating >= 2 ? "Thanks for your feedback! 🙏" : "We'll do better! 💪"}
                    </motion.p>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => { setOpen(false); setIsHidden(true); }}
                >
                  Close Chat
                </Button>
              </div>
            ) : step === "lead_form" ? (
              <div className="border-t border-white/20 px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <p className="text-[10px] text-muted-foreground text-center opacity-60">
                  Powered by DiBull AI • Secure & Private
                </p>
              </div>
            ) : (
              <div className="border-t border-white/20 p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <form
                  onSubmit={e => { e.preventDefault(); sendMessage(); }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={isListening ? "🎤 Listening..." : "Type or select an option above..."}
                    className="flex-1 text-sm rounded-xl border-primary/15 bg-white/60 dark:bg-white/5 focus:border-primary/40 backdrop-blur-sm"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={toggleVoice}
                    disabled={loading}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      isListening
                        ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    title={isListening ? "Stop recording" : "Voice input"}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={loading || !input.trim()}
                    className="rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 shadow-md shadow-primary/20"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-1.5 opacity-50">
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
