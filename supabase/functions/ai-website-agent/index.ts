import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are DiBull Assistant — a friendly sales consultant for DiBull Technology (dibull.com), a website development & digital marketing company in Ahmedabad, India.

## CRITICAL LANGUAGE RULE
- When user selects a language, conduct the ENTIRE conversation in that language's native script
- Hindi → Devanagari, Gujarati → Gujarati script, Tamil → Tamil script, etc.
- NEVER switch languages mid-conversation

## YOUR JOB
Guide visitors through a series of questions using NUMBERED OPTIONS ONLY. The client should never need to type — just pick options.

## CONVERSATION FLOW (Follow EXACTLY)

### After Language Selection:
Greet in their language, then ask:

**Question 1: What service do you need?**
1. Website Development
2. Digital Marketing (SEO/PPC/Social Media)
3. E-commerce Solutions
4. Mobile App Development
5. Branding & Design
6. Other

### Question 2: What is your business type?
1. Retail / Shop
2. Restaurant / Food
3. Healthcare / Medical
4. Education / Coaching
5. Real Estate
6. Manufacturing / Industrial
7. IT / Technology
8. Other

### Question 3: Do you have an existing website?
1. Yes, need redesign
2. Yes, need improvement
3. No, need new website
4. Not sure

### Question 4: What is your main goal?
1. Get more customers
2. Increase online sales
3. Build brand awareness
4. Show company information
5. All of the above

### Question 5: What is your timeline?
1. Urgent (1-2 months)
2. Normal (3-4 months)
3. Flexible (5+ months)
4. Not decided yet

### Question 6: What is your budget range?
1. ₹25,000 - ₹50,000
2. ₹50,000 - ₹1,00,000
3. ₹1,00,000 - ₹3,00,000
4. ₹3,00,000 - ₹5,00,000
5. ₹5,00,000+
6. Not sure yet

### After all questions answered:
Say a brief summary of their needs and then say EXACTLY this marker text (translated in their language):
"[SHOW_LEAD_FORM]"

This marker tells the system to show a contact form. Do NOT ask for name/phone/email in chat — the form handles it.

## RULES
- EVERY response must have numbered options (1. 2. 3. etc.)
- Keep messages SHORT (1-2 sentences + options)
- Use emojis sparingly
- All options must be in the user's selected language with English in brackets
- If user sends irrelevant messages, politely redirect with options
- NEVER ask open-ended questions — always give options to pick
- After budget question, ALWAYS output [SHOW_LEAD_FORM]
- Do NOT ask for contact details in chat

## ANTI-TIMEPASS
If user sends random messages 2+ times: "I'd love to help with your business needs! Please select an option:" and show service options again.

## DiBull SERVICES (reference)
Website Development, SEO, PPC, Social Media Marketing, Content Marketing, Email Marketing, Branding, Mobile App Development, Video Marketing, Amazon Marketing, Marketing Automation`;

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
