import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, BookOpen, Globe, Users, TrendingUp, Clock, Mail, ArrowRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { data: seoCount } = useQuery({
    queryKey: ["admin-seo-count"],
    queryFn: async () => {
      const { count } = await supabase.from("page_seo_settings").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: blogCount } = useQuery({
    queryKey: ["admin-blog-count"],
    queryFn: async () => {
      const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: contentCount } = useQuery({
    queryKey: ["admin-content-count"],
    queryFn: async () => {
      const { count } = await supabase.from("page_content").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: leadStats } = useQuery({
    queryKey: ["admin-lead-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("status, created_at").order("created_at", { ascending: false });
      if (error) throw error;
      const total = data?.length ?? 0;
      const newLeads = data?.filter((l) => l.status === "new").length ?? 0;
      const converted = data?.filter((l) => l.status === "converted").length ?? 0;
      const today = new Date().toDateString();
      const todayLeads = data?.filter((l) => new Date(l.created_at).toDateString() === today).length ?? 0;
      return { total, newLeads, converted, todayLeads };
    },
  });

  const { data: recentLeads = [] } = useQuery({
    queryKey: ["admin-recent-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, email, website_type, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const { data: recentBlogs = [] } = useQuery({
    queryKey: ["admin-recent-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, is_published, created_at, slug")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const cards = [
    { label: "Total Leads", value: leadStats?.total ?? 0, icon: Users, to: "/admin/leads", color: "bg-primary/10 text-primary" },
    { label: "New Leads", value: leadStats?.newLeads ?? 0, icon: TrendingUp, to: "/admin/leads", color: "bg-accent/10 text-accent" },
    { label: "Converted", value: leadStats?.converted ?? 0, icon: BarChart3, to: "/admin/leads", color: "bg-green-500/10 text-green-600" },
    { label: "Today's Leads", value: leadStats?.todayLeads ?? 0, icon: Clock, to: "/admin/leads", color: "bg-amber-500/10 text-amber-600" },
    { label: "Blog Posts", value: blogCount ?? 0, icon: BookOpen, to: "/admin/blog", color: "bg-purple-500/10 text-purple-600" },
    { label: "Pages with SEO", value: seoCount ?? 0, icon: Globe, to: "/admin/pages", color: "bg-blue-500/10 text-blue-600" },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    qualified: "bg-purple-100 text-purple-700",
    converted: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your website and leads</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="bg-card rounded-2xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Recent Leads
              </h2>
              <Link to="/admin/leads" className="text-xs text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No leads yet</p>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    to="/admin/leads"
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary">{lead.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">{lead.name}</div>
                        <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
                          <Mail className="w-3 h-3 shrink-0" /> {lead.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[lead.status] || statusColors.new}`}>
                        {lead.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(lead.created_at)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Blog Posts */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Recent Blog Posts
              </h2>
              <Link to="/admin/blog" className="text-xs text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {recentBlogs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No blog posts yet</p>
            ) : (
              <div className="space-y-3">
                {recentBlogs.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">{post.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{timeAgo(post.created_at)}</div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${post.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin/leads" className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Manage Leads</span>
            </Link>
            <Link to="/admin/pages" className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Manage Page SEO</span>
            </Link>
            <Link to="/admin/blog" className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Manage Blog Posts</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Account Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
