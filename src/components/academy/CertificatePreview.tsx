import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';
import { Award, Download, Sparkles, CheckCircle2, Calendar, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface CertificatePreviewProps {
  scrollProgress: MotionValue<number>;
  isVisible: boolean;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ scrollProgress, isVisible }) => {
  const [userName, setUserName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const skills = [
    'Search Engine Optimization (SEO)',
    'Social Media Marketing',
    'AI-Powered Marketing Tools',
    'Google & Facebook Ads',
    'Content Marketing',
    'Analytics & Reporting',
  ];

  const triggerConfetti = () => {
    // First burst - center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#06B6D4', '#8B5CF6', '#F59E0B', '#10B981'],
    });

    // Second burst - left
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#06B6D4', '#8B5CF6'],
      });
    }, 150);

    // Third burst - right
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F59E0B', '#10B981', '#EC4899'],
      });
    }, 300);
  };

  const handleDownloadPDF = async () => {
    if (!userName.trim()) {
      toast.error('Please enter your name to generate the certificate');
      return;
    }

    if (!certificateRef.current) {
      toast.error('Unable to generate certificate. Please try again.');
      return;
    }

    setIsGenerating(true);
    toast.loading('Generating your certificate...', { id: 'pdf-generation' });

    try {
      // Get the certificate element
      const element = certificateRef.current;
      
      // Create a clone for PDF generation to avoid affecting the display
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '900px';
      clone.style.background = 'white';
      document.body.appendChild(clone);

      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate canvas from the certificate
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 900,
        height: clone.offsetHeight,
      });

      // Remove the clone
      document.body.removeChild(clone);

      // Calculate PDF dimensions (A4 landscape for certificate)
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Add image to PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pageHeight = 210; // A4 landscape height in mm
      const yOffset = (pageHeight - imgHeight) / 2; // Center vertically

      pdf.addImage(imgData, 'PNG', 0, Math.max(0, yOffset), imgWidth, imgHeight);

      // Generate filename with user's name
      const sanitizedName = userName.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
      const filename = `Digital_Marketing_Certificate_${sanitizedName}.pdf`;

      // Download PDF
      pdf.save(filename);

      toast.success('Certificate downloaded successfully!', { id: 'pdf-generation' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate certificate. Please try again.', { id: 'pdf-generation' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto px-2 sm:px-4"
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-6 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Course Completion Certificate</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Your Achievement Awaits
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4">
              Complete the 6-month program to earn your official certificate
            </p>
          </motion.div>

          {/* Certificate Card */}
          <motion.div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Outer glow effect */}
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-primary/30 via-blue-500/30 to-primary/30 rounded-2xl sm:rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            {/* Certificate Container */}
            <div 
              ref={certificateRef}
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl"
            >
              {/* Geometric top border */}
              <div className="h-3 sm:h-4 md:h-6 bg-gradient-to-r from-primary via-blue-500 to-primary relative overflow-hidden">
                <div className="absolute inset-0 flex">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 border-r border-white/20"
                      style={{
                        background: i % 2 === 0 
                          ? 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.1) 50%)' 
                          : 'linear-gradient(-135deg, transparent 50%, rgba(255,255,255,0.1) 50%)'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Inner content with padding */}
              <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 lg:py-16">
                {/* Company Logo & Header */}
                <div className="flex flex-col items-center mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <img 
                      src="/dibull_logo.png" 
                      alt="Dibull Digital" 
                      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain"
                    />
                    <div>
                      <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white">DIBULL DIGITAL</h4>
                      <p className="text-[10px] sm:text-xs text-slate-400">Digital Marketing Academy</p>
                    </div>
                  </div>
                  
                  {/* Certificate Title */}
                  <motion.h2 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent text-center"
                    animate={{ 
                      backgroundPosition: isHovered ? ['0% 50%', '100% 50%'] : '0% 50%'
                    }}
                    transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Certificate of Completion
                  </motion.h2>
                </div>

                {/* Recipient Section */}
                <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                  <p className="text-slate-400 text-xs sm:text-sm mb-2">This is to certify that</p>
                  <div className="relative inline-block w-full max-w-[200px] sm:max-w-xs md:max-w-md">
                    <Input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Name Here"
                      className="text-center text-lg sm:text-xl lg:text-2xl font-semibold bg-transparent border-0 border-b-2 border-amber-400/50 rounded-none text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-0 transition-colors"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      initial={{ width: '0%' }}
                      animate={{ width: userName ? '80%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 sm:mt-4">
                    has successfully completed the
                  </p>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">
                    6-Month Digital Marketing & AI Skills Program
                  </h3>
                </div>

                {/* Skills Section */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-center text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">Mastered Skills</p>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2 lg:gap-3">
                    {['SEO & Content', 'Social Media', 'Paid Advertising', 'Analytics & AI', 'Web Design', 'Video Marketing'].map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800/50 rounded-lg border border-slate-700/50"
                      >
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        <span className="text-white text-[10px] sm:text-xs lg:text-sm truncate">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Signatures Section - Responsive stacking */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-700/50">
                  {/* Director */}
                  <div className="text-center order-2 sm:order-1">
                    <div className="w-20 sm:w-24 lg:w-32 h-8 sm:h-10 lg:h-12 mb-1 sm:mb-2 border-b border-slate-500 flex items-end justify-center">
                      <span className="text-slate-400 italic text-xs sm:text-sm lg:text-base font-signature">Digital Signature</span>
                    </div>
                    <p className="text-white text-xs sm:text-sm font-medium">Director</p>
                    <p className="text-slate-500 text-[10px] sm:text-xs">Dibull Digital</p>
                  </div>
                  
                  {/* Award Badge - Center */}
                  <div className="relative order-1 sm:order-2">
                    <motion.div 
                      className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg"
                      animate={{ 
                        boxShadow: isHovered 
                          ? ['0 0 20px rgba(251,191,36,0.3)', '0 0 40px rgba(251,191,36,0.5)', '0 0 20px rgba(251,191,36,0.3)']
                          : '0 0 20px rgba(251,191,36,0.3)'
                      }}
                      transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                    >
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                    </motion.div>
                    <motion.div 
                      className="absolute -inset-1 sm:-inset-2 border-2 border-amber-400/30 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  {/* Manager */}
                  <div className="text-center order-3">
                    <div className="w-20 sm:w-24 lg:w-32 h-8 sm:h-10 lg:h-12 mb-1 sm:mb-2 border-b border-slate-500 flex items-end justify-center">
                      <span className="text-slate-400 italic text-xs sm:text-sm lg:text-base font-signature">Digital Signature</span>
                    </div>
                    <p className="text-white text-xs sm:text-sm font-medium">Academy Head</p>
                    <p className="text-slate-500 text-[10px] sm:text-xs">Training Division</p>
                  </div>
                </div>

                {/* Issue Date */}
                <div className="text-center mt-4 sm:mt-6">
                  <p className="text-slate-500 text-[10px] sm:text-xs">
                    Issue Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-slate-600 text-[9px] sm:text-[10px] mt-1">
                    Certificate ID: DM-{new Date().getFullYear()}-PREVIEW
                  </p>
                </div>
              </div>

              {/* Geometric bottom border */}
              <div className="h-3 sm:h-4 md:h-6 bg-gradient-to-r from-primary via-blue-500 to-primary relative overflow-hidden">
                <div className="absolute inset-0 flex">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 border-r border-white/20"
                      style={{
                        background: i % 2 === 0 
                          ? 'linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.1) 50%)' 
                          : 'linear-gradient(-45deg, transparent 50%, rgba(255,255,255,0.1) 50%)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/25 w-full sm:w-auto"
              onClick={() => window.location.href = '/contact-us'}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Enroll Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-foreground hover:bg-slate-800/50 w-full sm:w-auto"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download Preview
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificatePreview;
