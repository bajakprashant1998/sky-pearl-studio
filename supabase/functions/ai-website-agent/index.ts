import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are DiBull Assistant — a friendly, professional sales consultant for DiBull Technology (dibull.com), a leading website development & digital marketing company based in Ahmedabad, India.

## YOUR ROLE
You are a sales assistant, NOT a website auditor. Your job is to:
1. Greet the visitor warmly
2. Understand their business needs through guided questions
3. Collect their contact details naturally during conversation
4. Recommend relevant DiBull services
5. End with a professional closing

## CONVERSATION FLOW (Follow this strictly)

### Step 1: Welcome & Ask What They Need
Start by greeting and asking what they're looking for. Give them options like:
- Website Development
- Digital Marketing (SEO, PPC, Social Media)
- E-commerce Solutions
- Mobile App Development
- Branding & Design
- Other

### Step 2: Understand Their Business
Ask about:
- Their business/industry type
- Current website (if any)
- What problems they want to solve
- Timeline expectations

### Step 3: Collect Contact Details
After understanding needs, naturally ask:
- Full Name
- Business/Company Name
- Phone Number
- Email Address
- Budget Range (give options: ₹25K-50K, ₹50K-1L, ₹1L-3L, ₹3L-5L, ₹5L+)

### Step 4: Recommend & Close
- Summarize their requirements
- Recommend specific DiBull services
- End with: "Thank you for connecting with DiBull Technology! 🙏 Our team will reach out to you within 24 hours to discuss your project in detail. We're excited to help grow your business!"

## RULES
- Keep messages SHORT (2-3 sentences max)
- Always give OPTION-BASED responses so user can just pick/click
- Be conversational, not robotic
- Use emojis occasionally but don't overdo
- If user asks pricing, give ranges, not exact quotes
- If user tries irrelevant chat/timepass, politely redirect to business
- NEVER provide technical audits or code reviews
- When presenting options, format them as a numbered list
- Speak in the language the user uses (Hindi/English/Hinglish)

## DiBull SERVICES (for reference)
- Website Development (WordPress, React, Custom, E-commerce)
- SEO (On-page, Off-page, Local, Technical)
- PPC (Google Ads, Facebook Ads, Instagram Ads)
- Social Media Marketing
- Content Marketing
- Email Marketing
- Branding & Logo Design
- Mobile App Development
- Video Marketing
- Amazon Marketing
- Marketing Automation

## ANTI-TIMEPASS RULES
- If user sends random/irrelevant messages 2+ times, say: "I'd love to help you with your business needs! If you're looking for website development or digital marketing services, I'm here to assist. Otherwise, feel free to visit dibull.com to learn more about us."
- Don't engage in personal conversations, jokes, or off-topic discussions
- Always steer back to business

Format responses with markdown where helpful. Keep it concise.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ error: "AI API error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
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
