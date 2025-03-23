
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Wallet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ConnectWalletProps {
  onConnect: (connected: boolean) => void;
}

const ConnectWallet = ({ onConnect }: ConnectWalletProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  // Simulate wallet connection
  const connectWallet = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would connect to the actual wallet
      // For demo purposes, we're simulating a connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAddress = "addr1qy8ac7qqy0vtulyl7wntmsxc6wex80gvcyjy33qffrhm7sh" + 
                          Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      
      setAddress(mockAddress);
      setIsConnected(true);
      onConnect(true);
      
      toast({
        title: "Wallet connected",
        description: "Successfully connected to your wallet",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Could not connect to wallet. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    onConnect(false);
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const formatAddress = (addr: string) => {
    return addr.substring(0, 8) + '...' + addr.substring(addr.length - 6);
  };

  return (
    <div className="flex items-center justify-center">
      {!isConnected ? (
        <Button
          onClick={connectWallet}
          className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover:text-earth-950 px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse mr-2">Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      ) : (
        <div className="flex items-center">
          <div className="mr-3 text-sm bg-white/20 dark:bg-earth-800/30 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-earth-700 dark:text-vanilla-300">{formatAddress(address!)}</span>
          </div>
          <Button 
            variant="ghost" 
            onClick={disconnectWallet}
            className="text-earth-700 hover:text-earth-900 dark:text-vanilla-300 dark:hover:text-vanilla-100 px-2"
          >
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
