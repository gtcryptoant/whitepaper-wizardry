import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, TrendingUp, Send, Edit, Activity, Save, X } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ChartContainer } from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

interface Farm {
  id: string;
  name: string;
  location: string;
  hectares: number;
  establishedDate: string;
  performance: {
    yield: number;
    quality: number;
    sustainability: number;
  };
  tokens: {
    symbol: string;
    totalSupply: number;
    circulatingSupply: number;
    price: number;
    holders: number;
  };
  stats: {
    monthlyYield: number[];
    annualRevenue: number;
    projectedGrowth: number;
    lastHarvest: string;
    nextHarvest: string;
  };
}

interface FarmDetailsProps {
  farm: Farm;
  onUpdate: (updatedFarm: Farm) => void;
  onIssueTokens: (farmId: string, amount: number, recipient: string) => void;
}

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const FarmDetails = ({ farm, onUpdate, onIssueTokens }: FarmDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFarm, setEditedFarm] = useState<Farm>({ ...farm });
  const [tokenAmount, setTokenAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      onUpdate(editedFarm);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'performance') {
        setEditedFarm({
          ...editedFarm,
          performance: {
            ...editedFarm.performance,
            [child]: Number(value)
          }
        });
      } else {
        // Handle other nested properties if needed
        // This is a placeholder for future nested properties
      }
    } else {
      setEditedFarm({
        ...editedFarm,
        [name]: name === 'hectares' ? Number(value) : value
      });
    }
  };
  
  const handleCancel = () => {
    setEditedFarm({ ...farm });
    setIsEditing(false);
  };
  
  const handleIssueTokens = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tokenAmount > 0 && recipient) {
      onIssueTokens(farm.id, tokenAmount, recipient);
      setTokenAmount(0);
      setRecipient('');
    }
  };
  
  // Prepare chart data
  const monthlyYieldData = monthNames.map((month, index) => ({
    name: month,
    yield: farm.stats.monthlyYield[index]
  }));
  
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
      <Card className="bg-earth-900/40 backdrop-blur-sm border-earth-800">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-2 flex items-center text-vanilla-100">
              {isEditing ? (
                <Input
                  name="name"
                  value={editedFarm.name}
                  onChange={handleChange}
                  className="text-2xl font-display h-auto py-1 max-w-md bg-earth-800 text-vanilla-100 border-earth-700"
                />
              ) : (
                farm.name
              )}
            </CardTitle>
            <CardDescription className="flex items-center mt-1 text-sm text-vanilla-300">
              <MapPin className="h-4 w-4 mr-1 text-vanilla-300" />
              {isEditing ? (
                <Input
                  name="location"
                  value={editedFarm.location}
                  onChange={handleChange}
                  className="h-8 py-1 max-w-xs bg-earth-800 text-vanilla-100 border-earth-700"
                />
              ) : (
                farm.location
              )}
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1 text-vanilla-300" />
              {isEditing ? (
                <Input
                  name="establishedDate"
                  type="date"
                  value={editedFarm.establishedDate}
                  onChange={handleChange}
                  className="h-8 py-1 w-40 bg-earth-800 text-vanilla-100 border-earth-700"
                />
              ) : (
                new Date(farm.establishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              )}
              <span className="mx-2">•</span>
              <span>
                {isEditing ? (
                  <Input
                    name="hectares"
                    type="number"
                    min="0"
                    step="0.1"
                    value={editedFarm.hectares}
                    onChange={handleChange}
                    className="h-8 py-1 w-24 inline-block bg-earth-800 text-vanilla-100 border-earth-700"
                  />
                ) : (
                  farm.hectares
                )} hectares
              </span>
            </CardDescription>
          </div>
          
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            className={isEditing ? "tribal-button" : "border-vanilla-300 text-vanilla-300 hover:bg-earth-800"}
            onClick={handleEditToggle}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
          
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="ml-2 border-vanilla-300 text-vanilla-300 hover:bg-earth-800"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="bg-earth-800/50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="tokens" className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white">Token Management</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cardano-500 data-[state=active]:text-white">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
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
            </TabsContent>
            
            <TabsContent value="tokens" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-earth-800/60 border-earth-700">
                  <CardHeader>
                    <CardTitle className="text-vanilla-100">Issue New Tokens</CardTitle>
                    <CardDescription className="text-vanilla-300">
                      Issue new {farm.tokens.symbol} tokens for {farm.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleIssueTokens}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="tokenAmount" className="text-vanilla-200">Number of Tokens to Issue</Label>
                          <Input 
                            id="tokenAmount" 
                            type="number" 
                            min="1"
                            value={tokenAmount || ''}
                            onChange={(e) => setTokenAmount(parseInt(e.target.value) || 0)}
                            placeholder="Enter token amount" 
                            required
                            className="bg-earth-700 text-vanilla-100 border-earth-600"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recipient" className="text-vanilla-200">Recipient Address</Label>
                          <Input 
                            id="recipient" 
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter wallet address" 
                            required
                            className="bg-earth-700 text-vanilla-100 border-earth-600"
                          />
                          <p className="text-sm text-vanilla-400">
                            Tokens will be minted directly to this address
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-taino-500 to-taino-700 hover:from-taino-600 hover:to-taino-800 text-earth-900 font-medium border border-taino-600 mt-6 w-full hover:shadow-lg hover:shadow-taino-500/20"
                        disabled={!tokenAmount || !recipient}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Issue {farm.tokens.symbol} Tokens
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="bg-earth-800/60 border-earth-700">
                  <CardHeader>
                    <CardTitle className="text-vanilla-100">Token Overview</CardTitle>
                    <CardDescription className="text-vanilla-300">
                      Current state of {farm.tokens.symbol} Tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between pb-2 border-b border-earth-700">
                        <span className="text-vanilla-300">Total Supply</span>
                        <span className="font-medium text-vanilla-100">{farm.tokens.totalSupply.toLocaleString()} {farm.tokens.symbol}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-earth-700">
                        <span className="text-vanilla-300">Circulating Supply</span>
                        <span className="font-medium text-vanilla-100">{farm.tokens.circulatingSupply.toLocaleString()} {farm.tokens.symbol}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-earth-700">
                        <span className="text-vanilla-300">Holders</span>
                        <span className="font-medium text-vanilla-100">{farm.tokens.holders}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-earth-700">
                        <span className="text-vanilla-300">Current Token Price</span>
                        <span className="font-medium text-vanilla-100">${farm.tokens.price.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-vanilla-300">Total Value</span>
                        <span className="font-medium text-vanilla-100">
                          ${(farm.tokens.totalSupply * farm.tokens.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })} USD
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-vanilla-300 text-vanilla-300 hover:bg-earth-700">
                      View Token Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6 space-y-6">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmDetails;
