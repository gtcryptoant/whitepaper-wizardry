
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FarmHeader from './FarmHeader';
import FarmOverview from './FarmOverview';
import TokenManagement from './TokenManagement';
import PerformanceView from './PerformanceView';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      } else if (parent === 'tokens') {
        setEditedFarm({
          ...editedFarm,
          tokens: {
            ...editedFarm.tokens,
            [child]: child === 'symbol' ? value : Number(value)
          }
        });
      } else {
        // Handle other nested properties if needed
      }
    } else {
      // Handle special numeric fields
      if (name === 'hectares') {
        setEditedFarm({
          ...editedFarm,
          [name]: Number(value)
        });
      } else {
        // Handle regular string fields
        setEditedFarm({
          ...editedFarm,
          [name]: value
        });
      }
    }
  };
  
  const handleCancel = () => {
    setEditedFarm({ ...farm });
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-clay-900/40 backdrop-blur-sm border-clay-800">
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
            <TabsList className="bg-clay-800/50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="tokens" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">Token Management</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">Performance</TabsTrigger>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmDetailsContainer;
