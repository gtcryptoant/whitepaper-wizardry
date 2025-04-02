
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Partner } from '@/types/partner';

interface PartnersListProps {
  partners: Partner[];
  onSelectPartner: (partnerId: string) => void;
}

const PartnersList = ({ partners, onSelectPartner }: PartnersListProps) => {
  return (
    <Card className="bg-earth-800/60 border-earth-700">
      <CardHeader>
        <CardTitle className="text-vanilla-100">Current Partners</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-between p-3 bg-earth-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-earth-600 flex items-center justify-center text-vanilla-100">
                  {partner.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-vanilla-100">{partner.name}</div>
                  <div className="text-sm text-vanilla-300">{partner.type}</div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-vanilla-300 hover:text-vanilla-100"
                onClick={() => onSelectPartner(partner.id)}
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnersList;
