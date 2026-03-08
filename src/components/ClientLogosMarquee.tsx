import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const clients = [
  { name: "Cadbull", initial: "C", color: "from-blue-500 to-blue-600" },
  { name: "HireForJob", initial: "H", color: "from-green-500 to-emerald-500" },
  { name: "Gujarat Voyage", initial: "GV", color: "from-amber-500 to-orange-500" },
  { name: "Better View Tourism", initial: "BV", color: "from-cyan-500 to-teal-500" },
  { name: "Dream Decor", initial: "DD", color: "from-purple-500 to-violet-500" },
  { name: "Tapovan School", initial: "TS", color: "from-rose-500 to-pink-500" },
  { name: "Rental Yacht", initial: "RY", color: "from-indigo-500 to-blue-500" },
  { name: "Handbricks", initial: "HB", color: "from-orange-500 to-red-500" },
  { name: "Akyca", initial: "A", color: "from-teal-500 to-cyan-500" },
  { name: "CastingScreen", initial: "CS", color: "from-pink-500 to-rose-500" },
  { name: "Shuttech", initial: "ST", color: "from-slate-500 to-gray-600" },
  { name: "PropertyX", initial: "PX", color: "from-emerald-500 to-green-500" },
];

const ClientLogosMarquee = () => {
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
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-muted/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-muted/80 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 sm:gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 bg-card/80 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group cursor-default"
            >
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-[10px] sm:text-xs font-bold text-white">{client.initial}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
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
