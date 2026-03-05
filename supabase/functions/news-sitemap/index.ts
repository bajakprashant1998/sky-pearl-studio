import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://dibull.com";
const PUBLICATION_NAME = "Digital Bull Technology";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Google News requires posts from last 48 hours, but we include last 30 days for discovery
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, title, published_at, updated_at, tags, category")
      .eq("is_published", true)
      .gte("published_at", thirtyDaysAgo)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    }

    const articles = posts || [];

    let urls = "";
    for (const post of articles) {
      const pubDate = new Date(post.published_at).toISOString();
      const tags = (post.tags || []).slice(0, 10).join(", ");

      urls += `  <url>
    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>${PUBLICATION_NAME}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
      <news:keywords>${escapeXml(tags)}</news:keywords>
    </news:news>
    <lastmod>${pubDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>\n`;
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=1800, s-maxage=1800",
      },
    });
  } catch (err) {
    console.error("News sitemap error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
