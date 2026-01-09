import { 
  Sparkles, 
  Clock, 
  Target, 
  Award, 
  Users, 
  Briefcase, 
  TrendingUp,
  BookOpen,
  LucideIcon
} from "lucide-react";

export interface AcademyBenefit {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  fullTitle: string;
  description: string;
  color: string;
  gradient: string;
  features: string[];
  stats: { value: string; label: string }[];
  details: {
    title: string;
    content: string;
  }[];
}

export const academyBenefitsData: AcademyBenefit[] = [
  {
    id: "ai-integrated-syllabus",
    slug: "ai-integrated-syllabus",
    icon: Sparkles,
    title: "AI-Integrated Syllabus",
    shortDesc: "Latest Digital Marketing + AI integrated curriculum",
    fullTitle: "Latest Digital Marketing + AI Integrated Syllabus",
    description: "Stay ahead of the curve with our cutting-edge curriculum that combines traditional digital marketing with the latest AI technologies. Learn to leverage AI tools for content creation, automation, and data analysis.",
    color: "text-violet-500",
    gradient: "from-violet-500 to-purple-600",
    features: [
      "AI-powered content creation tools",
      "ChatGPT & AI copywriting integration",
      "AI image and video generation",
      "Automated marketing workflows",
      "Machine learning for marketing insights",
      "AI chatbot development",
      "Predictive analytics with AI",
      "AI-driven personalization strategies"
    ],
    stats: [
      { value: "20+", label: "AI Tools Covered" },
      { value: "50+", label: "Practical Exercises" },
      { value: "100%", label: "Industry Relevant" },
      { value: "Weekly", label: "Curriculum Updates" }
    ],
    details: [
      {
        title: "Why AI Integration Matters",
        content: "The digital marketing landscape is rapidly evolving with AI at its core. Our curriculum ensures you're not just learning current practices but preparing for the future of marketing where AI will be essential for competitive advantage."
      },
      {
        title: "Tools You'll Master",
        content: "From ChatGPT to MidJourney, from Jasper AI to automated email systems, you'll gain hands-on experience with the tools that are transforming how businesses market themselves online."
      },
      {
        title: "Practical AI Applications",
        content: "Every AI concept is taught through practical applications. You'll create AI-generated content, build automated workflows, and analyze data using AI tools that you can immediately apply in your career."
      }
    ]
  },
  {
    id: "in-depth-training",
    slug: "in-depth-training",
    icon: Clock,
    title: "6-Month In-Depth Training",
    shortDesc: "Comprehensive training from basics to advanced level",
    fullTitle: "6 Months In-Depth Training: Basics to Advanced",
    description: "Our comprehensive 6-month program takes you from complete beginner to industry-ready professional. Each module builds upon the previous, ensuring deep understanding and practical skill development.",
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Month 1-2: Core digital marketing foundations",
      "Month 3-4: Advanced strategies and techniques",
      "Month 5-6: Specialization and portfolio building",
      "Progressive skill development path",
      "Regular assessments and feedback",
      "Capstone project completion",
      "Industry certification preparation",
      "Portfolio-ready project work"
    ],
    stats: [
      { value: "6", label: "Months Duration" },
      { value: "720+", label: "Training Hours" },
      { value: "12", label: "Core Modules" },
      { value: "30+", label: "Projects" }
    ],
    details: [
      {
        title: "Structured Learning Path",
        content: "Our 6-month curriculum is carefully structured to ensure progressive skill development. Each week builds upon the previous, creating a solid foundation before advancing to complex concepts."
      },
      {
        title: "Monthly Milestones",
        content: "Every month comes with specific learning objectives and practical milestones. You'll track your progress and celebrate achievements as you advance through the program."
      },
      {
        title: "Comprehensive Coverage",
        content: "From SEO to social media, from paid advertising to analytics, every aspect of digital marketing is covered in depth with enough time for practical application and mastery."
      }
    ]
  },
  {
    id: "daily-practical-sessions",
    slug: "daily-practical-sessions",
    icon: Target,
    title: "Daily Practical Sessions",
    shortDesc: "Hands-on experience with real tools and examples",
    fullTitle: "Daily Practical Sessions with Real Tools & Examples",
    description: "Theory without practice is incomplete. Our daily practical sessions ensure you work with industry-standard tools, real campaigns, and live examples every single day of the course.",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
    features: [
      "8 hours of daily hands-on training",
      "Live tool demonstrations",
      "Real campaign management practice",
      "Industry tool access included",
      "Live website optimization exercises",
      "Real-time analytics monitoring",
      "Social media management practice",
      "Paid advertising simulation"
    ],
    stats: [
      { value: "8hrs", label: "Daily Practice" },
      { value: "50+", label: "Tools Access" },
      { value: "100+", label: "Live Exercises" },
      { value: "Daily", label: "Hands-On Work" }
    ],
    details: [
      {
        title: "Learn By Doing",
        content: "Every concept taught is immediately practiced. You won't just hear about SEO techniques – you'll optimize real websites. You won't just learn about ads – you'll create and manage actual campaigns."
      },
      {
        title: "Real Tool Experience",
        content: "Get hands-on experience with Google Analytics, Google Ads, Facebook Business Suite, SEMrush, Ahrefs, Canva Pro, and 40+ other industry-standard tools."
      },
      {
        title: "Daily Challenges",
        content: "Each day includes practical challenges that test your learning and push you to apply concepts creatively. These challenges simulate real-world scenarios you'll face in your career."
      }
    ]
  },
  {
    id: "expert-trainers",
    slug: "expert-trainers",
    icon: Award,
    title: "Expert Industry Trainers",
    shortDesc: "Learn from professionals with real-world experience",
    fullTitle: "Expert Trainers with Real-World Industry Experience",
    description: "Our trainers are not just educators – they're active industry professionals who bring real campaign experience, current trends, and practical insights to every class.",
    color: "text-amber-500",
    gradient: "from-amber-500 to-orange-500",
    features: [
      "Trainers with 10+ years industry experience",
      "Active digital marketing professionals",
      "Google & Facebook certified experts",
      "Agency and brand-side experience",
      "Regular guest sessions from industry leaders",
      "One-on-one mentorship opportunities",
      "Real case studies from their campaigns",
      "Current industry insights and trends"
    ],
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "500+", label: "Students Trained" },
      { value: "100+", label: "Campaigns Managed" },
      { value: "5★", label: "Trainer Rating" }
    ],
    details: [
      {
        title: "Learn From The Best",
        content: "Our trainers have managed campaigns for leading brands, grown businesses from scratch, and stayed current with every algorithm update. Their experience becomes your advantage."
      },
      {
        title: "Industry Connections",
        content: "Beyond teaching, our trainers connect you with their professional network, providing opportunities for internships, projects, and job placements that textbooks can't offer."
      },
      {
        title: "Current & Relevant",
        content: "Because our trainers are active professionals, what you learn is always current. No outdated techniques – only strategies that work in today's competitive landscape."
      }
    ]
  },
  {
    id: "small-batch-sizes",
    slug: "small-batch-sizes",
    icon: Users,
    title: "Small Batch Sizes",
    shortDesc: "Personalized attention in every session",
    fullTitle: "Small Batch Sizes for Personalized Attention",
    description: "We limit our batch sizes to ensure every student receives individual attention, personalized feedback, and the support needed to truly master digital marketing skills.",
    color: "text-rose-500",
    gradient: "from-rose-500 to-pink-500",
    features: [
      "Maximum 15 students per batch",
      "Individual doubt clearing sessions",
      "Personalized learning pace",
      "Direct trainer interaction",
      "Customized feedback on projects",
      "One-on-one mentoring sessions",
      "Peer learning environment",
      "Collaborative group projects"
    ],
    stats: [
      { value: "15", label: "Max Batch Size" },
      { value: "1:15", label: "Student Ratio" },
      { value: "100%", label: "Doubt Resolution" },
      { value: "Weekly", label: "1-on-1 Sessions" }
    ],
    details: [
      {
        title: "No Student Left Behind",
        content: "With small batch sizes, every question gets answered, every doubt gets cleared, and every student gets the attention they deserve. Your learning journey is truly personalized."
      },
      {
        title: "Peer Learning Benefits",
        content: "Small batches foster meaningful connections with fellow learners. Collaborate on projects, share insights, and build a professional network that lasts beyond the course."
      },
      {
        title: "Tailored Support",
        content: "Whether you need extra help with analytics or want to dive deeper into content marketing, our small batch approach allows trainers to tailor support to your specific needs and interests."
      }
    ]
  },
  {
    id: "portfolio-development",
    slug: "portfolio-development",
    icon: Briefcase,
    title: "Portfolio Development",
    shortDesc: "Build a professional portfolio for career success",
    fullTitle: "Portfolio Development for Jobs, Freelancing & Business",
    description: "Graduate with a professional portfolio showcasing real projects, campaign results, and practical work that demonstrates your skills to potential employers or clients.",
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-violet-500",
    features: [
      "10+ portfolio-worthy projects",
      "Real campaign case studies",
      "Documented results and metrics",
      "Professional presentation format",
      "LinkedIn optimization",
      "Personal branding development",
      "Freelance profile setup",
      "Interview-ready project stories"
    ],
    stats: [
      { value: "10+", label: "Portfolio Projects" },
      { value: "100%", label: "Real Work" },
      { value: "3", label: "Case Studies" },
      { value: "Job", label: "Ready Portfolio" }
    ],
    details: [
      {
        title: "Show, Don't Tell",
        content: "In digital marketing, a strong portfolio speaks louder than any resume. Every project you complete is designed to be portfolio-worthy, showcasing your skills with real metrics and results."
      },
      {
        title: "Multiple Format Options",
        content: "Your portfolio is optimized for different scenarios – job applications, freelance pitches, or business presentations. Each project includes documentation suitable for any professional context."
      },
      {
        title: "Continuous Building",
        content: "Portfolio development happens throughout the course, not just at the end. By graduation, you'll have a comprehensive showcase of work that demonstrates growth and expertise."
      }
    ]
  },
  {
    id: "career-guidance",
    slug: "career-guidance",
    icon: TrendingUp,
    title: "Complete Career Support",
    shortDesc: "Interview preparation and freelancing roadmap",
    fullTitle: "Career Guidance, Interview Prep & Freelancing Roadmap",
    description: "Our support extends beyond the classroom with comprehensive career guidance including interview preparation, resume building, and a complete roadmap for freelancing success.",
    color: "text-teal-500",
    gradient: "from-teal-500 to-cyan-500",
    features: [
      "Resume and cover letter building",
      "Mock interview sessions",
      "LinkedIn profile optimization",
      "Freelancing platform setup",
      "Client acquisition strategies",
      "Pricing and negotiation training",
      "Job placement assistance",
      "Alumni network access"
    ],
    stats: [
      { value: "90%", label: "Placement Rate" },
      { value: "30+", label: "Hiring Partners" },
      { value: "100+", label: "Mock Interviews" },
      { value: "Lifetime", label: "Career Support" }
    ],
    details: [
      {
        title: "Employment Ready",
        content: "From crafting the perfect resume to acing technical interviews, we prepare you for every step of the job search process. Our placement assistance connects you with hiring companies."
      },
      {
        title: "Freelancing Success Path",
        content: "Want to work independently? We provide a complete roadmap for freelancing – from setting up profiles on Upwork and Fiverr to acquiring your first clients and scaling your business."
      },
      {
        title: "Lifetime Support",
        content: "Career support doesn't end at graduation. Our alumni network provides ongoing mentorship, job opportunities, and professional development resources throughout your career."
      }
    ]
  },
  {
    id: "certification-support",
    slug: "certification-support",
    icon: BookOpen,
    title: "Industry Certifications",
    shortDesc: "Get certified and recognized globally",
    fullTitle: "Industry Certifications & Global Recognition",
    description: "Earn industry-recognized certifications including our completion certificate and guidance for Google, Facebook, and HubSpot certifications that boost your professional credibility.",
    color: "text-emerald-500",
    gradient: "from-emerald-500 to-green-500",
    features: [
      "Academy completion certificate",
      "Practical skills certification",
      "Google Ads certification prep",
      "Google Analytics certification prep",
      "Meta Blueprint guidance",
      "HubSpot certification support",
      "LinkedIn skill badges",
      "Portfolio verification certificate"
    ],
    stats: [
      { value: "5+", label: "Certifications" },
      { value: "100%", label: "Pass Rate" },
      { value: "Global", label: "Recognition" },
      { value: "Verified", label: "Credentials" }
    ],
    details: [
      {
        title: "Multi-Level Certification",
        content: "Graduate with multiple certifications – our academy certificate for completing the program, plus industry certifications from Google, Meta, and other leading platforms."
      },
      {
        title: "Certification Preparation",
        content: "We don't just teach content – we prepare you to pass certification exams. Practice tests, exam strategies, and targeted preparation ensure you succeed in official certifications."
      },
      {
        title: "Verified Credentials",
        content: "All certificates are verifiable and shareable on LinkedIn. Employers and clients can confirm your credentials, adding credibility to your professional profile."
      }
    ]
  }
];

export const getAcademyBenefitBySlug = (slug: string): AcademyBenefit | undefined => {
  return academyBenefitsData.find(benefit => benefit.slug === slug);
};
