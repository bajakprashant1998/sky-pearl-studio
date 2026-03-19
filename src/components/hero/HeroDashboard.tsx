import { CheckCircle2, Star, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

interface HeroDashboardProps {
  settings?: Record<string, any> | null;
}

const HeroDashboard = ({ settings }: HeroDashboardProps) => {
  const dashboardTraffic = settings?.hero_dashboard_traffic || "+247%";
  const dashboardLeads = settings?.hero_dashboard_leads || "10.2M";
  const dashboardRevenue = settings?.hero_dashboard_revenue || "$12M+";
  const dashboardRating = settings?.hero_dashboard_rating || "4.9/5";

  return (
    <div className="relative hidden lg:block px-6 pt-8 pb-4">
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-card rounded-3xl border border-border shadow-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Marketing Dashboard</h3>
              <p className="text-sm text-muted-foreground">Real-time analytics</p>
            </div>
            <div className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium flex items-center gap-1">
              <motion.span className="w-2 h-2 bg-green-500 rounded-full" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              Live
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Traffic</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{dashboardTraffic}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <motion.span animate={{ y: [-1, 1, -1] }} transition={{ duration: 1, repeat: Infinity }}>↑</motion.span>
                12% vs last month
              </div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-xs text-muted-foreground">Leads</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{dashboardLeads}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <motion.span animate={{ y: [-1, 1, -1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>↑</motion.span>
                8% vs last month
              </div>
            </motion.div>
          </div>

          {/* Animated Chart */}
          <div className="h-32 bg-muted/50 rounded-xl flex items-end justify-between px-4 pb-4 gap-2 overflow-hidden">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-sm cursor-pointer"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                whileHover={{ scaleY: 1.1 }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <motion.div className="flex items-center gap-2" animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{dashboardRevenue}</div>
                <div className="text-xs text-muted-foreground">Revenue</div>
              </div>
            </motion.div>
            <motion.div className="flex items-center gap-2" animate={{ y: [2, -2, 2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-primary fill-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{dashboardRating}</div>
                <div className="text-xs text-muted-foreground">Client Rating</div>
              </div>
            </motion.div>
            <motion.div className="flex items-center gap-2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-foreground">New Lead</div>
                <div className="text-[10px] text-muted-foreground">Just now</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroDashboard;
