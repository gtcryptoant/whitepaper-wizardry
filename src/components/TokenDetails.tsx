
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Info, Zap, ArrowRight } from 'lucide-react';
import TokenHoldings from './TokenHoldings';
import { cn } from '@/lib/utils';

interface TokenDetailsProps {
  tokenInfo: {
    symbol: string;
    price: number;
    holdings: {
      wallet: string;
      amount: number;
    }[];
    rewards: {
      total: number;
      monthlyRate: number;
      apy: number;
      nextHarvest: number;
      nextStaking: number;
      nextDistributionDate: string;
    };
  };
  className?: string;
  connected?: boolean;
}

const TokenDetails = ({ tokenInfo, className, connected = false }: TokenDetailsProps) => {
  const [activeTab, setActiveTab] = useState('holdings');
  
  return (
    <Card className={cn("bg-clay-900/90 border-clay-800", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-vanilla-100 mb-1">${tokenInfo.symbol} Token Details</CardTitle>
            <CardDescription className="text-vanilla-300">
              Your $VVT token holdings and staking stats
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="text-vanilla-300">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 bg-clay-800">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          <TabsContent value="holdings" className="pt-4">
            <TokenHoldings connected={connected} />
          </TabsContent>
          <TabsContent value="rewards" className="pt-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-vanilla-300">Total Rewards Earned</span>
                  <span className="text-xl font-medium text-vanilla-100">
                    {tokenInfo.rewards.total.toFixed(2)} $VVT
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-vanilla-300">Current Monthly Rate</span>
                  <span className="text-vanilla-100">
                    {tokenInfo.rewards.monthlyRate.toFixed(2)} $VVT
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-vanilla-300">Annual Yield (APY)</span>
                  <span className="text-vanilla-500 font-medium">
                    {tokenInfo.rewards.apy.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              <div className="bg-clay-800/60 p-4 rounded-lg border border-clay-700 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-vanilla-300">Next Harvest Reward</span>
                  <span className="text-vanilla-100">
                    {tokenInfo.rewards.nextHarvest.toFixed(2)} $VVT
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-vanilla-300">Next Staking Reward</span>
                  <span className="text-vanilla-100">
                    {tokenInfo.rewards.nextStaking.toFixed(2)} $VVT
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-vanilla-300">Next Distribution</span>
                  <span className="text-vanilla-100">
                    {tokenInfo.rewards.nextDistributionDate}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-clay-800/30 rounded-lg border border-clay-700">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-vanilla-500 mr-2" />
                  <span className="text-vanilla-300">Boost rewards by staking more tokens</span>
                </div>
                <Button variant="link" className="text-vanilla-500 p-0">
                  Stake <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-clay-800 pt-4">
        <Button variant="outline" className="border-vanilla-400 text-vanilla-400 hover:bg-clay-800">
          Transaction History
        </Button>
        <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-clay-900">
          Manage Tokens
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenDetails;
