
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TribalBackground from '@/components/TribalBackground';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  backLink?: string;
  backLinkText?: string;
}

export const AdminLayout = ({ 
  children, 
  title, 
  description, 
  backLink = "/dashboard", 
  backLinkText = "Back to Dashboard" 
}: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100">
      <Navbar />
      <TribalBackground />
      
      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            {backLink && (
              <Link to={backLink} className="text-vanilla-300 hover:text-vanilla-100 flex items-center mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backLinkText}
              </Link>
            )}
            <h1 className="text-3xl font-display text-vanilla-100">{title}</h1>
            {description && <p className="text-vanilla-300 mt-2">{description}</p>}
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};
