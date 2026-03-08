import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Loader2, Trash2, Globe, Shield, Zap, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-website-agent`;

const QUICK_PROMPTS = [
  { icon: Globe, label: "Audit Website", prompt: "Perform a full technical audit of https://dibull.com and provide a health score with prioritized issues." },
  { icon: Search, label: "SEO Analysis", prompt: "Do a comprehensive SEO analysis of https://dibull.com — check meta tags, headings, schema markup, internal linking, and provide fix recommendations." },
  { icon: Zap, label: "Speed Optimization", prompt: "Analyze https://dibull.com for performance issues — check image sizes, render-blocking resources, unused CSS/JS, and suggest optimizations." },
  { icon: Shield, label: "Security Check", prompt: "Run a security check on https://dibull.com — check HTTPS, vulnerable scripts, outdated libraries, and security headers." },
];

const AdminAIAgent = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const streamChat = useCallback(async (allMessages: Msg[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: allMessages }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ error: "Request failed" }));
      throw new Error(err.error || `Request failed (${resp.status})`);
    }
    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantSoFar = "";

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      const content = assistantSoFar;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m));
        }
        return [...prev, { role: "assistant", content }];
      });
    };

    let streamDone = false;
    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") { streamDone = true; break; }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) upsert(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    // flush remaining
    if (buffer.trim()) {
      for (let raw of buffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) upsert(content);
        } catch { /* ignore */ }
      }
    }
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(updated);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering
    let html = text
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-muted/70 border border-border rounded-xl p-4 my-3 overflow-x-auto text-xs font-mono"><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary">$1</code>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-foreground mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-foreground mt-5 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-foreground mt-6 mb-3">$1</h1>')
      // Bullet lists
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm text-muted-foreground">$1</li>')
      .replace(/^• (.+)$/gm, '<li class="ml-4 list-disc text-sm text-muted-foreground">$1</li>')
      // Numbered lists
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm text-muted-foreground">$1</li>')
      // Tables (basic)
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(Boolean).map(c => c.trim());
        if (cells.every(c => /^-+$/.test(c))) return '';
        const tag = cells.some(c => /^-+$/.test(c)) ? 'th' : 'td';
        return `<tr>${cells.map(c => `<${tag} class="border border-border px-3 py-1.5 text-xs">${c}</${tag}>`).join('')}</tr>`;
      })
      // Line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');

    return html;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] max-h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Website Agent
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Analyze, optimize, and fix websites automatically
            </p>
          </div>
          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMessages([])}
              className="gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </Button>
          )}
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-4 space-y-4 mb-4"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground mb-2">AI Website Agent</h2>
              <p className="text-sm text-muted-foreground max-w-md mb-8">
                I can audit websites, optimize SEO, fix performance issues, check security, and generate code fixes — all automatically.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp.label}
                    onClick={() => send(qp.prompt)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <qp.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{qp.label}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{qp.prompt.slice(0, 50)}…</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 border border-border/50"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div
                      className="text-sm prose-sm"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                    />
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs font-bold text-accent">You</span>
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted/60 border border-border/50 rounded-2xl px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="shrink-0 flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a website URL to audit, or ask about SEO, performance, security..."
            className="resize-none min-h-[48px] max-h-32 rounded-xl bg-card border-border"
            rows={1}
            disabled={isLoading}
          />
          <Button
            onClick={() => send(input)}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-12 w-12 rounded-xl shrink-0"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAIAgent;
