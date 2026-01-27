// SEO-friendly link injection for blog articles
// Adds natural internal links to related services/articles and high-authority external links

export interface SeoLink {
  keywords: string[];
  href: string;
  title: string;
  isExternal?: boolean;
}

// Internal links to services with relevant anchor text
export const serviceLinks: SeoLink[] = [
  // SEO Related
  { keywords: ["seo", "search engine optimization", "seo strategy", "seo services"], href: "/services/seo", title: "SEO Services" },
  { keywords: ["on-page seo", "on page optimization"], href: "/services/seo/on-page-seo", title: "On-Page SEO" },
  { keywords: ["technical seo", "site speed", "core web vitals"], href: "/services/seo/technical-seo", title: "Technical SEO" },
  { keywords: ["local seo", "google business profile", "local search"], href: "/services/seo/local-seo", title: "Local SEO" },
  { keywords: ["link building", "backlinks", "off-page seo"], href: "/services/seo/off-page-seo", title: "Off-Page SEO" },
  
  // Content Marketing
  { keywords: ["content marketing", "content strategy", "blog writing"], href: "/services/content-marketing", title: "Content Marketing Services" },
  { keywords: ["content creation", "copywriting", "website copy"], href: "/services/content-marketing/content-creation", title: "Content Creation" },
  
  // PPC & Advertising
  { keywords: ["ppc", "pay-per-click", "paid advertising", "google ads", "paid media"], href: "/services/ppc", title: "PPC Advertising" },
  { keywords: ["remarketing", "retargeting", "display ads"], href: "/services/ppc/remarketing-retargeting", title: "Remarketing Services" },
  { keywords: ["programmatic advertising", "programmatic ads"], href: "/services/programmatic-advertising", title: "Programmatic Advertising" },
  
  // Social Media
  { keywords: ["social media marketing", "social media strategy", "social media management"], href: "/services/social-media", title: "Social Media Marketing" },
  { keywords: ["facebook ads", "instagram ads", "meta ads"], href: "/services/social-media/social-media-paid", title: "Paid Social Media" },
  { keywords: ["social media analytics", "social listening"], href: "/services/social-media/social-media-analytics", title: "Social Media Analytics" },
  
  // Web Design & Development
  { keywords: ["web design", "website design", "responsive design"], href: "/services/web-design", title: "Web Design Services" },
  { keywords: ["web development", "website development", "frontend development"], href: "/services/web-design/website-development", title: "Web Development" },
  { keywords: ["landing page", "landing pages", "conversion optimization"], href: "/services/conversion-optimization", title: "Conversion Optimization" },
  { keywords: ["custom development", "custom software", "web applications"], href: "/services/custom-development", title: "Custom Development" },
  
  // E-commerce
  { keywords: ["ecommerce", "e-commerce", "online store", "ecommerce marketing"], href: "/services/ecommerce-marketing", title: "E-commerce Marketing" },
  { keywords: ["amazon marketing", "amazon ads", "amazon seller"], href: "/services/amazon-marketing", title: "Amazon Marketing" },
  { keywords: ["shopify", "woocommerce", "online shop"], href: "/services/ecommerce-marketing", title: "E-commerce Solutions" },
  
  // Email Marketing
  { keywords: ["email marketing", "email campaigns", "email automation"], href: "/services/email-marketing", title: "Email Marketing Services" },
  { keywords: ["drip campaigns", "marketing automation", "lead nurturing"], href: "/services/email-marketing/email-automation", title: "Email Automation" },
  
  // AI & Analytics
  { keywords: ["ai marketing", "artificial intelligence marketing", "machine learning marketing"], href: "/services/ai-marketing", title: "AI Marketing Services" },
  { keywords: ["analytics", "data analytics", "marketing analytics", "google analytics"], href: "/services/analytics-ai", title: "Analytics & AI" },
  { keywords: ["predictive analytics", "data-driven marketing"], href: "/services/analytics-ai", title: "Marketing Analytics" },
  
  // Video & Branding
  { keywords: ["video marketing", "video content", "youtube marketing"], href: "/services/video-marketing", title: "Video Marketing" },
  { keywords: ["branding", "brand identity", "brand design"], href: "/services/branding-design", title: "Branding & Design" },
  
  // Other pages
  { keywords: ["digital marketing agency", "marketing agency"], href: "/about", title: "About Digital Bull" },
  { keywords: ["case studies", "success stories", "client results"], href: "/case-studies", title: "Our Case Studies" },
  { keywords: ["free seo tools", "marketing tools", "seo checker"], href: "/free-tools", title: "Free Marketing Tools" },
  { keywords: ["digital marketing course", "marketing training"], href: "/academy", title: "Digital Marketing Academy" },
];

// High-authority external links for credibility
export const authorityLinks: SeoLink[] = [
  // Google Resources
  { keywords: ["google search console", "search console"], href: "https://search.google.com/search-console", title: "Google Search Console", isExternal: true },
  { keywords: ["google analytics 4", "ga4"], href: "https://analytics.google.com/", title: "Google Analytics", isExternal: true },
  { keywords: ["google business profile", "google my business"], href: "https://business.google.com/", title: "Google Business Profile", isExternal: true },
  { keywords: ["google ads", "google advertising"], href: "https://ads.google.com/", title: "Google Ads", isExternal: true },
  { keywords: ["core web vitals", "page experience"], href: "https://web.dev/vitals/", title: "Core Web Vitals - web.dev", isExternal: true },
  
  // Industry Standards & Definitions
  { keywords: ["e-e-a-t", "e-a-t", "expertise authoritativeness"], href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", title: "Google's Helpful Content Guidelines", isExternal: true },
  { keywords: ["schema markup", "structured data"], href: "https://schema.org/", title: "Schema.org", isExternal: true },
  { keywords: ["gdpr", "data protection"], href: "https://gdpr.eu/", title: "GDPR Official Resource", isExternal: true },
  { keywords: ["wcag", "web accessibility", "accessibility guidelines"], href: "https://www.w3.org/WAI/WCAG21/quickref/", title: "WCAG Guidelines - W3C", isExternal: true },
  
  // Wikipedia References
  { keywords: ["search engine optimization"], href: "https://en.wikipedia.org/wiki/Search_engine_optimization", title: "SEO - Wikipedia", isExternal: true },
  { keywords: ["digital marketing"], href: "https://en.wikipedia.org/wiki/Digital_marketing", title: "Digital Marketing - Wikipedia", isExternal: true },
  { keywords: ["artificial intelligence"], href: "https://en.wikipedia.org/wiki/Artificial_intelligence", title: "AI - Wikipedia", isExternal: true },
  { keywords: ["machine learning"], href: "https://en.wikipedia.org/wiki/Machine_learning", title: "Machine Learning - Wikipedia", isExternal: true },
  { keywords: ["conversion rate"], href: "https://en.wikipedia.org/wiki/Conversion_marketing", title: "Conversion Marketing - Wikipedia", isExternal: true },
  { keywords: ["roi", "return on investment"], href: "https://en.wikipedia.org/wiki/Return_on_investment", title: "ROI - Wikipedia", isExternal: true },
  
  // Industry Tools & Resources
  { keywords: ["semrush", "ahrefs", "moz"], href: "https://moz.com/beginners-guide-to-seo", title: "Moz SEO Guide", isExternal: true },
  { keywords: ["pagespeed insights", "page speed"], href: "https://pagespeed.web.dev/", title: "PageSpeed Insights - Google", isExternal: true },
  { keywords: ["mobile-first indexing"], href: "https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing", title: "Mobile-First Indexing - Google", isExternal: true },
  
  // Government & Official
  { keywords: ["ftc guidelines", "advertising guidelines"], href: "https://www.ftc.gov/business-guidance/advertising-marketing", title: "FTC Advertising Guidelines", isExternal: true },
  { keywords: ["can-spam", "email regulations"], href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business", title: "CAN-SPAM Act - FTC", isExternal: true },
  
  // Research & Statistics
  { keywords: ["statista", "market research"], href: "https://www.statista.com/", title: "Statista", isExternal: true },
  { keywords: ["hubspot", "inbound marketing"], href: "https://www.hubspot.com/", title: "HubSpot", isExternal: true },
];

// Blog article internal links
export const blogLinks: SeoLink[] = [
  { keywords: ["google sge", "search generative experience", "ai search"], href: "/blog/google-search-generative-experience-2026", title: "Google SGE Guide" },
  { keywords: ["ai marketing automation", "marketing automation trends"], href: "/blog/ai-marketing-automation-trends-2026", title: "AI Marketing Automation" },
  { keywords: ["responsive web design", "mobile-first design"], href: "/blog/responsive-web-design-best-practices-2026", title: "Responsive Design Best Practices" },
  { keywords: ["social media algorithm", "algorithm changes"], href: "/blog/social-media-algorithm-changes-january-2026", title: "Social Media Algorithm Updates" },
  { keywords: ["ecommerce marketing strategy"], href: "/blog/ecommerce-marketing-strategies-2026", title: "E-commerce Marketing Strategies" },
  { keywords: ["local seo guide", "local business marketing"], href: "/blog/local-seo-guide-small-businesses-2026", title: "Local SEO Guide" },
];

interface LinkInjectionResult {
  content: string;
  linksAdded: number;
  internalLinksCount: number;
  externalLinksCount: number;
}

// Configuration for link injection
const LINK_CONFIG = {
  maxInternalLinks: 5, // Maximum internal links per article
  maxExternalLinks: 3, // Maximum external links per article
  minDistanceBetweenLinks: 150, // Minimum characters between links
  excludeFromLinking: ['conclusion', 'summary', 'introduction'], // Don't link in these sections
};

/**
 * Injects SEO-friendly links into blog content
 * - Adds contextual internal links to related services and articles
 * - Adds high-authority external links for credibility
 * - Uses natural anchor text
 * - Avoids over-linking
 */
export function injectSeoLinks(content: string, currentSlug?: string): LinkInjectionResult {
  let modifiedContent = content;
  let linksAdded = 0;
  let internalLinksCount = 0;
  let externalLinksCount = 0;
  const linkedPositions: number[] = [];
  const linkedKeywords = new Set<string>();
  
  // Combine all links, prioritizing internal links
  const allInternalLinks = [...serviceLinks, ...blogLinks.filter(l => l.href !== `/blog/${currentSlug}`)];
  const allExternalLinks = [...authorityLinks];
  
  // Sort by keyword length (longer keywords first for more specific matches)
  const sortByKeywordLength = (a: SeoLink, b: SeoLink) => {
    const aMaxLen = Math.max(...a.keywords.map(k => k.length));
    const bMaxLen = Math.max(...b.keywords.map(k => k.length));
    return bMaxLen - aMaxLen;
  };
  
  allInternalLinks.sort(sortByKeywordLength);
  allExternalLinks.sort(sortByKeywordLength);
  
  // Helper to check if position is too close to existing links
  const isTooCloseToExistingLink = (position: number): boolean => {
    return linkedPositions.some(pos => Math.abs(pos - position) < LINK_CONFIG.minDistanceBetweenLinks);
  };
  
  // Helper to create link HTML
  const createLinkHtml = (text: string, href: string, title: string, isExternal: boolean): string => {
    const externalAttrs = isExternal 
      ? 'target="_blank" rel="noopener noreferrer"' 
      : '';
    const linkClass = isExternal 
      ? 'text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors inline-flex items-center gap-1'
      : 'text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors font-medium';
    
    const externalIcon = isExternal 
      ? '<svg class="inline w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>'
      : '';
    
    return `<a href="${href}" title="${title}" class="${linkClass}" ${externalAttrs}>${text}${externalIcon}</a>`;
  };
  
  // Process internal links first
  for (const link of allInternalLinks) {
    if (internalLinksCount >= LINK_CONFIG.maxInternalLinks) break;
    
    for (const keyword of link.keywords) {
      if (linkedKeywords.has(keyword.toLowerCase())) continue;
      if (internalLinksCount >= LINK_CONFIG.maxInternalLinks) break;
      
      // Create regex for case-insensitive word boundary match
      // Avoid matching inside existing HTML tags or links
      const regex = new RegExp(
        `(?<!<[^>]*?)(?<!href="[^"]*?)(?<!title="[^"]*?)\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?![^<]*?>)`,
        'gi'
      );
      
      let match;
      let found = false;
      
      while ((match = regex.exec(modifiedContent)) !== null) {
        const position = match.index;
        
        // Skip if too close to existing link
        if (isTooCloseToExistingLink(position)) continue;
        
        // Skip if inside code block or already linked
        const beforeMatch = modifiedContent.substring(Math.max(0, position - 50), position);
        if (beforeMatch.includes('<a ') || beforeMatch.includes('<code')) continue;
        
        // Replace only the first valid occurrence
        const linkHtml = createLinkHtml(match[1], link.href, link.title, false);
        modifiedContent = modifiedContent.substring(0, position) + linkHtml + modifiedContent.substring(position + match[1].length);
        
        linkedPositions.push(position);
        linkedKeywords.add(keyword.toLowerCase());
        link.keywords.forEach(k => linkedKeywords.add(k.toLowerCase()));
        internalLinksCount++;
        linksAdded++;
        found = true;
        break;
      }
      
      if (found) break;
    }
  }
  
  // Process external links
  for (const link of allExternalLinks) {
    if (externalLinksCount >= LINK_CONFIG.maxExternalLinks) break;
    
    for (const keyword of link.keywords) {
      if (linkedKeywords.has(keyword.toLowerCase())) continue;
      if (externalLinksCount >= LINK_CONFIG.maxExternalLinks) break;
      
      const regex = new RegExp(
        `(?<!<[^>]*?)(?<!href="[^"]*?)(?<!title="[^"]*?)\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?![^<]*?>)`,
        'gi'
      );
      
      let match;
      let found = false;
      
      while ((match = regex.exec(modifiedContent)) !== null) {
        const position = match.index;
        
        if (isTooCloseToExistingLink(position)) continue;
        
        const beforeMatch = modifiedContent.substring(Math.max(0, position - 50), position);
        if (beforeMatch.includes('<a ') || beforeMatch.includes('<code')) continue;
        
        const linkHtml = createLinkHtml(match[1], link.href, link.title, true);
        modifiedContent = modifiedContent.substring(0, position) + linkHtml + modifiedContent.substring(position + match[1].length);
        
        linkedPositions.push(position);
        linkedKeywords.add(keyword.toLowerCase());
        link.keywords.forEach(k => linkedKeywords.add(k.toLowerCase()));
        externalLinksCount++;
        linksAdded++;
        found = true;
        break;
      }
      
      if (found) break;
    }
  }
  
  return {
    content: modifiedContent,
    linksAdded,
    internalLinksCount,
    externalLinksCount,
  };
}

/**
 * Get recommended reading based on category and tags
 */
export function getRecommendedReading(currentSlug: string, category: string, tags: string[]): SeoLink[] {
  // Filter out current article
  const availableLinks = blogLinks.filter(link => !link.href.includes(currentSlug));
  
  // Score links by relevance to tags
  const scoredLinks = availableLinks.map(link => {
    let score = 0;
    const linkKeywords = link.keywords.join(' ').toLowerCase();
    
    tags.forEach(tag => {
      if (linkKeywords.includes(tag.toLowerCase())) {
        score += 2;
      }
    });
    
    if (linkKeywords.includes(category.toLowerCase())) {
      score += 3;
    }
    
    return { ...link, score };
  });
  
  // Sort by score and return top 3
  return scoredLinks
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/**
 * Get category-specific external authority links
 */
export function getCategoryAuthorityLinks(category: string): SeoLink[] {
  const categoryLinks: Record<string, SeoLink[]> = {
    "SEO": [
      { keywords: ["Google Search Console"], href: "https://search.google.com/search-console", title: "Google Search Console", isExternal: true },
      { keywords: ["Moz SEO Guide"], href: "https://moz.com/beginners-guide-to-seo", title: "Moz Beginner's Guide to SEO", isExternal: true },
    ],
    "AI Marketing": [
      { keywords: ["Google AI"], href: "https://ai.google/", title: "Google AI", isExternal: true },
      { keywords: ["HubSpot AI"], href: "https://www.hubspot.com/artificial-intelligence", title: "HubSpot AI Resources", isExternal: true },
    ],
    "Web Design": [
      { keywords: ["web.dev"], href: "https://web.dev/", title: "web.dev by Google", isExternal: true },
      { keywords: ["W3C Standards"], href: "https://www.w3.org/standards/", title: "W3C Web Standards", isExternal: true },
    ],
    "Social Media": [
      { keywords: ["Meta Business"], href: "https://business.facebook.com/", title: "Meta Business Suite", isExternal: true },
      { keywords: ["Sprout Social"], href: "https://sproutsocial.com/insights/", title: "Sprout Social Insights", isExternal: true },
    ],
    "E-commerce": [
      { keywords: ["Shopify Learn"], href: "https://www.shopify.com/learn", title: "Shopify Learn", isExternal: true },
      { keywords: ["Google Merchant Center"], href: "https://merchants.google.com/", title: "Google Merchant Center", isExternal: true },
    ],
  };
  
  return categoryLinks[category] || categoryLinks["SEO"];
}
