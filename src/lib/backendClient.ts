import { createClient } from "@supabase/supabase-js";

// NOTE:
// In some preview/build environments, Vite env injection can momentarily fail.
// The official values are still safe to ship (publishable) and are also present in the project env.
// We keep a fallback here to prevent a hard crash (blank screen).
const FALLBACK_URL = "https://xnqttssopfhsyhoyouhi.supabase.co";
const FALLBACK_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucXR0c3NvcGZoc3lob3lvdWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MzM2MjksImV4cCI6MjA4NDAwOTYyOX0.z4JVWlk34HuEJWqmhatAWx0qgszUzmaf7EHvwlorEDo";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

export const backend = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
