
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Farm } from '@/types/farm';

interface FarmsListProps {
  farms: Farm[];
  onSelectFarm: (farmId: string) => void;
}

const FarmsList = ({ farms, onSelectFarm }: FarmsListProps) => {
  return (
    <Card className="bg-earth-800/60 border-earth-700">
      <CardHeader>
        <CardTitle className="text-vanilla-100">Current Farms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {farms.map((farm) => (
            <div key={farm.id} className="flex items-center justify-between p-3 bg-earth-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-earth-600 flex items-center justify-center text-vanilla-100">
                  {farm.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-vanilla-100">{farm.name}</div>
                  <div className="text-sm text-vanilla-300">{farm.location}</div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-vanilla-300 hover:text-vanilla-100" 
                onClick={() => onSelectFarm(farm.id)}
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmsList;
