
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProjectStatsOverview from '@/components/admin/project/ProjectStatsOverview';
import FarmDetails from '@/components/admin/FarmDetails';
import NewFarmForm from '@/components/admin/farm/NewFarmForm';
import NewPartnerForm from '@/components/admin/partner/NewPartnerForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Farm } from '@/types/farm';
import { Partner } from '@/types/partner';
import OverviewActions from '@/components/admin/project/OverviewActions';
import FarmsList from '@/components/admin/project/FarmsList';
import PartnersList from '@/components/admin/project/PartnersList';
import ProjectParameters from '@/components/admin/project/ProjectParameters';
import ContentManagement from '@/components/admin/project/ContentManagement';
import { farmsData } from '@/data/farmsData';

const ProjectAdmin = () => {
  const [farms, setFarms] = useState<Farm[]>(farmsData);
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
              <OverviewActions />
            </div>
          </TabsContent>
          
          <TabsContent value="farms" className="pt-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NewFarmForm onSubmit={handleCreateFarm} />
                <FarmsList farms={farms} onSelectFarm={setSelectedFarmId} />
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
            <ProjectParameters />
          </TabsContent>
          
          <TabsContent value="partners" className="pt-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NewPartnerForm onSubmit={(partner) => handleCreatePartner(partner)} />
                <PartnersList partners={partners} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="pt-6">
            <ContentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProjectAdmin;
