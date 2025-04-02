
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerHeader from './PartnerHeader';
import PartnerOverview from './PartnerOverview';
import PartnerContacts from './PartnerContacts';
import { Partner } from '@/types/partner';

interface PartnerDetailsContainerProps {
  partner: Partner;
  onUpdate: (updatedPartner: Partner) => void;
}

const PartnerDetailsContainer = ({ partner, onUpdate }: PartnerDetailsContainerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPartner, setEditedPartner] = useState<Partner>({ ...partner });
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      onUpdate(editedPartner);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPartner({
      ...editedPartner,
      [name]: value
    });
  };
  
  const handleCancel = () => {
    setEditedPartner({ ...partner });
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-clay-900/40 backdrop-blur-sm border-clay-800">
        <CardHeader>
          <PartnerHeader 
            partner={partner}
            isEditing={isEditing}
            editedPartner={editedPartner}
            handleChange={handleChange}
            handleEditToggle={handleEditToggle}
            handleCancel={handleCancel}
          />
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="bg-clay-800/50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">Contact Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <PartnerOverview 
                partner={partner} 
                isEditing={isEditing} 
                editedPartner={editedPartner} 
                handleChange={handleChange}
              />
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-6">
              <PartnerContacts 
                partner={partner}
                isEditing={isEditing}
                editedPartner={editedPartner}
                handleChange={handleChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerDetailsContainer;
