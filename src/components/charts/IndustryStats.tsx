import { motion } from 'framer-motion';
import { Building2, Users, Globe, Award, TrendingUp, Clock } from 'lucide-react';
import { CountUp } from '../AnimatedSection';

const stats = [
  { icon: Building2, numericValue: 500, suffix: '+', label: 'Projects Delivered', color: 'from-blue-500 to-cyan-500', increase: '+45%' },
  { icon: Users, numericValue: 300, suffix: '+', label: 'Happy Clients', color: 'from-purple-500 to-pink-500', increase: '+38%' },
  { icon: Globe, numericValue: 15, suffix: '+', label: 'Countries Served', color: 'from-green-500 to-emerald-500', increase: '+25%' },
  { icon: Award, numericValue: 98, suffix: '%', label: 'Client Satisfaction', color: 'from-amber-500 to-orange-500', increase: '+12%' },
  { icon: TrendingUp, numericValue: 3.2, suffix: 'x', label: 'Average ROI', color: 'from-rose-500 to-red-500', increase: '+22%', decimals: 1 },
  { icon: Clock, numericValue: 15, suffix: '+', label: 'Years Experience', color: 'from-indigo-500 to-blue-500', increase: '' },
];

const IndustryStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-card rounded-2xl border border-border p-5 text-center hover:border-primary/50 hover:shadow-lg transition-all group"
        >
          <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            <CountUp end={stat.numericValue} suffix={stat.suffix} duration={2} />
          </div>
          <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
          {stat.increase && (
            <div className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              {stat.increase}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default IndustryStats;
