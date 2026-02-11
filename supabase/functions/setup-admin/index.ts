import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    const password = Deno.env.get("ADMIN_INITIAL_PASSWORD");

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email required and ADMIN_INITIAL_PASSWORD secret must be set" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Check if user exists
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const existingUser = users?.find((u: any) => u.email === email);

    if (existingUser) {
      // Update password and assign role
      await supabase.auth.admin.updateUserById(existingUser.id, { password });
      await supabase
        .from("user_roles")
        .upsert({ user_id: existingUser.id, role: "admin" }, { onConflict: "user_id,role" });
      return new Response(JSON.stringify({ success: true, message: "Admin password updated and role assigned" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create new user
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) throw createError;

    await supabase
      .from("user_roles")
      .insert({ user_id: userData.user.id, role: "admin" });

    return new Response(JSON.stringify({ success: true, message: "Admin user created" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
