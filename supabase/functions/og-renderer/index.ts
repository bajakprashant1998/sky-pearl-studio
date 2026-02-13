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

// Dynamic fallback metadata based on URL patterns
function getFallbackMeta(pagePath: string) {
  const siteUrl = "https://dibull.com";
  const defaultImage = `${siteUrl}/dibull_logo.png`;

  // Service pages
  const serviceMatch = pagePath.match(/^\/services\/([^/]+)/);
  if (serviceMatch) {
    const slug = serviceMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${name} Services | Digital Bull Technology`,
      description: `Professional ${name} services by Digital Bull Technology. Data-driven strategies for measurable business growth.`,
      image: defaultImage,
      type: "website",
      url: `${siteUrl}${pagePath}`,
    };
  }

  // Blog pages
  const blogMatch = pagePath.match(/^\/blog\/(.+)/);
  if (blogMatch) {
    return {
      title: "Blog | Digital Bull Technology",
      description: "Latest digital marketing insights, SEO strategies, and industry trends from Digital Bull Technology experts.",
      image: defaultImage,
      type: "article",
      url: `${siteUrl}${pagePath}`,
    };
  }

  // Tools
  const toolMatch = pagePath.match(/^\/free-tools\/(.+)/);
  if (toolMatch) {
    const slug = toolMatch[1];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${name} | Free Marketing Tools | Digital Bull`,
      description: `Use our free ${name} tool to boost your digital marketing. No signup required.`,
      image: defaultImage,
      type: "website",
      url: `${siteUrl}${pagePath}`,
    };
  }

  // Academy
  if (pagePath.startsWith("/digital-marketing-academy")) {
    return {
      title: "Digital Marketing Academy | Digital Bull Technology",
      description: "Comprehensive 6-month digital marketing training program in Ahmedabad. Learn SEO, PPC, social media, AI marketing, and more.",
      image: defaultImage,
      type: "website",
      url: `${siteUrl}${pagePath}`,
    };
  }

  // Case studies
  if (pagePath.startsWith("/case-studies")) {
    return {
      title: "Case Studies | Digital Bull Technology",
      description: "See how Digital Bull Technology helped industry leaders achieve massive growth through data-driven digital marketing strategies.",
      image: defaultImage,
      type: "website",
      url: `${siteUrl}${pagePath}`,
    };
  }

  // Growth strategy
  if (pagePath === "/growth-strategy") {
    return {
      title: "Growth Strategy Blueprint | Digital Bull Technology",
      description: "A 5-stage digital growth blueprint that transforms businesses through systematic foundation building, automation, traffic generation, and scaling.",
      image: defaultImage,
      type: "website",
      url: `${siteUrl}${pagePath}`,
    };
  }

  // Static pages
  const staticPages: Record<string, { title: string; description: string }> = {
    "/about-us": { title: "About Us | Digital Bull Technology", description: "Full-service digital growth company specializing in AI, SaaS, Marketing, and Training." },
    "/contact": { title: "Contact Digital Bull Technology | Free Consultation", description: "Get in touch for a free digital marketing consultation." },
    "/careers": { title: "Careers at Digital Bull Technology", description: "Join our team of digital marketing experts. Remote-first culture with great benefits." },
    "/free-tools": { title: "Free Marketing Tools | Digital Bull Technology", description: "Access 15+ free marketing tools including SEO checker, AI content generator, and more." },
    "/services": { title: "Digital Marketing Services | Digital Bull Technology", description: "Explore 20+ digital marketing services including SEO, PPC, Web Design, Social Media, AI Marketing, and more." },
    "/blog": { title: "Blog | Digital Marketing Insights | Digital Bull Technology", description: "Stay updated with the latest digital marketing trends and strategies." },
    "/privacy-policy": { title: "Privacy Policy | Digital Bull Technology", description: "Read our Privacy Policy to understand how we protect your information." },
    "/terms-of-service": { title: "Terms of Service | Digital Bull Technology", description: "Terms and conditions for using Digital Bull Technology services." },
    "/cookie-policy": { title: "Cookie Policy | Digital Bull Technology", description: "Learn about how Digital Bull Technology uses cookies." },
    "/our-verticals": { title: "Our Verticals | Digital Bull Technology", description: "Specialized digital platforms across industries." },
  };

  const staticPage = staticPages[pagePath];
  if (staticPage) {
    return {
      ...staticPage,
      image: defaultImage,
      type: "website",
      url: `${siteUrl}${pagePath}`,
    };
  }

  // Default
  return {
    title: "Digital Bull Technology | Digital Marketing Agency",
    description: "Leading digital marketing agency for SEO, PPC, Social Media & more",
    image: defaultImage,
    type: "website",
    url: `${siteUrl}${pagePath}`,
  };
}

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

  const fallback = getFallbackMeta(pagePath);
  const siteUrl = "https://dibull.com";

  const title = seo?.og_title || seo?.meta_title || fallback.title;
  const description = seo?.og_description || seo?.meta_description || fallback.description;
  const image = seo?.og_image || fallback.image;
  const ogType = seo?.og_type || fallback.type;
  const canonicalUrl = seo?.canonical_url || fallback.url;

  // Escape HTML entities to prevent XSS
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonicalUrl)}" />
  
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(image)}" />
  <meta property="og:url" content="${esc(canonicalUrl)}" />
  <meta property="og:type" content="${esc(ogType)}" />
  <meta property="og:site_name" content="Digital Bull Technology" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(image)}" />
</head>
<body>
  <h1>${esc(title)}</h1>
  <p>${esc(description)}</p>
  <a href="${esc(canonicalUrl)}">Visit page</a>
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
