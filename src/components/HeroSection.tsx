
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height + additional padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-clay-800 to-clay-900 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-noise opacity-75"></div>
      
      <div className="container-padding relative z-10 pt-20 pb-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div 
              className={cn(
                "transition-all duration-1000 delay-300 transform",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <div className="inline-block mb-4">
                <span className="pill bg-earth-800 text-vanilla-100 hover:bg-earth-700">Blockchain-Powered Sustainable Vanilla Farming</span>
              </div>
            </div>
            
            <h1 
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight mb-6 transition-all duration-700 transform",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <span className="text-vanilla-100">Real Vanilla Farming.</span>{' '}
              <span className="text-vanilla-500">Real Yields.</span>
            </h1>
            
            <p 
              className={cn(
                "text-xl text-vanilla-200 mb-8 max-w-xl text-balance transition-all duration-700 delay-100 transform",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              Vanilla Valley bridges traditional vanilla farming with blockchain technology, empowering farmers in the Dominican Republic while offering investors sustainable returns from real-world agricultural assets.
            </p>
            
            <div 
              className={cn(
                "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 delay-200 transform",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <Button 
                onClick={() => scrollToSection('vision')}
                className="text-lg px-8 py-6 bg-vanilla-500 hover:bg-vanilla-600 text-clay-900 hover:text-clay-950"
              >
                Explore Project <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => scrollToSection('tokenomics')}
                variant="outline" 
                className="text-lg px-8 py-6 border-vanilla-300 text-vanilla-300 hover:bg-clay-800"
              >
                View Investment Returns
              </Button>
            </div>
          </div>
          
          <div 
            className={cn(
              "order-1 lg:order-2 transition-all duration-1000 delay-500 transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-vanilla-300 to-vanilla-500 rounded-3xl blur opacity-30 animate-pulse"></div>
              <div className="glass-card rounded-3xl overflow-hidden relative z-10 border-earth-700/80 bg-clay-900/80">
                <div className="aspect-video bg-clay-800/50 rounded-3xl overflow-hidden">
                  <div className="p-8 h-full flex flex-col justify-center items-center">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-display mb-2">New Cambium Project (NCT)</h3>
                      <p className="text-vanilla-200">Real assets, sustainable yields, transparent growth</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="bg-clay-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-500 mb-1">12%</div>
                        <div className="text-sm text-vanilla-300">Annual Yield</div>
                      </div>
                      <div className="bg-clay-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-500 mb-1">20K</div>
                        <div className="text-sm text-vanilla-300">Max Token Supply</div>
                      </div>
                      <div className="bg-clay-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-500 mb-1">$20</div>
                        <div className="text-sm text-vanilla-300">Initial Token Price</div>
                      </div>
                      <div className="bg-clay-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-500 mb-1">20ha</div>
                        <div className="text-sm text-vanilla-300">Project Size</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <button 
            onClick={() => scrollToSection('vision')}
            className="bg-clay-800 hover:bg-clay-700 text-vanilla-300 p-3 rounded-full transition-colors"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
