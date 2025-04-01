
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FarmHeader from './FarmHeader';
import FarmOverview from './FarmOverview';
import TokenManagement from './TokenManagement';
import PerformanceView from './PerformanceView';
import FarmPhotoUpload from './FarmPhotoUpload';
import { Farm } from '@/types/farm';

interface FarmDetailsContainerProps {
  farm: Farm;
  onUpdate: (updatedFarm: Farm) => void;
  onIssueTokens: (farmId: string, amount: number, recipient: string) => void;
}

const FarmDetailsContainer = ({ farm, onUpdate, onIssueTokens }: FarmDetailsContainerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFarm, setEditedFarm] = useState<Farm>({ ...farm });
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      onUpdate(editedFarm);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'performance') {
        setEditedFarm({
          ...editedFarm,
          performance: {
            ...editedFarm.performance,
            [child]: Number(value)
          }
        });
      } else {
        // Handle other nested properties if needed
        // This is a placeholder for future nested properties
      }
    } else {
      setEditedFarm({
        ...editedFarm,
        [name]: name === 'hectares' ? Number(value) : value
      });
    }
  };
  
  const handleCancel = () => {
    setEditedFarm({ ...farm });
    setIsEditing(false);
  };

  const handlePhotoUpload = (imageUrl: string) => {
    setEditedFarm({
      ...editedFarm,
      imageUrl
    });
    
    // If not in editing mode, save immediately
    if (!isEditing) {
      onUpdate({
        ...farm,
        imageUrl
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-earth-900/40 backdrop-blur-sm border-earth-800">
        <CardHeader>
          <FarmHeader 
            farm={farm}
            isEditing={isEditing}
            editedFarm={editedFarm}
            handleChange={handleChange}
            handleEditToggle={handleEditToggle}
            handleCancel={handleCancel}
          />
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="bg-earth-800/50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="tokens" className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white">Token Management</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white">Performance</TabsTrigger>
              <TabsTrigger value="photos" className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white">Photos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <FarmOverview 
                farm={farm} 
                isEditing={isEditing} 
                editedFarm={editedFarm} 
                handleChange={handleChange}
              />
            </TabsContent>
            
            <TabsContent value="tokens" className="mt-6">
              <TokenManagement 
                farm={farm}
                onIssueTokens={onIssueTokens}
              />
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <PerformanceView farm={farm} />
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <FarmPhotoUpload 
                farm={farm}
                onPhotoUpload={handlePhotoUpload}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmDetailsContainer;
