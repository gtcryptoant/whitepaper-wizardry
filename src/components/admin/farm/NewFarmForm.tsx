
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Farm } from '@/types/farm';

interface NewFarmFormProps {
  onSubmit: (farm: Omit<Farm, 'id'>) => void;
}

const NewFarmForm = ({ onSubmit }: NewFarmFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sample form submission with default values
    const newFarm: Omit<Farm, 'id'> = {
      name: "New Farm",
      location: "Location",
      hectares: 10,
      establishedDate: new Date().toISOString().split('T')[0],
      performance: {
        yield: 10,
        quality: 90,
        sustainability: 85
      },
      tokens: {
        symbol: "VVT",
        totalSupply: 10000,
        circulatingSupply: 8000,
        price: 20,
        holders: 50
      },
      stats: {
        monthlyYield: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1],
        annualRevenue: 350000,
        projectedGrowth: 12,
        lastHarvest: new Date().toISOString().split('T')[0],
        nextHarvest: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]
      },
      description: "A new farm with great potential.",
      vision: "To become a sustainable and profitable farm."
    };
    
    onSubmit(newFarm);
  };

  return (
    <Card className="bg-earth-800/60 border-earth-700">
      <CardHeader>
        <CardTitle className="text-vanilla-100">Add New Farm</CardTitle>
        <CardDescription className="text-vanilla-300">
          Create a new vanilla farm in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farmName" className="text-vanilla-200">Farm Name</Label>
              <Input 
                id="farmName" 
                placeholder="Enter farm name" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-vanilla-200">Location</Label>
              <Input 
                id="location" 
                placeholder="Enter location" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hectares" className="text-vanilla-200">Hectares</Label>
              <Input 
                id="hectares" 
                type="number" 
                placeholder="Enter size in hectares" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="establishedDate" className="text-vanilla-200">Established Date</Label>
              <Input 
                id="establishedDate" 
                type="date" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-vanilla-200">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter farm description" 
              className="bg-earth-700 text-vanilla-100 border-earth-600"
              rows={3}
            />
          </div>
          
          <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
            Create Farm
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewFarmForm;
