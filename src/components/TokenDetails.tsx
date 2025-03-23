
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CircleCheck, Clock, CircleDollarSign, Leaf, Sprout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TokenDetailsProps {
  tokenCount?: number;
  tokenPrice?: number;
  connected: boolean;
}

const TokenDetails = ({ tokenCount = 0, tokenPrice = 30, connected = false }: TokenDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const calculateTotalValue = (count: number, price: number) => {
    return (count * price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className={cn(
      "transition-all duration-1000 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-earth-700 dark:text-vanilla-300 flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              Token Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-earth-900 dark:text-vanilla-100 mb-1">
              {connected ? formatNumber(tokenCount) : '–––'}
            </div>
            <p className="text-sm text-earth-600 dark:text-vanilla-400">
              {connected ? `Total Value: ${calculateTotalValue(tokenCount, tokenPrice)}` : 'Connect wallet to view'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-earth-700 dark:text-vanilla-300 flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              Plant Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-earth-900 dark:text-vanilla-100 mb-1">
              {connected ? `$${formatNumber(tokenPrice)}` : '–––'}
            </div>
            <p className="text-sm text-earth-600 dark:text-vanilla-400">
              {connected ? 'Value increases $2 per leaf pair' : 'Connect wallet to view'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-earth-700 dark:text-vanilla-300 flex items-center">
              <CircleCheck className="h-4 w-4 mr-2" />
              Total Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-earth-900 dark:text-vanilla-100 mb-1">
              {connected ? '$75.00' : '–––'}
            </div>
            <p className="text-sm text-earth-600 dark:text-vanilla-400">
              {connected ? 'Lifetime harvest payments' : 'Connect wallet to view'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-earth-700 dark:text-vanilla-300 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Next Harvest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-earth-900 dark:text-vanilla-100 mb-1">
              {connected ? 'Jan 2025' : '–––'}
            </div>
            <p className="text-sm text-earth-600 dark:text-vanilla-400">
              {connected ? 'Estimated payout: $15.00' : 'Connect wallet to view'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenDetails;
