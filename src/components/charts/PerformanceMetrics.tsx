import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const data = [
  { metric: 'Traffic', before: 35, after: 85 },
  { metric: 'Leads', before: 25, after: 78 },
  { metric: 'Conversions', before: 20, after: 72 },
  { metric: 'Revenue', before: 30, after: 88 },
  { metric: 'ROI', before: 40, after: 92 },
];

const PerformanceMetrics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Performance Boost</h3>
          <p className="text-sm text-muted-foreground">Before vs After our services</p>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis dataKey="metric" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value}%`, '']}
            />
            <Bar dataKey="before" fill="hsl(var(--muted-foreground))" name="Before" radius={[0, 4, 4, 0]} />
            <Bar dataKey="after" fill="hsl(var(--primary))" name="After" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted-foreground" />
          <span className="text-sm text-muted-foreground">Before</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">After</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics;
