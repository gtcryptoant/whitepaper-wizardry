
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { FolderRoot, Leaf, Clock, CircleDollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TokenHoldingProps {
  id: string;
  plantAge: number;
  nextHarvest: string;
  harvestKg: number;
  nextPayout: number;
  totalPayout: number;
  connected: boolean;
}

const TokenHolding = ({
  id,
  plantAge,
  nextHarvest,
  harvestKg,
  nextPayout,
  totalPayout,
  connected
}: TokenHoldingProps) => {
  // Calculate plant value based on whitepaper ($30 + $30 per year)
  const plantValue = 30 + (plantAge * 30);
  
  return (
    <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-vanilla-500 dark:bg-vanilla-600 opacity-10 rounded-bl-full" />
      
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <span className="text-lg font-display">Vanilla Token #{id}</span>
          <span className="text-sm bg-vanilla-100 dark:bg-earth-800 text-vanilla-700 dark:text-vanilla-400 px-2 py-1 rounded-full flex items-center">
            <Leaf className="h-3.5 w-3.5 mr-1" />
            Year {plantAge}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-earth-600 dark:text-vanilla-400 flex items-center">
              <FolderRoot className="h-4 w-4 mr-1" /> Plant Value
            </span>
            <span className="font-medium">${plantValue.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-earth-600 dark:text-vanilla-400 flex items-center">
              <Clock className="h-4 w-4 mr-1" /> Next Harvest
            </span>
            <span className="font-medium">{nextHarvest}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-earth-600 dark:text-vanilla-400 flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-1" /> Projected Yield
            </span>
            <span className="font-medium">{harvestKg} kg (${nextPayout.toFixed(2)})</span>
          </div>
        </div>
      </CardContent>
      
      <Separator className="bg-vanilla-200 dark:bg-earth-800" />
      
      <CardFooter className="pt-4">
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-earth-600 dark:text-vanilla-400">Total Rewards Received</span>
          <span className="text-lg font-medium text-vanilla-700 dark:text-vanilla-500">${totalPayout.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

interface TokenHoldingsProps {
  connected: boolean;
}

const TokenHoldings = ({ connected = false }: TokenHoldingsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Sample token data based on whitepaper
  const tokens = [
    {
      id: "VVT-001",
      plantAge: 5,
      nextHarvest: "Jan 2025",
      harvestKg: 2,
      nextPayout: 15,
      totalPayout: 22.5,
    },
    {
      id: "VVT-042",
      plantAge: 4,
      nextHarvest: "Jan 2025",
      harvestKg: 1,
      nextPayout: 7.5,
      totalPayout: 7.5,
    },
    {
      id: "VVT-183",
      plantAge: 6,
      nextHarvest: "Jan 2025",
      harvestKg: 2.2,
      nextPayout: 16.5,
      totalPayout: 39,
    },
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "transition-all duration-1000 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <h3 className="text-xl font-display mb-4">Your Vanilla Valley Tokens</h3>
      
      {connected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <TokenHolding
              key={token.id}
              id={token.id}
              plantAge={token.plantAge}
              nextHarvest={token.nextHarvest}
              harvestKg={token.harvestKg}
              nextPayout={token.nextPayout}
              totalPayout={token.totalPayout}
              connected={connected}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800 py-12">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="text-center text-earth-600 dark:text-vanilla-400 mb-2">
              Connect your wallet to view your Vanilla Valley Tokens
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TokenHoldings;
