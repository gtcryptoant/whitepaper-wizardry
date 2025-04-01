
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectStatsOverview } from '@/components/admin/project/ProjectStatsOverview';
import ProjectParametersList from '@/components/admin/project/ProjectParametersList';
import { NewPartnerForm } from '@/components/admin/project/NewPartnerForm';
import { ProjectParameter } from '@/types/project';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useFarmStore } from '@/stores/farmStore';
import { useEffect } from 'react';

const ProjectAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAdmin } = useFarmStore();
  const navigate = useNavigate();

  // Sample project statistics
  const projectStats = {
    totalUsers: 1240,
    activeUsers: 892,
    totalTokens: 20000,
    tokenCirculation: 16400,
    averageYield: 11.2,
    harvestFrequency: 'Quarterly'
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
    }
  ]);
  
  // Handle parameter updates
  const handleParameterUpdate = (updatedParameter: ProjectParameter) => {
    setParameters(parameters.map(param => 
      param.id === updatedParameter.id ? updatedParameter : param
    ));
  };

  const handleSubmitPartner = (partner: any) => {
    console.log("New partner submitted:", partner);
    // In a real implementation, this would save the partner to the backend
  };
  
  return (
    <AdminLayout title="Project Administration" description="Manage global project settings and parameters">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-earth-800 border border-earth-700">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="parameters" 
            className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
          >
            Parameters
          </TabsTrigger>
          <TabsTrigger 
            value="partners" 
            className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white"
          >
            Partners
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
      </Tabs>
    </AdminLayout>
  );
};

export default ProjectAdmin;
