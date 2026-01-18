import { 
  Briefcase,
  Star,
  ShoppingBag,
  Gamepad2,
  Pill,
  Palette,
  Clapperboard,
  FileArchive,
  LucideIcon
} from "lucide-react";

export interface UpcomingPlatform {
  id: string;
  name: string;
  tagline: string;
  website: string;
  url: string;
  description: string;
  fullDescription: string;
  icon: LucideIcon;
  color: string;
  status: "upcoming";
  launchDate: string; // ISO date string for countdown
  plannedFeatures: string[];
  targetMarket: string[];
  visionStatement: string;
  problemSolving: string;
  uniqueValue: string[];
}

export const upcomingPlatforms: UpcomingPlatform[] = [
  {
    id: "hireforjob",
    name: "HireForJob",
    tagline: "Global Job Portal",
    website: "www.hireforjob.com",
    url: "https://www.hireforjob.com",
    description: "A next-generation recruitment platform connecting global talent with employers across industries.",
    fullDescription: "HireForJob is designed to revolutionize the recruitment landscape by creating a seamless bridge between talented professionals and forward-thinking employers worldwide. Our AI-powered platform will feature advanced matching algorithms, video interviewing capabilities, skills assessments, and a comprehensive talent management system that makes hiring faster, smarter, and more effective.",
    icon: Briefcase,
    color: "from-indigo-500 to-indigo-300",
    status: "upcoming",
    launchDate: "2026-06-15",
    plannedFeatures: [
      "AI-powered job matching algorithm",
      "Video interview integration",
      "Skills assessment platform",
      "Resume builder and optimizer",
      "Employer dashboard with analytics",
      "Mobile-first job search experience",
      "Salary insights and negotiation tools",
      "Career path recommendations"
    ],
    targetMarket: [
      "Job Seekers",
      "HR Professionals",
      "Recruiters",
      "Enterprise Companies",
      "Startups",
      "Staffing Agencies"
    ],
    visionStatement: "To democratize employment opportunities globally by connecting the right talent with the right opportunities through intelligent technology.",
    problemSolving: "Traditional job portals lack intelligent matching, making job hunting tedious and recruitment inefficient. HireForJob uses AI to ensure perfect candidate-job fits.",
    uniqueValue: [
      "Real-time job market analytics",
      "Verified employer profiles",
      "Skill-based matching over keyword matching",
      "Integrated career development resources",
      "Global reach with local insights"
    ]
  },
  {
    id: "kundlichart",
    name: "KundliChart",
    tagline: "Astrology Portal",
    website: "www.kundlichart.com",
    url: "https://www.kundlichart.com",
    description: "An advanced astrology platform offering personalized kundli charts, predictions, and life insights.",
    fullDescription: "KundliChart brings the ancient wisdom of Vedic astrology into the digital age. Our platform combines traditional astrological calculations with modern technology to provide accurate birth charts, detailed predictions, compatibility analyses, and personalized life guidance. Whether you're seeking insights about career, relationships, or life decisions, KundliChart offers comprehensive astrological solutions.",
    icon: Star,
    color: "from-amber-500 to-amber-300",
    status: "upcoming",
    launchDate: "2026-08-01",
    plannedFeatures: [
      "Accurate Kundli generation",
      "Detailed horoscope predictions",
      "Compatibility matching (Kundli Milan)",
      "Daily/Weekly/Monthly horoscopes",
      "Panchang and muhurat finder",
      "Expert astrologer consultations",
      "Gemstone recommendations",
      "Remedial solutions and puja suggestions"
    ],
    targetMarket: [
      "Astrology Enthusiasts",
      "Spiritual Seekers",
      "Families (for marriage matching)",
      "Business Owners (for muhurat)",
      "Individuals seeking life guidance",
      "Astrology Students"
    ],
    visionStatement: "To make authentic Vedic astrology accessible to everyone, empowering individuals with cosmic insights for better life decisions.",
    problemSolving: "Finding authentic and accurate astrological guidance is challenging. KundliChart provides verified, algorithmic accuracy combined with expert human interpretation.",
    uniqueValue: [
      "Algorithm-verified accuracy",
      "Expert astrologer network",
      "Multi-language support",
      "Privacy-first approach",
      "Personalized recommendations"
    ]
  },
  {
    id: "makeonindia",
    name: "MakeOnIndia",
    tagline: "Marketplace & E-Commerce",
    website: "www.makeonindia.com",
    url: "https://www.makeonindia.com",
    description: "A 'Make in India' driven marketplace empowering Indian brands, manufacturers, and entrepreneurs.",
    fullDescription: "MakeOnIndia is a patriotic e-commerce platform dedicated to promoting Indian products, artisans, and manufacturers. We provide a marketplace where authentic Indian brands can reach domestic and global customers, supporting the 'Make in India' initiative while empowering local entrepreneurs and preserving traditional crafts alongside modern innovations.",
    icon: ShoppingBag,
    color: "from-orange-500 to-orange-300",
    status: "upcoming",
    launchDate: "2026-07-01",
    plannedFeatures: [
      "Verified Indian seller marketplace",
      "Direct manufacturer connections",
      "Artisan and handicraft section",
      "B2B wholesale platform",
      "Export facilitation services",
      "Quality certification badges",
      "Regional product discovery",
      "Seller training and support"
    ],
    targetMarket: [
      "Indian Manufacturers",
      "Artisans and Craftspeople",
      "Small Business Owners",
      "Conscious Consumers",
      "International Buyers",
      "Wholesale Distributors"
    ],
    visionStatement: "To become the definitive platform for Indian products, connecting local excellence with global opportunities.",
    problemSolving: "Indian manufacturers and artisans struggle to reach wider markets. MakeOnIndia provides the platform, tools, and reach they need to scale.",
    uniqueValue: [
      "100% Made in India focus",
      "Direct artisan connections",
      "Export-ready infrastructure",
      "Cultural heritage preservation",
      "Community-driven growth"
    ]
  },
  {
    id: "gametoxic",
    name: "GameToxic",
    tagline: "Gaming Development Platform",
    website: "www.gametoxic.com",
    url: "https://www.gametoxic.com",
    description: "A future-ready gaming ecosystem for players, developers, and esports communities.",
    fullDescription: "GameToxic is building the ultimate gaming ecosystem that brings together gamers, developers, streamers, and esports enthusiasts. From game discovery and community building to developer tools and esports tournament management, GameToxic aims to be the central hub for everything gaming in the Indian subcontinent and beyond.",
    icon: Gamepad2,
    color: "from-red-500 to-red-300",
    status: "upcoming",
    launchDate: "2026-09-15",
    plannedFeatures: [
      "Game discovery and reviews",
      "Developer publishing platform",
      "Esports tournament management",
      "Streaming integration",
      "Gaming community forums",
      "In-game rewards and achievements",
      "Pro player profiles and stats",
      "Gaming news and updates"
    ],
    targetMarket: [
      "Casual Gamers",
      "Esports Athletes",
      "Game Developers",
      "Streamers and Content Creators",
      "Gaming Communities",
      "Tournament Organizers"
    ],
    visionStatement: "To create the definitive gaming ecosystem that nurtures talent, celebrates games, and builds vibrant communities.",
    problemSolving: "The gaming industry lacks a unified platform for discovery, community, and esports. GameToxic brings everything under one roof.",
    uniqueValue: [
      "India-focused gaming community",
      "Indie developer support",
      "Integrated esports infrastructure",
      "Multi-platform compatibility",
      "Gaming career pathways"
    ]
  },
  {
    id: "drugseffect",
    name: "DrugsEffect",
    tagline: "Medicine Directory",
    website: "www.drugseffect.com",
    url: "https://www.drugseffect.com",
    description: "A comprehensive healthcare and medicine information portal for users and professionals.",
    fullDescription: "DrugsEffect is your trusted source for medicine information, drug interactions, side effects, and healthcare guidance. Our platform provides comprehensive, verified medical information to help patients, caregivers, and healthcare professionals make informed decisions. We combine medical expertise with accessible technology to democratize health information.",
    icon: Pill,
    color: "from-teal-500 to-teal-300",
    status: "upcoming",
    launchDate: "2026-10-01",
    plannedFeatures: [
      "Comprehensive drug database",
      "Drug interaction checker",
      "Side effects information",
      "Generic alternatives finder",
      "Dosage calculators",
      "Medicine reminder system",
      "Healthcare professional directory",
      "Patient education resources"
    ],
    targetMarket: [
      "Patients and Caregivers",
      "Healthcare Professionals",
      "Pharmacists",
      "Medical Students",
      "Health-conscious Individuals",
      "Senior Citizens"
    ],
    visionStatement: "To empower everyone with accurate, accessible medicine information for safer healthcare decisions.",
    problemSolving: "Reliable medicine information is often scattered and hard to understand. DrugsEffect centralizes and simplifies health information for everyone.",
    uniqueValue: [
      "Doctor-verified information",
      "Easy-to-understand content",
      "Regional language support",
      "Interaction checker tool",
      "Privacy-first health tracking"
    ]
  },
  {
    id: "yourdesignstory",
    name: "YourDesignStory",
    tagline: "Artist & Creative Portal",
    website: "www.yourdesignstory.com",
    url: "https://www.yourdesignstory.com",
    description: "A digital stage for artists, designers, and creative professionals to showcase and grow.",
    fullDescription: "YourDesignStory is the ultimate platform for creative professionals to showcase their work, connect with clients, and grow their careers. From graphic designers and illustrators to photographers and UI/UX designers, our platform provides portfolio hosting, project marketplace, creative resources, and a thriving community of fellow artists.",
    icon: Palette,
    color: "from-fuchsia-500 to-fuchsia-300",
    status: "upcoming",
    launchDate: "2026-08-15",
    plannedFeatures: [
      "Professional portfolio hosting",
      "Client project marketplace",
      "Creative community and forums",
      "Design resource library",
      "Skill development courses",
      "Client management tools",
      "Collaboration features",
      "Revenue analytics dashboard"
    ],
    targetMarket: [
      "Graphic Designers",
      "Illustrators",
      "Photographers",
      "UI/UX Designers",
      "Creative Agencies",
      "Brands seeking creatives"
    ],
    visionStatement: "To be the home for every creative professional, where portfolios meet opportunities and artists thrive.",
    problemSolving: "Creatives struggle to showcase work professionally and find quality clients. YourDesignStory provides the platform and marketplace they need.",
    uniqueValue: [
      "Beautiful portfolio themes",
      "Direct client connections",
      "Community-driven growth",
      "Learning resources included",
      "Revenue tracking tools"
    ]
  },
  {
    id: "hindifilmcinema",
    name: "HindiFilmCinema",
    tagline: "Hindi Film Industry Portal",
    website: "www.hindifilmcinema.com",
    url: "https://www.hindifilmcinema.com",
    description: "A complete Bollywood hub with film news, reviews, trailers, interviews, and industry articles.",
    fullDescription: "HindiFilmCinema is the definitive destination for everything Bollywood and Hindi cinema. From breaking industry news and exclusive interviews to in-depth reviews and behind-the-scenes content, we bring fans closer to the movies and stars they love. Our platform also serves as a resource for aspiring filmmakers and industry professionals.",
    icon: Clapperboard,
    color: "from-rose-500 to-rose-300",
    status: "upcoming",
    launchDate: "2026-07-15",
    plannedFeatures: [
      "Breaking Bollywood news",
      "Movie reviews and ratings",
      "Exclusive celebrity interviews",
      "Box office tracking",
      "Trailer and teaser premieres",
      "Industry directory",
      "Film festival coverage",
      "User reviews and discussions"
    ],
    targetMarket: [
      "Bollywood Fans",
      "Film Critics",
      "Industry Professionals",
      "Aspiring Filmmakers",
      "Entertainment Media",
      "International Hindi Cinema Fans"
    ],
    visionStatement: "To be the most trusted and comprehensive source for Hindi film entertainment and industry insights.",
    problemSolving: "Quality Bollywood content is scattered across unreliable sources. HindiFilmCinema provides verified, professional entertainment journalism.",
    uniqueValue: [
      "Verified industry sources",
      "Exclusive content access",
      "Community engagement features",
      "Industry professional network",
      "Multi-format content"
    ]
  },
  {
    id: "filesbundle",
    name: "FilesBundle",
    tagline: "Digital Files Marketplace",
    website: "www.filesbundle.com",
    url: "https://www.filesbundle.com",
    description: "A marketplace for listing, selling, and downloading digital assets like templates, design files, and tools.",
    fullDescription: "FilesBundle is the premier marketplace for digital assets and creative resources. From design templates and code snippets to 3D models and audio files, creators can sell their digital products while buyers access high-quality resources for their projects. Our platform ensures secure transactions, fair creator compensation, and quality-verified assets.",
    icon: FileArchive,
    color: "from-cyan-500 to-cyan-300",
    status: "upcoming",
    launchDate: "2026-09-01",
    plannedFeatures: [
      "Digital asset marketplace",
      "Secure download system",
      "Creator dashboard and analytics",
      "Multiple file format support",
      "Licensing management",
      "Bundle and pack creation",
      "Affiliate program",
      "Quality verification system"
    ],
    targetMarket: [
      "Digital Creators",
      "Designers",
      "Developers",
      "Content Creators",
      "Agencies",
      "Freelancers"
    ],
    visionStatement: "To create the most creator-friendly digital marketplace where quality assets meet fair compensation.",
    problemSolving: "Selling digital assets often means low margins and poor discoverability. FilesBundle offers better terms and targeted audiences.",
    uniqueValue: [
      "Higher creator payouts",
      "Quality-verified assets",
      "Built-in licensing",
      "Creator analytics",
      "Global audience reach"
    ]
  }
];

export const getUpcomingPlatformBySlug = (slug: string): UpcomingPlatform | undefined => {
  return upcomingPlatforms.find(p => p.id === slug);
};
