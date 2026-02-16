import {
  Building2,
  Zap,
  TrendingUp,
  Target,
  Crown,
} from "lucide-react";

export interface StageService {
  name: string;
  slug: string;
}

export interface StageExample {
  business: string;
  scenario: string;
  result: string;
}

export interface StageFAQ {
  q: string;
  a: string;
}

export interface StageStep {
  title: string;
  description: string;
}

export interface GrowthStage {
  number: number;
  slug: string;
  name: string;
  objective: string;
  description: string;
  detailedDescription: string;
  services: StageService[];
  outcomes: string[];
  emotionalLine: string;
  icon: typeof Building2;
  accent: string;
  accentBg: string;
  examples: StageExample[];
  steps: StageStep[];
  faqs: StageFAQ[];
  analogy: string;
  whyItMatters: string;
}

export const growthStages: GrowthStage[] = [
  {
    number: 1,
    slug: "digital-foundation",
    name: "Digital Foundation",
    objective: "Build your online home — a website that actually gets customers",
    description:
      "Think of this like building a shop. Before you invite anyone in, the shop needs to look professional, be easy to walk through, and make people want to buy. We create a beautiful, fast website that works perfectly on phones and computers, design a logo and brand identity people remember, and make sure everything is set up so visitors actually take action — like calling you, filling out a form, or buying something.",
    detailedDescription:
      "Your digital foundation is the single most important investment you'll make online. It's everything your customers see and interact with — your website, your brand look, your logo, your colours, and the experience someone has when they visit your pages. Without a strong foundation, every rupee you spend on ads or marketing is partially wasted because people arrive at a confusing or unprofessional site and leave. A great foundation turns casual visitors into paying customers.",
    services: [
      { name: "Website Design", slug: "web-design" },
      { name: "Conversion UI/UX", slug: "conversion-ui-ux" },
      { name: "Branding & Design", slug: "branding-design" },
      { name: "Custom Development", slug: "custom-development" },
    ],
    outcomes: [
      "A professional website that works great on all devices",
      "A clear path for visitors to become customers",
      "A brand look & feel that people remember",
      "A strong technical setup that can grow with your business",
    ],
    emotionalLine: "Your business finally looks and feels like a market leader.",
    icon: Building2,
    accent: "from-blue-500 to-cyan-500",
    accentBg: "bg-blue-500/10",
    analogy: "Think of your website like a physical shop on a busy street. If the shop looks old, the door is hard to open, and the items are scattered everywhere — people will walk in, get confused, and walk right out. But if the shop is clean, well-lit, easy to navigate, and has a friendly sign outside — people walk in and buy. Your website IS your shop. We make it irresistible.",
    whyItMatters: "Studies show that 75% of people judge a business's credibility based on its website design alone. A slow, confusing, or ugly website can lose you customers before they even read what you offer. Your digital foundation is not just about looking good — it's about building trust instantly.",
    examples: [
      {
        business: "A local bakery in Mumbai",
        scenario: "They were getting orders only through phone calls and WhatsApp. Their old website was slow, hard to navigate on phones, and had no way to order online.",
        result: "We built a modern, mobile-friendly website with online ordering, clear photos of their products, and a simple checkout. Within 2 months, online orders made up 40% of their total sales.",
      },
      {
        business: "A B2B software company",
        scenario: "Their website looked outdated and didn't explain their product clearly. Potential clients were confused about what the company actually did.",
        result: "We redesigned their site with clear messaging, demo videos, and a prominent 'Book a Demo' button. Demo requests increased by 65% in the first quarter.",
      },
      {
        business: "A fitness trainer going online",
        scenario: "They had no website at all — just an Instagram page. They wanted to sell online courses but had no platform.",
        result: "We built a professional website with course listings, payment integration, and testimonials. They went from ₹0 online revenue to ₹2.5 lakh/month within 3 months.",
      },
    ],
    steps: [
      { title: "Discovery & Research", description: "We learn about your business, your customers, and your competitors. We figure out what your ideal customer expects when they visit your website." },
      { title: "Brand Identity Design", description: "We create or refine your logo, colours, fonts, and visual style — so everything looks consistent and professional across your website, social media, and marketing materials." },
      { title: "Website Design & Build", description: "We design and build your website from scratch, making sure it loads fast, looks stunning on phones and computers, and guides visitors toward taking action (buying, calling, or signing up)." },
      { title: "Conversion Optimization", description: "We add clear call-to-action buttons, trust signals (like testimonials and certifications), and simple contact forms so visitors are encouraged to become customers." },
      { title: "Testing & Launch", description: "We test everything — speed, mobile responsiveness, forms, links — and then launch your new digital home to the world." },
    ],
    faqs: [
      { q: "How long does it take to build a website?", a: "A typical business website takes 3–6 weeks from start to launch. More complex sites with e-commerce or custom features may take 6–10 weeks. We give you a clear timeline before we start." },
      { q: "What if I already have a website?", a: "We'll review your current website and recommend whether it needs a redesign or just improvements. Sometimes small changes (faster loading, better buttons, clearer text) can make a huge difference." },
      { q: "Will I be able to update the website myself?", a: "Yes! We build websites with easy-to-use content management systems. We'll also train you or your team on how to make basic updates like adding blog posts, changing images, or updating prices." },
      { q: "Do I need a logo before getting a website?", a: "No. If you don't have a logo or brand identity yet, we create one for you as part of this stage. Everything is designed to work together." },
    ],
  },
  {
    number: 2,
    slug: "automation-intelligence",
    name: "Automation & Intelligence",
    objective: "Set up smart tools that work for you 24/7 — even while you sleep",
    description:
      "Imagine hiring a super-efficient assistant who never sleeps and never forgets. That's what automation does. We set up systems that automatically send welcome emails to new customers, follow up with people who showed interest, track what's working and what's not, and give you simple reports showing exactly how your business is doing — all without you lifting a finger.",
    detailedDescription:
      "Once your digital foundation is ready, the next step is making it smart. Automation means setting up systems that do repetitive tasks automatically — like sending a thank-you email when someone makes a purchase, reminding a customer about items left in their cart, or scoring leads so your sales team knows who to call first. Intelligence means using data and AI to make better decisions — like knowing which marketing channel brings the most revenue, or predicting which customers are likely to buy again. Together, they save you time, reduce errors, and help your business run like a well-oiled machine.",
    services: [
      { name: "Marketing Automation", slug: "marketing-automation-crm" },
      { name: "Email Marketing", slug: "email-marketing" },
      { name: "Analytics & AI", slug: "analytics-ai-technology" },
      { name: "AI Marketing", slug: "ai-marketing" },
      { name: "SaaS Products", slug: "saas-products" },
    ],
    outcomes: [
      "Automatic follow-up emails that nurture interested people into buyers",
      "Simple dashboards showing how your business is performing",
      "AI tools that help you make smarter marketing decisions",
      "Up to 80% less time spent on repetitive manual work",
    ],
    emotionalLine: "Your systems work for you — even while you sleep.",
    icon: Zap,
    accent: "from-violet-500 to-purple-500",
    accentBg: "bg-violet-500/10",
    analogy: "Imagine you run a restaurant. Without automation, you're the chef, the waiter, the cashier, and the host — all at once. With automation, you hire a team of robots that take orders, send bills, follow up with customers for feedback, and remind regulars about new dishes — all automatically. You just focus on cooking great food (running your core business).",
    whyItMatters: "Businesses that use marketing automation see an average 14.5% increase in sales productivity and a 12.2% reduction in marketing overhead. More importantly, you stop losing customers simply because you forgot to follow up — the system never forgets.",
    examples: [
      {
        business: "An online clothing store",
        scenario: "They had thousands of website visitors but no way to follow up with people who browsed but didn't buy. Potential sales were slipping away every day.",
        result: "We set up automated 'abandoned cart' emails and a welcome email series for new subscribers. This alone recovered ₹4 lakh in lost sales in the first month.",
      },
      {
        business: "A real estate agency",
        scenario: "Their sales team was spending 3+ hours daily manually calling and emailing leads. They couldn't tell which leads were serious and which were just browsing.",
        result: "We implemented a CRM with lead scoring and automated email sequences. The team saved 15 hours/week and closed 30% more deals because they focused on the hottest leads.",
      },
      {
        business: "A coaching institute",
        scenario: "They collected inquiries on paper and often forgot to follow up. Many interested students enrolled elsewhere because they didn't hear back in time.",
        result: "We set up automatic WhatsApp and email follow-ups that triggered the moment someone filled the inquiry form. Enrollment rate increased by 45%.",
      },
    ],
    steps: [
      { title: "Audit Your Current Process", description: "We map out every manual task your team does — emails, follow-ups, data entry, reporting — and identify which ones can be automated." },
      { title: "Set Up Your CRM", description: "A CRM (Customer Relationship Manager) is like a digital address book on steroids. It stores every customer interaction, tracks where each person is in the buying journey, and reminds your team what to do next." },
      { title: "Build Email & WhatsApp Sequences", description: "We create automatic message sequences — welcome emails, follow-up reminders, special offers — that send at exactly the right time without you pressing a button." },
      { title: "Connect Analytics Dashboards", description: "We set up simple, visual reports that show you — in plain numbers — how many visitors you're getting, how many are buying, and where your money is going." },
      { title: "AI-Powered Optimization", description: "We add intelligent tools that analyse patterns in your data and suggest improvements — like which subject line gets more emails opened, or which time of day gets the best responses." },
    ],
    faqs: [
      { q: "Is automation expensive?", a: "Not at all. Many automation tools have free or affordable plans for small businesses. The time and money you save far outweighs the cost — most businesses see a return within the first month." },
      { q: "Will automation make my business feel impersonal?", a: "The opposite! Good automation makes your communication more personal because messages are timed and customised based on each person's behaviour. Customers feel like you're paying attention to them individually." },
      { q: "Do I need to be technical to use these tools?", a: "No. We set everything up for you and train your team. Most modern automation tools are designed to be used by non-technical people with simple drag-and-drop interfaces." },
      { q: "What if I have a very small team?", a: "That's exactly when automation helps the most! A team of 2-3 people with good automation can do the work of a team of 10. It's like giving your small team superpowers." },
    ],
  },
  {
    number: 3,
    slug: "traffic-audience-growth",
    name: "Traffic & Audience Growth",
    objective: "Get the right people to find and visit your business online",
    description:
      "Now that your 'shop' looks great and runs smartly, it's time to bring in visitors. Think of this like putting up signs on every major road pointing to your store. We help people find you when they search on Google (that's SEO), run targeted ads, create helpful content, and build a social media presence that attracts your ideal customers.",
    detailedDescription:
      "Having a beautiful, automated website means nothing if nobody visits it. Traffic is the lifeblood of any online business. In this stage, we focus on getting the RIGHT people — not just anyone — to discover and visit your business. We use a mix of strategies: making your website show up on Google when people search for what you sell (SEO), running paid ads that appear to your ideal customers (PPC), creating helpful content like blogs and videos that attract people naturally, and building an active social media presence that turns followers into customers. The key is not just getting more visitors, but getting the RIGHT visitors who are likely to buy.",
    services: [
      { name: "SEO Services", slug: "seo" },
      { name: "PPC Advertising", slug: "ppc" },
      { name: "Social Media", slug: "social-media" },
      { name: "Content Marketing", slug: "content-marketing" },
      { name: "Video Marketing", slug: "video-marketing" },
      { name: "Programmatic Ads", slug: "programmatic-advertising" },
    ],
    outcomes: [
      "Your business shows up at the top when people search on Google",
      "Paid ads that actually make more money than they cost",
      "An active social media presence that attracts followers and customers",
      "Helpful blogs and videos that bring visitors to your site every day",
    ],
    emotionalLine: "Your brand becomes impossible to ignore.",
    icon: TrendingUp,
    accent: "from-emerald-500 to-teal-500",
    accentBg: "bg-emerald-500/10",
    analogy: "Imagine you opened an amazing restaurant in a hidden alley. The food is excellent, the ambiance is perfect — but nobody knows it exists. Traffic generation is like putting signs on the main road, getting food bloggers to review you, appearing on Google Maps, and running social media ads. Suddenly, people start showing up every day.",
    whyItMatters: "93% of all online experiences begin with a search engine. If your business doesn't appear when people search for your products or services, they'll find your competitor instead. Paid ads give you instant visibility, while SEO builds long-term traffic that you don't have to keep paying for.",
    examples: [
      {
        business: "A dental clinic in Delhi",
        scenario: "They relied entirely on word-of-mouth referrals and had zero online presence. New patient growth had plateaued.",
        result: "We optimised their Google Business Profile, ran local SEO, and started Google Ads targeting 'dentist near me' searches. New patient appointments increased by 120% in 4 months.",
      },
      {
        business: "An online education platform",
        scenario: "They had great courses but nobody was finding them on Google. Their blog had zero traffic.",
        result: "We created a content strategy with 20+ SEO-optimised articles targeting student search queries. Organic traffic grew from 500 to 15,000 monthly visitors in 6 months.",
      },
      {
        business: "A D2C skincare brand",
        scenario: "They were spending ₹5 lakh/month on ads but couldn't tell which campaigns were working. Cost per customer acquisition was too high.",
        result: "We restructured their ad campaigns, added retargeting, and created video ads for social media. They got 3× more customers for the same budget.",
      },
    ],
    steps: [
      { title: "Keyword & Audience Research", description: "We find out exactly what your potential customers are searching for on Google and which social media platforms they use most. This tells us where to focus our efforts." },
      { title: "SEO Optimization", description: "We optimise your website's content, speed, and structure so Google understands what you offer and shows you higher in search results. Think of it as 'teaching' Google about your business." },
      { title: "Paid Advertising Setup", description: "We create targeted ad campaigns on Google and social media that show your business to people who are actively looking for what you sell. You only pay when someone actually clicks." },
      { title: "Content Creation", description: "We create helpful, interesting content — blog posts, videos, social media posts — that attracts people to your website naturally. Great content builds trust before someone even talks to you." },
      { title: "Track & Optimize", description: "We monitor every campaign and channel, doubling down on what works and cutting what doesn't. Your budget always goes where it gets the best results." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "SEO is like planting a tree — it takes 3-6 months to see significant growth, but once it grows, it provides shade (traffic) for years without extra cost. Paid ads, on the other hand, give instant results." },
      { q: "Should I do SEO or paid ads?", a: "Both! Paid ads give you immediate visibility while SEO builds over time. Think of paid ads as renting a billboard and SEO as buying the building. We recommend a mix based on your budget." },
      { q: "How much should I spend on ads?", a: "It depends on your industry and goals. We typically recommend starting with a test budget, measuring results, and then scaling what works. We'll never ask you to spend more than what makes sense for your business." },
      { q: "Do I need to post on social media every day?", a: "Quality beats quantity. We create a realistic posting schedule that your team can maintain — whether that's 3 times a week or daily. Consistency matters more than frequency." },
    ],
  },
  {
    number: 4,
    slug: "conversion-revenue-optimisation",
    name: "Conversion & Revenue Optimisation",
    objective: "Turn more visitors into paying customers — without spending more on ads",
    description:
      "Getting visitors is only half the job — now we need to turn them into buyers. Imagine 100 people walk into your shop, but only 2 buy something. We work on increasing that to 5, 10, or even 20 buyers — from the same 100 visitors.",
    detailedDescription:
      "This is where the magic happens. You're already getting visitors to your website — but how many of them actually buy, sign up, or contact you? If 100 people visit and only 2 take action, that's a 2% conversion rate. Our job is to increase that to 4%, 6%, or even 10% — which means doubling or tripling your revenue WITHOUT spending a single extra rupee on advertising. We do this by analysing how people behave on your website (where they click, where they leave, what confuses them), testing different versions of pages to find what works best, simplifying the buying process, and building trust through reviews, guarantees, and clear communication.",
    services: [
      { name: "CRO Services", slug: "conversion-optimization" },
      { name: "E-commerce Marketing", slug: "ecommerce-marketing" },
      { name: "Amazon Marketing", slug: "amazon-marketing" },
    ],
    outcomes: [
      "30–50% more visitors turning into actual customers",
      "Customers spending more per purchase on average",
      "Better performance on Amazon and online marketplaces",
      "Continuous testing to keep improving results over time",
    ],
    emotionalLine: "Every visitor counts. Every rupee works harder.",
    icon: Target,
    accent: "from-orange-500 to-amber-500",
    accentBg: "bg-orange-500/10",
    analogy: "Imagine a shop where 100 people walk in every day but only 2 buy something. Most shop owners react by trying to get MORE people to walk in (spending more on advertising). But what if, instead, you rearranged the shop, trained the staff to be friendlier, put the best-selling items at eye level, and made checkout faster? Now 10 out of 100 buy. Same traffic, 5× more sales. That's conversion optimisation.",
    whyItMatters: "A 1% improvement in conversion rate can mean thousands or even lakhs of extra revenue per month — using the same traffic you're already getting. It's literally the most cost-effective way to grow your business because you don't need to spend more on ads or marketing.",
    examples: [
      {
        business: "An e-commerce fashion store",
        scenario: "They were getting 50,000 monthly visitors but only 1.5% were buying. Their checkout process was confusing with too many steps.",
        result: "We simplified checkout from 5 steps to 2, added trust badges, and showed customer reviews on product pages. Conversion rate jumped to 3.2% — effectively doubling their revenue overnight.",
      },
      {
        business: "A SaaS company selling project management tools",
        scenario: "Their free trial sign-up page had a conversion rate of only 8%. Most visitors left without signing up because the page was too text-heavy.",
        result: "We redesigned the page with a clear headline, a 30-second demo video, and a simplified sign-up form (just email — no credit card). Sign-ups increased to 22%.",
      },
      {
        business: "An Amazon seller in electronics",
        scenario: "Their products were on Amazon but listings were poorly optimised with bad photos and generic descriptions. They were losing to competitors with similar products.",
        result: "We rewrote their product listings with keyword-rich titles, professional photos, A+ content, and managed their reviews strategy. Sales increased by 85% in 3 months.",
      },
    ],
    steps: [
      { title: "Conversion Audit", description: "We analyse your website with heatmaps and recordings to see exactly where visitors get confused, lose interest, or leave. It's like watching a security camera of your shop to see where people drop off." },
      { title: "Identify Quick Wins", description: "Some improvements are simple but powerful — like changing a button colour, simplifying a form, or adding a customer testimonial in the right place. We find and fix these first for fast results." },
      { title: "A/B Testing", description: "We create two versions of a page (Version A and Version B) and show them to different visitors. Whichever version gets more sales wins. This removes guesswork — data decides." },
      { title: "Checkout & Funnel Optimization", description: "We streamline the path from 'interested visitor' to 'paying customer'. Every extra click, every confusing form field, every unclear message is a chance for someone to leave. We remove all friction." },
      { title: "Marketplace Optimization", description: "If you sell on Amazon or other platforms, we optimise your product listings, images, pricing strategy, and review management to outperform competitors." },
    ],
    faqs: [
      { q: "What is a good conversion rate?", a: "It varies by industry, but most websites convert between 1-3% of visitors. After optimisation, we typically help businesses reach 4-8%. Even a small improvement can mean big revenue gains." },
      { q: "How do you know what to change on my website?", a: "We use data, not opinions. Tools like heatmaps show where people click, scroll, and leave. Session recordings let us watch (anonymously) how visitors navigate your site. The data tells us exactly what needs to change." },
      { q: "Will I need to redesign my entire website?", a: "Usually no! Most conversion improvements are small, targeted changes — a better headline, a clearer button, a simplified form. Sometimes small tweaks create the biggest impact." },
      { q: "How quickly will I see results from CRO?", a: "Quick wins can show results within 1-2 weeks. Larger tests take 4-6 weeks to gather enough data. But since you're improving existing traffic, every improvement directly translates to more revenue." },
    ],
  },
  {
    number: 5,
    slug: "scale-authority",
    name: "Scale & Authority",
    objective: "Become the go-to name in your industry and grow without limits",
    description:
      "At this point, your business is running smoothly, customers are flowing in, and revenue is growing. Now it's time to become the biggest name in your space.",
    detailedDescription:
      "This is the final and most exciting stage. Your digital foundation is solid, your systems are automated, traffic is flowing in, and conversions are optimised. Now it's time to scale — which means multiplying your results, expanding into new markets, and establishing your brand as THE authority in your industry. Scaling isn't just about doing more of the same; it's about doing things smarter. We train your team to be self-sufficient, implement advanced growth strategies that create compounding returns, and position your brand so strongly that competitors look up to you. Think of this like going from a single shop to a chain — the systems are in place, now we multiply.",
    services: [
      { name: "Training Programs", slug: "training-programs" },
      { name: "Growth Hacking", slug: "growth-hacking" },
    ],
    outcomes: [
      "People in your industry know and trust your brand",
      "Your own team is skilled enough to drive growth independently",
      "A self-sustaining system that keeps growing on its own",
      "Results that multiply every quarter, not just add up",
    ],
    emotionalLine: "You're no longer competing — you're setting the standard.",
    icon: Crown,
    accent: "from-rose-500 to-pink-500",
    accentBg: "bg-rose-500/10",
    analogy: "Think of your business growth like a snowball rolling downhill. In stages 1-4, you shaped the snowball and gave it a push. In Stage 5, the snowball is big enough and moving fast enough that it grows on its own — getting bigger and faster with each rotation. That's compounding growth. Your brand, your systems, and your team all work together to create momentum that's almost unstoppable.",
    whyItMatters: "Most businesses hit a ceiling because their growth depends on the founder's time and energy. Scaling breaks that ceiling by building systems and teams that grow the business independently. Companies that successfully scale see 10-30× returns over 3-5 years compared to businesses that stay stuck doing everything manually.",
    examples: [
      {
        business: "A digital marketing agency (our own story)",
        scenario: "Started with 3 people handling everything manually — client calls, ad management, reporting. Growth was limited by the founders' time.",
        result: "By implementing all 5 stages ourselves, we scaled to 50+ team members, 500+ clients, and became a recognised name in the industry — all while the founders work fewer hours than before.",
      },
      {
        business: "A regional FMCG brand",
        scenario: "They were strong in one state but wanted to expand nationally. Their marketing was uncoordinated across channels and regions.",
        result: "We unified their marketing under one strategy, trained regional teams, and implemented growth hacking techniques. They expanded from 1 state to 8 states in 18 months with 4× revenue growth.",
      },
      {
        business: "A professional services firm",
        scenario: "They were known locally but invisible online. Competing with larger firms that had bigger budgets and national presence.",
        result: "We positioned the founder as a thought leader through content, PR, and speaking engagements. They now get inbound inquiries from across the country and have been featured in 3 major publications.",
      },
    ],
    steps: [
      { title: "Growth Audit & Strategy", description: "We look at everything built in stages 1-4 and identify the biggest opportunities for multiplication. Where can we 2×, 5×, or 10× results?" },
      { title: "Team Training & Empowerment", description: "We train your internal team on digital marketing best practices so they can handle day-to-day operations independently. Your business shouldn't depend on any single person or agency." },
      { title: "Advanced Growth Hacking", description: "We implement creative, data-driven growth strategies — referral programs, viral loops, partnership marketing, influencer collaborations — that create exponential (not just linear) growth." },
      { title: "Thought Leadership & PR", description: "We position your brand and founders as industry experts through content creation, public speaking, media features, and strategic partnerships. Authority attracts customers without advertising." },
      { title: "Continuous Optimization", description: "Growth is never 'done'. We continuously monitor, test, and improve every part of your growth system — finding new opportunities and eliminating bottlenecks as they appear." },
    ],
    faqs: [
      { q: "Am I ready to scale?", a: "If you have a working product/service, a website that converts, and consistent (even if small) revenue — you're ready. We'll assess exactly where you are and what needs to happen first." },
      { q: "How long does it take to become an 'authority'?", a: "Building genuine authority takes 6-12 months of consistent effort. But the results compound — once you're seen as an expert, opportunities come to you instead of you chasing them." },
      { q: "Will I still need your help after scaling?", a: "Our goal is to make your team self-sufficient. After the scaling phase, many clients transition to a lighter advisory relationship where we check in quarterly and help with strategic decisions. You won't be dependent on us." },
      { q: "What if my industry is very competitive?", a: "Competition actually makes authority MORE valuable. When everyone offers similar products, the brand that's seen as the expert wins. We help you stand out not by competing on price, but by competing on trust and reputation." },
    ],
  },
];

export const getStageBySlug = (slug: string): GrowthStage | undefined =>
  growthStages.find((s) => s.slug === slug);
