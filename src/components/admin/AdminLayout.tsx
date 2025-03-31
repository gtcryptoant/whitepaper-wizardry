
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-earth-900">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 h-screen bg-earth-800 border-r border-earth-700">
          <AdminSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-display text-vanilla-100">{title}</h1>
              <p className="text-vanilla-300 mt-1">Manage your project settings and parameters</p>
            </div>
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-earth-800 border-earth-700">
                    <Menu className="h-5 w-5 text-vanilla-300" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-earth-800 border-r border-earth-700">
                  <AdminSidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="bg-earth-800/30 rounded-xl border border-earth-700/50 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminSidebar = () => {
  return (
    <Sidebar className="bg-transparent border-0">
      <SidebarHeader className="p-4 border-b border-earth-700">
        <h2 className="text-xl font-display text-vanilla-100">Admin Portal</h2>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <nav className="space-y-1 px-2">
          <a 
            href="/admin" 
            className="flex items-center px-3 py-2 text-vanilla-300 hover:bg-earth-700 hover:text-vanilla-100 rounded-md"
          >
            Farms Management
          </a>
          <a 
            href="/project-admin" 
            className="flex items-center px-3 py-2 bg-earth-700 text-vanilla-100 rounded-md"
          >
            Project Administration
          </a>
        </nav>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-earth-700">
        <p className="text-xs text-vanilla-400">Vanilla Valley Admin v1.0</p>
      </SidebarFooter>
    </Sidebar>
  );
};
