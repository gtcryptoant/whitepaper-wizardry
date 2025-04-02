
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ProjectParameters = () => {
  return (
    <Card className="bg-earth-800/60 border-earth-700">
      <CardHeader>
        <CardTitle className="text-vanilla-100">Project Parameters</CardTitle>
        <CardDescription className="text-vanilla-300">
          Adjust key parameters for the project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="yieldThreshold" className="text-vanilla-200">Yield Threshold</Label>
            <Input 
              id="yieldThreshold" 
              type="number" 
              defaultValue="10"
              className="bg-earth-700 text-vanilla-100 border-earth-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sustainabilityTarget" className="text-vanilla-200">Sustainability Target</Label>
            <Input 
              id="sustainabilityTarget" 
              type="number" 
              defaultValue="90"
              className="bg-earth-700 text-vanilla-100 border-earth-600"
            />
          </div>
          
          <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
            Save Parameters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectParameters;
