import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft, Save, Globe, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AdminPageEditor = () => {
  const { pageId } = useParams();
  const pagePath = decodeURIComponent(pageId || "");
  const { user } = useAdmin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
    og_type: "website",
    canonical_url: "",
  });

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-seo", pagePath],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_seo_settings")
        .select("*")
        .eq("page_path", pagePath)
        .maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    if (existing) {
      setForm({
        meta_title: existing.meta_title || "",
        meta_description: existing.meta_description || "",
        meta_keywords: existing.meta_keywords || "",
        og_title: existing.og_title || "",
        og_description: existing.og_description || "",
        og_image: existing.og_image || "",
        og_type: existing.og_type || "website",
        canonical_url: existing.canonical_url || "",
      });
    }
  }, [existing]);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        page_path: pagePath,
        ...form,
        updated_by: user?.id,
      };

      if (existing) {
        const { error } = await supabase
          .from("page_seo_settings")
          .update(payload)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("page_seo_settings")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("SEO settings saved!");
      queryClient.invalidateQueries({ queryKey: ["admin-seo"] });
      queryClient.invalidateQueries({ queryKey: ["admin-all-seo"] });
      queryClient.invalidateQueries({ queryKey: ["page-seo"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fields = [
    { key: "meta_title", label: "Meta Title", placeholder: "Page title for search engines (max 60 chars)", icon: FileText },
    { key: "meta_description", label: "Meta Description", placeholder: "Page description for search results (max 160 chars)", icon: FileText },
    { key: "meta_keywords", label: "Meta Keywords", placeholder: "Comma-separated keywords", icon: FileText },
    { key: "og_title", label: "OG Title", placeholder: "Title for social sharing", icon: Globe },
    { key: "og_description", label: "OG Description", placeholder: "Description for social sharing", icon: Globe },
    { key: "og_image", label: "OG Image URL", placeholder: "https://example.com/image.jpg", icon: Globe },
    { key: "og_type", label: "OG Type", placeholder: "website", icon: Globe },
    { key: "canonical_url", label: "Canonical URL", placeholder: "https://dibull.com/...", icon: Globe },
  ];

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/pages">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit SEO Settings</h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">{pagePath}</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          {fields.map(({ key, label, placeholder, icon: Icon }) => (
            <div key={key}>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                {label}
              </label>
              {key === "meta_description" || key === "og_description" ? (
                <textarea
                  value={form[key as keyof typeof form]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px] resize-y"
                />
              ) : (
                <Input
                  value={form[key as keyof typeof form]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                />
              )}
              {key === "meta_title" && (
                <p className="text-xs text-muted-foreground mt-1">{form.meta_title.length}/60 characters</p>
              )}
              {key === "meta_description" && (
                <p className="text-xs text-muted-foreground mt-1">{form.meta_description.length}/160 characters</p>
              )}
            </div>
          ))}

          <Button onClick={() => mutation.mutate()} disabled={mutation.isPending} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            {mutation.isPending ? "Saving..." : "Save SEO Settings"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPageEditor;
