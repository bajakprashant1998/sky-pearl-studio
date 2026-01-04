import { 
  Search, 
  Zap, 
  FileText, 
  Image, 
  Key, 
  Link, 
  Users, 
  Tag, 
  Type, 
  Code 
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface FreeTool {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  fullDescription: string;
  color: string;
  gradient: string;
  features: string[];
  howItWorks: string[];
}

export const freeToolsData: FreeTool[] = [
  {
    id: "seo-checker",
    slug: "seo-checker",
    icon: Search,
    title: "Free SEO Checker",
    shortDescription: "Analyze your website's SEO health and get actionable recommendations",
    fullDescription: "Our comprehensive SEO checker analyzes your website for on-page SEO factors including meta tags, headings, content quality, and technical issues. Get instant insights to improve your search rankings.",
    color: "text-blue-500",
    gradient: "from-blue-500 to-blue-600",
    features: [
      "Title tag and meta description analysis",
      "Heading structure review",
      "Image alt text checker",
      "Mobile-friendliness assessment",
      "Page load speed insights"
    ],
    howItWorks: [
      "Enter your website URL",
      "Our tool crawls and analyzes your page",
      "Receive detailed SEO report",
      "Get actionable recommendations"
    ]
  },
  {
    id: "speed-test",
    slug: "speed-test",
    icon: Zap,
    title: "Website Speed Test",
    shortDescription: "Test your website's loading speed and performance metrics",
    fullDescription: "Check your website's performance with our speed test tool. Measure load times, identify bottlenecks, and get recommendations to improve your site's speed for better user experience and SEO.",
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Page load time measurement",
      "Performance score calculation",
      "Resource loading analysis",
      "Mobile vs desktop comparison",
      "Core Web Vitals metrics"
    ],
    howItWorks: [
      "Enter your website URL",
      "Select device type (mobile/desktop)",
      "Run the speed test",
      "Get detailed performance report"
    ]
  },
  {
    id: "ai-content-generator",
    slug: "ai-content-generator",
    icon: FileText,
    title: "AI Content Generator",
    shortDescription: "Generate high-quality marketing content with AI assistance",
    fullDescription: "Create engaging blog posts, social media content, product descriptions, and more with our AI-powered content generator. Perfect for marketers and content creators.",
    color: "text-purple-500",
    gradient: "from-purple-500 to-purple-600",
    features: [
      "Blog post generation",
      "Social media captions",
      "Product descriptions",
      "Email copy creation",
      "Multiple tone options"
    ],
    howItWorks: [
      "Select content type",
      "Enter your topic or keywords",
      "Choose tone and style",
      "Generate and refine content"
    ]
  },
  {
    id: "ai-image-generator",
    slug: "ai-image-generator",
    icon: Image,
    title: "AI Image Generator",
    shortDescription: "Create stunning visuals for your marketing campaigns",
    fullDescription: "Generate unique, high-quality images for your marketing materials using AI. Perfect for social media posts, blog headers, and advertising campaigns.",
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Text-to-image generation",
      "Multiple style options",
      "Various aspect ratios",
      "High-resolution output",
      "Commercial use allowed"
    ],
    howItWorks: [
      "Describe your desired image",
      "Select style and dimensions",
      "Generate image",
      "Download in high resolution"
    ]
  },
  {
    id: "keyword-research",
    slug: "keyword-research",
    icon: Key,
    title: "Keyword Research Tool",
    shortDescription: "Discover high-value keywords for your SEO strategy",
    fullDescription: "Find the best keywords for your content strategy. Analyze search volume, competition, and trends to identify opportunities that drive traffic.",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Search volume data",
      "Keyword difficulty score",
      "Related keyword suggestions",
      "Long-tail keyword finder",
      "Trend analysis"
    ],
    howItWorks: [
      "Enter seed keyword",
      "Select target location",
      "Analyze keyword metrics",
      "Export keyword list"
    ]
  },
  {
    id: "backlink-checker",
    slug: "backlink-checker",
    icon: Link,
    title: "Backlink Checker",
    shortDescription: "Analyze your website's backlink profile and authority",
    fullDescription: "Check your website's backlinks, domain authority, and link quality. Identify toxic links and discover new link building opportunities.",
    color: "text-cyan-500",
    gradient: "from-cyan-500 to-teal-500",
    features: [
      "Backlink count and quality",
      "Domain authority score",
      "Referring domains analysis",
      "Anchor text distribution",
      "New/lost link tracking"
    ],
    howItWorks: [
      "Enter your domain",
      "Scan backlink profile",
      "Review link quality metrics",
      "Export detailed report"
    ]
  },
  {
    id: "competitor-analyzer",
    slug: "competitor-analyzer",
    icon: Users,
    title: "Competitor Analyzer",
    shortDescription: "Spy on competitors' SEO strategies and rankings",
    fullDescription: "Analyze your competitors' online presence, keywords, and strategies. Discover what's working for them and find opportunities to outrank them.",
    color: "text-red-500",
    gradient: "from-red-500 to-orange-500",
    features: [
      "Traffic estimation",
      "Top ranking keywords",
      "Content gap analysis",
      "Backlink comparison",
      "Social media presence"
    ],
    howItWorks: [
      "Enter competitor URL",
      "Run comprehensive analysis",
      "Compare with your site",
      "Identify opportunities"
    ]
  },
  {
    id: "meta-tag-generator",
    slug: "meta-tag-generator",
    icon: Tag,
    title: "Meta Tag Generator",
    shortDescription: "Create SEO-optimized meta tags for your pages",
    fullDescription: "Generate perfect meta titles and descriptions that improve click-through rates and search rankings. Preview how your pages will appear in search results.",
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-violet-500",
    features: [
      "Title tag optimization",
      "Meta description generator",
      "Character count validation",
      "SERP preview",
      "Open Graph tags"
    ],
    howItWorks: [
      "Enter page details",
      "Generate meta tags",
      "Preview in search results",
      "Copy optimized tags"
    ]
  },
  {
    id: "headline-analyzer",
    slug: "headline-analyzer",
    icon: Type,
    title: "Headline Analyzer",
    shortDescription: "Create compelling headlines that drive clicks",
    fullDescription: "Analyze and improve your headlines for maximum impact. Our tool evaluates emotional appeal, power words, and structure to help you write headlines that convert.",
    color: "text-amber-500",
    gradient: "from-amber-500 to-yellow-500",
    features: [
      "Emotional score analysis",
      "Power word detection",
      "Length optimization",
      "Readability check",
      "A/B test suggestions"
    ],
    howItWorks: [
      "Enter your headline",
      "Get instant analysis",
      "Review improvement tips",
      "Test alternative versions"
    ]
  },
  {
    id: "schema-markup-generator",
    slug: "schema-markup-generator",
    icon: Code,
    title: "Schema Markup Generator",
    shortDescription: "Generate structured data for rich search results",
    fullDescription: "Create JSON-LD schema markup for your website to enhance search visibility with rich snippets. Support for articles, products, FAQs, and more.",
    color: "text-slate-500",
    gradient: "from-slate-500 to-gray-600",
    features: [
      "Multiple schema types",
      "JSON-LD format",
      "Google-compliant code",
      "Validation included",
      "Easy copy & paste"
    ],
    howItWorks: [
      "Select schema type",
      "Fill in required fields",
      "Generate markup code",
      "Add to your website"
    ]
  }
];

export const getToolBySlug = (slug: string): FreeTool | undefined => {
  return freeToolsData.find(tool => tool.slug === slug);
};
