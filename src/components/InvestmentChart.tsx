
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data based on the whitepaper investment return table
const growthData = [
  { year: 1, plantValue: 30, harvestValue: 0, totalValue: 30 },
  { year: 2, plantValue: 60, harvestValue: 0, totalValue: 60 },
  { year: 3, plantValue: 90, harvestValue: 0, totalValue: 90 },
  { year: 4, plantValue: 120, harvestValue: 7.5, totalValue: 127.5 },
  { year: 5, plantValue: 150, harvestValue: 22.5, totalValue: 172.5 },
  { year: 6, plantValue: 210, harvestValue: 37.5, totalValue: 247.5 },
  { year: 7, plantValue: 270, harvestValue: 52.5, totalValue: 322.5 },
  { year: 8, plantValue: 330, harvestValue: 75, totalValue: 405 },
  { year: 9, plantValue: 390, harvestValue: 105, totalValue: 495 },
  { year: 10, plantValue: 450, harvestValue: 142.5, totalValue: 592.5 },
  { year: 11, plantValue: 510, harvestValue: 180, totalValue: 690 },
  { year: 12, plantValue: 570, harvestValue: 217.5, totalValue: 787.5 },
  { year: 13, plantValue: 630, harvestValue: 262.5, totalValue: 892.5 },
  { year: 14, plantValue: 690, harvestValue: 307.5, totalValue: 997.5 },
  { year: 15, plantValue: 750, harvestValue: 352.5, totalValue: 1102.5 },
  { year: 16, plantValue: 810, harvestValue: 397.5, totalValue: 1207.5 },
];

interface InvestmentChartProps {
  connected: boolean;
}

const InvestmentChart = ({ connected = false }: InvestmentChartProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-lg shadow-md">
          <p className="font-medium mb-1">Year {label}</p>
          <p className="text-sm text-earth-700 dark:text-vanilla-300">
            Plant Value: ${payload[0].value}
          </p>
          <p className="text-sm text-earth-700 dark:text-vanilla-300">
            Harvest Rewards: ${payload[1].value}
          </p>
          <p className="text-sm font-medium text-earth-900 dark:text-vanilla-100">
            Total Value: ${payload[2].value}
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className={cn(
      "transition-all duration-1000 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
        <CardHeader>
          <CardTitle>Investment Growth Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {connected ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} 
                  />
                  <YAxis 
                    label={{ value: 'Value (USD)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="plantValue" 
                    stackId="1" 
                    stroke="#9C8A66" 
                    fill="#C4B9A3" 
                    name="Plant Value" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="harvestValue" 
                    stackId="1" 
                    stroke="#EABE60" 
                    fill="#FFD36B" 
                    name="Harvest Rewards" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalValue" 
                    stroke="#7D6F52" 
                    fill="none" 
                    name="Total Value" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-earth-600 dark:text-vanilla-400">Connect your wallet to view investment projections</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentChart;
