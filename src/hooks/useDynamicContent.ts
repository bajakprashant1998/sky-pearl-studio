import { useQuery } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";

export function useSiteSettings(category?: string) {
  return useQuery({
    queryKey: ["site-settings", category],
    queryFn: async () => {
      let query = backend.from("site_settings").select("*");
      if (category) query = query.eq("category", category);
      const { data, error } = await query;
      if (error) throw error;
      
      const settings: Record<string, string> = {};
      data?.forEach((row: any) => {
        const val = row.setting_value;
        let resolved = typeof val === "object" && val !== null ? (val.value || JSON.stringify(val)) : String(val || "");
        // Unwrap double-nested JSON strings like '{"value":"Get Free Consultation"}'
        if (typeof resolved === "string" && resolved.startsWith('{"value":')) {
          try {
            const inner = JSON.parse(resolved);
            if (inner && typeof inner.value === "string") resolved = inner.value;
          } catch {}
        }
        settings[row.setting_key] = resolved;
      });
      return settings;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useSiteSetting(key: string, fallback: string = "") {
  const { data } = useSiteSettings();
  return data?.[key] || fallback;
}

export function useDynamicFAQs(pagePath: string) {
  return useQuery({
    queryKey: ["dynamic-faqs", pagePath],
    queryFn: async () => {
      const { data, error } = await backend
        .from("dynamic_faqs")
        .select("*")
        .or(`page_path.eq.${pagePath},page_path.eq.global`)
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePortfolioItems(featured?: boolean) {
  return useQuery({
    queryKey: ["portfolio-items", featured],
    queryFn: async () => {
      let query = backend.from("portfolio_items").select("*").eq("is_active", true).order("sort_order");
      if (featured) query = query.eq("is_featured", true);
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useClientLogos() {
  return useQuery({
    queryKey: ["client-logos"],
    queryFn: async () => {
      const { data, error } = await backend.from("client_logos").select("*").eq("is_active", true).order("sort_order");
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useAcademyModules() {
  return useQuery({
    queryKey: ["academy-modules"],
    queryFn: async () => {
      const { data, error } = await backend.from("academy_modules").select("*").eq("is_active", true).order("sort_order");
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAcademyModuleBySlug(slug: string) {
  return useQuery({
    queryKey: ["academy-module", slug],
    queryFn: async () => {
      const { data, error } = await backend
        .from("academy_modules")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
