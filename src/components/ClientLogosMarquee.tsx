import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fallbackClients = [
  { name: "Cadbull", logo_url: "", initial: "C", color: "from-blue-500 to-blue-600" },
  { name: "HireForJob", logo_url: "", initial: "H", color: "from-green-500 to-emerald-500" },
  { name: "Gujarat Voyage", logo_url: "", initial: "GV", color: "from-amber-500 to-orange-500" },
  { name: "Better View Tourism", logo_url: "", initial: "BV", color: "from-cyan-500 to-teal-500" },
  { name: "Dream Decor", logo_url: "", initial: "DD", color: "from-purple-500 to-violet-500" },
  { name: "Tapovan School", logo_url: "", initial: "TS", color: "from-rose-500 to-pink-500" },
  { name: "Rental Yacht", logo_url: "", initial: "RY", color: "from-indigo-500 to-blue-500" },
  { name: "Handbricks", logo_url: "", initial: "HB", color: "from-orange-500 to-red-500" },
  { name: "Akyca", logo_url: "", initial: "A", color: "from-teal-500 to-cyan-500" },
  { name: "CastingScreen", logo_url: "", initial: "CS", color: "from-pink-500 to-rose-500" },
  { name: "Shuttech", logo_url: "", initial: "ST", color: "from-slate-500 to-gray-600" },
  { name: "PropertyX", logo_url: "", initial: "PX", color: "from-emerald-500 to-green-500" },
];

const gradientColors = [
  "from-blue-500 to-blue-600",
  "from-green-500 to-emerald-500",
  "from-amber-500 to-orange-500",
  "from-cyan-500 to-teal-500",
  "from-purple-500 to-violet-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-orange-500 to-red-500",
];

const ClientLogosMarquee = () => {
  const { data: dbLogos } = useQuery({
    queryKey: ["client-logos-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const clients = dbLogos && dbLogos.length > 0
    ? dbLogos.map((logo, i) => ({
        name: logo.name,
        logo_url: logo.logo_url,
        website_url: logo.website_url,
        initial: logo.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        color: gradientColors[i % gradientColors.length],
      }))
    : fallbackClients;

  const doubled = [...clients, ...clients];

  return (
    <section className="py-8 sm:py-12 bg-muted/30 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span className="font-medium">Trusted by 500+ businesses across India</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-muted/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-muted/80 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-4 sm:gap-6 lg:gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-3 flex-shrink-0 px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 bg-card/80 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group cursor-default min-w-[160px] sm:min-w-[180px] lg:min-w-[200px]"
            >
              <div className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${
                client.logo_url ? "bg-white" : `bg-gradient-to-br ${client.color}`
              }`}>
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-bold text-white">{client.initial}</span>
                )}
              </div>
              <span className="text-sm sm:text-base lg:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
