
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Farm } from '@/types/farm';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { MapPin, Leaf, Calendar, Coins, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import FarmPerformanceChart from '@/components/farms/FarmPerformanceChart';
import FarmStats from '@/components/farms/FarmStats';
import FarmTokens from '@/components/farms/FarmTokens';
import TribalBackground from '@/components/TribalBackground';

// This is a temporary solution. In a real app, you would fetch this data from Supabase
import { initialFarms } from '@/data/farmsData';

const Farms = () => {
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(farms.length > 0 ? farms[0].id : null);
  const navigate = useNavigate();
  
  const currentFarm = farms.find(farm => farm.id === selectedFarmId);
  
  return (
    <div className="min-h-screen bg-earth-900 pb-20 pt-24">
      <TribalBackground opacity={0.07} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-medium text-vanilla-100 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Vanilla Farms
          </motion.h1>
          <motion.p 
            className="text-vanilla-300 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our tokenized farms across the world's premier vanilla growing regions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Farm Selection Sidebar */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-earth-800/60 backdrop-blur-sm border-earth-700">
              <CardContent className="p-4">
                <h3 className="text-xl font-medium text-vanilla-100 mb-4">Vanilla Farms</h3>
                <div className="space-y-3">
                  {farms.map((farm) => (
                    <motion.div
                      key={farm.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedFarmId === farm.id 
                          ? 'bg-vanilla-800/40 border border-vanilla-500/30 shadow-md shadow-vanilla-500/10' 
                          : 'bg-earth-700/40 hover:bg-earth-700/70 border border-earth-600/30'
                      }`}
                      onClick={() => setSelectedFarmId(farm.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <motion.div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            selectedFarmId === farm.id ? 'bg-vanilla-500 text-earth-900' : 'bg-earth-600 text-vanilla-300'
                          }`}
                          animate={{ 
                            boxShadow: selectedFarmId === farm.id 
                              ? ['0 0 0 rgba(212, 168, 87, 0)', '0 0 10px rgba(212, 168, 87, 0.5)', '0 0 0 rgba(212, 168, 87, 0)']
                              : 'none'
                          }}
                          transition={{ duration: 2, repeat: selectedFarmId === farm.id ? Infinity : 0 }}
                        >
                          <Leaf size={18} />
                        </motion.div>
                        <div>
                          <h4 className={`font-medium ${selectedFarmId === farm.id ? 'text-vanilla-100' : 'text-vanilla-300'}`}>
                            {farm.name}
                          </h4>
                          <div className="flex items-center text-xs text-vanilla-400">
                            <MapPin size={10} className="mr-1" /> {farm.location}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-earth-700">
                  <Button 
                    onClick={() => navigate('/admin')}
                    className="w-full bg-earth-700 hover:bg-earth-600 text-vanilla-200 border border-earth-600"
                  >
                    Manage Farms
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Farm Details */}
          <motion.div 
            className="lg:col-span-9"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentFarm ? (
              <div className="space-y-6">
                <Card className="bg-earth-800/60 backdrop-blur-sm border-earth-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="h-40 bg-gradient-to-r from-vanilla-900/60 to-vanilla-700/30"></div>
                      <div className="absolute inset-0 flex items-center px-6">
                        <div>
                          <h2 className="text-3xl font-display font-medium text-vanilla-100">{currentFarm.name}</h2>
                          <div className="flex flex-wrap items-center mt-2 text-vanilla-300 gap-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{currentFarm.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Leaf className="h-4 w-4 mr-1" />
                              <span>{currentFarm.hectares} hectares</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Established {new Date(currentFarm.establishedDate).getFullYear()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-earth-800/60 backdrop-blur-sm border-earth-700">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-medium text-vanilla-100 mb-3">About This Farm</h3>
                      <p className="text-vanilla-300">
                        {currentFarm.description || 
                          `${currentFarm.name} is one of our premium vanilla farms, focused on sustainable 
                          farming practices and producing high-quality vanilla beans.`}
                      </p>
                      
                      {currentFarm.vision && (
                        <div className="mt-4">
                          <h4 className="text-lg font-medium text-vanilla-100 mb-1">Our Vision</h4>
                          <p className="text-vanilla-300">{currentFarm.vision}</p>
                        </div>
                      )}
                    </div>
                    
                    <Tabs defaultValue="performance" className="mt-6">
                      <TabsList className="bg-earth-700/50 p-1">
                        <TabsTrigger value="performance" className="data-[state=active]:bg-vanilla-500 data-[state=active]:text-earth-900">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Performance
                        </TabsTrigger>
                        <TabsTrigger value="tokens" className="data-[state=active]:bg-vanilla-500 data-[state=active]:text-earth-900">
                          <Coins className="h-4 w-4 mr-2" />
                          Token Details
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="performance" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <FarmStats farm={currentFarm} />
                          </div>
                          <div>
                            <FarmPerformanceChart farm={currentFarm} />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tokens" className="mt-6">
                        <FarmTokens farm={currentFarm} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-earth-800/60 backdrop-blur-sm border-earth-700">
                <CardContent className="p-8 text-center">
                  <p className="text-vanilla-300">No farm selected. Please select a farm from the list.</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Farms;
