
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Farm as FarmIcon } from 'lucide-react';
import ConnectWallet from './ConnectWallet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleConnect = () => {
    console.log('Connecting wallet...');
    // Wallet connection logic will be implemented here
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navbarClass = `fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
    isScrolled ? 'bg-earth-900/95 backdrop-blur-md shadow-md' : 'bg-transparent'
  }`;
  
  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-vanilla-200">
              Vanilla<span className="text-vanilla-500">Valley</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/farms" className={`nav-link ${isActive('/farms') ? 'active' : ''}`}>
              Farms
            </Link>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
              Dashboard
            </Link>
            <div className="relative group">
              <button className="nav-link flex items-center">
                Admin
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-earth-800 ring-1 ring-earth-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link to="/admin" className="block px-4 py-2 text-sm text-vanilla-300 hover:text-vanilla-100 hover:bg-earth-700">
                    Farm Management
                  </Link>
                  <Link to="/project-admin" className="block px-4 py-2 text-sm text-vanilla-300 hover:text-vanilla-100 hover:bg-earth-700">
                    Project Administration
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ConnectWallet onConnect={handleConnect} />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-vanilla-300 hover:text-vanilla-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-vanilla-300 hover:text-vanilla-100 px-2 py-1 ${isActive('/') ? 'text-vanilla-100 font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/farms" 
              className={`text-vanilla-300 hover:text-vanilla-100 px-2 py-1 ${isActive('/farms') ? 'text-vanilla-100 font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Farms
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-vanilla-300 hover:text-vanilla-100 px-2 py-1 ${isActive('/dashboard') ? 'text-vanilla-100 font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin" 
              className={`text-vanilla-300 hover:text-vanilla-100 px-2 py-1 ${isActive('/admin') ? 'text-vanilla-100 font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Farm Management
            </Link>
            <Link 
              to="/project-admin" 
              className={`text-vanilla-300 hover:text-vanilla-100 px-2 py-1 ${isActive('/project-admin') ? 'text-vanilla-100 font-medium' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Project Administration
            </Link>
            <div className="pt-4">
              <ConnectWallet onConnect={handleConnect} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
