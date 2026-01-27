import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

interface VideoTestimonialProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  clientName?: string;
  result?: string;
}

const VideoTestimonial = ({
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  thumbnailUrl = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=675&fit=crop",
  title = "See How We Helped Achieve 300% Growth",
  clientName = "Leading E-commerce Brand",
  result = "300% Revenue Growth in 6 Months",
}: VideoTestimonialProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Client Success Story
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{title.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {clientName} • {result}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Player Modal */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                  onClick={() => setIsPlaying(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-5xl aspect-video"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-12 right-0 text-white hover:bg-white/10"
                      onClick={() => setIsPlaying(false)}
                    >
                      <X className="w-6 h-6" />
                    </Button>
                    <iframe
                      src={`${videoUrl}?autoplay=1`}
                      className="w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thumbnail */}
            <div className="relative aspect-video group cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img
                src={thumbnailUrl}
                alt={`${clientName} success story video`}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 group-hover:shadow-xl group-hover:shadow-primary/50 transition-shadow"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 bg-primary/90 px-3 py-1 rounded-full text-xs font-medium text-white">
                🎬 Watch Case Study
              </div>

              {/* Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{clientName}</h3>
                <p className="text-white/80">{result}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Below Video */}
        <AnimatedSection className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "300%", label: "Revenue Growth" },
              { value: "6 Months", label: "Time to Results" },
              { value: "12x", label: "ROI Achieved" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-card rounded-xl border border-border"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VideoTestimonial;
