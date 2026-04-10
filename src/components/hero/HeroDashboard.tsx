import { CheckCircle2, Star, TrendingUp, Users, Award, Zap, Globe, BarChart3 } from "lucide-react";
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
      {/* Floating decorative elements around dashboard */}
      <motion.div
        className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center"
        animate={{ y: [-8, 8, -8], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="w-8 h-8 text-primary/60" />
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -left-4 w-16 h-16 bg-accent/10 rounded-xl border border-accent/20 flex items-center justify-center"
        animate={{ y: [6, -6, 6], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Globe className="w-6 h-6 text-accent/60" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 -right-8 w-14 h-14 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center"
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <BarChart3 className="w-5 h-5 text-green-600/60" />
      </motion.div>

      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-card rounded-3xl border border-border shadow-2xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] rounded-3xl" />
          
          <div className="relative z-10">
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
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-primary/5 rounded-full" />
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
                className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/20 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-accent/5 rounded-full" />
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

            {/* Animated Chart with glow */}
            <div className="h-32 bg-muted/50 rounded-xl flex items-end justify-between px-4 pb-4 gap-2 overflow-hidden relative">
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-t-sm cursor-pointer relative"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                  whileHover={{ scaleY: 1.1, filter: "brightness(1.2)" }}
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
        </div>
      </motion.div>
    </div>
  );
};

export default HeroDashboard;
