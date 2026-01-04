import { Users, Building2, MonitorSmartphone, TrendingUp, Target } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  category: string;
  title: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  stats: { label: string; value: string }[];
  image: string;
  icon: LucideIcon;
  services: string[];
  timeline: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  process: {
    phase: string;
    title: string;
    description: string;
    activities: string[];
  }[];
  metrics: {
    before: { label: string; value: string }[];
    after: { label: string; value: string }[];
  };
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "hireforjob",
    slug: "hireforjob-recruitment-portal",
    client: "HireForJob.com",
    category: "Recruitment Portal",
    title: "Scaling Job Portal Traffic to 1M+ Monthly Visitors",
    description: "We implemented a massive programmatic SEO strategy for job listings and optimized the user flow for candidate registrations, establishing HireForJob as a leading recruitment platform.",
    fullDescription: "HireForJob.com came to us as a growing job portal struggling to compete with established players in the Indian recruitment market. Despite having a solid platform, they were invisible to their target audience and losing potential candidates and employers to competitors with better search visibility.",
    challenge: "HireForJob faced multiple challenges: low organic visibility in a highly competitive market, poor user experience leading to high bounce rates, and inefficient lead generation for both job seekers and employers. They needed to scale rapidly while maintaining quality.",
    solution: "We developed a comprehensive digital strategy including programmatic SEO for thousands of job listing pages, complete UX overhaul for the registration funnel, and targeted PPC campaigns for employer acquisition. Our content strategy focused on career advice and industry-specific job guides.",
    results: [
      "Organic traffic increased by 450% in 12 months",
      "Over 250,000 new candidate registrations",
      "Employer leads increased by 180%",
      "Page load time reduced by 65%",
      "Bounce rate decreased from 72% to 38%"
    ],
    stats: [
      { label: "Organic Traffic", value: "+450%" },
      { label: "Candidate Signups", value: "250k+" },
      { label: "Employer Leads", value: "+180%" }
    ],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    icon: Users,
    services: ["SEO", "PPC", "Content Marketing", "UX Design"],
    timeline: "12 months",
    testimonial: {
      quote: "Digital Bull Technology transformed our entire digital presence. Their programmatic SEO approach alone generated more qualified traffic than all our previous marketing efforts combined. The team's expertise in the recruitment industry was invaluable.",
      author: "Vikram Mehta",
      role: "CEO, HireForJob.com"
    },
    process: [
      {
        phase: "Phase 1",
        title: "Discovery & Audit",
        description: "Comprehensive analysis of current state and competitive landscape",
        activities: [
          "Technical SEO audit",
          "Competitor analysis",
          "User journey mapping",
          "Keyword opportunity research"
        ]
      },
      {
        phase: "Phase 2",
        title: "Strategy Development",
        description: "Creating the roadmap for success",
        activities: [
          "Programmatic SEO framework",
          "Content strategy planning",
          "PPC campaign structure",
          "UX improvement priorities"
        ]
      },
      {
        phase: "Phase 3",
        title: "Implementation",
        description: "Executing the strategy with precision",
        activities: [
          "Template optimization for 50k+ pages",
          "Landing page redesign",
          "Google Ads campaign launch",
          "Content production at scale"
        ]
      },
      {
        phase: "Phase 4",
        title: "Optimization & Scale",
        description: "Continuous improvement and expansion",
        activities: [
          "A/B testing key pages",
          "Expanding to new job categories",
          "Refining PPC targeting",
          "Building authority backlinks"
        ]
      }
    ],
    metrics: {
      before: [
        { label: "Monthly Organic Traffic", value: "45,000" },
        { label: "Domain Authority", value: "28" },
        { label: "Indexed Pages", value: "12,000" },
        { label: "Monthly Signups", value: "3,500" }
      ],
      after: [
        { label: "Monthly Organic Traffic", value: "1,200,000" },
        { label: "Domain Authority", value: "52" },
        { label: "Indexed Pages", value: "125,000" },
        { label: "Monthly Signups", value: "45,000" }
      ]
    }
  },
  {
    id: "cadbull",
    slug: "cadbull-cad-library",
    client: "Cadbull.com",
    category: "Architecture & CAD",
    title: "Global SEO Domination for World's Largest CAD Library",
    description: "Cadbull needed to reach architects worldwide. We rebuilt their site structure for technical SEO and optimized thousands of CAD drawing pages to rank #1 globally for key architecture terms.",
    fullDescription: "Cadbull.com houses the world's largest collection of free CAD drawings and blocks, serving architects, engineers, and designers globally. Despite having over 100,000 CAD files, their organic visibility was limited, and they were only reaching a fraction of their potential audience.",
    challenge: "With over 100,000 CAD drawings, Cadbull faced significant technical SEO challenges. Duplicate content issues, slow page loads due to preview images, and lack of proper categorization meant search engines couldn't effectively index their content. International targeting was also non-existent.",
    solution: "We implemented a complete technical SEO overhaul including proper canonicalization, image optimization, structured data for CAD files, and international SEO with hreflang tags. Created category landing pages optimized for high-value architecture and engineering terms.",
    results: [
      "Achieved Top 3 global rankings for major CAD terms",
      "Daily downloads increased to 50,000+",
      "Revenue grew 3.5x in 18 months",
      "Expanded to 45 countries with localized landing pages",
      "Organic traffic grew by 820%"
    ],
    stats: [
      { label: "Global Ranking", value: "Top 3" },
      { label: "Daily Downloads", value: "50k+" },
      { label: "Revenue Growth", value: "3.5x" }
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    icon: Building2,
    services: ["Technical SEO", "International SEO", "Content Strategy", "Performance Optimization"],
    timeline: "18 months",
    testimonial: {
      quote: "Digital Bull Technology understood our unique challenges as a CAD resource platform. Their technical SEO expertise helped us fix issues we didn't even know existed, and the international expansion strategy opened up entirely new markets for us.",
      author: "Rahul Patel",
      role: "Founder, Cadbull.com"
    },
    process: [
      {
        phase: "Phase 1",
        title: "Technical Audit",
        description: "Deep-dive into site architecture and indexation issues",
        activities: [
          "Crawl analysis of 100k+ pages",
          "Duplicate content identification",
          "Page speed assessment",
          "Schema markup audit"
        ]
      },
      {
        phase: "Phase 2",
        title: "Architecture Redesign",
        description: "Restructuring for optimal crawling and indexing",
        activities: [
          "URL structure optimization",
          "Category taxonomy creation",
          "Internal linking strategy",
          "Canonicalization implementation"
        ]
      },
      {
        phase: "Phase 3",
        title: "International Expansion",
        description: "Taking Cadbull global",
        activities: [
          "Hreflang implementation",
          "Localized landing pages",
          "International link building",
          "Local keyword targeting"
        ]
      },
      {
        phase: "Phase 4",
        title: "Content & Authority",
        description: "Building topical authority in architecture niche",
        activities: [
          "CAD tutorials and guides",
          "Industry partnerships",
          "Guest posting campaign",
          "Social media presence"
        ]
      }
    ],
    metrics: {
      before: [
        { label: "Monthly Traffic", value: "180,000" },
        { label: "Ranking Keywords", value: "2,400" },
        { label: "Countries", value: "12" },
        { label: "Monthly Revenue", value: "$8,500" }
      ],
      after: [
        { label: "Monthly Traffic", value: "1,650,000" },
        { label: "Ranking Keywords", value: "45,000" },
        { label: "Countries", value: "45" },
        { label: "Monthly Revenue", value: "$29,750" }
      ]
    }
  },
  {
    id: "castingscreen",
    slug: "castingscreen-app-marketing",
    client: "CastingScreen",
    category: "Mobile App Marketing",
    title: "Launching a Screen Mirroring App to Top Charts",
    description: "A comprehensive App Store Optimization (ASO) and PPC campaign to launch CastingScreen, driving massive installs and stabilizing daily active users.",
    fullDescription: "CastingScreen is a screen mirroring app that allows users to cast their mobile screens to smart TVs and streaming devices. In a crowded market with established competitors, they needed to stand out and acquire users cost-effectively.",
    challenge: "The screen mirroring app category is highly competitive with several well-funded players. CastingScreen had a superior product but lacked visibility in app stores and had no user acquisition strategy. Their cost per install was unsustainably high.",
    solution: "We developed a comprehensive mobile app marketing strategy combining ASO optimization, creative ad campaigns, and influencer partnerships. Implemented A/B testing for app store creatives and refined targeting to reach users most likely to convert.",
    results: [
      "Achieved 1M+ total installs in first year",
      "Reduced cost per install by 60%",
      "App store rating improved to 4.5 stars",
      "Daily active users stabilized at 85,000",
      "Ranked #3 in Utilities category"
    ],
    stats: [
      { label: "App Installs", value: "1M+" },
      { label: "CPI (Cost Per Install)", value: "-60%" },
      { label: "Store Rating", value: "4.5★" }
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    icon: MonitorSmartphone,
    services: ["ASO", "App Install Campaigns", "Creative Strategy", "Influencer Marketing"],
    timeline: "12 months",
    testimonial: {
      quote: "The team at Digital Bull Technology took our app from obscurity to the top charts. Their data-driven approach to ASO and user acquisition helped us compete with apps backed by much larger budgets.",
      author: "Ankit Sharma",
      role: "Product Manager, CastingScreen"
    },
    process: [
      {
        phase: "Phase 1",
        title: "Market Research",
        description: "Understanding the competitive landscape",
        activities: [
          "Competitor app analysis",
          "Keyword opportunity mapping",
          "User persona development",
          "Creative benchmarking"
        ]
      },
      {
        phase: "Phase 2",
        title: "ASO Optimization",
        description: "Maximizing organic app store visibility",
        activities: [
          "Title and subtitle optimization",
          "Keyword strategy implementation",
          "Screenshot and video creation",
          "Review generation campaign"
        ]
      },
      {
        phase: "Phase 3",
        title: "Paid Acquisition",
        description: "Scaling installs profitably",
        activities: [
          "Google UAC campaigns",
          "Apple Search Ads setup",
          "Creative testing program",
          "Audience refinement"
        ]
      },
      {
        phase: "Phase 4",
        title: "Retention & Growth",
        description: "Building sustainable user base",
        activities: [
          "In-app engagement optimization",
          "Push notification strategy",
          "Referral program launch",
          "Influencer partnerships"
        ]
      }
    ],
    metrics: {
      before: [
        { label: "Monthly Installs", value: "5,000" },
        { label: "Cost Per Install", value: "$2.50" },
        { label: "App Store Rank", value: "#180" },
        { label: "Daily Active Users", value: "2,500" }
      ],
      after: [
        { label: "Monthly Installs", value: "95,000" },
        { label: "Cost Per Install", value: "$1.00" },
        { label: "App Store Rank", value: "#3" },
        { label: "Daily Active Users", value: "85,000" }
      ]
    }
  },
  {
    id: "shuttech",
    slug: "shuttech-tech-news",
    client: "Shuttech",
    category: "Tech News & Services",
    title: "Establishing Authority in Niche Tech Journalism",
    description: "We helped Shuttech grow from a small blog to a recognized tech news source through content marketing, backlinking strategies, and high-speed AMP pages.",
    fullDescription: "Shuttech started as a small tech blog covering gadget reviews and software news. They had quality content but struggled to compete with established tech publications for visibility and advertising revenue.",
    challenge: "Shuttech was lost in a sea of tech blogs. Despite producing quality content, they couldn't attract enough traffic to monetize effectively. Their site was slow, not optimized for mobile, and lacked the authority signals needed to rank for competitive tech keywords.",
    solution: "We implemented a comprehensive content marketing strategy focused on underserved tech niches, built high-quality backlinks from tech communities, and migrated to a fast AMP-enabled site. Developed an email newsletter to build direct audience relationships.",
    results: [
      "Monthly readers increased by 300%",
      "Ad revenue grew by 210%",
      "Newsletter subscribers reached 50,000",
      "Featured in Google Discover regularly",
      "Average page load time reduced to 1.2 seconds"
    ],
    stats: [
      { label: "Monthly Readers", value: "+300%" },
      { label: "Ad Revenue", value: "+210%" },
      { label: "Newsletter subs", value: "50k" }
    ],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
    icon: TrendingUp,
    services: ["Content Marketing", "Technical SEO", "Email Marketing", "Monetization Strategy"],
    timeline: "10 months",
    testimonial: {
      quote: "Digital Bull Technology helped us find our voice in a crowded market. Their content strategy identified niches we hadn't considered, and their SEO work made our content actually visible. The newsletter strategy alone was worth the investment.",
      author: "Priya Desai",
      role: "Editor-in-Chief, Shuttech"
    },
    process: [
      {
        phase: "Phase 1",
        title: "Content Audit",
        description: "Analyzing content performance and opportunities",
        activities: [
          "Traffic analysis by content type",
          "Competitor content gap analysis",
          "Niche opportunity identification",
          "Content consolidation plan"
        ]
      },
      {
        phase: "Phase 2",
        title: "Technical Optimization",
        description: "Building a fast, mobile-first platform",
        activities: [
          "AMP implementation",
          "Core Web Vitals optimization",
          "Schema markup for articles",
          "Mobile UX improvements"
        ]
      },
      {
        phase: "Phase 3",
        title: "Content Strategy",
        description: "Creating content that ranks and engages",
        activities: [
          "Editorial calendar development",
          "Expert contributor outreach",
          "Evergreen content creation",
          "News desk rapid response"
        ]
      },
      {
        phase: "Phase 4",
        title: "Audience Building",
        description: "Creating direct audience relationships",
        activities: [
          "Newsletter launch and growth",
          "Social media strategy",
          "Community building",
          "Monetization optimization"
        ]
      }
    ],
    metrics: {
      before: [
        { label: "Monthly Pageviews", value: "85,000" },
        { label: "Newsletter Subscribers", value: "2,500" },
        { label: "Page Load Time", value: "4.8s" },
        { label: "Monthly Ad Revenue", value: "$1,200" }
      ],
      after: [
        { label: "Monthly Pageviews", value: "340,000" },
        { label: "Newsletter Subscribers", value: "50,000" },
        { label: "Page Load Time", value: "1.2s" },
        { label: "Monthly Ad Revenue", value: "$3,720" }
      ]
    }
  },
  {
    id: "giftcityproperty",
    slug: "giftcity-property-real-estate",
    client: "GiftCityProperty.com",
    category: "Real Estate",
    title: "High-Ticket Lead Generation for GIFT City Investments",
    description: "Targeting high-net-worth investors for India's first operational smart city. Our hyper-local SEO and LinkedIn ad campaigns delivered premium qualified leads for commercial & residential projects.",
    fullDescription: "GiftCityProperty.com specializes in premium commercial and residential properties in Gujarat International Finance Tec-City (GIFT City), India's first operational smart city. They needed to reach high-net-worth investors and corporations looking for premium office and residential spaces.",
    challenge: "GIFT City is a niche market with a specific buyer persona: high-net-worth individuals and corporations. Traditional real estate marketing wasn't effective, and the cost per qualified lead was extremely high. They needed targeted campaigns that reached decision-makers.",
    solution: "We developed a sophisticated multi-channel strategy combining hyper-local SEO for GIFT City keywords, LinkedIn advertising targeting C-suite executives and investors, and content marketing establishing them as GIFT City experts. Implemented lead scoring to qualify prospects.",
    results: [
      "Lead quality rated as 'Premium' by sales team",
      "Cost per lead reduced by 45%",
      "Sales conversion rate improved by 35%",
      "Became #1 ranked site for GIFT City real estate",
      "Generated ₹50Cr+ in property inquiries"
    ],
    stats: [
      { label: "Lead Quality", value: "Premium" },
      { label: "CPL (Cost Per Lead)", value: "-45%" },
      { label: "Sales Conversion", value: "+35%" }
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    icon: Target,
    services: ["Local SEO", "LinkedIn Advertising", "Content Marketing", "Lead Generation"],
    timeline: "8 months",
    testimonial: {
      quote: "Digital Bull Technology understood that we weren't selling properties - we were selling investment opportunities. Their targeted approach brought us exactly the type of clients we needed: serious investors with capital ready to deploy.",
      author: "Suresh Patel",
      role: "Director, GiftCityProperty.com"
    },
    process: [
      {
        phase: "Phase 1",
        title: "Market Positioning",
        description: "Establishing expertise in GIFT City real estate",
        activities: [
          "Competitor analysis",
          "Buyer persona development",
          "Value proposition refinement",
          "Content pillar planning"
        ]
      },
      {
        phase: "Phase 2",
        title: "Search Visibility",
        description: "Dominating GIFT City search results",
        activities: [
          "Hyper-local keyword targeting",
          "Google Business optimization",
          "Location page creation",
          "Schema markup for properties"
        ]
      },
      {
        phase: "Phase 3",
        title: "Paid Acquisition",
        description: "Reaching high-value prospects",
        activities: [
          "LinkedIn campaign development",
          "Retargeting implementation",
          "Landing page optimization",
          "Lead form optimization"
        ]
      },
      {
        phase: "Phase 4",
        title: "Lead Nurturing",
        description: "Converting prospects to clients",
        activities: [
          "Email nurture sequences",
          "Virtual property tours",
          "Investment calculator tools",
          "Sales enablement content"
        ]
      }
    ],
    metrics: {
      before: [
        { label: "Monthly Leads", value: "12" },
        { label: "Cost Per Lead", value: "₹8,500" },
        { label: "Qualified Lead Rate", value: "25%" },
        { label: "Inquiry Value", value: "₹2Cr" }
      ],
      after: [
        { label: "Monthly Leads", value: "65" },
        { label: "Cost Per Lead", value: "₹4,675" },
        { label: "Qualified Lead Rate", value: "68%" },
        { label: "Inquiry Value", value: "₹50Cr+" }
      ]
    }
  }
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudiesData.find(cs => cs.slug === slug);
};
