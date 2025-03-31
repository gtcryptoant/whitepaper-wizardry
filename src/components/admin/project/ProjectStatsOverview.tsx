
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ProjectStats } from '@/types/project';

interface ProjectStatsOverviewProps {
  stats: ProjectStats;
}

const ProjectStatsOverview: React.FC<ProjectStatsOverviewProps> = ({ stats }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-vanilla-300 text-sm font-medium">Total Farms</span>
            <span className="text-vanilla-50 text-2xl font-bold mt-1">{stats.totalFarms}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-vanilla-300 text-sm font-medium">Token Holders</span>
            <span className="text-vanilla-50 text-2xl font-bold mt-1">{stats.totalTokenHolders}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-vanilla-300 text-sm font-medium">Total Hectares</span>
            <span className="text-vanilla-50 text-2xl font-bold mt-1">{stats.totalHectares.toFixed(1)} ha</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-vanilla-300 text-sm font-medium">Avg. Yield</span>
            <span className="text-vanilla-50 text-2xl font-bold mt-1">{stats.averageYield.toFixed(1)}%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-earth-700/90 border-earth-600 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-vanilla-300 text-sm font-medium">Project Value</span>
            <span className="text-vanilla-50 text-2xl font-bold mt-1">{formatCurrency(stats.projectValue)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ProjectStatsOverview };
export default ProjectStatsOverview;
