
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import ConnectWallet from '@/components/ConnectWallet';
import TokenDetails from '@/components/TokenDetails';
import InvestmentChart from '@/components/InvestmentChart';
import TokenHoldings from '@/components/TokenHoldings';
import { initRevealAnimations } from '@/utils/revealAnimation';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [tokenCount, setTokenCount] = useState(3);
  const [tokenPrice, setTokenPrice] = useState(30);
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);

  const handleConnect = (connected: boolean) => {
    setIsConnected(connected);
    // In a real app, we would fetch the user's tokens here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-vanilla-50 to-white dark:from-earth-900 dark:to-earth-950 text-earth-900 dark:text-vanilla-100">
      <Helmet>
        <title>Investor Dashboard | Vanilla Valley</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container-padding pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-display mb-2">Investor Dashboard</h1>
              <p className="text-earth-700 dark:text-vanilla-300">
                Track your Vanilla Valley Tokens and investment growth
              </p>
            </div>
            
            <ConnectWallet onConnect={handleConnect} />
          </div>
          
          <div className="space-y-8">
            <TokenDetails 
              tokenCount={tokenCount} 
              tokenPrice={tokenPrice} 
              connected={isConnected} 
            />
            
            <div className="grid grid-cols-1 gap-8">
              <InvestmentChart connected={isConnected} />
            </div>
            
            <TokenHoldings connected={isConnected} />
          </div>
        </div>
      </main>
      
      <footer className="bg-earth-900 text-vanilla-100 py-8">
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
