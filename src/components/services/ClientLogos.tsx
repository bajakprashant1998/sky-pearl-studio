import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

interface ClientLogo {
  name: string;
  logo: string;
}

interface ClientLogosProps {
  logos?: ClientLogo[];
}

const defaultLogos: ClientLogo[] = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
];

const ClientLogos = ({ logos = defaultLogos }: ClientLogosProps) => {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by 500+ businesses including
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Gradient masks for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/20 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/20 to-transparent z-10" />

          {/* Scrolling container */}
          <motion.div
            className="flex items-center gap-16"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 h-8 md:h-10 px-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
                title={logo.name}
              >
                <img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  className="h-full w-auto object-contain max-w-[120px]"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
