
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Calculator, Calendar, TrendingUp, Leaf, Sprout } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvestmentChart from './InvestmentChart';

interface InvestmentCalculatorProps {
  initialTokenPrice?: number;
  className?: string;
}

const InvestmentCalculator = ({ initialTokenPrice = 30, className }: InvestmentCalculatorProps) => {
  const [tokenCount, setTokenCount] = useState(1);
  const [tokenPrice, setTokenPrice] = useState(initialTokenPrice);
  const [yearsHolding, setYearsHolding] = useState(5);
  const [activeView, setActiveView] = useState('calculator');
  const [results, setResults] = useState<{
    plantValue: number;
    harvestValue: number;
    totalValue: number;
    roi: number;
  }>({
    plantValue: 0,
    harvestValue: 0,
    totalValue: 0,
    roi: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  
  // Investment projections based on New Cambium farm data
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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    calculateProjectedReturns();
  }, [tokenCount, tokenPrice, yearsHolding]);

  const calculateProjectedReturns = () => {
    if (yearsHolding < 1 || yearsHolding > 16) return;
    
    const yearData = growthData[yearsHolding - 1];
    const initialInvestment = tokenCount * tokenPrice;
    
    const projectedPlantValue = yearData.plantValue * tokenCount;
    const projectedHarvestValue = yearData.harvestValue * tokenCount;
    const projectedTotalValue = yearData.totalValue * tokenCount;
    
    // Calculate ROI
    const roi = ((projectedTotalValue - initialInvestment) / initialInvestment) * 100;
    
    setResults({
      plantValue: projectedPlantValue,
      harvestValue: projectedHarvestValue,
      totalValue: projectedTotalValue,
      roi: roi
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className={cn(
      "transition-all duration-1000 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      className
    )}>
      <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
        <CardHeader className="bg-vanilla-100 dark:bg-earth-950/50 border-b border-vanilla-200 dark:border-earth-800">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-earth-900 dark:text-vanilla-100">
                <Calculator className="h-5 w-5 mr-2 text-vanilla-600 dark:text-vanilla-500" />
                New Cambium Investment Calculator
              </CardTitle>
              <CardDescription className="text-earth-700 dark:text-vanilla-300">
                Calculate returns based on New Cambium's 20,000 tokenized vanilla plants in the Dominican Republic
              </CardDescription>
            </div>
            <Tabs value={activeView} onValueChange={setActiveView} className="w-auto">
              <TabsList className="bg-vanilla-50 dark:bg-earth-800">
                <TabsTrigger value="calculator" className="data-[state=active]:bg-vanilla-200 dark:data-[state=active]:bg-earth-700">Calculator</TabsTrigger>
                <TabsTrigger value="chart" className="data-[state=active]:bg-vanilla-200 dark:data-[state=active]:bg-earth-700">Chart</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <TabsContent value="calculator" className="m-0">
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tokenCount" className="flex items-center mb-2 text-earth-800 dark:text-vanilla-200">
                    <Leaf className="h-4 w-4 mr-1 text-vanilla-600 dark:text-vanilla-500" />
                    Number of Tokens
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="tokenCount"
                      type="number"
                      min={1}
                      max={100}
                      value={tokenCount}
                      onChange={(e) => setTokenCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 bg-white/70 dark:bg-earth-950/70"
                    />
                    <Slider
                      value={[tokenCount]}
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={(value) => setTokenCount(value[0])}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tokenPrice" className="flex items-center mb-2 text-earth-800 dark:text-vanilla-200">
                    <TrendingUp className="h-4 w-4 mr-1 text-vanilla-600 dark:text-vanilla-500" />
                    Purchase Price per Token (USD)
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="tokenPrice"
                      type="number"
                      min={1}
                      value={tokenPrice}
                      onChange={(e) => setTokenPrice(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 bg-white/70 dark:bg-earth-950/70"
                    />
                    <Slider
                      value={[tokenPrice]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={(value) => setTokenPrice(value[0])}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="yearsHolding" className="flex items-center mb-2 text-earth-800 dark:text-vanilla-200">
                    <Calendar className="h-4 w-4 mr-1 text-vanilla-600 dark:text-vanilla-500" />
                    Years Holding
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="yearsHolding"
                      type="number"
                      min={1}
                      max={16}
                      value={yearsHolding}
                      onChange={(e) => setYearsHolding(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
                      className="w-24 bg-white/70 dark:bg-earth-950/70"
                    />
                    <Slider
                      value={[yearsHolding]}
                      min={1}
                      max={16}
                      step={1}
                      onValueChange={(value) => setYearsHolding(value[0])}
                      className="flex-1"
                    />
                  </div>
                  <div className="text-xs text-earth-600 dark:text-vanilla-400 mt-1">
                    Based on the New Cambium growth model (max 16 years)
                  </div>
                </div>
              </div>
              
              <div className="bg-vanilla-50 dark:bg-earth-950/80 rounded-xl p-6 flex flex-col justify-center shadow-inner">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-display text-earth-900 dark:text-vanilla-100">Projected Returns</h3>
                  <p className="text-earth-600 dark:text-vanilla-300 text-sm">
                    After {yearsHolding} {yearsHolding === 1 ? 'year' : 'years'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-vanilla-200 dark:border-earth-800">
                    <span className="text-earth-700 dark:text-vanilla-300">Initial Investment:</span>
                    <span className="font-medium text-earth-900 dark:text-vanilla-100">{formatCurrency(tokenCount * tokenPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center animate-float" style={{ animationDelay: '0.1s' }}>
                    <span className="text-earth-700 dark:text-vanilla-300 flex items-center">
                      <Leaf className="h-4 w-4 mr-1" /> Plant Value:
                    </span>
                    <span className="font-medium text-earth-900 dark:text-vanilla-100">{formatCurrency(results.plantValue)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center animate-float" style={{ animationDelay: '0.2s' }}>
                    <span className="text-earth-700 dark:text-vanilla-300 flex items-center">
                      <Sprout className="h-4 w-4 mr-1" /> Harvest Payouts:
                    </span>
                    <span className="font-medium text-earth-900 dark:text-vanilla-100">{formatCurrency(results.harvestValue)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-vanilla-200 dark:border-earth-800 animate-float" style={{ animationDelay: '0.3s' }}>
                    <span className="text-earth-900 dark:text-vanilla-100 font-medium">Total Value:</span>
                    <span className="text-xl font-display text-vanilla-700 dark:text-vanilla-500">{formatCurrency(results.totalValue)}</span>
                  </div>
                  
                  <div className="bg-vanilla-100 dark:bg-earth-900/80 rounded-lg p-3 mt-2 text-center pulse-glow">
                    <div className="text-sm text-earth-700 dark:text-vanilla-300">Projected ROI</div>
                    <div className={cn(
                      "text-2xl font-display",
                      results.roi > 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                    )}>
                      {results.roi.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="chart" className="m-0">
          <CardContent className="p-4">
            <div className="h-[380px]">
              <InvestmentChart connected={true} />
            </div>
          </CardContent>
        </TabsContent>
        
        <CardFooter className="bg-vanilla-50 dark:bg-earth-950/50 px-6 py-4 text-sm text-earth-600 dark:text-vanilla-400 border-t border-vanilla-200 dark:border-earth-800">
          <div>
            <p className="mb-1">
              This calculator is based on New Cambium's vanilla farm in the Dominican Republic:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>20 hectares with 20,000 tokenized vanilla plants</li>
              <li>Sustainable reforestation integrated with vanilla cultivation</li>
              <li>Each token priced at $30 with first harvests in Year 4</li>
              <li>Annual growth value of $2 per leaf pair (averaging 15 pairs yearly)</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;
