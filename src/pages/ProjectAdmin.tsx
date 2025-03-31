
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectParametersList from '@/components/admin/project/ProjectParametersList';
import ProjectStatsOverview from '@/components/admin/project/ProjectStatsOverview';
import NewPartnerForm from '@/components/admin/project/NewPartnerForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { 
  ArrowLeft, 
  Cog, 
  BarChart3, 
  Users, 
  Leaf
} from 'lucide-react';
import TribalBackground from '@/components/TribalBackground';

const ProjectAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100">
      <Navbar />
      <TribalBackground />
      
      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/dashboard" className="text-vanilla-300 hover:text-vanilla-100 flex items-center mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-display text-vanilla-100">Project Administration</h1>
            <p className="text-vanilla-300 mt-2">Manage project parameters, statistics and partnership details</p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-earth-800 border border-earth-700 p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-earth-700 data-[state=active]:text-vanilla-100"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Project Overview
            </TabsTrigger>
            <TabsTrigger 
              value="parameters" 
              className="data-[state=active]:bg-earth-700 data-[state=active]:text-vanilla-100"
            >
              <Cog className="h-4 w-4 mr-2" />
              Project Parameters
            </TabsTrigger>
            <TabsTrigger 
              value="partners" 
              className="data-[state=active]:bg-earth-700 data-[state=active]:text-vanilla-100"
            >
              <Users className="h-4 w-4 mr-2" />
              Farm Partners
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <ProjectStatsOverview />
          </TabsContent>
          
          <TabsContent value="parameters" className="space-y-6">
            <div className="grid gap-6">
              <div className="bg-earth-800/50 border border-earth-700 p-6 rounded-xl">
                <h2 className="text-xl font-medium mb-4 flex items-center">
                  <Cog className="h-5 w-5 mr-2 text-vanilla-500" />
                  Project Parameters
                </h2>
                <p className="text-vanilla-300 mb-6">
                  Modify the core parameters that define how the Vanilla Valley ecosystem operates. 
                  Changes made here will affect various aspects of the project.
                </p>
                <ProjectParametersList />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="partners" className="space-y-6">
            <div className="bg-earth-800/50 border border-earth-700 p-6 rounded-xl">
              <h2 className="text-xl font-medium mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-vanilla-500" />
                Add New Farm Partner
              </h2>
              <p className="text-vanilla-300 mb-6">
                Register a new farm partner to be included in the Vanilla Valley ecosystem.
                Complete all required information to ensure proper integration.
              </p>
              <NewPartnerForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectAdmin;
