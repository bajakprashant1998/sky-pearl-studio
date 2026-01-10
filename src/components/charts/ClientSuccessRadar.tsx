import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const data = [
  { subject: 'SEO Rankings', A: 92, fullMark: 100 },
  { subject: 'Brand Awareness', A: 88, fullMark: 100 },
  { subject: 'Lead Generation', A: 85, fullMark: 100 },
  { subject: 'Conversion Rate', A: 78, fullMark: 100 },
  { subject: 'Customer Retention', A: 90, fullMark: 100 },
  { subject: 'ROI', A: 95, fullMark: 100 },
];

const ClientSuccessRadar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Success Metrics</h3>
          <p className="text-sm text-muted-foreground">Client achievement scores</p>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value}%`, 'Score']}
            />
            <Radar
              name="Performance"
              dataKey="A"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ClientSuccessRadar;
