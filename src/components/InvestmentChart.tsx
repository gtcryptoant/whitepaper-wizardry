
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Updated data based on the New Cambium investment return table
const growthData = [
  { year: 1, plantValue: 20, harvestValue: 0, totalValue: 20 },
  { year: 2, plantValue: 40, harvestValue: 0, totalValue: 40 },
  { year: 3, plantValue: 60, harvestValue: 0, totalValue: 60 },
  { year: 4, plantValue: 80, harvestValue: 5, totalValue: 85 },
  { year: 5, plantValue: 100, harvestValue: 15, totalValue: 115 },
  { year: 6, plantValue: 140, harvestValue: 25, totalValue: 165 },
  { year: 7, plantValue: 180, harvestValue: 35, totalValue: 215 },
  { year: 8, plantValue: 220, harvestValue: 50, totalValue: 270 },
  { year: 9, plantValue: 260, harvestValue: 70, totalValue: 330 },
  { year: 10, plantValue: 300, harvestValue: 95, totalValue: 395 },
  { year: 11, plantValue: 340, harvestValue: 120, totalValue: 460 },
  { year: 12, plantValue: 380, harvestValue: 145, totalValue: 525 },
  { year: 13, plantValue: 420, harvestValue: 175, totalValue: 595 },
  { year: 14, plantValue: 460, harvestValue: 205, totalValue: 665 },
  { year: 15, plantValue: 500, harvestValue: 235, totalValue: 735 },
  { year: 16, plantValue: 540, harvestValue: 265, totalValue: 805 },
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
        <div className="glass-card p-3 rounded-lg shadow-md border-clay-700/80 bg-clay-900/80">
          <p className="font-medium mb-1">Year {label}</p>
          <p className="text-sm text-vanilla-300">
            Plant Value: ${payload[0].value}
          </p>
          <p className="text-sm text-vanilla-300">
            Harvest Rewards: ${payload[1].value}
          </p>
          <p className="text-sm font-medium text-vanilla-100">
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
      <Card className="bg-white/40 dark:bg-clay-900/40 backdrop-blur-sm border-vanilla-200 dark:border-clay-800">
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
                    stroke="#2E5E4E" 
                    fill="#55A8A2" 
                    name="Plant Value" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="harvestValue" 
                    stackId="1" 
                    stroke="#D4A857" 
                    fill="#F7E8C0" 
                    name="Harvest Rewards" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalValue" 
                    stroke="#B44D3C" 
                    fill="none" 
                    name="Total Value" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-vanilla-400">Connect your wallet to view investment projections</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentChart;
