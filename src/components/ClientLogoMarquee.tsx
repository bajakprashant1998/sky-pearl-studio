const clientLogos = [
  { name: "TechStart", color: "from-blue-500 to-cyan-500" },
  { name: "GrowthLabs", color: "from-purple-500 to-pink-500" },
  { name: "InnovateCo", color: "from-orange-500 to-red-500" },
  { name: "ScaleUp", color: "from-green-500 to-emerald-500" },
  { name: "VentureX", color: "from-indigo-500 to-violet-500" },
  { name: "Nexus Digital", color: "from-teal-500 to-cyan-500" },
  { name: "Apex Media", color: "from-rose-500 to-pink-500" },
  { name: "Prime Solutions", color: "from-amber-500 to-yellow-500" },
  { name: "Elevate Inc", color: "from-sky-500 to-blue-500" },
  { name: "Fusion Tech", color: "from-fuchsia-500 to-purple-500" },
  { name: "CoreBiz", color: "from-lime-500 to-green-500" },
  { name: "Quantum Labs", color: "from-violet-500 to-indigo-500" },
];

const ClientLogoMarquee = () => {
  return (
    <div className="w-full py-8 overflow-hidden bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50">
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Trusted by Industry Leaders
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex animate-marquee hover:pause-animation">
          {/* First set */}
          {clientLogos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className={`
                w-32 h-16 rounded-xl bg-gradient-to-br ${logo.color}
                flex items-center justify-center
                shadow-md hover:shadow-lg transition-all duration-300
                transform hover:scale-105 cursor-pointer
                opacity-80 hover:opacity-100
              `}>
                <span className="text-white font-semibold text-sm text-center px-2">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clientLogos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className={`
                w-32 h-16 rounded-xl bg-gradient-to-br ${logo.color}
                flex items-center justify-center
                shadow-md hover:shadow-lg transition-all duration-300
                transform hover:scale-105 cursor-pointer
                opacity-80 hover:opacity-100
              `}>
                <span className="text-white font-semibold text-sm text-center px-2">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogoMarquee;
