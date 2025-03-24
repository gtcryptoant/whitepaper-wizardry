
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TribalBackground from "@/components/TribalBackground";
import { ProjectParameter, ProjectStats } from '@/types/project';
import ProjectParametersList from '@/components/admin/project/ProjectParametersList';
import ProjectStatsOverview from '@/components/admin/project/ProjectStatsOverview';
import NewPartnerForm from '@/components/admin/project/NewPartnerForm';
import { Farm } from '@/types/farm';
import { Settings, Plus, Users, Farm as FarmIcon, BarChart3, ChevronRight } from 'lucide-react';

// Sample project data
const initialParameters: ProjectParameter[] = [
  {
    id: 'param1',
    name: 'Token Price Floor',
    description: 'Minimum price per token in USD',
    value: '10.00',
    category: 'financial',
    lastUpdated: '2024-04-15'
  },
  {
    id: 'param2',
    name: 'Annual Yield Target',
    description: 'Target annual yield percentage',
    value: '12',
    category: 'financial',
    lastUpdated: '2024-04-10'
  },
  {
    id: 'param3',
    name: 'Harvest Cycle',
    description: 'Number of harvests per year',
    value: '2',
    category: 'operational',
    lastUpdated: '2024-03-22'
  },
  {
    id: 'param4',
    name: 'Quality Standard',
    description: 'Minimum quality score required (0-100)',
    value: '85',
    category: 'technical',
    lastUpdated: '2024-03-28'
  }
];

const initialStats: ProjectStats = {
  totalFarms: 3,
  totalTokenHolders: 243,
  totalHectares: 44.2,
  averageYield: 84.3,
  projectValue: 1467500
};

const ProjectAdmin = () => {
  const [parameters, setParameters] = useState<ProjectParameter[]>(initialParameters);
  const [stats, setStats] = useState<ProjectStats>(initialStats);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleParameterUpdate = (updatedParameter: ProjectParameter) => {
    const updatedParameters = parameters.map(param => 
      param.id === updatedParameter.id ? updatedParameter : param
    );
    
    setParameters(updatedParameters);
    
    toast({
      title: "Parameter Updated",
      description: `"${updatedParameter.name}" has been updated successfully.`,
      variant: "default",
    });
  };

  const handleAddParameter = (newParameter: ProjectParameter) => {
    setParameters([...parameters, newParameter]);
    
    toast({
      title: "Parameter Added",
      description: `"${newParameter.name}" has been added successfully.`,
      variant: "default",
    });
  };

  const handleAddPartner = (newPartner: Farm) => {
    // In a real implementation, this would update the farms list
    // and potentially communicate with a backend
    
    // Update the stats to reflect the new partner
    setStats({
      ...stats,
      totalFarms: stats.totalFarms + 1,
      totalHectares: stats.totalHectares + newPartner.hectares
    });
    
    toast({
      title: "Partner Added",
      description: `"${newPartner.name}" has been added as a new farm partner.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-earth-800 text-vanilla-50 pb-16">
      <TribalBackground />
      
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-medium text-vanilla-50">Project Administration</h1>
            <p className="text-vanilla-200 text-balance">
              Manage project parameters, add new partners, and monitor performance
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-vanilla-400 text-vanilla-50 hover:bg-vanilla-500 hover:text-earth-900"
            >
              <Users className="mr-2 h-4 w-4" />
              User Management
            </Button>
            <Button 
              className="bg-cardano-500 hover:bg-cardano-600 text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-earth-700 border border-earth-600 p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="parameters" 
              className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Parameters
            </TabsTrigger>
            <TabsTrigger 
              value="partners" 
              className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
            >
              <FarmIcon className="h-4 w-4 mr-2" />
              Farm Partners
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <ProjectStatsOverview stats={stats} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-vanilla-50">Recent Updates</CardTitle>
                  <CardDescription className="text-vanilla-300">
                    Latest changes to the project parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {parameters.slice(0, 3).map(param => (
                      <li key={param.id} className="flex justify-between p-3 bg-earth-600/50 rounded-md">
                        <div>
                          <p className="font-medium text-vanilla-100">{param.name}</p>
                          <p className="text-sm text-vanilla-300">Updated: {param.lastUpdated}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-cardano-400">{param.value}</p>
                          <p className="text-xs text-vanilla-400">{param.category}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-vanilla-200 hover:text-vanilla-50 hover:bg-earth-600"
                    onClick={() => setActiveTab("parameters")}
                  >
                    View All Parameters
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-vanilla-50">Quick Actions</CardTitle>
                  <CardDescription className="text-vanilla-300">
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <Button 
                      className="w-full justify-start bg-cardano-600 hover:bg-cardano-700 text-white"
                      onClick={() => setActiveTab("partners")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Farm Partner
                    </Button>
                    <Button 
                      className="w-full justify-start bg-cardano-600 hover:bg-cardano-700 text-white"
                      onClick={() => setActiveTab("parameters")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project Parameter
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-vanilla-400 text-vanilla-50 hover:bg-vanilla-500 hover:text-earth-900"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Generate Performance Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="parameters" className="space-y-6">
            <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-vanilla-50">Project Parameters</CardTitle>
                    <CardDescription className="text-vanilla-300">
                      Manage key project settings and targets
                    </CardDescription>
                  </div>
                  <Button
                    className="bg-cardano-500 hover:bg-cardano-600 text-white"
                    onClick={() => {
                      const newParam = {
                        id: `param${parameters.length + 1}`,
                        name: 'New Parameter',
                        description: 'Description',
                        value: '0',
                        category: 'other' as const,
                        lastUpdated: new Date().toISOString().split('T')[0]
                      };
                      handleAddParameter(newParam);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Parameter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ProjectParametersList 
                  parameters={parameters} 
                  onUpdate={handleParameterUpdate} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="partners" className="space-y-6">
            <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
              <CardHeader>
                <CardTitle className="text-vanilla-50">Add New Farm Partner</CardTitle>
                <CardDescription className="text-vanilla-300">
                  Register a new vanilla farm to the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewPartnerForm onSubmit={handleAddPartner} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
};

export default ProjectAdmin;
