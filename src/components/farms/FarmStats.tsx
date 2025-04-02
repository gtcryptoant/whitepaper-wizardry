
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Sprout, Calendar } from 'lucide-react';
import { Farm } from '@/types/farm';

interface FarmStatsProps {
  farm: Farm;
}

const FarmStats = ({ farm }: FarmStatsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-earth-700/30 p-4 rounded-lg border border-earth-600/50">
      <h3 className="text-lg font-medium text-vanilla-100 mb-4">Performance Metrics</h3>
      
      <div className="space-y-4">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="w-10 h-10 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-3">
            <TrendingUp className="h-5 w-5 text-vanilla-300" />
          </div>
          <div>
            <div className="text-sm text-vanilla-400">Yield Performance</div>
            <div className="text-xl font-medium text-vanilla-100">
              {farm.performance.yield} kg/hectare
            </div>
          </div>
          <div className="ml-auto">
            <div className="text-sm bg-green-900/30 text-green-400 px-2 py-1 rounded">
              +{farm.stats.projectedGrowth}% Growth
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="w-10 h-10 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-3">
            <Award className="h-5 w-5 text-vanilla-300" />
          </div>
          <div>
            <div className="text-sm text-vanilla-400">Quality Rating</div>
            <div className="text-xl font-medium text-vanilla-100">
              {farm.performance.quality}/100
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="w-10 h-10 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-3">
            <Sprout className="h-5 w-5 text-vanilla-300" />
          </div>
          <div>
            <div className="text-sm text-vanilla-400">Sustainability Score</div>
            <div className="text-xl font-medium text-vanilla-100">
              {farm.performance.sustainability}/100
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="w-10 h-10 bg-vanilla-500/20 rounded-full flex items-center justify-center mr-3">
            <Calendar className="h-5 w-5 text-vanilla-300" />
          </div>
          <div>
            <div className="text-sm text-vanilla-400">Harvest Schedule</div>
            <div className="text-lg font-medium text-vanilla-100">
              Last: {formatDate(farm.stats.lastHarvest || new Date().toISOString())}
              <br />
              Next: {formatDate(farm.stats.nextHarvest || new Date().toISOString())}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmStats;
