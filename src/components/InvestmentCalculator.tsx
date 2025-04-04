import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Calculator, Calendar, TrendingUp, Leaf, Sprout } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface InvestmentCalculatorProps {
  initialTokenPrice?: number;
  className?: string;
}

const InvestmentCalculator = ({ initialTokenPrice = 20, className }: InvestmentCalculatorProps) => {
  const [tokenCount, setTokenCount] = useState(1);
  const [tokenPrice, setTokenPrice] = useState(initialTokenPrice);
  const [yearsHolding, setYearsHolding] = useState(5);
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
      <Card className="bg-white/40 dark:bg-clay-900/40 backdrop-blur-sm border-vanilla-200 dark:border-clay-800 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-vanilla-600 dark:text-vanilla-500" />
            Investment Return Calculator
          </CardTitle>
          <CardDescription>
            Calculate your potential returns based on token quantity, purchase price, and holding period
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="tokenCount" className="flex items-center mb-2">
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
                    className="w-24"
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
                <Label htmlFor="tokenPrice" className="flex items-center mb-2">
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
                    className="w-24"
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
                <Label htmlFor="yearsHolding" className="flex items-center mb-2">
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
                    className="w-24"
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
            
            <div className="bg-vanilla-50 dark:bg-earth-950 rounded-xl p-6 flex flex-col justify-center">
              <div className="text-center mb-4">
                <h3 className="text-xl font-display">Projected Returns</h3>
                <p className="text-earth-600 dark:text-vanilla-300 text-sm">
                  After {yearsHolding} {yearsHolding === 1 ? 'year' : 'years'}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-vanilla-200 dark:border-earth-800">
                  <span className="text-earth-700 dark:text-vanilla-300">Initial Investment:</span>
                  <span className="font-medium">{formatCurrency(tokenCount * tokenPrice)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-earth-700 dark:text-vanilla-300 flex items-center">
                    <Leaf className="h-4 w-4 mr-1" /> Plant Value:
                  </span>
                  <span className="font-medium">{formatCurrency(results.plantValue)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-earth-700 dark:text-vanilla-300 flex items-center">
                    <Sprout className="h-4 w-4 mr-1" /> Harvest Payouts:
                  </span>
                  <span className="font-medium">{formatCurrency(results.harvestValue)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-vanilla-200 dark:border-earth-800">
                  <span className="text-earth-900 dark:text-vanilla-100 font-medium">Total Value:</span>
                  <span className="text-xl font-display text-vanilla-700 dark:text-vanilla-500">{formatCurrency(results.totalValue)}</span>
                </div>
                
                <div className="bg-vanilla-100 dark:bg-earth-900 rounded-lg p-3 mt-2 text-center">
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
        
        <CardFooter className="bg-vanilla-50 dark:bg-clay-950/50 px-6 py-4 text-sm text-earth-600 dark:text-vanilla-400">
          <div>
            <p className="mb-1">
              This calculator is based on the New Cambium growth model which includes:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Plant value growth ($2 per leaf pair, averaging 15 pairs annually)</li>
              <li>Harvest income (starting Year 4)</li>
              <li>Propagation benefits (new plant tokens from Year 6)</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;
