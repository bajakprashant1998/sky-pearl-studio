import React, { useState } from 'react';
import { motion, AnimatePresence, MotionValue, useTransform, useMotionValue } from 'framer-motion';
import { Award, Download, Sparkles, CheckCircle2, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CertificatePreviewProps {
  scrollProgress: MotionValue<number>;
  isVisible: boolean;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ scrollProgress, isVisible }) => {
  const [userName, setUserName] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const skills = [
    'Search Engine Optimization (SEO)',
    'Social Media Marketing',
    'AI-Powered Marketing Tools',
    'Google & Facebook Ads',
    'Content Marketing',
    'Analytics & Reporting',
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 20,
            delay: 0.2
          }}
          className="relative mt-16 mx-auto max-w-4xl"
        >
          {/* Floating Sparkles */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [20, -20, -40],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            ))}
          </div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-500">Your Achievement Awaits</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Certificate of Completion
            </h2>
            <p className="text-muted-foreground">
              Upon completing the 6-month program, you'll receive this industry-recognized certificate
            </p>
          </motion.div>

          {/* Certificate Card */}
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative"
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: isHovered ? 0.8 : 0.4,
                scale: isHovered ? 1.02 : 1,
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10"
            />

            {/* Certificate Container */}
            <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl border-4 border-blue-500/30 overflow-hidden shadow-2xl">
              {/* Geometric Border Pattern - Top */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
                <div className="flex gap-1">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-white/20 rotate-45 transform -translate-y-2"
                    />
                  ))}
                </div>
              </div>

              {/* Geometric Border Pattern - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
                <div className="flex gap-1">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-white/20 rotate-45 transform translate-y-2"
                    />
                  ))}
                </div>
              </div>

              {/* Side Decorations */}
              <div className="absolute left-0 top-6 bottom-6 w-6 bg-gradient-to-b from-blue-600 via-cyan-500 to-blue-600 flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-white/20 rotate-45 transform -translate-x-2"
                    />
                  ))}
                </div>
              </div>
              <div className="absolute right-0 top-6 bottom-6 w-6 bg-gradient-to-b from-blue-600 via-cyan-500 to-blue-600 flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-white/20 rotate-45 transform translate-x-2"
                    />
                  ))}
                </div>
              </div>

              {/* Certificate Content */}
              <div className="relative px-8 lg:px-16 py-12 lg:py-16 ml-6 mr-6 mt-6 mb-6">
                {/* Company Logo & Name */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <img 
                      src="/dibull_logo.png" 
                      alt="Digital Bull Logo" 
                      className="w-12 h-12 object-contain"
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 tracking-wide">
                        DIGITAL BULL
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 tracking-widest">
                        TECHNOLOGY PVT. LTD
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate Title */}
                <div className="text-center mb-6">
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent tracking-wider mb-2">
                    CERTIFICATE
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                    Of Completion Digital Marketing Internship
                  </p>
                </div>

                {/* Recipient Name */}
                <div className="text-center mb-6">
                  <p className="text-slate-500 dark:text-slate-400 mb-2">This is to certify that</p>
                  <div className="relative inline-block w-full max-w-md">
                    <Input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter Your Name"
                      className="text-center text-xl font-semibold border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent border-blue-300 focus:border-blue-500 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="text-center mb-8">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                    has successfully completed the <span className="font-semibold text-blue-600 dark:text-blue-400">Six-month Digital Marketing Internship</span> at 
                    Digital Bull Technology Pvt. Ltd, demonstrating proficiency in key areas of digital marketing including:
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8 max-w-2xl mx-auto">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="truncate">{skill}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Signatures Section */}
                <div className="flex items-end justify-between max-w-2xl mx-auto mb-6">
                  {/* Director Signature */}
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700 dark:text-slate-200">KRUNAL JANI</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">DIRECTOR</p>
                  </div>

                  {/* Award Medal */}
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      {/* Ribbon */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                        <div className="w-4 h-8 bg-gradient-to-b from-red-500 to-red-600 transform -rotate-12 rounded-b" />
                        <div className="w-4 h-8 bg-gradient-to-b from-red-500 to-red-600 transform rotate-12 rounded-b" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Manager Signature */}
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700 dark:text-slate-200">MANAGER</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">OPERATIONS</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Issue Date: Upon Completion</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>www.dibull.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
              onClick={() => window.location.href = '/digital-marketing-academy#enroll'}
            >
              <Award className="w-5 h-5 mr-2" />
              Enroll Now to Earn Your Certificate
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/50 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50"
              disabled
            >
              <Download className="w-5 h-5 mr-2" />
              Download Preview (Coming Soon)
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificatePreview;
