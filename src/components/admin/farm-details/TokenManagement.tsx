
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { Farm } from '@/types/farm';

interface TokenManagementProps {
  farm: Farm;
  onIssueTokens: (farmId: string, amount: number, recipient: string) => void;
}

const TokenManagement = ({ farm, onIssueTokens }: TokenManagementProps) => {
  const [tokenAmount, setTokenAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  
  const handleIssueTokens = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tokenAmount > 0 && recipient) {
      onIssueTokens(farm.id, tokenAmount, recipient);
      setTokenAmount(0);
      setRecipient('');
    }
  };
  
  return (
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
  );
};

export default TokenManagement;
