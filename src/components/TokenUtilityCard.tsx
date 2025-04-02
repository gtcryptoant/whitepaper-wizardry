
import React from 'react';
import { motion } from 'framer-motion';

interface TokenUtilityItemProps {
  title: string;
  description: string;
  delay: number;
}

const TokenUtilityItem = ({ title, description, delay }: TokenUtilityItemProps) => {
  return (
    <motion.div 
      className="flex items-start mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
    >
      <motion.div 
        className="bg-vanilla-500/30 rounded-full p-1.5 mr-3 mt-1 flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="w-4 h-4 bg-vanilla-500 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
      <div>
        <span className="font-medium text-vanilla-100">{title}</span>
        <p className="text-vanilla-200">{description}</p>
      </div>
    </motion.div>
  );
};

const TokenUtilityCard = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-vanilla-800/60 to-vanilla-500/40 backdrop-blur-sm border border-vanilla-500/50 rounded-xl p-6 shadow-lg shadow-vanilla-500/20 hover:shadow-xl hover:shadow-vanilla-500/30 transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className="text-2xl font-display mb-4 text-vanilla-100 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Vanilla Valley Token (VVT) Utility
      </motion.h3>
      
      <motion.p 
        className="text-vanilla-200 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        VVT is the native token of the Vanilla Valley Project, representing tokenized ownership of vanilla orchids. Holders benefit from:
      </motion.p>
      
      <div className="space-y-4 mt-4">
        <TokenUtilityItem 
          title="Asset-Backed Ownership"
          description="Each VVT links to a tangible vanilla orchid, covering land, cultivation, and processing costs."
          delay={0}
        />
        
        <TokenUtilityItem 
          title="Profit Sharing"
          description="Earn dividends from vanilla harvest sales."
          delay={1}
        />
        
        <TokenUtilityItem 
          title="Farm Expansion"
          description="Supports plant growth from 1,000 to 2,500 per hectare."
          delay={2}
        />
        
        <TokenUtilityItem 
          title="Liquidity & Flexibility"
          description="Tradeable on Cardano marketplaces."
          delay={3}
        />
        
        <TokenUtilityItem 
          title="Sustainability Impact"
          description="Drives reforestation and eco-friendly farming."
          delay={4}
        />
      </div>
      
      <motion.p 
        className="text-vanilla-100 mt-6 font-medium italic text-center border-t border-vanilla-500/40 pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        VVT is the financial and sustainability backbone of the Vanilla Valley ecosystem.
      </motion.p>
    </motion.div>
  );
};

export default TokenUtilityCard;
