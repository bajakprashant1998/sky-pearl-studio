import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Loader2, Copy, Check, Sparkles, PenTool, Hash, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const CONTENT_TYPES = [
  { id: "blog-draft", label: "Blog Draft", icon: FileText, prompt: "Write a comprehensive, SEO-optimized blog article about the following topic. Include an engaging introduction, clear subheadings (H2, H3), bullet points for key takeaways, and a strong conclusion with a call-to-action. Target word count: 1500+ words." },
  { id: "meta-description", label: "Meta Description", icon: Hash, prompt: "Generate 3 SEO-optimized meta descriptions (max 160 characters each) for the following page/topic. Each should include the primary keyword, a value proposition, and a call-to-action." },
  { id: "social-post", label: "Social Media Post", icon: MessageSquare, prompt: "Create engaging social media posts for the following topic. Include: 1 LinkedIn post (professional tone, 200-300 words), 1 Instagram caption (casual, with emojis, include hashtags), 1 Twitter/X post (concise, under 280 chars)." },
  { id: "ad-copy", label: "Ad Copy", icon: PenTool, prompt: "Write high-converting ad copy for the following product/service. Include: 3 headline options (max 30 chars), 2 description options (max 90 chars), and 1 long-form ad description (200 words). Focus on benefits, urgency, and clear CTAs." },
];

const AI_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-website-agent`;

const AdminContentWriter = () => {
  const [contentType, setContentType] = useState("blog-draft");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return toast.error("Please enter a topic");
    setIsLoading(true);
    setResult("");

    const ct = CONTENT_TYPES.find((c) => c.id === contentType);
    const userPrompt = `${ct?.prompt}\n\nTopic: ${topic}\n${keywords ? `Target Keywords: ${keywords}` : ""}\nTone: ${tone}`;

    try {
      const resp = await fetch(AI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [{ role: "user", content: userPrompt }] }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        throw new Error(err.error || "Request failed");
      }
      if (!resp.body) throw new Error("No response");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let content = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              content += delta;
              setResult(content);
            }
          } catch { /* partial */ }
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to generate content");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> AI Content Writer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Generate blog drafts, meta descriptions, social posts & ad copy</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Content Type</label>
              <Tabs value={contentType} onValueChange={setContentType}>
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
                  {CONTENT_TYPES.map((ct) => (
                    <TabsTrigger key={ct.id} value={ct.id} className="text-xs gap-1">
                      <ct.icon className="w-3 h-3" /> {ct.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Topic / Subject *</label>
              <Textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 10 SEO strategies for small businesses in 2026"
                rows={3}
                className="resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Target Keywords (optional)</label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., SEO tips, small business marketing, digital marketing"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual & Friendly</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generate} disabled={isLoading} className="w-full" size="lg">
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Generating...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Generate Content</>
              )}
            </Button>
          </div>

          {/* Output Panel */}
          <div className="bg-card rounded-2xl border border-border p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Generated Content</h2>
              {result && (
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1.5">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </div>
            <div className="flex-1 min-h-[300px] max-h-[60vh] overflow-y-auto rounded-xl bg-muted/40 p-4">
              {result ? (
                <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{result}</div>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating content...
                    </div>
                  ) : (
                    "Generated content will appear here"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContentWriter;
