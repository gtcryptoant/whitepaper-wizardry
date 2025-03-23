
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "py-3 bg-white/80 dark:bg-earth-900/80 backdrop-blur-md shadow-sm" : "py-5"
      )}
    >
      <nav className="container-padding flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-display font-semibold text-earth-900 dark:text-vanilla-100">
            Vanilla Valley
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <button onClick={() => scrollToSection('vision')} className="nav-link">Vision</button>
          <button onClick={() => scrollToSection('tokenomics')} className="nav-link">Tokenomics</button>
          <button onClick={() => scrollToSection('roadmap')} className="nav-link">Roadmap</button>
          <button onClick={() => scrollToSection('team')} className="nav-link">Team</button>
          <Button 
            onClick={() => scrollToSection('join')} 
            className="ml-4 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover:text-earth-950"
          >
            Join Now <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-earth-700 hover:text-earth-900 hover:bg-vanilla-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white/95 dark:bg-earth-900/95 transform transition-transform duration-300 ease-in-out md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-24 px-8 space-y-8">
          <button onClick={() => scrollToSection('vision')} className="text-xl py-2 border-b border-vanilla-200 dark:border-earth-800">Vision</button>
          <button onClick={() => scrollToSection('tokenomics')} className="text-xl py-2 border-b border-vanilla-200 dark:border-earth-800">Tokenomics</button>
          <button onClick={() => scrollToSection('roadmap')} className="text-xl py-2 border-b border-vanilla-200 dark:border-earth-800">Roadmap</button>
          <button onClick={() => scrollToSection('team')} className="text-xl py-2 border-b border-vanilla-200 dark:border-earth-800">Team</button>
          <Button 
            onClick={() => scrollToSection('join')} 
            className="mt-8 bg-vanilla-500 hover:bg-vanilla-600 text-earth-900 hover:text-earth-950 w-full"
          >
            Join Now <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
