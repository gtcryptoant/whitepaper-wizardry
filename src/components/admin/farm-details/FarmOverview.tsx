
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TrendingUp, Activity } from 'lucide-react';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Farm } from '@/types/farm';

interface FarmOverviewProps {
  farm: Farm;
  isEditing: boolean;
  editedFarm: Farm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FarmOverview = ({ farm, isEditing, editedFarm, handleChange }: FarmOverviewProps) => {
  // Calculate performance score as average of yield, quality, and sustainability
  const performanceScore = Math.round(
    (farm.performance.yield + farm.performance.quality + farm.performance.sustainability) / 3
  );
  
  const performanceData = [
    { name: 'Yield', value: farm.performance.yield },
    { name: 'Quality', value: farm.performance.quality },
    { name: 'Sustainability', value: farm.performance.sustainability }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-vanilla-300">
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-4xl font-bold text-vanilla-100">{performanceScore}</div>
              <span className="text-sm text-vanilla-300 ml-2">/100</span>
              <TrendingUp className="ml-auto h-5 w-5 text-nature-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-vanilla-300">
              Token Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-4xl font-bold text-vanilla-100">
                ${farm.tokens.price.toFixed(2)}
              </div>
              <span className="text-sm text-vanilla-300 ml-2">USD</span>
              <Activity className="ml-auto h-5 w-5 text-taino-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-vanilla-300">
              Annual Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-4xl font-bold text-vanilla-100">
                ${(farm.stats.annualRevenue / 1000).toFixed(1)}K
              </div>
              <span className="text-sm text-vanilla-300 ml-2">USD</span>
              <TrendingUp className="ml-auto h-5 w-5 text-nature-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader>
            <CardTitle className="text-lg text-vanilla-100">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f3f" />
                  <XAxis dataKey="name" stroke="#c9b8a8" />
                  <YAxis domain={[0, 100]} stroke="#c9b8a8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2a2520', 
                      borderColor: '#4d4439',
                      color: '#e9dfd2' 
                    }} 
                  />
                  <Bar dataKey="value" fill="#ffa000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {isEditing && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="yield" className="text-vanilla-200">Yield Performance (%)</Label>
                  <Input
                    id="yield"
                    name="performance.yield"
                    type="number"
                    min="0"
                    max="100"
                    value={editedFarm.performance.yield}
                    onChange={handleChange}
                    className="bg-earth-700 text-vanilla-100 border-earth-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quality" className="text-vanilla-200">Quality Score (%)</Label>
                  <Input
                    id="quality"
                    name="performance.quality"
                    type="number"
                    min="0"
                    max="100"
                    value={editedFarm.performance.quality}
                    onChange={handleChange}
                    className="bg-earth-700 text-vanilla-100 border-earth-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sustainability" className="text-vanilla-200">Sustainability Score (%)</Label>
                  <Input
                    id="sustainability"
                    name="performance.sustainability"
                    type="number"
                    min="0"
                    max="100"
                    value={editedFarm.performance.sustainability}
                    onChange={handleChange}
                    className="bg-earth-700 text-vanilla-100 border-earth-600"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader>
            <CardTitle className="text-lg text-vanilla-100">Key Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow className="border-earth-700">
                  <TableCell className="font-medium text-vanilla-200">Token Symbol</TableCell>
                  <TableCell className="text-vanilla-100">{farm.tokens.symbol}</TableCell>
                </TableRow>
                <TableRow className="border-earth-700">
                  <TableCell className="font-medium text-vanilla-200">Total Supply</TableCell>
                  <TableCell className="text-vanilla-100">{farm.tokens.totalSupply.toLocaleString()} {farm.tokens.symbol}</TableCell>
                </TableRow>
                <TableRow className="border-earth-700">
                  <TableCell className="font-medium text-vanilla-200">Token Holders</TableCell>
                  <TableCell className="text-vanilla-100">{farm.tokens.holders}</TableCell>
                </TableRow>
                <TableRow className="border-earth-700">
                  <TableCell className="font-medium text-vanilla-200">Last Harvest</TableCell>
                  <TableCell className="text-vanilla-100">
                    {farm.stats.lastHarvest ? new Date(farm.stats.lastHarvest).toLocaleDateString() : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow className="border-earth-700">
                  <TableCell className="font-medium text-vanilla-200">Next Harvest</TableCell>
                  <TableCell className="text-vanilla-100">
                    {farm.stats.nextHarvest ? new Date(farm.stats.nextHarvest).toLocaleDateString() : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow className="border-earth-700">
                  <TableCell className="font-medium text-vanilla-200">Projected Growth</TableCell>
                  <TableCell className="text-vanilla-100">{farm.stats.projectedGrowth}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmOverview;
