
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Farm } from '@/types/farm';

interface PerformanceViewProps {
  farm: Farm;
}

const PerformanceView = ({ farm }: PerformanceViewProps) => {
  // Prepare chart data
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const monthlyYieldData = monthNames.map((month, index) => ({
    name: month,
    yield: farm.stats.monthlyYield[index]
  }));
  
  return (
    <div className="space-y-6">
      <Card className="bg-earth-800/60 border-earth-700">
        <CardHeader>
          <CardTitle className="text-vanilla-100">Monthly Yield Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyYieldData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f3f" />
                <XAxis dataKey="name" stroke="#c9b8a8" />
                <YAxis stroke="#c9b8a8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2a2520', 
                    borderColor: '#4d4439',
                    color: '#e9dfd2' 
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="yield" stroke="#ffa000" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-vanilla-300">
              Average Monthly Yield
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vanilla-100">
              {(farm.stats.monthlyYield.reduce((a, b) => a + b, 0) / farm.stats.monthlyYield.length).toFixed(1)} kg
            </div>
            <p className="text-sm text-vanilla-300">
              per hectare
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-vanilla-300">
              Annual Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vanilla-100">
              {farm.stats.projectedGrowth}%
            </div>
            <p className="text-sm text-vanilla-300">
              year over year
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-earth-800/60 border-earth-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-vanilla-300">
              Quality Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vanilla-100">
              {farm.performance.quality}%
            </div>
            <p className="text-sm text-vanilla-300">
              premium quality
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceView;
