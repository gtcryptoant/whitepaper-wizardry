
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Calendar, Save, X, Edit } from 'lucide-react';
import { Farm } from '@/types/farm';

interface FarmHeaderProps {
  farm: Farm;
  isEditing: boolean;
  editedFarm: Farm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditToggle: () => void;
  handleCancel: () => void;
}

const FarmHeader = ({ 
  farm, 
  isEditing, 
  editedFarm, 
  handleChange, 
  handleEditToggle, 
  handleCancel 
}: FarmHeaderProps) => {
  return (
    <div className="flex flex-row items-start justify-between">
      <div>
        <CardTitle className="text-2xl mb-2 flex items-center text-vanilla-100">
          {isEditing ? (
            <Input
              name="name"
              value={editedFarm.name}
              onChange={handleChange}
              className="text-2xl font-display h-auto py-1 max-w-md bg-earth-800 text-vanilla-100 border-earth-700"
            />
          ) : (
            farm.name
          )}
        </CardTitle>
        <CardDescription className="flex items-center mt-1 text-sm text-vanilla-300">
          <MapPin className="h-4 w-4 mr-1 text-vanilla-300" />
          {isEditing ? (
            <Input
              name="location"
              value={editedFarm.location}
              onChange={handleChange}
              className="h-8 py-1 max-w-xs bg-earth-800 text-vanilla-100 border-earth-700"
            />
          ) : (
            farm.location
          )}
          <span className="mx-2">•</span>
          <Calendar className="h-4 w-4 mr-1 text-vanilla-300" />
          {isEditing ? (
            <Input
              name="establishedDate"
              type="date"
              value={editedFarm.establishedDate}
              onChange={handleChange}
              className="h-8 py-1 w-40 bg-earth-800 text-vanilla-100 border-earth-700"
            />
          ) : (
            new Date(farm.establishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          )}
          <span className="mx-2">•</span>
          <span>
            {isEditing ? (
              <Input
                name="hectares"
                type="number"
                min="0"
                step="0.1"
                value={editedFarm.hectares}
                onChange={handleChange}
                className="h-8 py-1 w-24 inline-block bg-earth-800 text-vanilla-100 border-earth-700"
              />
            ) : (
              farm.hectares
            )} hectares
          </span>
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

export default FarmHeader;
