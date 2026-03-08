import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, Calendar, ArrowUpRight, Zap } from "lucide-react";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const BUDGET_MAP: Record<string, number> = {
  "under-10k": 7500,
  "10k-25k": 17500,
  "25k-50k": 37500,
  "50k-1l": 75000,
  "1l-2l": 150000,
  "2l-5l": 350000,
  "5l+": 600000,
  "custom": 50000,
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

const AdminRevenueForecasting = () => {
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["revenue-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, budget, status, source, website_type, created_at")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const analytics = useMemo(() => {
    if (!leads.length) return null;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Monthly revenue data (last 12 months + 3 forecast)
    const monthlyData: { month: string; actual: number; forecast: number | null; leads: number }[] = [];
    const monthlyLeadCounts: number[] = [];
    const monthlyRevenues: number[] = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - i, 1);
      const m = d.getMonth();
      const y = d.getFullYear();
      const monthLeads = leads.filter((l) => {
        const ld = new Date(l.created_at);
        return ld.getMonth() === m && ld.getFullYear() === y;
      });
      const converted = monthLeads.filter((l) => l.status === "converted");
      const revenue = converted.reduce((sum, l) => sum + (BUDGET_MAP[l.budget || "custom"] || 50000), 0);
      monthlyLeadCounts.push(monthLeads.length);
      monthlyRevenues.push(revenue);
      monthlyData.push({
        month: `${MONTHS[m]} ${String(y).slice(2)}`,
        actual: revenue,
        forecast: null,
        leads: monthLeads.length,
      });
    }

    // Simple linear regression forecast
    const n = monthlyRevenues.length;
    const avgRevenue = monthlyRevenues.reduce((a, b) => a + b, 0) / n;
    const avgLeads = monthlyLeadCounts.reduce((a, b) => a + b, 0) / n;
    const recentAvg = monthlyRevenues.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const trend = n > 1 ? (monthlyRevenues[n - 1] - monthlyRevenues[0]) / n : 0;

    for (let i = 1; i <= 3; i++) {
      const d = new Date(currentYear, currentMonth + i, 1);
      const forecastVal = Math.max(0, Math.round(recentAvg + trend * i));
      monthlyData.push({
        month: `${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`,
        actual: 0,
        forecast: forecastVal,
        leads: 0,
      });
    }

    // KPIs
    const totalRevenue = monthlyRevenues.reduce((a, b) => a + b, 0);
    const thisMonthRevenue = monthlyRevenues[monthlyRevenues.length - 1] || 0;
    const lastMonthRevenue = monthlyRevenues[monthlyRevenues.length - 2] || 0;
    const growthRate = lastMonthRevenue > 0 ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;
    const conversionRate = leads.length > 0 ? (leads.filter((l) => l.status === "converted").length / leads.length) * 100 : 0;
    const avgDealSize = leads.filter((l) => l.status === "converted").length > 0
      ? leads.filter((l) => l.status === "converted").reduce((sum, l) => sum + (BUDGET_MAP[l.budget || "custom"] || 50000), 0) / leads.filter((l) => l.status === "converted").length
      : 0;
    const forecastNext3 = monthlyData.slice(-3).reduce((sum, d) => sum + (d.forecast || 0), 0);

    // Pipeline by status
    const statusPipeline = ["new", "contacted", "qualified", "converted", "lost"].map((status) => {
      const count = leads.filter((l) => l.status === status).length;
      const value = leads
        .filter((l) => l.status === status)
        .reduce((sum, l) => sum + (BUDGET_MAP[l.budget || "custom"] || 50000), 0);
      return { status: status.charAt(0).toUpperCase() + status.slice(1), count, value };
    });

    // Revenue by source
    const sources = [...new Set(leads.map((l) => l.source))];
    const revenueBySource = sources.map((source) => {
      const sourceLeads = leads.filter((l) => l.source === source && l.status === "converted");
      const value = sourceLeads.reduce((sum, l) => sum + (BUDGET_MAP[l.budget || "custom"] || 50000), 0);
      return { name: source.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), value };
    }).filter((s) => s.value > 0).sort((a, b) => b.value - a.value);

    return {
      monthlyData,
      totalRevenue,
      thisMonthRevenue,
      growthRate,
      conversionRate,
      avgDealSize,
      forecastNext3,
      statusPipeline,
      revenueBySource,
      totalLeads: leads.length,
    };
  }, [leads]);

  const formatCurrency = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
    return `₹${val}`;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-muted-foreground">No lead data available for forecasting.</div>
      </AdminLayout>
    );
  }

  const kpis = [
    {
      label: "Total Revenue",
      value: formatCurrency(analytics.totalRevenue),
      icon: DollarSign,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "This Month",
      value: formatCurrency(analytics.thisMonthRevenue),
      icon: Calendar,
      color: "bg-green-500/10 text-green-600",
      change: analytics.growthRate,
    },
    {
      label: "Conversion Rate",
      value: `${analytics.conversionRate.toFixed(1)}%`,
      icon: Target,
      color: "bg-accent/10 text-accent",
    },
    {
      label: "Avg Deal Size",
      value: formatCurrency(analytics.avgDealSize),
      icon: BarChart3,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      label: "3-Month Forecast",
      value: formatCurrency(analytics.forecastNext3),
      icon: Zap,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      label: "Total Leads",
      value: analytics.totalLeads,
      icon: ArrowUpRight,
      color: "bg-blue-500/10 text-blue-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Revenue Forecasting</h1>
          <p className="text-muted-foreground mt-1">Predict subscription revenue trends based on lead pipeline</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-card rounded-2xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {kpi.label}
                {"change" in kpi && kpi.change !== undefined && (
                  <span className={`flex items-center text-[10px] font-semibold ${kpi.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {kpi.change >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {Math.abs(kpi.change).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Trend + Forecast Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-1">Revenue Trend & Forecast</h2>
          <p className="text-xs text-muted-foreground mb-6">
            Last 12 months actual revenue with 3-month AI forecast projection
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => formatCurrency(v)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [formatCurrency(value), name === "actual" ? "Actual" : "Forecast"]}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#actualGrad)"
                  name="actual"
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  fill="url(#forecastGrad)"
                  name="forecast"
                  connectNulls={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pipeline Value by Status */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-1">Pipeline by Status</h2>
            <p className="text-xs text-muted-foreground mb-6">Estimated revenue value at each stage</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.statusPipeline} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="status" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => formatCurrency(v)} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [formatCurrency(value), "Pipeline Value"]}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {analytics.statusPipeline.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Source */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-1">Revenue by Source</h2>
            <p className="text-xs text-muted-foreground mb-6">Converted lead revenue breakdown by acquisition channel</p>
            {analytics.revenueBySource.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.revenueBySource}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      nameKey="name"
                    >
                      {analytics.revenueBySource.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px" }}
                      formatter={(value) => <span className="text-muted-foreground">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
                No converted leads with revenue data yet
              </div>
            )}
          </div>
        </div>

        {/* Forecast Insights */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> Forecast Insights
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="text-sm font-medium text-foreground mb-1">Growth Trajectory</div>
              <p className="text-xs text-muted-foreground">
                {analytics.growthRate >= 0
                  ? `Revenue is trending upward at ${analytics.growthRate.toFixed(1)}% month-over-month. Maintain current lead acquisition strategies.`
                  : `Revenue dipped ${Math.abs(analytics.growthRate).toFixed(1)}% from last month. Consider increasing marketing spend or outreach efforts.`}
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="text-sm font-medium text-foreground mb-1">Conversion Opportunity</div>
              <p className="text-xs text-muted-foreground">
                {analytics.conversionRate < 20
                  ? `Conversion rate is at ${analytics.conversionRate.toFixed(1)}%. Focus on lead nurturing and follow-up automation to improve pipeline throughput.`
                  : `Strong ${analytics.conversionRate.toFixed(1)}% conversion rate. Scale lead generation to multiply revenue proportionally.`}
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="text-sm font-medium text-foreground mb-1">Next Quarter Projection</div>
              <p className="text-xs text-muted-foreground">
                Projected revenue for the next 3 months is {formatCurrency(analytics.forecastNext3)} based on historical trends and current pipeline velocity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRevenueForecasting;
