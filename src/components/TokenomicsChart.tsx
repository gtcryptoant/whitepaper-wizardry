
import { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface TokenomicsDataItem {
  name: string;
  value: number;
  color: string;
  description: string;
}

// Updated tokenomics data based on the whitepaper
const tokenomicsData: TokenomicsDataItem[] = [
  { name: 'Initial Supply', value: 40, color: '#FFD36B', description: '100,000 tokens representing the initial amount of plants available for project launch.' },
  { name: 'Community Rewards', value: 60, color: '#9C8A66', description: '150,000 tokens to be distributed as farm value grows and new plants mature.' },
];

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3 rounded-lg shadow-lg text-sm">
        <p className="font-medium">{data.name}: {data.value}%</p>
        <p className="text-earth-700 dark:text-vanilla-200 mt-1 max-w-xs">{data.description}</p>
      </div>
    );
  }
  return null;
};

export const TokenomicsChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "transition-all duration-1000 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tokenomicsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                innerRadius={70}
                paddingAngle={2}
                dataKey="value"
                animationBegin={isVisible ? 0 : 9999}
                animationDuration={1500}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {tokenomicsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="transparent"
                    className={cn(
                      "transition-all duration-300",
                      activeIndex === index ? "filter drop-shadow-lg" : ""
                    )}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full lg:w-1/2 space-y-4">
          <h3 className="text-2xl font-display mb-4">Vanilla Valley Token (VVT) Distribution</h3>
          
          <div className="space-y-4">
            {tokenomicsData.map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-center p-3 rounded-lg transition-all duration-300",
                  activeIndex === index ? "bg-vanilla-50 dark:bg-earth-800 shadow-md" : ""
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div 
                  className="w-4 h-4 rounded-sm mr-3" 
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="font-medium">{item.name}: {item.value}%</p>
                  <p className="text-sm text-earth-700 dark:text-vanilla-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-white/20 dark:bg-earth-800/20 backdrop-blur-sm rounded-lg border border-vanilla-200 dark:border-earth-800">
            <h4 className="font-medium mb-2">Token Details</h4>
            <ul className="space-y-2 text-earth-700 dark:text-vanilla-200">
              <li className="flex justify-between">
                <span>Max Supply:</span>
                <span className="font-medium">250,000 VVT</span>
              </li>
              <li className="flex justify-between">
                <span>Initial Supply:</span>
                <span className="font-medium">100,000 VVT</span>
              </li>
              <li className="flex justify-between">
                <span>Initial Token Price:</span>
                <span className="font-medium">$30 USD</span>
              </li>
              <li className="flex justify-between">
                <span>Blockchain:</span>
                <span className="font-medium">Cardano</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsChart;
