import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, BookOpen, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

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

  const cards = [
    { label: "Pages with SEO", value: seoCount ?? 0, icon: Globe, to: "/admin/pages", color: "from-blue-500 to-cyan-500" },
    { label: "Blog Posts", value: blogCount ?? 0, icon: BookOpen, to: "/admin/blog", color: "from-purple-500 to-pink-500" },
    { label: "Content Sections", value: contentCount ?? 0, icon: FileText, to: "/admin/pages", color: "from-green-500 to-emerald-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your admin panel</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{card.label}</div>
            </Link>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/admin/pages" className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Manage Page SEO</span>
            </Link>
            <Link to="/admin/blog" className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Manage Blog Posts</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
