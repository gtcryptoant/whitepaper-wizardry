
import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100">
      <Helmet>
        <title>{title} | Vanilla Valley Admin</title>
      </Helmet>
      
      <header className="bg-earth-800 border-b border-earth-700 py-4">
        <div className="container-padding flex justify-between items-center">
          <h1 className="text-2xl font-display">{title}</h1>
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container-padding py-8">
        {children}
      </main>
    </div>
  );
};
