
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import ConnectWallet from '@/components/ConnectWallet';
import TokenDetails from '@/components/TokenDetails';
import InvestmentChart from '@/components/InvestmentChart';
import TokenHoldings from '@/components/TokenHoldings';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import TribalBackground from '@/components/TribalBackground';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calculator, Leaf, BarChart } from 'lucide-react';
import { initRevealAnimations, initParallaxEffects } from '@/utils/revealAnimation';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [tokenCount, setTokenCount] = useState(3);
  const [tokenPrice, setTokenPrice] = useState(30);
  const [activeTab, setActiveTab] = useState("portfolio");
  
  // Sample token data for demonstration
  const sampleTokenInfo = {
    symbol: "VVT",
    price: tokenPrice,
    holdings: [
      { wallet: "Wallet 1", amount: 10 },
      { wallet: "Wallet 2", amount: 5 },
      { wallet: "Wallet 3", amount: 8 }
    ],
    rewards: {
      total: 25,
      monthlyRate: 2.5,
      apy: 12.5,
      nextHarvest: 0.75,
      nextStaking: 0.5,
      nextDistributionDate: "June 15, 2024"
    }
  };

  useEffect(() => {
    const cleanupReveal = initRevealAnimations();
    const cleanupParallax = initParallaxEffects();
    
    return () => {
      cleanupReveal();
      cleanupParallax();
    };
  }, []);

  const handleConnect = (connected: boolean) => {
    setIsConnected(connected);
    // In a real app, we would fetch the user's tokens here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-vanilla-50 to-white dark:from-earth-900 dark:to-earth-950 text-earth-900 dark:text-vanilla-100 relative">
      <Helmet>
        <title>Investor Dashboard | Vanilla Valley</title>
      </Helmet>
      
      <TribalBackground />
      
      <Navbar />
      
      <main className="container-padding pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-display mb-2 tribal-glow inline-block px-1">Investor Dashboard</h1>
              <p className="text-earth-700 dark:text-vanilla-300">
                Track your Vanilla Valley Tokens and investment growth
              </p>
            </div>
            
            <ConnectWallet onConnect={handleConnect} />
          </div>
          
          <Tabs 
            defaultValue="portfolio" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="bg-vanilla-100 dark:bg-earth-800/50 p-1 tribal-border">
              <TabsTrigger 
                value="portfolio" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-earth-900 data-[state=active]:text-earth-900 dark:data-[state=active]:text-vanilla-100"
              >
                <Leaf className="h-4 w-4 mr-2" />
                My Portfolio
              </TabsTrigger>
              <TabsTrigger 
                value="calculator" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-earth-900 data-[state=active]:text-earth-900 dark:data-[state=active]:text-vanilla-100"
              >
                <Calculator className="h-4 w-4 mr-2" />
                ROI Calculator
              </TabsTrigger>
              <TabsTrigger 
                value="market" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-earth-900 data-[state=active]:text-earth-900 dark:data-[state=active]:text-vanilla-100"
              >
                <BarChart className="h-4 w-4 mr-2" />
                Market Data
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="space-y-8 animate-fade-in">
              <TokenDetails 
                tokenInfo={sampleTokenInfo}
                connected={isConnected} 
              />
              
              <div className="grid grid-cols-1 gap-8">
                <InvestmentChart connected={isConnected} />
              </div>
              
              <TokenHoldings connected={isConnected} />
            </TabsContent>
            
            <TabsContent value="calculator" className="space-y-8 animate-fade-in">
              <InvestmentCalculator initialTokenPrice={30} />
            </TabsContent>
            
            <TabsContent value="market" className="space-y-8 animate-fade-in">
              <div className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border border-vanilla-200 dark:border-earth-800 rounded-xl p-8 text-center">
                <h3 className="text-xl font-display mb-4">Market Data Coming Soon</h3>
                <p className="text-earth-700 dark:text-vanilla-300 mb-6">
                  Real-time market data for Vanilla Valley Tokens will be available after the public launch.
                </p>
                <div className="flex justify-center">
                  <Button 
                    onClick={() => setActiveTab("portfolio")} 
                    variant="outline" 
                    className="border-vanilla-300 dark:border-earth-700"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Portfolio
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-earth-900 text-vanilla-100 py-8 relative z-10">
        <div className="container-padding">
          <div className="text-center">
            <p className="text-vanilla-300 text-sm">
              &copy; 2024 Vanilla Valley. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
