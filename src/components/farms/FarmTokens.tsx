
import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Users, DollarSign, BarChart3 } from 'lucide-react';
import { Farm } from '@/types/farm';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface FarmTokensProps {
  farm: Farm;
}

const FarmTokens = ({ farm }: FarmTokensProps) => {
  const availableTokens = farm.tokens.totalSupply - farm.tokens.circulatingSupply;
  const percentSold = (farm.tokens.circulatingSupply / farm.tokens.totalSupply) * 100;
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="bg-earth-700/30 p-4 rounded-lg border border-earth-600/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-lg font-medium text-vanilla-100 mb-4">Token Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-3">
                <Coins className="h-5 w-5 text-vanilla-300" />
              </div>
              <div>
                <div className="text-sm text-vanilla-400">Token Symbol</div>
                <div className="text-xl font-medium text-vanilla-100">
                  {farm.tokens.symbol}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-vanilla-300" />
              </div>
              <div>
                <div className="text-sm text-vanilla-400">Token Holders</div>
                <div className="text-xl font-medium text-vanilla-100">
                  {formatNumber(farm.tokens.holders)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="h-5 w-5 text-vanilla-300" />
              </div>
              <div>
                <div className="text-sm text-vanilla-400">Token Price</div>
                <div className="text-xl font-medium text-vanilla-100">
                  ${farm.tokens.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-earth-700/30 p-4 rounded-lg border border-earth-600/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium text-vanilla-100 mb-4">Token Supply</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-vanilla-300">Total Supply</span>
                <span className="text-vanilla-100 font-medium">{formatNumber(farm.tokens.totalSupply)} {farm.tokens.symbol}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-vanilla-300">Circulating Supply</span>
                <span className="text-vanilla-100 font-medium">{formatNumber(farm.tokens.circulatingSupply)} {farm.tokens.symbol}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-vanilla-300">Available for Purchase</span>
                <span className="text-vanilla-100 font-medium">{formatNumber(availableTokens)} {farm.tokens.symbol}</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-vanilla-300">Token Sale Progress</span>
                <span className="text-vanilla-100 font-medium">{percentSold.toFixed(1)}%</span>
              </div>
              <Progress 
                value={percentSold} 
                max={100}
                className="h-2 bg-earth-600"
              />
              <div className="flex justify-between text-xs text-vanilla-400 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="pt-4 flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button 
                  className="w-full bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 tribal-button pulse-glow"
                  style={{ "--tribal-color": "rgba(212, 168, 87, 0.5)" } as React.CSSProperties}
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Buy Tokens
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-earth-700/30 p-4 rounded-lg border border-earth-600/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="text-lg font-medium text-vanilla-100 mb-4">Annual Revenue</h3>
        
        <div className="flex items-center">
          <div className="w-12 h-12 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-4">
            <BarChart3 className="h-6 w-6 text-vanilla-300" />
          </div>
          <div>
            <div className="text-sm text-vanilla-400">Revenue Generated</div>
            <div className="text-2xl font-medium text-vanilla-100">
              ${formatNumber(farm.stats.annualRevenue)}
            </div>
          </div>
          <div className="ml-auto">
            <div className="text-sm bg-green-900/30 text-green-400 px-2 py-1 rounded">
              Projected Growth: +{farm.stats.projectedGrowth}%
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmTokens;
