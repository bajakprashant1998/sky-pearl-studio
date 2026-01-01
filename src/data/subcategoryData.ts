import {
  Search,
  Zap,
  TrendingUp,
  Globe,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Target,
  Lightbulb,
  Shield,
  BarChart3,
  Settings,
  Award,
  Rocket,
  LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SubcategoryDetail {
  description: string;
  longDescription: string;
  processSteps: ProcessStep[];
  faqs: FAQ[];
  keyBenefits: string[];
  testimonialSnippet?: {
    quote: string;
    author: string;
    company: string;
  };
}

// Default templates for generating subcategory content
const generateDefaultContent = (
  subcategoryTitle: string,
  serviceName: string,
  items: string[]
): SubcategoryDetail => {
  return {
    description: `Transform your digital presence with our expert ${subcategoryTitle} services. We deliver measurable results through proven strategies and cutting-edge techniques.`,
    longDescription: `Our ${subcategoryTitle} services are designed to help businesses achieve their goals through strategic planning, expert execution, and continuous optimization. As part of our comprehensive ${serviceName} offerings, we bring years of experience and industry best practices to every project. Our team of specialists works closely with you to understand your unique challenges and develop customized solutions that drive real business outcomes.`,
    processSteps: [
      {
        title: "Discovery & Analysis",
        description: `We begin with a comprehensive audit of your current ${subcategoryTitle.toLowerCase()} efforts, identifying opportunities and challenges.`,
      },
      {
        title: "Strategy Development",
        description: `Our experts craft a customized ${subcategoryTitle.toLowerCase()} strategy aligned with your business objectives and target audience.`,
      },
      {
        title: "Implementation",
        description: `We execute the strategy with precision, implementing best practices and leveraging the latest tools and techniques.`,
      },
      {
        title: "Monitoring & Optimization",
        description: `Continuous tracking and data-driven adjustments ensure optimal performance and ROI.`,
      },
      {
        title: "Reporting & Insights",
        description: `Regular comprehensive reports keep you informed of progress, results, and next steps.`,
      },
    ],
    faqs: [
      {
        question: `What is ${subcategoryTitle} and why is it important?`,
        answer: `${subcategoryTitle} is a crucial component of ${serviceName} that helps businesses achieve better visibility, engagement, and conversions. It's essential for staying competitive in today's digital landscape.`,
      },
      {
        question: `How long does it take to see results from ${subcategoryTitle}?`,
        answer: `Results timeline varies based on your current situation and goals. Typically, initial improvements are visible within 4-8 weeks, with significant results in 3-6 months.`,
      },
      {
        question: `What makes your ${subcategoryTitle} services different?`,
        answer: `We combine data-driven strategies with creative excellence and transparent reporting. Our team stays current with industry trends and algorithm changes to ensure optimal results.`,
      },
      {
        question: `Do you provide regular reports on ${subcategoryTitle} performance?`,
        answer: `Yes, we provide comprehensive monthly reports detailing key metrics, progress towards goals, and strategic recommendations for continued improvement.`,
      },
    ],
    keyBenefits: [
      "Data-driven strategies for maximum ROI",
      "Experienced team of industry specialists",
      "Transparent reporting and communication",
      "Customized solutions for your business",
      "Proven track record of success",
      "Ongoing optimization and support",
    ],
    testimonialSnippet: {
      quote: `Working with DigiPulse on ${subcategoryTitle} transformed our business. The results exceeded our expectations.`,
      author: "Marketing Director",
      company: "Industry Leader",
    },
  };
};

// Custom content for specific subcategories (you can expand this)
const customSubcategoryData: Record<string, SubcategoryDetail> = {
  // SEO Subcategories
  "on-page-seo": {
    description: "Optimize every element of your web pages for maximum search visibility and user engagement.",
    longDescription: "On-Page SEO is the foundation of any successful search engine optimization strategy. Our comprehensive approach covers everything from keyword optimization to content structure, ensuring your pages are perfectly positioned to rank for your target keywords. We analyze and optimize title tags, meta descriptions, headers, content, images, and internal linking to create a cohesive, search-friendly website structure.",
    processSteps: [
      { title: "Keyword Research & Mapping", description: "Identify high-value keywords and strategically map them to relevant pages on your website." },
      { title: "Content Audit", description: "Analyze existing content for optimization opportunities and content gaps." },
      { title: "Title & Meta Optimization", description: "Craft compelling, keyword-rich titles and meta descriptions that drive clicks." },
      { title: "Content Enhancement", description: "Optimize and expand content to meet user intent and search engine requirements." },
      { title: "Technical On-Page Elements", description: "Implement schema markup, optimize images, and improve internal linking structure." },
    ],
    faqs: [
      { question: "What is On-Page SEO?", answer: "On-Page SEO refers to the practice of optimizing individual web pages to rank higher in search engines. This includes optimizing content, HTML source code, images, and internal links." },
      { question: "How often should On-Page SEO be updated?", answer: "We recommend reviewing and updating on-page elements quarterly, with continuous monitoring for high-priority pages. Algorithm updates may require more frequent adjustments." },
      { question: "What's the difference between On-Page and Off-Page SEO?", answer: "On-Page SEO focuses on elements within your website that you can control directly. Off-Page SEO involves external factors like backlinks and brand mentions that build authority." },
      { question: "How do you measure On-Page SEO success?", answer: "We track keyword rankings, organic traffic, click-through rates, bounce rates, and conversion rates to measure the effectiveness of on-page optimizations." },
    ],
    keyBenefits: [
      "Improved search engine rankings",
      "Higher click-through rates from search results",
      "Better user experience and engagement",
      "Increased organic traffic",
      "Foundation for all other SEO efforts",
      "Long-lasting results with proper maintenance",
    ],
    testimonialSnippet: {
      quote: "Our organic traffic increased by 150% within 6 months of implementing DigiPulse's on-page SEO recommendations.",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
    },
  },
  "technical-seo": {
    description: "Ensure your website meets all technical requirements for search engine crawling, indexing, and ranking.",
    longDescription: "Technical SEO forms the backbone of your website's search performance. Without a solid technical foundation, even the best content won't reach its full ranking potential. Our technical SEO services address all aspects of website architecture, speed optimization, mobile-friendliness, and crawlability to ensure search engines can efficiently access and index your content.",
    processSteps: [
      { title: "Technical Audit", description: "Comprehensive analysis of your website's technical health using advanced crawling tools." },
      { title: "Speed Optimization", description: "Improve Core Web Vitals and page load times for better user experience and rankings." },
      { title: "Mobile Optimization", description: "Ensure your site provides an excellent experience on all mobile devices." },
      { title: "Crawlability Fixes", description: "Resolve issues preventing search engines from properly crawling and indexing your site." },
      { title: "Schema Implementation", description: "Add structured data markup to help search engines understand your content better." },
    ],
    faqs: [
      { question: "What are Core Web Vitals?", answer: "Core Web Vitals are Google's metrics for measuring user experience: Largest Contentful Paint (loading), First Input Delay (interactivity), and Cumulative Layout Shift (visual stability)." },
      { question: "How does site speed affect SEO?", answer: "Site speed is a confirmed ranking factor. Faster sites provide better user experience, leading to lower bounce rates and higher engagement, which positively impacts rankings." },
      { question: "What is crawlability?", answer: "Crawlability refers to a search engine's ability to access and crawl all the content on your website. Issues like blocked resources, broken links, or poor site structure can hinder crawlability." },
      { question: "How often should technical SEO be reviewed?", answer: "We recommend monthly technical audits to catch issues early, with comprehensive quarterly reviews and after any major site changes." },
    ],
    keyBenefits: [
      "Faster page load times",
      "Improved Core Web Vitals scores",
      "Better mobile experience",
      "Enhanced crawlability and indexation",
      "Rich snippets through schema markup",
      "Strong foundation for all SEO efforts",
    ],
    testimonialSnippet: {
      quote: "DigiPulse improved our site speed by 60% and fixed critical indexing issues we didn't even know existed.",
      author: "Michael Chen",
      company: "GlobalTech Solutions",
    },
  },
};

export const getSubcategoryData = (
  subcategoryId: string,
  subcategoryTitle: string,
  serviceName: string,
  items: string[]
): SubcategoryDetail => {
  // Check if we have custom data for this subcategory
  if (customSubcategoryData[subcategoryId]) {
    return customSubcategoryData[subcategoryId];
  }
  
  // Generate default content based on subcategory info
  return generateDefaultContent(subcategoryTitle, serviceName, items);
};

// Icons for different aspects of subcategory pages
export const processIcons: LucideIcon[] = [Search, Lightbulb, Settings, TrendingUp, Award];
export const benefitIcons: LucideIcon[] = [CheckCircle, Zap, Shield, Users, Target, Rocket];
