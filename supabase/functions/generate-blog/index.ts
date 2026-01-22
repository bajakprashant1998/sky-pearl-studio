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

// Generate unique image using Gemini API
async function generateBlogImage(topic: string, category: string, title: string, geminiApiKey: string): Promise<string | null> {
  try {
    // Create a highly specific prompt based on the actual article title and topic
    const uniqueElements = [
      "abstract geometric shapes",
      "flowing data streams",
      "interconnected nodes",
      "rising bar charts",
      "circular infographic elements",
      "gradient mesh backgrounds",
      "isometric icons",
      "minimalist line art",
      "layered paper cut style",
      "3D floating elements"
    ];
    
    const colorSchemes = [
      "deep blue to cyan gradient",
      "purple to pink gradient",
      "teal to green gradient",
      "orange to yellow gradient",
      "indigo to violet gradient"
    ];
    
    const randomElement = uniqueElements[Math.floor(Math.random() * uniqueElements.length)];
    const randomColors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    const uniqueId = Date.now() + Math.random().toString(36).substring(7);

    const imagePrompt = `Create a unique, professional blog header image. 
Topic: "${title}" about ${topic}.
Category: ${category}.
Visual Style: ${randomElement} with ${randomColors}.
Requirements:
- Modern, clean corporate design
- 16:9 aspect ratio
- NO text, NO words, NO letters
- Unique composition ID: ${uniqueId}
- High quality, professional marketing aesthetic
- Abstract representation of the ${category} concept`;

    console.log("Generating unique image for:", title);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: imagePrompt }]
          }],
          generationConfig: {
            responseModalities: ["image", "text"]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini image API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    
    // Extract base64 image from Gemini response
    const parts = data.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          console.log("Successfully generated unique image for:", title);
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }

    console.log("No image found in Gemini response");
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

// Upload base64 image to Supabase storage
async function uploadImageToStorage(
  supabase: any,
  base64Image: string,
  slug: string
): Promise<string | null> {
  try {
    // Extract base64 data and mime type
    const matches = base64Image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      console.error("Invalid base64 image format");
      return null;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split("/")[1] || "png";
    const fileName = `blog-images/${slug}.${extension}`;

    // Convert base64 to Uint8Array
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b: any) => b.name === "blog-images");
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket("blog-images", {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      if (createError) {
        console.error("Error creating bucket:", createError);
      }
    }

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, bytes, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    console.log("Image uploaded successfully:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadImageToStorage:", error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
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

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
            }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 4096,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error for article ${i + 1}:`, response.status, errorText);
        continue;
      }

      const data = await response.json();
      const aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

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
        
        // Clean up potential issues in JSON string
        jsonStr = jsonStr
          .replace(/[\x00-\x1F\x7F]/g, ' ') // Remove control characters
          .replace(/\n\s*\n/g, '\n') // Remove double newlines
          .replace(/,\s*}/g, '}') // Remove trailing commas
          .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
        
        articleData = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error(`Failed to parse AI response for article ${i + 1}:`, parseError);
        console.error(`Raw content (first 500 chars):`, aiContent.substring(0, 500));
        continue;
      }

      // Generate slug from title
      const today = new Date().toISOString().split('T')[0];
      const baseSlug = generateSlug(articleData.title);
      const slug = `${baseSlug}-${today}-${i + 1}`;

      // Calculate read time
      const readTime = calculateReadTime(articleData.content);

      // Generate and upload unique image using Gemini API
      let imageUrl = null;
      console.log("Generating unique image with Gemini API...");
      const base64Image = await generateBlogImage(randomTopic, randomCategory, articleData.title, GEMINI_API_KEY);
      if (base64Image) {
        imageUrl = await uploadImageToStorage(supabase, base64Image, slug);
      }

      if (!imageUrl) {
        console.log("Image generation failed, post will be created without image");
      }

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
          image_url: imageUrl,
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
      if (imageUrl) {
        console.log(`With image: ${imageUrl}`);
      }
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
