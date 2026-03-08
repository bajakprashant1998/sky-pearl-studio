import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Sparkles, Clock, Users, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const AcademyBanner = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-amber-300">Admissions Open — Limited Seats!</span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Join Our{" "}
                <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                  Digital Marketing
                </span>{" "}
                Academy
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-xl mx-auto lg:mx-0">
                6-month practical training with AI skills, live projects & career support. 
                Transform your career with expert mentorship.
              </p>

              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-6">
                {[
                  { icon: Clock, text: "6 Months" },
                  { icon: Users, text: "Small Batches" },
                  { icon: Sparkles, text: "50+ AI Tools" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/25" asChild>
                  <Link to="/contact?interest=academy">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Enroll Now — ₹25,000/Month
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" asChild>
                  <Link to="/digital-marketing-academy">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right visual */}
            <div className="flex-shrink-0 hidden lg:block">
              <motion.div
                className="relative w-64 h-64"
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-3xl rotate-6" />
                <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50 h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-4"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-1">500+</h3>
                  <p className="text-slate-400 text-sm mb-3">Students Trained</p>
                  <div className="flex -space-x-2">
                    {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-rose-500"].map((bg, i) => (
                      <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-slate-800 flex items-center justify-center`}>
                        <span className="text-[9px] font-bold text-white">{["A", "R", "P", "S", "M"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AcademyBanner;
