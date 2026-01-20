import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DIGITAL_MARKETING_TOPICS = [
  "SEO strategies and Google algorithm updates",
  "AI-powered marketing automation tools",
  "Social media marketing trends",
  "Content marketing best practices",
  "Email marketing optimization",
  "PPC advertising strategies",
  "Web design and development trends",
  "E-commerce marketing tactics",
  "Local SEO for businesses",
  "Video marketing strategies",
  "Voice search optimization",
  "Mobile marketing techniques",
  "Influencer marketing trends",
  "Marketing analytics and data",
  "Conversion rate optimization",
  "Brand building strategies",
  "Customer experience optimization",
  "Marketing technology stack",
  "B2B digital marketing",
  "Personalization in marketing"
];

const CATEGORIES = [
  "SEO",
  "AI Marketing",
  "Web Design",
  "Social Media",
  "Content Marketing",
  "E-commerce",
  "Email Marketing",
  "PPC Advertising",
  "Analytics"
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get request body - can specify number of articles to generate
    const body = await req.json().catch(() => ({}));
    const articlesToGenerate = body.count || 2;

    const generatedArticles = [];

    for (let i = 0; i < articlesToGenerate; i++) {
      // Pick random topic and category
      const randomTopic = DIGITAL_MARKETING_TOPICS[Math.floor(Math.random() * DIGITAL_MARKETING_TOPICS.length)];
      const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

      const systemPrompt = `You are an expert SEO content writer for a Digital Marketing & Web Development agency called Digital Bull Technology. Write professional, informative blog posts that provide genuine value to readers.

IMPORTANT RULES:
- Write 900-1200 words
- Use simple, professional English
- Be informative and trustworthy
- Include real-world examples when possible
- No keyword stuffing
- Write for business owners, marketers, and developers

Your response MUST be in this exact JSON format:
{
  "title": "SEO-optimized title (max 60 characters)",
  "metaDescription": "Compelling meta description (150-160 characters)",
  "excerpt": "Brief 2-3 sentence summary for preview cards",
  "category": "${randomCategory}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "content": "Full article content with ## for H2 headings, ### for H3 headings, **bold** for emphasis, and - for bullet points"
}`;

      const userPrompt = `Write a comprehensive, SEO-optimized blog article about: "${randomTopic}" 

The article should:
1. Have an engaging, keyword-rich introduction
2. Use H2 and H3 subheadings to organize content
3. Include bullet points where useful
4. End with a conclusion and call-to-action
5. Be based on current trends and best practices for 2026
6. Include actionable tips and strategies

Category: ${randomCategory}

Remember to provide ONLY valid JSON in your response.`;

      console.log(`Generating article ${i + 1} about: ${randomTopic}`);

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`AI gateway error for article ${i + 1}:`, response.status, errorText);
        continue;
      }

      const data = await response.json();
      const aiContent = data.choices?.[0]?.message?.content;

      if (!aiContent) {
        console.error(`No content received for article ${i + 1}`);
        continue;
      }

      // Parse the JSON response
      let articleData;
      try {
        // Extract JSON from the response (handle markdown code blocks)
        let jsonStr = aiContent;
        if (aiContent.includes("```json")) {
          jsonStr = aiContent.split("```json")[1].split("```")[0].trim();
        } else if (aiContent.includes("```")) {
          jsonStr = aiContent.split("```")[1].split("```")[0].trim();
        }
        articleData = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error(`Failed to parse AI response for article ${i + 1}:`, parseError);
        continue;
      }

      // Generate slug from title
      const today = new Date().toISOString().split('T')[0];
      const baseSlug = generateSlug(articleData.title);
      const slug = `${baseSlug}-${today}-${i + 1}`;

      // Calculate read time
      const readTime = calculateReadTime(articleData.content);

      // Insert into database
      const { data: insertedPost, error: insertError } = await supabase
        .from("blog_posts")
        .insert({
          slug,
          title: articleData.title,
          meta_description: articleData.metaDescription,
          excerpt: articleData.excerpt,
          content: articleData.content,
          category: articleData.category || randomCategory,
          tags: articleData.tags || [],
          read_time: readTime,
          author: "DiBull AI Team",
          is_published: true,
          published_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        console.error(`Failed to insert article ${i + 1}:`, insertError);
        continue;
      }

      console.log(`Successfully generated and saved article: ${articleData.title}`);
      generatedArticles.push(insertedPost);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated ${generatedArticles.length} articles`,
        articles: generatedArticles,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Blog generation error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
