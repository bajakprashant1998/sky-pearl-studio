import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate unique image using Lovable AI
async function generateBlogImage(topic: string, category: string, title: string, lovableApiKey: string): Promise<string | null> {
  try {
    const uniqueElements = [
      "abstract geometric shapes with floating cubes",
      "flowing data streams and particles",
      "interconnected network nodes",
      "rising bar charts and analytics",
      "circular infographic elements",
      "gradient mesh with tech patterns",
      "isometric business icons",
      "minimalist line art composition",
      "layered paper cut style design",
      "3D floating elements and spheres"
    ];
    
    const colorSchemes = [
      "deep navy blue to bright cyan gradient",
      "rich purple to vibrant pink gradient",
      "teal to emerald green gradient",
      "warm orange to golden yellow gradient",
      "royal indigo to electric violet gradient"
    ];
    
    const randomElement = uniqueElements[Math.floor(Math.random() * uniqueElements.length)];
    const randomColors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    const uniqueId = Date.now() + Math.random().toString(36).substring(7);

    const imagePrompt = `Create a unique, professional blog header image. 
Topic: "${title}".
Category: ${category}.
Visual Style: ${randomElement} with ${randomColors}.
Requirements:
- Modern, clean corporate design
- 16:9 aspect ratio, wide format
- NO text, NO words, NO letters anywhere
- Unique composition ID: ${uniqueId}
- High quality, professional digital marketing aesthetic
- Abstract creative representation of ${topic}`;

    console.log("Generating unique image for:", title);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: imagePrompt
            }
          ],
          modalities: ["image", "text"]
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI image API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    
    const images = data.choices?.[0]?.message?.images;
    if (images && images.length > 0) {
      const imageUrl = images[0]?.image_url?.url;
      if (imageUrl) {
        console.log("Successfully generated unique image for:", title);
        return imageUrl;
      }
    }

    console.log("No image found in Lovable AI response");
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
    const matches = base64Image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      console.error("Invalid base64 image format");
      return null;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split("/")[1] || "png";
    const fileName = `blog-images/${slug}-${Date.now()}.${extension}`;

    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

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

    const body = await req.json().catch(() => ({}));
    const postIds = body.ids || [];

    // Get posts that need images
    let query = supabase
      .from("blog_posts")
      .select("id, slug, title, category")
      .is("image_url", null);
    
    if (postIds.length > 0) {
      query = supabase
        .from("blog_posts")
        .select("id, slug, title, category")
        .in("id", postIds);
    }

    const { data: posts, error: fetchError } = await query;

    if (fetchError) {
      throw new Error(`Failed to fetch posts: ${fetchError.message}`);
    }

    if (!posts || posts.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No posts need image regeneration" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const updatedPosts = [];

    for (const post of posts) {
      console.log(`Generating image for: ${post.title}`);
      
      const base64Image = await generateBlogImage(
        post.title,
        post.category,
        post.title,
        LOVABLE_API_KEY
      );

      if (base64Image) {
        const imageUrl = await uploadImageToStorage(supabase, base64Image, post.slug);
        
        if (imageUrl) {
          const { error: updateError } = await supabase
            .from("blog_posts")
            .update({ image_url: imageUrl })
            .eq("id", post.id);

          if (updateError) {
            console.error(`Failed to update post ${post.id}:`, updateError);
          } else {
            console.log(`Successfully updated image for: ${post.title}`);
            updatedPosts.push({ id: post.id, title: post.title, image_url: imageUrl });
          }
        }
      }
      
      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Regenerated images for ${updatedPosts.length} posts`,
        posts: updatedPosts,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Image regeneration error:", error);
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
