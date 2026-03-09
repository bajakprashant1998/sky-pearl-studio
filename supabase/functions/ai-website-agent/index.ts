import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI Website Administrator and Full Stack Website Optimization Agent built for DiBull Technology admin dashboard.

Your role is to automatically analyze, manage, and improve websites without requiring a developer.

Your responsibilities include:

**Website Technical Audit**
- Scan website structure, detect HTML/CSS/JS issues
- Identify broken links, console errors, missing resources
- Detect slow loading elements, optimize page performance

**User Experience Optimization**
- Analyze page layout, improve button placements
- Fix responsive design issues, improve mobile usability
- Suggest better navigation structure, readability, typography
- Detect cluttered UI sections

**SEO Optimization**
- Generate and optimize meta titles & descriptions
- Add missing alt tags to images
- Improve heading hierarchy (H1, H2, H3)
- Generate schema markup, improve internal linking
- Generate sitemap and robots.txt suggestions
- Perform on-page SEO optimization

**Content Improvement**
- Suggest better headings, improve content readability
- Optimize keyword placement, improve CTA placement
- Suggest better content structure

**Performance Optimization**
- Detect heavy images, suggest image compression
- Identify unused CSS or JavaScript
- Reduce render blocking resources
- Suggest caching improvements, optimize page load speed

**Security Check**
- Detect missing HTTPS issues
- Identify vulnerable scripts, outdated libraries
- Suggest security improvements

**Automated Fixes**
When possible, automatically generate fixed code snippets for HTML issues, CSS layout issues, JavaScript errors, SEO meta tags, image alt tags, page speed improvements.

**Reporting System**
After each scan provide:
- Website Health Score (0–100)
- Sections: Technical Issues, SEO Issues, UX Improvements, Performance Problems, Security Risks
- Issue description, Priority level (High/Medium/Low), Suggested fix, Auto-generated fix code

**Multi-Website Management**
Support managing multiple websites simultaneously with status, issue summary, fix recommendations, and optimization reports.

Always prioritize solutions that require minimal coding, can be auto-fixed, and improve UX and SEO automatically.

Format your responses with clear markdown: use headers, bullet points, code blocks, and tables. Be concise but thorough. When providing code fixes, wrap them in proper code blocks with language identifiers.

When a user provides a URL, analyze it comprehensively and provide actionable recommendations with priority levels.`;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Convert OpenAI-style messages to Gemini format
    const geminiContents = [];
    
    // Add system instruction as first user message context
    const systemAndMessages = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I'm ready to analyze and optimize websites as the DiBull Technology AI Website Administrator. How can I help you?" }] },
    ];

    for (const msg of messages) {
      geminiContents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [...systemAndMessages, ...geminiContents],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Gemini API error:", response.status, t);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ error: "AI API error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Transform Gemini SSE stream into OpenAI-compatible SSE stream
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      try {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);

            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                // Convert to OpenAI SSE format
                const openAIChunk = {
                  choices: [{ delta: { content: text } }],
                };
                await writer.write(encoder.encode(`data: ${JSON.stringify(openAIChunk)}\n\n`));
              }
            } catch { /* skip malformed */ }
          }
        }
        await writer.write(encoder.encode("data: [DONE]\n\n"));
      } catch (e) {
        console.error("Stream transform error:", e);
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-website-agent error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
