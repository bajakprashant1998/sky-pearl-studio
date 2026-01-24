import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================================
// COMPREHENSIVE TOPIC MATRIX - Aligned with website service categories
// ============================================================================

interface TopicTemplate {
  template: string;
  angles: string[];
  examples: string[];
  infographicType: string;
}

interface CategoryTopics {
  subcategories: string[];
  topics: TopicTemplate[];
}

const TOPIC_MATRIX: Record<string, CategoryTopics> = {
  "SEO": {
    subcategories: ["On-Page SEO", "Technical SEO", "Off-Page SEO", "Local SEO", "Enterprise SEO"],
    topics: [
      {
        template: "How to Implement {technique} for Better Rankings in 2026",
        angles: ["Schema Markup", "Core Web Vitals Optimization", "E-E-A-T Signals", "Internal Linking Architecture", "Featured Snippet Optimization"],
        examples: ["Moz", "Ahrefs", "SEMrush case studies"],
        infographicType: "process"
      },
      {
        template: "{industry} SEO: Complete Guide to Dominating Search Results",
        angles: ["Healthcare", "Legal", "Real Estate", "E-commerce", "SaaS", "Finance", "Education", "Restaurant"],
        examples: ["Industry-specific ranking factors"],
        infographicType: "statistics"
      },
      {
        template: "The Truth About {myth}: What Actually Works for SEO",
        angles: ["Keyword Density", "Meta Tags Importance", "Backlink Quantity vs Quality", "Content Length", "Exact Match Domains"],
        examples: ["Google algorithm updates"],
        infographicType: "comparison"
      },
      {
        template: "{technique} Implementation: Step-by-Step Technical Guide",
        angles: ["JSON-LD Structured Data", "Hreflang Tags", "Canonical Tags", "Pagination SEO", "JavaScript SEO"],
        examples: ["Code snippets and examples"],
        infographicType: "process"
      },
      {
        template: "Local SEO for {business}: From Zero to Google Map Pack",
        angles: ["Restaurants", "Dental Clinics", "Law Firms", "Plumbers", "Auto Repair Shops", "Gyms", "Salons"],
        examples: ["Google Business Profile optimization"],
        infographicType: "checklist"
      }
    ]
  },
  "PPC Advertising": {
    subcategories: ["Google Ads", "Display Advertising", "Remarketing", "Shopping Ads", "Mobile Ads"],
    topics: [
      {
        template: "How to Reduce {metric} While Increasing Conversions",
        angles: ["Cost Per Click", "Cost Per Acquisition", "Wasted Ad Spend", "Bounce Rate from Ads"],
        examples: ["Real campaign optimization examples"],
        infographicType: "statistics"
      },
      {
        template: "{platform} Advertising for {industry}: Complete Strategy Guide",
        angles: ["Google Ads for E-commerce", "LinkedIn Ads for B2B", "Facebook Ads for Local Business", "TikTok Ads for D2C Brands"],
        examples: ["Platform-specific best practices"],
        infographicType: "process"
      },
      {
        template: "Advanced {technique} Strategies That 90% of Advertisers Miss",
        angles: ["Audience Segmentation", "Bid Strategy", "Ad Scheduling", "Negative Keywords", "RLSA Campaigns"],
        examples: ["Advanced advertiser tactics"],
        infographicType: "comparison"
      },
      {
        template: "How to Write {ad_type} That Actually Convert",
        angles: ["Responsive Search Ads", "Display Ad Copy", "Shopping Feed Titles", "Call-Only Ads", "Video Ad Scripts"],
        examples: ["Before/after ad copy examples"],
        infographicType: "comparison"
      }
    ]
  },
  "Web Design": {
    subcategories: ["UI/UX Design", "Responsive Design", "Website Development", "Landing Pages", "E-commerce Design"],
    topics: [
      {
        template: "{trend} in Web Design: Implementation Guide for 2026",
        angles: ["Bento Grid Layouts", "Glassmorphism", "Dark Mode Design", "Micro-interactions", "Asymmetric Layouts", "Neubrutalism"],
        examples: ["Award-winning website examples"],
        infographicType: "comparison"
      },
      {
        template: "How to Design {page_type} That Convert at 10%+",
        angles: ["Landing Pages", "Pricing Pages", "Product Pages", "Service Pages", "Contact Pages", "Homepage"],
        examples: ["High-converting page examples"],
        infographicType: "process"
      },
      {
        template: "Website Speed Optimization: Reduce Load Time by {percentage}",
        angles: ["50%", "60%", "70%", "80%"],
        examples: ["Performance optimization techniques"],
        infographicType: "statistics"
      },
      {
        template: "Accessibility in Web Design: Complete WCAG {version} Compliance Guide",
        angles: ["2.1 AA", "2.1 AAA", "2.2"],
        examples: ["Accessible component examples"],
        infographicType: "checklist"
      },
      {
        template: "Psychology-Driven Web Design: {principle} for Higher Conversions",
        angles: ["Color Psychology", "F-Pattern & Z-Pattern Layouts", "Social Proof Placement", "Scarcity Triggers", "Trust Signals"],
        examples: ["A/B test results"],
        infographicType: "comparison"
      }
    ]
  },
  "Social Media": {
    subcategories: ["Facebook Marketing", "Instagram Marketing", "LinkedIn Marketing", "TikTok Marketing", "Twitter/X Marketing"],
    topics: [
      {
        template: "{platform} Algorithm 2026: What You Need to Know",
        angles: ["Instagram", "TikTok", "LinkedIn", "Facebook", "YouTube", "Twitter/X"],
        examples: ["Algorithm change analysis"],
        infographicType: "statistics"
      },
      {
        template: "How to Create Viral {content_type} on Social Media",
        angles: ["Short-Form Videos", "Carousel Posts", "Threads", "Stories", "Live Streams", "User-Generated Content"],
        examples: ["Viral content case studies"],
        infographicType: "process"
      },
      {
        template: "Social Media for {industry}: Complete Content Strategy",
        angles: ["B2B Companies", "Healthcare", "Fashion Brands", "Food & Beverage", "Tech Startups", "Real Estate"],
        examples: ["Industry-specific content calendars"],
        infographicType: "process"
      },
      {
        template: "Building a {follower_count} Following: Realistic Timeline & Strategy",
        angles: ["10K", "50K", "100K", "Million"],
        examples: ["Growth case studies"],
        infographicType: "statistics"
      }
    ]
  },
  "Content Marketing": {
    subcategories: ["Blog Strategy", "Video Content", "Infographics", "Whitepapers", "Case Studies"],
    topics: [
      {
        template: "The {type} Content Framework: From Idea to Publication",
        angles: ["Pillar Content", "Skyscraper", "Hub and Spoke", "Topic Cluster"],
        examples: ["Content marketing frameworks"],
        infographicType: "process"
      },
      {
        template: "How to Repurpose One Piece of Content into {number} Assets",
        angles: ["10", "15", "20", "25"],
        examples: ["Content repurposing workflows"],
        infographicType: "process"
      },
      {
        template: "Content ROI: Measuring the True Value of {content_type}",
        angles: ["Blog Posts", "Videos", "Podcasts", "Webinars", "Infographics", "Case Studies"],
        examples: ["ROI calculation formulas"],
        infographicType: "statistics"
      },
      {
        template: "AI-Assisted Content Creation: {tool} vs Human Writers",
        angles: ["ChatGPT", "Claude", "Jasper", "Copy.ai", "Writesonic"],
        examples: ["AI vs human content comparison"],
        infographicType: "comparison"
      },
      {
        template: "Content Calendar for {industry}: 365 Days of Ideas",
        angles: ["SaaS", "E-commerce", "Agency", "Healthcare", "Education", "Finance"],
        examples: ["Monthly theme suggestions"],
        infographicType: "checklist"
      }
    ]
  },
  "Email Marketing": {
    subcategories: ["Email Automation", "Newsletter Strategy", "Drip Campaigns", "Email Design", "Deliverability"],
    topics: [
      {
        template: "Email Automation Workflows: {workflow_type} That Converts",
        angles: ["Welcome Series", "Abandoned Cart", "Re-engagement", "Post-Purchase", "Lead Nurturing", "Onboarding"],
        examples: ["Workflow automation examples"],
        infographicType: "process"
      },
      {
        template: "Email Subject Lines: {number} Formulas That Get Opens",
        angles: ["50", "75", "100"],
        examples: ["A/B tested subject lines"],
        infographicType: "checklist"
      },
      {
        template: "Email Deliverability: How to Avoid the {issue}",
        angles: ["Spam Folder", "Promotions Tab", "Blacklists", "Bounce Rate Issues"],
        examples: ["Deliverability best practices"],
        infographicType: "checklist"
      },
      {
        template: "Segmentation Strategies: {strategy} for Higher Engagement",
        angles: ["Behavioral", "Demographic", "Psychographic", "RFM Analysis", "Lifecycle Stage"],
        examples: ["Segmentation case studies"],
        infographicType: "process"
      }
    ]
  },
  "E-commerce": {
    subcategories: ["Product Optimization", "Shopping Ads", "Marketplace Marketing", "Conversion Optimization", "Customer Retention"],
    topics: [
      {
        template: "How {brand} Increased E-commerce Sales by {percentage}",
        angles: ["250%", "300%", "400%", "500%"],
        examples: ["E-commerce success stories"],
        infographicType: "statistics"
      },
      {
        template: "Product Page Optimization: {element} That Drive Sales",
        angles: ["Product Descriptions", "Image Galleries", "Reviews Section", "Trust Badges", "Upsell Widgets"],
        examples: ["High-converting product pages"],
        infographicType: "comparison"
      },
      {
        template: "Reducing Cart Abandonment: {strategy} That Actually Works",
        angles: ["Exit Intent Popups", "One-Click Checkout", "Guest Checkout", "Progress Indicators", "Trust Signals"],
        examples: ["Cart recovery case studies"],
        infographicType: "statistics"
      },
      {
        template: "{platform} Selling Guide: From Setup to First 100 Sales",
        angles: ["Shopify", "WooCommerce", "Amazon", "Etsy", "eBay", "Magento"],
        examples: ["Platform-specific tutorials"],
        infographicType: "process"
      },
      {
        template: "E-commerce Personalization: {technique} for Better Customer Experience",
        angles: ["Product Recommendations", "Dynamic Pricing", "Personalized Emails", "Custom Landing Pages", "AI Chatbots"],
        examples: ["Personalization technology examples"],
        infographicType: "process"
      }
    ]
  },
  "AI Marketing": {
    subcategories: ["AI Content Creation", "Predictive Analytics", "Chatbots", "Marketing Automation", "AI-Powered Personalization"],
    topics: [
      {
        template: "AI Marketing Tools: {tool_category} That Save Hours Weekly",
        angles: ["Content Generation", "Image Creation", "Video Editing", "Social Scheduling", "Email Writing", "Analytics"],
        examples: ["Tool comparison reviews"],
        infographicType: "comparison"
      },
      {
        template: "Implementing AI in {marketing_area}: Practical Guide",
        angles: ["Customer Service", "Lead Scoring", "Ad Optimization", "Content Personalization", "Email Marketing"],
        examples: ["AI implementation case studies"],
        infographicType: "process"
      },
      {
        template: "The Future of AI in Marketing: {prediction} by 2027",
        angles: ["Predictions", "Trends", "Challenges", "Opportunities"],
        examples: ["Industry expert insights"],
        infographicType: "statistics"
      },
      {
        template: "AI Ethics in Marketing: Navigating {challenge}",
        angles: ["Data Privacy", "Bias in Algorithms", "Transparency", "Customer Trust", "Regulation Compliance"],
        examples: ["Ethical AI frameworks"],
        infographicType: "checklist"
      }
    ]
  },
  "Analytics": {
    subcategories: ["Google Analytics 4", "Data Visualization", "Attribution Modeling", "A/B Testing", "Customer Analytics"],
    topics: [
      {
        template: "Google Analytics 4: {feature} Setup Guide",
        angles: ["Event Tracking", "Custom Dimensions", "Audiences", "Explorations", "Looker Studio Integration"],
        examples: ["GA4 configuration examples"],
        infographicType: "process"
      },
      {
        template: "Marketing Attribution: Understanding {model} for Better ROI",
        angles: ["Last Click", "First Click", "Linear", "Time Decay", "Position Based", "Data-Driven"],
        examples: ["Attribution model comparisons"],
        infographicType: "comparison"
      },
      {
        template: "A/B Testing: How to Run {test_type} That Drive Decisions",
        angles: ["Landing Page", "Email Subject Line", "CTA Button", "Pricing", "Headline", "Image"],
        examples: ["A/B test case studies"],
        infographicType: "statistics"
      },
      {
        template: "Data Visualization: Creating {chart_type} That Tell Stories",
        angles: ["Dashboards", "Interactive Reports", "Executive Summaries", "Real-Time Monitors"],
        examples: ["Dashboard examples"],
        infographicType: "comparison"
      },
      {
        template: "Customer Analytics: Understanding {metric} for Growth",
        angles: ["Customer Lifetime Value", "Churn Rate", "Net Promoter Score", "Customer Acquisition Cost", "Retention Rate"],
        examples: ["Customer analytics formulas"],
        infographicType: "statistics"
      }
    ]
  }
};

// Phrases to avoid for uniqueness
const AVOID_PHRASES = [
  "In today's digital landscape",
  "In 2026 and beyond",
  "In the ever-evolving",
  "In this comprehensive guide",
  "Unlock the power of",
  "Master the art of",
  "Revolutionize your",
  "Game-changing",
  "Take your business to the next level",
  "Stay ahead of the curve"
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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

// Levenshtein distance for title similarity checking
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// Generate topic hash for duplicate prevention
function generateTopicHash(category: string, subcategory: string, angle: string): string {
  return `${category.toLowerCase().replace(/\s+/g, '_')}_${subcategory.toLowerCase().replace(/\s+/g, '_')}_${angle.toLowerCase().replace(/\s+/g, '_')}`;
}

// ============================================================================
// SMART TOPIC SELECTION
// ============================================================================

async function selectUniqueTopicAndCategory(
  supabase: any,
  recentPosts: any[]
): Promise<{ category: string; subcategory: string; topicTemplate: TopicTemplate; angle: string; topicHash: string }> {
  const categories = Object.keys(TOPIC_MATRIX);
  
  // Get category distribution from recent posts
  const categoryCount: Record<string, number> = {};
  categories.forEach(cat => categoryCount[cat] = 0);
  recentPosts.forEach(post => {
    if (categoryCount[post.category] !== undefined) {
      categoryCount[post.category]++;
    }
  });
  
  // Prioritize underrepresented categories
  const sortedCategories = categories.sort((a, b) => categoryCount[a] - categoryCount[b]);
  
  // Get used topic hashes from recent posts
  const usedHashes = new Set(recentPosts.map(p => p.topic_hash).filter(Boolean));
  
  // Try to find an unused topic
  for (const category of sortedCategories) {
    const categoryData = TOPIC_MATRIX[category];
    
    for (const topic of categoryData.topics) {
      for (const angle of topic.angles) {
        const subcategory = categoryData.subcategories[Math.floor(Math.random() * categoryData.subcategories.length)];
        const topicHash = generateTopicHash(category, subcategory, angle);
        
        if (!usedHashes.has(topicHash)) {
          return { category, subcategory, topicTemplate: topic, angle, topicHash };
        }
      }
    }
  }
  
  // Fallback: pick random if all used (shouldn't happen with 200+ topics)
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryData = TOPIC_MATRIX[randomCategory];
  const randomTopic = categoryData.topics[Math.floor(Math.random() * categoryData.topics.length)];
  const randomAngle = randomTopic.angles[Math.floor(Math.random() * randomTopic.angles.length)];
  const subcategory = categoryData.subcategories[Math.floor(Math.random() * categoryData.subcategories.length)];
  const topicHash = generateTopicHash(randomCategory, subcategory, randomAngle) + "_" + Date.now();
  
  return { category: randomCategory, subcategory, topicTemplate: randomTopic, angle: randomAngle, topicHash };
}

// ============================================================================
// IMAGE GENERATION - Using Lovable AI Gateway
// ============================================================================

async function generateBlogImage(
  topic: string, 
  category: string, 
  title: string, 
  lovableApiKey: string
): Promise<string | null> {
  try {
    const visualStyles = [
      "modern minimalist with bold geometric shapes",
      "isometric 3D illustration style",
      "abstract data visualization aesthetic",
      "professional corporate gradient design",
      "dynamic flowing lines and nodes",
      "clean infographic-inspired layout",
      "tech-forward with circuit patterns",
      "organic shapes with digital accents"
    ];
    
    const colorSchemes = [
      "deep navy blue to cyan gradient",
      "rich purple to magenta gradient",
      "forest green to emerald gradient",
      "sunset orange to golden yellow",
      "royal blue to violet gradient",
      "teal to aquamarine gradient"
    ];
    
    const randomStyle = visualStyles[Math.floor(Math.random() * visualStyles.length)];
    const randomColors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    const uniqueSeed = Date.now() + Math.random().toString(36).substring(2, 8);

    const imagePrompt = `Create a unique, professional blog header image for a digital marketing article.

TOPIC: "${title}"
CATEGORY: ${category}
VISUAL STYLE: ${randomStyle}
COLOR SCHEME: ${randomColors}

REQUIREMENTS:
- 16:9 aspect ratio, landscape orientation
- Ultra high resolution, crisp and professional
- NO text, NO words, NO letters, NO numbers
- Abstract visual representation of ${category} concepts
- Modern, clean aesthetic suitable for business blog
- Unique composition seed: ${uniqueSeed}
- Should evoke themes of: growth, success, data, digital transformation`;

    console.log("Generating image with Lovable AI for:", title);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: imagePrompt }],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI image API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (imageUrl) {
      console.log("Successfully generated image for:", title);
      return imageUrl;
    }

    console.log("No image in Lovable AI response");
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

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
    const fileName = `blog-images/${slug}.${extension}`;

    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b: any) => b.name === "blog-images");
    
    if (!bucketExists) {
      await supabase.storage.createBucket("blog-images", {
        public: true,
        fileSizeLimit: 5242880,
      });
    }

    const { error } = await supabase.storage
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

    console.log("Image uploaded:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadImageToStorage:", error);
    return null;
  }
}

// ============================================================================
// MAIN SERVER
// ============================================================================

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

    // Get request body
    const body = await req.json().catch(() => ({}));
    const articlesToGenerate = body.count || 1;

    // Fetch recent posts for duplicate prevention (last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    const { data: recentPosts } = await supabase
      .from("blog_posts")
      .select("title, category, topic_hash")
      .gte("created_at", ninetyDaysAgo.toISOString())
      .order("created_at", { ascending: false });

    const existingTitles = (recentPosts || []).map(p => p.title.toLowerCase());
    const generatedArticles = [];

    for (let i = 0; i < articlesToGenerate; i++) {
      try {
        // Select unique topic
        const { category, subcategory, topicTemplate, angle, topicHash } = 
          await selectUniqueTopicAndCategory(supabase, recentPosts || []);

        // Build the specific topic from template
        const specificTopic = topicTemplate.template.replace(/\{[^}]+\}/g, angle);

        // Enhanced system prompt for unique, high-quality content
        const systemPrompt = `You are an expert SEO content writer for Digital Bull Technology, a leading digital marketing agency. Create exceptional, 100% unique blog content.

CRITICAL REQUIREMENTS:
- Write 1200-1800 words of ORIGINAL content
- NEVER use these phrases: ${AVOID_PHRASES.join(", ")}
- Start with a compelling hook using a specific statistic, question, or bold statement
- Include 2-3 REAL brand examples or case studies
- Create structured data points for infographics
- End with actionable takeaways readers can implement TODAY
- Write for ${category} professionals and business decision-makers

CONTENT STRUCTURE:
1. Hook (surprising stat or provocative question)
2. Problem/Opportunity Statement
3. Main Content (with H2/H3 subheadings)
4. Real-World Examples (name actual brands when possible)
5. Infographic Data Section (structured for visualization)
6. Key Takeaways (numbered list)
7. Call-to-Action

INFOGRAPHIC DATA FORMAT (include this JSON block in your content):
<!-- INFOGRAPHIC_DATA
{
  "type": "${topicTemplate.infographicType}",
  "title": "Visual summary title",
  "dataPoints": [
    {"label": "Point 1", "value": "metric/stat", "description": "brief explanation"},
    ...
  ]
}
-->

Your response MUST be valid JSON:
{
  "title": "Compelling, unique title (max 60 chars) - avoid generic phrases",
  "metaDescription": "SEO meta description (150-160 chars) with primary keyword",
  "excerpt": "2-3 sentence preview that hooks readers",
  "category": "${category}",
  "subcategory": "${subcategory}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "content": "Full markdown content with ## for H2, ### for H3, **bold**, - bullets, and infographic data block"
}`;

        const userPrompt = `Write a comprehensive, SEO-optimized blog article about: "${specificTopic}"

FOCUS AREA: ${subcategory}
ANGLE: ${angle}
INFOGRAPHIC TYPE: ${topicTemplate.infographicType}

Include specific examples from companies like: ${topicTemplate.examples.join(", ")}

Make this article STAND OUT by:
1. Opening with a specific, verifiable statistic (cite source)
2. Including at least 2 real brand examples with specific results
3. Providing a structured infographic data section
4. Ending with 5+ actionable implementation steps
5. Using unexpected angles and insights that aren't commonly covered

Remember: Provide ONLY valid JSON in your response. No markdown code blocks.`;

        console.log(`Generating article ${i + 1}: ${specificTopic} (${category}/${subcategory})`);

        // Generate content using Lovable AI
        const contentResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
            temperature: 0.9,
            max_tokens: 8192,
          }),
        });

        if (!contentResponse.ok) {
          const errorText = await contentResponse.text();
          console.error(`AI content error for article ${i + 1}:`, contentResponse.status, errorText);
          continue;
        }

        const contentData = await contentResponse.json();
        const aiContent = contentData.choices?.[0]?.message?.content;

        if (!aiContent) {
          console.error(`No content for article ${i + 1}`);
          continue;
        }

        // Parse JSON response
        let articleData;
        try {
          let jsonStr = aiContent.trim();
          
          // Handle markdown code blocks
          if (jsonStr.includes("```json")) {
            jsonStr = jsonStr.split("```json")[1].split("```")[0].trim();
          } else if (jsonStr.includes("```")) {
            jsonStr = jsonStr.split("```")[1].split("```")[0].trim();
          }
          
          // Clean up JSON
          jsonStr = jsonStr
            .replace(/[\x00-\x1F\x7F]/g, ' ')
            .replace(/\n\s*\n/g, '\n')
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
          
          articleData = JSON.parse(jsonStr);
        } catch (parseError) {
          console.error(`JSON parse error for article ${i + 1}:`, parseError);
          console.error(`Raw content preview:`, aiContent.substring(0, 500));
          continue;
        }

        // Check title similarity
        const newTitleLower = articleData.title.toLowerCase();
        const isTooSimilar = existingTitles.some(
          existing => levenshteinDistance(newTitleLower, existing) < 15
        );

        if (isTooSimilar) {
          console.log(`Title too similar, regenerating: ${articleData.title}`);
          // Add a unique suffix
          articleData.title = `${articleData.title}: ${angle} Strategies`;
        }

        // Generate slug
        const today = new Date().toISOString().split('T')[0];
        const baseSlug = generateSlug(articleData.title);
        const slug = `${baseSlug}-${today}`;

        // Calculate read time
        const readTime = calculateReadTime(articleData.content);

        // Generate and upload image
        let imageUrl = null;
        const base64Image = await generateBlogImage(specificTopic, category, articleData.title, LOVABLE_API_KEY);
        if (base64Image) {
          imageUrl = await uploadImageToStorage(supabase, base64Image, slug);
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
            category: articleData.category || category,
            tags: articleData.tags || [],
            read_time: readTime,
            author: "DiBull AI Team",
            image_url: imageUrl,
            is_published: true,
            published_at: new Date().toISOString(),
            topic_hash: topicHash,
          })
          .select()
          .single();

        if (insertError) {
          console.error(`Insert error for article ${i + 1}:`, insertError);
          continue;
        }

        console.log(`✓ Generated: ${articleData.title}`);
        existingTitles.push(newTitleLower); // Track for this batch
        generatedArticles.push(insertedPost);

      } catch (articleError) {
        console.error(`Error generating article ${i + 1}:`, articleError);
        continue;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated ${generatedArticles.length}/${articlesToGenerate} articles`,
        articles: generatedArticles.map(a => ({ title: a.title, slug: a.slug, category: a.category })),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
