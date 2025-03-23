
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
    <section className="relative min-h-screen bg-gradient-to-b from-vanilla-50 to-white dark:from-earth-900 dark:to-earth-950 overflow-hidden flex items-center justify-center">
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
                <span className="pill">The Future of Agriculture &amp; Finance</span>
              </div>
            </div>
            
            <h1 
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight mb-6 transition-all duration-700 transform",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <span className="text-earth-900 dark:text-vanilla-100">Tokenizing Real Vanilla.</span>{' '}
              <span className="text-vanilla-600 dark:text-vanilla-500">Growing Real Value.</span>
            </h1>
            
            <p 
              className={cn(
                "text-xl text-earth-800 dark:text-vanilla-200 mb-8 max-w-xl text-balance transition-all duration-700 delay-100 transform",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              Vanilla Valley brings together the agricultural heritage of vanilla farming with cutting-edge blockchain technology to create transparent, sustainable, and profitable ownership of real-world vanilla assets.
            </p>
            
            <div 
              className={cn(
                "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 delay-200 transform",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <Button 
                onClick={() => scrollToSection('vision')}
                className="text-lg px-8 py-6 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover:text-earth-950"
              >
                Explore Vision <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => scrollToSection('tokenomics')}
                variant="outline" 
                className="text-lg px-8 py-6 border-earth-700 text-earth-700 hover:bg-earth-50 dark:border-vanilla-300 dark:text-vanilla-300 dark:hover:bg-earth-800"
              >
                View Tokenomics
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
              <div className="glass-card rounded-3xl overflow-hidden relative z-10">
                <div className="aspect-video bg-vanilla-100 dark:bg-earth-800/50 rounded-3xl overflow-hidden">
                  <div className="p-8 h-full flex flex-col justify-center items-center">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-display mb-2">Vanilla Valley NFTs</h3>
                      <p className="text-earth-700 dark:text-vanilla-200">Real farms, real yields, real impact</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="bg-white/60 dark:bg-earth-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-700 dark:text-vanilla-500 mb-1">12%</div>
                        <div className="text-sm text-earth-700 dark:text-vanilla-300">Annual Yield</div>
                      </div>
                      <div className="bg-white/60 dark:bg-earth-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-700 dark:text-vanilla-500 mb-1">3,200</div>
                        <div className="text-sm text-earth-700 dark:text-vanilla-300">Farms Tokenized</div>
                      </div>
                      <div className="bg-white/60 dark:bg-earth-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-700 dark:text-vanilla-500 mb-1">$14M</div>
                        <div className="text-sm text-earth-700 dark:text-vanilla-300">Total Value</div>
                      </div>
                      <div className="bg-white/60 dark:bg-earth-800/60 backdrop-blur-sm rounded-xl p-4 text-center hover-scale">
                        <div className="text-4xl font-display text-vanilla-700 dark:text-vanilla-500 mb-1">7,500+</div>
                        <div className="text-sm text-earth-700 dark:text-vanilla-300">Community</div>
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
            className="bg-vanilla-100 dark:bg-earth-800 hover:bg-vanilla-200 dark:hover:bg-earth-700 text-earth-700 dark:text-vanilla-300 p-3 rounded-full transition-colors"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
