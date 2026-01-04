import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Loader2, Copy, Check, Sparkles } from "lucide-react";

const AIContentGeneratorTool = () => {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog-post");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);

  const generateContent = async () => {
    if (!topic) return;

    setLoading(true);
    setGeneratedContent("");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const contentTemplates: Record<string, string> = {
      "blog-post": `# ${topic}: A Comprehensive Guide

## Introduction

In today's rapidly evolving digital landscape, understanding ${topic.toLowerCase()} has become more crucial than ever. This comprehensive guide will walk you through everything you need to know to master this subject and apply it effectively in your business or personal projects.

## Why ${topic} Matters

The importance of ${topic.toLowerCase()} cannot be overstated. Whether you're a seasoned professional or just starting out, having a solid grasp of these concepts will give you a significant competitive advantage.

### Key Benefits:
- Improved efficiency and productivity
- Better decision-making capabilities
- Enhanced competitive positioning
- Greater ROI on your investments

## Getting Started

To begin your journey with ${topic.toLowerCase()}, you'll want to focus on these foundational elements:

1. **Understand the basics** - Build a strong foundation of knowledge
2. **Practice regularly** - Apply what you learn consistently
3. **Seek feedback** - Learn from others' experiences
4. **Stay updated** - Keep up with the latest trends and developments

## Best Practices

Here are some proven strategies that successful practitioners use:

- Always start with clear objectives
- Measure your progress regularly
- Be willing to adapt and evolve
- Invest in continuous learning

## Conclusion

Mastering ${topic.toLowerCase()} is a journey, not a destination. By following the guidelines outlined in this article and committing to ongoing improvement, you'll be well on your way to achieving your goals.

*Ready to take the next step? Contact our team of experts for personalized guidance.*`,
      
      "social-media": `🚀 Exciting news about ${topic}! 

Here's what you need to know:

✅ It's changing the game for businesses worldwide
✅ Early adopters are seeing incredible results
✅ Now is the perfect time to get started

Don't get left behind! 

#${topic.replace(/\s+/g, "")} #DigitalMarketing #Growth #Business #Innovation`,
      
      "product-description": `Introducing the Ultimate Solution for ${topic}

Transform your approach to ${topic.toLowerCase()} with our cutting-edge solution designed for modern businesses.

**Key Features:**
• Intuitive, user-friendly interface
• Powerful analytics and reporting
• Seamless integration capabilities
• 24/7 expert support

**Why Choose Us:**
Our solution stands out from the competition by delivering measurable results from day one. With years of experience and thousands of satisfied customers, we've perfected the art of ${topic.toLowerCase()}.

**What's Included:**
- Complete setup and onboarding
- Comprehensive training materials
- Dedicated account manager
- Regular updates and improvements

*Start your free trial today and experience the difference!*`,
      
      "email": `Subject: Transform Your ${topic} Strategy Today

Hi [Name],

I hope this email finds you well. I wanted to reach out because I noticed your interest in improving your ${topic.toLowerCase()} efforts.

Many businesses struggle with ${topic.toLowerCase()}, but it doesn't have to be that way. Our team has helped hundreds of companies achieve remarkable results, and I believe we can do the same for you.

Here's what sets us apart:
- Proven methodology with documented results
- Personalized approach tailored to your needs
- Ongoing support and optimization

Would you be available for a quick 15-minute call this week? I'd love to learn more about your goals and share some ideas that could help.

Best regards,
[Your Name]

P.S. We're currently offering a free consultation for new clients. Reply to this email to claim yours!`
    };

    setGeneratedContent(contentTemplates[contentType] || contentTemplates["blog-post"]);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Generate AI Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Topic or Keywords</label>
                <Input
                  placeholder="Enter your topic (e.g., Digital Marketing)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Content Type</label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog-post">Blog Post</SelectItem>
                    <SelectItem value="social-media">Social Media Post</SelectItem>
                    <SelectItem value="product-description">Product Description</SelectItem>
                    <SelectItem value="email">Email Copy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="informative">Informative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateContent} disabled={loading || !topic} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Generated Content</label>
                {generatedContent && (
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
              <Textarea
                placeholder="Your generated content will appear here..."
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentGeneratorTool;
