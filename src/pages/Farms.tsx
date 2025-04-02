
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import TribalBackground from '@/components/TribalBackground';
import FarmPerformanceChart from '@/components/farms/FarmPerformanceChart';
import FarmStats from '@/components/farms/FarmStats';
import FarmTokens from '@/components/farms/FarmTokens';
import { Leaf } from 'lucide-react';
import { Farm } from '@/types/farm';
import { farmsData } from '@/data/farmsData';

const Farms = () => {
  const [selectedFarm, setSelectedFarm] = useState<Farm>(farmsData[0]);

  return (
    <div className="min-h-screen bg-earth-900">
      <TribalBackground />
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-3xl font-bold text-vanilla-100 mb-8">Vanilla Valley Farms</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-earth-800/60 rounded-lg border border-earth-700 p-4">
              <h2 className="text-xl font-semibold text-vanilla-100 mb-4">Our Farms</h2>
              <div className="space-y-3">
                {farmsData.map((farm) => (
                  <button
                    key={farm.id}
                    onClick={() => setSelectedFarm(farm)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedFarm.id === farm.id 
                        ? 'bg-vanilla-500/20 border border-vanilla-500/30' 
                        : 'bg-earth-700/50 hover:bg-earth-700/70 border border-earth-600/30'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-3 bg-earth-700 p-2 rounded-full">
                        <Leaf size={16} className="text-vanilla-300" />
                      </div>
                      <div>
                        <div className="font-medium text-vanilla-100">{farm.name}</div>
                        <div className="text-xs text-vanilla-300">{farm.location}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-earth-800/60 rounded-lg border border-earth-700 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-vanilla-100">{selectedFarm.name}</h2>
                  <p className="text-vanilla-300">{selectedFarm.location}</p>
                </div>
                {/* Admin link for editing farm */}
                <Link 
                  to="/project-admin"
                  className="mt-3 md:mt-0 px-4 py-2 bg-earth-700 hover:bg-earth-600 text-vanilla-100 rounded-md inline-flex items-center text-sm"
                >
                  Manage in Admin
                </Link>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-vanilla-300">Established</div>
                <div className="text-lg text-vanilla-100">{selectedFarm.establishedDate}</div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-vanilla-100 mb-3">About this Farm</h3>
                <p className="text-vanilla-200 mb-4">{selectedFarm.description}</p>
                <div className="mt-4 p-4 bg-earth-700/30 border border-earth-600/50 rounded-lg">
                  <h4 className="text-lg font-medium text-vanilla-100 mb-2">Our Vision</h4>
                  <p className="text-vanilla-300">{selectedFarm.vision}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FarmStats farm={selectedFarm} />
              <FarmPerformanceChart farm={selectedFarm} />
            </div>
            
            <FarmTokens farm={selectedFarm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farms;
