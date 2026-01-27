import { TrendingUp, Target, Award, Rocket } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

interface TimelineMetric {
  label: string;
  before: string;
  month3: string;
  after: string;
}

interface ResultsTimelineProps {
  metrics?: TimelineMetric[];
  serviceTitle?: string;
}

const defaultMetrics: TimelineMetric[] = [
  { label: "Organic Traffic", before: "2,500", month3: "8,500", after: "25,000+" },
  { label: "Conversion Rate", before: "1.2%", month3: "2.8%", after: "4.5%" },
  { label: "Revenue", before: "₹5L/mo", month3: "₹15L/mo", after: "₹45L/mo" },
  { label: "ROI", before: "0x", month3: "2.5x", after: "6x" },
];

const ResultsTimeline = ({ metrics = defaultMetrics, serviceTitle }: ResultsTimelineProps) => {
  const timelineStages = [
    { label: "Before", sublabel: "Starting Point", icon: Target, color: "from-gray-400 to-gray-500" },
    { label: "Month 3", sublabel: "Early Growth", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
    { label: "Month 6", sublabel: "Full Impact", icon: Award, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Typical Client Journey</h3>
          <p className="text-sm text-muted-foreground">Average results from our {serviceTitle || "services"}</p>
        </div>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        {/* Timeline Header */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-sm font-medium text-muted-foreground">Metric</div>
          {timelineStages.map((stage, index) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-10 h-10 mx-auto rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center mb-2`}>
                <stage.icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold text-foreground">{stage.label}</div>
              <div className="text-xs text-muted-foreground">{stage.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Connecting Line */}
        <div className="relative mb-6">
          <div className="absolute top-1/2 left-[25%] right-[25%] h-1 bg-gradient-to-r from-gray-300 via-blue-400 to-green-500 rounded-full -translate-y-1/2" />
          <div className="grid grid-cols-4">
            <div />
            {timelineStages.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex justify-center"
              >
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`grid grid-cols-4 gap-4 p-3 rounded-xl ${index % 2 === 0 ? "bg-muted/30" : ""}`}
            >
              <div className="text-sm font-medium text-foreground">{metric.label}</div>
              <div className="text-center text-muted-foreground text-sm">{metric.before}</div>
              <div className="text-center text-blue-600 font-medium text-sm">{metric.month3}</div>
              <div className="text-center text-green-600 font-bold text-sm">{metric.after}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline (Vertical) */}
      <div className="md:hidden space-y-6">
        {timelineStages.map((stage, stageIndex) => {
          const values = metrics.map((m) =>
            stageIndex === 0 ? m.before : stageIndex === 1 ? m.month3 : m.after
          );

          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stageIndex * 0.1 }}
              className={`p-4 rounded-xl border ${
                stageIndex === 2 ? "border-green-500/50 bg-green-500/5" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center`}>
                  <stage.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{stage.label}</div>
                  <div className="text-xs text-muted-foreground">{stage.sublabel}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric, metricIndex) => (
                  <div key={metric.label} className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className={`text-lg font-bold ${
                      stageIndex === 2 ? "text-green-600" : stageIndex === 1 ? "text-blue-600" : "text-muted-foreground"
                    }`}>
                      {values[metricIndex]}
                    </div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          *Results based on average client performance. Individual results may vary based on industry, competition, and effort.
        </p>
      </div>
    </div>
  );
};

export default ResultsTimeline;
