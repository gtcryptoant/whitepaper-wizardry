
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import ConnectWallet from '@/components/ConnectWallet';
import TribalBackground from '@/components/TribalBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Send, Shield, BarChart2, Users, FileText, MapPin, Farm } from 'lucide-react';
import { initRevealAnimations } from '@/utils/revealAnimation';
import FarmsList from '@/components/admin/FarmsList';
import AddFarmForm from '@/components/admin/AddFarmForm';
import FarmDetails from '@/components/admin/FarmDetails';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

// Demo data for farms
const initialFarms = [
  { 
    id: 'farm-001', 
    name: 'Vanilla Valley Prime', 
    location: 'Madagascar', 
    hectares: 24, 
    establishedDate: '2020-05-15',
    performance: {
      yield: 85,
      quality: 92,
      sustainability: 88
    },
    tokens: {
      symbol: 'VVP',
      totalSupply: 50000,
      circulatingSupply: 22450,
      price: 32.50,
      holders: 87
    },
    stats: {
      monthlyYield: [45, 48, 52, 49, 53, 57, 61, 59, 63, 67, 68, 65],
      annualRevenue: 287500,
      projectedGrowth: 12.5,
      lastHarvest: '2023-11-10',
      nextHarvest: '2024-05-20'
    }
  },
  { 
    id: 'farm-002', 
    name: 'Emerald Vines', 
    location: 'Uganda', 
    hectares: 18, 
    establishedDate: '2021-03-22',
    performance: {
      yield: 78,
      quality: 85,
      sustainability: 92
    },
    tokens: {
      symbol: 'EVT',
      totalSupply: 35000,
      circulatingSupply: 12800,
      price: 27.75,
      holders: 52
    },
    stats: {
      monthlyYield: [38, 41, 40, 43, 45, 48, 50, 52, 54, 57, 55, 56],
      annualRevenue: 185000,
      projectedGrowth: 9.8,
      lastHarvest: '2023-10-05',
      nextHarvest: '2024-04-15'
    }
  },
  { 
    id: 'farm-003', 
    name: 'Golden Pods', 
    location: 'Indonesia', 
    hectares: 31, 
    establishedDate: '2019-08-10',
    performance: {
      yield: 91,
      quality: 89,
      sustainability: 82
    },
    tokens: {
      symbol: 'GPT',
      totalSupply: 62000,
      circulatingSupply: 31500,
      price: 35.20,
      holders: 104
    },
    stats: {
      monthlyYield: [58, 62, 65, 63, 67, 70, 72, 75, 73, 77, 80, 82],
      annualRevenue: 352000,
      projectedGrowth: 14.2,
      lastHarvest: '2023-12-08',
      nextHarvest: '2024-06-10'
    }
  }
];

const Admin = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [farms, setFarms] = useState(initialFarms);
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null);
  const [isAddingFarm, setIsAddingFarm] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);

  const handleConnect = (connected: boolean) => {
    setIsConnected(connected);
    
    // In a real implementation, we would check if the connected wallet has admin rights
    setIsAdmin(connected);
  };
  
  const handleAddFarm = (farm: any) => {
    const newFarm = {
      id: `farm-${String(farms.length + 1).padStart(3, '0')}`,
      ...farm,
      performance: {
        yield: 0,
        quality: 0,
        sustainability: 0
      },
      tokens: {
        symbol: farm.symbol,
        totalSupply: 0,
        circulatingSupply: 0,
        price: 0,
        holders: 0
      },
      stats: {
        monthlyYield: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        annualRevenue: 0,
        projectedGrowth: 0,
        lastHarvest: '',
        nextHarvest: ''
      }
    };
    
    setFarms([...farms, newFarm]);
    setIsAddingFarm(false);
    toast({
      title: "Farm Added",
      description: `${farm.name} has been successfully added to the platform.`,
    });
  };
  
  const handleUpdateFarm = (updatedFarm: any) => {
    setFarms(farms.map(farm => 
      farm.id === updatedFarm.id ? { ...farm, ...updatedFarm } : farm
    ));
    
    toast({
      title: "Farm Updated",
      description: `${updatedFarm.name} has been successfully updated.`,
    });
  };
  
  const handleIssueTokens = (farmId: string, amount: number, recipient: string) => {
    setFarms(farms.map(farm => {
      if (farm.id === farmId) {
        return {
          ...farm,
          tokens: {
            ...farm.tokens,
            totalSupply: farm.tokens.totalSupply + amount,
            circulatingSupply: farm.tokens.circulatingSupply + amount
          }
        };
      }
      return farm;
    }));
    
    toast({
      title: "Tokens Issued",
      description: `Successfully issued ${amount} tokens for ${farms.find(f => f.id === farmId)?.name}.`,
    });
  };

  // Find the selected farm data
  const selectedFarmData = selectedFarm ? farms.find(farm => farm.id === selectedFarm) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-vanilla-50 to-white dark:from-earth-900 dark:to-earth-950 text-earth-900 dark:text-vanilla-100 relative">
      <Helmet>
        <title>Admin Dashboard | Vanilla Valley</title>
      </Helmet>
      
      <TribalBackground />
      
      <Navbar />
      
      <main className="container-padding pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-display mb-2 tribal-glow inline-block px-1">Admin Dashboard</h1>
              <p className="text-earth-700 dark:text-vanilla-300">
                Manage Vanilla Valley farms, tokens, and platform settings
              </p>
            </div>
            
            <ConnectWallet onConnect={handleConnect} />
          </div>
          
          {!isConnected ? (
            <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Shield className="h-16 w-16 text-vanilla-300 dark:text-vanilla-600 mb-4" />
                <h2 className="text-2xl font-display mb-2">Admin Access Required</h2>
                <p className="text-center text-earth-700 dark:text-vanilla-300 mb-6 max-w-md">
                  Please connect your wallet with administrator privileges to access the admin dashboard.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar with farms list */}
              <div className="col-span-1">
                <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800 sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Farms
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsAddingFarm(true)}
                        className="h-8 w-8 text-earth-700 hover:text-earth-900 dark:text-vanilla-300 dark:hover:text-vanilla-100"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FarmsList 
                      farms={farms}
                      selectedFarm={selectedFarm}
                      onSelectFarm={setSelectedFarm}
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Main content area */}
              <div className="col-span-1 md:col-span-3">
                {isAddingFarm ? (
                  <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
                    <CardHeader>
                      <CardTitle>Add New Farm</CardTitle>
                      <CardDescription>
                        Create a new farm in the Vanilla Valley ecosystem
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AddFarmForm 
                        onSubmit={handleAddFarm}
                        onCancel={() => setIsAddingFarm(false)}
                      />
                    </CardContent>
                  </Card>
                ) : selectedFarmData ? (
                  <FarmDetails 
                    farm={selectedFarmData}
                    onUpdate={handleUpdateFarm}
                    onIssueTokens={handleIssueTokens}
                  />
                ) : (
                  <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
                    <CardContent className="py-16">
                      <div className="text-center">
                        <Farm className="h-16 w-16 text-vanilla-300 dark:text-vanilla-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-display mb-4">Platform Overview</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                          <div className="bg-white/60 dark:bg-earth-800/60 rounded-lg p-4 text-center">
                            <p className="text-earth-700 dark:text-vanilla-300 text-sm mb-1">Total Farms</p>
                            <p className="text-3xl font-medium">{farms.length}</p>
                          </div>
                          <div className="bg-white/60 dark:bg-earth-800/60 rounded-lg p-4 text-center">
                            <p className="text-earth-700 dark:text-vanilla-300 text-sm mb-1">Total Hectares</p>
                            <p className="text-3xl font-medium">{farms.reduce((sum, farm) => sum + farm.hectares, 0)}</p>
                          </div>
                          <div className="bg-white/60 dark:bg-earth-800/60 rounded-lg p-4 text-center">
                            <p className="text-earth-700 dark:text-vanilla-300 text-sm mb-1">Total Tokens</p>
                            <p className="text-3xl font-medium">{farms.reduce((sum, farm) => sum + farm.tokens.totalSupply, 0).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <p className="text-earth-700 dark:text-vanilla-300 max-w-lg mx-auto mb-8">
                          Select a farm from the sidebar to view details and manage tokens, or add a new farm to expand your vanilla ecosystem.
                        </p>
                        
                        <Button 
                          className="tribal-button" 
                          onClick={() => setIsAddingFarm(true)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Farm
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
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

export default Admin;
