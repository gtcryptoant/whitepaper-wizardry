
import React, { useState, useEffect } from 'react';
import FarmsList from '@/components/admin/FarmsList';
import FarmDetails from '@/components/admin/FarmDetails';
import AddFarmForm from '@/components/admin/AddFarmForm';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlusCircle, Leaf, ChevronRight, TrendingUp } from 'lucide-react';
import TribalBackground from '@/components/TribalBackground';
import { useFarmStore } from '@/stores/farmStore';
import { Farm } from '@/types/farm';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { farms, selectedFarmId, setSelectedFarmId, addFarm, updateFarm, isAdmin } = useFarmStore();
  const [isAddingFarm, setIsAddingFarm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is not an admin, redirect to the dashboard
    if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);
  
  const currentFarm = farms.find(farm => farm.id === selectedFarmId);
  
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
      },
      imageUrl: '/placeholder.svg'
    };
    
    addFarm(farmWithId);
    setIsAddingFarm(false);
    
    toast({
      title: "Farm Added Successfully",
      description: `${farmWithId.name} has been added to your farm portfolio.`,
    });
  };
  
  const handleUpdateFarm = (updatedFarm: Farm) => {
    updateFarm(updatedFarm);
    
    toast({
      title: "Farm Updated",
      description: `Changes to ${updatedFarm.name} have been saved.`,
    });
  };
  
  const handleIssueTokens = (farmId: string, amount: number, recipient: string) => {
    const farmToUpdate = farms.find(f => f.id === farmId);
    
    if (farmToUpdate) {
      const updatedFarm = {
        ...farmToUpdate,
        tokens: {
          ...farmToUpdate.tokens,
          totalSupply: farmToUpdate.tokens.totalSupply + amount,
          circulatingSupply: farmToUpdate.tokens.circulatingSupply + amount,
          holders: farmToUpdate.tokens.holders + 1
        }
      };
      
      updateFarm(updatedFarm);
      
      toast({
        title: "Tokens Issued",
        description: `${amount} ${updatedFarm.tokens.symbol} tokens have been issued to ${recipient}.`,
      });
    }
  };
  
  return (
    <AdminLayout title="Farm Management" description="Manage your tokenized vanilla farms">
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
                      selectedFarm={selectedFarmId}
                      onSelectFarm={setSelectedFarmId}
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
    </AdminLayout>
  );
};

export default Admin;
