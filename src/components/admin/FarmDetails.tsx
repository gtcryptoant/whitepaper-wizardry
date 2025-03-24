
import React from 'react';
import FarmDetailsContainer from './farm-details/FarmDetailsContainer';
import { Farm } from '@/types/farm';

interface FarmDetailsProps {
  farm: Farm;
  onUpdate: (updatedFarm: Farm) => void;
  onIssueTokens: (farmId: string, amount: number, recipient: string) => void;
}

const FarmDetails = ({ farm, onUpdate, onIssueTokens }: FarmDetailsProps) => {
  return (
    <FarmDetailsContainer 
      farm={farm}
      onUpdate={onUpdate}
      onIssueTokens={onIssueTokens}
    />
  );
};

export default FarmDetails;
