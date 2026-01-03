import { TrendingUp, Users, DollarSign, Target, Zap, Shield } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ImpactPoint {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  stat: string;
  statLabel: string;
  color: string;
  fullDescription: string;
  benefits: string[];
  caseStudy: {
    company: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
  };
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const businessImpactData: ImpactPoint[] = [
  {
    id: "revenue-growth",
    slug: "revenue-growth",
    icon: TrendingUp,
    title: "Revenue Growth",
    shortDescription: "Drive sustainable revenue increases through data-driven marketing strategies and optimized customer acquisition.",
    stat: "247%",
    statLabel: "Average Revenue Increase",
    color: "from-blue-500 to-blue-600",
    fullDescription: "Our comprehensive revenue growth strategies combine advanced analytics, conversion optimization, and multi-channel marketing to create sustainable revenue streams. We analyze your entire customer journey to identify high-impact opportunities and implement proven tactics that deliver measurable results.",
    benefits: [
      "Increased customer lifetime value through retention strategies",
      "Higher conversion rates across all marketing channels",
      "Optimized pricing strategies based on market analysis",
      "Predictive analytics for revenue forecasting",
      "Automated revenue tracking and reporting dashboards"
    ],
    caseStudy: {
      company: "TechScale Solutions",
      industry: "B2B SaaS",
      challenge: "Struggling to scale revenue beyond $2M ARR despite having a quality product",
      solution: "Implemented integrated inbound marketing, optimized pricing tiers, and built automated nurture sequences",
      results: [
        "247% revenue growth in 18 months",
        "Customer acquisition cost reduced by 45%",
        "Average deal size increased by 67%",
        "Sales cycle shortened from 90 to 45 days"
      ]
    },
    process: [
      { step: 1, title: "Revenue Audit", description: "Deep analysis of current revenue streams and growth opportunities" },
      { step: 2, title: "Strategy Development", description: "Create customized growth roadmap with clear milestones" },
      { step: 3, title: "Implementation", description: "Execute multi-channel campaigns with continuous optimization" },
      { step: 4, title: "Scale & Optimize", description: "Double down on winning strategies and expand reach" }
    ],
    testimonial: {
      quote: "Digital Bull Technology didn't just increase our revenue—they transformed our entire go-to-market approach. The results exceeded our projections by 3x.",
      author: "Rajesh Patel",
      role: "CEO, TechScale Solutions"
    }
  },
  {
    id: "lead-generation",
    slug: "lead-generation",
    icon: Users,
    title: "Lead Generation",
    shortDescription: "Generate qualified leads at scale with targeted campaigns that connect you with your ideal customers.",
    stat: "10M+",
    statLabel: "Leads Generated",
    color: "from-green-500 to-green-600",
    fullDescription: "Our lead generation engine combines precision targeting, compelling content, and advanced automation to deliver a consistent flow of qualified prospects. We focus on quality over quantity, ensuring every lead has genuine potential to become a valuable customer.",
    benefits: [
      "Highly targeted audience segmentation",
      "Multi-channel lead capture strategies",
      "Automated lead scoring and qualification",
      "Personalized nurture sequences",
      "Real-time lead analytics and insights"
    ],
    caseStudy: {
      company: "GrowthFirst Marketing",
      industry: "Financial Services",
      challenge: "Inconsistent lead flow and high cost per qualified lead",
      solution: "Deployed AI-powered targeting, created gated premium content, and built sophisticated nurture workflows",
      results: [
        "312% increase in qualified leads",
        "Cost per lead reduced by 58%",
        "Lead-to-customer conversion up 89%",
        "Sales pipeline value grew by $4.2M"
      ]
    },
    process: [
      { step: 1, title: "Audience Research", description: "Define ideal customer profiles and buyer personas" },
      { step: 2, title: "Channel Strategy", description: "Identify highest-performing lead generation channels" },
      { step: 3, title: "Campaign Launch", description: "Deploy targeted campaigns with compelling offers" },
      { step: 4, title: "Optimize & Nurture", description: "Refine targeting and convert leads to customers" }
    ],
    testimonial: {
      quote: "The quality of leads we receive now is remarkable. Our sales team is finally focused on closing deals instead of qualifying prospects.",
      author: "Priya Sharma",
      role: "VP Sales, GrowthFirst Marketing"
    }
  },
  {
    id: "roi-maximization",
    slug: "roi-maximization",
    icon: DollarSign,
    title: "ROI Maximization",
    shortDescription: "Maximize return on every marketing dollar through intelligent budget allocation and performance optimization.",
    stat: "3.2x",
    statLabel: "Average ROI",
    color: "from-purple-500 to-purple-600",
    fullDescription: "We treat your marketing budget as an investment that demands returns. Our data-driven approach ensures every rupee is allocated to the highest-performing channels and campaigns, with continuous optimization to maximize your marketing ROI.",
    benefits: [
      "Transparent ROI tracking across all channels",
      "Budget allocation based on performance data",
      "Continuous A/B testing and optimization",
      "Attribution modeling for accurate measurement",
      "Monthly ROI reports with actionable insights"
    ],
    caseStudy: {
      company: "RetailMax India",
      industry: "E-commerce",
      challenge: "Marketing spend not translating to proportional revenue growth",
      solution: "Implemented cross-channel attribution, reallocated budget to high-performers, and optimized ad creative",
      results: [
        "ROI improved from 1.8x to 4.7x",
        "Ad spend efficiency increased by 162%",
        "Customer acquisition cost down 41%",
        "Revenue per marketing rupee up 320%"
      ]
    },
    process: [
      { step: 1, title: "Performance Audit", description: "Analyze current ROI across all marketing activities" },
      { step: 2, title: "Attribution Setup", description: "Implement accurate multi-touch attribution" },
      { step: 3, title: "Budget Optimization", description: "Reallocate spend to highest-performing channels" },
      { step: 4, title: "Continuous Improvement", description: "Ongoing testing and optimization for maximum returns" }
    ],
    testimonial: {
      quote: "Finally, marketing that makes financial sense. We now know exactly what works and why, and our CFO loves the reports.",
      author: "Amit Verma",
      role: "Marketing Director, RetailMax India"
    }
  },
  {
    id: "brand-visibility",
    slug: "brand-visibility",
    icon: Target,
    title: "Brand Visibility",
    shortDescription: "Build powerful brand presence that captures attention and establishes authority in your market.",
    stat: "500%",
    statLabel: "Visibility Increase",
    color: "from-orange-500 to-orange-600",
    fullDescription: "Brand visibility is the foundation of sustainable growth. We build comprehensive brand awareness strategies that put your business in front of the right audience across search, social, and display channels, creating lasting impressions that drive recognition and trust.",
    benefits: [
      "Increased brand search volume and mentions",
      "Improved share of voice in your industry",
      "Consistent brand messaging across channels",
      "Thought leadership content strategy",
      "Strategic PR and media placement"
    ],
    caseStudy: {
      company: "InnovateTech Labs",
      industry: "Technology",
      challenge: "New entrant struggling to compete with established players for visibility",
      solution: "Created comprehensive brand awareness campaign combining content, social, SEO, and strategic partnerships",
      results: [
        "Brand search volume up 500%",
        "Social media following grew to 150K+",
        "Featured in 25+ industry publications",
        "Market share increased from 2% to 12%"
      ]
    },
    process: [
      { step: 1, title: "Brand Audit", description: "Assess current brand perception and competitive position" },
      { step: 2, title: "Strategy Creation", description: "Develop multi-channel visibility roadmap" },
      { step: 3, title: "Content & Outreach", description: "Execute content marketing and PR campaigns" },
      { step: 4, title: "Authority Building", description: "Establish thought leadership and industry presence" }
    ],
    testimonial: {
      quote: "We went from being unknown to being the go-to name in our space. The visibility transformation has been incredible.",
      author: "Deepika Nair",
      role: "Founder, InnovateTech Labs"
    }
  },
  {
    id: "conversion-optimization",
    slug: "conversion-optimization",
    icon: Zap,
    title: "Conversion Optimization",
    shortDescription: "Turn more visitors into customers with data-backed optimization and user experience improvements.",
    stat: "156%",
    statLabel: "Conversion Rate Lift",
    color: "from-cyan-500 to-cyan-600",
    fullDescription: "Every visitor represents an opportunity. Our conversion rate optimization (CRO) program uses behavioral analytics, user testing, and systematic experimentation to remove friction and persuade more visitors to take action, maximizing the value of your existing traffic.",
    benefits: [
      "Comprehensive conversion funnel analysis",
      "User behavior tracking and heatmaps",
      "A/B and multivariate testing programs",
      "Landing page optimization",
      "Form and checkout flow improvements"
    ],
    caseStudy: {
      company: "ShopEase Online",
      industry: "E-commerce",
      challenge: "High traffic but disappointing conversion rates and cart abandonment",
      solution: "Conducted user research, redesigned checkout flow, implemented trust signals, and launched testing program",
      results: [
        "Conversion rate increased by 156%",
        "Cart abandonment reduced by 43%",
        "Average order value up 28%",
        "Revenue per visitor increased 234%"
      ]
    },
    process: [
      { step: 1, title: "Conversion Audit", description: "Identify conversion blockers and opportunities" },
      { step: 2, title: "User Research", description: "Understand visitor behavior and pain points" },
      { step: 3, title: "Test & Experiment", description: "Run systematic A/B tests to validate improvements" },
      { step: 4, title: "Implement & Scale", description: "Roll out winning variations and continue optimizing" }
    ],
    testimonial: {
      quote: "Same traffic, completely different results. The CRO program paid for itself in the first month.",
      author: "Vikram Singh",
      role: "E-commerce Manager, ShopEase Online"
    }
  },
  {
    id: "market-expansion",
    slug: "market-expansion",
    icon: Shield,
    title: "Market Expansion",
    shortDescription: "Enter new markets and reach new audiences with strategic expansion planning and execution.",
    stat: "30+",
    statLabel: "Markets Served",
    color: "from-indigo-500 to-indigo-600",
    fullDescription: "Scaling into new markets requires strategic planning and localized execution. We help businesses expand geographically and demographically with market research, localized campaigns, and tailored strategies that resonate with new audiences while maintaining brand consistency.",
    benefits: [
      "Comprehensive market research and analysis",
      "Localized content and campaign strategies",
      "Multi-language and multi-region expertise",
      "New audience acquisition frameworks",
      "Risk assessment and mitigation planning"
    ],
    caseStudy: {
      company: "GlobalServe Solutions",
      industry: "Business Services",
      challenge: "Wanted to expand from regional to pan-India presence",
      solution: "Developed city-by-city expansion strategy with localized campaigns and regional partnerships",
      results: [
        "Expanded to 8 new states successfully",
        "National brand recognition achieved",
        "Revenue from new markets: 65% of total",
        "Customer base grew by 420%"
      ]
    },
    process: [
      { step: 1, title: "Market Analysis", description: "Research target markets and competition" },
      { step: 2, title: "Entry Strategy", description: "Develop localized go-to-market plans" },
      { step: 3, title: "Launch & Test", description: "Pilot campaigns in new markets" },
      { step: 4, title: "Scale & Optimize", description: "Expand successful approaches across markets" }
    ],
    testimonial: {
      quote: "Digital Bull Technology gave us the confidence and roadmap to go national. Their market-by-market approach minimized risk and maximized results.",
      author: "Suresh Kumar",
      role: "CEO, GlobalServe Solutions"
    }
  }
];

export const getImpactBySlug = (slug: string): ImpactPoint | undefined => {
  return businessImpactData.find(impact => impact.slug === slug);
};
