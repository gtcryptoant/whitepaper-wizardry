
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Partner } from '@/types/partner';

interface NewPartnerFormProps {
  onSubmit: (partner: Partner) => void;
}

const NewPartnerForm = ({ onSubmit }: NewPartnerFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sample form submission with default values
    const newPartner: Partner = {
      id: Math.random().toString(36).substring(2, 15),
      name: "New Partner",
      type: "Technology Provider",
      description: "A new technology partner for the Vanilla Valley project.",
      contact: "Contact Person",
      email: "contact@example.com",
      phone: "123-456-7890"
    };
    
    onSubmit(newPartner);
  };

  return (
    <Card className="bg-earth-800/60 border-earth-700">
      <CardHeader>
        <CardTitle className="text-vanilla-100">Add New Partner</CardTitle>
        <CardDescription className="text-vanilla-300">
          Create a new partnership or collaboration entry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partnerName" className="text-vanilla-200">Partner Name</Label>
              <Input 
                id="partnerName" 
                placeholder="Enter partner name" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partnerType" className="text-vanilla-200">Partner Type</Label>
              <Input 
                id="partnerType" 
                placeholder="E.g., Technology Provider" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-vanilla-200">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter partner description" 
              className="bg-earth-700 text-vanilla-100 border-earth-600"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-vanilla-200">Contact Person</Label>
              <Input 
                id="contact" 
                placeholder="Enter contact name" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-vanilla-200">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter email" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-vanilla-200">Phone</Label>
              <Input 
                id="phone" 
                placeholder="Enter phone number" 
                className="bg-earth-700 text-vanilla-100 border-earth-600"
              />
            </div>
          </div>
          
          <Button className="bg-vanilla-500 hover:bg-vanilla-600 text-earth-900">
            Add Partner
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewPartnerForm;
