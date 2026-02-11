import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CRAWLER_USER_AGENTS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "Slackbot",
  "TelegramBot",
  "Pinterest",
  "Discordbot",
  "Googlebot",
  "bingbot",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pagePath = url.searchParams.get("path") || "/";
  const userAgent = req.headers.get("user-agent") || "";

  // Check if this is a crawler
  const isCrawler = CRAWLER_USER_AGENTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );

  if (!isCrawler) {
    return new Response(JSON.stringify({ redirect: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Fetch SEO settings from database
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: seo } = await supabase
    .from("page_seo_settings")
    .select("*")
    .eq("page_path", pagePath)
    .maybeSingle();

  const siteUrl = "https://dibull.com";
  const title = seo?.og_title || seo?.meta_title || "Digital Bull Technology | Digital Marketing Agency";
  const description = seo?.og_description || seo?.meta_description || "Leading digital marketing agency for SEO, PPC, Social Media & more";
  const image = seo?.og_image || `${siteUrl}/dibull_logo.png`;
  const ogType = seo?.og_type || "website";
  const canonicalUrl = seo?.canonical_url || `${siteUrl}${pagePath}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonicalUrl}" />
  
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="Digital Bull Technology" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <a href="${canonicalUrl}">Visit page</a>
</body>
</html>`;

  return new Response(html, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
