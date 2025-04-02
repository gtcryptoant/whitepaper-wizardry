
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Mail, Phone, User } from 'lucide-react';
import { Partner } from '@/types/partner';

interface PartnerContactsProps {
  partner: Partner;
  isEditing: boolean;
  editedPartner: Partner;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PartnerContacts = ({ 
  partner, 
  isEditing, 
  editedPartner, 
  handleChange 
}: PartnerContactsProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-earth-800/60 border-earth-700">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact" className="text-vanilla-200 block mb-2">
                <User className="h-4 w-4 inline-block mr-2" />
                Contact Person
              </Label>
              {isEditing ? (
                <Input
                  id="contact"
                  name="contact"
                  value={editedPartner.contact}
                  onChange={handleChange}
                  className="bg-earth-700 text-vanilla-100 border-earth-600"
                />
              ) : (
                <div className="text-vanilla-100 bg-earth-700/50 p-3 rounded-md">{partner.contact}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="email" className="text-vanilla-200 block mb-2">
                <Mail className="h-4 w-4 inline-block mr-2" />
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedPartner.email}
                  onChange={handleChange}
                  className="bg-earth-700 text-vanilla-100 border-earth-600"
                />
              ) : (
                <div className="text-vanilla-100 bg-earth-700/50 p-3 rounded-md">{partner.email}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-vanilla-200 block mb-2">
                <Phone className="h-4 w-4 inline-block mr-2" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={editedPartner.phone}
                  onChange={handleChange}
                  className="bg-earth-700 text-vanilla-100 border-earth-600"
                />
              ) : (
                <div className="text-vanilla-100 bg-earth-700/50 p-3 rounded-md">{partner.phone}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerContacts;
