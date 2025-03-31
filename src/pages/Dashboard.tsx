
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wallet } from 'lucide-react';
import InvestmentChart from '@/components/InvestmentChart';
import TokenHoldings from '@/components/TokenHoldings';
import TokenDetails from '@/components/TokenDetails';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(true);

  // Demo data
  const userTokens = {
    balance: 75,
    tokenPrice: 30,
    value: 2250,
    yield: 9.2,
    lastHarvest: '2023-11-15',
    nextHarvest: '2024-02-15',
  };

  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100">
      <Helmet>
        <title>Dashboard | Vanilla Valley</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container-padding py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-display mb-2">Investor Dashboard</h1>
            <p className="text-vanilla-300">Track your vanilla token holdings and performance</p>
          </div>
          
          {isConnected ? (
            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-earth-800/60 px-4 py-2 rounded-lg">
              <Wallet className="text-vanilla-500 h-5 w-5" />
              <span className="text-vanilla-200">Connected: <span className="text-vanilla-100 font-medium">0x8a...5e3f</span></span>
            </div>
          ) : (
            <Button className="mt-4 md:mt-0 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
              Connect Wallet
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-earth-800/60 border-earth-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-vanilla-100">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display text-vanilla-500">${userTokens.value}</div>
              <p className="text-vanilla-300 text-sm">{userTokens.balance} tokens @ ${userTokens.tokenPrice}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-earth-800/60 border-earth-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-vanilla-100">Annual Yield</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display text-vanilla-500">{userTokens.yield}%</div>
              <p className="text-vanilla-300 text-sm">Based on current harvest projections</p>
            </CardContent>
          </Card>
          
          <Card className="bg-earth-800/60 border-earth-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-vanilla-100">Next Harvest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display text-vanilla-500">Feb 15, 2024</div>
              <p className="text-vanilla-300 text-sm">Estimated distribution date</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="holdings" className="space-y-8">
          <TabsList className="bg-earth-800 border-earth-700">
            <TabsTrigger value="holdings" className="data-[state=active]:bg-earth-700">Holdings</TabsTrigger>
            <TabsTrigger value="investment" className="data-[state=active]:bg-earth-700">Investment Growth</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-earth-700">Token Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="holdings">
            <TokenHoldings isConnected={isConnected} />
          </TabsContent>
          
          <TabsContent value="investment">
            <InvestmentChart connected={isConnected} />
          </TabsContent>
          
          <TabsContent value="details">
            <TokenDetails />
          </TabsContent>
        </Tabs>
        
        {isConnected && (
          <div className="mt-12 bg-earth-800/60 border border-earth-700 rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-display mb-2">Project Administration</h2>
                <p className="text-vanilla-300">Manage project parameters, partners, and token settings</p>
              </div>
              <Link to="/project-admin">
                <Button className="mt-4 md:mt-0 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
                  Access Admin <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
