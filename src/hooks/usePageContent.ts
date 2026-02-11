import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePageContent = (pagePath: string, sectionKey: string) => {
  return useQuery({
    queryKey: ["page-content", pagePath, sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_path", pagePath)
        .eq("section_key", sectionKey)
        .maybeSingle();
      if (error) throw error;
      return data?.content ?? null;
    },
    staleTime: 5 * 60 * 1000,
  });
};
