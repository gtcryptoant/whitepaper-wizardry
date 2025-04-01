
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TribalBackground from '@/components/TribalBackground';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-earth-900 text-vanilla-100">
      <Navbar />
      <TribalBackground />
      
      <div className="container mx-auto pt-24 pb-12 px-4">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
