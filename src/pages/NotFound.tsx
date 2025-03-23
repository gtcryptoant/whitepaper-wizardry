
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-vanilla-50 to-white dark:from-earth-900 dark:to-earth-950 p-4">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-vanilla-300 to-vanilla-500 rounded-2xl blur opacity-30"></div>
        <div className="glass-card rounded-2xl p-10 max-w-lg text-center relative z-10">
          <h1 className="text-6xl font-display font-medium text-earth-900 dark:text-vanilla-100 mb-2">404</h1>
          <div className="w-16 h-1 bg-vanilla-500 mx-auto my-6"></div>
          <p className="text-xl text-earth-700 dark:text-vanilla-200 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover:text-earth-950"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
