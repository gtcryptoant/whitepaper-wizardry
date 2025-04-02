
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContentManagement = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-earth-800/60 border-earth-700">
        <CardHeader>
          <CardTitle className="text-vanilla-100">Homepage Content Management</CardTitle>
          <CardDescription className="text-vanilla-300">
            Edit the content displayed on the main website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol" className="text-vanilla-200">Token Symbol</Label>
              <Input 
                id="tokenSymbol" 
                defaultValue="$VVT"
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
              <p className="text-sm text-vanilla-400">
                This will update the token symbol throughout the site
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="visionStatement" className="text-vanilla-200">Project Vision</Label>
              <Textarea 
                id="visionStatement" 
                rows={6}
                defaultValue="New Cambium is a financially sustainable residential and rental community, integrating sustainable farming with thoughtfully designed living spaces. This project is focused on living in harmony with our natural world, ensuring that its growth aligns with the stewardship of the land and surrounding nature. Every decision supports a regenerative and sustainable future, fostering a deep connection between people and the environment."
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-vanilla-100 mb-4">Featured Farm Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmNumber" className="text-vanilla-200">Farm Number</Label>
                  <Input 
                    id="farmNumber" 
                    defaultValue="1"
                    className="bg-earth-700 text-vanilla-100 border-earth-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableSupply" className="text-vanilla-200">Available Supply</Label>
                  <Input 
                    id="availableSupply" 
                    defaultValue="2,000 / 20,000"
                    className="bg-earth-700 text-vanilla-100 border-earth-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectWebsite" className="text-vanilla-200">Project Website URL</Label>
                  <Input 
                    id="projectWebsite" 
                    defaultValue="https://newcambium.org"
                    className="bg-earth-700 text-vanilla-100 border-earth-600"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
                Save Content Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
