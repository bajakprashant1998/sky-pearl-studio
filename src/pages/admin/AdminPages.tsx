import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Globe, Edit2, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const allPages = [
  { path: "/", label: "Homepage" },
  { path: "/services/seo", label: "SEO Services" },
  { path: "/services/ppc", label: "PPC Advertising" },
  { path: "/services/web-design", label: "Web Design" },
  { path: "/services/social-media", label: "Social Media" },
  { path: "/services/content-marketing", label: "Content Marketing" },
  { path: "/services/email-marketing", label: "Email Marketing" },
  { path: "/services/conversion-optimization", label: "Conversion Optimization" },
  { path: "/services/ecommerce-marketing", label: "E-Commerce Marketing" },
  { path: "/services/amazon-marketing", label: "Amazon Marketing" },
  { path: "/services/video-marketing", label: "Video Marketing" },
  { path: "/services/programmatic-advertising", label: "Programmatic Advertising" },
  { path: "/services/analytics-ai-technology", label: "Analytics & AI" },
  { path: "/services/custom-development", label: "Custom Development" },
  { path: "/services/ai-marketing", label: "AI Marketing" },
  { path: "/services/training-programs", label: "Training Programs" },
  { path: "/services/saas-products", label: "SaaS Products" },
  { path: "/services/branding-design", label: "Branding & Design" },
  { path: "/services/marketing-automation-crm", label: "Marketing Automation" },
  { path: "/services/conversion-ui-ux", label: "Conversion UI/UX" },
  { path: "/services/growth-hacking", label: "Growth Hacking" },
  { path: "/about-us", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
  { path: "/digital-marketing-academy", label: "Academy" },
  { path: "/blog", label: "Blog" },
  { path: "/free-tools", label: "Free Tools" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/careers", label: "Careers" },
  { path: "/our-verticals", label: "Our Verticals" },
];

const AdminPages = () => {
  const [search, setSearch] = useState("");

  const { data: seoSettings, isLoading } = useQuery({
    queryKey: ["admin-all-seo"],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_seo_settings").select("*");
      if (error) throw error;
      return data;
    },
  });

  const seoMap = new Map(seoSettings?.map((s) => [s.page_path, s]) ?? []);
  const filtered = allPages.filter((p) => p.label.toLowerCase().includes(search.toLowerCase()) || p.path.includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pages & SEO</h1>
            <p className="text-muted-foreground mt-1">Manage SEO metadata for all pages</p>
          </div>
        </div>

        <Input
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Page</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Path</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">SEO Status</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((page) => {
                  const hasSeo = seoMap.has(page.path);
                  const seo = seoMap.get(page.path);
                  return (
                    <tr key={page.path} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">{page.label}</td>
                      <td className="p-4 text-muted-foreground font-mono text-xs">{page.path}</td>
                      <td className="p-4">
                        {hasSeo ? (
                          <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Configured
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-amber-500 text-xs font-medium">
                            <AlertCircle className="w-4 h-4" />
                            Using defaults
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/pages/${encodeURIComponent(page.path)}`}>
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit SEO
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
