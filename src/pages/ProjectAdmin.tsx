import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProjectStatsOverview from '@/components/admin/project/ProjectStatsOverview';
import FarmDetails from '@/components/admin/FarmDetails';
import NewFarmForm from '@/components/admin/farm/NewFarmForm';
import NewPartnerForm from '@/components/admin/partner/NewPartnerForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Farm } from '@/types/farm';
import { Partner } from '@/types/partner';

const ProjectAdmin = () => {
  const [farms, setFarms] = useState<Farm[]>([
    {
      id: "1",
      name: "Vanilla Valley Farm 1",
      location: "Dominican Republic",
      hectares: 20,
      establishedDate: "2023-01-15",
      performance: {
        yield: 12,
        quality: 95,
        sustainability: 90
      },
      tokens: {
        symbol: "VVT",
        totalSupply: 20000,
        circulatingSupply: 15000,
        price: 20,
        holders: 125
      },
      stats: {
        monthlyYield: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1],
        annualRevenue: 500000,
        projectedGrowth: 15,
        lastHarvest: "2024-03-01",
        nextHarvest: "2024-06-01"
      },
      description: "A beautiful vanilla farm in the heart of the Dominican Republic.",
      vision: "To create a sustainable and profitable vanilla farm that benefits the local community."
    },
    {
      id: "2",
      name: "Vanilla Valley Farm 2",
      location: "Madagascar",
      hectares: 15,
      establishedDate: "2022-11-20",
      performance: {
        yield: 10,
        quality: 92,
        sustainability: 88
      },
      tokens: {
        symbol: "VVT",
        totalSupply: 15000,
        circulatingSupply: 12000,
        price: 18,
        holders: 90
      },
      stats: {
        monthlyYield: [0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2],
        annualRevenue: 400000,
        projectedGrowth: 12,
        lastHarvest: "2024-02-15",
        nextHarvest: "2024-05-15"
      },
      description: "A sustainable vanilla farm in Madagascar, known for its high-quality beans.",
      vision: "To be a leading vanilla producer in Madagascar, using sustainable farming practices."
    },
    {
      id: "3",
      name: "Vanilla Valley Farm 3",
      location: "Indonesia",
      hectares: 18,
      establishedDate: "2023-03-10",
      performance: {
        yield: 11,
        quality: 94,
        sustainability: 89
      },
      tokens: {
        symbol: "VVT",
        totalSupply: 18000,
        circulatingSupply: 14000,
        price: 19,
        holders: 110
      },
      stats: {
        monthlyYield: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1],
        annualRevenue: 450000,
        projectedGrowth: 14,
        lastHarvest: "2024-02-28",
        nextHarvest: "2024-05-28"
      },
      description: "An innovative vanilla farm in Indonesia, focused on community development.",
      vision: "To empower local farmers in Indonesia through sustainable vanilla farming."
    }
  ]);
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "1",
      name: "AgriTech Solutions",
      type: "Technology Provider",
      description: "Providing advanced farming technology solutions.",
      contact: "John Doe",
      email: "john.doe@agritech.com",
      phone: "123-456-7890"
    },
    {
      id: "2",
      name: "Global Vanilla Traders",
      type: "Distribution Partner",
      description: "Handling the distribution of vanilla beans worldwide.",
      contact: "Jane Smith",
      email: "jane.smith@globalvanilla.com",
      phone: "987-654-3210"
    }
  ]);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  const handleUpdateFarm = (updatedFarm: Farm) => {
    setFarms(farms.map(farm => farm.id === updatedFarm.id ? updatedFarm : farm));
    setSelectedFarmId(null); // Close the farm details after update
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
  };

  const handleCreateFarm = (newFarm: Omit<Farm, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 15);
    setFarms([...farms, { id, ...newFarm } as Farm]);
  };

  // Calculate project stats dynamically from farms data
  const projectStats = {
    totalFarms: farms.length,
    totalTokenHolders: farms.reduce((acc, farm) => acc + farm.tokens.holders, 0),
    totalHectares: farms.reduce((acc, farm) => acc + farm.hectares, 0),
    averageYield: farms.reduce((acc, farm) => acc + farm.performance.yield, 0) / farms.length,
    projectValue: farms.reduce((acc, farm) => acc + (farm.tokens.totalSupply * farm.tokens.price), 0)
  };

  const handleCreatePartner = (newPartner: Partner) => {
    setPartners([...partners, newPartner]);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-display text-vanilla-100">Project Administration</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-earth-800 border-b border-earth-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="farms">Farms</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-6">
            <div className="space-y-8">
              <ProjectStatsOverview stats={projectStats} />
              
              <Card className="bg-earth-800/60 border-earth-700">
                <CardHeader>
                  <CardTitle className="text-vanilla-100">Project Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button className="bg-earth-700 hover:bg-earth-600 text-vanilla-100">
                      Run Yield Distribution
                    </Button>
                    <Button className="bg-earth-700 hover:bg-earth-600 text-vanilla-100">
                      Publish Market Update
                    </Button>
                    <Button className="bg-earth-700 hover:bg-earth-600 text-vanilla-100">
                      Preview Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="farms" className="pt-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NewFarmForm onSubmit={handleCreateFarm} />
                
                <Card className="bg-earth-800/60 border-earth-700">
                  <CardHeader>
                    <CardTitle className="text-vanilla-100">Current Farms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {farms.map((farm) => (
                        <div key={farm.id} className="flex items-center justify-between p-3 bg-earth-700/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-earth-600 flex items-center justify-center text-vanilla-100">
                              {farm.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-vanilla-100">{farm.name}</div>
                              <div className="text-sm text-vanilla-300">{farm.location}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-vanilla-300 hover:text-vanilla-100" onClick={() => setSelectedFarmId(farm.id)}>View</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {selectedFarmId && (
                <FarmDetails 
                  farm={farms.find(farm => farm.id === selectedFarmId) as Farm}
                  onUpdate={handleUpdateFarm}
                  onIssueTokens={handleIssueTokens}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="parameters" className="pt-6">
            <Card className="bg-earth-800/60 border-earth-700">
              <CardHeader>
                <CardTitle className="text-vanilla-100">Project Parameters</CardTitle>
                <CardDescription className="text-vanilla-300">
                  Adjust key parameters for the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="yieldThreshold" className="text-vanilla-200">Yield Threshold</Label>
                    <Input 
                      id="yieldThreshold" 
                      type="number" 
                      defaultValue="10"
                      className="bg-earth-700 text-vanilla-100 border-earth-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sustainabilityTarget" className="text-vanilla-200">Sustainability Target</Label>
                    <Input 
                      id="sustainabilityTarget" 
                      type="number" 
                      defaultValue="90"
                      className="bg-earth-700 text-vanilla-100 border-earth-600"
                    />
                  </div>
                  
                  <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
                    Save Parameters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="partners" className="pt-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NewPartnerForm onSubmit={(partner) => handleCreatePartner(partner)} />
                
                <Card className="bg-earth-800/60 border-earth-700">
                  <CardHeader>
                    <CardTitle className="text-vanilla-100">Current Partners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {partners.map((partner, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-earth-700/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-earth-600 flex items-center justify-center text-vanilla-100">
                              {partner.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-vanilla-100">{partner.name}</div>
                              <div className="text-sm text-vanilla-300">{partner.type}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-vanilla-300 hover:text-vanilla-100">View</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="pt-6">
            <div className="space-y-8">
              <Card className="bg-earth-800/60 border-earth-700">
                <CardHeader>
                  <CardTitle className="text-vanilla-100">Homepage Content Management</CardTitle>
                  <CardDescription className="text-vanilla-300">
                    Edit the content displayed on the main website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Token Symbol Section */}
                    <div className="space-y-2">
                      <Label htmlFor="tokenSymbol" className="text-vanilla-200">Token Symbol</Label>
                      <Input 
                        id="tokenSymbol" 
                        defaultValue="$VVT"
                        className="bg-earth-700 text-vanilla-100 border-earth-600"
                      />
                      <p className="text-sm text-vanilla-400">
                        This will update the token symbol throughout the site
                      </p>
                    </div>
                    
                    {/* Vision Statement Section */}
                    <div className="space-y-2">
                      <Label htmlFor="visionStatement" className="text-vanilla-200">Project Vision</Label>
                      <Textarea 
                        id="visionStatement" 
                        rows={6}
                        defaultValue="New Cambium is a financially sustainable residential and rental community, integrating sustainable farming with thoughtfully designed living spaces. This project is focused on living in harmony with our natural world, ensuring that its growth aligns with the stewardship of the land and surrounding nature. Every decision supports a regenerative and sustainable future, fostering a deep connection between people and the environment."
                        className="bg-earth-700 text-vanilla-100 border-earth-600"
                      />
                    </div>
                    
                    {/* Farm Details Section */}
                    <div>
                      <h3 className="text-lg font-medium text-vanilla-100 mb-4">Featured Farm Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="farmNumber" className="text-vanilla-200">Farm Number</Label>
                          <Input 
                            id="farmNumber" 
                            defaultValue="1"
                            className="bg-earth-700 text-vanilla-100 border-earth-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="availableSupply" className="text-vanilla-200">Available Supply</Label>
                          <Input 
                            id="availableSupply" 
                            defaultValue="2,000 / 20,000"
                            className="bg-earth-700 text-vanilla-100 border-earth-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectWebsite" className="text-vanilla-200">Project Website URL</Label>
                          <Input 
                            id="projectWebsite" 
                            defaultValue="https://newcambium.org"
                            className="bg-earth-700 text-vanilla-100 border-earth-600"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
                        Save Content Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProjectAdmin;
