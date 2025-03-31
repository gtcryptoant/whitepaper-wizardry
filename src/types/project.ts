
export interface ProjectStats {
  totalUsers: number;
  activeUsers: number;
  totalTokens: number; // Added this field
  tokenCirculation: number;
  averageYield: number;
  harvestFrequency: string;
}

export type ParameterCategory = 'financial' | 'operational' | 'technical' | 'agricultural' | 'governance' | 'other';

export interface ProjectParameter {
  id: string;
  name: string;
  description: string;
  value: string; // Ensure this is a string
  category: ParameterCategory;
  lastUpdated: string;
}

export interface ProjectPartner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  partnershipDate: string;
  category: string;
}
