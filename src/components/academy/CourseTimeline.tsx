import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  Share2,
  MousePointerClick,
  Brain,
  CheckCircle2,
  ChevronDown,
  Award,
  Clock,
  Zap,
} from "lucide-react";
import SkillsRadarChart from "./SkillsRadarChart";
import CertificatePreview from "./CertificatePreview";

interface TimelineMonth {
  month: string;
  label: string;
  title: string;
  gradient: string;
  icon: React.ElementType;
  modules: string[];
  totalHours: number;
  skills: number;
  milestone: string;
}

const timelineData: TimelineMonth[] = [
  {
    month: "1",
    label: "Month 1",
    title: "Digital Marketing Foundations",
    gradient: "from-blue-500 to-cyan-500",
    icon: Globe,
    modules: [
      "Digital Marketing Fundamentals",
      "Website & Landing Page Basics",
      "Introduction to SEO",
      "Content Strategy Fundamentals",
    ],
    totalHours: 100,
    skills: 12,
    milestone: "Foundation Certified",
  },
  {
    month: "2",
    label: "Month 2",
    title: "SEO Mastery & Content",
    gradient: "from-green-500 to-emerald-500",
    icon: Search,
    modules: [
      "Advanced On-Page SEO",
      "Off-Page SEO & Link Building",
      "Technical SEO Deep Dive",
      "SEO-Friendly Content Writing",
    ],
    totalHours: 100,
    skills: 15,
    milestone: "SEO Specialist",
  },
  {
    month: "3",
    label: "Month 3",
    title: "Social Media & Engagement",
    gradient: "from-pink-500 to-rose-500",
    icon: Share2,
    modules: [
      "Social Media Marketing Strategy",
      "Instagram & Facebook Mastery",
      "LinkedIn Marketing",
      "Community Building & Engagement",
    ],
    totalHours: 100,
    skills: 14,
    milestone: "Social Media Pro",
  },
  {
    month: "4",
    label: "Month 4",
    title: "Paid Advertising & Analytics",
    gradient: "from-orange-500 to-amber-500",
    icon: MousePointerClick,
    modules: [
      "Google Ads Fundamentals",
      "Social Media Advertising",
      "Google Analytics & Tracking",
      "Campaign Optimization",
    ],
    totalHours: 100,
    skills: 16,
    milestone: "Ads Certified",
  },
  {
    month: "5",
    label: "Month 5",
    title: "AI Creative Skills",
    gradient: "from-purple-500 to-violet-500",
    icon: Brain,
    modules: [
      "AI Website Designing Tools",
      "AI Graphic Design Mastery",
      "AI Video Editing & Creation",
      "Automation & AI Workflows",
    ],
    totalHours: 100,
    skills: 18,
    milestone: "AI Creative Expert",
  },
  {
    month: "6",
    label: "Month 6",
    title: "Career Prep & Live Projects",
    gradient: "from-indigo-500 to-blue-600",
    icon: Award,
    modules: [
      "Email & WhatsApp Marketing",
      "Online Reputation Management",
      "Live Client Projects",
      "Portfolio & Career Support",
    ],
    totalHours: 100,
    skills: 12,
    milestone: "Career Ready",
  },
];

const CourseTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = sectionProgress.on("change", (progress) => {
      setShowCertificate(progress > 0.85);
    });
    return () => unsubscribe();
  }, [sectionProgress]);

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleExpand = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative">
      {/* Background decorations (clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-4 h-4" />
            6-Month Journey
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Your Learning <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Follow your transformation from beginner to digital marketing expert with our structured 6-month timeline
          </p>
        </motion.div>

        {/* Scroll Progress Bar */}
        <div className="fixed top-20 left-0 right-0 h-1 bg-muted z-50 hidden lg:block">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: lineHeight }}
          />
        </div>

        {/* Main Layout: Timeline + Radar Chart */}
        <div className="lg:flex lg:gap-8 lg:items-start">
          {/* Timeline Container */}
          <div ref={containerRef} className="relative lg:flex-1">
            {/* Central Timeline Line - Desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border hidden lg:block transform -translate-x-1/2">
              <motion.div
                className="w-full bg-gradient-to-b from-primary via-accent to-primary rounded-full"
                style={{ height: lineHeight }}
              />
            </div>

            {/* Central Timeline Line - Mobile */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-border lg:hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-primary via-accent to-primary rounded-full"
                style={{ height: lineHeight }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-12 lg:space-y-24">
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={item.month}
                  item={item}
                  index={index}
                  isExpanded={expandedMonth === item.month}
                  onToggle={() => toggleExpand(item.month)}
                />
              ))}
            </div>

            {/* Completion Node */}
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="relative">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
                  animate={{ boxShadow: ["0 0 20px hsl(var(--primary) / 0.3)", "0 0 40px hsl(var(--primary) / 0.5)", "0 0 20px hsl(var(--primary) / 0.3)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Award className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-primary/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            <motion.p
              className="text-center mt-4 text-lg font-semibold text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              🎓 You're Certified & Career Ready!
            </motion.p>
          </div>

          {/* Skills Radar Chart - Sidebar */}
          <div className="hidden lg:block lg:w-80 lg:self-start">
            <SkillsRadarChart scrollProgress={scrollYProgress} />
          </div>
        </div>

        {/* Mobile Radar Chart */}
        <div className="lg:hidden mt-12">
          <SkillsRadarChart scrollProgress={scrollYProgress} />
        </div>

        {/* Certificate Preview */}
        <CertificatePreview 
          scrollProgress={scrollYProgress}
          isVisible={showCertificate}
        />
      </div>
    </section>
  );
};

interface TimelineItemProps {
  item: TimelineMonth;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const TimelineItem = ({ item, index, isExpanded, onToggle }: TimelineItemProps) => {
  const isLeft = index % 2 === 0;
  const Icon = item.icon;

  return (
    <motion.div
      className={`relative flex items-center gap-8 ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } flex-row`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Timeline Node */}
      <div className="absolute left-6 lg:left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg cursor-pointer`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
        >
          <Icon className="w-7 h-7 text-primary-foreground" />
        </motion.div>
        <motion.div
          className={`absolute -inset-2 rounded-full border-2 border-dashed ${
            isExpanded ? "border-primary" : "border-transparent"
          }`}
          animate={isExpanded ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content Card */}
      <div
        className={`w-full lg:w-[calc(50%-4rem)] ${
          isLeft ? "lg:pr-8 lg:ml-0" : "lg:pl-8 lg:mr-0"
        } ml-20 lg:ml-0`}
      >
        <motion.div
          className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer group"
          whileHover={{ y: -5 }}
          onClick={onToggle}
        >
          {/* Card Header */}
          <div className={`bg-gradient-to-r ${item.gradient} p-4 relative overflow-hidden`}>
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "15px 15px",
              }}
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-primary-foreground/80 text-sm font-medium">{item.label}</span>
                <h3 className="text-xl font-bold text-primary-foreground">{item.title}</h3>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-primary-foreground" />
              </motion.div>
            </div>
          </div>

          {/* Card Stats */}
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>{item.totalHours}+ Hrs</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{item.skills} Skills</span>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} text-primary-foreground`}>
              {item.milestone}
            </span>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground mb-3">Modules Covered:</p>
                  {item.modules.map((module, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {module}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block lg:w-[calc(50%-4rem)]" />
    </motion.div>
  );
};

export default CourseTimeline;
