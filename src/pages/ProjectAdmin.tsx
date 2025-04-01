
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectStatsOverview from '@/components/admin/project/ProjectStatsOverview';
import ProjectParametersList from '@/components/admin/project/ProjectParametersList';
import NewPartnerForm from '@/components/admin/project/NewPartnerForm';
import { ProjectParameter, ProjectStats } from '@/types/project';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useFarmStore } from '@/stores/farmStore';
import { Button } from '@/components/ui/button';
import { Eye, Edit, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const ProjectAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAdmin, farms } = useFarmStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Calculate project stats from the farms data
  const projectStats: ProjectStats = {
    totalFarms: farms.length,
    totalTokenHolders: farms.reduce((total, farm) => total + farm.tokens.holders, 0),
    totalHectares: farms.reduce((total, farm) => total + farm.hectares, 0),
    averageYield: farms.length > 0 
      ? farms.reduce((total, farm) => total + farm.performance.yield, 0) / farms.length 
      : 0,
    projectValue: farms.reduce((total, farm) => total + (farm.tokens.price * farm.tokens.totalSupply), 0)
  };
  
  useEffect(() => {
    // If user is not an admin, redirect to the dashboard
    if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);
  
  // Sample project parameters for demonstration
  const [parameters, setParameters] = useState<ProjectParameter[]>([
    {
      id: '1',
      name: 'Initial Token Price',
      description: 'The price of a single vanilla plant token at launch',
      value: '30',
      category: 'financial',
      lastUpdated: '2023-06-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Target Yield',
      description: 'Annual yield target for token holders from harvest',
      value: '12',
      category: 'financial',
      lastUpdated: '2023-07-22T14:15:00Z'
    },
    {
      id: '3',
      name: 'Harvest Revenue Share',
      description: 'Percentage of harvest revenue distributed to token holders',
      value: '80',
      category: 'financial',
      lastUpdated: '2023-08-05T09:45:00Z'
    },
    {
      id: '4',
      name: 'Homepage Hero Title',
      description: 'Main headline text shown on the homepage',
      value: 'Real Vanilla Farming. Real Yields.',
      category: 'content',
      lastUpdated: '2023-09-12T11:20:00Z'
    },
    {
      id: '5',
      name: 'Homepage Hero Subtitle',
      description: 'Secondary text below the main headline',
      value: 'Vanilla Valley bridges traditional vanilla farming with blockchain technology, empowering farmers while offering investors sustainable returns.',
      category: 'content',
      lastUpdated: '2023-09-12T11:25:00Z'
    }
  ]);
  
  // Handle parameter updates
  const handleParameterUpdate = (updatedParameter: ProjectParameter) => {
    setParameters(parameters.map(param => 
      param.id === updatedParameter.id ? updatedParameter : param
    ));

    toast({
      title: "Parameter Updated",
      description: `${updatedParameter.name} has been updated successfully.`,
    });
  };

  const handleSubmitPartner = (partner: any) => {
    console.log("New partner submitted:", partner);
    // In a real implementation, this would save the partner to the backend
    toast({
      title: "Partner Added",
      description: `${partner.name} has been added as a project partner.`,
    });
  };

  const handlePreviewHomepage = () => {
    navigate('/');
    toast({
      title: "Viewing Homepage",
      description: "You are now viewing the public-facing homepage.",
    });
  };
  
  return (
    <AdminLayout title="Project Administration" description="Manage global project settings and parameters">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-display text-vanilla-100">Project Dashboard</h2>
          <p className="text-vanilla-300 text-sm">Make changes to your project's global settings and content</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="text-vanilla-300 border-vanilla-300 hover:bg-earth-700"
            onClick={handlePreviewHomepage}
          >
            <Eye className="h-4 w-4 mr-2" /> Preview Site
          </Button>
          <Link to="/admin">
            <Button className="bg-cardano-500 hover:bg-cardano-600 text-white">
              Farm Management <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-earth-800 border border-earth-700">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-tribal-terracotta data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="parameters" 
            className="data-[state=active]:bg-tribal-terracotta data-[state=active]:text-white"
          >
            Parameters
          </TabsTrigger>
          <TabsTrigger 
            value="partners" 
            className="data-[state=active]:bg-tribal-terracotta data-[state=active]:text-white"
          >
            Partners
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className="data-[state=active]:bg-tribal-terracotta data-[state=active]:text-white"
          >
            Content
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <ProjectStatsOverview stats={projectStats} />
          <div className="bg-earth-800/50 rounded-xl p-6">
            <h2 className="text-xl font-medium text-vanilla-100 mb-4">Recent Project Updates</h2>
            <p className="text-vanilla-300">
              This section will display recent changes and updates to the project. Future development will include 
              an activity feed showing parameter changes, partnership announcements, and governance decisions.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="parameters" className="space-y-6">
          <div className="bg-earth-800/50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-medium text-vanilla-100 mb-4">Project Parameters</h2>
            <p className="text-vanilla-300 mb-4">
              These parameters define the core attributes and performance metrics of the vanilla farming project. 
              Updates to these values will be reflected across the platform and communicated to stakeholders.
            </p>
          </div>
          
          <ProjectParametersList parameters={parameters} onUpdate={handleParameterUpdate} />
        </TabsContent>
        
        <TabsContent value="partners" className="space-y-6">
          <div className="bg-earth-800/50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-medium text-vanilla-100 mb-4">Project Partners</h2>
            <p className="text-vanilla-300 mb-4">
              Manage partnerships with organizations that contribute to the Vanilla Valley ecosystem. 
              Add new partners to showcase on the platform and in marketing materials.
            </p>
          </div>
          
          <NewPartnerForm onSubmit={handleSubmitPartner} />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="bg-earth-800/50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-medium text-vanilla-100 mb-4">Homepage Content</h2>
            <p className="text-vanilla-300 mb-4">
              Manage the content displayed on the public-facing homepage. Update text, images, 
              and other elements to keep your presentation fresh and engaging.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-earth-800/30 rounded-xl p-6 border border-earth-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-vanilla-100">Hero Section</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Title</p>
                  <p className="text-vanilla-200">{parameters.find(p => p.id === '4')?.value}</p>
                </div>
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Subtitle</p>
                  <p className="text-vanilla-200">{parameters.find(p => p.id === '5')?.value}</p>
                </div>
              </div>
            </div>

            <div className="bg-earth-800/30 rounded-xl p-6 border border-earth-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-vanilla-100">Vision Section</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Title</p>
                  <p className="text-vanilla-200">Our Vision</p>
                </div>
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Description</p>
                  <p className="text-vanilla-200">Vanilla Valley is reimagining how agricultural assets are owned, traded, and valued in the digital age...</p>
                </div>
              </div>
            </div>

            <div className="bg-earth-800/30 rounded-xl p-6 border border-earth-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-vanilla-100">Investment Calculator</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Initial Token Price</p>
                  <p className="text-vanilla-200">${parameters.find(p => p.id === '1')?.value}</p>
                </div>
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Target Yield</p>
                  <p className="text-vanilla-200">{parameters.find(p => p.id === '2')?.value}%</p>
                </div>
              </div>
            </div>

            <div className="bg-earth-800/30 rounded-xl p-6 border border-earth-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-vanilla-100">Team Section</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Status</p>
                  <p className="text-green-500">Active (4 team members)</p>
                </div>
                <div>
                  <p className="text-xs text-vanilla-400 mb-1">Last Updated</p>
                  <p className="text-vanilla-200">2023-09-15</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ProjectAdmin;
