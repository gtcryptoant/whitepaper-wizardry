
import React from 'react';
import PartnerDetailsContainer from './partner-details/PartnerDetailsContainer';
import { Partner } from '@/types/partner';

interface PartnerDetailsProps {
  partner: Partner;
  onUpdate: (updatedPartner: Partner) => void;
}

const PartnerDetails = ({ partner, onUpdate }: PartnerDetailsProps) => {
  return (
    <PartnerDetailsContainer 
      partner={partner}
      onUpdate={onUpdate}
    />
  );
};

export default PartnerDetails;
