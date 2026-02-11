import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageSeoData {
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  og_type: string | null;
  canonical_url: string | null;
}

export const usePageSeo = (pagePath: string) => {
  return useQuery({
    queryKey: ["page-seo", pagePath],
    queryFn: async (): Promise<PageSeoData | null> => {
      const { data, error } = await supabase
        .from("page_seo_settings")
        .select("meta_title, meta_description, meta_keywords, og_title, og_description, og_image, og_type, canonical_url")
        .eq("page_path", pagePath)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
