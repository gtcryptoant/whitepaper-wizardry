
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Partner } from '@/types/partner';

interface PartnerOverviewProps {
  partner: Partner;
  isEditing: boolean;
  editedPartner: Partner;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PartnerOverview = ({ 
  partner, 
  isEditing, 
  editedPartner, 
  handleChange 
}: PartnerOverviewProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-earth-800/60 border-earth-700">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="type" className="text-vanilla-200 block mb-2">Partner Type</Label>
              {isEditing ? (
                <Input
                  id="type"
                  name="type"
                  value={editedPartner.type}
                  onChange={handleChange}
                  className="bg-earth-700 text-vanilla-100 border-earth-600"
                />
              ) : (
                <div className="text-vanilla-100 bg-earth-700/50 p-3 rounded-md">{partner.type}</div>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-vanilla-200 block mb-2">Description</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  name="description"
                  value={editedPartner.description}
                  onChange={handleChange}
                  className="bg-earth-700 text-vanilla-100 border-earth-600 min-h-[100px]"
                />
              ) : (
                <div className="text-vanilla-100 bg-earth-700/50 p-3 rounded-md whitespace-pre-wrap">
                  {partner.description}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerOverview;
