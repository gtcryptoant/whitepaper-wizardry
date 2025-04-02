
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Building, Save, X, Edit } from 'lucide-react';
import { Partner } from '@/types/partner';

interface PartnerHeaderProps {
  partner: Partner;
  isEditing: boolean;
  editedPartner: Partner;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditToggle: () => void;
  handleCancel: () => void;
}

const PartnerHeader = ({ 
  partner, 
  isEditing, 
  editedPartner, 
  handleChange, 
  handleEditToggle, 
  handleCancel 
}: PartnerHeaderProps) => {
  return (
    <div className="flex flex-row items-start justify-between">
      <div>
        <CardTitle className="text-2xl mb-2 flex items-center text-vanilla-100">
          {isEditing ? (
            <Input
              name="name"
              value={editedPartner.name}
              onChange={handleChange}
              className="text-2xl font-display h-auto py-1 max-w-md bg-earth-800 text-vanilla-100 border-earth-700"
            />
          ) : (
            partner.name
          )}
        </CardTitle>
        <CardDescription className="flex items-center mt-1 text-sm text-vanilla-300">
          <Building className="h-4 w-4 mr-1 text-vanilla-300" />
          {isEditing ? (
            <Input
              name="type"
              value={editedPartner.type}
              onChange={handleChange}
              className="h-8 py-1 max-w-xs bg-earth-800 text-vanilla-100 border-earth-700"
            />
          ) : (
            partner.type
          )}
        </CardDescription>
      </div>
      
      <Button
        variant={isEditing ? "default" : "outline"}
        size="sm"
        className={isEditing ? "tribal-button" : "border-vanilla-300 text-vanilla-300 hover:bg-earth-800"}
        onClick={handleEditToggle}
      >
        {isEditing ? (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save
          </>
        ) : (
          <>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </>
        )}
      </Button>
      
      {isEditing && (
        <Button
          variant="outline"
          size="sm"
          className="ml-2 border-vanilla-300 text-vanilla-300 hover:bg-earth-800"
          onClick={handleCancel}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      )}
    </div>
  );
};

export default PartnerHeader;
