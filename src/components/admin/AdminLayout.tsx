import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { LayoutDashboard, FileText, BookOpen, Settings, LogOut, Menu, Users, MessageSquareQuote, TrendingUp, Sparkles, PenTool, MessageCircle, FlaskConical, Gift, Activity, Mail, Briefcase, Wifi, Globe, FolderOpen, HelpCircle, Image, Navigation, Palette, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/site-settings", label: "Site Settings", icon: Globe },
  { to: "/admin/navigation", label: "Navigation", icon: Navigation },
  { to: "/admin/pages", label: "Pages & SEO", icon: FileText },
  { to: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { to: "/admin/comments", label: "Comments", icon: MessageCircle },
  { to: "/admin/portfolio", label: "Portfolio", icon: Palette },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/client-logos", label: "Client Logos", icon: Image },
  { to: "/admin/media", label: "Media Library", icon: FolderOpen },
  { to: "/admin/academy", label: "Academy", icon: GraduationCap },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/client-projects", label: "Client Projects", icon: Briefcase },
  { to: "/admin/ab-testing", label: "A/B Testing", icon: FlaskConical },
  { to: "/admin/referrals", label: "Referrals", icon: Gift },
  { to: "/admin/bulk-email", label: "Bulk Email", icon: Mail },
  { to: "/admin/revenue", label: "Revenue Forecast", icon: TrendingUp },
  { to: "/admin/activity-log", label: "Activity Log", icon: Activity },
  { to: "/admin/uptime", label: "Uptime Monitor", icon: Wifi },
  { to: "/admin/ai-agent", label: "AI Agent", icon: Sparkles },
  { to: "/admin/content-writer", label: "Content Writer", icon: PenTool },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAdmin();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <Link to="/admin" className="flex items-center gap-2">
              <img src="/dibull_logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-foreground">Admin Panel</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border space-y-3">
            <div className="px-4 text-xs text-muted-foreground truncate">{user?.email}</div>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={signOut}>
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
            <Link to="/" className="block px-4 text-xs text-muted-foreground hover:text-primary transition-colors">
              ← Back to Website
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-card border-b border-border px-6 py-4 flex items-center gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-foreground">Admin Panel</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
