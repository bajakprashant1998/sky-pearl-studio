import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', traffic: 4000, conversions: 240, revenue: 24000 },
  { month: 'Feb', traffic: 5200, conversions: 310, revenue: 31000 },
  { month: 'Mar', traffic: 6800, conversions: 420, revenue: 42000 },
  { month: 'Apr', traffic: 8200, conversions: 510, revenue: 51000 },
  { month: 'May', traffic: 9500, conversions: 620, revenue: 62000 },
  { month: 'Jun', traffic: 11200, conversions: 750, revenue: 75000 },
];

const GrowthChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Growth Trajectory</h3>
          <p className="text-sm text-muted-foreground">Average client results over 6 months</p>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorTraffic)"
              strokeWidth={2}
              name="Traffic"
            />
            <Area
              type="monotone"
              dataKey="conversions"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorConversions)"
              strokeWidth={2}
              name="Conversions"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Conversions</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GrowthChart;
