import { 
  Building2, 
  Cpu, 
  Film, 
  HardHat, 
  TrendingUp, 
  Home as HomeIcon,
  LucideIcon
} from "lucide-react";

export interface VerticalPlatform {
  id: string;
  name: string;
  tagline: string;
  website: string;
  url: string;
  description: string;
  fullDescription: string;
  icon: LucideIcon;
  color: string;
  status: "live" | "upcoming";
  features: string[];
  stats: { label: string; value: string }[];
  targetAudience: string[];
  keyBenefits: string[];
  screenshots?: string[];
}

export const livePlatforms: VerticalPlatform[] = [
  {
    id: "cadbull",
    name: "Cadbull",
    tagline: "World's Largest AutoCAD Library",
    website: "www.cadbull.com",
    url: "https://www.cadbull.com",
    description: "Global hub for architects, civil engineers, and interior designers offering millions of professional AutoCAD DWG drawings including architectural plans, structural details, interiors, landscape, and 3D resources.",
    fullDescription: "Cadbull is the world's premier destination for CAD professionals, offering an unmatched collection of high-quality AutoCAD DWG files. Our platform serves architects, civil engineers, interior designers, and construction professionals worldwide with ready-to-use technical drawings that accelerate project timelines and enhance design quality. From detailed architectural plans to complex structural details, Cadbull provides the resources professionals need to bring their visions to life.",
    icon: Building2,
    color: "from-blue-600 to-blue-400",
    status: "live",
    features: [
      "Millions of professional AutoCAD DWG drawings",
      "Architectural plans and building designs",
      "Structural engineering details",
      "Interior design layouts and furniture blocks",
      "Landscape and urban planning resources",
      "3D models and renderings",
      "Regular content updates",
      "Advanced search and filtering",
      "Premium subscription options",
      "Community contributions and sharing"
    ],
    stats: [
      { label: "CAD Files", value: "5M+" },
      { label: "Active Users", value: "2M+" },
      { label: "Countries", value: "180+" },
      { label: "Downloads/Day", value: "50K+" }
    ],
    targetAudience: [
      "Architects & Architectural Firms",
      "Civil Engineers",
      "Interior Designers",
      "Construction Companies",
      "Urban Planners",
      "Students & Educators"
    ],
    keyBenefits: [
      "Save hundreds of hours on technical drawings",
      "Access industry-standard quality resources",
      "Reduce project costs significantly",
      "Stay updated with latest design trends",
      "Learn from professional examples"
    ]
  },
  {
    id: "shuttech",
    name: "Shuttech",
    tagline: "Technology Information Hub",
    website: "www.shuttech.com",
    url: "https://www.shuttech.com",
    description: "A modern technology portal delivering news, tutorials, software reviews, and insights on AI, web, apps, and emerging digital trends.",
    fullDescription: "Shuttech is your comprehensive guide to the ever-evolving world of technology. We deliver cutting-edge news, in-depth tutorials, unbiased software reviews, and expert insights on artificial intelligence, web development, mobile applications, and emerging digital trends. Our mission is to keep tech enthusiasts, developers, and professionals informed and ahead of the curve in the rapidly changing digital landscape.",
    icon: Cpu,
    color: "from-purple-600 to-purple-400",
    status: "live",
    features: [
      "Daily technology news and updates",
      "Comprehensive software reviews",
      "Step-by-step tutorials and guides",
      "AI and machine learning coverage",
      "Web development insights",
      "Mobile app reviews and recommendations",
      "Cybersecurity updates",
      "Product comparisons",
      "Expert opinion pieces",
      "Newsletter subscriptions"
    ],
    stats: [
      { label: "Articles", value: "10K+" },
      { label: "Monthly Readers", value: "500K+" },
      { label: "Tech Categories", value: "25+" },
      { label: "Expert Writers", value: "50+" }
    ],
    targetAudience: [
      "Technology Enthusiasts",
      "Software Developers",
      "IT Professionals",
      "Digital Marketers",
      "Startup Founders",
      "Tech Students"
    ],
    keyBenefits: [
      "Stay ahead of technology trends",
      "Make informed software decisions",
      "Learn new skills through tutorials",
      "Discover emerging technologies",
      "Connect with tech community"
    ]
  },
  {
    id: "castingscreen",
    name: "CastingScreen",
    tagline: "Talent Management Platform",
    website: "www.castingscreen.com",
    url: "https://www.castingscreen.com",
    description: "A professional ecosystem for talent discovery featuring artist profiles, casting opportunities, and networking for the entertainment and creative industries.",
    fullDescription: "CastingScreen revolutionizes how talent meets opportunity in the entertainment and creative industries. Our professional ecosystem connects actors, models, dancers, musicians, and creative professionals with casting directors, production houses, and agencies. With comprehensive profile management, real-time casting calls, and powerful networking tools, CastingScreen is the go-to platform for anyone looking to advance their career in entertainment.",
    icon: Film,
    color: "from-pink-600 to-pink-400",
    status: "live",
    features: [
      "Professional artist portfolio creation",
      "Real-time casting call notifications",
      "Direct messaging with casting directors",
      "Video audition submissions",
      "Agency and production house profiles",
      "Event and workshop listings",
      "Industry networking tools",
      "Resume and media gallery",
      "Verified profile badges",
      "Mobile app access"
    ],
    stats: [
      { label: "Artist Profiles", value: "100K+" },
      { label: "Casting Calls", value: "5K+" },
      { label: "Productions", value: "500+" },
      { label: "Successful Placements", value: "10K+" }
    ],
    targetAudience: [
      "Actors & Actresses",
      "Models",
      "Dancers & Performers",
      "Musicians & Singers",
      "Casting Directors",
      "Production Houses",
      "Talent Agencies"
    ],
    keyBenefits: [
      "Get discovered by top casting directors",
      "Access exclusive casting opportunities",
      "Build a professional online presence",
      "Connect with industry professionals",
      "Track audition progress and feedback"
    ]
  },
  {
    id: "civilengi",
    name: "CivilEngi",
    tagline: "Civil Engineering Technology",
    website: "www.civilengi.com",
    url: "https://www.civilengi.com",
    description: "A dedicated knowledge base for civil engineers and construction professionals with technical articles, methods, innovations, and industry updates.",
    fullDescription: "CivilEngi is the premier online resource for civil engineering professionals and construction industry experts. Our platform provides a comprehensive knowledge base covering structural engineering, geotechnical studies, transportation, water resources, and construction management. With technical articles, case studies, innovative methods, and industry news, CivilEngi empowers engineers to excel in their projects and stay current with industry developments.",
    icon: HardHat,
    color: "from-orange-600 to-orange-400",
    status: "live",
    features: [
      "Technical articles and research papers",
      "Construction methods and best practices",
      "Structural engineering calculators",
      "Project case studies",
      "Building codes and standards reference",
      "Material specifications database",
      "Career and job opportunities",
      "Continuing education resources",
      "Industry news and updates",
      "Expert Q&A forums"
    ],
    stats: [
      { label: "Technical Articles", value: "15K+" },
      { label: "Monthly Visitors", value: "300K+" },
      { label: "Engineering Topics", value: "100+" },
      { label: "Expert Contributors", value: "200+" }
    ],
    targetAudience: [
      "Civil Engineers",
      "Structural Engineers",
      "Construction Managers",
      "Architecture Professionals",
      "Engineering Students",
      "Infrastructure Planners"
    ],
    keyBenefits: [
      "Access reliable technical information",
      "Learn from real-world case studies",
      "Stay updated on industry standards",
      "Advance your engineering career",
      "Connect with fellow professionals"
    ]
  },
  {
    id: "dibull",
    name: "DiBull",
    tagline: "Digital Marketing, Development & Coaching",
    website: "www.dibull.com",
    url: "https://www.dibull.com",
    description: "A growth-driven platform providing digital marketing services, website and app development, and business & career coaching.",
    fullDescription: "DiBull is the flagship digital services platform of Digital Bull Technology, offering comprehensive solutions for businesses seeking growth in the digital age. From cutting-edge digital marketing strategies to custom website and application development, and transformative business coaching, DiBull provides end-to-end services that drive measurable results. Our expert team combines technical excellence with strategic insight to help businesses thrive online.",
    icon: TrendingUp,
    color: "from-primary to-blue-400",
    status: "live",
    features: [
      "Full-service digital marketing",
      "SEO and content optimization",
      "PPC and paid advertising",
      "Social media management",
      "Website design and development",
      "Mobile app development",
      "E-commerce solutions",
      "Business coaching and consulting",
      "Career development programs",
      "Analytics and reporting"
    ],
    stats: [
      { label: "Clients Served", value: "500+" },
      { label: "Projects Delivered", value: "1000+" },
      { label: "Industries", value: "50+" },
      { label: "Team Members", value: "100+" }
    ],
    targetAudience: [
      "Small & Medium Businesses",
      "Startups",
      "Enterprise Companies",
      "E-commerce Brands",
      "Entrepreneurs",
      "Professionals Seeking Growth"
    ],
    keyBenefits: [
      "Accelerate your digital growth",
      "Access expert marketing strategies",
      "Build powerful online presence",
      "Scale your business effectively",
      "Get personalized coaching support"
    ]
  },
  {
    id: "gift-city-property",
    name: "Gift City Property",
    tagline: "Real Estate Listing Portal",
    website: "www.giftcityproperty.com",
    url: "https://www.giftcityproperty.com",
    description: "A specialized real estate platform for GIFT City featuring commercial and residential property listings, projects, and investor-focused insights.",
    fullDescription: "Gift City Property is India's premier real estate portal dedicated exclusively to Gujarat International Finance Tec-City (GIFT City). As India's first operational smart city and International Financial Services Centre, GIFT City represents unprecedented investment opportunities. Our platform provides comprehensive property listings, project information, investment insights, and expert guidance for commercial and residential real estate in this rapidly developing financial hub.",
    icon: HomeIcon,
    color: "from-emerald-600 to-emerald-400",
    status: "live",
    features: [
      "Commercial property listings",
      "Residential property options",
      "New project launches",
      "Investment analysis tools",
      "Virtual property tours",
      "Developer profiles",
      "Market insights and reports",
      "Property comparison tools",
      "Expert consultation services",
      "Legal and documentation support"
    ],
    stats: [
      { label: "Property Listings", value: "1000+" },
      { label: "Registered Users", value: "50K+" },
      { label: "Partner Developers", value: "25+" },
      { label: "Transactions", value: "500+" }
    ],
    targetAudience: [
      "Real Estate Investors",
      "Financial Institutions",
      "Corporate Buyers",
      "NRI Investors",
      "Property Developers",
      "Business Establishments"
    ],
    keyBenefits: [
      "Access exclusive GIFT City properties",
      "Make informed investment decisions",
      "Get expert market insights",
      "Connect with verified developers",
      "Streamline property transactions"
    ]
  }
];

export const getVerticalBySlug = (slug: string): VerticalPlatform | undefined => {
  return livePlatforms.find(p => p.id === slug);
};
