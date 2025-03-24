
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
        <p className="text-vanilla-400 text-sm italic">No farms added yet</p>
      ) : (
        farms.map((farm) => (
          <button
            key={farm.id}
            className={cn(
              "w-full text-left p-2 rounded-md transition-colors flex items-center",
              selectedFarm === farm.id 
                ? "bg-earth-700 text-vanilla-100 border border-cardano-700/50" 
                : "hover:bg-earth-700/50 text-vanilla-300 border border-transparent"
            )}
            onClick={() => onSelectFarm(farm.id)}
          >
            <div className={cn(
              "mr-2 h-8 w-8 rounded-full flex items-center justify-center",
              selectedFarm === farm.id
                ? "bg-cardano-600 text-white"
                : "bg-earth-600 text-vanilla-200"
            )}>
              {farm.name.substring(0, 1)}
            </div>
            <div>
              <p className="font-medium">{farm.name}</p>
              <p className="text-xs flex items-center text-vanilla-400">
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
