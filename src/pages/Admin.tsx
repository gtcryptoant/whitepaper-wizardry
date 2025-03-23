
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import ConnectWallet from '@/components/ConnectWallet';
import TribalBackground from '@/components/TribalBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Send, Shield, BarChart2, Users, FileText } from 'lucide-react';
import { initRevealAnimations } from '@/utils/revealAnimation';

const Admin = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newTokens, setNewTokens] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const cleanup = initRevealAnimations();
    return cleanup;
  }, []);

  const handleConnect = (connected: boolean) => {
    setIsConnected(connected);
    
    // In a real implementation, we would check if the connected wallet has admin rights
    // For demo purposes, we're setting it to true when connected
    setIsAdmin(connected);
  };
  
  const handleIssueTokens = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate token issuance
    setTimeout(() => {
      setIsSubmitting(false);
      setNewTokens(0);
      alert(`Successfully issued ${newTokens} new tokens!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-vanilla-50 to-white dark:from-earth-900 dark:to-earth-950 text-earth-900 dark:text-vanilla-100 relative">
      <Helmet>
        <title>Admin Dashboard | Vanilla Valley</title>
      </Helmet>
      
      <TribalBackground />
      
      <Navbar />
      
      <main className="container-padding pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-display mb-2 tribal-glow inline-block px-1">Admin Dashboard</h1>
              <p className="text-earth-700 dark:text-vanilla-300">
                Manage Vanilla Valley tokens and platform settings
              </p>
            </div>
            
            <ConnectWallet onConnect={handleConnect} />
          </div>
          
          {!isConnected ? (
            <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Shield className="h-16 w-16 text-vanilla-300 dark:text-vanilla-600 mb-4" />
                <h2 className="text-2xl font-display mb-2">Admin Access Required</h2>
                <p className="text-center text-earth-700 dark:text-vanilla-300 mb-6 max-w-md">
                  Please connect your wallet with administrator privileges to access the admin dashboard.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="tokens" className="space-y-8">
              <TabsList className="bg-vanilla-100 dark:bg-earth-800/50 p-1 tribal-border">
                <TabsTrigger 
                  value="tokens" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-earth-900 data-[state=active]:text-earth-900 dark:data-[state=active]:text-vanilla-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Token Management
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-earth-900 data-[state=active]:text-earth-900 dark:data-[state=active]:text-vanilla-100"
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-earth-900 data-[state=active]:text-earth-900 dark:data-[state=active]:text-vanilla-100"
                >
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-earth-900 data-[state=active]:text-earth-900 dark:data-[state=active]:text-vanilla-100"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tokens" className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
                    <CardHeader>
                      <CardTitle>Issue New Tokens</CardTitle>
                      <CardDescription>
                        Issue new Vanilla Valley Tokens (VVT) as plants propagate
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
                              value={newTokens}
                              onChange={(e) => setNewTokens(parseInt(e.target.value) || 0)}
                              placeholder="Enter token amount" 
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="recipient">Recipient Address</Label>
                            <Input 
                              id="recipient" 
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
                          disabled={isSubmitting || newTokens <= 0}
                        >
                          {isSubmitting ? (
                            <span className="animate-pulse">Processing...</span>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Issue Tokens
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
                    <CardHeader>
                      <CardTitle>Token Overview</CardTitle>
                      <CardDescription>
                        Current state of Vanilla Valley Tokens
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                          <span className="text-earth-700 dark:text-vanilla-300">Total Supply</span>
                          <span className="font-medium">100,000 VVT</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                          <span className="text-earth-700 dark:text-vanilla-300">Circulating Supply</span>
                          <span className="font-medium">36,250 VVT</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                          <span className="text-earth-700 dark:text-vanilla-300">Holders</span>
                          <span className="font-medium">128</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-vanilla-200 dark:border-earth-800">
                          <span className="text-earth-700 dark:text-vanilla-300">Current Token Price</span>
                          <span className="font-medium">$30.00 USD</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-earth-700 dark:text-vanilla-300">Last Token Issuance</span>
                          <span className="font-medium">3 days ago</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Detailed Token Analytics
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-8 animate-fade-in">
                <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <BarChart2 className="h-16 w-16 text-vanilla-300 dark:text-vanilla-600 mb-4" />
                    <h2 className="text-2xl font-display mb-2">Analytics Dashboard Coming Soon</h2>
                    <p className="text-center text-earth-700 dark:text-vanilla-300 mb-6 max-w-md">
                      Enhanced analytics and reporting features are currently in development and will be available soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users" className="space-y-8 animate-fade-in">
                <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Users className="h-16 w-16 text-vanilla-300 dark:text-vanilla-600 mb-4" />
                    <h2 className="text-2xl font-display mb-2">User Management Coming Soon</h2>
                    <p className="text-center text-earth-700 dark:text-vanilla-300 mb-6 max-w-md">
                      User management features are currently in development and will be available soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports" className="space-y-8 animate-fade-in">
                <Card className="bg-white/40 dark:bg-earth-900/40 backdrop-blur-sm border-vanilla-200 dark:border-earth-800">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <FileText className="h-16 w-16 text-vanilla-300 dark:text-vanilla-600 mb-4" />
                    <h2 className="text-2xl font-display mb-2">Reports Coming Soon</h2>
                    <p className="text-center text-earth-700 dark:text-vanilla-300 mb-6 max-w-md">
                      Reporting features are currently in development and will be available soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <footer className="bg-earth-900 text-vanilla-100 py-8 relative z-10">
        <div className="container-padding">
          <div className="text-center">
            <p className="text-vanilla-300 text-sm">
              &copy; 2024 Vanilla Valley. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
