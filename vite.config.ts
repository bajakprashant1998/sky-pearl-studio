import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Fallback values so the Supabase client never crashes when .env
    // is momentarily unavailable in certain preview environments.
    ...(process.env.VITE_SUPABASE_URL
      ? {}
      : {
          "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
            "https://xnqttssopfhsyhoyouhi.supabase.co"
          ),
        }),
    ...(process.env.VITE_SUPABASE_PUBLISHABLE_KEY
      ? {}
      : {
          "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucXR0c3NvcGZoc3lob3lvdWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MzM2MjksImV4cCI6MjA4NDAwOTYyOX0.z4JVWlk34HuEJWqmhatAWx0qgszUzmaf7EHvwlorEDo"
          ),
        }),
  },
}));
