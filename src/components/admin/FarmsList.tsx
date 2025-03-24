
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface Farm {
  id: string;
  name: string;
  location: string;
}

interface FarmsListProps {
  farms: Farm[];
  selectedFarm: string | null;
  onSelectFarm: (farmId: string) => void;
}

const FarmsList = ({ farms, selectedFarm, onSelectFarm }: FarmsListProps) => {
  return (
    <div className="space-y-2">
      {farms.length === 0 ? (
        <p className="text-earth-700 dark:text-vanilla-300 text-sm italic">No farms added yet</p>
      ) : (
        farms.map((farm) => (
          <button
            key={farm.id}
            className={cn(
              "w-full text-left p-2 rounded-md transition-colors flex items-center",
              selectedFarm === farm.id 
                ? "bg-vanilla-200 dark:bg-earth-800 text-earth-900 dark:text-vanilla-100" 
                : "hover:bg-vanilla-100 dark:hover:bg-earth-800/50 text-earth-700 dark:text-vanilla-300"
            )}
            onClick={() => onSelectFarm(farm.id)}
          >
            <div className="mr-2 h-8 w-8 bg-vanilla-300 dark:bg-vanilla-700 rounded-full flex items-center justify-center text-earth-900">
              {farm.name.substring(0, 1)}
            </div>
            <div>
              <p className="font-medium">{farm.name}</p>
              <p className="text-xs flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {farm.location}
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default FarmsList;
