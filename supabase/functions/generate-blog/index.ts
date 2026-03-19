import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================================
// COMPREHENSIVE TOPIC MATRIX — ALL 20 SERVICE CATEGORIES & SUBCATEGORIES
// ============================================================================

interface TopicTemplate {
  template: string;
  angles: string[];
  infographicType: string;
}

interface SubcategoryTopics {
  subcategoryId: string;
  subcategoryTitle: string;
  topics: TopicTemplate[];
}

interface CategoryTopics {
  categoryTitle: string;       // used as blog_posts.category
  subcategories: SubcategoryTopics[];
}

const TOPIC_MATRIX: Record<string, CategoryTopics> = {
  // ── 1. SEO ────────────────────────────────────────────────
  "SEO": {
    categoryTitle: "SEO",
    subcategories: [
      { subcategoryId: "on-page-seo", subcategoryTitle: "On-Page SEO", topics: [
        { template: "How to Optimise {angle} for Higher Rankings in 2026", angles: ["Title Tags & Meta Descriptions", "Internal Linking Architecture", "Content Optimisation", "Image Alt Text & SEO", "Header Tag Hierarchy"], infographicType: "process" },
        { template: "{angle}: The On-Page SEO Factor Most Brands Ignore", angles: ["Keyword Cannibalisation", "Thin Content Consolidation", "Schema FAQ Markup", "Content Freshness Signals", "Semantic HTML Structure"], infographicType: "checklist" },
      ]},
      { subcategoryId: "technical-seo", subcategoryTitle: "Technical SEO", topics: [
        { template: "Technical SEO Audit: Fixing {angle} for Faster Indexing", angles: ["Core Web Vitals", "Crawl Budget Waste", "JavaScript Rendering Issues", "XML Sitemap Errors", "Orphan Pages"], infographicType: "process" },
        { template: "{angle} Implementation: A Developer's SEO Guide", angles: ["Hreflang Tags", "Canonical Tags", "Structured Data", "Lazy Loading SEO", "Server-Side Rendering"], infographicType: "comparison" },
      ]},
      { subcategoryId: "off-page-seo", subcategoryTitle: "Off-Page SEO", topics: [
        { template: "Link Building in 2026: {angle} That Actually Work", angles: ["Digital PR Campaigns", "Broken Link Reclamation", "HARO & Journalist Outreach", "Guest Posting at Scale", "Niche Edit Strategies"], infographicType: "statistics" },
        { template: "Off-Page SEO Beyond Backlinks: {angle}", angles: ["Brand Mentions & Co-Citations", "Social Signals Impact", "Podcast Guest Appearances", "Forum Authority Building", "Influencer Link Partnerships"], infographicType: "comparison" },
      ]},
      { subcategoryId: "local-seo", subcategoryTitle: "Local SEO", topics: [
        { template: "Local SEO for {angle}: From Zero to Google Map Pack", angles: ["Restaurants", "Dental Clinics", "Law Firms", "Plumbers", "Gyms & Fitness Studios", "Real Estate Agents"], infographicType: "checklist" },
        { template: "{angle}: The Local SEO Secret Weapon", angles: ["Google Business Profile Posts", "Local Citation Consistency", "Review Generation Strategies", "Hyperlocal Content Marketing", "NAP Audit & Cleanup"], infographicType: "process" },
      ]},
      { subcategoryId: "enterprise-ecommerce-seo", subcategoryTitle: "Enterprise & E-commerce SEO", topics: [
        { template: "Enterprise SEO: Scaling {angle} Across 10,000+ Pages", angles: ["Automated Meta Tags", "Faceted Navigation SEO", "International Hreflang", "Log File Analysis", "Programmatic SEO"], infographicType: "statistics" },
        { template: "E-commerce SEO: {angle} That Drive Product Sales", angles: ["Category Page Optimisation", "Product Schema Markup", "Long-Tail Keyword Mapping", "User Review SEO", "Image Search Optimisation"], infographicType: "process" },
      ]},
    ]
  },

  // ── 2. PPC Advertising ────────────────────────────────────
  "PPC Advertising": {
    categoryTitle: "PPC Advertising",
    subcategories: [
      { subcategoryId: "search-advertising", subcategoryTitle: "Search Advertising", topics: [
        { template: "Google Ads {angle}: Advanced Strategies for 2026", angles: ["Quality Score Optimisation", "Responsive Search Ads", "Broad Match + Smart Bidding", "Negative Keyword Mining", "Ad Extensions Mastery"], infographicType: "process" },
      ]},
      { subcategoryId: "display-advertising", subcategoryTitle: "Display Advertising", topics: [
        { template: "Display Network {angle}: Targeting Strategies That Convert", angles: ["Custom Intent Audiences", "Managed Placements", "Responsive Display Ads", "In-Market Segments", "Affinity Audience Layering"], infographicType: "comparison" },
      ]},
      { subcategoryId: "remarketing-retargeting", subcategoryTitle: "Remarketing & Retargeting", topics: [
        { template: "Remarketing {angle}: Turn Bounced Visitors into Buyers", angles: ["Dynamic Product Remarketing", "RLSA Campaigns", "Sequential Messaging", "Cross-Platform Retargeting", "Frequency Capping Strategies"], infographicType: "statistics" },
      ]},
      { subcategoryId: "shopping-ecommerce-ads", subcategoryTitle: "Shopping & E-commerce Ads", topics: [
        { template: "Google Shopping {angle}: Maximise ROAS in 2026", angles: ["Product Feed Optimisation", "Performance Max Campaigns", "Custom Labels Strategy", "Merchant Center Diagnostics", "Competitive Pricing Intelligence"], infographicType: "process" },
      ]},
      { subcategoryId: "mobile-app-advertising", subcategoryTitle: "Mobile & App Advertising", topics: [
        { template: "Mobile PPC {angle}: Capturing the On-the-Go Consumer", angles: ["App Install Campaigns", "Mobile-First Ad Copy", "Call-Only Ads Mastery", "Location-Based Bidding", "In-App Advertising ROI"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 3. Web Design ─────────────────────────────────────────
  "Web Design": {
    categoryTitle: "Web Design",
    subcategories: [
      { subcategoryId: "website-design", subcategoryTitle: "Website Design", topics: [
        { template: "Website Design Trends 2026: {angle} That Convert", angles: ["Bento Grid Layouts", "Glassmorphism 2.0", "Dark Mode Design Systems", "Micro-Interaction Patterns", "Asymmetric Hero Layouts"], infographicType: "comparison" },
      ]},
      { subcategoryId: "website-development", subcategoryTitle: "Website Development", topics: [
        { template: "Web Development {angle}: Building for Performance & Scale", angles: ["Headless CMS Architecture", "React vs Next.js for Business", "Progressive Web Apps", "API-First Design", "Edge Computing Benefits"], infographicType: "process" },
      ]},
      { subcategoryId: "website-redesign", subcategoryTitle: "Website Redesign", topics: [
        { template: "Website Redesign {angle}: When & How to Rebuild", angles: ["UX Audit Before Redesign", "Content Migration Strategy", "SEO-Safe URL Redirects", "Performance Benchmarking", "Stakeholder Buy-In Framework"], infographicType: "checklist" },
      ]},
      { subcategoryId: "landing-page-development", subcategoryTitle: "Landing Page Development", topics: [
        { template: "Landing Pages That Convert at 10%+: {angle}", angles: ["Above-the-Fold Psychology", "Form Length Optimisation", "Social Proof Placement", "Video Landing Pages", "Multi-Step Funnels"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 4. Social Media ───────────────────────────────────────
  "Social Media": {
    categoryTitle: "Social Media",
    subcategories: [
      { subcategoryId: "organic-social-media", subcategoryTitle: "Organic Social Media", topics: [
        { template: "Organic Social Media {angle}: Building Real Engagement", angles: ["Community-Led Growth", "UGC Content Strategy", "Carousel Post Frameworks", "LinkedIn Thought Leadership", "Platform-Native Content"], infographicType: "process" },
      ]},
      { subcategoryId: "social-media-paid", subcategoryTitle: "Social Media Paid Advertising", topics: [
        { template: "{angle} Advertising: Complete Campaign Guide for 2026", angles: ["Meta Advantage+ Campaigns", "LinkedIn Sponsored Content", "TikTok Spark Ads", "X/Twitter Ads Revival", "Pinterest Shopping Ads"], infographicType: "comparison" },
      ]},
      { subcategoryId: "social-media-analytics", subcategoryTitle: "Social Media Analytics", topics: [
        { template: "Social Media Analytics: Measuring {angle} That Matter", angles: ["Engagement Rate Benchmarks", "Audience Growth Metrics", "Content Performance Attribution", "Share of Voice Tracking", "Sentiment Analysis Tools"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 5. Content Marketing ──────────────────────────────────
  "Content Marketing": {
    categoryTitle: "Content Marketing",
    subcategories: [
      { subcategoryId: "content-strategy", subcategoryTitle: "Content Strategy", topics: [
        { template: "Content Strategy {angle}: Building a Scalable Content Engine", angles: ["Topic Cluster Model", "Content Pillar Framework", "Funnel-Based Mapping", "Content Gap Analysis", "Editorial Calendar Design"], infographicType: "process" },
      ]},
      { subcategoryId: "content-creation", subcategoryTitle: "Content Creation", topics: [
        { template: "Content Creation {angle}: From Idea to High-Ranking Article", angles: ["Long-Form vs Short-Form", "Data-Driven Storytelling", "Expert Interview Formats", "Comparison & Listicle Hybrids", "Evergreen Content Updates"], infographicType: "comparison" },
      ]},
      { subcategoryId: "website-copywriting", subcategoryTitle: "Website Copywriting", topics: [
        { template: "Website Copywriting {angle}: Words That Sell", angles: ["Homepage Messaging Framework", "Service Page Copy Formula", "CTA Copy Testing Results", "Brand Voice Guidelines", "Benefits vs Features Copy"], infographicType: "checklist" },
      ]},
      { subcategoryId: "visual-interactive-content", subcategoryTitle: "Visual & Interactive Content", topics: [
        { template: "Visual Content {angle}: Engage Audiences Beyond Text", angles: ["Infographic Design Principles", "Interactive Calculators", "Data Visualisation Best Practices", "Interactive Quizzes for Lead Gen", "Motion Graphics in Content"], infographicType: "comparison" },
      ]},
    ]
  },

  // ── 6. Email Marketing ────────────────────────────────────
  "Email Marketing": {
    categoryTitle: "Email Marketing",
    subcategories: [
      { subcategoryId: "campaign-strategy", subcategoryTitle: "Campaign Strategy", topics: [
        { template: "Email Campaign {angle}: Strategy That Drives Revenue", angles: ["Audience Segmentation Models", "Campaign Calendar Planning", "Re-Engagement Campaigns", "Seasonal Email Strategy", "B2B vs B2C Email Approaches"], infographicType: "process" },
      ]},
      { subcategoryId: "email-automation", subcategoryTitle: "Email Automation", topics: [
        { template: "Email Automation {angle}: Set It & Scale It", angles: ["Welcome Series That Convert", "Abandoned Cart Recovery", "Post-Purchase Nurturing", "Lead Scoring Workflows", "Birthday & Anniversary Triggers"], infographicType: "process" },
      ]},
      { subcategoryId: "email-design-copy", subcategoryTitle: "Email Design & Copy", topics: [
        { template: "Email Design {angle}: Templates That Get Clicks", angles: ["Mobile-First Email Design", "Dark Mode Email Compatibility", "AMP Email Interactivity", "Minimalist vs Rich Layouts", "Accessibility in Email Design"], infographicType: "comparison" },
      ]},
      { subcategoryId: "email-analytics", subcategoryTitle: "Email Analytics", topics: [
        { template: "Email Analytics {angle}: Beyond Open Rates", angles: ["Click Heatmap Analysis", "Revenue Per Email Tracking", "Deliverability Monitoring", "List Health Metrics", "A/B Test Statistical Significance"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 7. CRO ────────────────────────────────────────────────
  "CRO": {
    categoryTitle: "CRO",
    subcategories: [
      { subcategoryId: "user-behaviour-analysis", subcategoryTitle: "User Behaviour Analysis", topics: [
        { template: "User Behaviour {angle}: Insights That Drive Conversions", angles: ["Heatmap Interpretation", "Session Recording Analysis", "Funnel Drop-Off Diagnosis", "Scroll Depth Insights", "Rage Click Detection"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ab-multivariate-testing", subcategoryTitle: "A/B & Multivariate Testing", topics: [
        { template: "A/B Testing {angle}: Experiments That Move the Needle", angles: ["Headline Testing Frameworks", "CTA Color & Placement Tests", "Pricing Page Experiments", "Form Field Reduction Tests", "Navigation Layout Tests"], infographicType: "comparison" },
      ]},
      { subcategoryId: "ux-optimisation", subcategoryTitle: "UX Optimisation", topics: [
        { template: "UX Optimisation {angle}: Small Changes, Big Revenue Impact", angles: ["Checkout Flow Simplification", "Mobile Navigation Redesign", "Trust Signal Placement", "Page Speed & Conversion Link", "Micro-Copy Improvements"], infographicType: "process" },
      ]},
    ]
  },

  // ── 8. E-commerce Marketing ───────────────────────────────
  "E-commerce": {
    categoryTitle: "E-commerce",
    subcategories: [
      { subcategoryId: "ecommerce-seo", subcategoryTitle: "E-commerce SEO", topics: [
        { template: "E-commerce SEO {angle}: Rank Your Products Higher", angles: ["Product Page Optimisation", "Category Taxonomy SEO", "Faceted Navigation Solutions", "Product Review Schema", "Seasonal SEO Strategies"], infographicType: "process" },
      ]},
      { subcategoryId: "ecommerce-ppc", subcategoryTitle: "E-commerce PPC", topics: [
        { template: "E-commerce PPC {angle}: Maximise Return on Ad Spend", angles: ["Performance Max for E-commerce", "Dynamic Search Ads", "Product Feed Automation", "Competitor Bidding Strategy", "Audience Signal Layering"], infographicType: "statistics" },
      ]},
      { subcategoryId: "marketplace-marketing", subcategoryTitle: "Marketplace Marketing", topics: [
        { template: "Marketplace Marketing {angle}: Selling on Multiple Platforms", angles: ["Multi-Channel Inventory Management", "Platform-Specific Listing Optimisation", "Marketplace Advertising Strategies", "Fulfilment & Shipping Optimisation", "Brand Registry Benefits"], infographicType: "comparison" },
      ]},
      { subcategoryId: "ecommerce-conversion", subcategoryTitle: "E-commerce Conversion Optimisation", topics: [
        { template: "E-commerce Conversion {angle}: Turn Browsers into Buyers", angles: ["Cart Abandonment Psychology", "One-Click Checkout Benefits", "Product Recommendation Engines", "Urgency & Scarcity Tactics", "Post-Purchase Upsell Funnels"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 9. Amazon Marketing ───────────────────────────────────
  "Amazon Marketing": {
    categoryTitle: "Amazon Marketing",
    subcategories: [
      { subcategoryId: "amazon-seo", subcategoryTitle: "Amazon SEO", topics: [
        { template: "Amazon SEO {angle}: Rank Higher on the Marketplace", angles: ["A9 Algorithm Factors", "Backend Search Terms Optimisation", "Product Title Formula", "Bullet Point Optimisation", "A+ Content Impact on Rankings"], infographicType: "process" },
      ]},
      { subcategoryId: "amazon-ppc", subcategoryTitle: "Amazon PPC", topics: [
        { template: "Amazon PPC {angle}: Advanced Campaign Strategies", angles: ["Sponsored Products Optimisation", "Sponsored Brands Video", "Defensive ASIN Targeting", "Dayparting & Budget Pacing", "ACOS vs TACOS Strategies"], infographicType: "statistics" },
      ]},
      { subcategoryId: "amazon-storefront", subcategoryTitle: "Amazon Storefront Optimisation", topics: [
        { template: "Amazon Storefront {angle}: Build a Brand Destination", angles: ["Storefront Design Best Practices", "Shoppable Image Modules", "Brand Story Integration", "Traffic Attribution Methods", "Seasonal Storefront Updates"], infographicType: "comparison" },
      ]},
    ]
  },

  // ── 10. Video Marketing ───────────────────────────────────
  "Video Marketing": {
    categoryTitle: "Video Marketing",
    subcategories: [
      { subcategoryId: "video-strategy", subcategoryTitle: "Video Strategy", topics: [
        { template: "Video Marketing Strategy {angle}: Plan for Maximum Impact", angles: ["Funnel-Based Video Planning", "Platform-Specific Video Formats", "Video Content Calendar Design", "Budget Allocation for Video", "Video KPI Framework"], infographicType: "process" },
      ]},
      { subcategoryId: "video-production", subcategoryTitle: "Video Production", topics: [
        { template: "Video Production {angle}: Create Professional Content on Budget", angles: ["Smartphone Video Production Tips", "Explainer Video Scripting", "Product Demo Videos", "Testimonial Video Best Practices", "Behind-the-Scenes Content"], infographicType: "checklist" },
      ]},
      { subcategoryId: "video-distribution", subcategoryTitle: "Video Distribution", topics: [
        { template: "Video Distribution {angle}: Get Maximum Views & Engagement", angles: ["YouTube SEO & Algorithm", "Short-Form Video Strategy", "Video Email Marketing", "LinkedIn Video Best Practices", "Cross-Platform Video Repurposing"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 11. Programmatic Advertising ──────────────────────────
  "Programmatic Advertising": {
    categoryTitle: "Programmatic Advertising",
    subcategories: [
      { subcategoryId: "programmatic-advertising", subcategoryTitle: "Programmatic Advertising", topics: [
        { template: "Programmatic Advertising {angle}: Automated Media Buying Guide", angles: ["DSP Selection & Setup", "Contextual Targeting Strategies", "Connected TV Advertising", "Programmatic Audio Ads", "First-Party Data Activation"], infographicType: "comparison" },
      ]},
      { subcategoryId: "performance-media-planning", subcategoryTitle: "Performance Media Planning", topics: [
        { template: "Performance Media {angle}: Data-Driven Budget Allocation", angles: ["Cross-Channel Attribution", "Media Mix Modelling", "Incrementality Testing", "Frequency Optimisation", "Seasonal Budget Shifts"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 12. Analytics & AI ────────────────────────────────────
  "Analytics & AI": {
    categoryTitle: "Analytics & AI",
    subcategories: [
      { subcategoryId: "marketing-analytics", subcategoryTitle: "Marketing Analytics", topics: [
        { template: "Marketing Analytics {angle}: Dashboards That Drive Decisions", angles: ["GA4 Custom Reports", "Multi-Touch Attribution", "Marketing Mix Modelling", "Real-Time Performance Monitoring", "Executive Dashboard Design"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ai-automation", subcategoryTitle: "AI & Automation", topics: [
        { template: "AI in Marketing {angle}: Practical Applications for 2026", angles: ["Predictive Lead Scoring", "AI Content Optimisation", "Automated Campaign Management", "Chatbot ROI Measurement", "AI-Powered A/B Testing"], infographicType: "process" },
      ]},
      { subcategoryId: "crm-integrations", subcategoryTitle: "CRM & Tool Integrations", topics: [
        { template: "CRM Integration {angle}: Connecting Your Marketing Stack", angles: ["HubSpot vs Salesforce for SMBs", "Marketing Automation Workflows", "Data Warehouse Integration", "CDP Implementation Guide", "API-First Integration Strategy"], infographicType: "comparison" },
      ]},
    ]
  },

  // ── 13. Custom Development ────────────────────────────────
  "Custom Development": {
    categoryTitle: "Custom Development",
    subcategories: [
      { subcategoryId: "custom-software-development", subcategoryTitle: "Custom Software Development", topics: [
        { template: "Custom Development {angle}: Building Tools That Scale", angles: ["Custom Marketing Dashboard Development", "Internal Tool Automation", "Data Pipeline Architecture", "Real-Time Analytics Platforms", "Custom Reporting Solutions"], infographicType: "process" },
      ]},
      { subcategoryId: "api-system-integrations", subcategoryTitle: "API & System Integrations", topics: [
        { template: "API Integration {angle}: Connecting Business Systems", angles: ["REST vs GraphQL for Marketing", "Webhook Architecture Patterns", "Data Sync Strategies", "Third-Party API Security", "Integration Testing Best Practices"], infographicType: "comparison" },
      ]},
    ]
  },

  // ── 14. AI Marketing ──────────────────────────────────────
  "AI Marketing": {
    categoryTitle: "AI Marketing",
    subcategories: [
      { subcategoryId: "ai-strategy-consulting", subcategoryTitle: "AI Marketing Strategy", topics: [
        { template: "AI Marketing Strategy {angle}: Building Your AI Roadmap", angles: ["AI Readiness Assessment", "AI Adoption Framework", "Change Management for AI", "AI ROI Measurement", "AI Ethics in Marketing"], infographicType: "process" },
      ]},
      { subcategoryId: "ai-seo-search", subcategoryTitle: "AI SEO & Search Intelligence", topics: [
        { template: "AI SEO {angle}: Next-Generation Search Optimisation", angles: ["AI-Powered Keyword Discovery", "Search Intent Prediction", "Content Gap Detection with AI", "Predictive Ranking Models", "AI-Generated Schema Markup"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ai-content-creation", subcategoryTitle: "AI Content Creation", topics: [
        { template: "AI Content {angle}: Scaling Quality Content Production", angles: ["AI Blog Generation Workflows", "AI Copy Optimisation for CTR", "Content Personalisation at Scale", "AI Image Generation for Marketing", "Automated Content Refresh"], infographicType: "process" },
      ]},
      { subcategoryId: "ai-advertising-campaign", subcategoryTitle: "AI Advertising & Campaigns", topics: [
        { template: "AI Advertising {angle}: Smarter Campaign Optimisation", angles: ["AI Bid Management Strategies", "Automated Audience Segmentation", "Predictive Ad Performance", "AI Creative Testing", "Smart Remarketing with ML"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ai-personalisation", subcategoryTitle: "AI Personalisation", topics: [
        { template: "AI Personalisation {angle}: Tailored Experiences at Scale", angles: ["Dynamic Website Personalisation", "Product Recommendation Engines", "Behaviour-Based User Journeys", "Personalised Landing Pages", "Email Content Personalisation"], infographicType: "comparison" },
      ]},
      { subcategoryId: "ai-analytics-insights", subcategoryTitle: "AI Analytics & Predictive Insights", topics: [
        { template: "AI Analytics {angle}: Predictive Intelligence for Marketers", angles: ["Revenue Forecasting Models", "Customer Lifetime Value Prediction", "Churn Prediction Strategies", "Anomaly Detection in Campaigns", "Automated Performance Insights"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ai-chatbots", subcategoryTitle: "AI Chatbots & Conversational Marketing", topics: [
        { template: "AI Chatbots {angle}: Conversational Marketing That Converts", angles: ["Lead Qualification Chatbots", "Customer Support Automation", "Conversational Commerce", "Multilingual Chatbot Design", "Chatbot Analytics & Optimisation"], infographicType: "process" },
      ]},
      { subcategoryId: "marketing-automation-ai", subcategoryTitle: "AI Marketing Automation", topics: [
        { template: "AI Automation {angle}: Intelligent Marketing Workflows", angles: ["Smart Lead Scoring Models", "Cross-Channel Campaign Automation", "Trigger-Based Marketing Systems", "AI Email Send-Time Optimisation", "Dynamic Workflow Branching"], infographicType: "process" },
      ]},
      { subcategoryId: "ai-crm-integrations", subcategoryTitle: "AI CRM Integrations", topics: [
        { template: "AI CRM {angle}: Enhancing Customer Data Intelligence", angles: ["AI Data Enrichment", "Predictive Customer Scoring", "Automated CRM Updates", "Intent Signal Processing", "AI-Powered Sales Insights"], infographicType: "comparison" },
      ]},
      { subcategoryId: "generative-ai", subcategoryTitle: "Generative AI & Advanced Tech", topics: [
        { template: "Generative AI {angle}: The Future of Marketing Creation", angles: ["LLM Integration for Marketing", "AI Video Scripting", "Voice Search Optimisation with AI", "Custom AI Marketing Tools", "Prompt Engineering for Marketers"], infographicType: "comparison" },
      ]},
    ]
  },

  // ── 15. Training Programs ─────────────────────────────────
  "Training Programs": {
    categoryTitle: "Training Programs",
    subcategories: [
      { subcategoryId: "digital-marketing-training", subcategoryTitle: "Digital Marketing Training", topics: [
        { template: "Digital Marketing Training {angle}: Skills That Get You Hired", angles: ["SEO Certification Path", "PPC Campaign Management Skills", "Social Media Management Training", "Content Marketing Fundamentals", "Analytics & Data Skills"], infographicType: "checklist" },
      ]},
      { subcategoryId: "ai-automation-training", subcategoryTitle: "AI & Automation Training", topics: [
        { template: "AI Marketing Training {angle}: Future-Proof Your Career", angles: ["Prompt Engineering for Marketers", "AI Tools for SEO", "Marketing Automation Mastery", "Generative AI for Content", "AI Campaign Optimisation Skills"], infographicType: "process" },
      ]},
      { subcategoryId: "web-design-training", subcategoryTitle: "Web Design Training", topics: [
        { template: "Web Design Training {angle}: Build Professional Websites", angles: ["UI/UX Design Fundamentals", "HTML CSS JavaScript Basics", "WordPress Development Training", "Responsive Design Mastery", "Frontend Framework Skills"], infographicType: "checklist" },
      ]},
      { subcategoryId: "internship-programs", subcategoryTitle: "Internship Programs", topics: [
        { template: "Digital Marketing Internship {angle}: Launch Your Career", angles: ["What to Expect in a Marketing Internship", "Building Your Portfolio", "From Intern to Full-Time", "Remote Internship Tips", "Industry Mentorship Benefits"], infographicType: "process" },
      ]},
    ]
  },

  // ── 16. SaaS Products ─────────────────────────────────────
  "SaaS Products": {
    categoryTitle: "SaaS Products",
    subcategories: [
      { subcategoryId: "seo-saas", subcategoryTitle: "SEO & Content SaaS", topics: [
        { template: "SEO SaaS {angle}: Tools That Transform Your Rankings", angles: ["All-in-One SEO Platforms", "AI Content Optimisation Tools", "Rank Tracking Software Comparison", "Technical SEO Audit Tools", "Content Planning Platforms"], infographicType: "comparison" },
      ]},
      { subcategoryId: "social-saas", subcategoryTitle: "Social Media SaaS", topics: [
        { template: "Social Media SaaS {angle}: Manage & Scale Your Presence", angles: ["Social Scheduling Tools Comparison", "Social Listening Platforms", "Influencer Management Software", "UGC Curation Tools", "Social Commerce Platforms"], infographicType: "comparison" },
      ]},
      { subcategoryId: "email-saas", subcategoryTitle: "Email & Automation SaaS", topics: [
        { template: "Email Marketing SaaS {angle}: Automate Your Revenue", angles: ["Email Platform Comparison 2026", "Marketing Automation ROI", "Transactional Email Solutions", "Email Deliverability Tools", "SMS Marketing Platforms"], infographicType: "comparison" },
      ]},
      { subcategoryId: "crm-saas", subcategoryTitle: "CRM SaaS", topics: [
        { template: "CRM SaaS {angle}: Customer Management That Scales", angles: ["CRM for Small Business Guide", "AI-Powered CRM Features", "Sales Pipeline Management", "CRM Migration Best Practices", "CRM ROI Calculator"], infographicType: "comparison" },
      ]},
      { subcategoryId: "analytics-saas", subcategoryTitle: "Analytics & Reporting SaaS", topics: [
        { template: "Analytics SaaS {angle}: Data-Driven Marketing Decisions", angles: ["Marketing Dashboard Tools", "Attribution Modelling Software", "Real-Time Analytics Platforms", "Custom KPI Dashboards", "AI-Driven Reporting Tools"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ecommerce-saas", subcategoryTitle: "E-commerce SaaS", topics: [
        { template: "E-commerce SaaS {angle}: Tools to Grow Online Sales", angles: ["Product Feed Management", "Cart Abandonment Solutions", "Amazon Seller Tools", "CRO Testing Platforms", "Inventory Management Software"], infographicType: "comparison" },
      ]},
      { subcategoryId: "website-conversion-saas", subcategoryTitle: "Website & Conversion SaaS", topics: [
        { template: "Conversion SaaS {angle}: Tools That Boost Website Revenue", angles: ["Landing Page Builders Compared", "A/B Testing Software Guide", "Personalisation Engines", "Form & Popup Tools", "Funnel Builder Platforms"], infographicType: "comparison" },
      ]},
      { subcategoryId: "workflow-automation-saas", subcategoryTitle: "Workflow Automation SaaS", topics: [
        { template: "Workflow Automation {angle}: Eliminate Manual Marketing Tasks", angles: ["No-Code Automation Platforms", "Zapier vs Make Comparison", "API Integration Tools", "Data Sync Solutions", "Process Automation ROI"], infographicType: "process" },
      ]},
      { subcategoryId: "customer-support-saas", subcategoryTitle: "Customer Support SaaS", topics: [
        { template: "Customer Support SaaS {angle}: Scale Your Service Team", angles: ["AI Chatbot Platforms", "Helpdesk Software Comparison", "Omnichannel Support Tools", "Knowledge Base Solutions", "Customer Feedback Tools"], infographicType: "comparison" },
      ]},
      { subcategoryId: "subscription-billing-saas", subcategoryTitle: "Subscription & Billing SaaS", topics: [
        { template: "Subscription Billing {angle}: Manage Recurring Revenue", angles: ["Billing Platform Comparison", "Payment Gateway Integration", "Subscription Metrics & Analytics", "Dunning Management Solutions", "Revenue Recognition Tools"], infographicType: "comparison" },
      ]},
      { subcategoryId: "saas-development", subcategoryTitle: "SaaS Development & Support", topics: [
        { template: "SaaS Development {angle}: Build & Scale Cloud Products", angles: ["Custom SaaS Architecture", "SaaS Security Best Practices", "Cloud Scalability Strategies", "SaaS UI/UX Design Principles", "SaaS Maintenance & DevOps"], infographicType: "process" },
      ]},
    ]
  },

  // ── 17. Branding & Design ─────────────────────────────────
  "Branding & Design": {
    categoryTitle: "Branding & Design",
    subcategories: [
      { subcategoryId: "brand-strategy-identity", subcategoryTitle: "Brand Strategy & Identity", topics: [
        { template: "Brand Strategy {angle}: Build a Memorable Brand", angles: ["Brand Positioning Framework", "Brand Voice Development", "Visual Identity Systems", "Competitive Brand Analysis", "Rebranding Strategy Guide"], infographicType: "process" },
      ]},
      { subcategoryId: "logo-design", subcategoryTitle: "Logo Design", topics: [
        { template: "Logo Design {angle}: Create a Mark That Lasts", angles: ["Logo Design Principles 2026", "Logo Redesign Case Studies", "Minimal vs Detailed Logos", "Logo Usage Guidelines", "AI-Assisted Logo Design"], infographicType: "comparison" },
      ]},
      { subcategoryId: "corporate-branding", subcategoryTitle: "Corporate Branding", topics: [
        { template: "Corporate Branding {angle}: Professional Identity at Scale", angles: ["Brand Guidelines Creation", "Business Collateral Design", "Pitch Deck Design Principles", "Brand Consistency Across Channels", "Employee Brand Advocacy"], infographicType: "checklist" },
      ]},
      { subcategoryId: "graphic-design", subcategoryTitle: "Graphic Design", topics: [
        { template: "Graphic Design {angle}: Visuals That Drive Engagement", angles: ["Marketing Creative Best Practices", "Social Media Design Templates", "Infographic Design Guide", "Banner Ad Design Tips", "Print vs Digital Design"], infographicType: "comparison" },
      ]},
      { subcategoryId: "ui-ux-design", subcategoryTitle: "UI/UX & Digital Design", topics: [
        { template: "UI/UX Design {angle}: Creating Intuitive Digital Products", angles: ["Design System Architecture", "Mobile App UI Patterns", "SaaS Dashboard UX", "Wireframing Best Practices", "Prototyping Tools Compared"], infographicType: "process" },
      ]},
      { subcategoryId: "social-media-creative", subcategoryTitle: "Social Media Creative Design", topics: [
        { template: "Social Media Creative {angle}: Stand Out in the Feed", angles: ["Reel & Short-Form Graphics", "Campaign Creative Strategy", "Platform-Specific Design Sizes", "Ad Creative Testing Framework", "Brand Kit for Social"], infographicType: "checklist" },
      ]},
      { subcategoryId: "packaging-design", subcategoryTitle: "Packaging & Product Design", topics: [
        { template: "Packaging Design {angle}: Unboxing Experience That Sells", angles: ["E-commerce Packaging Trends", "Sustainable Packaging Design", "Label Design Best Practices", "Retail Shelf Impact Design", "Print-Ready File Preparation"], infographicType: "comparison" },
      ]},
      { subcategoryId: "motion-graphics", subcategoryTitle: "Motion Graphics", topics: [
        { template: "Motion Graphics {angle}: Animate Your Brand Story", angles: ["Logo Animation Techniques", "Explainer Motion Videos", "Social Media Animations", "Micro-Interaction Design", "GIF Marketing Strategies"], infographicType: "process" },
      ]},
      { subcategoryId: "creative-advertising", subcategoryTitle: "Creative Advertising Design", topics: [
        { template: "Creative Advertising {angle}: Campaigns That Get Noticed", angles: ["Ad Concept Development", "Cross-Channel Creative Strategy", "Performance Creative Testing", "Campaign Visual Systems", "Award-Winning Ad Design"], infographicType: "comparison" },
      ]},
      { subcategoryId: "ai-creative-design", subcategoryTitle: "AI-Powered Creative Design", topics: [
        { template: "AI Creative Design {angle}: The Future of Visual Marketing", angles: ["AI Image Generation for Marketing", "AI-Assisted Logo Ideation", "Creative Automation Workflows", "AI Design Optimisation", "Midjourney vs DALL-E for Business"], infographicType: "comparison" },
      ]},
    ]
  },

  // ── 18. Marketing Automation & CRM ────────────────────────
  "Marketing Automation": {
    categoryTitle: "Marketing Automation",
    subcategories: [
      { subcategoryId: "lead-capture", subcategoryTitle: "Lead Capture & Smart Forms", topics: [
        { template: "Lead Capture {angle}: Convert More Visitors into Leads", angles: ["Smart Form Design Principles", "Progressive Profiling Strategy", "Lead Magnet Integration", "Exit Intent Popups", "Multi-Step Form Optimisation"], infographicType: "process" },
      ]},
      { subcategoryId: "communication-automation", subcategoryTitle: "Email, SMS & WhatsApp Automation", topics: [
        { template: "Omnichannel Automation {angle}: Reach Customers Everywhere", angles: ["WhatsApp Business API Marketing", "SMS Marketing Compliance", "Email + SMS Integration", "Personalised Messaging at Scale", "Channel Preference Optimisation"], infographicType: "process" },
      ]},
      { subcategoryId: "lead-scoring", subcategoryTitle: "Lead Scoring & Segmentation", topics: [
        { template: "Lead Scoring {angle}: Prioritise Your Best Prospects", angles: ["Behavioral Scoring Models", "Demographic vs Firmographic Scoring", "AI-Powered Lead Qualification", "Score Threshold Optimisation", "MQL to SQL Conversion"], infographicType: "statistics" },
      ]},
      { subcategoryId: "sales-funnel", subcategoryTitle: "Sales Funnel Automation", topics: [
        { template: "Sales Funnel {angle}: Automate Your Pipeline", angles: ["Funnel Visualisation Tools", "Leakage Identification Methods", "Stage Conversion Benchmarks", "Follow-Up Automation", "Revenue Attribution by Stage"], infographicType: "process" },
      ]},
      { subcategoryId: "crm-setup", subcategoryTitle: "CRM Setup & Customisation", topics: [
        { template: "CRM Setup {angle}: Configure for Maximum Impact", angles: ["Custom Pipeline Design", "Field & Property Configuration", "User Permission Models", "CRM Data Hygiene", "Dashboard Customisation"], infographicType: "checklist" },
      ]},
      { subcategoryId: "crm-integration", subcategoryTitle: "CRM Platform Integration", topics: [
        { template: "CRM Integration {angle}: Connecting HubSpot, Zoho & Salesforce", angles: ["Platform Migration Guide", "API Integration Best Practices", "Data Synchronisation Strategies", "CRM + Marketing Automation Link", "Legacy System Migration"], infographicType: "process" },
      ]},
      { subcategoryId: "drip-campaigns", subcategoryTitle: "Drip Campaign Workflows", topics: [
        { template: "Drip Campaigns {angle}: Nurture Leads on Autopilot", angles: ["Welcome Series Best Practices", "Re-Engagement Campaign Strategy", "Educational Sequence Design", "Product Launch Drip Campaigns", "Win-Back Email Workflows"], infographicType: "process" },
      ]},
      { subcategoryId: "chatbot-automation", subcategoryTitle: "Chatbot & Live Chat Automation", topics: [
        { template: "Chatbot Automation {angle}: 24/7 Customer Engagement", angles: ["AI Chatbot Training Guide", "Live Chat Routing Strategy", "FAQ Automation Setup", "Chatbot + CRM Integration", "Conversational Lead Qualification"], infographicType: "process" },
      ]},
      { subcategoryId: "customer-lifecycle", subcategoryTitle: "Customer Lifecycle Management", topics: [
        { template: "Customer Lifecycle {angle}: From Acquisition to Advocacy", angles: ["Onboarding Automation Strategy", "Retention Campaign Design", "Churn Prevention Tactics", "Customer Health Scoring", "Loyalty Program Automation"], infographicType: "process" },
      ]},
      { subcategoryId: "reporting-analytics", subcategoryTitle: "Automation Reporting & Analytics", topics: [
        { template: "Automation Analytics {angle}: Measure What Matters", angles: ["Custom Dashboard Design", "ROI Tracking Frameworks", "Performance Attribution Models", "Workflow Efficiency Metrics", "Executive Reporting Templates"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ai-lead-nurturing", subcategoryTitle: "AI-Powered Lead Nurturing", topics: [
        { template: "AI Lead Nurturing {angle}: Intelligent Prospect Engagement", angles: ["Predictive Lead Scoring Models", "Dynamic Content Personalisation", "Next-Best-Action Engines", "AI Send-Time Optimisation", "Behavioural Trigger Systems"], infographicType: "process" },
      ]},
      { subcategoryId: "pipeline-optimization", subcategoryTitle: "Pipeline Optimisation", topics: [
        { template: "Pipeline Optimisation {angle}: Accelerate Deal Velocity", angles: ["Pipeline Velocity Metrics", "Stage Conversion Analysis", "Bottleneck Identification", "Sales & Marketing Alignment", "Revenue Forecasting Methods"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 19. Conversion UI/UX ──────────────────────────────────
  "Conversion UI/UX": {
    categoryTitle: "Conversion UI/UX",
    subcategories: [
      { subcategoryId: "user-research", subcategoryTitle: "User Research & Behavior Analysis", topics: [
        { template: "User Research {angle}: Understanding Your Customers", angles: ["Persona Development Framework", "Customer Journey Mapping", "Competitor UX Analysis", "User Interview Techniques", "Quantitative vs Qualitative Research"], infographicType: "process" },
      ]},
      { subcategoryId: "ux-audits", subcategoryTitle: "Website & App UX Audits", topics: [
        { template: "UX Audit {angle}: Find & Fix Conversion Killers", angles: ["Heuristic Evaluation Framework", "Usability Testing Methods", "Accessibility Audit Checklist", "Performance Impact on UX", "Competitor Benchmarking"], infographicType: "checklist" },
      ]},
      { subcategoryId: "wireframing-prototyping", subcategoryTitle: "Wireframing & Prototyping", topics: [
        { template: "Wireframing {angle}: From Concept to Clickable Prototype", angles: ["Low-Fi to High-Fi Workflow", "Interactive Prototype Tools", "User Flow Mapping", "Stakeholder Presentation Tips", "Rapid Prototyping Methods"], infographicType: "process" },
      ]},
      { subcategoryId: "landing-page-optimization", subcategoryTitle: "Landing Page Optimisation", topics: [
        { template: "Landing Page {angle}: Above-the-Fold Optimisation", angles: ["Hero Section Psychology", "CTA Placement Testing", "Social Proof Strategies", "Form vs No-Form Debate", "Video Landing Page Impact"], infographicType: "statistics" },
      ]},
      { subcategoryId: "funnel-design", subcategoryTitle: "Funnel Design & Optimisation", topics: [
        { template: "Funnel Design {angle}: Reduce Drop-Offs & Increase Revenue", angles: ["Sales Funnel Mapping", "Micro-Conversion Tracking", "Friction Point Analysis", "Multi-Step Funnel Design", "Funnel A/B Testing"], infographicType: "process" },
      ]},
      { subcategoryId: "heatmap-analysis", subcategoryTitle: "Heatmap & Session Recording", topics: [
        { template: "Heatmap Analysis {angle}: Visual Insights for Better UX", angles: ["Click Map Interpretation", "Scroll Depth Analysis", "Rage Click Diagnosis", "Attention Map Insights", "Mobile vs Desktop Heatmaps"], infographicType: "statistics" },
      ]},
      { subcategoryId: "ab-testing", subcategoryTitle: "A/B Testing & Experiments", topics: [
        { template: "A/B Testing {angle}: Scientific Experimentation for Growth", angles: ["Hypothesis Framework", "Statistical Significance Guide", "Multi-Variant Testing Design", "Test Prioritisation Models", "Personalisation Experiments"], infographicType: "comparison" },
      ]},
      { subcategoryId: "mobile-first-design", subcategoryTitle: "Mobile-First Experience", topics: [
        { template: "Mobile-First Design {angle}: Thumb-Friendly Interfaces", angles: ["Touch Target Optimisation", "Mobile Navigation Patterns", "Mobile Speed & UX Link", "Responsive vs Adaptive Design", "Progressive Enhancement"], infographicType: "checklist" },
      ]},
      { subcategoryId: "accessibility-usability", subcategoryTitle: "Accessibility & Usability", topics: [
        { template: "Accessibility {angle}: Inclusive Design That Converts", angles: ["WCAG 2.2 Compliance Guide", "Screen Reader Optimisation", "Color Contrast Standards", "Keyboard Navigation Design", "Inclusive Form Design"], infographicType: "checklist" },
      ]},
      { subcategoryId: "visual-design", subcategoryTitle: "Conversion-Centered Visual Design", topics: [
        { template: "Visual Design {angle}: Psychology-Driven Conversions", angles: ["Visual Hierarchy Principles", "Color Psychology in CRO", "Typography for Readability", "White Space Strategy", "Image Selection Impact"], infographicType: "comparison" },
      ]},
      { subcategoryId: "saas-ux-design", subcategoryTitle: "SaaS & Product UX", topics: [
        { template: "SaaS UX {angle}: Design Products Users Love", angles: ["Dashboard Design Patterns", "Onboarding Flow Optimisation", "Feature Adoption Strategies", "In-App Guidance Design", "SaaS Pricing Page UX"], infographicType: "process" },
      ]},
      { subcategoryId: "checkout-optimization", subcategoryTitle: "Checkout & Form Optimisation", topics: [
        { template: "Checkout Optimisation {angle}: Reduce Abandonment & Increase Sales", angles: ["One-Page vs Multi-Step Checkout", "Guest Checkout Benefits", "Trust Seal Placement", "Payment Method Optimisation", "Form Error Handling UX"], infographicType: "statistics" },
      ]},
    ]
  },

  // ── 20. Growth Hacking ────────────────────────────────────
  "Growth Hacking": {
    categoryTitle: "Growth Hacking",
    subcategories: [
      { subcategoryId: "growth-roadmaps", subcategoryTitle: "Data-Driven Growth Roadmaps", topics: [
        { template: "Growth Roadmap {angle}: Strategic Planning for Scale", angles: ["North Star Metric Framework", "Opportunity Sizing Methods", "Quarterly Growth Sprints", "OKR for Growth Teams", "Growth vs Marketing Strategy"], infographicType: "process" },
      ]},
      { subcategoryId: "experimentation-frameworks", subcategoryTitle: "Rapid Experimentation", topics: [
        { template: "Growth Experiments {angle}: Test Fast, Learn Faster", angles: ["ICE vs RICE Scoring", "High-Velocity Testing Culture", "Experiment Documentation", "Learning Repository Setup", "Failed Experiment Insights"], infographicType: "comparison" },
      ]},
      { subcategoryId: "acquisition-optimization", subcategoryTitle: "Acquisition Channel Optimisation", topics: [
        { template: "Acquisition {angle}: Find & Scale Your Best Channels", angles: ["Channel Scalability Analysis", "CAC Reduction Strategies", "New Channel Discovery", "Paid vs Organic Balance", "Channel Saturation Signals"], infographicType: "statistics" },
      ]},
      { subcategoryId: "retention-engagement", subcategoryTitle: "Retention & Engagement", topics: [
        { template: "Retention Strategy {angle}: Keep Customers Coming Back", angles: ["Cohort Retention Analysis", "Gamification for Engagement", "Power User Programs", "Push Notification Strategy", "Community-Led Retention"], infographicType: "statistics" },
      ]},
      { subcategoryId: "viral-growth", subcategoryTitle: "Viral & Referral Growth", topics: [
        { template: "Viral Growth {angle}: Engineering Word-of-Mouth", angles: ["Referral Loop Design", "Viral Coefficient Optimisation", "Incentive Structure Modelling", "Network Effects Strategy", "Social Sharing Mechanics"], infographicType: "process" },
      ]},
      { subcategoryId: "performance-alignment", subcategoryTitle: "Performance Marketing Alignment", topics: [
        { template: "Performance Alignment {angle}: Growth Meets Paid Media", angles: ["Creative Performance Loops", "Landing Page Alignment", "Full-Funnel Attribution", "Growth + Paid Synergy", "Budget Reallocation Framework"], infographicType: "statistics" },
      ]},
      { subcategoryId: "product-led-growth", subcategoryTitle: "Product-Led Growth", topics: [
        { template: "Product-Led Growth {angle}: Let Your Product Do the Selling", angles: ["Freemium Conversion Strategy", "Product Virality Features", "Time-to-Value Optimisation", "Self-Serve Onboarding Design", "PLG Metrics Framework"], infographicType: "process" },
      ]},
      { subcategoryId: "cohort-analysis", subcategoryTitle: "Cohort & Funnel Analysis", topics: [
        { template: "Cohort Analysis {angle}: Data That Reveals Growth Levers", angles: ["Behavioral Cohorting Methods", "Funnel Step Conversion Analysis", "LTV/CAC Ratio Tracking", "Retention Curve Analysis", "Revenue Cohort Trends"], infographicType: "statistics" },
      ]},
      { subcategoryId: "growth-kpis", subcategoryTitle: "Growth KPIs & Dashboards", topics: [
        { template: "Growth Dashboards {angle}: Track What Matters", angles: ["Real-Time Growth Metrics", "Custom Attribution Models", "Executive Growth Reporting", "Leading vs Lagging Indicators", "Dashboard Design for Growth Teams"], infographicType: "statistics" },
      ]},
      { subcategoryId: "scalable-playbooks", subcategoryTitle: "Scalable Growth Playbooks", topics: [
        { template: "Growth Playbooks {angle}: Document & Scale What Works", angles: ["Process Documentation Framework", "Automation Workflow Templates", "Team Enablement Guides", "Repeatable Growth Processes", "Cross-Functional Playbooks"], infographicType: "checklist" },
      ]},
      { subcategoryId: "market-expansion", subcategoryTitle: "Market Expansion", topics: [
        { template: "Market Expansion {angle}: Enter New Markets Successfully", angles: ["New Market Entry Framework", "Localisation Strategy Guide", "Product-Market Fit Validation", "International Growth Playbook", "Market Sizing Methods"], infographicType: "process" },
      ]},
      { subcategoryId: "revenue-optimization", subcategoryTitle: "Revenue & LTV Optimisation", topics: [
        { template: "Revenue Optimisation {angle}: Maximise Customer Value", angles: ["Pricing Strategy Testing", "Cross-Sell & Up-Sell Loops", "Monetisation Modelling", "Revenue Per User Optimisation", "Dynamic Pricing Strategies"], infographicType: "statistics" },
      ]},
    ]
  },
};

// ============================================================================
// Build flat list of ALL subcategories for round-robin
// ============================================================================

interface FlatSubcategory {
  categoryKey: string;
  categoryTitle: string;
  subcategoryId: string;
  subcategoryTitle: string;
  topics: TopicTemplate[];
}

function buildFlatSubcategories(): FlatSubcategory[] {
  const flat: FlatSubcategory[] = [];
  for (const [catKey, catData] of Object.entries(TOPIC_MATRIX)) {
    for (const sub of catData.subcategories) {
      flat.push({
        categoryKey: catKey,
        categoryTitle: catData.categoryTitle,
        subcategoryId: sub.subcategoryId,
        subcategoryTitle: sub.subcategoryTitle,
        topics: sub.topics,
      });
    }
  }
  return flat;
}

const ALL_SUBCATEGORIES = buildFlatSubcategories();

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

function generateTopicHash(category: string, subcategoryId: string, angle: string): string {
  return `${category.toLowerCase().replace(/\s+/g, '_')}_${subcategoryId}_${angle.toLowerCase().replace(/\s+/g, '_')}`;
}

// ============================================================================
// ROUND-ROBIN SUBCATEGORY SELECTION
// Ensures no subcategory repeats until ALL subcategories have been covered.
// Within a single batch, ensures no two posts share the same category.
// ============================================================================

async function selectSubcategoriesForBatch(
  supabase: any,
  batchSize: number
): Promise<FlatSubcategory[]> {
  // Get ALL published posts' subcategory IDs (via topic_hash which contains subcategoryId)
  const { data: allPosts } = await supabase
    .from("blog_posts")
    .select("topic_hash, category")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const posts = allPosts || [];

  // Extract used subcategory IDs from topic hashes
  // topic_hash format: categorykey_subcategoryid_angle
  const usedSubcategoryIds = new Set<string>();
  for (const post of posts) {
    if (post.topic_hash) {
      // Extract subcategoryId from hash  
      const parts = post.topic_hash.split('_');
      // Find matching subcategory by checking if hash contains the subcategoryId
      for (const sub of ALL_SUBCATEGORIES) {
        if (post.topic_hash.includes(sub.subcategoryId)) {
          usedSubcategoryIds.add(sub.subcategoryId);
          break;
        }
      }
    }
  }

  // Find subcategories that have NOT been covered yet
  let availableSubcategories = ALL_SUBCATEGORIES.filter(
    sub => !usedSubcategoryIds.has(sub.subcategoryId)
  );

  // If all subcategories have been covered, reset and start fresh
  if (availableSubcategories.length === 0) {
    console.log("All subcategories covered! Resetting round-robin cycle.");
    availableSubcategories = [...ALL_SUBCATEGORIES];
  }

  // Shuffle available subcategories
  const shuffled = availableSubcategories.sort(() => Math.random() - 0.5);

  // Select batchSize subcategories, ensuring no two share the same category
  const selected: FlatSubcategory[] = [];
  const usedCategoriesInBatch = new Set<string>();

  for (const sub of shuffled) {
    if (selected.length >= batchSize) break;
    if (!usedCategoriesInBatch.has(sub.categoryKey)) {
      selected.push(sub);
      usedCategoriesInBatch.add(sub.categoryKey);
    }
  }

  // If we couldn't fill the batch with unique categories, allow category repeats
  if (selected.length < batchSize) {
    for (const sub of shuffled) {
      if (selected.length >= batchSize) break;
      if (!selected.includes(sub)) {
        selected.push(sub);
      }
    }
  }

  return selected;
}

// ============================================================================
// IMAGE GENERATION
// ============================================================================

async function generateBlogImage(
  topic: string, category: string, title: string, geminiApiKey: string
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
- Unique composition seed: ${uniqueSeed}`;

    console.log("Generating image for:", title);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: imagePrompt }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini image API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          console.log("Successfully generated image via Gemini API");
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
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

async function uploadImageToStorage(
  supabase: any, base64Image: string, slug: string
): Promise<string | null> {
  try {
    const matches = base64Image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) return null;

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
      await supabase.storage.createBucket("blog-images", { public: true, fileSizeLimit: 5242880 });
    }

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, bytes, { contentType: mimeType, upsert: true });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadImageToStorage:", error);
    return null;
  }
}

// ============================================================================
// AI CONTENT GENERATION (with fallback)
// ============================================================================

async function generateContentWithAI(
  systemPrompt: string, userPrompt: string, geminiApiKey: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 8192 }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini content API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Error generating content:", error);
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
    const body = await req.json().catch(() => ({}));
    const articlesToGenerate = body.count || 5; // Default 5 per day

    // Get recent posts for title similarity check
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const { data: recentPosts } = await supabase
      .from("blog_posts")
      .select("title, category, topic_hash")
      .gte("created_at", ninetyDaysAgo.toISOString())
      .order("created_at", { ascending: false });

    const existingTitles = (recentPosts || []).map(p => p.title.toLowerCase());

    // Select subcategories for this batch using round-robin
    const selectedSubcategories = await selectSubcategoriesForBatch(supabase, articlesToGenerate);

    console.log(`Selected ${selectedSubcategories.length} subcategories for batch:`);
    selectedSubcategories.forEach(s => console.log(`  - ${s.categoryTitle} > ${s.subcategoryTitle}`));

    const generatedArticles = [];

    for (let i = 0; i < selectedSubcategories.length; i++) {
      try {
        const sub = selectedSubcategories[i];
        const topic = sub.topics[Math.floor(Math.random() * sub.topics.length)];
        const angle = topic.angles[Math.floor(Math.random() * topic.angles.length)];
        const topicHash = generateTopicHash(sub.categoryKey, sub.subcategoryId, angle);
        const specificTopic = topic.template.replace(/\{angle\}/g, angle);

        const systemPrompt = `You are an expert SEO content writer for Digital Bull Technology (DiBull), a leading digital marketing agency based in India. Create exceptional, 100% unique blog content.

CRITICAL REQUIREMENTS:
- Write 1200-1800 words of ORIGINAL content
- NEVER use these phrases: ${AVOID_PHRASES.join(", ")}
- Start with a compelling hook using a specific statistic, question, or bold statement
- Include 2-3 REAL brand examples or case studies
- Create structured data points for infographics
- End with actionable takeaways readers can implement TODAY
- Write for ${sub.categoryTitle} professionals and business decision-makers
- Focus specifically on the subcategory: ${sub.subcategoryTitle}

CONTENT STRUCTURE:
1. Hook (surprising stat or provocative question)
2. Problem/Opportunity Statement
3. Main Content (with H2/H3 subheadings)
4. Real-World Examples (name actual brands)
5. Infographic Data Section (structured for visualization)
6. Key Takeaways (numbered list)
7. Call-to-Action mentioning DiBull's ${sub.subcategoryTitle} services

INFOGRAPHIC DATA FORMAT:
<!-- INFOGRAPHIC_DATA
{
  "type": "${topic.infographicType}",
  "title": "Visual summary title",
  "dataPoints": [
    {"label": "Point 1", "value": "metric/stat", "description": "brief explanation"},
    {"label": "Point 2", "value": "metric/stat", "description": "brief explanation"}
  ]
}
-->

Your response MUST be valid JSON:
{
  "title": "Compelling, unique title (max 60 chars) - avoid generic phrases",
  "metaDescription": "SEO meta description (150-160 chars) with primary keyword",
  "excerpt": "2-3 sentence preview that hooks readers",
  "category": "${sub.categoryTitle}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "content": "Full markdown content with ## for H2, ### for H3, **bold**, - bullets, and infographic data block"
}`;

        const userPrompt = `Write a comprehensive, SEO-optimized blog article about: "${specificTopic}"

SERVICE CATEGORY: ${sub.categoryTitle}
SUBCATEGORY FOCUS: ${sub.subcategoryTitle}
SPECIFIC ANGLE: ${angle}
INFOGRAPHIC TYPE: ${topic.infographicType}

Make this article STAND OUT by:
1. Opening with a specific, verifiable statistic
2. Including at least 2 real brand examples with specific results
3. Providing a structured infographic data section
4. Ending with 5+ actionable implementation steps
5. Using unexpected angles and insights

Remember: Provide ONLY valid JSON in your response. No markdown code blocks.`;

        console.log(`Generating article ${i + 1}: ${specificTopic} (${sub.categoryTitle} > ${sub.subcategoryTitle})`);

        const aiContent = await generateContentWithAI(
          systemPrompt, userPrompt, GEMINI_API_KEY
        );

        if (!aiContent) {
          console.error(`No content generated for article ${i + 1}`);
          continue;
        }

        let articleData;
        try {
          let jsonStr = aiContent.trim();
          if (jsonStr.includes("```json")) {
            jsonStr = jsonStr.split("```json")[1].split("```")[0].trim();
          } else if (jsonStr.includes("```")) {
            jsonStr = jsonStr.split("```")[1].split("```")[0].trim();
          }
          jsonStr = jsonStr
            .replace(/[\x00-\x1F\x7F]/g, ' ')
            .replace(/\n\s*\n/g, '\n')
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
          articleData = JSON.parse(jsonStr);
        } catch (parseError) {
          console.error(`JSON parse error for article ${i + 1}:`, parseError);
          continue;
        }

        // Check title similarity
        const newTitleLower = articleData.title.toLowerCase();
        const isTooSimilar = existingTitles.some(
          existing => levenshteinDistance(newTitleLower, existing) < 15
        );
        if (isTooSimilar) {
          articleData.title = `${articleData.title}: ${angle} Strategies`;
        }

        const today = new Date().toISOString().split('T')[0];
        const baseSlug = generateSlug(articleData.title);
        const slug = `${baseSlug}-${today}`;
        const readTime = calculateReadTime(articleData.content);

        // Generate and upload image
        let imageUrl = null;
        if (GEMINI_API_KEY) {
          const base64Image = await generateBlogImage(
            specificTopic, sub.categoryTitle, articleData.title,
            GEMINI_API_KEY
          );
          if (base64Image) {
            imageUrl = await uploadImageToStorage(supabase, base64Image, slug);
          }
        }

        const { data: insertedPost, error: insertError } = await supabase
          .from("blog_posts")
          .insert({
            slug,
            title: articleData.title,
            meta_description: articleData.metaDescription,
            excerpt: articleData.excerpt,
            content: articleData.content,
            category: articleData.category || sub.categoryTitle,
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

        console.log(`✓ Generated: ${articleData.title} [${sub.categoryTitle} > ${sub.subcategoryTitle}]`);
        existingTitles.push(newTitleLower);
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
        totalSubcategories: ALL_SUBCATEGORIES.length,
        articles: generatedArticles.map(a => ({
          title: a.title, slug: a.slug, category: a.category
        })),
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
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
