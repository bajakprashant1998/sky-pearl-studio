import { TrendingUp, Users, Award, Globe } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "500+",
    label: "Successful Campaigns",
  },
  {
    icon: Users,
    value: "10M+",
    label: "Leads Generated",
  },
  {
    icon: Award,
    value: "50+",
    label: "Industry Awards",
  },
  {
    icon: Globe,
    value: "30+",
    label: "Countries Served",
  },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
