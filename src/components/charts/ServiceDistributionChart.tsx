import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon } from 'lucide-react';

const data = [
  { name: 'SEO', value: 25, color: '#3b82f6' },
  { name: 'PPC', value: 20, color: '#8b5cf6' },
  { name: 'Social Media', value: 18, color: '#ec4899' },
  { name: 'Content', value: 15, color: '#f97316' },
  { name: 'Web Design', value: 12, color: '#22c55e' },
  { name: 'Email', value: 10, color: '#14b8a6' },
];

const ServiceDistributionChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <PieChartIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Service Distribution</h3>
          <p className="text-sm text-muted-foreground">Client project breakdown by service</p>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${value}%`, '']}
            />
            <Legend
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ServiceDistributionChart;
