import { Globe, Monitor, Search, FileText, Share2, Target, MessageSquare, BarChart3, Shield } from "lucide-react";

export interface ModuleTopic {
  title: string;
  description: string;
}

export interface AcademyModule {
  slug: string;
  title: string;
  shortTitle: string;
  icon: any;
  color: string;
  gradient: string;
  description: string;
  overview: string;
  duration: string;
  topics: ModuleTopic[];
  skills: string[];
  tools: string[];
  futureScope: {
    title: string;
    description: string;
    careers: string[];
    salaryRange: string;
    demandTrend: string;
    industryGrowth: string;
  };
  projectWork: string[];
  certification: string;
}

export const academyModules: AcademyModule[] = [
  {
    slug: "digital-marketing-fundamentals",
    title: "Digital Marketing Fundamentals",
    shortTitle: "DM Fundamentals",
    icon: Globe,
    color: "from-blue-500 to-blue-600",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    description: "Master the core concepts of digital marketing ecosystem and consumer behavior",
    overview: "This foundational module covers the complete digital marketing landscape, from understanding online consumer behavior to developing comprehensive digital branding strategies. You'll learn how different marketing channels work together to create effective campaigns and discover the career paths available in this dynamic industry.",
    duration: "2 Weeks",
    topics: [
      {
        title: "Digital Marketing Ecosystem & Channels",
        description: "Comprehensive overview of all digital marketing channels including search, social, email, content, and paid advertising. Understanding how each channel fits into the overall marketing strategy."
      },
      {
        title: "Online Consumer Behavior",
        description: "Deep dive into how consumers discover, research, and purchase products online. Learn about the digital customer journey, touchpoints, and decision-making factors."
      },
      {
        title: "Digital Branding Strategies",
        description: "Develop skills to create and maintain a strong digital brand presence. Learn positioning, messaging, and visual identity in the digital space."
      },
      {
        title: "Career Paths & Opportunities",
        description: "Explore various career options in digital marketing including roles, responsibilities, required skills, and growth trajectories in the industry."
      },
      {
        title: "Marketing Funnel & Customer Journey",
        description: "Understanding TOFU, MOFU, and BOFU strategies. Learn to create content and campaigns for each stage of the customer journey."
      },
      {
        title: "Competitor Analysis Framework",
        description: "Learn systematic approaches to analyze competitors' digital presence, strategies, and identify opportunities for differentiation."
      }
    ],
    skills: [
      "Strategic thinking",
      "Market research",
      "Brand positioning",
      "Competitive analysis",
      "Customer journey mapping",
      "Marketing planning"
    ],
    tools: [
      "Google Trends",
      "SimilarWeb",
      "SEMrush (Basics)",
      "Canva",
      "Trello/Asana"
    ],
    futureScope: {
      title: "Future Scope in Digital Marketing",
      description: "Digital marketing continues to grow as businesses increasingly shift their budgets from traditional to digital channels. With AI and automation, the field is evolving rapidly, creating new opportunities for skilled professionals.",
      careers: [
        "Digital Marketing Manager",
        "Marketing Strategist",
        "Brand Manager",
        "Marketing Consultant",
        "Growth Marketing Specialist"
      ],
      salaryRange: "₹4-15 LPA",
      demandTrend: "35% YoY growth in job postings",
      industryGrowth: "Digital ad spend projected to reach ₹50,000 Cr by 2025"
    },
    projectWork: [
      "Create a complete digital marketing strategy for a startup",
      "Conduct competitor analysis report",
      "Develop customer personas and journey maps"
    ],
    certification: "Certificate in Digital Marketing Fundamentals"
  },
  {
    slug: "website-landing-page-fundamentals",
    title: "Website & Landing Page Fundamentals",
    shortTitle: "Web Fundamentals",
    icon: Monitor,
    color: "from-cyan-500 to-teal-500",
    gradient: "bg-gradient-to-r from-cyan-500 to-teal-500",
    description: "Learn how websites work and create high-converting landing pages",
    overview: "This module provides a comprehensive understanding of website fundamentals, from technical aspects like domains and hosting to user experience design principles. You'll master the art of creating landing pages that convert visitors into leads and customers.",
    duration: "2 Weeks",
    topics: [
      {
        title: "How Websites Work (Domain, Hosting, CMS)",
        description: "Technical foundations of websites including DNS, web servers, and content management systems. Learn to set up and manage websites using platforms like WordPress."
      },
      {
        title: "Website Structure & UX Basics",
        description: "Learn information architecture, navigation design, and user experience principles that make websites intuitive and engaging for visitors."
      },
      {
        title: "Conversion-Focused Landing Pages",
        description: "Master the elements of high-converting landing pages including headlines, copy, CTAs, forms, and visual hierarchy that drives action."
      },
      {
        title: "Lead Generation Strategies",
        description: "Implement lead magnets, opt-in forms, and capture mechanisms. Learn to create compelling offers that generate quality leads."
      },
      {
        title: "Mobile-First Design Principles",
        description: "Understand responsive design and mobile optimization. Ensure your websites perform flawlessly across all devices."
      },
      {
        title: "Website Speed & Performance",
        description: "Learn techniques to optimize website loading speed, core web vitals, and overall performance for better user experience and SEO."
      }
    ],
    skills: [
      "Website building",
      "Landing page design",
      "UX fundamentals",
      "Conversion optimization",
      "Lead capture setup",
      "Performance optimization"
    ],
    tools: [
      "WordPress",
      "Elementor/Divi",
      "Google PageSpeed Insights",
      "Hotjar",
      "Unbounce/Leadpages"
    ],
    futureScope: {
      title: "Future Scope in Web Development & CRO",
      description: "With every business needing an online presence, web development and conversion optimization skills are in constant demand. The rise of no-code tools has made these skills accessible while still requiring strategic expertise.",
      careers: [
        "Landing Page Specialist",
        "CRO Specialist",
        "Web Designer",
        "UX/UI Designer",
        "WordPress Developer"
      ],
      salaryRange: "₹3-12 LPA",
      demandTrend: "40% increase in CRO job roles",
      industryGrowth: "E-commerce growth driving landing page demand"
    },
    projectWork: [
      "Build a complete WordPress website from scratch",
      "Create 3 high-converting landing pages",
      "Conduct UX audit of an existing website"
    ],
    certification: "Certificate in Website & Landing Page Design"
  },
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization (SEO)",
    shortTitle: "SEO",
    icon: Search,
    color: "from-red-500 to-rose-500",
    gradient: "bg-gradient-to-r from-red-500 to-rose-500",
    description: "Master organic search strategies to rank higher and drive free traffic",
    overview: "This comprehensive SEO module covers everything from keyword research to technical optimization. You'll learn to improve website rankings, drive organic traffic, and create sustainable search visibility for any business or brand.",
    duration: "3 Weeks",
    topics: [
      {
        title: "Keyword Research & Competitor Analysis",
        description: "Master advanced keyword research techniques, search intent analysis, and competitive gap identification to find ranking opportunities."
      },
      {
        title: "On-Page SEO Optimization",
        description: "Learn to optimize page titles, meta descriptions, headers, content, images, and internal linking for maximum search visibility."
      },
      {
        title: "Off-Page SEO & Link Building",
        description: "Develop link building strategies including guest posting, outreach, broken link building, and earning high-quality backlinks ethically."
      },
      {
        title: "Technical SEO (Speed, Mobile, Indexing)",
        description: "Master technical aspects including site architecture, crawlability, mobile optimization, schema markup, and core web vitals."
      },
      {
        title: "Local SEO & Google Business Profile",
        description: "Optimize for local search results, manage Google Business profiles, and drive foot traffic for local businesses."
      },
      {
        title: "SEO Audits & Ranking Strategies",
        description: "Conduct comprehensive SEO audits, identify issues, and create actionable strategies to improve search rankings."
      }
    ],
    skills: [
      "Keyword research",
      "On-page optimization",
      "Link building",
      "Technical SEO",
      "Local SEO",
      "SEO auditing"
    ],
    tools: [
      "Ahrefs/SEMrush",
      "Google Search Console",
      "Screaming Frog",
      "Moz",
      "Yoast SEO"
    ],
    futureScope: {
      title: "Future Scope in SEO",
      description: "SEO remains the most cost-effective digital marketing channel with consistent ROI. As search evolves with AI and voice search, SEO professionals with updated skills are highly sought after.",
      careers: [
        "SEO Specialist",
        "SEO Manager",
        "Technical SEO Expert",
        "Link Building Specialist",
        "SEO Consultant"
      ],
      salaryRange: "₹4-18 LPA",
      demandTrend: "25% growth in SEO specialist roles",
      industryGrowth: "Organic search drives 53% of website traffic"
    },
    projectWork: [
      "Complete SEO audit for a live website",
      "Keyword research and content strategy",
      "Local SEO optimization for a business"
    ],
    certification: "Certificate in Search Engine Optimization"
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    shortTitle: "Content Marketing",
    icon: FileText,
    color: "from-orange-500 to-amber-500",
    gradient: "bg-gradient-to-r from-orange-500 to-amber-500",
    description: "Create compelling content that attracts, engages, and converts audiences",
    overview: "Learn the art and science of content marketing. From SEO-optimized blog writing to persuasive ad copy, this module covers all aspects of creating content that resonates with audiences and drives business results.",
    duration: "2 Weeks",
    topics: [
      {
        title: "SEO-Friendly Blog Writing",
        description: "Master the art of writing blog posts that rank well in search engines while engaging and informing readers. Learn headline writing, structure, and optimization."
      },
      {
        title: "Website & Landing Page Content",
        description: "Create compelling website copy that communicates value propositions clearly and guides visitors toward conversion actions."
      },
      {
        title: "Ad Copywriting Fundamentals",
        description: "Learn persuasion techniques and copywriting frameworks like AIDA, PAS, and storytelling for creating ads that convert."
      },
      {
        title: "Content Planning & Calendars",
        description: "Develop editorial calendars, content strategies, and workflows to maintain consistent publishing schedules."
      },
      {
        title: "Content Distribution Strategies",
        description: "Learn to amplify content reach through social sharing, email marketing, syndication, and repurposing across channels."
      },
      {
        title: "Content Performance Analysis",
        description: "Measure content effectiveness using analytics, track engagement metrics, and optimize based on data insights."
      }
    ],
    skills: [
      "Blog writing",
      "Copywriting",
      "Content strategy",
      "Editorial planning",
      "Content optimization",
      "Storytelling"
    ],
    tools: [
      "Grammarly",
      "Hemingway Editor",
      "BuzzSumo",
      "CoSchedule",
      "ChatGPT/Jasper"
    ],
    futureScope: {
      title: "Future Scope in Content Marketing",
      description: "Content is the fuel that powers all digital marketing channels. With the explosion of content consumption, skilled content marketers who can create quality, strategic content are in high demand.",
      careers: [
        "Content Marketing Manager",
        "Content Writer",
        "Copywriter",
        "Content Strategist",
        "Brand Journalist"
      ],
      salaryRange: "₹3-15 LPA",
      demandTrend: "50% increase in content marketing budgets",
      industryGrowth: "Content marketing generates 3x leads vs traditional"
    },
    projectWork: [
      "Create a 30-day content calendar",
      "Write 5 SEO-optimized blog posts",
      "Develop ad copy for multiple platforms"
    ],
    certification: "Certificate in Content Marketing"
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    shortTitle: "Social Media",
    icon: Share2,
    color: "from-pink-500 to-rose-500",
    gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
    description: "Build brand presence and engage audiences across social platforms",
    overview: "Master social media marketing across all major platforms. Learn to create engaging content, grow organic following, build communities, and leverage social media for brand awareness and lead generation.",
    duration: "3 Weeks",
    topics: [
      {
        title: "Instagram, Facebook & LinkedIn Strategies",
        description: "Platform-specific strategies for maximizing reach and engagement. Learn algorithm nuances and best practices for each network."
      },
      {
        title: "Organic Growth Techniques",
        description: "Master hashtag strategies, engagement tactics, and content optimization to grow followers organically without paid promotion."
      },
      {
        title: "Content Creation & Scheduling",
        description: "Create platform-native content including images, videos, stories, and reels. Learn to plan and schedule for optimal engagement."
      },
      {
        title: "Audience Engagement & Brand Building",
        description: "Build authentic connections with followers through community management, social listening, and responsive engagement strategies."
      },
      {
        title: "Influencer Marketing Basics",
        description: "Learn to identify, approach, and collaborate with influencers for brand partnerships and sponsored content campaigns."
      },
      {
        title: "Social Media Analytics",
        description: "Track and analyze social media metrics, create reports, and use insights to optimize your social media strategy."
      }
    ],
    skills: [
      "Social content creation",
      "Community management",
      "Platform strategy",
      "Influencer outreach",
      "Social analytics",
      "Brand building"
    ],
    tools: [
      "Meta Business Suite",
      "Hootsuite/Buffer",
      "Canva",
      "Later/Planoly",
      "Sprout Social"
    ],
    futureScope: {
      title: "Future Scope in Social Media Marketing",
      description: "Social media continues to evolve with new platforms and features. Professionals who can adapt to trends like short-form video, social commerce, and AI-driven content are highly valuable.",
      careers: [
        "Social Media Manager",
        "Community Manager",
        "Influencer Marketing Specialist",
        "Social Media Strategist",
        "Content Creator"
      ],
      salaryRange: "₹3-12 LPA",
      demandTrend: "45% increase in social media roles",
      industryGrowth: "Social commerce to reach $80B by 2025"
    },
    projectWork: [
      "Manage social media for a brand for 1 month",
      "Create a viral content strategy",
      "Develop an influencer outreach campaign"
    ],
    certification: "Certificate in Social Media Marketing"
  },
  {
    slug: "paid-advertising-performance-marketing",
    title: "Paid Advertising & Performance Marketing",
    shortTitle: "Paid Ads",
    icon: Target,
    color: "from-blue-600 to-indigo-600",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
    description: "Master paid advertising to drive targeted traffic and measurable results",
    overview: "Learn to create and manage paid advertising campaigns across Google, Facebook, Instagram, and LinkedIn. Master performance marketing strategies that deliver measurable ROI and scalable growth.",
    duration: "3 Weeks",
    topics: [
      {
        title: "Google Ads (Search, Display & Video)",
        description: "Complete mastery of Google Ads including search campaigns, display networks, YouTube advertising, and smart bidding strategies."
      },
      {
        title: "Social Media Paid Advertising",
        description: "Create effective ad campaigns on Facebook, Instagram, and LinkedIn. Learn audience targeting, creative best practices, and platform optimization."
      },
      {
        title: "Budget Planning & Targeting",
        description: "Develop media plans, allocate budgets effectively, and master audience targeting including custom and lookalike audiences."
      },
      {
        title: "Conversion Tracking & Optimization",
        description: "Set up tracking pixels, configure conversion events, and optimize campaigns based on performance data for maximum ROAS."
      },
      {
        title: "A/B Testing & Ad Creative",
        description: "Learn systematic testing methodologies for ad creatives, copy, audiences, and landing pages to continuously improve performance."
      },
      {
        title: "Remarketing & Retargeting",
        description: "Implement remarketing strategies to re-engage website visitors and create personalized ad experiences throughout the customer journey."
      }
    ],
    skills: [
      "Google Ads management",
      "Social ads creation",
      "Budget optimization",
      "Conversion tracking",
      "A/B testing",
      "ROAS optimization"
    ],
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "Google Analytics 4",
      "Google Tag Manager",
      "LinkedIn Campaign Manager"
    ],
    futureScope: {
      title: "Future Scope in Paid Advertising",
      description: "Performance marketing is essential for business growth. With AI-powered bidding and creative optimization, skilled professionals who can leverage these tools while maintaining strategic oversight are in high demand.",
      careers: [
        "PPC Specialist",
        "Performance Marketing Manager",
        "Paid Media Manager",
        "Growth Marketer",
        "Digital Advertising Specialist"
      ],
      salaryRange: "₹5-20 LPA",
      demandTrend: "60% of marketing budgets going to digital ads",
      industryGrowth: "Digital advertising market growing at 15% CAGR"
    },
    projectWork: [
      "Create and manage Google Ads campaigns",
      "Set up Facebook Ads with pixel tracking",
      "Develop a complete paid media strategy"
    ],
    certification: "Certificate in Paid Advertising & Performance Marketing"
  },
  {
    slug: "email-whatsapp-marketing",
    title: "Email & WhatsApp Marketing",
    shortTitle: "Email & WhatsApp",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    description: "Build direct communication channels for nurturing leads and customers",
    overview: "Master email marketing and WhatsApp Business strategies to build direct relationships with your audience. Learn to create automated sequences, personalized campaigns, and messaging that drives engagement and sales.",
    duration: "2 Weeks",
    topics: [
      {
        title: "Email Marketing Fundamentals",
        description: "Learn email marketing basics including list building, email design, deliverability, and compliance with email regulations like GDPR."
      },
      {
        title: "Email Automation & Sequences",
        description: "Create automated email workflows including welcome sequences, drip campaigns, and behavior-triggered emails that nurture leads."
      },
      {
        title: "WhatsApp Business Marketing",
        description: "Leverage WhatsApp Business for customer communication, broadcast lists, catalogs, and automated responses."
      },
      {
        title: "Newsletter Strategy & Design",
        description: "Create engaging newsletters that build audience loyalty, drive traffic, and establish thought leadership in your industry."
      },
      {
        title: "Segmentation & Personalization",
        description: "Learn to segment email lists and personalize messages based on subscriber behavior, preferences, and demographics."
      },
      {
        title: "Email Analytics & Optimization",
        description: "Track open rates, click rates, and conversions. A/B test subject lines, content, and send times for optimal performance."
      }
    ],
    skills: [
      "Email campaign creation",
      "Marketing automation",
      "List management",
      "WhatsApp marketing",
      "Personalization",
      "Analytics interpretation"
    ],
    tools: [
      "Mailchimp/Klaviyo",
      "WhatsApp Business API",
      "ActiveCampaign",
      "ConvertKit",
      "Sendinblue"
    ],
    futureScope: {
      title: "Future Scope in Email & Messaging Marketing",
      description: "Email marketing delivers the highest ROI of any marketing channel at $42 for every $1 spent. With messaging apps becoming primary communication channels, WhatsApp marketing skills are increasingly valuable.",
      careers: [
        "Email Marketing Specialist",
        "Marketing Automation Specialist",
        "CRM Manager",
        "Lifecycle Marketing Manager",
        "Retention Marketing Specialist"
      ],
      salaryRange: "₹4-15 LPA",
      demandTrend: "Email marketing delivers 4200% ROI",
      industryGrowth: "WhatsApp Business users growing 100% YoY"
    },
    projectWork: [
      "Build an email automation sequence",
      "Create a newsletter strategy",
      "Set up WhatsApp Business catalog and messaging"
    ],
    certification: "Certificate in Email & WhatsApp Marketing"
  },
  {
    slug: "analytics-data-tracking",
    title: "Analytics & Data Tracking",
    shortTitle: "Analytics",
    icon: BarChart3,
    color: "from-purple-500 to-violet-500",
    gradient: "bg-gradient-to-r from-purple-500 to-violet-500",
    description: "Make data-driven decisions with comprehensive analytics mastery",
    overview: "Become proficient in digital analytics and data tracking. Learn to set up tracking, analyze user behavior, create insightful reports, and use data to optimize marketing strategies and prove ROI.",
    duration: "2 Weeks",
    topics: [
      {
        title: "Google Analytics 4 Mastery",
        description: "Complete training on GA4 including setup, configuration, event tracking, conversion tracking, and advanced analysis features."
      },
      {
        title: "Google Tag Manager",
        description: "Learn to implement and manage tracking tags without code changes. Set up events, triggers, and variables for comprehensive tracking."
      },
      {
        title: "Data Analysis & Interpretation",
        description: "Develop skills to analyze data, identify trends, and extract actionable insights that inform marketing decisions."
      },
      {
        title: "Dashboard Creation & Reporting",
        description: "Create compelling dashboards and reports using Google Data Studio/Looker to visualize marketing performance for stakeholders."
      },
      {
        title: "Attribution Modeling",
        description: "Understand multi-touch attribution, conversion paths, and how to properly credit marketing channels for conversions."
      },
      {
        title: "Privacy & Compliance",
        description: "Navigate data privacy regulations, cookie consent, and implement tracking while respecting user privacy."
      }
    ],
    skills: [
      "Google Analytics 4",
      "Tag management",
      "Data analysis",
      "Dashboard creation",
      "Attribution modeling",
      "Privacy compliance"
    ],
    tools: [
      "Google Analytics 4",
      "Google Tag Manager",
      "Looker Studio",
      "Mixpanel",
      "Hotjar/Clarity"
    ],
    futureScope: {
      title: "Future Scope in Marketing Analytics",
      description: "Data-driven marketing is the present and future. With increasing focus on privacy and first-party data, analytics professionals who can navigate this landscape while delivering insights are highly valued.",
      careers: [
        "Marketing Analyst",
        "Data Analyst",
        "Analytics Manager",
        "Business Intelligence Specialist",
        "Growth Analyst"
      ],
      salaryRange: "₹5-20 LPA",
      demandTrend: "Analytics skills demanded in 70% of marketing roles",
      industryGrowth: "Marketing analytics market growing at 14% CAGR"
    },
    projectWork: [
      "Set up GA4 and GTM for a website",
      "Create a marketing dashboard in Looker Studio",
      "Analyze campaign performance and present insights"
    ],
    certification: "Certificate in Marketing Analytics"
  },
  {
    slug: "online-reputation-management",
    title: "Online Reputation Management (ORM)",
    shortTitle: "ORM",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    description: "Protect and enhance brand reputation in the digital landscape",
    overview: "Learn to monitor, manage, and improve online reputation for brands and individuals. Master strategies for handling reviews, crisis management, and building a positive digital presence.",
    duration: "1 Week",
    topics: [
      {
        title: "Brand Monitoring & Listening",
        description: "Set up comprehensive monitoring for brand mentions, reviews, and social conversations across all digital channels."
      },
      {
        title: "Review Management Strategies",
        description: "Learn best practices for soliciting, responding to, and leveraging customer reviews on Google, Facebook, and industry platforms."
      },
      {
        title: "Crisis Communication",
        description: "Develop crisis management protocols, response templates, and strategies for handling negative publicity effectively."
      },
      {
        title: "Positive Content Strategy",
        description: "Create and promote positive content to build brand authority and push down negative search results organically."
      },
      {
        title: "Personal Branding",
        description: "Apply ORM principles to personal brands, executives, and thought leaders for professional reputation management."
      },
      {
        title: "Reputation Recovery",
        description: "Strategies and tactics for rebuilding reputation after a crisis or addressing long-standing negative content."
      }
    ],
    skills: [
      "Brand monitoring",
      "Review management",
      "Crisis handling",
      "Content suppression",
      "Personal branding",
      "PR basics"
    ],
    tools: [
      "Google Alerts",
      "Mention/Brand24",
      "ReviewTrackers",
      "Reputation.com",
      "Hootsuite Insights"
    ],
    futureScope: {
      title: "Future Scope in Online Reputation Management",
      description: "With 90% of consumers reading reviews before purchasing, reputation management is critical for business success. ORM specialists are essential for protecting brand value in the digital age.",
      careers: [
        "ORM Specialist",
        "Brand Reputation Manager",
        "PR Specialist",
        "Crisis Communications Manager",
        "Customer Experience Manager"
      ],
      salaryRange: "₹4-15 LPA",
      demandTrend: "85% of companies prioritizing reputation management",
      industryGrowth: "ORM services market growing at 12% CAGR"
    },
    projectWork: [
      "Set up brand monitoring for a business",
      "Create a crisis response playbook",
      "Develop a review generation strategy"
    ],
    certification: "Certificate in Online Reputation Management"
  }
];

export const getModuleBySlug = (slug: string): AcademyModule | undefined => {
  return academyModules.find(module => module.slug === slug);
};
