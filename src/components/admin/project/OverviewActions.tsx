
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const OverviewActions = () => {
  return (
    <Card className="bg-earth-800/60 border-earth-700">
      <CardHeader>
        <CardTitle className="text-vanilla-100">Project Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button className="bg-earth-700 hover:bg-earth-600 text-vanilla-100">
            Run Yield Distribution
          </Button>
          <Button className="bg-earth-700 hover:bg-earth-600 text-vanilla-100">
            Publish Market Update
          </Button>
          <Button className="bg-earth-700 hover:bg-earth-600 text-vanilla-100">
            Preview Website
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewActions;
