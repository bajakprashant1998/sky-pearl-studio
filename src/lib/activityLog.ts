import { supabase } from "@/integrations/supabase/client";

export const logActivity = async (
  action: string,
  entityType: string,
  entityId?: string,
  details?: Record<string, any>
) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("admin_activity_log").insert({
    user_id: user.id,
    action,
    entity_type: entityType,
    entity_id: entityId || null,
    details: details || {},
  });
};
