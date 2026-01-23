import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface SkillsRadarChartProps {
  scrollProgress: MotionValue<number>;
}

// Skill progression data for each month (cumulative percentages)
const skillProgressionData = {
  'SEO & Content': [20, 85, 88, 90, 92, 95],
  'Social Media': [10, 20, 85, 90, 92, 95],
  'Paid Advertising': [5, 15, 25, 90, 92, 95],
  'Analytics & Data': [15, 30, 45, 85, 88, 95],
  'AI & Creative': [5, 10, 20, 30, 90, 95],
  'Career Readiness': [10, 20, 35, 50, 70, 100],
};

const skillCategories = Object.keys(skillProgressionData);

// Custom hook to get animated skill values
const useAnimatedSkills = (scrollProgress: MotionValue<number>) => {
  const [skills, setSkills] = React.useState<{ subject: string; value: number; fullMark: number }[]>([]);
  const [currentMonth, setCurrentMonth] = React.useState(1);

  React.useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (progress) => {
      // Map scroll progress to month (1-6)
      const month = Math.min(Math.max(Math.ceil(progress * 6), 1), 6);
      setCurrentMonth(month);

      // Calculate skill values with interpolation
      const newSkills = skillCategories.map((skill) => {
        const monthIndex = month - 1;
        const skillData = skillProgressionData[skill as keyof typeof skillProgressionData];
        
        // Get current month value with some interpolation for smoothness
        const monthProgress = (progress * 6) % 1;
        const currentValue = skillData[monthIndex];
        const nextValue = skillData[Math.min(monthIndex + 1, 5)] || currentValue;
        
        // Interpolate between current and next month values
        const interpolatedValue = currentValue + (nextValue - currentValue) * monthProgress;
        
        return {
          subject: skill,
          value: Math.round(interpolatedValue),
          fullMark: 100,
        };
      });

      setSkills(newSkills);
    });

    // Initialize with first month values
    setSkills(
      skillCategories.map((skill) => ({
        subject: skill,
        value: skillProgressionData[skill as keyof typeof skillProgressionData][0],
        fullMark: 100,
      }))
    );

    return () => unsubscribe();
  }, [scrollProgress]);

  return { skills, currentMonth };
};

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ scrollProgress }) => {
  const { skills, currentMonth } = useAnimatedSkills(scrollProgress);
  
  // Get gradient colors based on current month
  const getGradientColors = (month: number) => {
    const gradients = [
      { start: '#3B82F6', end: '#06B6D4' }, // Month 1-2: Blue to Cyan
      { start: '#3B82F6', end: '#06B6D4' }, // Month 1-2
      { start: '#8B5CF6', end: '#EC4899' }, // Month 3-4: Purple to Pink
      { start: '#8B5CF6', end: '#EC4899' }, // Month 3-4
      { start: '#F97316', end: '#EF4444' }, // Month 5: Orange to Red
      { start: '#10B981', end: '#059669' }, // Month 6: Green to Emerald
    ];
    return gradients[month - 1] || gradients[0];
  };

  const colors = getGradientColors(currentMonth);

  const monthLabels = [
    'Foundation',
    'SEO Mastery',
    'Social Media',
    'Paid Ads',
    'Performance',
    'AI & Career',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-background/80 backdrop-blur-xl rounded-2xl border border-primary/20 p-4 lg:p-6 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${colors.start}, ${colors.end})` 
            }}
          >
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm lg:text-base">Skill Progress</h3>
            <p className="text-xs text-muted-foreground">Real-time tracking</p>
          </div>
        </div>
        <motion.div
          key={currentMonth}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-3 py-1.5 rounded-full text-xs font-medium text-white"
          style={{ 
            background: `linear-gradient(135deg, ${colors.start}, ${colors.end})` 
          }}
        >
          Month {currentMonth}: {monthLabels[currentMonth - 1]}
        </motion.div>
      </div>

      {/* Radar Chart */}
      <div className="w-full h-[220px] lg:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.start} stopOpacity={0.8} />
                <stop offset="100%" stopColor={colors.end} stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="skillStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.start} />
                <stop offset="100%" stopColor={colors.end} />
              </linearGradient>
            </defs>
            <PolarGrid 
              stroke="hsl(var(--muted-foreground))" 
              strokeOpacity={0.2}
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ 
                fill: 'hsl(var(--foreground))', 
                fontSize: 10,
                fontWeight: 500
              }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ 
                fill: 'hsl(var(--muted-foreground))', 
                fontSize: 9 
              }}
              axisLine={false}
              tickCount={5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-sm font-medium text-foreground">{data.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        Proficiency: <span className="text-primary font-semibold">{data.value}%</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="url(#skillStroke)"
              fill="url(#skillGradient)"
              fillOpacity={0.5}
              strokeWidth={2}
              animationDuration={300}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {skills.slice(0, 4).map((skill, index) => (
          <motion.div
            key={skill.subject}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 border border-border/50"
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ 
                background: `linear-gradient(135deg, ${colors.start}, ${colors.end})` 
              }}
            />
            <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[80px]">
              {skill.subject}
            </span>
            <span 
              className="text-[10px] font-bold"
              style={{ color: colors.start }}
            >
              {skill.value}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsRadarChart;
