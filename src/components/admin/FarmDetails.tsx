
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
  const [editedFarm, setEditedFarm] = useState(farm);
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
      setEditedFarm({
        ...editedFarm,
        [parent]: {
          ...editedFarm[parent as keyof Farm],
          [child]: parent === 'performance' ? Number(value) : value
        }
      });
    } else {
      setEditedFarm({
        ...editedFarm,
        [name]: name === 'hectares' ? Number(value) : value
      });
    }
  };
  
  const handleCancel = () => {
    setEditedFarm(farm);
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
      <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-2 flex items-center">
              {isEditing ? (
                <Input
                  name="name"
                  value={editedFarm.name}
                  onChange={handleChange}
                  className="text-2xl font-display h-auto py-1 max-w-md"
                />
              ) : (
                farm.name
              )}
            </CardTitle>
            <CardDescription className="flex items-center mt-1 text-sm">
              <MapPin className="h-4 w-4 mr-1 text-earth-700 dark:text-vanilla-300" />
              {isEditing ? (
                <Input
                  name="location"
                  value={editedFarm.location}
                  onChange={handleChange}
                  className="h-8 py-1 max-w-xs"
                />
              ) : (
                farm.location
              )}
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1 text-earth-700 dark:text-vanilla-300" />
              {isEditing ? (
                <Input
                  name="establishedDate"
                  type="date"
                  value={editedFarm.establishedDate}
                  onChange={handleChange}
                  className="h-8 py-1 w-40"
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
                    className="h-8 py-1 w-24 inline-block"
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
            className={isEditing ? "tribal-button" : ""}
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
              className="ml-2"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="bg-vanilla-100 dark:bg-earth-800/50 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tokens">Token Management</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-earth-700 dark:text-vanilla-300">
                      Performance Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-4xl font-bold">{performanceScore}</div>
                      <span className="text-sm text-earth-700 dark:text-vanilla-300 ml-2">/100</span>
                      <TrendingUp className="ml-auto h-5 w-5 text-tribal-green" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-earth-700 dark:text-vanilla-300">
                      Token Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-4xl font-bold">
                        ${farm.tokens.price.toFixed(2)}
                      </div>
                      <span className="text-sm text-earth-700 dark:text-vanilla-300 ml-2">USD</span>
                      <Activity className="ml-auto h-5 w-5 text-tribal-yellow" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-earth-700 dark:text-vanilla-300">
                      Annual Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-4xl font-bold">
                        ${(farm.stats.annualRevenue / 1000).toFixed(1)}K
                      </div>
                      <span className="text-sm text-earth-700 dark:text-vanilla-300 ml-2">USD</span>
                      <TrendingUp className="ml-auto h-5 w-5 text-tribal-green" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={performanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#FFD36B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="yield">Yield Performance (%)</Label>
                          <Input
                            id="yield"
                            name="performance.yield"
                            type="number"
                            min="0"
                            max="100"
                            value={editedFarm.performance.yield}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="quality">Quality Score (%)</Label>
                          <Input
                            id="quality"
                            name="performance.quality"
                            type="number"
                            min="0"
                            max="100"
                            value={editedFarm.performance.quality}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="sustainability">Sustainability Score (%)</Label>
                          <Input
                            id="sustainability"
                            name="performance.sustainability"
                            type="number"
                            min="0"
                            max="100"
                            value={editedFarm.performance.sustainability}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Token Symbol</TableCell>
                          <TableCell>{farm.tokens.symbol}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Total Supply</TableCell>
                          <TableCell>{farm.tokens.totalSupply.toLocaleString()} {farm.tokens.symbol}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Token Holders</TableCell>
                          <TableCell>{farm.tokens.holders}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Last Harvest</TableCell>
                          <TableCell>
                            {farm.stats.lastHarvest ? new Date(farm.stats.lastHarvest).toLocaleDateString() : "N/A"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Next Harvest</TableCell>
                          <TableCell>
                            {farm.stats.nextHarvest ? new Date(farm.stats.nextHarvest).toLocaleDateString() : "N/A"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Projected Growth</TableCell>
                          <TableCell>{farm.stats.projectedGrowth}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tokens" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader>
                    <CardTitle>Issue New Tokens</CardTitle>
                    <CardDescription>
                      Issue new {farm.tokens.symbol} tokens for {farm.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleIssueTokens}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="tokenAmount">Number of Tokens to Issue</Label>
                          <Input 
                            id="tokenAmount" 
                            type="number" 
                            min="1"
                            value={tokenAmount || ''}
                            onChange={(e) => setTokenAmount(parseInt(e.target.value) || 0)}
                            placeholder="Enter token amount" 
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recipient">Recipient Address</Label>
                          <Input 
                            id="recipient" 
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter wallet address" 
                            required
                          />
                          <p className="text-sm text-earth-600 dark:text-vanilla-400">
                            Tokens will be minted directly to this address
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="tribal-button mt-6 w-full"
                        disabled={!tokenAmount || !recipient}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Issue {farm.tokens.symbol} Tokens
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader>
                    <CardTitle>Token Overview</CardTitle>
                    <CardDescription>
                      Current state of {farm.tokens.symbol} Tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                        <span className="text-earth-700 dark:text-vanilla-300">Total Supply</span>
                        <span className="font-medium">{farm.tokens.totalSupply.toLocaleString()} {farm.tokens.symbol}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                        <span className="text-earth-700 dark:text-vanilla-300">Circulating Supply</span>
                        <span className="font-medium">{farm.tokens.circulatingSupply.toLocaleString()} {farm.tokens.symbol}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                        <span className="text-earth-700 dark:text-vanilla-300">Holders</span>
                        <span className="font-medium">{farm.tokens.holders}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                        <span className="text-earth-700 dark:text-vanilla-300">Current Token Price</span>
                        <span className="font-medium">${farm.tokens.price.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-earth-700 dark:text-vanilla-300">Total Value</span>
                        <span className="font-medium">
                          ${(farm.tokens.totalSupply * farm.tokens.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })} USD
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Token Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6 space-y-6">
              <Card className="bg-white/60 dark:bg-earth-800/60">
                <CardHeader>
                  <CardTitle>Monthly Yield Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyYieldData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="yield" stroke="#FFD36B" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-earth-700 dark:text-vanilla-300">
                      Average Monthly Yield
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {(farm.stats.monthlyYield.reduce((a, b) => a + b, 0) / farm.stats.monthlyYield.length).toFixed(1)} kg
                    </div>
                    <p className="text-sm text-earth-700 dark:text-vanilla-300">
                      per hectare
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-earth-700 dark:text-vanilla-300">
                      Annual Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {farm.stats.projectedGrowth}%
                    </div>
                    <p className="text-sm text-earth-700 dark:text-vanilla-300">
                      year over year
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/60 dark:bg-earth-800/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-earth-700 dark:text-vanilla-300">
                      Quality Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {farm.performance.quality}%
                    </div>
                    <p className="text-sm text-earth-700 dark:text-vanilla-300">
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
