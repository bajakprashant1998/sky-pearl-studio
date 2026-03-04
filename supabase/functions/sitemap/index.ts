import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://dibull.com";

// All static routes with priority and changefreq
const staticRoutes: { path: string; priority: string; changefreq: string }[] = [
  { path: "", priority: "1.0", changefreq: "daily" },
  { path: "/about-us", priority: "0.8", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/careers", priority: "0.7", changefreq: "monthly" },
  { path: "/case-studies", priority: "0.8", changefreq: "weekly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
  { path: "/cookie-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/free-tools", priority: "0.8", changefreq: "weekly" },
  { path: "/digital-marketing-academy", priority: "0.8", changefreq: "weekly" },
  { path: "/digital-marketing-syllabus", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/ai-website-designing", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/ai-graphic-designing", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/ai-video-editing", priority: "0.7", changefreq: "monthly" },
  { path: "/our-verticals", priority: "0.7", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/growth-strategy", priority: "0.8", changefreq: "monthly" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  // Service pages
  { path: "/services/seo", priority: "0.9", changefreq: "weekly" },
  { path: "/services/ppc", priority: "0.9", changefreq: "weekly" },
  { path: "/services/web-design", priority: "0.9", changefreq: "weekly" },
  { path: "/services/social-media", priority: "0.9", changefreq: "weekly" },
  { path: "/services/content-marketing", priority: "0.9", changefreq: "weekly" },
  { path: "/services/email-marketing", priority: "0.8", changefreq: "weekly" },
  { path: "/services/conversion-optimization", priority: "0.8", changefreq: "weekly" },
  { path: "/services/ecommerce-marketing", priority: "0.8", changefreq: "weekly" },
  { path: "/services/amazon-marketing", priority: "0.8", changefreq: "weekly" },
  { path: "/services/video-marketing", priority: "0.8", changefreq: "weekly" },
  { path: "/services/programmatic-advertising", priority: "0.8", changefreq: "weekly" },
  { path: "/services/analytics-ai", priority: "0.8", changefreq: "weekly" },
  { path: "/services/custom-development", priority: "0.8", changefreq: "weekly" },
  { path: "/services/ai-marketing", priority: "0.8", changefreq: "weekly" },
  { path: "/services/training-programs", priority: "0.7", changefreq: "monthly" },
  { path: "/services/saas-products", priority: "0.7", changefreq: "monthly" },
  { path: "/services/branding-design", priority: "0.8", changefreq: "weekly" },
  { path: "/services/marketing-automation", priority: "0.8", changefreq: "weekly" },
  { path: "/services/conversion-ux", priority: "0.8", changefreq: "weekly" },
  { path: "/services/growth-hacking", priority: "0.8", changefreq: "weekly" },
  // Free tools
  { path: "/free-tools/seo-checker", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/keyword-research", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/meta-tag-generator", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/speed-test", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/backlink-checker", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/domain-authority-checker", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/ssl-checker", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/robots-txt-generator", priority: "0.7", changefreq: "monthly" },
  { path: "/free-tools/schema-markup-generator", priority: "0.7", changefreq: "monthly" },
  { path: "/free-tools/headline-analyzer", priority: "0.7", changefreq: "monthly" },
  { path: "/free-tools/color-palette-generator", priority: "0.7", changefreq: "monthly" },
  { path: "/free-tools/hashtag-generator", priority: "0.7", changefreq: "monthly" },
  { path: "/free-tools/competitor-analyzer", priority: "0.7", changefreq: "monthly" },
  { path: "/free-tools/ai-content-generator", priority: "0.8", changefreq: "weekly" },
  { path: "/free-tools/ai-image-generator", priority: "0.8", changefreq: "weekly" },
  // Academy benefits
  { path: "/digital-marketing-academy/benefit/ai-integrated-syllabus", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/benefit/in-depth-training", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/benefit/daily-practical-sessions", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/benefit/expert-trainers", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/benefit/small-batch-sizes", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/benefit/portfolio-development", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/benefit/career-guidance", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/benefit/certification-support", priority: "0.7", changefreq: "monthly" },
  // Academy modules
  { path: "/digital-marketing-academy/module/digital-marketing-fundamentals", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/website-landing-page-fundamentals", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/search-engine-optimization", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/content-marketing", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/social-media-marketing", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/paid-advertising-performance-marketing", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/email-whatsapp-marketing", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/analytics-data-tracking", priority: "0.7", changefreq: "monthly" },
  { path: "/digital-marketing-academy/module/online-reputation-management", priority: "0.7", changefreq: "monthly" },
  // Growth stages
  { path: "/growth-strategy/digital-foundation", priority: "0.8", changefreq: "monthly" },
  { path: "/growth-strategy/automation-intelligence", priority: "0.8", changefreq: "monthly" },
  { path: "/growth-strategy/traffic-audience-growth", priority: "0.8", changefreq: "monthly" },
  { path: "/growth-strategy/conversion-revenue-optimisation", priority: "0.8", changefreq: "monthly" },
  { path: "/growth-strategy/scale-authority", priority: "0.8", changefreq: "monthly" },
  // Verticals
  { path: "/our-verticals/cadbull", priority: "0.7", changefreq: "monthly" },
  { path: "/our-verticals/shuttech", priority: "0.7", changefreq: "monthly" },
  { path: "/our-verticals/castingscreen", priority: "0.7", changefreq: "monthly" },
  { path: "/our-verticals/civilengi", priority: "0.7", changefreq: "monthly" },
  { path: "/our-verticals/dibull", priority: "0.7", changefreq: "monthly" },
  { path: "/our-verticals/gift-city-property", priority: "0.7", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/hireforjob", priority: "0.6", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/kundlichart", priority: "0.6", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/makeonindia", priority: "0.6", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/gametoxic", priority: "0.6", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/drugseffect", priority: "0.6", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/yourdesignstory", priority: "0.6", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/hindifilmcinema", priority: "0.6", changefreq: "monthly" },
  { path: "/our-verticals/upcoming/filesbundle", priority: "0.6", changefreq: "monthly" },
  // Case studies
  { path: "/case-studies/cadbull-seo-growth", priority: "0.8", changefreq: "monthly" },
  { path: "/case-studies/ecommerce-revenue-boost", priority: "0.8", changefreq: "monthly" },
  { path: "/case-studies/saas-lead-generation", priority: "0.8", changefreq: "monthly" },
  { path: "/case-studies/local-business-visibility", priority: "0.8", changefreq: "monthly" },
  // Impact pages
  { path: "/impact/revenue-growth", priority: "0.7", changefreq: "monthly" },
  { path: "/impact/lead-generation", priority: "0.7", changefreq: "monthly" },
  { path: "/impact/brand-visibility", priority: "0.7", changefreq: "monthly" },
  { path: "/impact/customer-retention", priority: "0.7", changefreq: "monthly" },
];

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

    // Fetch all published blog posts
    const { data: blogPosts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at, title, image_url")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
    }

    const today = new Date().toISOString().split("T")[0];

    // Build URL entries
    let urls = "";

    // Static routes
    for (const route of staticRoutes) {
      urls += `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>\n`;
    }

    // Blog posts from database
    if (blogPosts && blogPosts.length > 0) {
      for (const post of blogPosts) {
        const lastmod = post.updated_at
          ? new Date(post.updated_at).toISOString().split("T")[0]
          : post.published_at
          ? new Date(post.published_at).toISOString().split("T")[0]
          : today;

        urls += `  <url>
    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${
          post.image_url
            ? `
    <image:image>
      <image:loc>${escapeXml(post.image_url)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>`
            : ""
        }
  </url>\n`;
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
