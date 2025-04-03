
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FarmOverview from '@/components/admin/farm-details/FarmOverview';
import FarmsList from '@/components/admin/FarmsList';
import FarmDetailsContainer from '@/components/admin/farm-details/FarmDetailsContainer';
import AddFarmForm from '@/components/admin/AddFarmForm';
import { Farm } from '@/types/farm';
import { farmsData } from '@/data/farmsData';

const Admin = () => {
  const [farms, setFarms] = useState<Farm[]>(farmsData);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);
  
  const selectedFarm = selectedFarmId 
    ? farms.find(farm => farm.id === selectedFarmId) 
    : null;
  
  const handleFarmSelect = (farmId: string) => {
    setSelectedFarmId(farmId);
  };
  
  const handleUpdateFarm = (updatedFarm: Farm) => {
    setFarms(farms.map(farm => 
      farm.id === updatedFarm.id ? updatedFarm : farm
    ));
  };
  
  const handleAddFarm = (newFarm: Farm) => {
    setFarms([...farms, newFarm]);
  };
  
  return (
    <AdminLayout 
      title="Farm Management"
      description="Manage farms, update details, and track performance"
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-earth-800 border-b border-earth-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="add-farm">Add Farm</TabsTrigger>
          <TabsTrigger value="manage-farms">Manage Farms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-6">
          <div className="grid grid-cols-1 gap-6">
            {selectedFarm ? (
              <FarmOverview farm={selectedFarm} />
            ) : (
              <div className="bg-earth-800/50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-vanilla-200 mb-2">No Farm Selected</h3>
                <p className="text-vanilla-400">
                  Please select a farm from the "Manage Farms" tab to view its details.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="add-farm" className="pt-6">
          <AddFarmForm onAdd={handleAddFarm} />
        </TabsContent>
        
        <TabsContent value="manage-farms" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <FarmsList 
                farms={farms} 
                selectedFarmId={selectedFarmId}
                onSelectFarm={handleFarmSelect} 
              />
            </div>
            
            <div className="lg:col-span-2">
              {selectedFarm ? (
                <FarmDetailsContainer 
                  farm={selectedFarm} 
                  onUpdateFarm={handleUpdateFarm} 
                />
              ) : (
                <div className="bg-earth-800/50 rounded-lg p-8 text-center h-full flex items-center justify-center">
                  <div>
                    <h3 className="text-xl font-medium text-vanilla-200 mb-2">No Farm Selected</h3>
                    <p className="text-vanilla-400">
                      Please select a farm from the list to view and edit its details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;
