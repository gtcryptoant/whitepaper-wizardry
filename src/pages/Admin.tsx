import React, { useState } from 'react';
import FarmsList from '@/components/admin/FarmsList';
import FarmDetails from '@/components/admin/FarmDetails';
import AddFarmForm from '@/components/admin/AddFarmForm';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlusCircle, Leaf, ChevronRight, Wallet, TrendingUp } from 'lucide-react';
import TribalBackground from '@/components/TribalBackground';

// Sample farm data
const initialFarms = [
  {
    id: 'farm1',
    name: 'Madagascar Vanilla Estate',
    location: 'Madagascar, East Region',
    hectares: 25.5,
    establishedDate: '2021-03-15',
    performance: {
      yield: 87,
      quality: 92,
      sustainability: 78
    },
    tokens: {
      symbol: 'MDGV',
      totalSupply: 25000,
      circulatingSupply: 18750,
      price: 12.45,
      holders: 145
    },
    stats: {
      monthlyYield: [42, 45, 48, 50, 53, 55, 58, 60, 57, 54, 51, 48],
      annualRevenue: 320000,
      projectedGrowth: 12,
      lastHarvest: '2023-12-10',
      nextHarvest: '2024-06-15'
    }
  },
  {
    id: 'farm2',
    name: 'Tahiti Vanilla Gardens',
    location: 'Tahiti, French Polynesia',
    hectares: 18.7,
    establishedDate: '2022-02-08',
    performance: {
      yield: 82,
      quality: 95,
      sustainability: 88
    },
    tokens: {
      symbol: 'TAHV',
      totalSupply: 18700,
      circulatingSupply: 12500,
      price: 14.80,
      holders: 98
    },
    stats: {
      monthlyYield: [38, 40, 42, 45, 48, 51, 53, 55, 52, 48, 45, 42],
      annualRevenue: 276000,
      projectedGrowth: 15,
      lastHarvest: '2023-11-25',
      nextHarvest: '2024-05-20'
    }
  }
];

const Admin = () => {
  const [farms, setFarms] = useState(initialFarms);
  const [selectedFarm, setSelectedFarm] = useState<string | null>(farms.length > 0 ? farms[0].id : null);
  const [isAddingFarm, setIsAddingFarm] = useState(false);
  const { toast } = useToast();
  
  const currentFarm = farms.find(farm => farm.id === selectedFarm);
  
  const handleAddFarm = (newFarm: any) => {
    const farmWithId = {
      ...newFarm,
      id: `farm${farms.length + 1}`,
      performance: {
        yield: 75,
        quality: 80,
        sustainability: 70
      },
      tokens: {
        symbol: newFarm.symbol || 'VNL',
        totalSupply: 10000,
        circulatingSupply: 0,
        price: 10.0,
        holders: 1
      },
      stats: {
        monthlyYield: Array(12).fill(40),
        annualRevenue: 0,
        projectedGrowth: 10,
        lastHarvest: '',
        nextHarvest: ''
      }
    };
    
    const updatedFarms = [...farms, farmWithId];
    setFarms(updatedFarms);
    setSelectedFarm(farmWithId.id);
    setIsAddingFarm(false);
    
    toast({
      title: "Farm Added Successfully",
      description: `${farmWithId.name} has been added to your farm portfolio.`,
    });
  };
  
  const handleUpdateFarm = (updatedFarm: any) => {
    const updatedFarms = farms.map(farm => 
      farm.id === updatedFarm.id ? updatedFarm : farm
    );
    
    setFarms(updatedFarms);
    
    toast({
      title: "Farm Updated",
      description: `Changes to ${updatedFarm.name} have been saved.`,
    });
  };
  
  const handleIssueTokens = (farmId: string, amount: number, recipient: string) => {
    const updatedFarms = farms.map(farm => {
      if (farm.id === farmId) {
        return {
          ...farm,
          tokens: {
            ...farm.tokens,
            totalSupply: farm.tokens.totalSupply + amount,
            circulatingSupply: farm.tokens.circulatingSupply + amount,
            holders: farm.tokens.holders + 1
          }
        };
      }
      return farm;
    });
    
    setFarms(updatedFarms);
    
    toast({
      title: "Tokens Issued",
      description: `${amount} ${updatedFarms.find(f => f.id === farmId)?.tokens.symbol} tokens have been issued to ${recipient}.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100 pb-16">
      <TribalBackground />
      
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-medium text-vanilla-100">Vanilla Valley Admin</h1>
            <p className="text-vanilla-300">Manage your tokenized vanilla farms</p>
          </div>
          
          <div className="flex space-x-4">
            <Button className="bg-earth-800 hover:bg-earth-700 text-vanilla-200">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="farms" className="space-y-6">
          <TabsList className="bg-earth-800 border border-earth-700">
            <TabsTrigger 
              value="farms" 
              className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Farms
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="farms" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <Card className="bg-earth-800/90 border-earth-700">
                  <CardHeader>
                    <CardTitle className="text-vanilla-100">Your Farms</CardTitle>
                    <CardDescription className="text-vanilla-300">
                      Select a farm to manage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FarmsList 
                        farms={farms} 
                        selectedFarm={selectedFarm}
                        onSelectFarm={setSelectedFarm}
                      />
                      
                      <Separator className="my-4 bg-earth-700" />
                      
                      <Button 
                        className="w-full bg-earth-700 hover:bg-earth-600 text-vanilla-200 border border-earth-600"
                        onClick={() => setIsAddingFarm(true)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Farm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                {isAddingFarm ? (
                  <Card className="bg-earth-800/90 border-earth-700">
                    <CardHeader className="border-b border-earth-700">
                      <div className="flex items-center">
                        <div>
                          <CardTitle className="text-vanilla-100">Add New Farm</CardTitle>
                          <CardDescription className="text-vanilla-300">
                            Create a new tokenized vanilla farm
                          </CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          className="ml-auto text-vanilla-300 hover:text-vanilla-200 hover:bg-earth-700"
                          onClick={() => setIsAddingFarm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <AddFarmForm 
                        onSubmit={handleAddFarm} 
                        onCancel={() => setIsAddingFarm(false)}
                      />
                    </CardContent>
                  </Card>
                ) : currentFarm ? (
                  <FarmDetails 
                    farm={currentFarm}
                    onUpdate={handleUpdateFarm}
                    onIssueTokens={handleIssueTokens}
                  />
                ) : (
                  <Card className="bg-earth-800/90 border-earth-700 p-8 text-center">
                    <p className="text-vanilla-300">No farm selected. Please select a farm from the list or add a new one.</p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="bg-earth-800/90 border-earth-700">
              <CardHeader>
                <CardTitle className="text-vanilla-100">Analytics Dashboard</CardTitle>
                <CardDescription className="text-vanilla-300">
                  Overall performance metrics for your vanilla farming operation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-vanilla-300">Analytics dashboard coming soon...</p>
                <div className="flex items-center mt-4 p-4 bg-cardano-900/30 border border-cardano-800/50 rounded-md">
                  <Leaf className="h-5 w-5 text-cardano-400 mr-3" />
                  <div>
                    <h3 className="font-medium text-vanilla-100">Coming in next update</h3>
                    <p className="text-sm text-vanilla-300">Comprehensive analytics dashboard with real-time data visualizations and performance tracking.</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-vanilla-500" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Admin;
