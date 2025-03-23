
import { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface TokenomicsDataItem {
  name: string;
  value: number;
  color: string;
  description: string;
}

const tokenomicsData: TokenomicsDataItem[] = [
  { name: 'Community Rewards', value: 30, color: '#FFD36B', description: 'Allocated for community incentives, yield farming, and governance rewards.' },
  { name: 'Team & Advisors', value: 15, color: '#9C8A66', description: 'Allocated to the team, advisors, and early contributors with a 2-year vesting schedule.' },
  { name: 'Treasury', value: 20, color: '#C4B9A3', description: 'Reserved for future development, partnerships, and ecosystem growth.' },
  { name: 'Liquidity', value: 20, color: '#7D6F52', description: 'Dedicated to ensure market liquidity and trading stability.' },
  { name: 'Vanilla Farms', value: 15, color: '#EBE7E0', description: 'Direct allocation to vanilla farm acquisition and maintenance.' },
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
          <h3 className="text-2xl font-display mb-4">Token Distribution</h3>
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
        </div>
      </div>
    </div>
  );
};

export default TokenomicsChart;
