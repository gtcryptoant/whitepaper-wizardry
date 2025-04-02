
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Farm } from '@/types/farm';

interface FarmPerformanceChartProps {
  farm: Farm;
}

const FarmPerformanceChart = ({ farm }: FarmPerformanceChartProps) => {
  // Format the data for the chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const chartData = farm.stats.monthlyYield.map((yield_, index) => ({
    name: monthNames[index],
    yield: yield_
  }));

  return (
    <motion.div 
      className="bg-earth-700/30 p-4 rounded-lg border border-earth-600/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-medium text-vanilla-100 mb-3">Monthly Yield (kg/hectare)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2418" />
            <XAxis 
              dataKey="name" 
              stroke="#A8976C" 
              tick={{ fill: '#A8976C' }}
            />
            <YAxis 
              stroke="#A8976C"
              tick={{ fill: '#A8976C' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2C261A', 
                border: '1px solid #A8976C',
                color: '#E6D6AF' 
              }}
            />
            <Line 
              type="monotone" 
              dataKey="yield" 
              stroke="#D4A857" 
              activeDot={{ r: 8, fill: '#D4A857', stroke: '#201C14' }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default FarmPerformanceChart;
