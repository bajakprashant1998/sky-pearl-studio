import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const ROICalculator = () => {
  const [investment, setInvestment] = useState([50000]);
  
  const projectedReturn = investment[0] * 3.2;
  const roi = ((projectedReturn - investment[0]) / investment[0]) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-2xl border border-border p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">ROI Calculator</h3>
          <p className="text-sm text-muted-foreground">Estimate your potential returns</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Monthly Investment</span>
            <span className="font-bold text-foreground">₹{investment[0].toLocaleString()}</span>
          </div>
          <Slider
            value={investment}
            onValueChange={setInvestment}
            min={10000}
            max={500000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">₹10,000</span>
            <span className="text-xs text-muted-foreground">₹5,00,000</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <DollarSign className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">₹{investment[0].toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Investment</div>
          </div>
          
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">₹{projectedReturn.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Projected Return</div>
          </div>
          
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <Percent className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">{roi.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">ROI</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center gap-2 text-green-600">
            <ArrowUpRight className="w-5 h-5" />
            <span className="font-semibold">Average 3.2x return on marketing investment</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Based on our client success data over 500+ projects</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ROICalculator;
