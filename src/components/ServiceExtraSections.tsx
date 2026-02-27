import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Search, BarChart3, Globe, Share2, PenTool, Mail, Target, ShoppingCart,
  Video, Megaphone, LineChart, Code, Bot, GraduationCap, Palette, Rocket, Zap,
  Shield, Smartphone, CheckCircle2, Eye, Users, TrendingUp, Brain, Layers,
  Database, Server, Settings, Workflow, MousePointer2, RefreshCcw, MessageCircle,
  Layout, Star, FileText, Filter, Monitor, Cpu, Store, Puzzle, FlaskConical,
  CreditCard, Send, Image, MapPin, Package, Cloud, Frame, Gem, BookOpen,
  ClipboardCheck, Droplet, GitBranch, Magnet, Map
} from "lucide-react";
import { LucideIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }
  })
};

interface ToolItem {
  name: string;
  icon: LucideIcon;
  desc: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  duration: string;
  color: string;
}

interface QuickFaq {
  icon: LucideIcon;
  q: string;
  a: string;
}

interface ResultMetric {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface ServiceExtraData {
  tools: ToolItem[];
  process: ProcessStep[];
  faqs: QuickFaq[];
  results: ResultMetric[];
  toolsSectionTitle: string;
  toolsSectionSubtitle: string;
  ctaText: string;
}

const serviceExtras: Record<string, ServiceExtraData> = {
  seo: {
    toolsSectionTitle: "SEO Tools & Platforms We Use",
    toolsSectionSubtitle: "Industry-leading tools for comprehensive SEO analysis and optimization.",
    tools: [
      { name: "Google Search Console", icon: Search, desc: "Performance tracking" },
      { name: "Ahrefs", icon: Globe, desc: "Backlink analysis" },
      { name: "SEMrush", icon: BarChart3, desc: "Keyword research" },
      { name: "Screaming Frog", icon: Cpu, desc: "Technical audits" },
      { name: "Google Analytics", icon: LineChart, desc: "Traffic insights" },
      { name: "Moz Pro", icon: TrendingUp, desc: "Domain authority" },
    ],
    process: [
      { step: "01", title: "SEO Audit & Analysis", desc: "Complete technical audit, keyword gap analysis, and competitor benchmarking.", duration: "3–5 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Keyword Strategy", desc: "Research high-intent keywords, map to pages, and prioritize quick wins.", duration: "2–3 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "On-Page & Technical Fix", desc: "Optimize meta tags, content, site speed, schema markup, and crawlability.", duration: "1–2 Weeks", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Content & Link Building", desc: "Create SEO content and earn high-quality backlinks through outreach.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Monitor & Report", desc: "Weekly rank tracking, monthly reports, and continuous optimization.", duration: "Monthly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Search, q: "How long until I rank on page 1?", a: "Most clients see page-1 rankings for targeted keywords within 3–6 months, depending on competition." },
      { icon: TrendingUp, q: "Do you guarantee #1 rankings?", a: "No ethical agency can guarantee #1. We guarantee transparent effort, proven strategies, and measurable traffic growth." },
      { icon: Globe, q: "Do you handle local SEO too?", a: "Yes! We optimize Google Business Profile, local citations, and geo-targeted content for local dominance." },
      { icon: Shield, q: "Is your SEO white-hat?", a: "100%. We follow Google's guidelines strictly. No PBNs, no spam links, no shortcuts that risk penalties." },
    ],
    results: [
      { value: "300%", label: "Avg Traffic Increase", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
      { value: "10K+", label: "Keywords Ranked", icon: Search, color: "from-amber-500 to-orange-500" },
      { value: "85%", label: "Page-1 Rankings", icon: Star, color: "from-green-500 to-emerald-500" },
      { value: "5x", label: "Lead Generation", icon: Target, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Boost Your Rankings Now",
  },
  ppc: {
    toolsSectionTitle: "PPC Platforms & Tools",
    toolsSectionSubtitle: "We manage campaigns across every major advertising platform.",
    tools: [
      { name: "Google Ads", icon: Search, desc: "Search & display" },
      { name: "Meta Ads", icon: Share2, desc: "Facebook & Instagram" },
      { name: "LinkedIn Ads", icon: Users, desc: "B2B targeting" },
      { name: "Google Analytics", icon: LineChart, desc: "Conversion tracking" },
      { name: "Optmyzr", icon: Settings, desc: "Bid optimization" },
      { name: "Unbounce", icon: MousePointer2, desc: "Landing pages" },
    ],
    process: [
      { step: "01", title: "Account Audit", desc: "Deep dive into existing campaigns, identify waste, and find opportunities.", duration: "1–2 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Campaign Strategy", desc: "Define targeting, budgets, ad groups, and bidding strategies aligned to goals.", duration: "2–3 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Ad Creation & Launch", desc: "Write compelling ad copy, design creatives, and launch optimized campaigns.", duration: "3–5 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Optimize & Scale", desc: "A/B test ads, refine audiences, adjust bids, and scale winning campaigns.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Report & Iterate", desc: "Weekly performance dashboards with actionable insights and next steps.", duration: "Weekly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: CreditCard, q: "What's the minimum ad budget?", a: "We recommend at least ₹30,000/month for meaningful results, but we customize based on your goals." },
      { icon: Target, q: "How do you track conversions?", a: "We set up pixel tracking, call tracking, and UTM parameters for complete attribution across all channels." },
      { icon: TrendingUp, q: "What ROI can I expect?", a: "Our average client sees 3–5x ROAS. We optimize relentlessly to maximize every rupee spent." },
      { icon: BarChart3, q: "How often do you optimize?", a: "Daily bid adjustments, weekly creative refreshes, and bi-weekly strategy reviews for peak performance." },
    ],
    results: [
      { value: "3–5x", label: "Average ROAS", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
      { value: "₹10M+", label: "Ad Spend Managed", icon: BarChart3, color: "from-amber-500 to-orange-500" },
      { value: "-40%", label: "Cost Per Lead", icon: Target, color: "from-green-500 to-emerald-500" },
      { value: "200+", label: "Campaigns Managed", icon: Megaphone, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Launch Your Campaign",
  },
  "social-media": {
    toolsSectionTitle: "Social Media Platforms We Manage",
    toolsSectionSubtitle: "Full-service management across every platform that matters for your brand.",
    tools: [
      { name: "Instagram", icon: Image, desc: "Visual storytelling" },
      { name: "Facebook", icon: Share2, desc: "Community building" },
      { name: "LinkedIn", icon: Users, desc: "B2B engagement" },
      { name: "YouTube", icon: Video, desc: "Video content" },
      { name: "Twitter/X", icon: MessageCircle, desc: "Real-time engagement" },
      { name: "Buffer/Hootsuite", icon: Settings, desc: "Scheduling" },
    ],
    process: [
      { step: "01", title: "Brand Audit", desc: "Analyze your current social presence, audience demographics, and competitor landscape.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Content Strategy", desc: "Build content pillars, posting calendar, and brand voice guidelines.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Content Creation", desc: "Design graphics, write captions, produce reels, and schedule posts.", duration: "Ongoing", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Community Management", desc: "Respond to comments, DMs, and engage with your audience daily.", duration: "Daily", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Analytics & Growth", desc: "Track engagement, follower growth, and optimize strategy monthly.", duration: "Monthly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Share2, q: "Which platforms should I be on?", a: "We recommend platforms based on your target audience. B2B? LinkedIn. Visual brand? Instagram. We'll guide you." },
      { icon: MessageCircle, q: "How often should I post?", a: "We typically recommend 4–5 posts per week across platforms, with daily stories and engagement." },
      { icon: TrendingUp, q: "How do you measure social ROI?", a: "We track engagement rate, reach, website traffic from social, lead generation, and brand sentiment." },
      { icon: Users, q: "Do you handle influencer marketing?", a: "Yes! We identify, negotiate, and manage influencer partnerships that align with your brand values." },
    ],
    results: [
      { value: "100K+", label: "Followers Gained", icon: Users, color: "from-blue-500 to-cyan-500" },
      { value: "15%", label: "Engagement Rate", icon: MessageCircle, color: "from-amber-500 to-orange-500" },
      { value: "500+", label: "Posts Created Monthly", icon: Image, color: "from-green-500 to-emerald-500" },
      { value: "3x", label: "Brand Reach Growth", icon: Globe, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Grow Your Social Presence",
  },
  "content-marketing": {
    toolsSectionTitle: "Content Tools & Platforms",
    toolsSectionSubtitle: "We leverage the best tools for content research, creation, and distribution.",
    tools: [
      { name: "SEMrush", icon: Search, desc: "Topic research" },
      { name: "Grammarly", icon: FileText, desc: "Quality assurance" },
      { name: "Canva/Figma", icon: Palette, desc: "Visual content" },
      { name: "WordPress", icon: Layout, desc: "CMS publishing" },
      { name: "HubSpot", icon: Workflow, desc: "Content analytics" },
      { name: "BuzzSumo", icon: TrendingUp, desc: "Trend analysis" },
    ],
    process: [
      { step: "01", title: "Content Audit", desc: "Evaluate existing content, identify gaps, and benchmark against competitors.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Strategy & Calendar", desc: "Build content pillars, editorial calendar, and distribution plan.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Content Production", desc: "Write, design, and produce high-quality blogs, guides, and visual content.", duration: "Ongoing", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Distribution & Promotion", desc: "Publish across channels, promote via email and social, and earn backlinks.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Measure & Optimize", desc: "Track traffic, engagement, conversions, and refine strategy quarterly.", duration: "Quarterly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: FileText, q: "What types of content do you create?", a: "Blogs, whitepapers, case studies, infographics, videos, social posts, email newsletters, and more." },
      { icon: Search, q: "Is content optimized for SEO?", a: "Absolutely. Every piece is keyword-researched, structured for featured snippets, and internally linked." },
      { icon: TrendingUp, q: "How do you measure content ROI?", a: "We track organic traffic, time on page, lead generation, social shares, and conversion attribution." },
      { icon: PenTool, q: "Can you match our brand voice?", a: "Yes. We create detailed brand voice guidelines and maintain consistency across all content." },
    ],
    results: [
      { value: "500+", label: "Articles Published", icon: FileText, color: "from-blue-500 to-cyan-500" },
      { value: "1M+", label: "Readers Reached", icon: Users, color: "from-amber-500 to-orange-500" },
      { value: "4x", label: "Engagement Uplift", icon: Share2, color: "from-green-500 to-emerald-500" },
      { value: "60%", label: "More Organic Leads", icon: Target, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Start Content Marketing",
  },
  "email-marketing": {
    toolsSectionTitle: "Email Platforms & Tools",
    toolsSectionSubtitle: "Enterprise-grade email marketing platforms for deliverability and automation.",
    tools: [
      { name: "Mailchimp", icon: Mail, desc: "Campaign management" },
      { name: "Klaviyo", icon: Workflow, desc: "E-commerce flows" },
      { name: "HubSpot", icon: Settings, desc: "CRM integration" },
      { name: "SendGrid", icon: Send, desc: "Transactional emails" },
      { name: "Litmus", icon: Eye, desc: "Email testing" },
      { name: "ActiveCampaign", icon: Bot, desc: "Automation" },
    ],
    process: [
      { step: "01", title: "List Audit & Segmentation", desc: "Clean lists, segment audiences, and set up proper tagging for personalization.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Strategy & Flows", desc: "Design welcome series, abandoned cart, re-engagement, and nurture flows.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Design & Copy", desc: "Create mobile-responsive templates with compelling copy and clear CTAs.", duration: "3–5 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Launch & A/B Test", desc: "Send campaigns with A/B tested subject lines, send times, and content.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Analyze & Optimize", desc: "Track opens, clicks, conversions, and refine for higher engagement.", duration: "Weekly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Mail, q: "What open rates can I expect?", a: "Our campaigns average 25–35% open rates, well above the industry average of 20%." },
      { icon: Shield, q: "How do you ensure deliverability?", a: "SPF, DKIM, DMARC setup, list hygiene, warm-up sequences, and reputation monitoring." },
      { icon: Workflow, q: "Do you set up automations?", a: "Yes! Welcome flows, cart abandonment, re-engagement, post-purchase, and birthday sequences." },
      { icon: Users, q: "Can you grow my email list?", a: "We implement opt-in forms, lead magnets, pop-ups, and landing pages to grow your list organically." },
    ],
    results: [
      { value: "35%", label: "Avg Open Rate", icon: Mail, color: "from-blue-500 to-cyan-500" },
      { value: "4.2%", label: "Click-Through Rate", icon: MousePointer2, color: "from-amber-500 to-orange-500" },
      { value: "42x", label: "Email ROI", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
      { value: "1M+", label: "Emails Sent Monthly", icon: Send, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Start Email Marketing",
  },
  "branding-design": {
    toolsSectionTitle: "Design Tools We Use",
    toolsSectionSubtitle: "Premium design tools for pixel-perfect brand identities.",
    tools: [
      { name: "Figma", icon: Eye, desc: "UI/UX design" },
      { name: "Adobe Suite", icon: Palette, desc: "Creative design" },
      { name: "Canva Pro", icon: Image, desc: "Quick assets" },
      { name: "Blender", icon: Layers, desc: "3D mockups" },
      { name: "After Effects", icon: Video, desc: "Motion graphics" },
      { name: "Brandpad", icon: BookOpen, desc: "Brand guidelines" },
    ],
    process: [
      { step: "01", title: "Brand Discovery", desc: "Deep dive into your values, vision, audience, and competitive positioning.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Moodboard & Concepts", desc: "Create visual directions, color palettes, typography, and design concepts.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Logo & Identity Design", desc: "Craft your logo, icon system, patterns, and core visual elements.", duration: "5–7 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Brand Collateral", desc: "Design business cards, letterheads, social templates, and marketing materials.", duration: "5–7 Days", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Brand Guidelines", desc: "Deliver a comprehensive brand book with usage rules and asset library.", duration: "2–3 Days", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Palette, q: "How many logo concepts do I get?", a: "We provide 3–5 unique logo concepts with unlimited revisions on the chosen direction." },
      { icon: FileText, q: "Do you deliver brand guidelines?", a: "Yes! A comprehensive brand book covering logo usage, colors, typography, imagery, and tone of voice." },
      { icon: RefreshCcw, q: "Can you rebrand an existing brand?", a: "Absolutely. We specialize in brand refreshes and complete rebranding projects." },
      { icon: Layers, q: "What file formats do I receive?", a: "AI, EPS, SVG, PNG, PDF, and all web-optimized formats — you own everything we create." },
    ],
    results: [
      { value: "200+", label: "Brands Created", icon: Palette, color: "from-blue-500 to-cyan-500" },
      { value: "100%", label: "Ownership Rights", icon: Shield, color: "from-amber-500 to-orange-500" },
      { value: "48h", label: "First Concepts", icon: Zap, color: "from-green-500 to-emerald-500" },
      { value: "5★", label: "Client Rating", icon: Star, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Start Your Brand Project",
  },
  "ecommerce-marketing": {
    toolsSectionTitle: "E-commerce Platforms & Tools",
    toolsSectionSubtitle: "We work with all major e-commerce platforms and marketing tools.",
    tools: [
      { name: "Shopify", icon: ShoppingCart, desc: "Store management" },
      { name: "WooCommerce", icon: Store, desc: "WordPress shops" },
      { name: "Google Shopping", icon: Package, desc: "Product ads" },
      { name: "Klaviyo", icon: Mail, desc: "Email automation" },
      { name: "Google Analytics", icon: LineChart, desc: "Revenue tracking" },
      { name: "Meta Commerce", icon: Share2, desc: "Social selling" },
    ],
    process: [
      { step: "01", title: "Store Audit", desc: "Analyze your store's UX, product pages, checkout flow, and conversion funnel.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Growth Strategy", desc: "Define channel mix, budget allocation, and promotional calendar.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Campaign Launch", desc: "Set up Google Shopping, social ads, email flows, and retargeting campaigns.", duration: "5–7 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Conversion Optimization", desc: "A/B test product pages, optimize checkout, and reduce cart abandonment.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Scale & Report", desc: "Scale winning channels, expand catalogs, and provide detailed revenue reports.", duration: "Monthly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: ShoppingCart, q: "Which e-commerce platform is best?", a: "It depends on your needs. Shopify for simplicity, WooCommerce for flexibility, custom for enterprise." },
      { icon: TrendingUp, q: "How do you increase sales?", a: "Multi-channel approach: SEO, paid ads, email flows, CRO, and retargeting working together." },
      { icon: Package, q: "Do you handle product feed optimization?", a: "Yes! We optimize titles, descriptions, images, and attributes for maximum visibility on shopping platforms." },
      { icon: CreditCard, q: "Can you reduce cart abandonment?", a: "We implement exit-intent popups, email recovery flows, and checkout optimizations to recover lost sales." },
    ],
    results: [
      { value: "₹50M+", label: "Revenue Generated", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
      { value: "40%", label: "Conv. Rate Increase", icon: Target, color: "from-amber-500 to-orange-500" },
      { value: "5x", label: "ROAS Average", icon: BarChart3, color: "from-green-500 to-emerald-500" },
      { value: "60%", label: "Cart Recovery Rate", icon: ShoppingCart, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Grow Your E-commerce",
  },
  "video-marketing": {
    toolsSectionTitle: "Video Production Tools",
    toolsSectionSubtitle: "Professional-grade tools for every stage of video production.",
    tools: [
      { name: "Adobe Premiere", icon: Video, desc: "Video editing" },
      { name: "After Effects", icon: Layers, desc: "Motion graphics" },
      { name: "DaVinci Resolve", icon: Palette, desc: "Color grading" },
      { name: "YouTube Studio", icon: Monitor, desc: "Channel management" },
      { name: "Loom", icon: Eye, desc: "Quick captures" },
      { name: "InVideo AI", icon: Bot, desc: "AI video creation" },
    ],
    process: [
      { step: "01", title: "Concept & Script", desc: "Develop video concepts, write scripts, and create storyboards.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Pre-Production", desc: "Plan shoots, source talent, location scout, and prepare equipment.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Production", desc: "Film with professional equipment, multiple angles, and proper lighting.", duration: "1–3 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Post-Production", desc: "Edit, add motion graphics, color grade, sound mix, and add subtitles.", duration: "5–7 Days", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Distribution", desc: "Optimize for each platform, schedule, and promote across channels.", duration: "1–2 Days", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Video, q: "What types of videos do you create?", a: "Explainers, testimonials, product demos, social reels, brand films, and corporate videos." },
      { icon: Smartphone, q: "Do you create vertical videos for reels?", a: "Yes! We produce platform-optimized videos for Instagram Reels, YouTube Shorts, and TikTok." },
      { icon: CreditCard, q: "What does video production cost?", a: "Projects range from ₹15,000 for social content to ₹2,00,000+ for brand films. We customize to budget." },
      { icon: TrendingUp, q: "How does video improve marketing?", a: "Video increases engagement by 80%, landing page conversions by 86%, and brand recall by 95%." },
    ],
    results: [
      { value: "500+", label: "Videos Produced", icon: Video, color: "from-blue-500 to-cyan-500" },
      { value: "10M+", label: "Views Generated", icon: Eye, color: "from-amber-500 to-orange-500" },
      { value: "86%", label: "Conv. Rate Lift", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
      { value: "95%", label: "Brand Recall", icon: Star, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Start Video Marketing",
  },
  "ai-marketing": {
    toolsSectionTitle: "AI Tools & Technologies",
    toolsSectionSubtitle: "Cutting-edge AI platforms powering smarter marketing decisions.",
    tools: [
      { name: "ChatGPT/GPT-5", icon: Bot, desc: "Content generation" },
      { name: "Midjourney", icon: Image, desc: "AI visuals" },
      { name: "Jasper AI", icon: PenTool, desc: "Marketing copy" },
      { name: "HubSpot AI", icon: Workflow, desc: "Automation" },
      { name: "Google AI", icon: Brain, desc: "Predictive analytics" },
      { name: "Surfer SEO", icon: Search, desc: "AI-driven SEO" },
    ],
    process: [
      { step: "01", title: "AI Readiness Audit", desc: "Assess your current marketing stack and identify AI integration opportunities.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Strategy Design", desc: "Design AI-powered workflows for content, ads, personalization, and analytics.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Implementation", desc: "Set up AI tools, create prompts, build automation flows, and integrate APIs.", duration: "1–2 Weeks", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Training & Handoff", desc: "Train your team on AI tools and best practices for ongoing success.", duration: "2–3 Days", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Optimize & Scale", desc: "Monitor AI performance, refine prompts, and scale successful automations.", duration: "Ongoing", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Bot, q: "Will AI replace my marketing team?", a: "No. AI augments your team, automating repetitive tasks so humans can focus on strategy and creativity." },
      { icon: Shield, q: "Is AI-generated content safe for SEO?", a: "When properly edited and fact-checked, AI content performs excellently. We ensure quality and originality." },
      { icon: Brain, q: "What AI tools do you recommend?", a: "It depends on your needs. We evaluate your goals and recommend the most effective AI stack." },
      { icon: Zap, q: "How quickly can I see results?", a: "AI implementations show efficiency gains within weeks. Marketing performance improvements within 1–2 months." },
    ],
    results: [
      { value: "70%", label: "Time Saved", icon: Zap, color: "from-blue-500 to-cyan-500" },
      { value: "3x", label: "Content Output", icon: FileText, color: "from-amber-500 to-orange-500" },
      { value: "50%", label: "Cost Reduction", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
      { value: "2x", label: "Campaign Performance", icon: Target, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Embrace AI Marketing",
  },
  "amazon-marketing": {
    toolsSectionTitle: "Amazon Marketing Tools",
    toolsSectionSubtitle: "Specialized tools for Amazon seller success.",
    tools: [
      { name: "Amazon Seller Central", icon: Store, desc: "Store management" },
      { name: "Helium 10", icon: Search, desc: "Keyword research" },
      { name: "Jungle Scout", icon: BarChart3, desc: "Product research" },
      { name: "Amazon Ads", icon: Megaphone, desc: "Sponsored products" },
      { name: "FeedbackWhiz", icon: Star, desc: "Review management" },
      { name: "SellerBoard", icon: LineChart, desc: "Profit analytics" },
    ],
    process: [
      { step: "01", title: "Account & Product Audit", desc: "Review listings, keywords, pricing, and competitive positioning on Amazon.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Listing Optimization", desc: "Optimize titles, bullets, descriptions, A+ content, and product images.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "PPC Campaigns", desc: "Launch Sponsored Products, Brands, and Display campaigns with precise targeting.", duration: "3–5 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Review & Ranking", desc: "Implement review strategies and organic ranking tactics.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Scale & Report", desc: "Expand to new products, optimize ACoS, and deliver monthly performance reports.", duration: "Monthly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Store, q: "Do you manage Amazon seller accounts?", a: "Yes! We provide full Amazon account management including listings, ads, inventory, and customer service." },
      { icon: Target, q: "What's a good ACoS target?", a: "It varies by product margins. We typically aim for 15–25% ACoS while maximizing total sales volume." },
      { icon: Star, q: "How do you improve product reviews?", a: "Through follow-up email sequences, product inserts, and Amazon's Request a Review feature—100% TOS compliant." },
      { icon: Globe, q: "Can you help with Amazon global selling?", a: "Yes! We help expand to Amazon US, UK, UAE, and other international marketplaces." },
    ],
    results: [
      { value: "₹20M+", label: "Amazon Revenue", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
      { value: "18%", label: "Avg ACoS", icon: Target, color: "from-amber-500 to-orange-500" },
      { value: "200+", label: "Products Optimized", icon: Package, color: "from-green-500 to-emerald-500" },
      { value: "4.5★", label: "Avg Product Rating", icon: Star, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Grow on Amazon",
  },
  "conversion-optimization": {
    toolsSectionTitle: "CRO Tools & Platforms",
    toolsSectionSubtitle: "Data-driven tools for testing and optimizing every conversion point.",
    tools: [
      { name: "Google Optimize", icon: FlaskConical, desc: "A/B testing" },
      { name: "Hotjar", icon: Eye, desc: "Heatmaps & recordings" },
      { name: "VWO", icon: BarChart3, desc: "Experimentation" },
      { name: "Crazy Egg", icon: MousePointer2, desc: "Click tracking" },
      { name: "Google Analytics", icon: LineChart, desc: "Funnel analysis" },
      { name: "Unbounce", icon: Layout, desc: "Landing pages" },
    ],
    process: [
      { step: "01", title: "Conversion Audit", desc: "Analyze funnels, heatmaps, session recordings, and identify drop-off points.", duration: "3–5 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Hypothesis Creation", desc: "Develop data-backed hypotheses for improving conversion rates.", duration: "2–3 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Test Design", desc: "Create A/B test variants for landing pages, CTAs, forms, and checkout.", duration: "3–5 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Run Experiments", desc: "Launch tests with statistical significance targets and monitor results.", duration: "2–4 Weeks", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Implement Winners", desc: "Roll out winning variations and document learnings for future optimization.", duration: "1–2 Days", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: FlaskConical, q: "How many tests do you run?", a: "We run 4–8 A/B tests per month depending on your traffic volume and business priorities." },
      { icon: TrendingUp, q: "What conversion lift can I expect?", a: "Our average client sees 30–50% improvement in conversion rates within 3 months." },
      { icon: Eye, q: "Do you use heatmaps?", a: "Yes! Heatmaps, scroll maps, session recordings, and click tracking are part of every CRO project." },
      { icon: Target, q: "What pages should I optimize first?", a: "We prioritize high-traffic, high-intent pages: landing pages, pricing, checkout, and product pages." },
    ],
    results: [
      { value: "45%", label: "Avg Conv. Lift", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
      { value: "500+", label: "Tests Run", icon: FlaskConical, color: "from-amber-500 to-orange-500" },
      { value: "78%", label: "Test Win Rate", icon: CheckCircle2, color: "from-green-500 to-emerald-500" },
      { value: "3x", label: "Revenue Impact", icon: Target, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Optimize Conversions",
  },
  "marketing-automation-crm": {
    toolsSectionTitle: "Automation & CRM Platforms",
    toolsSectionSubtitle: "We implement and optimize the leading marketing automation platforms.",
    tools: [
      { name: "HubSpot", icon: Workflow, desc: "All-in-one CRM" },
      { name: "Salesforce", icon: Cloud, desc: "Enterprise CRM" },
      { name: "Zapier", icon: Zap, desc: "App integrations" },
      { name: "ActiveCampaign", icon: Mail, desc: "Email automation" },
      { name: "Marketo", icon: Settings, desc: "B2B automation" },
      { name: "Monday.com", icon: ClipboardCheck, desc: "Project management" },
    ],
    process: [
      { step: "01", title: "Process Mapping", desc: "Map your current workflows, identify bottlenecks, and define automation goals.", duration: "3–5 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Platform Selection", desc: "Evaluate and recommend the right CRM/automation platform for your needs.", duration: "2–3 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Setup & Integration", desc: "Configure CRM, build automation workflows, and integrate with existing tools.", duration: "1–2 Weeks", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Data Migration", desc: "Clean, format, and migrate existing data into the new system.", duration: "3–5 Days", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Training & Support", desc: "Train your team and provide ongoing support for maximum adoption.", duration: "Ongoing", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Workflow, q: "Which CRM should I choose?", a: "HubSpot for SMBs, Salesforce for enterprise, ActiveCampaign for email-focused businesses. We'll guide you." },
      { icon: Database, q: "Can you migrate my existing data?", a: "Yes! We handle complete data migration with deduplication, formatting, and validation." },
      { icon: Zap, q: "What can be automated?", a: "Lead nurturing, follow-ups, task assignments, reporting, social posting, invoicing, and much more." },
      { icon: Users, q: "Do you train our team?", a: "Yes! We provide hands-on training sessions and documentation for your team." },
    ],
    results: [
      { value: "60%", label: "Time Saved", icon: Zap, color: "from-blue-500 to-cyan-500" },
      { value: "40%", label: "More Qualified Leads", icon: Target, color: "from-amber-500 to-orange-500" },
      { value: "100+", label: "Automations Built", icon: Workflow, color: "from-green-500 to-emerald-500" },
      { value: "3x", label: "Sales Productivity", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Automate Your Marketing",
  },
  "programmatic-advertising": {
    toolsSectionTitle: "Programmatic Platforms",
    toolsSectionSubtitle: "Enterprise-level demand-side platforms for precision targeting.",
    tools: [
      { name: "Google DV360", icon: Globe, desc: "Display & Video" },
      { name: "The Trade Desk", icon: BarChart3, desc: "Cross-channel" },
      { name: "Amazon DSP", icon: ShoppingCart, desc: "Amazon audiences" },
      { name: "MediaMath", icon: LineChart, desc: "Algorithmic buying" },
      { name: "Xandr", icon: Target, desc: "AT&T ecosystem" },
      { name: "DoubleVerify", icon: Shield, desc: "Brand safety" },
    ],
    process: [
      { step: "01", title: "Audience Analysis", desc: "Define audience segments using first and third-party data signals.", duration: "2–3 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Campaign Architecture", desc: "Design campaign structure, creative strategy, and bidding models.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Creative Production", desc: "Build dynamic, personalized ad creatives across formats and sizes.", duration: "3–5 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Launch & Optimize", desc: "Deploy campaigns with real-time bid optimization and frequency capping.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Attribution & Reporting", desc: "Multi-touch attribution analysis and transparent performance reporting.", duration: "Weekly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Globe, q: "What is programmatic advertising?", a: "Automated, data-driven ad buying that targets the right user at the right time across millions of websites." },
      { icon: Shield, q: "How do you ensure brand safety?", a: "We use DoubleVerify, whitelist/blacklist strategies, and contextual targeting to protect your brand." },
      { icon: Target, q: "What targeting options are available?", a: "Behavioral, contextual, geo-fencing, lookalike audiences, retargeting, and first-party data activation." },
      { icon: BarChart3, q: "What's the minimum budget?", a: "Programmatic works best at ₹1,00,000+/month for enough data to optimize effectively." },
    ],
    results: [
      { value: "85%", label: "Viewability Rate", icon: Eye, color: "from-blue-500 to-cyan-500" },
      { value: "-35%", label: "CPM Reduction", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
      { value: "10M+", label: "Impressions Monthly", icon: Globe, color: "from-green-500 to-emerald-500" },
      { value: "4x", label: "Better Targeting", icon: Target, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Start Programmatic",
  },
  "custom-development": {
    toolsSectionTitle: "Development Stack",
    toolsSectionSubtitle: "Modern technologies for scalable, high-performance applications.",
    tools: [
      { name: "React/Next.js", icon: Code, desc: "Frontend framework" },
      { name: "Node.js", icon: Server, desc: "Backend services" },
      { name: "PostgreSQL", icon: Database, desc: "Database" },
      { name: "AWS/GCP", icon: Cloud, desc: "Cloud infrastructure" },
      { name: "Docker", icon: Package, desc: "Containerization" },
      { name: "GitHub", icon: GitBranch, desc: "Version control" },
    ],
    process: [
      { step: "01", title: "Requirements Analysis", desc: "Document functional requirements, user stories, and technical specifications.", duration: "3–5 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Architecture Design", desc: "Design system architecture, database schema, and API structure.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Sprint Development", desc: "Agile development in 2-week sprints with regular demos and feedback.", duration: "4–12 Weeks", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Testing & QA", desc: "Unit tests, integration tests, security audits, and performance testing.", duration: "1–2 Weeks", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Deployment & Support", desc: "CI/CD setup, production deployment, monitoring, and ongoing maintenance.", duration: "Ongoing", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Code, q: "What technologies do you use?", a: "React, Next.js, Node.js, Python, PostgreSQL, MongoDB, AWS, and more based on project needs." },
      { icon: Shield, q: "How do you ensure code quality?", a: "Code reviews, automated testing, CI/CD pipelines, and adherence to industry best practices." },
      { icon: Settings, q: "Do you provide maintenance?", a: "Yes! We offer SLA-backed maintenance plans including bug fixes, updates, and feature enhancements." },
      { icon: Users, q: "Can you work with our existing team?", a: "Absolutely. We can augment your team or work independently based on your preference." },
    ],
    results: [
      { value: "50+", label: "Apps Delivered", icon: Code, color: "from-blue-500 to-cyan-500" },
      { value: "99.9%", label: "Uptime SLA", icon: Shield, color: "from-amber-500 to-orange-500" },
      { value: "Agile", label: "Development Process", icon: RefreshCcw, color: "from-green-500 to-emerald-500" },
      { value: "24/7", label: "Support Available", icon: Zap, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Start Your Project",
  },
  "conversion-ui-ux": {
    toolsSectionTitle: "UI/UX Design Tools",
    toolsSectionSubtitle: "Industry-standard tools for research, prototyping, and testing.",
    tools: [
      { name: "Figma", icon: Eye, desc: "Design & prototype" },
      { name: "Maze", icon: MousePointer2, desc: "Usability testing" },
      { name: "Hotjar", icon: Monitor, desc: "User behavior" },
      { name: "Miro", icon: Frame, desc: "Workshops" },
      { name: "Principle", icon: Layers, desc: "Micro-interactions" },
      { name: "Zeplin", icon: Code, desc: "Dev handoff" },
    ],
    process: [
      { step: "01", title: "User Research", desc: "Conduct user interviews, surveys, and analyze behavior data.", duration: "3–5 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Information Architecture", desc: "Define site structure, user flows, and navigation patterns.", duration: "2–3 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Wireframing", desc: "Create low and high-fidelity wireframes for key pages and flows.", duration: "3–5 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Visual Design", desc: "Apply brand identity to wireframes with polished UI design.", duration: "5–7 Days", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Usability Testing", desc: "Test with real users, iterate based on feedback, and validate decisions.", duration: "3–5 Days", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Eye, q: "What's the difference between UI and UX?", a: "UX is how users interact with your product (flows, usability). UI is how it looks (colors, typography, layout)." },
      { icon: Users, q: "Do you test with real users?", a: "Yes! We conduct usability tests with your target audience to validate every design decision." },
      { icon: Smartphone, q: "Do you design for mobile?", a: "Mobile-first always. Every design is responsive and optimized for touch interactions." },
      { icon: Code, q: "Do you provide developer-ready files?", a: "Yes! Design specs, component libraries, and interactive prototypes ready for development." },
    ],
    results: [
      { value: "50%", label: "Usability Improvement", icon: Eye, color: "from-blue-500 to-cyan-500" },
      { value: "35%", label: "Bounce Rate Reduction", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
      { value: "100+", label: "UX Projects", icon: Layout, color: "from-green-500 to-emerald-500" },
      { value: "9.5/10", label: "UX Score", icon: Star, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Improve Your UX",
  },
  "analytics-ai-technology": {
    toolsSectionTitle: "Analytics & AI Stack",
    toolsSectionSubtitle: "Advanced analytics platforms for actionable business intelligence.",
    tools: [
      { name: "Google Analytics 4", icon: LineChart, desc: "Web analytics" },
      { name: "Looker Studio", icon: BarChart3, desc: "Dashboards" },
      { name: "BigQuery", icon: Database, desc: "Data warehouse" },
      { name: "Tableau", icon: Eye, desc: "Visualization" },
      { name: "Python/R", icon: Code, desc: "Data science" },
      { name: "Power BI", icon: Monitor, desc: "Business intelligence" },
    ],
    process: [
      { step: "01", title: "Data Audit", desc: "Review tracking setup, identify gaps, and define measurement framework.", duration: "3–5 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Tracking Setup", desc: "Implement GA4, tag management, event tracking, and conversion pixels.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Dashboard Creation", desc: "Build custom dashboards with real-time KPIs and automated reports.", duration: "5–7 Days", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "AI Model Development", desc: "Build predictive models for churn, LTV, and attribution.", duration: "2–4 Weeks", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Insights & Action", desc: "Deliver actionable insights and train your team on data-driven decision making.", duration: "Ongoing", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: LineChart, q: "Do you set up GA4?", a: "Yes! We handle complete GA4 migration, event tracking, conversion setup, and custom reporting." },
      { icon: Brain, q: "What AI predictions can you build?", a: "Customer lifetime value, churn prediction, demand forecasting, and marketing attribution models." },
      { icon: Database, q: "Can you integrate multiple data sources?", a: "Yes. We connect CRM, ad platforms, web analytics, and sales data into unified dashboards." },
      { icon: Shield, q: "Is our data secure?", a: "Absolutely. We follow GDPR best practices, use encrypted connections, and limit data access." },
    ],
    results: [
      { value: "100+", label: "Dashboards Built", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
      { value: "90%", label: "Data Accuracy", icon: CheckCircle2, color: "from-amber-500 to-orange-500" },
      { value: "50%", label: "Faster Decisions", icon: Zap, color: "from-green-500 to-emerald-500" },
      { value: "3x", label: "Marketing ROI", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Get Data-Driven",
  },
  "saas-products": {
    toolsSectionTitle: "SaaS Development Stack",
    toolsSectionSubtitle: "Scalable technologies for building world-class SaaS products.",
    tools: [
      { name: "React/Next.js", icon: Code, desc: "Frontend" },
      { name: "Stripe", icon: CreditCard, desc: "Payments" },
      { name: "Auth0", icon: Shield, desc: "Authentication" },
      { name: "AWS", icon: Cloud, desc: "Infrastructure" },
      { name: "Prisma", icon: Database, desc: "ORM" },
      { name: "Vercel", icon: Rocket, desc: "Deployment" },
    ],
    process: [
      { step: "01", title: "Product Discovery", desc: "Define MVP scope, user personas, and product-market fit strategy.", duration: "1 Week", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "UX & Prototyping", desc: "Design user flows, wireframes, and interactive prototypes for validation.", duration: "1–2 Weeks", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "MVP Development", desc: "Build core features with scalable architecture and payment integration.", duration: "6–12 Weeks", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Beta & Feedback", desc: "Launch beta, gather user feedback, and iterate on the product.", duration: "2–4 Weeks", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Launch & Growth", desc: "Production launch, monitoring setup, and growth marketing integration.", duration: "Ongoing", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Rocket, q: "How long to build an MVP?", a: "Typically 8–12 weeks for a feature-complete MVP, depending on complexity." },
      { icon: CreditCard, q: "Do you handle subscription billing?", a: "Yes! We integrate Stripe/Razorpay with plans, trials, upgrades, and invoice management." },
      { icon: Users, q: "Can you build multi-tenant SaaS?", a: "Absolutely. We build scalable multi-tenant architectures with role-based access control." },
      { icon: Cloud, q: "Where will my SaaS be hosted?", a: "We recommend AWS or GCP with auto-scaling, CDN, and 99.9% uptime SLA." },
    ],
    results: [
      { value: "20+", label: "SaaS Products", icon: Rocket, color: "from-blue-500 to-cyan-500" },
      { value: "99.9%", label: "Uptime Guarantee", icon: Shield, color: "from-amber-500 to-orange-500" },
      { value: "10K+", label: "Users Onboarded", icon: Users, color: "from-green-500 to-emerald-500" },
      { value: "$5M+", label: "Revenue Enabled", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Build Your SaaS",
  },
  "growth-hacking": {
    toolsSectionTitle: "Growth Tools & Frameworks",
    toolsSectionSubtitle: "Proven frameworks and tools for rapid, sustainable growth.",
    tools: [
      { name: "Mixpanel", icon: LineChart, desc: "Product analytics" },
      { name: "Amplitude", icon: BarChart3, desc: "User behavior" },
      { name: "Zapier", icon: Zap, desc: "Automation" },
      { name: "Viral Loops", icon: Magnet, desc: "Referral programs" },
      { name: "Intercom", icon: MessageCircle, desc: "User engagement" },
      { name: "Notion", icon: ClipboardCheck, desc: "Experiment tracking" },
    ],
    process: [
      { step: "01", title: "Growth Audit", desc: "Analyze your funnel metrics, identify growth levers, and benchmark competitors.", duration: "3–5 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Experiment Backlog", desc: "Prioritize growth experiments using ICE scoring framework.", duration: "2–3 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Rapid Experimentation", desc: "Run 2–4 experiments per week across acquisition, activation, and retention.", duration: "Ongoing", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Scale Winners", desc: "Double down on experiments that work and build growth loops.", duration: "Ongoing", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Systematize", desc: "Build repeatable growth processes and train your team.", duration: "Monthly", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: Rocket, q: "What is growth hacking?", a: "A data-driven, experiment-heavy approach to finding scalable growth channels quickly and cost-effectively." },
      { icon: FlaskConical, q: "How many experiments do you run?", a: "We run 8–16 experiments per month across different growth levers to maximize learning velocity." },
      { icon: Target, q: "What metrics do you focus on?", a: "AARRR framework: Acquisition, Activation, Retention, Revenue, and Referral — your full growth funnel." },
      { icon: TrendingUp, q: "How fast can I see results?", a: "Quick wins within 2–4 weeks. Sustainable growth systems within 3 months." },
    ],
    results: [
      { value: "10x", label: "Growth Rate", icon: Rocket, color: "from-blue-500 to-cyan-500" },
      { value: "200+", label: "Experiments Run", icon: FlaskConical, color: "from-amber-500 to-orange-500" },
      { value: "65%", label: "Win Rate", icon: CheckCircle2, color: "from-green-500 to-emerald-500" },
      { value: "3x", label: "Revenue Growth", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Hack Your Growth",
  },
  "training-programs": {
    toolsSectionTitle: "Learning Platforms & Tools",
    toolsSectionSubtitle: "Interactive tools and platforms for hands-on digital marketing training.",
    tools: [
      { name: "Google Ads", icon: Search, desc: "Live campaigns" },
      { name: "Meta Business", icon: Share2, desc: "Social ads training" },
      { name: "GA4", icon: LineChart, desc: "Analytics hands-on" },
      { name: "SEMrush", icon: BarChart3, desc: "SEO training" },
      { name: "Canva", icon: Palette, desc: "Design basics" },
      { name: "HubSpot Academy", icon: GraduationCap, desc: "Certifications" },
    ],
    process: [
      { step: "01", title: "Needs Assessment", desc: "Evaluate team skills, identify gaps, and define learning objectives.", duration: "1–2 Days", color: "from-blue-500 to-cyan-500" },
      { step: "02", title: "Custom Curriculum", desc: "Design a tailored training program with relevant case studies and exercises.", duration: "3–5 Days", color: "from-purple-500 to-pink-500" },
      { step: "03", title: "Live Training", desc: "Interactive workshops with hands-on exercises, Q&A, and real-world examples.", duration: "1–4 Weeks", color: "from-amber-500 to-orange-500" },
      { step: "04", title: "Practice & Projects", desc: "Assign real projects for hands-on practice with mentor guidance.", duration: "2–4 Weeks", color: "from-green-500 to-emerald-500" },
      { step: "05", title: "Assessment & Certification", desc: "Final assessment, feedback, and Digital Bull certification on completion.", duration: "1–2 Days", color: "from-rose-500 to-red-500" },
    ],
    faqs: [
      { icon: GraduationCap, q: "Who are the trainers?", a: "Industry practitioners with 10+ years experience, not just theorists. Learn from people who do it daily." },
      { icon: Users, q: "Is training available for teams?", a: "Yes! We offer corporate training programs customized for teams of all sizes." },
      { icon: BookOpen, q: "Do you provide study materials?", a: "Yes. Comprehensive handbooks, video recordings, templates, and lifetime access to resources." },
      { icon: Star, q: "Do you offer certifications?", a: "Yes! Digital Bull Technology certification upon completion, plus guidance for Google/Meta certifications." },
    ],
    results: [
      { value: "1000+", label: "Students Trained", icon: GraduationCap, color: "from-blue-500 to-cyan-500" },
      { value: "95%", label: "Satisfaction Rate", icon: Star, color: "from-amber-500 to-orange-500" },
      { value: "80%", label: "Placement Rate", icon: Users, color: "from-green-500 to-emerald-500" },
      { value: "4.9/5", label: "Avg Rating", icon: CheckCircle2, color: "from-purple-500 to-pink-500" },
    ],
    ctaText: "Start Learning",
  },
};

interface ServiceExtraSectionsProps {
  slug: string;
  subtitle: string;
}

const ServiceExtraSections = ({ slug, subtitle }: ServiceExtraSectionsProps) => {
  const data = serviceExtras[slug];
  if (!data) return null;

  return (
    <>
      {/* Results Metrics */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Proven Results
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our <span className="text-gradient">{subtitle}</span> Impact
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {data.results.map((metric, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:border-primary/50 hover:shadow-lg transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
              Our Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.toolsSectionTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{data.toolsSectionSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {data.tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="bg-card rounded-2xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm">{tool.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Deliver <span className="text-gradient">{subtitle}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A transparent, milestone-driven workflow that keeps you informed at every stage.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-8">
              {data.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  className={`flex flex-col md:flex-row items-start gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="flex-1">
                    <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md`}>
                          <span className="text-sm font-bold text-white">{step.step}</span>
                        </div>
                        <span className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-4 flex-shrink-0 mt-8">
                    <motion.div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${step.color} shadow-lg ring-4 ring-background`}
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                    />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
              Quick Answers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {subtitle} <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {data.faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <faq.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/contact">
                {data.ctaText}
                <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceExtraSections;
